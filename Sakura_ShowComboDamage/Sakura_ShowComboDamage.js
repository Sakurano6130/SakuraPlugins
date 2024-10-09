/*:
 * @target MZ
 * @plugindesc ✨ コンボダメージ表示プラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * 戦闘中にコンボ数と合計ダメージを表示します
 *
 * -------------------------------------------------
 * Sakura_ShowComboDamage
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/10/09 1.0.1 コンボ表示リセット後の１ヒット目の表示ができていないことがあったため、
 *                  リセットする処理の見直し
 * 2024/10/07 1.0.0 公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_ShowComboDamage/Sakura_ShowComboDamage.md
 *
 * @param windowPosition
 * @text ｳｨﾝﾄﾞｳﾎﾟｼﾞｼｮﾝ ---
 *
 * @param windowOffsetX
 * @parent windowPosition
 * @desc X軸ｵﾌｾｯﾄ
 * @text X軸ｵﾌｾｯﾄです
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param windowOffsetY
 * @parent windowPosition
 * @desc Y軸ｵﾌｾｯﾄ
 * @text Y軸ｵﾌｾｯﾄです
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param fontSettingsForHitCount
 * @text HIT数のﾌｫﾝﾄ設定 ---
 *
 * @param fontSizeHitCount
 * @parent fontSettingsForHitCount
 * @text HIT数ののﾌｫﾝﾄｻｲｽﾞ
 * @desc HIT数ののﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 36
 *
 * @param textColorHitCount
 * @parent fontSettingsForHitCount
 * @text HIT数の文字色
 * @desc HIT数の文字色です
 * @type string
 * @default #FFFFFF
 *
 * @param outlineColorHitCount
 * @parent fontSettingsForHitCount
 * @text HIT数の文字の縁取り色
 * @desc HIT数の文字の縁取り色です
 * @type string
 * @default #000000
 *
 * @param outlineWidthHitCount
 * @parent fontSettingsForHitCount
 * @text HIT数の文字の縁取り幅
 * @desc HIT数の文字の縁取り幅です
 * @type number
 * @default 6
 *
 * @param fontSettingsForHitLabel
 * @text HITﾗﾍﾞﾙのﾌｫﾝﾄ設定 ---
 *
 * @param fontSizeHitLabel
 * @parent fontSettingsForHitLabel
 * @text HITﾗﾍﾞﾙののﾌｫﾝﾄｻｲｽﾞ
 * @desc HITﾗﾍﾞﾙののﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 18
 *
 * @param textColorHitLabel
 * @parent fontSettingsForHitLabel
 * @text HITﾗﾍﾞﾙの文字色
 * @desc HITﾗﾍﾞﾙの文字色です
 * @type string
 * @default #FFD700
 *
 * @param outlineColorHitLabel
 * @parent fontSettingsForHitLabel
 * @text HITﾗﾍﾞﾙの文字の縁取り色
 * @desc HITﾗﾍﾞﾙの文字の縁取り色です
 * @type string
 * @default #000000
 *
 * @param outlineWidthHitLabel
 * @parent fontSettingsForHitLabel
 * @text HITﾗﾍﾞﾙの文字の縁取り幅
 * @desc HITﾗﾍﾞﾙの文字の縁取り幅です
 * @type number
 * @default 4
 *
 * @param fontSettingsForDamageSummary
 * @text ﾀﾞﾒｰｼﾞ合計のﾌｫﾝﾄ設定 ---
 *
 * @param fontSizeDamageSummary
 * @parent fontSettingsForDamageSummary
 * @text ﾀﾞﾒｰｼﾞ合計ののﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾀﾞﾒｰｼﾞ合計ののﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 36
 *
 * @param textColorDamageSummary
 * @parent fontSettingsForDamageSummary
 * @text ﾀﾞﾒｰｼﾞ合計の文字色
 * @desc ﾀﾞﾒｰｼﾞ合計の文字色です
 * @type string
 * @default #FFFFFF
 *
 * @param outlineColorDamageSummary
 * @parent fontSettingsForDamageSummary
 * @text ﾀﾞﾒｰｼﾞ合計の文字の縁取り色
 * @desc ﾀﾞﾒｰｼﾞ合計の文字の縁取り色です
 * @type string
 * @default #000000
 *
 * @param outlineWidthDamageSummary
 * @parent fontSettingsForDamageSummary
 * @text ﾀﾞﾒｰｼﾞ合計の文字の縁取り幅
 * @desc ﾀﾞﾒｰｼﾞ合計の文字の縁取り幅です
 * @type number
 * @default 6
 *
 * @param fontSettingsForDamageLabel
 * @text ﾀﾞﾒｰｼﾞﾗﾍﾞﾙのﾌｫﾝﾄ設定 ---
 *
 * @param fontSizeDamageLabel
 * @parent fontSettingsForDamageLabel
 * @text ﾀﾞﾒｰｼﾞﾗﾍﾞﾙののﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾀﾞﾒｰｼﾞﾗﾍﾞﾙののﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 18
 *
 * @param textColorDamageLabel
 * @parent fontSettingsForDamageLabel
 * @text ﾀﾞﾒｰｼﾞﾗﾍﾞﾙの文字色
 * @desc ﾀﾞﾒｰｼﾞﾗﾍﾞﾙの文字色です
 * @type string
 * @default #FFD700
 *
 * @param outlineColorDamageLabel
 * @parent fontSettingsForDamageLabel
 * @text ﾀﾞﾒｰｼﾞﾗﾍﾞﾙの文字の縁取り色
 * @desc ﾀﾞﾒｰｼﾞﾗﾍﾞﾙの文字の縁取り色です
 * @type string
 * @default #000000
 *
 * @param outlineWidthDamageLabel
 * @parent fontSettingsForDamageLabel
 * @text ﾀﾞﾒｰｼﾞﾗﾍﾞﾙの文字の縁取り幅
 * @desc ﾀﾞﾒｰｼﾞﾗﾍﾞﾙの文字の縁取り幅です
 * @type number
 * @default 4
 *
 * @param durationSetting
 * @text 時間設定 ---
 *
 * @param durationForHitCount
 * @parent durationSetting
 * @desc ｺﾝﾎﾞｶｳﾝﾄｱｯﾌﾟする時間(ﾌﾚｰﾑ)
 * @text ｺﾝﾎﾞｶｳﾝﾄｱｯﾌﾟする時間(ﾌﾚｰﾑ)です
 * @type number
 * @default 240
 *
 * @param fontFileSetting
 * @text ﾌｫﾝﾄﾌｧｲﾙ設定 ---
 *
 * @param fontFile
 * @parent fontFileSetting
 * @desc 使用するﾌｫﾝﾄのﾌｧｲﾙ名
 * @text 使用するﾌｫﾝﾄのﾌｧｲﾙ名（拡張子.ttfまで含みます）
 * @type string
 * @default
 *
 */

