/*:
 * @target MZ
 * @plugindesc ❤️ 敵ステータス表示プラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * 戦闘中に敵のステータスを表示します
 *
 * -------------------------------------------------
 * Sakura_EnemyHud
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/11/02 1.1.0 トリアコンタン様の BattlerGraphicExtend.js でバトラーの拡大・縮小をしていたときに
 *                  位置が調整されるように対応
 * 2024/10/05 1.0.0 公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_EnemyHud/Sakura_EnemyHud.md
 *
 * @param enemyStatusDisplay
 * @text ❤️ 敵ステータス表示設定 ---
 *
 * @param showEnemyName
 * @parent enemyStatusDisplay
 * @text 敵の名前を表示するか
 * @desc 敵の名前を表示するかです
 * @type boolean
 * @default true
 *
 * @param enemyNameFontSize
 * @parent enemyStatusDisplay
 * @text 敵の名前のﾌｫﾝﾄｻｲｽﾞ
 * @desc 敵の名前のﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 16
 *
 * @param enemyNameWidth
 * @parent enemyStatusDisplay
 * @text 敵の名前の横幅
 * @desc 敵の名前の横幅です
 * @type number
 * @default 128
 *
 * @param showEnemyGauge
 * @parent enemyStatusDisplay
 * @text 敵のｹﾞｰｼﾞを表示するか
 * @desc 敵のｹﾞｰｼﾞを表示するかです
 * @type boolean
 * @default true
 *
 * @param enemyGaugeLabelFontSize
 * @parent enemyStatusDisplay
 * @text 敵ｹﾞｰｼﾞのﾗﾍﾞﾙﾌｫﾝﾄｻｲｽﾞ
 * @desc 敵ｹﾞｰｼﾞのﾗﾍﾞﾙﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 12
 *
 * @param enemyGaugeValueFontSize
 * @parent enemyStatusDisplay
 * @text 敵ｹﾞｰｼﾞの値ﾌｫﾝﾄｻｲｽﾞ
 * @desc 敵ｹﾞｰｼﾞの値ﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 12
 *
 * @param enemyGaugeWidth
 * @parent enemyStatusDisplay
 * @text 敵ｹﾞｰｼﾞの幅
 * @desc 敵ｹﾞｰｼﾞの幅です
 * @type number
 * @default 80
 *
 * @param fontFile
 * @parent enemyStatusDisplay
 * @desc 使用するﾌｫﾝﾄのﾌｧｲﾙ名
 * @text 使用するﾌｫﾝﾄのﾌｧｲﾙ名（拡張子.ttfまで含みます）
 * @type string
 * @default
 *
 */

