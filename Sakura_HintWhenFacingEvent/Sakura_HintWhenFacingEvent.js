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
 * 2024/11/20 1.1.0 カウンター越しにも表示されるように処理見直し
 *                  実行内容の1番目がコモンイベントで、かつその1番目にプラグインコマンドを置いた場合も表示されるように機能追加
 * 2024/11/19 1.0.1 キャラクターの画像ファイル名に「!」がついているとき、上からの接触時に
 *                  うまく表示されてなかったため修正
 *                  トリアコンタン様HalfMove.jsの半歩移動判定条件を修正
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
  // 共通関数
  // ---------------------------------------------------------------------
  /**
   * UIエリアのマージンを取得します。
   *
   * 画面の幅と高さに対して、UIエリアの中央配置に必要なX軸およびY軸のマージンを計算します。
   *
   * @returns {Object} マージンのオブジェクト。X軸とY軸のマージンが含まれます。
   * @property {number} uiMarginX - 横方向のマージン（左側のスペース）。
   * @property {number} uiMarginY - 縦方向のマージン（上側のスペース）。
   */
  const getMarginOfUIArea = () => {
    return {
      uiMarginX: (Graphics.width - Graphics.boxWidth) / 2,
      uiMarginY: (Graphics.height - Graphics.boxHeight) / 2,
    };
  };

  // ---------------------------------------------------------------------
  // Game_CharacterBase の拡張
  // ---------------------------------------------------------------------
  /**
   * !がつくと６ピクセルずらさない座標になってしまうのでその対策
   */
  Game_CharacterBase.prototype.screenYWithAllShiftY = function () {
    const SHIFT_Y = 6;
    const th = $gameMap.tileHeight();
    // return Math.floor(this.scrolledY() * th + th - this.shiftY() - this.jumpHeight());
    return Math.floor(this.scrolledY() * th + th - SHIFT_Y - this.jumpHeight());
  };

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

  Game_Player.prototype.getFacingEvent = function () {
    const isUsingHalfMove = typeof $gameMap.roundHalfXWithDirection === 'function';
    const isUsingDotMoveSystem = typeof $gamePlayer.createDotMoveTempData === 'function';
    const isOriginal = !isUsingHalfMove && !isUsingDotMoveSystem;
    if (isOriginal) {
      return this.getFacingEventForOriginal();
    }
    if (isUsingHalfMove) {
      return this.getFacingEventForHalfMove();
    }
    if (isUsingDotMoveSystem) {
      return this.getFacingEventForDotMoveSystem();
    }
  };

  const PRIORITY_NORMAL = 1;

  const isEventInTriggerHere = ({ event }) => {
    // プレイヤーの画面座標
    const playerScreenX = $gamePlayer.screenX();
    const playerScreenY = $gamePlayer.screenY();

    // イベントの画面座標
    const eventScreenX = event.screenX();
    const eventScreenY = event.screenYWithAllShiftY();

    // イベントのプライオリティを取得
    const priorityType = event._priorityType;

    if (priorityType !== PRIORITY_NORMAL) {
      // 低または高プライオリティ
      // プレイヤーとイベントが同じ位置（画面座標で重なるかどうか）を判定
      const isOverlapping =
        Math.abs(playerScreenX - eventScreenX) < $gameMap.tileWidth() / 2 && // 半タイル以内で重なる
        Math.abs(playerScreenY - eventScreenY) < $gameMap.tileHeight() / 2;

      return isOverlapping;
    }
  };

  const isEventInTriggerThere = ({ event, x, y, distance }) => {
    // プレイヤーの画面座標
    const playerScreenX = $gamePlayer.screenX();
    const playerScreenY = $gamePlayer.screenY();

    // イベントの画面座標
    const eventScreenX = event.screenX();
    const eventScreenY = event.screenYWithAllShiftY();

    // イベントのプライオリティを取得
    const priorityType = event._priorityType;

    if (priorityType === PRIORITY_NORMAL) {
      // ノーマル
      // イベントがプレイヤーの向いている方向にいるか
      const isFacing = event.pos(x, y);

      // 画面上の距離が一定範囲内かどうか
      const dx = Math.abs(playerScreenX - eventScreenX);
      const dy = Math.abs(playerScreenY - eventScreenY);

      // 判定: ピクセル単位での distance タイル分の範囲内
      const isWithinRange =
        dx <= $gameMap.tileWidth() * distance && dy <= $gameMap.tileHeight() * distance;

      // 両方の条件を満たす場合に true
      return isFacing && isWithinRange;
    }
  };

  /**
   * @remarks 通常の処理
   */
  Game_Player.prototype.getFacingEventForOriginal = function () {
    // プレイヤーが向いている座標
    const x = $gameMap.roundXWithDirection(this.x, this.direction());
    const y = $gameMap.roundYWithDirection(this.y, this.direction());

    let event;

    // 通常の向きチェック
    event = $gameMap.events().find((event) => isEventInTriggerHere({ event }));
    if (!event) {
      event = $gameMap
        .events()
        .find((event) => isEventInTriggerThere({ event, x, y, distance: 1 }));
    }

    // カウンター越しのチェック
    if (!event && $gameMap.isCounter(x, y)) {
      const x2 = $gameMap.roundXWithDirection(x, this.direction());
      const y2 = $gameMap.roundYWithDirection(y, this.direction());
      event = $gameMap
        .events()
        .find((event) => isEventInTriggerThere({ event, x: x2, y: y2, distance: 2 }));
    }

    return event;
  };

  /**
   * @remarks トリアコンタン様 HalfMove.js対応（v2.2.1）
   * @see https://github.com/triacontane/RPGMakerMV/tree/mz_master/HalfMove.js
   */
  Game_Player.prototype.getFacingEventForHalfMove = function () {
    // プレイヤーが向いている座標
    const x = $gameMap.roundXWithDirection(this.x, this.direction());
    const y = this.isHalfPosY()
      ? $gameMap.roundHalfYWithDirection(this.y, this.direction())
      : this.isMapPassable(this.x, this.y, this.direction())
      ? $gameMap.roundHalfYWithDirection(this.y, this.direction())
      : $gameMap.roundYWithDirection(this.y, this.direction());

    // 通常の向きチェック
    let event;
    event = $gameMap.events().find((event) => isEventInTriggerHere({ event }));
    if (!event) {
      event = $gameMap
        .events()
        .find((event) => isEventInTriggerThere({ event, x, y, distance: 1 }));
    }

    // カウンター越しのチェック
    if (!event && $gameMap.isCounter(x, y)) {
      const x2 = $gameMap.roundXWithDirection(x, this.direction());
      const y2 = $gameMap.roundYWithDirection(y, this.direction());
      event = $gameMap
        .events()
        .find((event) => isEventInTriggerThere({ event, x: x2, y: y2, distance: 2 }));
    }

    return event;
  };

  /**
   * @remarks うなぎおおとろ様 DotMoveSystem.js対応（v2.2.4）
   * @see https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/DotMoveSystem.js
   */
  Game_Player.prototype.getFacingEventForDotMoveSystem = function () {
    // プレイヤーが向いている座標
    const x = $gameMap.roundXWithDirection(this.x, this.direction());
    const y = $gameMap.roundYWithDirection(this.y, this.direction());

    // 通常の向きチェック
    let event;
    event = $gameMap.events().find((event) => isEventInTriggerHere({ event }));
    if (!event) {
      event = $gameMap
        .events()
        .find((event) => isEventInTriggerThere({ event, x, y, distance: 1 }));
    }

    // カウンター越しのチェック
    if (!event && $gameMap.isCounter(x, y)) {
      const x2 = $gameMap.roundXWithDirection(x, this.direction());
      const y2 = $gameMap.roundYWithDirection(y, this.direction());
      event = $gameMap
        .events()
        .find((event) => isEventInTriggerThere({ event, x: x2, y: y2, distance: 2 }));
    }

    return event;
  };

  // ---------------------------------------------------------------------
  // Game_Event の拡張
  // ---------------------------------------------------------------------
  const CODE_PLUGIN_COMMAND = 357;
  const CODE_COMMON_EVENT = 117;

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

    if (code === CODE_COMMON_EVENT) {
      const [commonEventId] = parameters;
      const commonEvent = $dataCommonEvents[commonEventId];
      if (commonEvent && commonEvent.list && commonEvent.list[0]) {
        const { code, parameters } = commonEvent.list[0];
        if (code === CODE_PLUGIN_COMMAND) {
          const [pluginName, pluginCommand, _, { hintIcon, hintColor, hintText }] = parameters;
          if (pluginName === 'Sakura_HintWhenFacingEvent' && pluginCommand === 'registerHint') {
            const text = createHintText({ hintIcon, hintColor, hintText });
            this._hintTextCache = text ?? ''; // キャッシュに保存
            return this._hintTextCache;
          }
        }
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
    const { uiMarginX, uiMarginY } = getMarginOfUIArea();

    const text = event.getHintText();
    this._eventHintWindow.setText(text);
    const x =
      ($gamePlayer.screenX() - this._eventHintWindow.width / 2 + offsetX - uiMarginX) *
      $gameScreen.zoomScale();
    const y = ($gamePlayer.screenY() - 80 + offsetY - uiMarginY) * $gameScreen.zoomScale();
    this._eventHintWindow.setPosition(x, y);
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
        this.width = Math.max(textWidth + this.padding * 2, 10); // 最小幅を10pxに設定
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
