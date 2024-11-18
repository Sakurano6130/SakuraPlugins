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
 * 2024/11/19 1.4.0 パーティーメンバーの数が $gameParty.maxBattleMembers を超える場合に
 *                  控えメンバーが表示されないように修正
 * 2024/10/04 1.3.1 経験値の始点と終点の色表示が逆になっていたので修正
 * 2024/09/30 1.3.0 経験値の表示を追加
 *                  各ゲージの色をプラグインパラメータで変えられる機能を追加
 *                  HP,MP,TP,経験値に変化があった場合に差分をポップアップ表示する機能を追加
 *                  各アクターのウィンドウの高さのデフォルト値を100→110に変更
 * 2024/09/08 1.2.0 画面の幅・高さとUIエリアの幅・高さが異なる場合の位置調整。
 *                  表示位置の調整機能追加。
 *                  常に半分表示機能の追加。
 * 2024/09/07 1.1.0 表示制御の機能追加、アクター表示順の選択機能追加
 * 2024/09/05 1.0.0 公開
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
 * @param ShowActorHPDiff
 * @parent groupShowEachItem
 * @text HPの変化を表示するかどうか
 * @type boolean
 * @desc HPの変化を表示するかどうかtrueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorMP
 * @parent groupShowEachItem
 * @text MPを表示するかどうか
 * @type boolean
 * @desc MPを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorMPDiff
 * @parent groupShowEachItem
 * @text MPの変化を表示するかどうか
 * @type boolean
 * @desc MPの変化を表示するかどうかtrueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorTP
 * @parent groupShowEachItem
 * @text TPを表示するかどうか
 * @type boolean
 * @desc TPを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorTPDiff
 * @parent groupShowEachItem
 * @text TPの変化を表示するかどうか
 * @type boolean
 * @desc TPの変化を表示するかどうかtrueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorState
 * @parent groupShowEachItem
 * @text ステートアイコンを表示するかどうか
 * @type boolean
 * @desc ステートアイコンを表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorExp
 * @parent groupShowEachItem
 * @text 経験値を表示するかどうか
 * @type boolean
 * @desc 経験値を表示するかどうか。trueで表示、falseで非表示。
 * @default true
 *
 * @param ShowActorExpDiff
 * @parent groupShowEachItem
 * @text 経験値の変化を表示するかどうか
 * @type boolean
 * @desc 経験値の変化を表示するかどうかtrueで表示、falseで非表示。
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
 * @default 110
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
 * @param gaugeColorHp1
 * @parent groupLayout
 * @text HPゲージ始点の色
 * @type color
 * @desc HPゲージ始点の色を設定します。
 * @default 20
 *
 * @param gaugeColorHp1
 * @parent groupLayout
 * @text HPゲージ始点の色
 * @type color
 * @desc HPゲージ始点の色を設定します。
 * @default 20
 *
 * @param gaugeColorHp2
 * @parent groupLayout
 * @text HPゲージ終点の色
 * @type color
 * @desc HPゲージ終点の色を設定します。
 * @default 21
 *
 * @param gaugeColorMp1
 * @parent groupLayout
 * @text MPゲージ始点の色
 * @type color
 * @desc MPゲージ始点の色を設定します。
 * @default 22
 *
 * @param gaugeColorMp2
 * @parent groupLayout
 * @text MPゲージ終点の色
 * @type color
 * @desc MPゲージ終点の色を設定します。
 * @default 23
 *
 * @param gaugeColorTp1
 * @parent groupLayout
 * @text TPゲージ始点の色
 * @type color
 * @desc TPゲージ始点の色を設定します。
 * @default 28
 *
 * @param gaugeColorTp2
 * @parent groupLayout
 * @text TPゲージ終点の色
 * @type color
 * @desc TPゲージ終点の色を設定します。
 * @default 29
 *
 * @param gaugeColorExp1
 * @parent groupLayout
 * @text Expゲージ始点の色
 * @type color
 * @desc Expゲージ始点の色を設定します。
 * @default 28
 *
 * @param gaugeColorExp2
 * @parent groupLayout
 * @text Expゲージ終点の色
 * @type color
 * @desc Expゲージ終点の色を設定します。
 * @default 29
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
 * @param labelColor
 * @parent groupLayout
 * @text HP,MP,TPラベルの色
 * @desc HP,MP,TPラベルの色を設定します。
 * @type color
 * @default 16
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
 * @param windowOffsetX
 * @parent groupLayout
 * @text HUD全体のX軸位置調整
 * @desc HUD全体のX軸位置調整。正の値で右、負の値で左にずらします。
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param windowOffsetY
 * @parent groupLayout
 * @text HUD全体のY軸位置調整
 * @desc HUD全体のY軸位置調整。正の値で下、負の値で上にずらします。
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
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
 * @command forceNeedsAllShowOn
 * @text 常に表示モードにする
 * @desc HUDを常に表示します。自動表示モードに戻すまで表示し続けます。イベント実行中も表示されます。
 *
 * @command forceNeedsAllHideOn
 * @text 常に全部隠すモードにする
 * @desc HUDを常に全部隠します。自動表示モードに戻すまで表示されません。
 *
 * @command forceNeedsHalfHideOn
 * @text 常に半分隠すモードにする
 * @desc HUDを常に半分隠します。自動表示モードに戻すまで半分隠れます
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
  const showActorHPDiff = parameters['ShowActorHPDiff'] === 'true';
  const showActorMP = parameters['ShowActorMP'] === 'true';
  const showActorMPDiff = parameters['ShowActorMPDiff'] === 'true';
  const showActorTP = parameters['ShowActorTP'] === 'true';
  const showActorTPDiff = parameters['ShowActorTPDiff'] === 'true';
  const showActorState = parameters['ShowActorState'] === 'true';
  const showActorExp = parameters['ShowActorExp'] === 'true';
  const showActorExpDiff = parameters['ShowActorExpDiff'] === 'true';

  const windowWidth = Number(parameters['windowWidth'] || 220);
  const windowHeight = Number(parameters['windowHeight'] || 100);
  const faceSize = Number(parameters['faceSize'] || 0);
  const nameFontSize = Number(parameters['nameFontSize'] || 18);
  const levelFontSize = Number(parameters['levelFontSize'] || 18);
  const gaugeLabelFontSize = Number(parameters['gaugeLabelFontSize'] || 18);
  const gaugeHeight = Number(parameters['gaugeHeight'] || 8);
  const gaugeValueFontSize = Number(parameters['gaugeValueFontSize'] || 18);
  const gaugeColorHp1 = Number(parameters['gaugeColorHp1'] || 20);
  const gaugeColorHp2 = Number(parameters['gaugeColorHp2'] || 21);
  const gaugeColorMp1 = Number(parameters['gaugeColorMp1'] || 22);
  const gaugeColorMp2 = Number(parameters['gaugeColorMp2'] || 23);
  const gaugeColorTp1 = Number(parameters['gaugeColorTp1'] || 28);
  const gaugeColorTp2 = Number(parameters['gaugeColorTp2'] || 29);
  const gaugeColorExp1 = Number(parameters['gaugeColorExp1'] || 28);
  const gaugeColorExp2 = Number(parameters['gaugeColorExp2'] || 29);
  const statusIconSize = Number(parameters['statusIconSize'] || 24);
  const marginOfEachActor = Number(parameters['marginOfEachActor'] || 0);
  const windowOffsetX = Number(parameters['windowOffsetX'] || 0);
  const windowOffsetY = Number(parameters['windowOffsetY'] || 0);

  const hudHideCount = Number(parameters['hudHideCount'] || 600);
  const fontFileForString = String(parameters.fontFileForString || '');
  const fontFileForNumber = String(parameters.fontFileForNumber || '');
  const labelColor = Number(parameters['labelColor'] || 16);

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
  PluginManager.registerCommand(pluginName, 'forceNeedsHalfHideOn', function () {
    $gameSystem._mapHudForceControlMode = 'halfHide';
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
      if (this._faceSprite) {
        this._faceSprite.destroy();
      }
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
    initialize() {
      super.initialize();
      this._displayedValue = 0; // 初期化時点ではまだ値がないため、0で初期化
    }

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

    // ゲージの描画
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

    labelColor() {
      // 16
      return ColorManager.textColor(labelColor);
    }

    labelOutlineColor() {
      //     return "rgba(0, 0, 0, 0.6)";
      return ColorManager.outlineColor();
    }

    labelOutlineWidth() {
      return 3;
    }

    valueFontFace() {
      return fontFileForNumber ? $gameSystem.mapHudFontForNumber() : $gameSystem.numberFontFace();
    }

    valueFontSize() {
      return gaugeValueFontSize;
    }

    gaugeColor1() {
      switch (this._statusType) {
        case 'hp':
          return ColorManager.textColor(gaugeColorHp1);
        case 'mp':
          return ColorManager.textColor(gaugeColorMp1);
        case 'tp':
          return ColorManager.textColor(gaugeColorTp1);
        case 'exp':
          return ColorManager.textColor(gaugeColorExp1);
        case 'time':
          return ColorManager.ctGaugeColor1();
        default:
          return ColorManager.normalColor();
      }
    }

    gaugeColor2() {
      switch (this._statusType) {
        case 'hp':
          return ColorManager.textColor(gaugeColorHp2);
        case 'mp':
          return ColorManager.textColor(gaugeColorMp2);
        case 'tp':
          return ColorManager.textColor(gaugeColorTp2);
        case 'exp':
          return ColorManager.textColor(gaugeColorExp2);
        case 'time':
          return ColorManager.ctGaugeColor2();
        default:
          return ColorManager.normalColor();
      }
    }

    // setupが呼ばれたときにアニメーション用の値を初期化
    setup(battler, statusType) {
      super.setup(battler, statusType);
      this._displayedValue = this._value; // setup時に現在の値で初期化
    }

    // 更新処理を追加
    update() {
      super.update();
      this.updateDisplayedValue(); // ゲージの表示値を更新
    }

    // HP/MP/TPの表示をアニメーションで更新
    updateDisplayedValue() {
      const realValue = this._value; // ゲージの現在の目標値（_value）
      if (this._displayedValue !== realValue) {
        const changeSpeed = Math.abs(realValue - this._displayedValue) / 10; // 調整可能な速度
        if (this._displayedValue < realValue) {
          this._displayedValue = Math.min(this._displayedValue + changeSpeed, realValue);
        } else {
          this._displayedValue = Math.max(this._displayedValue - changeSpeed, realValue);
        }
        this.redraw(); // 値が変わったら再描画
      }
    }

    // 数字もアニメーション用の値で描画
    drawValue() {
      const currentValue = Math.floor(this._displayedValue); // アニメーション用の値を使用
      const width = this.bitmapWidth();
      const height = this.textHeight();
      this.setupValueFont();
      this.bitmap.drawText(currentValue, 0, 0, width, height, 'right');
    }

    // フォント設定
    setupValueFont() {
      this.bitmap.fontFace = this.valueFontFace();
      this.bitmap.fontSize = this.valueFontSize();
      this.bitmap.textColor = this.valueColor();
      this.bitmap.outlineColor = this.valueOutlineColor();
      this.bitmap.outlineWidth = this.valueOutlineWidth();
    }
  }

  class Sprite_GaugeCircle_MapStatusHud extends Sprite_Gauge_MapStatusHud {
    initialize() {
      super.initialize();
      this._displayedValue = 0; // 初期化時点ではまだ値がないため、0で初期化
      this.opacity = 200;
    }

    bitmapWidth() {
      return ImageManager.faceWidth;
    }

    bitmapHeight() {
      return ImageManager.faceHeight;
    }

    textHeight() {
      return Math.max(gaugeLabelFontSize, gaugeValueFontSize);
    }

    gaugeHeight() {
      return this._gaugeHeight;
    }

    gaugeX() {
      if (this._statusType === 'time') {
        return 0;
      } else {
        // return this.measureLabelWidth() + 6;
        return 0;
      }
    }

    currentValue() {
      if (this._battler) {
        switch (this._statusType) {
          case 'hp':
            return this._battler.hp;
          case 'mp':
            return this._battler.mp;
          case 'tp':
            return this._battler.tp;
          case 'time':
            return this._battler.tpbChargeTime();
          case 'exp':
            // return this._battler.nextRequiredExp()
            return this._battler.currentExp() - this._battler.currentLevelExp();
        }
      }
      return NaN;
    }

    currentMaxValue() {
      if (this._battler) {
        switch (this._statusType) {
          case 'hp':
            return this._battler.mhp;
          case 'mp':
            return this._battler.mmp;
          case 'tp':
            return this._battler.maxTp();
          case 'time':
            return 1;
          case 'exp':
            return this._battler.nextLevelExp() - this._battler.currentLevelExp();
        }
      }
      return NaN;
    }

    label() {
      switch (this._statusType) {
        case 'hp':
          return TextManager.hpA;
        case 'mp':
          return TextManager.mpA;
        case 'tp':
          return TextManager.tpA;
        default:
          return '';
      }
    }

    drawGauge() {
      this.drawCircularGauge(0, 0, ImageManager.faceWidth, ImageManager.faceHeight);
    }

    // 円形ゲージを描画（中を透明、背景も描画、時計回りになるよう修正）
    drawCircularGauge(x, y, width, height) {
      const rate = this.gaugeRate(); // ゲージの進捗率
      const radius = Math.min(width, height) / 2 - 2; // 外側の円の半径
      const centerX = x + radius + 2; // 円の中心のX座標
      const centerY = y + radius + 2; // 円の中心のY座標
      const startAngle = -Math.PI / 2; // 上部を開始点とする（-90度）
      const endAngle = startAngle + rate * 2 * Math.PI; // ゲージの進捗度に応じた終了角度（時計回り）

      const ctx = this.bitmap.context;
      ctx.save();

      // 背景を描画（円の背景）
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // 完全な円を描画
      ctx.lineWidth = gaugeHeight - 2; // 円弧の太さ
      ctx.strokeStyle = this.gaugeBackColor(); // 背景色
      ctx.stroke();

      // 円形ゲージを描画
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false); // 時計回りに描画
      ctx.lineWidth = gaugeHeight - 4; // ゲージの太さ
      const grad = ctx.createLinearGradient(x, y, x + width, y);
      // 逆になるので注意
      grad.addColorStop(0, this.gaugeColor2());
      grad.addColorStop(1, this.gaugeColor1());
      ctx.strokeStyle = grad;
      ctx.stroke();

      ctx.restore();
    }

    // setupが呼ばれたときにアニメーション用の値を初期化
    setup(battler, statusType, scale) {
      super.setup(battler, statusType);
      // this._displayedValue = this._value;
      this._displayedValue = Math.max(this._battler.nextRequiredExp(), 0);
      const innerWidth = faceSize || windowWidth / 2 - WINDOW_PADDING * 2;
      this._baseScale = scale ?? 1 * (innerWidth / ImageManager.faceWidth);
      this.scale.x = this._baseScale;
      this.scale.y = this._baseScale;
    }

    updateDisplayedValue() {
      // const realValue = this._value;
      const realValue = Math.max(this._battler.nextRequiredExp(), 0);
      if (this._displayedValue !== realValue) {
        const changeSpeed = Math.abs(realValue - this._displayedValue) / 10; // 調整可能な速度
        if (this._displayedValue < realValue) {
          this._displayedValue = Math.min(this._displayedValue + changeSpeed, realValue);
        } else {
          this._displayedValue = Math.max(this._displayedValue - changeSpeed, realValue);
        }
        this.redraw(); // 値が変わったら再描画
      }
    }

    // 数字もアニメーション用の値で描画
    drawValue() {
      return;
      /**
       * @remarks レイアウトが難しいため、EXPの値表示は見送り...
       */
    }
  }

  // ステータスが変化した際にポップアップを表示する処理
  class Sprite_StatusPopup extends Sprite {
    constructor() {
      super();
      this.initMembers();
    }

    initMembers() {
      this._value = 0;
      this._duration = 30; // ポップアップの表示時間
      this._popupType = ''; // 表示するポップアップの種類（HP, MP, TPなど）
      this._fadeDuration = 30; // フェードアウトの期間
    }

    setup(value, type, position) {
      this._value = value;
      this._popupType = type;
      const width = windowWidth / 2 - WINDOW_PADDING;
      const height = gaugeHeight + 20;
      this.bitmap = new Bitmap(width, height);
      this.setupFont();

      this.anchor.x = 0;
      this.anchor.y = -0.4;
      this.x = position.x;
      this.y = position.y;
      this.opacity = 255; // 初期透明度は完全に表示
      this.drawPopup();
    }

    setupFont() {
      this.bitmap.fontFace = this.fontFace();
      this.bitmap.fontSize = this.fontSize();
      this.bitmap.textColor = this.textColor();
      this.bitmap.outlineColor = this.outlineColor();
      this.bitmap.outlineWidth = this.outlineWidth();
    }

    fontFace() {
      return $gameSystem.numberFontFace();
    }

    fontSize() {
      return gaugeValueFontSize - 2;
    }

    textColor() {
      return ColorManager.hpColor(this._battler);
    }

    outlineColor() {
      return ColorManager.outlineColor();
    }

    outlineWidth() {
      return 3;
    }

    drawPopup() {
      let text = '';
      const getSuffix = (popType) => {
        if (popType === 'hp') return TextManager.hpA;
        if (popType === 'mp') return TextManager.mpA;
        if (popType === 'tp') return TextManager.tpA;
        if (popType === 'exp') return TextManager.expA;
        return '';
      };
      if (this._value > 0) {
        text = `+${this._value} ${getSuffix(this._popupType)}`;
        this.bitmap.textColor = ColorManager.powerUpColor();
      } else {
        text = `${this._value} ${getSuffix(this._popupType)}`;
        this.bitmap.textColor = ColorManager.powerDownColor();
      }
      this.bitmap.drawText(text, 0, 0, this.bitmap.width, this.bitmap.height, 'right');
    }

    update() {
      super.update();

      // _durationが残っている場合はポップアップを表示
      if (this._duration > 0) {
        this._duration--; // _durationを減少させていく
      } else {
        this.y -= 1;
        // _durationが0になったらフェードアウトを開始
        if (this._fadeDuration > 0) {
          this._fadeDuration--;
          this.opacity = 255 * (this._fadeDuration / 30); // 残り時間に応じて透明度を減少
        } else {
          this.parent.removeChild(this); // フェードアウトが終わったら削除
        }
      }
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

  Window_StatusBase.prototype.placeGaugeCircleMapStatusHud = function (actor, type, x, y, scale) {
    const key = 'actor%1-gaugeCircleMapStatusHud-%2'.format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_GaugeCircle_MapStatusHud);
    sprite.setup(actor, type, scale);
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

  const getMarginXOfUIArea = () => {
    return (Graphics.width - Graphics.boxWidth) / 2;
  };

  const getMarginYOfUIArea = () => {
    return (Graphics.height - Graphics.boxHeight) / 2;
  };

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
      const sx = Graphics.width - getMarginXOfUIArea();
      const sy = this.y;
      const dx = Graphics.width - this.width - getMarginXOfUIArea() + windowOffsetX;
      const dy = sy;
      const hx = sx - this.width / 2;
      const hy = dy;

      this._sx = sx;
      this._sy = sy;
      this._dx = dx;
      this._dy = dy;
      this._hx = hx;
      this._hy = hy;
      this._oldHp = null;
      this._oldMp = null;
      this._oldTp = null;
      this._oldLevel = null;
      this._oldClassId = null;
      this._oldStates = null;
      this._oldExp = null;
      this._targetOpacity = 255; // 目標の透明度（ウィンドウ内のコンテンツの透明度）
      this._fadeSpeed = 10; // フェードの速さ

      this._oldHpForPopup = null;
      this._hpPosition = new Point(0, 0);
      this._oldMpForPopup = null;
      this._mpPosition = new Point(0, 0);
      this._oldTpForPopup = null;
      this._tpPosition = new Point(0, 0);
      this._oldExpForPopup = null;
      this._expPosition = new Point(0, 0);
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

      if (showActorExp) {
        x = 0;
        y = 0;
        this._expPosition = new Point(x, y + this.height / 2);
        this.placeGaugeCircleMapStatusHud(actor, 'exp', x, y);
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
        this._hpPosition = new Point(x, y);
        y += lineHeight;
      }
      if (showActorMP) {
        this.placeGaugeMapStatusHud(actor, 'mp', x, y);
        this._mpPosition = new Point(x, y);
        y += lineHeight;
      }
      if (showActorTP) {
        this.placeGaugeMapStatusHud(actor, 'tp', x, y);
        this._tpPosition = new Point(x, y);
        y += lineHeight;
      }
      const iconOffset = statusIconSize / 2;
      x = 0 + iconOffset;
      // 顔グラフィックの下か、ウィンドウの下のどちらか
      const faceUnderY = faceSize || windowWidth / 2 - WINDOW_PADDING * 2;
      const windowUnderY = windowHeight - WINDOW_PADDING - statusIconSize;
      const stateIconY = Math.min(faceUnderY, windowUnderY);

      if (showActorState) {
        /**
         * @remarks 1pxずらしたほうが見た目がよかった
         */
        this.placeStateIconMapStatusHud(actor, x + 1, stateIconY);
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
      this.createPopup();
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
      if ($gameSystem._mapHudForceControlMode === 'halfHide') {
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
      if ($gameSystem._mapHudForceControlMode === 'halfHide') {
        return false;
      }
      // 拡張用
      // if (this._requestShowPartyHud) {
      //   this._requestShowPartyHud = false;
      //   this._hideCount = this.constructor.HIDE_COUNT;
      //   return true;
      // }
      const actor = this._actor;
      if (!actor) return false;
      // HPが変わったとき
      if (showActorHP && this._oldHp !== actor.hp) {
        this._oldHp = actor.hp;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // MPが変わったとき
      if (showActorMP && this._oldMp !== actor.mp) {
        this._oldMp = actor.mp;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // TPが変わったとき
      if (showActorTP && this._oldTp !== actor.tp) {
        this._oldTp = actor.tp;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // Levelが変わったとき
      if (showActorLevel && this._oldLevel !== actor.level) {
        this._oldLevel = actor.level;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // 職業が変わったとき
      if (showActorClass && this._oldClassId !== actor.classId) {
        this._oldClassId = actor.classId;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }
      // ステートが変わったとき 配列をjoinして文字列で比較
      const currentActorStatesJoin = actor._states.join();
      if (showActorState && this._oldStates !== currentActorStatesJoin) {
        this._oldStates = currentActorStatesJoin;
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }

      // Expが変わったとき
      if (showActorExp && this._oldExp !== actor.currentExp()) {
        this._oldExp = actor.currentExp();
        this._hideCount = this.constructor.HIDE_COUNT;
        return true;
      }

      return false;
    }

    needsHalfHide() {
      if ($gameSystem._mapHudForceControlMode === 'halfHide') {
        return true;
      }
      if ($gameSystem._mapHudForceControlMode === 'allShow') {
        return false;
      }
      if ($gameSystem._mapHudForceControlMode === 'allHide') {
        return false;
      }
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

      const windowRect = new Rectangle(
        this.x + getMarginXOfUIArea(),
        this.y + getMarginYOfUIArea(),
        this.width,
        this.height
      );

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

    createPopup() {
      if (showActorHP && showActorHPDiff) {
        this.checkHpPopup();
      }

      if (showActorMP && showActorMPDiff) {
        this.checkMpPopup();
      }

      if (showActorTP && showActorTPDiff) {
        this.checkTpPopup();
      }

      if (showActorExp && showActorExpDiff) {
        this.checkExpPopup();
      }
    }

    checkHpPopup() {
      const actor = this._actor;
      if (!actor) return;
      if (this._oldHpForPopup === actor.hp) return;
      // 初回表示時は、変化を出さないため
      if (this._oldHpForPopup === null) {
        this._oldHpForPopup = actor.hp;
        return;
      }
      const diff = actor.hp - this._oldHpForPopup;
      this._oldHpForPopup = actor.hp;
      this.showPopup(diff, 'hp', this._hpPosition);
    }

    checkMpPopup() {
      const actor = this._actor;
      if (!actor) return;
      if (this._oldMpForPopup === actor.mp) return;
      // 初回表示時は、変化を出さないため
      if (this._oldMpForPopup === null) {
        this._oldMpForPopup = actor.mp;
        return;
      }
      const diff = actor.mp - this._oldMpForPopup;
      this._oldMpForPopup = actor.mp;
      this.showPopup(diff, 'mp', this._mpPosition);
    }

    checkTpPopup() {
      const actor = this._actor;
      if (!actor) return;
      if (this._oldTpForPopup === actor.tp) return;
      // 初回表示時は、変化を出さないため
      if (this._oldTpForPopup === null) {
        this._oldTpForPopup = actor.tp;
        return;
      }
      const diff = actor.tp - this._oldTpForPopup;
      this._oldTpForPopup = actor.tp;
      this.showPopup(diff, 'tp', this._tpPosition);
    }

    checkExpPopup() {
      const actor = this._actor;
      if (!actor) return;
      if (this._oldExpForPopup === actor.currentExp()) return;
      // 初回表示時は、変化を出さないため
      if (this._oldExpForPopup === null) {
        this._oldExpForPopup = actor.currentExp();
        return;
      }
      const diff = actor.currentExp() - this._oldExpForPopup;
      this._oldExpForPopup = actor.currentExp();
      this.showPopup(diff, 'exp', this._expPosition);
    }

    showPopup(value, type, position) {
      const popup = new Sprite_StatusPopup();
      popup.setup(value, type, position);
      this.addChild(popup); // HUDウィンドウにポップアップを追加
    }
  }

  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    this.createMapStatusHudWindows();
  };

  Scene_Map.prototype.createMapStatusHudWindows = function () {
    const baseX = Graphics.width - getMarginXOfUIArea() + windowOffsetX;
    const baseY = Graphics.height - windowHeight - getMarginYOfUIArea() + windowOffsetY;
    this._mapStatusHudWindows = [];

    let i = 0;
    const members =
      displayOrder === 'fromTopToBottom' ? $gameParty.members().reverse() : $gameParty.members();

    for (const actor of members) {
      if (!actor) continue;
      const memberIndex = $gameParty
        .members()
        .findIndex((member) => member.actorId() === actor.actorId());
      if (memberIndex > $gameParty.maxBattleMembers() - 1) {
        continue;
      }

      const margin = marginOfEachActor;
      const rect = new Rectangle(
        baseX,
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