(() => {
  const pluginName = 'Sakura_EnemyHud';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const fontFile = String(parameters['fontFile'] || '');

  const showEnemyName = parameters['showEnemyName'] === 'true';
  const enemyNameFontSize = Number(parameters['enemyNameFontSize'] || 16);
  const enemyNameWidth = Number(parameters['enemyNameWidth'] || 128);
  const showEnemyGauge = parameters['showEnemyGauge'] === 'true';

  const enemyGaugeLabelFontSize = Number(parameters['enemyGaugeLabelFontSize'] || 12);
  const enemyGaugeValueFontSize = Number(parameters['enemyGaugeValueFontSize'] || 12);
  const enemyGaugeWidth = Number(parameters['enemyGaugeWidth'] || 80);

  // プラグインパラメータとしては未開放
  const enemyGaugeHeight = Number(parameters['enemyGaugeHeight'] || 6);
  const gaugeColorHp1 = Number(parameters['gaugeColorHp1'] || 20);
  const gaugeColorHp2 = Number(parameters['gaugeColorHp2'] || 21);
  const gaugeColorMp1 = Number(parameters['gaugeColorMp1'] || 22);
  const gaugeColorMp2 = Number(parameters['gaugeColorMp2'] || 23);
  const gaugeColorTp1 = Number(parameters['gaugeColorTp1'] || 28);
  const gaugeColorTp2 = Number(parameters['gaugeColorTp2'] || 29);

  // ---------------------------------------------------------------------
  // メモ欄定数
  // ---------------------------------------------------------------------
  const NOTE = {
    NO_NAME: '名前表示しない',
    NO_HUD: 'ステータス表示しない',
  };

  // ---------------------------------------------------------------------
  // 共通関数
  // ---------------------------------------------------------------------
  /**
   * 六角形の背景を描画する関数
   *
   * @param {Object} params - 描画に使用するパラメータオブジェクト
   * @param {CanvasRenderingContext2D} params.ctx - 描画対象のキャンバスのコンテキスト
   * @param {number} params.x - 六角形の左上のX座標
   * @param {number} params.y - 六角形の左上のY座標
   * @param {number} params.width - 六角形の幅
   * @param {number} params.height - 六角形の高さ
   */
  const drawHexBackground = ({ ctx, x, y, width, height }) => {
    // 六角形の描画開始
    ctx.beginPath();
    const horizontalLineLength = width * 0.9; // 上下の直線の長さ

    // 六角形の6つの頂点を定義（上下は長い横線、左右が頂点）
    ctx.moveTo(x + (width - horizontalLineLength) / 2, y); // 左の頂点
    ctx.lineTo(x + (width - horizontalLineLength) / 2 + horizontalLineLength, y); // 上横線
    ctx.lineTo(x + width, y + height / 2); // 右の頂点
    ctx.lineTo(x + (width - horizontalLineLength) / 2 + horizontalLineLength, y + height); // 下横線
    ctx.lineTo(x + (width - horizontalLineLength) / 2, y + height); // 下左頂点
    ctx.lineTo(x, y + height / 2); // 左の頂点
    ctx.closePath(); // 六角形の閉じ

    // 背景色を設定して塗りつぶす（枠線なし）
    const bgColor = 'rgba(0, 0, 0, 0.5)'; // 背景色
    ctx.fillStyle = bgColor;
    ctx.fill(); // 六角形を塗りつぶす
  };

  // ---------------------------------------------------------------------
  // 敵のゲージ
  // ---------------------------------------------------------------------
  /**
   * 敵キャラクターのステータスHUD用のゲージスプライト
   * HP、MP、TPなどのゲージをアニメーションで表示・更新する。
   *
   * @extends Sprite_Gauge
   */
  class Sprite_Gauge_EnemyStatusHud extends Sprite_Gauge {
    /**
     * 初期化メソッド。初期値としてゲージの値を0に設定。
     */
    initialize() {
      super.initialize();
      this._displayedValue = 0; // 表示される値の初期化
      this._gaugeMode = 'bar'; // ゲージモードを設定（バー表示）
    }

    /**
     * ゲージの幅を取得する。
     *
     * @returns {number} ゲージの幅
     */
    bitmapWidth() {
      return enemyGaugeWidth;
    }

    /**
     * ゲージの高さを取得する。
     *
     * @returns {number} ゲージの高さ
     */
    bitmapHeight() {
      return this.gaugeHeight() + 20;
    }

    /**
     * テキストの高さを取得する。
     *
     * @returns {number} テキストの高さ
     */
    textHeight() {
      return Math.max(enemyGaugeLabelFontSize, enemyGaugeValueFontSize);
    }

    /**
     * ゲージの高さを取得する。
     *
     * @returns {number} ゲージの高さ
     */
    gaugeHeight() {
      return enemyGaugeHeight;
    }

    /**
     * ゲージのX座標を取得する。
     *
     * @returns {number} ゲージのX座標
     */
    gaugeX() {
      if (this._statusType === 'time') {
        return 0;
      } else {
        return 0; // タイプが異なる場合もX座標は0
      }
    }

    /**
     * ラベルのフォントフェイスを取得する。
     *
     * @returns {string} フォントフェイス
     */
    labelFontFace() {
      return $gameSystem.enemyHudFontFace();
    }

    /**
     * ラベルのフォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    labelFontSize() {
      return enemyGaugeLabelFontSize;
    }

    /**
     * ラベルのアウトライン色を取得する。
     *
     * @returns {string} アウトラインの色
     */
    labelOutlineColor() {
      return ColorManager.outlineColor();
    }

    /**
     * ラベルのアウトライン幅を取得する。
     *
     * @returns {number} アウトライン幅
     */
    labelOutlineWidth() {
      return 3;
    }

    /**
     * ゲージの数値部分のフォントフェイスを取得する。
     *
     * @returns {string} フォントフェイス
     */
    valueFontFace() {
      return $gameSystem.enemyHudFontFace();
    }

    /**
     * ゲージの数値部分のフォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    valueFontSize() {
      return enemyGaugeValueFontSize;
    }

    /**
     * ゲージの開始色を取得する。
     *
     * @returns {string} ゲージの開始色
     */
    gaugeColor1() {
      switch (this._statusType) {
        case 'hp':
          return ColorManager.textColor(gaugeColorHp1);
        case 'mp':
          return ColorManager.textColor(gaugeColorMp1);
        case 'tp':
          return ColorManager.textColor(gaugeColorTp1);
        case 'time':
          return ColorManager.ctGaugeColor1();
        default:
          return ColorManager.normalColor();
      }
    }

    /**
     * ゲージの終了色を取得する。
     *
     * @returns {string} ゲージの終了色
     */
    gaugeColor2() {
      switch (this._statusType) {
        case 'hp':
          return ColorManager.textColor(gaugeColorHp2);
        case 'mp':
          return ColorManager.textColor(gaugeColorMp2);
        case 'tp':
          return ColorManager.textColor(gaugeColorTp2);
        case 'time':
          return ColorManager.ctGaugeColor2();
        default:
          return ColorManager.normalColor();
      }
    }

    /**
     * バトラーとステータスタイプを設定し、表示値を初期化する。
     *
     * @param {Game_Battler} battler - バトラーオブジェクト
     * @param {string} statusType - ステータスの種類（'hp', 'mp', 'tp', 'time'など）
     */
    setup(battler, statusType) {
      super.setup(battler, statusType);
      this._displayedValue = this._value; // 表示する値を現在の値で初期化
    }

    /**
     * フレームごとに更新処理を行う。
     */
    update() {
      super.update();
      this.updateDisplayedValue(); // 表示する値を更新
      this.updateCheckAppear(); // 可視状態のチェック
    }

    /**
     * アニメーションで表示されるゲージの値を更新する。
     */
    updateDisplayedValue() {
      const realValue = this._value; // ゲージの実際の値
      if (this._displayedValue !== realValue) {
        const changeSpeed = Math.abs(realValue - this._displayedValue) / 10; // 値の変化速度
        if (this._displayedValue < realValue) {
          this._displayedValue = Math.min(this._displayedValue + changeSpeed, realValue);
        } else {
          this._displayedValue = Math.max(this._displayedValue - changeSpeed, realValue);
        }
        this.redraw(); // 値が変わったら再描画
      }
    }

    /**
     * バトラーが死んでいるかをチェックし、可視状態を更新する。
     */
    updateCheckAppear() {
      this.visible = !this._battler.isDead(); // バトラーが死んでいる場合は非表示
    }

    /**
     * ゲージの数値を描画する。
     */
    drawValue() {
      const currentValue = Math.floor(this._displayedValue); // 表示用の値を使用
      const width = this.bitmapWidth();
      const height = this.textHeight();
      this.setupValueFont();
      this.bitmap.drawText(currentValue, 0, 0, width, height, 'right'); // 右揃えで描画
    }

    /**
     * 数値部分のフォント設定を行う。
     */
    setupValueFont() {
      this.bitmap.fontFace = this.valueFontFace();
      this.bitmap.fontBold = false;
      this.bitmap.fontSize = this.valueFontSize();
      this.bitmap.textColor = this.valueColor();
      this.bitmap.outlineColor = this.valueOutlineColor();
      this.bitmap.outlineWidth = this.valueOutlineWidth();
    }
  }

  // ---------------------------------------------------------------------
  // 敵の名前
  // ---------------------------------------------------------------------
  /**
   * 敵の名前を表示するスプライトクラス
   * 背景に六角形のデザインを追加し、名前を中央揃えで描画する。
   *
   * @extends Sprite_Name
   */
  class Sprite_EnemyName extends Sprite_Name {
    /**
     * ビットマップの幅を取得する。
     *
     * @returns {number} ビットマップの幅
     */
    bitmapWidth() {
      return enemyNameWidth; // 名前表示の幅
    }

    /**
     * ビットマップの高さを取得する。
     *
     * @returns {number} ビットマップの高さ
     */
    bitmapHeight = function () {
      // return this.fontSize() + 2;
      return 24;
    };

    /**
     * フォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    fontSize() {
      return enemyNameFontSize; // 名前表示用のフォントサイズ
    }

    /**
     * フォントフェイスを取得する。
     *
     * @returns {string} フォントフェイス
     */
    fontFace() {
      return $gameSystem.enemyHudFontFace();
    }

    /**
     * フレームごとの更新処理を追加。
     * バトラーが死んでいるかを確認して可視状態を切り替える。
     */
    update() {
      super.update();
      this.updateCheckAppear(); // 死亡状態を確認して表示を更新
    }

    /**
     * バトラーが死亡しているか確認し、スプライトの表示・非表示を設定。
     */
    updateCheckAppear() {
      this.visible = !this._battler.isDead(); // バトラーが死んでいる場合は非表示
    }

    /**
     * 名前表示のスプライトを再描画する。
     * 名前の背景として六角形を描画し、名前は中央揃えで表示する。
     */
    redraw() {
      const name = this.name(); // 表示する名前
      const width = enemyNameWidth; // ビットマップの幅
      const height = this.bitmapHeight(); // ビットマップの高さ
      this.setupFont(); // フォントの設定
      this.bitmap.clear(); // ビットマップをクリア

      // ビットマップのコンテキストを取得して背景を描画
      const ctx = this.bitmap.context;
      const x = 0;
      const y = 0;

      // 六角形の背景を描画
      drawHexBackground({ ctx, x, y, width, height });

      // 名前を中央揃えで描画
      this.bitmap.fontBold = true; // フォントを太字に設定
      this.bitmap.drawText(name, x, y, width, height, 'center');
    }
  }

  // ---------------------------------------------------------------------
  // Window_StatusBase の拡張
  // ---------------------------------------------------------------------
  /**
   * 敵キャラクターのステータスHUD（HPやMPなど）を指定の位置に配置する。
   *
   * @param {Game_Enemy} enemy - 敵キャラクターオブジェクト
   * @param {string} type - 表示するステータスの種類（'hp', 'mp', 'tp', など）
   * @param {number} x - 配置するX座標
   * @param {number} y - 配置するY座標
   */
  Window_StatusBase.prototype.placeGaugeEnemyStatusHud = function (enemy, type, x, y) {
    const key = `enemy/${enemy.name()}/${type}`; // スプライトのキーをユニークに生成
    const sprite = this.createInnerSprite(key, Sprite_Gauge_EnemyStatusHud); // スプライトを生成
    sprite.anchor.x = 0.5; // スプライトのアンカーを中央に設定
    sprite.setup(enemy, type); // 敵とステータスタイプを設定
    sprite.move(x, y); // 指定の座標に移動
    sprite.show(); // スプライトを表示
  };

  /**
   * 敵キャラクターの名前を指定の位置に表示する。
   *
   * @param {Game_Enemy} enemy - 敵キャラクターオブジェクト
   * @param {number} x - 配置するX座標
   * @param {number} y - 配置するY座標
   */
  Window_StatusBase.prototype.placeEnemyName = function (enemy, x, y) {
    const key = `enemy/${enemy.name()}/name`; // スプライトのキーをユニークに生成
    const sprite = this.createInnerSprite(key, Sprite_EnemyName); // 名前スプライトを生成
    sprite.anchor.x = 0.5; // スプライトのアンカーを中央に設定
    sprite.setup(enemy); // 敵キャラクターの名前を設定
    sprite.move(x, y); // 指定の座標に移動
    sprite.show(); // スプライトを表示
  };

  // ---------------------------------------------------------------------
  // Window_EnemyStatus の拡張
  // ---------------------------------------------------------------------
  /**
   * 敵キャラクターのステータスを表示するウィンドウクラス。
   * 名前やHP、TPBゲージを表示し、敵の位置にウィンドウを追従させる。
   *
   * @extends Window_StatusBase
   */
  class Window_EnemyStatus extends Window_StatusBase {
    /**
     * コンストラクタ
     * ウィンドウのサイズを設定し、透明にする。
     *
     * @constructor
     */
    constructor() {
      super(new Rectangle(0, 0, Math.max(enemyNameWidth, enemyGaugeWidth) + 50, 70)); // ウィンドウのサイズを設定
      this.opacity = 0; // ウィンドウを透明に設定
      this._enemy = null; // 表示する敵キャラクター
    }

    /**
     * 表示する敵キャラクターを設定し、ウィンドウを更新する。
     *
     * @param {Game_Enemy} enemy - 表示する敵キャラクター
     */
    setEnemy(enemy) {
      this._enemy = enemy; // 敵キャラクターを設定
      this.refresh(); // ウィンドウ内容を更新
    }

    /**
     * ウィンドウの内容を更新し、敵キャラクターの名前やゲージを表示する。
     */
    refresh() {
      this.contents.clear(); // ウィンドウ内容をクリア
      if (this._enemy) {
        const needsShowEnemyName = () => showEnemyName && !this._enemy.enemy().meta[NOTE.NO_NAME];
        const needsShowEnemyGauge = () => showEnemyGauge && !this._enemy.enemy().meta[NOTE.NO_HUD];

        if (needsShowEnemyName()) {
          // 敵の名前をウィンドウ中央に配置
          this.placeEnemyName(this._enemy, this.width / 2, 0);
        }

        const nameHeight = 24;

        if (needsShowEnemyGauge()) {
          // TPBバトルの場合は時間ゲージも表示
          if (BattleManager.isTpb()) {
            this.placeGaugeEnemyStatusHud(
              this._enemy,
              'time',
              this.width / 2,
              nameHeight + enemyGaugeHeight - 1
            );
          }

          // HPゲージを表示
          this.placeGaugeEnemyStatusHud(this._enemy, 'hp', this.width / 2, nameHeight);
        }
      }
    }

    /**
     * ウィンドウの位置を敵キャラクターの位置に更新する。
     *
     * @param {number} x - 新しいX座標
     * @param {number} y - 新しいY座標
     */
    updatePosition(x, y) {
      this.x = x; // ウィンドウのX座標を更新
      this.y = y; // ウィンドウのY座標を更新
    }
  }

  // ---------------------------------------------------------------------
  // Scene_Battle の拡張
  // ---------------------------------------------------------------------
  // 元の update メソッドをフックしてカスタム処理を追加
  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    this.updateEnemyStatusWindows(); // 敵ステータスウィンドウの更新
  };

  /**
   * すべてのウィンドウを作成する。
   * 敵ステータスウィンドウの作成も追加。
   *
   * 他のウィンドウより後ろに表示するために、先に作る
   */
  const _Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    this._enemyStatusWindows = [];
    $gameTroop.members().forEach((enemy) => {
      const window = new Window_EnemyStatus();
      this.addWindow(window);
      this._enemyStatusWindows.push(window); // 作成したウィンドウを配列に追加
    });
    _Scene_Battle_prototype_createAllWindows.call(this);
  };

  /**
   * バトル開始時の処理をフックして、敵ステータスウィンドウとコンボウィンドウを作成。
   */
  const _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function () {
    _Scene_Battle_start.call(this);
    this.setEnemyStatusWindows();
  };

  /**
   * 敵ステータスウィンドウを作成する。
   */
  Scene_Battle.prototype.setEnemyStatusWindows = function () {
    $gameTroop.members().forEach((enemy, index) => {
      const window = this._enemyStatusWindows[index];
      window.setEnemy(enemy); // 敵キャラクターをウィンドウに設定
    });
  };

  /**
   * 敵ステータスウィンドウを作成する。
   */
  Scene_Battle.prototype.createEnemyStatusWindows = function () {
    this._enemyStatusWindows = [];
    $gameTroop.members().forEach((enemy) => {
      const window = new Window_EnemyStatus();
      window.setEnemy(enemy); // 敵キャラクターをウィンドウに設定
      this.addWindow(window);
      this._enemyStatusWindows.push(window); // 作成したウィンドウを配列に追加
    });
  };

  /**
   * 敵ステータスウィンドウの更新処理。
   * ウィンドウの透明度や位置を調整する。
   */
  Scene_Battle.prototype.updateEnemyStatusWindows = function () {
    const fadeSpeed = 0.05; // フェード速度

    $gameTroop.members().forEach((enemy, index) => {
      const sprite = this._spriteset.findEnemySprite(enemy); // 敵キャラクタースプライトの取得
      if (sprite) {
        const window = this._enemyStatusWindows[index]; // 対応する敵ステータスウィンドウ
        if (window && window._innerChildren) {
          window._innerChildren.forEach((child) => {
            // バトルフェーズが「action」の場合はフェードアウト
            if (BattleManager._phase === 'action') {
              child.alpha = Math.max(0, child.alpha - fadeSpeed); // 透明度を徐々に下げる
            } else {
              // フェードイン
              child.alpha = Math.min(1, child.alpha + fadeSpeed);

              // ウィンドウの位置を更新
              const x = sprite.x - window.width / 2;

              /**
               * @remarks トリアコンタン様BattlerGraphicExtend.jsでバトラーの拡大率が設定されている場合を考慮
               */
              // 高さのスケールを取得（デフォルト値は1.0）
              const scaleY =
                typeof sprite._battler.getScaleY === 'function' ? sprite._battler.getScaleY() : 1.0;

              const y = sprite.y - window.height - sprite.height * scaleY;
              window.updatePosition(x, y); // 新しい位置に更新
            }
          });
        }
      }
    });
  };

  // ---------------------------------------------------------------------
  // Spriteset_Battle の拡張
  // ---------------------------------------------------------------------
  /**
   * 指定された敵キャラクターに対応するスプライトを探して返す。
   *
   * @param {Game_Enemy} enemy - 探す対象の敵キャラクター（バトラー）
   * @returns {Sprite_Enemy|null} 敵キャラクターに対応するスプライト、見つからない場合は null
   */
  Spriteset_Battle.prototype.findEnemySprite = function (enemy) {
    return this._enemySprites.find((sprite) => sprite._battler === enemy);
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
      FontManager.load('rmmz-enemyHudFont', fontFile);
    }
  };

  /**
   * 使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.enemyHudFontFace = function () {
    return 'rmmz-enemyHudFont, ' + $dataSystem.advanced.fallbackFonts;
  };
})();
