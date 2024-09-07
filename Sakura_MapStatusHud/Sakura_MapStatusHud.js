/*:
 * @target MZ
 * @plugindesc マップ上にステータス表示します。
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * マップ上にステータス表示します。
 *
 * -------------------------------------------------
 * Sakura_MapStatusHud
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/09/07 1.1.0 表示制御の機能追加、アクター表示順の選択機能追加
 * 2024/09/04 1.0.0 公開
 * -------------------------------------------------
 *
 * プラグインコマンド:
 *
 * 常に表示モードにする:
 * HUDを常に表示します。自動表示モードに戻すまで表示し続けます。
 * イベント実行中も表示されます。
 *
 * 常に隠すモードにする:
 * HUDを常に隠します。自動表示モードに戻すまで表示されません。
 *
 * 自動表示モードに戻す:
 * 自動表示モードに切り替えます。時間差で半分隠れるようになり、
 * イベント実行中は全体が隠れます。
 *
 * -------------------------------------------------
 * @param groupShowEachItem
 * @text 📄 各項目を表示するかどうか ---
 *
 * @param ShowActorName
 * @parent groupShowEachItem
 * @text 名前を表示するかどうか
 * @desc 名前を表示するかどうか。trueで表示、falseで非表示。
 * @type boolean
 * @default true
 *
 * @param ShowActorLevel
 * @parent groupShowEachItem
 * @text レベルを表示するかどうか
 * @type boolean
 * @desc レベルを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorClass
 * @parent groupShowEachItem
 * @text 職業を表示するかどうか
 * @type boolean
 * @desc 職業を表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorFace
 * @parent groupShowEachItem
 * @text 顔グラフィックを表示するかどうか
 * @type boolean
 * @desc 顔グラフィックを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorHP
 * @parent groupShowEachItem
 * @text HPを表示するかどうか
 * @type boolean
 * @desc HPを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorMP
 * @parent groupShowEachItem
 * @text MPを表示するかどうか
 * @type boolean
 * @desc MPを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorTP
 * @parent groupShowEachItem
 * @text TPを表示するかどうか
 * @type boolean
 * @desc TPを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorState
 * @parent groupShowEachItem
 * @text ステートアイコンを表示するかどうか
 * @type boolean
 * @desc ステートアイコンを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param groupLayout
 * @text 🖼️ レイアウト ---
 *
 * @param displayOrder
 * @parent groupLayout
 * @text 表示順
 * @desc 各アクターの表示順を設定します。
 * @type select
 * @option 上から下
 * @value fromTopToBottom
 * @option 下から上
 * @value fromBottomToTop
 * @default fromTopToBottom
 *
 * @param windowWidth
 * @parent groupLayout
 * @text 各アクターのウィンドウの幅
 * @type number
 * @desc 各アクターのウィンドウの幅を設定します。
 * @default 220
 *
 * @param windowHeight
 * @parent groupLayout
 * @text 各アクターのウィンドウの高さ（全体の高さではなく各アクターの高さです）
 * @type number
 * @desc 各アクターのウィンドウの高さを設定します。
 * @default 100
 *
 * @param faceSize
 * @parent groupLayout
 * @text 顔グラフィックのサイズ(0で自動調整)
 * @type number
 * @desc 顔グラフィックのサイズを設定します。等倍は144です。0にすると大きさを自動調整します。
 * @default 0
 *
 * @param nameFontSize
 * @parent groupLayout
 * @text 名前のフォントサイズ
 * @type number
 * @desc 名前のフォントサイズを設定します。
 * @default 18
 *
 * @param levelFontSize
 * @parent groupLayout
 * @text レベルのフォントサイズ
 * @type number
 * @desc レベルのフォントサイズを設定します。
 * @default 18
 *
 * @param gaugeLabelFontSize
 * @parent groupLayout
 * @text ゲージラベルのフォントサイズ
 * @type number
 * @desc ゲージラベルのフォントサイズを設定します。
 * @default 18
 *
 * @param gaugeHeight
 * @parent groupLayout
 * @text ゲージの高さ
 * @type number
 * @desc ゲージの高さを設定します。
 * @default 8
 *
 * @param gaugeValueFontSize
 * @parent groupLayout
 * @text ゲージ値のフォントサイズ
 * @type number
 * @desc ゲージ値のフォントサイズを設定します。
 * @default 18
 *
 * @param statusIconSize
 * @parent groupLayout
 * @text ステートアイコンのサイズ
 * @type number
 * @desc ステートアイコンのサイズを設定します。
 * @default 24
 *
 * @param marginOfEachActor
 * @parent groupLayout
 * @text アクター間の余白
 * @type number
 * @desc アクター間の余白を設定します。
 * @default 0
 *
 * @param fontFileForString
 * @parent groupLayout
 * @text 文字やラベルのフォントファイル名
 * @desc 文字やラベルのフォントファイル名
 * @type string
 * @default
 *
 * @param fontFileForNumber
 * @parent groupLayout
 * @text HPなどの数字のフォントファイル名
 * @desc HPなどの数字のフォントファイル名
 * @type string
 * @default
 *
 * @param controlVisibility
 * @text 🎛️ 表示制御 ---
 *
 * @param hudHideCount
 * @parent controlVisibility
 * @text HUDが半分隠れるまでのカウント数
 * @type number
 * @desc HUDが自動で隠れるまでのカウント数を設定します。
 * @default 600
 * @min 1
 *
 * @param needsCheckPlayerCollide
 * @parent controlVisibility
 * @text プレイヤーと重なった時半透明にするか
 * @type boolean
 * @on 半透明にする
 * @off 半透明にしない
 * @desc プレイヤーと重なった時、HUDを半透明にします。処理が重たくなってしまうようだったらfalseにしてください。
 * @default true
 *
 * -------------------------------------------------
 * @command forceNeedsAllShowOn
 * @text 常に表示モードにする
 * @desc HUDを常に表示します。自動表示モードに戻すまで表示し続けます。イベント実行中も表示されます。
 *
 * @command forceNeedsAllHideOn
 * @text 常に隠すモードにする
 * @desc HUDを常に隠します。自動表示モードに戻すまで表示されません。
 *
 * @command setForceModeOff
 * @text 自動表示モードに戻す
 * @desc 自動表示モードに切り替えます。時間差で半分隠れるようになり、イベント実行中は全体が隠れます。
 *
 */

