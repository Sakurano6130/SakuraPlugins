/*:
 * @target MZ
 * @plugindesc ❓ ヒント表示プラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * イベント接触時にプレイヤーにヒントを表示します
 *
 * -------------------------------------------------
 * Sakura_HintWhenFacingEvent
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/11/17 1.0.0 公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_HintWhenFacingEvent/Sakura_HintWhenFacingEvent.md
 *
 * @param defaultFontSize
 * @text ﾋﾝﾄのﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾋﾝﾄのﾌｫﾝﾄｻｲｽﾞです。
 * @default 18
 * @type number
 *
 * @param offsetX
 * @text ﾋﾝﾄ表示のX軸位置調整
 * @desc ﾋﾝﾄ表示のX軸位置調整です。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text ﾋﾝﾄ表示のY軸位置調整
 * @desc ﾋﾝﾄ表示のY軸位置調整です。
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @command registerHint
 * @text ❓ヒント表示
 * @desc ヒントを表示したいページの実行内容の1番最初に置いてください。注）1番最初に置いた時だけ認識されます！
 *
 * @arg hintIcon
 * @text ヒントアイコン
 * @desc ヒントアイコンです。
 * @type icon
 * @default
 *
 * @arg hintColor
 * @text ヒント色
 * @desc ヒント色です。
 * @type color
 * @default 0
 *
 * @arg hintText
 * @text ヒント内容
 * @desc ヒント内容です。制御文字が使えます
 * @type string
 * @default
 *
 */