(() => {
  const pluginName = 'Sakura_ShowComboDamage';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const windowOffsetX = Number(parameters['windowOffsetX'] || 0);
  const windowOffsetY = Number(parameters['windowOffsetY'] || 0);

  const fontSizeHitCount = Number(parameters['fontSizeHitCount'] || 36);
  const textColorHitCount = String(parameters['textColorHitCount'] || '#FFFFFF');
  const outlineColorHitCount = String(parameters['outlineColorHitCount'] || '#000000');
  const outlineWidthHitCount = Number(parameters['outlineWidthHitCount'] || 6);

  const fontSizeHitLabel = Number(parameters['fontSizeHitLabel'] || 18);
  const textColorHitLabel = String(parameters['textColorHitLabel'] || '#FFD700');
  const outlineColorHitLabel = String(parameters['outlineColorHitLabel'] || '#000000');
  const outlineWidthHitLabel = Number(parameters['outlineWidthHitLabel'] || 4);

  const fontSizeDamageSummary = Number(parameters['fontSizeDamageSummary'] || 36);
  const textColorDamageSummary = String(parameters['textColorDamageSummary'] || '#FFFFFF');
  const outlineColorDamageSummary = String(parameters['outlineColorDamageSummary'] || '#000000');
  const outlineWidthDamageSummary = Number(parameters['outlineWidthDamageSummary'] || 6);

  const fontSizeDamageLabel = Number(parameters['fontSizeDamageLabel'] || 18);
  const textColorDamageLabel = String(parameters['textColorDamageLabel'] || '#FFD700');
  const outlineColorDamageLabel = String(parameters['outlineColorDamageLabel'] || '#000000');
  const outlineWidthDamageLabel = Number(parameters['outlineWidthDamageLabel'] || 4);

  const durationForHitCount = Number(parameters['durationForHitCount'] || 240);

  const fontFile = String(parameters['fontFile'] || '');

  // ----------------------------------------------------------------------------
  // TweenAnime実装処理
  // ----------------------------------------------------------------------------
  const CURVE_EASE_IN_OUT = 0;
  const CURVE_EASE_IN = 1;
  const CURVE_EASE_OUT = 2;
  const UNIFORM = 3;
  const DST_ABSOLUTE = 0;

  class TweenAnime {
    constructor(parent, delayTime = 0) {
      this._parent = parent;
      this._srcPos = new Point(parent.x, parent.y);
      this._srcRotation = parent.rotation;
      this._srcScale = new Point(parent.scale.x, parent.scale.y);
      this._srcOpacity = parent.opacity;
      this._srcContentsOpacity = parent.contentsOpacity ?? parent.opacity;
      this._dstPos = new Point(parent.x, parent.y);
      this._dstRotation = this._srcRotation;
      this._dstScale = new Point(parent.scale.x, parent.scale.y);
      this._dstOpacity = this._srcOpacity;
      this._dstContentsOpacity = this._srcContentsOpacity;
      this._frameMax = 50;
      this._frame = 0;
      this._delayTime = delayTime;
      this._curveType = CURVE_EASE_OUT;
      this._coordinateType = DST_ABSOLUTE;
    }

    toPos(x, y, coordinateType = DST_ABSOLUTE) {
      this._dstPos = new Point(x, y);
      this._coordinateType = coordinateType;
    }

    toX(x, coordinateType = DST_ABSOLUTE) {
      this._dstPos.x = x;
      this._coordinateType = coordinateType;
    }

    toY(y, coordinateType = DST_ABSOLUTE) {
      this._dstPos.y = y;
      this._coordinateType = coordinateType;
    }

    toScale(scaleX, scaleY) {
      this._dstScale = new Point(scaleX, scaleY);
    }

    toRotation(rotation) {
      this._dstRotation = rotation;
    }

    toOpacity(opacity) {
      this._dstOpacity = opacity;
    }

    toContentsOpacity(opacity) {
      this._dstContentsOpacity = opacity;
    }

    toCount(frame) {
      this._frameMax = frame;
    }

    setCurveType(curveType) {
      this._curveType = curveType;
    }

    start(parent) {
      // 実際の開始処理
    }

    update() {
      if (this._delayTime > 0) {
        this._delayTime -= 1;
      } else {
        this._frame += 1;
      }

      const framePer = this._frame / parseFloat(this._frameMax);
      let per = 0;

      switch (this._curveType) {
        case CURVE_EASE_IN_OUT:
          if (framePer > 0.5) {
            per = 0.5 + Math.sin(Math.PI * (framePer - 0.5)) * 0.5;
          } else {
            per = (Math.sin(Math.PI * (-0.5 + framePer)) + 1) * 0.5;
          }
          break;
        case CURVE_EASE_IN:
          per = Math.sin(Math.PI * (-0.5 + framePer / 2)) + 1;
          break;
        case CURVE_EASE_OUT:
          per = Math.sin((Math.PI / 2) * framePer);
          break;
        case UNIFORM:
          per = framePer;
          break;
        default:
          per = framePer;
          break;
      }

      const parent = this._parent;
      parent.x = this._srcPos.x + (this._dstPos.x - this._srcPos.x) * per;
      parent.y = this._srcPos.y + (this._dstPos.y - this._srcPos.y) * per;
      parent.opacity = this._srcOpacity + (this._dstOpacity - this._srcOpacity) * per;

      if (parent.scale) {
        parent.scale = new Point(
          this._srcScale.x + (this._dstScale.x - this._srcScale.x) * per,
          this._srcScale.y + (this._dstScale.y - this._srcScale.y) * per
        );
        parent.rotation = this._srcRotation + (this._dstRotation - this._srcRotation) * per;
      }

      if (this.isEnd() && this.onEnd) {
        this.onEnd();
      }
    }

    isStarted() {
      return this._frame !== 0;
    }

    isEnd() {
      return this._frame === this._frameMax;
    }
  }

  // ----------------------------------------------------------------------------
  // Sprite に TweenAnime を適用するための処理
  // ----------------------------------------------------------------------------
  Sprite.prototype.pushTweenAnime = function (animation) {
    if (!this._animationStack) {
      this._animationStack = [];
    }
    this._animationStack.push(animation);
  };

  Sprite.prototype.setTweenAnime = function (animation) {
    this.deleteAllTweenAnime();
    this._animationStack.push(animation);
  };

  Sprite.prototype.deleteAllTweenAnime = function () {
    this._animationStack = [];
  };

  Sprite.prototype.isTweenAnimeRunning = function () {
    return !this._animationStack.isEmpty();
  };

  Sprite.prototype.tweenMoveTo = function (args, onEnd) {
    const { x, y, count, scale, rotation, opacity, delayTime } = args;
    const tween = new TweenAnime(this, delayTime);
    if (x !== undefined) tween.toX(x);
    if (y !== undefined) tween.toY(y);
    if (count !== undefined) tween.toCount(count);
    if (scale !== undefined) tween.toScale(scale, scale);
    if (rotation !== undefined) tween.toRotation(rotation);
    if (opacity !== undefined) tween.toOpacity(opacity);
    if (onEnd) {
      tween.onEnd = onEnd;
    }

    this.pushTweenAnime(tween);
    return this;
  };

  Sprite.prototype.forceTweenMoveTo = function (args, onEnd) {
    this.deleteAllTweenAnime();
    this.tweenMoveTo(args, onEnd);
    return this;
  };

  var updateSprite = Sprite.prototype.update;
  Sprite.prototype.update = function () {
    if (this._animationStack) {
      if (this._animationStack.length > 0) {
        this._animationStack[0].update(this);
        if (this._animationStack[0].isEnd()) {
          this._animationStack.shift();
        }
      }
    }
    updateSprite.call(this);
  };

  // ----------------------------------------------------------------------------
  // Window に TweenAnime を適用するための処理
  // ----------------------------------------------------------------------------
  Window_Base.prototype.pushTweenAnime = function (animation) {
    if (!this._animationStack) {
      this._animationStack = [];
    }
    this._animationStack.push(animation);
    return this;
  };

  Window_Base.prototype.setTweenAnime = function (animation) {
    this.deleteAllTweenAnime();
    this._animationStack.push(animation);
    return this;
  };

  Window_Base.prototype.deleteAllTweenAnime = function () {
    this._animationStack = [];
  };

  Window_Base.prototype.tweenMoveTo = function (args, onEnd) {
    const { x, y, count, scale, rotation, opacity, delayTime } = args;
    const tween = new TweenAnime(this, delayTime);

    if (x !== undefined) tween.toX(x);
    if (y !== undefined) tween.toY(y);
    if (count !== undefined) tween.toCount(count);
    if (scale !== undefined) tween.toScale(scale, scale);
    if (rotation !== undefined) tween.toRotation(rotation);
    if (opacity !== undefined) tween.toOpacity(opacity);
    if (onEnd) {
      tween.onEnd = onEnd;
    }
    this.pushTweenAnime(tween);
  };

  Window_Base.prototype.forceTweenMoveTo = function (args, onEnd) {
    this.deleteAllTweenAnime();
    this.tweenMoveTo(args, onEnd);
  };

  var _Window_Base_update = Window_Base.prototype.update;
  Window_Base.prototype.update = function () {
    if (this._animationStack) {
      if (this._animationStack.length > 0) {
        this._animationStack[0].update(this);
        if (this._animationStack[0].isEnd()) {
          this._animationStack.shift();
        }
      }
    }
    _Window_Base_update.call(this);
  };

  // ----------------------------------------------------------------------------
  // Game_System (コンボカウンタの追加メソッド)
  // ----------------------------------------------------------------------------
  /**
   * コンボの現在のカウントを返します。
   * @returns {number} コンボカウント
   */
  Game_System.prototype.comboCount = function () {
    if (this._comboCount === undefined) this._comboCount = 0;
    return this._comboCount;
  };

  /**
   * コンボのカウントとダメージをリセットします。
   */
  Game_System.prototype.resetCombo = function () {
    this.resetComboCount();
    this.resetComboDamage();
    this._oldComboCount = 0;
  };

  /**
   * コンボのカウントをリセットします。
   */
  Game_System.prototype.resetComboCount = function () {
    this._comboCount = 0;
  };

  /**
   * コンボによるダメージ量を返します。
   * @returns {number} コンボダメージ
   */
  Game_System.prototype.comboDamage = function () {
    if (this._comboDamage === undefined) this._comboDamage = 0;
    return this._comboDamage;
  };

  /**
   * コンボによるダメージをリセットします。
   */
  Game_System.prototype.resetComboDamage = function () {
    this._comboDamage = 0;
  };

  /**
   * コンボカウントとコンボダメージを増加させます。
   * @param {number} count - 増加させるコンボカウント
   * @param {number} damage - 増加させるダメージ量
   */
  Game_System.prototype.countupCombo = function (count, damage) {
    if (this._comboCount === undefined) this._comboCount = 0;
    if (this._comboDamage === undefined) this._comboDamage = 0;
    this._comboCount += count;
    this._comboDamage += damage;
  };

  // ----------------------------------------------------------------------------
  // Window_Combo (コンボ表示ウィンドウ)
  // ----------------------------------------------------------------------------
  /**
   * コンボ数とダメージを表示するウィンドウクラス
   *
   * @extends Window_Base
   */
  class Window_Combo extends Window_Base {
    /**
     * コンストラクタ
     */
    constructor() {
      const width = 300;
      const height = 240;
      const sx = Graphics.width;
      const sy = 20;
      const dx = Graphics.width - width + windowOffsetX;
      const dy = sy + windowOffsetY;
      const rect = new Rectangle(sx, sy, width, height);
      super(rect);

      this._sx = sx;
      this._sy = sy;
      this._dx = dx;
      this._dy = dy;
      this._hx = dx + width / 4;
      this._hy = dy;
      this._updateCount = 0;

      this.opacity = 0; // ウィンドウの透明度を0に設定
      this.createTextSprite(); // テキストスプライトの生成
      this.open(); // ウィンドウを開く
    }

    /**
     * コンボ数やダメージを表示するスプライトを作成します。
     */
    createTextSprite() {
      const width = 300;
      const height = 140;

      this._comboText = new Sprite();
      this._comboText.x = 0;
      this._comboText.y = 80;
      this._comboText.anchor.x = 0.4;
      this._comboText.anchor.y = 0.5;
      this.addChild(this._comboText);
      this._comboText.bitmap = new Bitmap(width, height);
      this._comboText.bitmap.fontFace = $gameSystem.comboWindowFontFace(); // 使用するフォントを設定
      this._comboText.bitmap.fontSize = 20;
      this._comboText.bitmap.textColor = 'white';
      this._comboText.bitmap.outlineColor = ColorManager.outlineColor();
      this._comboText.bitmap.outlineWidth = 0;
    }

    /**
     * ウィンドウの更新処理
     * フレームごとに呼ばれる。
     */
    update() {
      super.update();
      this.updateCount(); // カウントの更新
      if (this.needsRefresh()) {
        this.refresh(); // リフレッシュの必要がある場合は更新
      }
    }

    /**
     * カウントの状態を更新し、必要に応じてコンボをリセットします。
     */
    updateCount() {
      if (this._updateCount > 0) {
        this._updateCount -= 1;
        if (this._updateCount === 0) {
          $gameSystem.resetCombo(); // カウントが0になったらコンボをリセット
          this.tweenMoveTo({ x: this._sx, y: this._sy });
        }
      }
    }

    /**
     * コンボ数とダメージを更新してウィンドウに表示します。
     */
    refresh() {
      $gameSystem._oldComboCount = $gameSystem.comboCount(); // 現在のコンボ数を保存
      this._updateCount = durationForHitCount; // durationForHitCountフレーム後にリセット
      this.forceTweenMoveTo({ x: this._dx, y: this._dy, count: 20 });
      this._comboText.bitmap.clear(); // 表示内容をクリア

      const x = 0;
      const y = 0;
      const w = 200;
      const h = 100;

      // --- コンボ数の表示（HIT数） ---
      this._comboText.bitmap.fontSize = fontSizeHitCount; // フォントサイズを設定
      this._comboText.bitmap.textColor = textColorHitCount; // 文字色を白に設定
      this._comboText.bitmap.outlineColor = outlineColorHitCount; // アウトラインを黒に設定
      this._comboText.bitmap.outlineWidth = outlineWidthHitCount; // アウトラインの幅を設定
      this._comboText.bitmap.drawText($gameSystem.comboCount(), x, y, 150, h, 'right'); // コンボ数を表示

      // "Hits"テキストの表示
      this._comboText.bitmap.fontSize = fontSizeHitLabel;
      this._comboText.bitmap.textColor = textColorHitLabel; // ゴールド色で表示
      this._comboText.bitmap.outlineColor = outlineColorHitLabel;
      this._comboText.bitmap.outlineWidth = outlineWidthHitLabel;
      const hitText = $gameSystem.comboCount() < 2 ? 'Hit' : 'Hits';
      this._comboText.bitmap.drawText(` ${hitText}`, x + 150, y + 10, w, h, 'left'); // "Hits"を表示

      // --- ダメージの表示 ---
      this._comboText.bitmap.fontSize = fontSizeDamageSummary;
      this._comboText.bitmap.textColor = textColorDamageSummary;
      this._comboText.bitmap.outlineColor = outlineColorDamageSummary;
      this._comboText.bitmap.outlineWidth = outlineWidthDamageSummary;
      this._comboText.bitmap.drawText($gameSystem.comboDamage(), x, y + 50, 150, h, 'right'); // ダメージ表示

      // "Damage"テキストの表示
      this._comboText.bitmap.fontSize = fontSizeDamageLabel;
      this._comboText.bitmap.textColor = textColorDamageLabel;
      this._comboText.bitmap.outlineColor = outlineColorDamageLabel;
      this._comboText.bitmap.outlineWidth = outlineWidthDamageLabel;
      this._comboText.bitmap.drawText(' Damage', x + 150, y + 60, w, h, 'left'); // "Damage"を表示

      // アニメーション設定
      this._comboText.deleteAllTweenAnime();
      this._comboText.scale = new Point(1.5, 1.5);
      this._comboText.tweenMoveTo({ x: 100, y: 100, scale: 1 });
    }

    /**
     * コンボの表示が更新される必要があるかどうかを判定します。
     *
     * @returns {boolean} リフレッシュの必要性
     */
    needsRefresh() {
      if ($gameSystem.comboCount() === 0) return false;
      return $gameSystem._oldComboCount !== $gameSystem.comboCount(); // コンボ数が変わった場合に更新
    }
  }

  /**
   * バトル開始時の処理をフックして、敵ステータスウィンドウとコンボウィンドウを作成。
   */
  const _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function () {
    _Scene_Battle_start.call(this);
    this.createComboWindow(); // コンボウィンドウの作成
  };

  /**
   * コンボウィンドウを作成する。
   */
  Scene_Battle.prototype.createComboWindow = function () {
    this._comboWindow = new Window_Combo();
    this.addWindow(this._comboWindow);
  };

  // ---------------------------------------------------------------------
  // BattleManager の拡張
  // ---------------------------------------------------------------------
  const _BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function () {
    _BattleManager_startBattle.call(this);
    $gameSystem.resetCombo();
  };

  const _Window_BattleLog_prototype_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
  Window_BattleLog.prototype.displayHpDamage = function (target) {
    _Window_BattleLog_prototype_displayHpDamage.call(this, target);
    if (target.result().hpAffected) {
      if (target.result().hpDamage > 0 && !target.result().drain) {
        if (target.isEnemy()) {
          $gameSystem.countupCombo(1, target.result().hpDamage); // コンボカウントの更新
        }
      }
    }
  };

  // ---------------------------------------------------------------------
  // フォント設定
  // ---------------------------------------------------------------------
  // フォントの読み込み処理をオーバーライド
  const _Scene_Boot_prototype_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
  /**
   * ゲームフォントの読み込みを行う関数
   * プラグインで指定したフォントファイルがある場合、それも読み込みます。
   */
  Scene_Boot.prototype.loadGameFonts = function () {
    _Scene_Boot_prototype_loadGameFonts.call(this);
    if (fontFile) {
      FontManager.load('rmmz-comboWindowFont', fontFile);
    }
  };

  /**
   * 使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.comboWindowFontFace = function () {
    return 'rmmz-comboWindowFont, ' + $dataSystem.advanced.fallbackFonts;
  };
})();