(() => {
  const pluginName = 'Sakura_MapStatusHud';
  const parameters = PluginManager.parameters(pluginName);

  const displayOrder = String(parameters['displayOrder'] || 'fromTopToBottom');
  const showActorName = parameters['ShowActorName'] === 'true';
  const showActorLevel = parameters['ShowActorLevel'] === 'true';
  const showActorClass = parameters['ShowActorClass'] === 'true';
  const showActorFace = parameters['ShowActorFace'] === 'true';
  const showActorHP = parameters['ShowActorHP'] === 'true';
  const showActorMP = parameters['ShowActorMP'] === 'true';
  const showActorTP = parameters['ShowActorTP'] === 'true';
  const showActorState = parameters['ShowActorState'] === 'true';

  const windowWidth = Number(parameters['windowWidth'] || 220);
  const windowHeight = Number(parameters['windowHeight'] || 100);
  const faceSize = Number(parameters['faceSize'] || 0);
  const nameFontSize = Number(parameters['nameFontSize'] || 18);
  const levelFontSize = Number(parameters['levelFontSize'] || 18);
  const gaugeLabelFontSize = Number(parameters['gaugeLabelFontSize'] || 18);
  const gaugeHeight = Number(parameters['gaugeHeight'] || 8);
  const gaugeValueFontSize = Number(parameters['gaugeValueFontSize'] || 18);
  const statusIconSize = Number(parameters['statusIconSize'] || 24);
  const marginOfEachActor = Number(parameters['marginOfEachActor'] || 0);
  const hudHideCount = Number(parameters['hudHideCount'] || 600);
  const fontFileForString = String(parameters.fontFileForString || '');
  const fontFileForNumber = String(parameters.fontFileForNumber || '');

  const needsCheckPlayerCollide = parameters['needsCheckPlayerCollide'] === 'true';

  const WINDOW_PADDING = 12;

  /**
   * プラグインコマンドの登録
   */
  PluginManager.registerCommand(pluginName, 'forceNeedsAllShowOn', function () {
    $gameSystem._mapHudForceControlMode = 'allShow';
  });
  PluginManager.registerCommand(pluginName, 'forceNeedsAllHideOn', function () {
    $gameSystem._mapHudForceControlMode = 'allHide';
  });
  PluginManager.registerCommand(pluginName, 'setForceModeOff', function () {
    $gameSystem._mapHudForceControlMode = null;
  });

  Bitmap.prototype.maskedBlt = function (source1, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    if (
      sx >= 0 &&
      sy >= 0 &&
      sw > 0 &&
      sh > 0 &&
      dw > 0 &&
      dh > 0 &&
      sx + sw <= source1.width &&
      sy + sh <= source1.height
    ) {
      const ctx = this._context;
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 2; // 縁取りの幅を設定
      ctx.strokeStyle = 'rgba(180, 120, 0, 0.5)'; // 縁取りの色を設定

      ctx.save(); // クリッピング前の状態を保存

      // 行
      for (let row = 0; row < 2; row++) {
        // 列
        for (let col = 0; col < 4; col++) {
          // クリッピング用の円を描く
          ctx.beginPath();
          ctx.arc(
            ImageManager.faceWidth / 2 + ImageManager.faceWidth * col,
            ImageManager.faceHeight / 2 + ImageManager.faceHeight * row,
            ImageManager.faceWidth / 2,
            0,
            Math.PI * 2
          );
          ctx.clip(); // 現在のパスをクリップ
          ctx.drawImage(source1._image, sx, sy, sw, sh, dx, dy, dw, dh);

          ctx.restore(); // クリッピング前の状態に戻す
          ctx.save(); // 次のクリッピング用に再度保存
        }
      }

      ctx.restore(); // 最後に保存した状態を復元
    }
  };

  class Sprite_Face_MapStatusHud extends Sprite {
    constructor() {
      super();
      this.initMembers();
    }

    initMembers() {
      this._battler = null;
      this._baseScale = 1;
      this._defaultCount = 20;
      this._updateCount = this._defaultCount;
    }

    destroy(options) {
      this._faceSprite.destroy();
      super.destroy(options);
    }

    setup(battler, scale) {
      this._battler = battler;
      const innerWidth = faceSize || windowWidth / 2 - WINDOW_PADDING * 2;
      this._baseScale = scale ?? 1 * (innerWidth / ImageManager.faceWidth);
      this._faceIndex = this._battler._faceIndex;
      this._faceImage = null;
      this._faceSprite = null;
      this._faceSpriteCreated = false;
      this.createBitmap();
    }

    createBitmap() {
      this._faceImage = ImageManager.loadFace(this._battler.faceName());
      this._faceImage.addLoadListener(this.onFaceImageLoad.bind(this));
    }

    onFaceImageLoad() {
      this.createFace();
    }

    bitmapWidth() {
      return ImageManager.faceWidth;
    }

    bitmapHeight() {
      return ImageManager.faceHeight;
    }

    update() {
      super.update();
      this.updateBitmap();
    }

    updateBitmap() {
      if (this._faceIndex !== this._battler._faceIndex) {
        this._faceIndex = this._battler._faceIndex;
        this.refreshFaceIndex();
        this._updateCount = this._defaultCount;
      }
      this.updateScale();
    }

    createFace() {
      this._faceSprite = new Sprite();
      this._faceSprite.bitmap = new Bitmap(this._faceImage.width, this._faceImage.height);
      const sx = 0;
      const sy = 0;
      const sw = this._faceImage.width;
      const sh = this._faceImage.height;
      const dx = 0;
      const dy = 0;
      this._faceSprite.bitmap.maskedBlt(this._faceImage, sx, sy, sw, sh, dx, dy);
      this._faceSprite.anchor.x = 0;
      this._faceSprite.anchor.y = 0;
      this._faceSprite.visible = true;
      this.addChild(this._faceSprite);
      this.refreshFaceIndex();
    }

    refreshFaceIndex() {
      const faceIndex = this._faceIndex;
      const pw = this.bitmapWidth();
      const ph = this.bitmapHeight();
      const sw = this.bitmapWidth();
      const sh = this.bitmapHeight();
      const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
      const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
      this._faceSprite.setFrame(sx, sy, sw, sh);
    }

    updateScale() {
      if (this._updateCount > 0) {
        this._updateCount--;
        const scale = this._baseScale + this._updateCount * 0.005;
        this.scale.x = scale;
        this.scale.y = scale;
      }
    }
  }

  class Sprite_StateIcon_MapStatusHud extends Sprite_StateIcon {
    update() {
      super.update();
      this.updateScale();
    }

    updateScale() {
      const scale = statusIconSize / ImageManager.iconWidth;
      this.scale.x = scale;
      this.scale.y = scale;
    }
  }

  class Sprite_Name_MapStatusHud extends Sprite_Name {
    bitmapWidth() {
      return windowWidth / 2 - WINDOW_PADDING * 2;
    }
    bitmapHeight() {
      return 24;
    }
    fontFace() {
      return fontFileForString ? $gameSystem.mapHudFontForString() : $gameSystem.mainFontFace();
    }
    fontSize() {
      return nameFontSize;
    }
  }

  class Sprite_ClassLevel_MapStatusHud extends Sprite_Name {
    initMembers() {
      this._battler = null;
      this._level = '';
      this._textColor = '';
    }

    bitmapWidth() {
      return windowWidth / 2 - WINDOW_PADDING * 2;
    }
    bitmapHeight() {
      return 24;
    }
    fontFace() {
      return fontFileForString ? $gameSystem.mapHudFontForString() : $gameSystem.mainFontFace();
    }
    fontSize() {
      return levelFontSize;
    }
    updateBitmap() {
      const actorLevel = this.actorLevel();
      const color = this.textColor();
      if (actorLevel !== this._level || color !== this._textColor) {
        this._level = actorLevel;
        this._textColor = color;
        this.redraw();
      }
    }

    actorLevel() {
      return this._battler ? this._battler.level : '';
    }

    redraw() {
      const actorLevel = this.actorLevel();
      const width = this.bitmapWidth();
      const height = this.bitmapHeight();
      this.setupFont();
      this.bitmap.clear();
      const className = this._battler.currentClass().name;

      if (showActorLevel && showActorClass) {
        this.bitmap.drawText(`${className} Lv.${actorLevel}`, 0, 0, width, height, 'right');
        return;
      }

      if (showActorLevel && !showActorClass) {
        this.bitmap.drawText(`Lv.${actorLevel}`, 0, 0, width, height, 'right');
        return;
      }

      if (!showActorLevel && showActorClass) {
        this.bitmap.drawText(`${className}`, 0, 0, width, height, 'right');
        return;
      }
    }
  }

  class Sprite_Gauge_MapStatusHud extends Sprite_Gauge {
    bitmapWidth() {
      return windowWidth / 2 - WINDOW_PADDING * 2;
    }
    bitmapHeight() {
      return gaugeHeight + 20;
    }
    textHeight() {
      return Math.max(gaugeLabelFontSize, gaugeValueFontSize);
    }
    gaugeHeight() {
      return gaugeHeight;
    }
    gaugeX() {
      if (this._statusType === 'time') {
        return 0;
      } else {
        // return this.measureLabelWidth() + 6;
        return 0;
      }
    }

    drawGaugeRect(x, y, width, height) {
      const rate = this.gaugeRate();
      const fillW = Math.floor((width - 2) * rate);
      const fillH = height - 2;
      const color0 = this.gaugeBackColor();
      const color1 = this.gaugeColor1();
      const color2 = this.gaugeColor2();

      // ゲージの背景を描画
      this.bitmap.fillRect(x, y, width, height, color0);

      // グラデーションでゲージのメイン部分を描画
      this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);

      // 光沢のあるハイライトを追加
      const highlightColor = 'rgba(255, 255, 255, 0.5)'; // 半透明の白色を使って光沢を表現
      const highlightHeight = Math.floor(height / 3); // ハイライトの高さ
      const highlightY = y + 1; // ハイライトのY座標

      // ハイライトの線を描画
      this.bitmap.gradientFillRect(
        x + 1,
        highlightY,
        fillW,
        highlightHeight,
        highlightColor,
        'rgba(255, 255, 255, 0)'
      );
    }

    labelFontFace() {
      return fontFileForString ? $gameSystem.mapHudFontForString() : $gameSystem.mainFontFace();
    }
    labelFontSize() {
      return gaugeLabelFontSize;
    }

    valueFontFace() {
      return fontFileForNumber ? $gameSystem.mapHudFontForNumber() : $gameSystem.numberFontFace();
    }

    valueFontSize() {
      return gaugeValueFontSize;
    }
  }

  class TweenAnime {
    constructor(parent, delayTime = 0) {
      this._parent = parent;
      this._srcPos = new Point(parent.x, parent.y);
      this._dstPos = new Point(parent.x, parent.y);
      this._frameMax = 50;
      this._frame = 0;
      this._delayTime = delayTime;
    }

    toPos(x, y) {
      this._dstPos = new Point(x, y);
    }

    toX(x) {
      this._dstPos.x = x;
    }

    toY(y) {
      this._dstPos.y = y;
    }

    toCount(frame) {
      this._frameMax = frame;
    }

    update() {
      if (this._delayTime > 0) {
        this._delayTime -= 1;
      } else {
        this._frame += 1;
      }

      const framePer = this._frame / parseFloat(this._frameMax);
      let per = 0;

      if (framePer > 0.5) {
        per = 0.5 + Math.sin(Math.PI * (framePer - 0.5)) * 0.5;
      } else {
        per = (Math.sin(Math.PI * (-0.5 + framePer)) + 1) * 0.5;
      }

      const parent = this._parent;
      parent.x = this._srcPos.x + (this._dstPos.x - this._srcPos.x) * per;
      parent.y = this._srcPos.y + (this._dstPos.y - this._srcPos.y) * per;

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

  Window_StatusBase.prototype.placeActorNameMapStatusHud = function (actor, x, y) {
    const key = 'actor%1-nameMapStatusHud'.format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_Name_MapStatusHud);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
  };

  Window_StatusBase.prototype.placeActorFaceMapStatusHud = function (actor, x, y, scale) {
    const key = 'actor%1-face'.format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_Face_MapStatusHud);
    sprite.setup(actor, scale);
    sprite.move(x, y);
    sprite.show();
  };

  Window_StatusBase.prototype.placeActorClassLevelMapStatusHud = function (actor, x, y) {
    const key = 'actor%1-classLevel'.format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_ClassLevel_MapStatusHud);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
  };

  Window_StatusBase.prototype.placeGaugeMapStatusHud = function (actor, type, x, y) {
    const key = 'actor%1-gaugeMapStatusHud-%2'.format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_Gauge_MapStatusHud);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
  };

  Window_StatusBase.prototype.placeStateIconMapStatusHud = function (actor, x, y) {
    const key = 'actor%1-stateIconMapStatusHud'.format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_StateIcon_MapStatusHud);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
  };

  class Window_StatusBaseTween extends Window_StatusBase {
    constructor(rect) {
      super(rect);
      this._animationStack = [];
    }

    pushTweenAnime(animation) {
      if (!this._animationStack) {
        this._animationStack = [];
      }
      this._animationStack.push(animation);
      return this;
    }

    deleteAllTweenAnime() {
      this._animationStack = [];
    }

    tweenMoveTo(args, onEnd) {
      const { x, y, count, delayTime } = args;
      const tween = new TweenAnime(this, delayTime);
      if (x !== undefined) tween.toX(x);
      if (y !== undefined) tween.toY(y);
      if (count !== undefined) tween.toCount(count);
      if (onEnd) {
        tween.onEnd = onEnd;
      }
      this.pushTweenAnime(tween);
    }

    forceTweenMoveTo(args, onEnd) {
      this.deleteAllTweenAnime();
      this.tweenMoveTo(args, onEnd);
    }

    update() {
      this.updateAnimation();
      super.update();
    }

    updateAnimation() {
      if (this._animationStack) {
        if (this._animationStack.length > 0) {
          this._animationStack[0].update(this);
          if (this._animationStack[0].isEnd()) {
            this._animationStack.shift();
          }
        }
      }
    }
  }

  class Window_MapStatusHud extends Window_StatusBaseTween {
    static HIDE_COUNT = hudHideCount;

    constructor(rect, index) {
      super(rect);
      this._index = index;
      this._animationStack = [];
      this._hideCount = this.constructor.HIDE_COUNT;
      this._isAllShow = false;
      this._isHalfHidden = false;
      this._isAllHidden = false;
      const sx = Graphics.boxWidth;
      const sy = this.y;
      const dx = Graphics.boxWidth - this.width;
      const dy = sy;
      this._sx = sx;
      this._sy = sy;
      this._dx = dx;
      this._dy = dy;
      this._hx = dx + this.width / 2;
      this._hy = dy;
      this._oldHp = null;
      this._oldMp = null;
      this._oldTp = null;
      this._oldLevel = null;
      this._oldClassId = null;
      this._oldStates = null;
      this._targetOpacity = 255; // 目標の透明度（ウィンドウ内のコンテンツの透明度）
      this._fadeSpeed = 10; // フェードの速さ
      this.initialize(rect);
    }

    initialize(rect) {
      super.initialize(rect);
      this.opacity = 0;
      this.refresh();
      this.allShow();
    }

    refresh() {
      this.contents.clear();
      const actor = this._actor;
      if (!actor) return;

      let x = 0;
      let y = 0;
      const lineHeight = (windowHeight - WINDOW_PADDING) / 5;
      if (showActorFace) {
        this.placeActorFaceMapStatusHud(this._actor, x, y);
      }

      if (showActorName) {
        this.placeActorNameMapStatusHud(actor, x, y);
      }
      if (showActorLevel || showActorClass) {
        this.placeActorClassLevelMapStatusHud(actor, x + this.width / 2, y);
        y += lineHeight;
      }

      x = this.width / 2;
      y = lineHeight;
      if (showActorHP) {
        this.placeGaugeMapStatusHud(actor, 'hp', x, y);
        y += lineHeight;
      }
      if (showActorMP) {
        this.placeGaugeMapStatusHud(actor, 'mp', x, y);
        y += lineHeight;
      }
      if (showActorTP) {
        this.placeGaugeMapStatusHud(actor, 'tp', x, y);
        y += lineHeight;
      }
      const iconOffset = statusIconSize / 2;
      x = 0 + iconOffset;
      // 下を起点にする
      y = windowHeight - WINDOW_PADDING - statusIconSize;
      if (showActorState) {
        /**
         * @remarks 1pxずらしたほうが見た目がよかった
         */
        this.placeStateIconMapStatusHud(actor, x + 1, y);
      }
      this.allShow();
    }

    setActor(actor) {
      this._actor = actor;
      this.refresh();
    }

    update() {
      super.update();
      this.updateHide();
      if (needsCheckPlayerCollide) {
        this.checkPlayerCollision();
        this.updateOpacity();
      }
    }

    updateHide() {
      if (this.needsAllHide()) {
        this.allHide();
        return;
      }
      if (this.needsAllShow()) {
        this.allShow();
        return;
      }
      if (this.needsHalfHide()) {
        this.halfHide();
      }
    }

    needsAllHide() {
      if ($gameSystem._mapHudForceControlMode === 'allHide') {
        return true;
      }
      if ($gameSystem._mapHudForceControlMode === 'allShow') {
        return false;
      }
      // イベント実行中
      if ($gameMap.isEventRunning()) {
        return true;
      }
      return false;
    }

    needsAllShow() {
      if ($gameSystem._mapHudForceControlMode === 'allShow') {
        return true;
      }
      if ($gameSystem._mapHudForceControlMode === 'allHide') {
        return false;
      }
      // 拡張用
      // if (this._requestShowPartyHud) {
      //   this._requestShowPartyHud = false;
      //   this._hideCount = this.constructor.HIDE_COUNT;
      //   return true;
      // }
      // HPが変わったとき
      if (showActorHP && this._oldHp !== this._actor.hp) {
        this._oldHp = this._actor.hp;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // MPが変わったとき
      if (showActorMP && this._oldMp !== this._actor.mp) {
        this._oldMp = this._actor.mp;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // TPが変わったとき
      if (showActorTP && this._oldTp !== this._actor.tp) {
        this._oldTp = this._actor.tp;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // Levelが変わったとき
      if (showActorLevel && this._oldLevel !== this._actor.level) {
        this._oldLevel = this._actor.level;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // 職業が変わったとき
      if (showActorClass && this._oldClassId !== this._actor.classId) {
        this._oldClassId = this._actor.classId;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // ステートが変わったとき 配列をjoinして文字列で比較
      const currentActorStatesJoin = this._actor._states.join();
      if (showActorState && this._oldStates !== currentActorStatesJoin) {
        this._oldStates = currentActorStatesJoin;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      return false;
    }

    needsHalfHide() {
      if (this._hideCount >= 0) {
        this._hideCount -= 1;
      }
      if (this._hideCount <= 200) {
        return true;
      }
      return false;
    }

    allShow() {
      if (this._isAllShow) return;
      this._isAllShow = true;
      this._isHalfHidden = false;
      this._isAllHidden = false;
      this._hideCount = this.constructor.HIDE_COUNT;
      this.forceTweenMoveTo({ x: this._dx, y: this._dy });
    }

    halfHide() {
      if (this._isHalfHidden) return;
      this._isAllShow = false;
      this._isHalfHidden = true;
      this._isAllHidden = false;
      this.forceTweenMoveTo({ x: this._hx, y: this._hy });
    }

    allHide() {
      if (this._isAllHidden) return;
      this._isAllShow = false;
      this._isHalfHidden = false;
      this._isAllHidden = true;
      this.forceTweenMoveTo({ x: this._sx, y: this._sy });
    }

    // プレイヤーとの重なりをチェックして透明度を変更するメソッド
    checkPlayerCollision() {
      const tileWidth = $gameMap.tileWidth();
      const tileHeight = $gameMap.tileHeight();
      const playerRect = new Rectangle(
        $gamePlayer.screenX() - tileWidth,
        $gamePlayer.screenY() - tileHeight,
        /**
         * @todo Sprite_Characterの幅を取得する方法ってある？
         */
        tileWidth, // プレイヤーの幅
        tileHeight // プレイヤーの高さ
      );

      const windowRect = new Rectangle(this.x, this.y, this.width, this.height);

      // プレイヤーとHUDが重なったら目標透明度を50に設定し、そうでない場合は255に設定
      if (this.isCollided(playerRect, windowRect)) {
        this._targetOpacity = 50; // 半透明
      } else {
        this._targetOpacity = 255; // 通常表示
      }
    }

    // ウィンドウ内のコンテンツの透明度を徐々に変化させるメソッド
    updateOpacity() {
      if (this.contentsOpacity < this._targetOpacity) {
        this.contentsOpacity = Math.min(
          this.contentsOpacity + this._fadeSpeed,
          this._targetOpacity
        );
        this.setOpacityToInnerChildren(this.contentsOpacity);
      } else if (this.contentsOpacity > this._targetOpacity) {
        this.contentsOpacity = Math.max(
          this.contentsOpacity - this._fadeSpeed,
          this._targetOpacity
        );
        this.setOpacityToInnerChildren(this.contentsOpacity);
      }
    }

    setOpacityToInnerChildren(opacity) {
      for (const sprite of this._innerChildren) {
        sprite.opacity = opacity;
      }
    }

    // 矩形同士の衝突を判定するメソッド
    isCollided(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    }
  }

  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    this.createMapStatusHudWindows();
  };

  Scene_Map.prototype.createMapStatusHudWindows = function () {
    const baseY = Graphics.height - windowHeight;
    this._mapStatusHudWindows = [];

    let i = 0;
    const members =
      displayOrder === 'fromTopToBottom' ? $gameParty.members().reverse() : $gameParty.members();

    for (const actor of members) {
      if (!actor) continue;

      const margin = marginOfEachActor;
      const rect = new Rectangle(
        Graphics.boxWidth + windowWidth / 2,
        baseY - i * (windowHeight + margin),
        windowWidth,
        windowHeight
      );
      const window = new Window_MapStatusHud(rect, i);
      window.setActor(actor);
      this._mapStatusHudWindows.push(window);
      this.addWindow(window);
      i += 1;
    }
  };

  Scene_Map.prototype.destroyMapStatusHudWindows = function () {
    if (Array.isArray(this._mapStatusHudWindows)) {
      for (const window of this._mapStatusHudWindows) {
        window.destroy();
      }
    }
    this._mapStatusHudWindows = [];
  };

  const _Game_Player_prototype_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function () {
    _Game_Player_prototype_refresh.call(this);
    if (!SceneManager._scene._mapStatusHudWindows) {
      return;
    }
    SceneManager._scene.destroyMapStatusHudWindows();
    SceneManager._scene.createMapStatusHudWindows();
  };

  const _Game_System_prototype_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_prototype_initialize.call(this);
    this._mapHudForceControlMode = null;
  };

  // フォントの読み込み処理をオーバーライド
  const _Scene_Boot_prototype_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
  /**
   * ゲームフォントの読み込みを行う関数
   * プラグインで指定したフォントファイルがある場合、それも読み込みます。
   */
  Scene_Boot.prototype.loadGameFonts = function () {
    _Scene_Boot_prototype_loadGameFonts.call(this);
    if (fontFileForString) {
      FontManager.load('rmmz-mapHudFontForString', fontFileForString);
    }
    if (fontFileForNumber) {
      FontManager.load('rmmz-mapHudFontForNumber', fontFileForNumber);
    }
  };

  Game_System.prototype.mapHudFontForString = function () {
    return 'rmmz-mapHudFontForString, ' + $dataSystem.advanced.fallbackFonts;
  };

  Game_System.prototype.mapHudFontForNumber = function () {
    return 'rmmz-mapHudFontForNumber, ' + $dataSystem.advanced.fallbackFonts;
  };
})();