(() => {
  const pluginName = 'Sakura_HintWhenFacingEvent';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const defaultFontSize = Number(parameters['defaultFontSize'] || 18);
  const fadeSpeed = Number(parameters['fadeSpeed'] || 16);

  const offsetX = Number(parameters['offsetX'] || 0);
  const offsetY = Number(parameters['offsetY'] || 0);

  // ---------------------------------------------------------------------
  // Game_Player の拡張
  // ---------------------------------------------------------------------
  const _Game_Player_update = Game_Player.prototype.update;
  Game_Player.prototype.update = function (sceneActive) {
    _Game_Player_update.call(this, sceneActive);
    if (!$gameMap.isEventRunning()) {
      this.updateEventHint();
    } else {
      SceneManager._scene.hideEventHint();
    }
  };

  Game_Player.prototype.updateEventHint = function () {
    const event = this.getFacingEvent();

    if (event && event.isTriggerIn([0]) && event.hasHint()) {
      SceneManager._scene.showEventHint(event);
    } else {
      SceneManager._scene.hideEventHint();
    }
  };

  // Game_Player.prototype.getFacingEvent = function () {
  //   const x = $gameMap.roundXWithDirection(this.x, this.direction());
  //   const y = $gameMap.roundYWithDirection(this.y, this.direction());
  //   return $gameMap.events().find((event) => event.pos(x, y));
  // };

  Game_Player.prototype.getFacingEvent = function () {
    // プレイヤーの画面座標
    const playerScreenX = this.screenX();
    const playerScreenY = this.screenY();

    const usingHalfMove = typeof $gameMap.roundHalfXWithDirection === 'function';

    // プレイヤーが向いている座標
    const x = $gameMap.roundXWithDirection(this.x, this.direction());

    /**
     * @remarks トリアコンタン様 HalfMove.js対応（v2.2.1）
     * @see https://github.com/triacontane/RPGMakerMV/tree/mz_master/HalfMove.js
     */
    const y =
      usingHalfMove && this.isHalfMove()
        ? $gameMap.roundHalfYWithDirection(this.y, this.direction())
        : $gameMap.roundYWithDirection(this.y, this.direction());

    return $gameMap.events().find((event) => {
      // イベントの画面座標
      const eventScreenX = event.screenX();
      const eventScreenY = event.screenY();

      // イベントのプライオリティを取得
      const priorityType = event._priorityType;

      if (priorityType === 1) {
        // ノーマル
        // イベントがプレイヤーの向いている方向にいるか
        const isFacing = event.pos(x, y);

        /**
         * @remarks うなぎおおとろ様 DotMoveSystem.js対応（v2.2.4）
         * @see https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/DotMoveSystem.js
         */
        // 画面上の距離が一定範囲内かどうか
        const dx = Math.abs(playerScreenX - eventScreenX);
        const dy = Math.abs(playerScreenY - eventScreenY);

        // 判定: ピクセル単位での1タイル分の範囲（48ピクセル）内
        const isWithinRange = dx <= $gameMap.tileWidth() && dy <= $gameMap.tileHeight();

        // 両方の条件を満たす場合に true
        return isFacing && isWithinRange;
      } else {
        // 低または高プライオリティ
        // プレイヤーとイベントが同じ位置（画面座標で重なるかどうか）を判定
        const isOverlapping =
          Math.abs(playerScreenX - eventScreenX) < 24 && // 半タイル以内で重なる
          Math.abs(playerScreenY - eventScreenY) < 24;

        return isOverlapping;
      }
    });
  };

  // ---------------------------------------------------------------------
  // Game_Event の拡張
  // ---------------------------------------------------------------------
  const CODE_PLUGIN_COMMAND = 357;

  // キャッシュ用プロパティの初期化
  const _Game_Event_prototype_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function (mapId, eventId) {
    _Game_Event_prototype_initialize.call(this, mapId, eventId);
    this._hintTextCache = null; // キャッシュを初期化
  };

  Game_Event.prototype.hasHint = function () {
    const hintText = this.getHintText();
    return hintText !== '';
  };

  const createHintText = ({ hintIcon, hintColor, hintText }) => {
    let text = '';
    if (hintIcon !== '' && !isNaN(Number(hintIcon))) {
      text += `\\i[${Number(hintIcon)}]`;
    }
    if (hintColor !== '' && !isNaN(Number(hintColor))) {
      text += `\\c[${Number(hintColor)}]`;
    }
    text += hintText;
    return text;
  };

  Game_Event.prototype.getHintText = function () {
    // キャッシュが存在すればそれを返す
    if (this._hintTextCache !== null) {
      return this._hintTextCache;
    }

    const page = this.page();
    if (!page || !page.list || page.list.length === 0) return '';

    const { code, parameters } = page.list[0];
    if (code === CODE_PLUGIN_COMMAND) {
      const [pluginName, pluginCommand, _, { hintIcon, hintColor, hintText }] = parameters;
      if (pluginName === 'Sakura_HintWhenFacingEvent' && pluginCommand === 'registerHint') {
        const text = createHintText({ hintIcon, hintColor, hintText });
        this._hintTextCache = text ?? ''; // キャッシュに保存
        return this._hintTextCache;
      }
    }

    this._hintTextCache = ''; // キャッシュに空文字列を保存
    return this._hintTextCache;
  };

  // キャッシュを破棄するメソッド
  Game_Event.prototype.clearHintTextCache = function () {
    this._hintTextCache = null; // キャッシュを破棄
  };

  // イベントリフレッシュ時にキャッシュを破棄
  const _Game_Event_prototype_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function () {
    this.clearHintTextCache(); // キャッシュを破棄
    _Game_Event_prototype_refresh.call(this);
  };

  // ---------------------------------------------------------------------
  // Scene_Map の拡張
  // ---------------------------------------------------------------------
  Scene_Map.prototype.showEventHint = function (event) {
    if (!this._eventHintWindow) {
      this.createEventHintWindow();
    }
    const text = event.getHintText();
    this._eventHintWindow.setText(text);
    this._eventHintWindow.setPosition(
      $gamePlayer.screenX() - this._eventHintWindow.width / 2 + offsetX,
      $gamePlayer.screenY() - 80 + offsetY
    );
    this._eventHintWindow.fadeIn();
  };

  Scene_Map.prototype.hideEventHint = function () {
    if (this._eventHintWindow) {
      this._eventHintWindow.fadeOut();
    }
  };

  Scene_Map.prototype.createEventHintWindow = function () {
    this._eventHintWindow = new Window_EventHint();
    this.addWindow(this._eventHintWindow);
  };

  // ---------------------------------------------------------------------
  // Window_EventHint
  // ---------------------------------------------------------------------
  class Window_EventHint extends Window_Base {
    constructor() {
      super(new Rectangle(0, 0, 240, 60));
      this.opacity = 0;
      this._targetOpacity = 0;
      this.hide();
    }

    setText(text) {
      this._text = text;
      this.refresh();
    }

    resetFontSettings() {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = defaultFontSize;
      this.contents.fontBold = true;
      this.contents.outlineWidth = 4;
      this.resetTextColor();
    }

    refresh() {
      this.contents.clear();
      if (this._text) {
        this.resetFontSettings();
        const textWidth = this.textWidthEx(this._text);
        this.width = Math.max(textWidth + this.padding * 2, 10); // 最小幅を50pxに設定
        this.createContents();
        this.drawTextEx(this._text, 0, 0);
      }
    }

    textWidthEx(text) {
      this.resetFontSettings();
      return this.drawTextEx(text, 0, this.contents.height); // 高さを使わないためYは適当な値
    }

    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }

    fadeIn() {
      this._targetOpacity = 255;
      this.show();
    }

    fadeOut() {
      this._targetOpacity = 0;
    }

    update() {
      super.update();
      if (this.contentsOpacity !== this._targetOpacity) {
        const delta = fadeSpeed;
        if (this.contentsOpacity < this._targetOpacity) {
          this.contentsOpacity = Math.min(this.contentsOpacity + delta, this._targetOpacity);
        } else {
          this.contentsOpacity = Math.max(this.contentsOpacity - delta, this._targetOpacity);
        }
        if (this.contentsOpacity === 0) {
          this.hide(); // 完全に透明になったら非表示
        }
      }
    }

    processDrawIcon(iconIndex, textState) {
      const CRITERIA_FONT_SIZE = 26;

      const scale = defaultFontSize / CRITERIA_FONT_SIZE;
      if (textState.drawing) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2, scale);
      }
      textState.x += ImageManager.iconWidth * scale + 4;
    }

    drawIcon(iconIndex, x, y, scale = 1) {
      const bitmap = ImageManager.loadSystem('IconSet');
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (iconIndex % 16) * pw;
      const sy = Math.floor(iconIndex / 16) * ph;

      // スケールを考慮して描画
      const scaledWidth = pw * scale;
      const scaledHeight = ph * scale;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y, scaledWidth, scaledHeight);
    }
  }
})();
