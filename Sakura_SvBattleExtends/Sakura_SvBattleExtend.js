/*:
 * @target MZ
 * @plugindesc SVバトルをいい感じに
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * SVバトルをいい感じにします
 *
 * -------------------------------------------------
 * Sakura_SvBattleExtend
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/09/29 0.5.0 β版公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_SvBattleExtend/Sakura_SvBattleExtend.md
 *
 * @param layoutDamagePop
 * @text 💥 ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟのﾚｲｱｳﾄ ---
 *
 * @param fontFile
 * @parent layoutDamagePop
 * @desc 使用するﾌｫﾝﾄのﾌｧｲﾙ名
 * @text 使用するﾌｫﾝﾄのﾌｧｲﾙ名（拡張子.ttfまで含みます）
 * @type string
 * @default
 *
 * @param damagePopMainFontSize
 * @parent layoutDamagePop
 * @text ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟﾒｲﾝﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟﾒｲﾝﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 32
 *
 * @param damagePopSubFontSize
 * @parent layoutDamagePop
 * @text ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟｻﾌﾞﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟｻﾌﾞﾌｫﾝﾄｻｲｽﾞです（WEAK!などの文字のことです）
 * @type number
 * @default 16
 *
 * @param durationOfDamagePop
 * @parent layoutDamagePop
 * @text ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟの表示時間
 * @desc ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟの表示時間です
 * @type number
 * @default 200
 *
 * @param textForMiss
 * @parent layoutDamagePop
 * @text ﾐｽのときに表示する文字
 * @desc ﾐｽのときに表示する文字です
 * @type string
 * @default MISS!
 *
 * @param textForEvade
 * @parent layoutDamagePop
 * @text 回避のときに表示する文字
 * @desc 回避のときに表示する文字です
 * @type string
 * @default DODGE!
 *
 * @param textForWeak
 * @parent layoutDamagePop
 * @text 弱点をついたときに表示する文字
 * @desc 弱点をついたときに表示する文字です
 * @type string
 * @default WEAK!
 *
 * @param textForReduce
 * @parent layoutDamagePop
 * @text 耐性があったときに表示する文字
 * @desc 耐性があったときに表示する文字です
 * @type string
 * @default REDUCE!
 *
 * @param textForCritical
 * @parent layoutDamagePop
 * @text クリティカルときに表示する文字
 * @desc クリティカルときに表示する文字です
 * @type string
 * @default CRITICAL!
 *
 * @param lineSpace
 * @parent layoutDamagePop
 * @text 同時にﾀﾞﾒｰｼﾞがあったときの行間
 * @desc 同時にﾀﾞﾒｰｼﾞがあったときの行間です
 * @type number
 * @min -9999
 * @max 9999
 * @default 24
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
 * @default 16
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
 * @param weaponDisplay
 * @text ⚔️ 武器表示設定 ---
 *
 * @param settingBareHands
 * @parent weaponDisplay
 * @text 素手
 * @desc 素手
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingDagger
 * @parent weaponDisplay
 * @text 短剣
 * @desc 短剣
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingSword
 * @parent weaponDisplay
 * @text 剣
 * @desc 剣
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingFlail
 * @parent weaponDisplay
 * @text フレイル
 * @desc フレイル
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingAxe
 * @parent weaponDisplay
 * @text 斧
 * @desc 斧
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-6","offsetY":"-38","angle":"0"}
 *
 * @param settingWhip
 * @parent weaponDisplay
 * @text ムチ
 * @desc ムチ
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingStaff
 * @parent weaponDisplay
 * @text 杖
 * @desc 杖
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingBow
 * @parent weaponDisplay
 * @text 弓
 * @desc 弓
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-14","offsetY":"-22","angle":"-60"}
 *
 * @param settingCrossbow
 * @parent weaponDisplay
 * @text クロスボウ
 * @desc クロスボウ
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-14","offsetY":"-24","angle":"0"}
 *
 * @param settingGun
 * @parent weaponDisplay
 * @text 銃
 * @desc 銃
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-14","offsetY":"-30","angle":"0"}
 *
 * @param settingClaw
 * @parent weaponDisplay
 * @text 爪
 * @desc 爪
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-4","offsetY":"-28","angle":"20"}
 *
 * @param settingGlove
 * @parent weaponDisplay
 * @text グローブ
 * @desc グローブ
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-6","offsetY":"-28","angle":"20"}
 *
 * @param settingSpear
 * @parent weaponDisplay
 * @text 槍
 * @desc 槍
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-28","angle":"20"}
 *
 * @param skillDisplay
 * @text ⚡ ｽｷﾙ表示設定 ---
 *
 * @param skillDisplayFontSize
 * @parent skillDisplay
 * @text ｽｷﾙ表示のﾌｫﾝﾄｻｲｽﾞ
 * @desc ｽｷﾙ表示のﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 16
 *
 * @param skillDisplayFontColorByEnemy
 * @parent skillDisplay
 * @text 敵のｽｷﾙ表示の文字色
 * @desc 敵のｽｷﾙ表示の文字色です
 * @type color
 * @default 20
 *
 * @param skillDisplayFontColorForAttack
 * @parent skillDisplay
 * @text 味方の通常攻撃のｽｷﾙ表示の文字色
 * @desc 味方の通常攻撃のｽｷﾙ表示の文字色です
 * @type color
 * @default 0
 *
 * @param skillDisplayFontColorForFriend
 * @parent skillDisplay
 * @text 味方の味方へのｽｷﾙ表示の文字色
 * @desc 味方の味方へのｽｷﾙ表示の文字色です
 * @type color
 * @default 24
 *
 * @param skillDisplayFontColorForEnemy
 * @parent skillDisplay
 * @text 味方の敵へのｽｷﾙ表示の文字色
 * @desc 味方の敵へのｽｷﾙ表示の文字色です
 * @type color
 * @default 6
 *
 * @param otherSettings
 * @text ⚙️ その他設定 ---
 *
 * @param reflectAnimation
 * @parent otherSettings
 * @text 魔法反射時のアニメーション
 * @desc 魔法反射時のアニメーションです
 * @type animation
 * @default 53
 *
 */

/*~struct~WeaponDisplaySetting:
 * @param offsetX
 * @text X軸位置調整
 * @desc X軸位置調整
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text Y軸位置調整
 * @desc Y軸位置調整
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param angle
 * @text 傾き
 * @desc 傾き
 * @type number
 * @min -360
 * @max 360
 * @default 0
 *
 */

(() => {
  const pluginName = 'Sakura_SvBattleExtend';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const fontFile = String(parameters['fontFile'] || '');
  const damagePopMainFontSize = Number(parameters['damagePopMainFontSize'] || 32);
  const damagePopSubFontSize = Number(parameters['damagePopSubFontSize'] || 16);
  const durationOfDamagePop = Number(parameters['durationOfDamagePop'] || 200);
  const textForMiss = String(parameters['textForMiss'] || 'MISS!');
  const textForEvade = String(parameters['textForEvade'] || 'DODGE!');
  const textForWeak = String(parameters['textForWeak'] || 'WEAK!');
  const textForReduce = String(parameters['textForReduce'] || 'WEAK!');
  const textForCritical = String(parameters['textForCritical'] || 'CRITICAL!');
  const lineSpace = Number(parameters['lineSpace'] || 24);

  const showEnemyName = parameters['showEnemyName'] === 'true';
  const enemyNameFontSize = Number(parameters['enemyNameFontSize'] || 16);
  const enemyNameWidth = Number(parameters['enemyNameWidth'] || 128);
  const showEnemyGauge = parameters['showEnemyGauge'] === 'true';

  const reflectAnimation = Number(parameters['reflectAnimation'] || 53);

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

  // デフォルトの設定値
  const defaultSetting = { offsetX: -10, offsetY: -38, angle: 0 };

  // JSONパースの安全処理関数 (Numberに変換)
  function parseSetting(param, defaultValue) {
    try {
      const parsed = JSON.parse(param);
      return {
        offsetX: Number(parsed.offsetX),
        offsetY: Number(parsed.offsetY),
        angle: Number(parsed.angle),
      };
    } catch (error) {
      console.warn(`Failed to parse setting: ${param}, using default value.`);
      return {
        offsetX: Number(defaultValue.offsetX),
        offsetY: Number(defaultValue.offsetY),
        angle: Number(defaultValue.angle),
      };
    }
  }

  const weaponDisplaySettings = [
    {
      name: 'bareHands',
      setting: parseSetting(parameters['settingBareHands'], defaultSetting),
    },
    {
      name: 'dagger',
      setting: parseSetting(parameters['settingDagger'], defaultSetting),
    },
    {
      name: 'sword',
      setting: parseSetting(parameters['settingSword'], defaultSetting),
    },
    {
      name: 'flail',
      setting: parseSetting(parameters['settingFlail'], defaultSetting),
    },
    {
      name: 'axe',
      setting: parseSetting(parameters['settingAxe'], {
        offsetX: -6,
        offsetY: -38,
        angle: 0,
      }),
    },
    {
      name: 'whip',
      setting: parseSetting(parameters['settingWhip'], defaultSetting),
    },
    {
      name: 'staff',
      setting: parseSetting(parameters['settingStaff'], defaultSetting),
    },
    {
      name: 'bow',
      setting: parseSetting(parameters['settingBow'], {
        offsetX: -14,
        offsetY: -22,
        angle: -60,
      }),
    },
    {
      name: 'crossbow',
      setting: parseSetting(parameters['settingCrossbow'], {
        offsetX: -14,
        offsetY: -24,
        angle: 0,
      }),
    },
    {
      name: 'gun',
      setting: parseSetting(parameters['settingGun'], {
        offsetX: -14,
        offsetY: -30,
        angle: 0,
      }),
    },
    {
      name: 'claw',
      setting: parseSetting(parameters['settingClaw'], {
        offsetX: -4,
        offsetY: -28,
        angle: 20,
      }),
    },
    {
      name: 'glove',
      setting: parseSetting(parameters['settingGlove'], {
        offsetX: -6,
        offsetY: -28,
        angle: 20,
      }),
    },
    {
      name: 'spear',
      setting: parseSetting(parameters['settingSpear'], {
        offsetX: -10,
        offsetY: -28,
        angle: 20,
      }),
    },
  ];

  const skillDisplayFontSize = Number(parameters['skillDisplayFontSize'] || 16);
  const skillDisplayFontColorByEnemy = Number(parameters['skillDisplayFontColorByEnemy'] || 20);
  const skillDisplayFontColorForAttack = Number(parameters['skillDisplayFontColorForAttack'] || 0);
  const skillDisplayFontColorForFriend = Number(parameters['skillDisplayFontColorForFriend'] || 24);
  const skillDisplayFontColorForEnemy = Number(parameters['skillDisplayFontColorForEnemy'] || 6);

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
  // マップ上でダメージポップするための既存クラスの拡張
  // ---------------------------------------------------------------------
  /**
   * Game_CharacterBase.prototype.initMembersの元のメソッドを呼び出し、
   * キャラクターのダメージポップアップ管理用配列を初期化する。
   */
  const _Game_CharacterBase_prototype_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    _Game_CharacterBase_prototype_initMembers.call(this);
    this._damagePops = []; // ダメージポップアップ用の配列
  };

  /**
   * キャラクターが乗り物かどうかを判定する。
   *
   * @returns {boolean} キャラクターが乗り物でない場合にtrueを返す。
   */
  Game_CharacterBase.prototype.isNotVehicleCharacter = function () {
    const character = this;
    if (character instanceof Game_Vehicle) return false; // 乗り物キャラクターならfalse
    if (character instanceof Game_Event) return true; // イベントキャラクターならtrue
    if (character instanceof Game_Player) return true; // プレイヤーキャラクターならtrue
    if (character instanceof Game_Follower) return true; // フォロワーキャラクターならtrue
    return false;
  };

  /**
   * ダメージポップアップ配列を取得する。
   *
   * @returns {Array} ダメージポップアップの配列。
   */
  Game_CharacterBase.prototype.damagePops = function () {
    if (!this._damagePops) this._damagePops = [];
    return this._damagePops;
  };

  /**
   * ダメージポップアップを追加する。
   *
   * @param {Object} damagePop - 表示するダメージポップアップのデータ。
   */
  Game_CharacterBase.prototype.pushDamagePop = function (damagePop) {
    if (!this._damagePops) this._damagePops = [];
    this._damagePops.push(damagePop);
  };

  /**
   * ダメージポップアップをすべてクリアする。
   */
  Game_CharacterBase.prototype.clearDamagePops = function () {
    this._damagePops = [];
  };

  /**
   * ダメージポップアップが要求されているかを判定する。
   *
   * @returns {boolean} ダメージポップアップが要求されている場合にtrueを返す。
   */
  Game_CharacterBase.prototype.isDamagePopupRequested = function () {
    if (this instanceof Game_Vehicle) return false; // 乗り物キャラクターならfalse
    if (!this._damagePops) this._damagePops = [];
    return this._damagePops.length > 0;
  };

  /**
   * Sprite_Character.prototype.initMembersの元のメソッドを呼び出し、
   * ダメージスプライト管理用配列を初期化する。
   */
  const _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function () {
    _Sprite_Character_initMembers.call(this);
    this._damageSprites = []; // ダメージスプライト用の配列
  };

  /**
   * Sprite_Characterのupdateメソッドを拡張し、ダメージポップアップの更新を行う。
   */
  const _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function () {
    _Sprite_Character_update.call(this);
    this.updateDamagePopup();
  };

  /**
   * ダメージポップアップを更新するメソッド。
   * キャラクターにダメージが表示されている場合、スプライトの位置を調整し、表示が終了したものは破棄する。
   */
  Sprite_Character.prototype.updateDamagePopup = function () {
    this.setupDamagePopup(); // ダメージポップアップが必要かどうか確認してセットアップ
    if (this._damageSprites.length > 0) {
      const y = this.y - this.patternHeight() / 2; // キャラクターの位置からポップアップの位置を計算
      this._damageSprites.forEach(function (damageSprite, index) {
        damageSprite.update();
        damageSprite.x = this.x * $gameScreen.zoomScale(); // スクリーンのズームに対応した位置
        damageSprite.y = (y - index * (damageSprite.fontSize() / 2)) * $gameScreen.zoomScale();
      }, this);
      if (!this._damageSprites[0].isPlaying()) {
        this.destroyDamageSprite(this._damageSprites[0]); // 再生が終了したスプライトを破棄
      }
    }
  };

  /**
   * ダメージポップアップが要求されている場合、ダメージスプライトを作成する。
   */
  Sprite_Character.prototype.setupDamagePopup = function () {
    if (this._character.isDamagePopupRequested()) {
      this.createDamageSprite();
    }
  };

  /**
   * ダメージポップアップのスプライトを作成し、表示レイヤーに追加する。
   */
  Sprite_Character.prototype.createDamageSprite = function () {
    const damageSprite = new Sprite_DamageEx(); // 新しいダメージスプライトを作成
    damageSprite.x = (this.x + this.damageOffsetX()) * $gameScreen.zoomScale(); // X座標を設定
    damageSprite.y = (this.y + this.damageOffsetY()) * $gameScreen.zoomScale(); // Y座標を設定
    damageSprite.setup(this._character); // キャラクターに関連付け
    this._damageSprites.push(damageSprite); // ダメージスプライト配列に追加
    SceneManager._scene._spriteset._damageSpriteLayer.addChild(damageSprite); // 表示レイヤーに追加
  };

  /**
   * ダメージ表示のX座標のオフセットを返す。
   *
   * @returns {number} X座標のオフセット値（デフォルトは0）。
   */
  Sprite_Character.prototype.damageOffsetX = function () {
    return 0;
  };

  /**
   * ダメージ表示のY座標のオフセットを返す。
   *
   * @returns {number} Y座標のオフセット値（デフォルトは0）。
   */
  Sprite_Character.prototype.damageOffsetY = function () {
    return 0;
  };

  /**
   * 指定されたダメージスプライトを破棄し、表示レイヤーから削除する。
   *
   * @param {Sprite_DamageEx} damageSprite - 破棄するダメージスプライト。
   */
  Sprite_Character.prototype.destroyDamageSprite = function (damageSprite) {
    SceneManager._scene._spriteset._damageSpriteLayer.removeChild(damageSprite); // レイヤーから削除
    this._damageSprites.remove(damageSprite); // 配列からスプライトを削除
    damageSprite.destroy(); // スプライトを破棄
  };

  // ---------------------------------------------------------------------
  // Spriteset_Map の拡張
  // ---------------------------------------------------------------------
  const _Spriteset_Map_prototype_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_prototype_createLowerLayer.call(this);
    this.createDamageSpriteLayer();
  };

  Spriteset_Map.prototype.createDamageSpriteLayer = function () {
    this._damageSpriteLayer = new Sprite();
    this._damageSpriteLayer.z = 10;
    this._tilemap.addChild(this._damageSpriteLayer);
  };

  // ---------------------------------------------------------------------
  // バトルでダメージポップするための既存クラスの拡張
  // ---------------------------------------------------------------------
  /**
   * Game_Battler.prototype.initMembersの元のメソッドを呼び出し、
   * バトラーのダメージポップアップ管理用配列を初期化する。
   */
  const _Game_Battler_prototype_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function () {
    _Game_Battler_prototype_initMembers.call(this);
    this._damagePops = []; // ダメージポップアップ用の配列
  };

  /**
   * ダメージポップアップ配列を取得する。
   *
   * @returns {Array} ダメージポップアップの配列。
   */
  Game_Battler.prototype.damagePops = function () {
    if (!this._damagePops) this._damagePops = [];
    return this._damagePops;
  };

  /**
   * ダメージポップアップを追加する。
   *
   * @param {Object} damagePop - 表示するダメージポップアップのデータ。
   */
  Game_Battler.prototype.pushDamagePop = function (damagePop) {
    if (!this._damagePops) this._damagePops = [];
    this._damagePops.push(damagePop);
  };

  /**
   * ダメージポップアップをすべてクリアする。
   */
  Game_Battler.prototype.clearDamagePops = function () {
    this._damagePops = [];
  };

  /**
   * ダメージポップアップが要求されているかを判定する。
   *
   * @returns {boolean} ダメージポップアップが要求されている場合にtrueを返す。
   */
  Game_Battler.prototype.isDamagePopupRequested = function () {
    if (!this._damagePops) this._damagePops = [];
    return this._damagePops.length > 0;
  };

  /**
   * Game_Battler.prototype.regenerateHpの元のメソッドを呼び出し、
   * HP再生時にダメージポップアップを追加する。
   */
  const _Game_Battler_prototype_regenerateHp = Game_Battler.prototype.regenerateHp;
  Game_Battler.prototype.regenerateHp = function () {
    _Game_Battler_prototype_regenerateHp.call(this);
    const minRecover = -this.maxSlipDamage();
    const value = Math.max(Math.floor(this.mhp * this.hrg), minRecover);
    if (value !== 0) this.pushDamagePop({ hpAffected: true, hpDamage: -value });
  };

  // ---------------------------------------------------------------------
  // Sprite_Battler の拡張
  // ---------------------------------------------------------------------
  /**
   * Sprite_Battler.prototype.initMembersの元のメソッドを呼び出し、
   * バトラーのダメージスプライトや位置情報を初期化する。
   */
  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function () {
    _Sprite_Battler_initMembers.call(this);
    this._damageSprites = []; // ダメージスプライト用の配列
    this._initialX = 0; // 初期X座標
    this._initialY = 0; // 初期Y座標
    this._targetOffsetX = 0; // 目標のXオフセット
    this._targetOffsetY = 0; // 目標のYオフセット
    this._oldWeapon1 = null; // 前回装備していた武器を保存する
  };

  const _Sprite_Battler_update = Sprite_Battler.prototype.update;
  Sprite_Battler.prototype.update = function () {
    _Sprite_Battler_update.call(this);
    // ジャンプが有効な時にジャンプアニメーションを更新
    if (this._jumpDuration > 0) {
      this.updateJump();
    }
    this.updateChatBubble();
  };

  /**
   * ダメージポップアップを更新し、スプライトの位置と可視状態を調整する。
   */
  Sprite_Battler.prototype.updateDamagePopup = function () {
    this.setupDamagePopup();
    if (this._damageSprites.length > 0) {
      const y = this.y - 24; // ダメージポップアップのY座標を調整
      let index = 0;
      for (const damageSprite of this._damageSprites) {
        if (!damageSprite) continue;
        damageSprite.update();
        damageSprite.x = this.x * $gameScreen.zoomScale(); // X座標をズームスケールに合わせる
        // 行間の設定
        const lineHeight = lineSpace;
        damageSprite.y = (y - index * lineHeight) * $gameScreen.zoomScale(); // Y座標を計算
        index += 1;
      }
      if (!this._damageSprites[0].isPlaying()) {
        this.destroyDamageSprite(this._damageSprites[0]); // 最初のダメージスプライトが完了したら破棄
      }
    }
  };

  /**
   * ダメージポップアップが必要な場合にダメージスプライトを作成する。
   */
  Sprite_Battler.prototype.setupDamagePopup = function () {
    if (!this._battler) return;
    if (this._battler.isDamagePopupRequested()) {
      this.createDamageSprite();
    }
  };

  /**
   * チャットバブルの表示を更新し、時間が経過するとフェードアウトする。
   */
  Sprite_Battler.prototype.updateChatBubble = function () {
    if (!this._chatBubbleSprite) return;
    const chatBubbleFadeOutSpeed = 5; // フェードアウト速度
    if (this._chatBubbleWaitCount === undefined) this._chatBubbleWaitCount = 0;
    if (this._chatBubbleWaitCount > 0) {
      this._chatBubbleWaitCount--; // カウントダウン
    } else if (this._chatBubbleSprite.opacity > 0) {
      this._chatBubbleSprite.opacity -= chatBubbleFadeOutSpeed; // 徐々に透明度を下げる
      if (this._chatBubbleSprite.opacity <= 0) {
        this.clearChatBubble(); // 透明度が0になったら削除
      }
    }
  };

  /**
   * チャットバブルのフェードアウトをカウントダウンと共に開始する。
   *
   * @param {number} frames - フェードアウトまでの待機時間（フレーム数）
   * @param {number} fadeOutSpeed - フェードアウトの速度（デフォルトは5）
   */
  Sprite_Battler.prototype.startChatBubbleFadeOutCountdown = function (frames, fadeOutSpeed) {
    this._chatBubbleWaitCount = frames; // カウントダウンの開始
    this._chatBubbleFadeOutSpeed = fadeOutSpeed || 5; // フェードアウト速度を設定
    this._chatBubbleSprite.opacity = 255; // チャットバブルを完全に表示
  };

  /**
   * ダメージスプライトを作成して画面に追加する。
   */
  Sprite_Battler.prototype.createDamageSprite = function () {
    const damageSprite = new Sprite_DamageEx(); // ダメージスプライトの作成
    damageSprite.x = (this.x + this.damageOffsetX()) * $gameScreen.zoomScale(); // X座標を設定
    damageSprite.y = (this.y + this.damageOffsetY()) * $gameScreen.zoomScale(); // Y座標を設定
    damageSprite.setup(this._battler); // ダメージスプライトにバトラー情報を設定
    this._damageSprites.push(damageSprite); // ダメージスプライトを配列に追加
    SceneManager._scene._spriteset._damageSpriteLayer.addChild(damageSprite); // スプライトレイヤーに追加
  };

  /**
   * ダメージポップアップのX座標のオフセットを返す。
   *
   * @returns {number} X座標のオフセット
   */
  Sprite_Battler.prototype.damageOffsetX = function () {
    return 0; // X座標のデフォルトオフセット
  };

  /**
   * ダメージポップアップのY座標のオフセットを返す。
   *
   * @returns {number} Y座標のオフセット
   */
  Sprite_Battler.prototype.damageOffsetY = function () {
    return 0; // Y座標のデフォルトオフセット
  };

  /**
   * ダメージスプライトを破棄して、レイヤーと配列から削除する。
   *
   * @param {Sprite_DamageEx} damageSprite - 破棄するダメージスプライト
   */
  Sprite_Battler.prototype.destroyDamageSprite = function (damageSprite) {
    SceneManager._scene._spriteset._damageSpriteLayer.removeChild(damageSprite); // レイヤーから削除
    this._damageSprites.remove(damageSprite); // 配列から削除
    damageSprite.destroy(); // スプライトを破棄
  };

  /**
   * 指定されたターゲット位置にジャンプする。
   *
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.x - ターゲットのX座標
   * @param {number} param.y - ターゲットのY座標
   * @param {number} [param.duration=20] - ジャンプにかけるフレーム数
   * @param {number} [param.jumpHeight=20] - ジャンプの高さ
   * @param {number} [param.rotationAmount=0] - 回転量
   */
  Sprite_Battler.prototype.jumpToTarget = function ({
    x,
    y,
    duration = 20,
    jumpHeight = 20,
    rotationAmount = 0,
  }) {
    this._jumpTargetX = x;
    this._jumpTargetY = y; // ターゲットのY座標
    this._jumpStartX = this.x; // 元のX座標
    this._jumpStartY = this.y; // 元のY座標
    this._jumpHeight = jumpHeight; // ジャンプの高さ
    this._jumpDuration = duration; // ジャンプの所要時間
    this._jumpFrame = 0; // 現在のフレーム
    this._jumpRotationAmount = rotationAmount; // 回転量を設定
    this._movementDuration = duration; // 移動時間
  };

  /**
   * ジャンプのアニメーションを更新する。
   */
  Sprite_Battler.prototype.updateJump = function () {
    if (this._jumpDuration > 0) {
      this._jumpFrame++;
      const progress = this._jumpFrame / this._jumpDuration; // ジャンプ進行度

      // X座標の線形移動
      this.x = this._jumpStartX + (this._jumpTargetX - this._jumpStartX) * progress;

      // Y座標のジャンプ移動（サイン波）＋ターゲットに向かって移動
      const jumpY = this._jumpStartY - this._jumpHeight * Math.sin(Math.PI * progress); // ジャンプの高さ
      const targetY = this._jumpTargetY; // ターゲットの最終Y座標
      this.y = jumpY + (targetY - this._jumpStartY) * progress;

      // 回転処理
      if (this._jumpRotationAmount) {
        this.rotation = this._jumpRotationAmount * Math.PI * 2 * progress; // 回転計算
      }

      if (this._jumpFrame >= this._jumpDuration) {
        this.setHome(this._jumpTargetX, this._jumpTargetY); // ジャンプ終了後の座標を設定
        this.rotation = 0; // 回転をリセット
        this._jumpDuration = 0; // ジャンプ終了
      }
    }
  };

  /**
   * 現在位置にジャンプする。
   *
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.duration - ジャンプの時間
   * @param {number} param.jumpHeight - ジャンプの高さ
   * @param {number} param.rotationAmount - 回転量
   */
  Sprite_Battler.prototype.jumpHere = function ({ duration, jumpHeight, rotationAmount }) {
    this.jumpToTarget({ x: this.x, y: this.y, duration, jumpHeight, rotationAmount });
  };

  // ---------------------------------------------------------------------
  // Sprite_Actorの拡張
  // ---------------------------------------------------------------------
  /**
   * アクターのホーム位置を設定し、初期位置を記録する。
   *
   * @param {number} index - アクターのインデックス。
   */
  const _Sprite_Actor_prototype_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function (index) {
    _Sprite_Actor_prototype_setActorHome.call(this, index);
    this._initialX = this._homeX;
    this._initialY = this._homeY;
  };

  /**
   * Sprite_Actorのupdateメソッドを拡張し、武器スプライトの作成と更新を行う。
   */
  const _Sprite_Actor_prototype_update = Sprite_Actor.prototype.update;
  Sprite_Actor.prototype.update = function () {
    _Sprite_Actor_prototype_update.call(this);
    this.createWeaponSpriteIdle(); // 武器スプライトの作成
    this.updateWeaponSpriteIdleVisible(); // 武器スプライトの可視状態を更新
  };

  /**
   * 武器スプライトを作成するメソッド。
   * 装備中の武器が変更された場合、古い武器スプライトを破棄し、新しいスプライトを生成する。
   */
  Sprite_Actor.prototype.createWeaponSpriteIdle = function () {
    if (!this._battler) return;
    if (!this._battler.weapons()) return;
    const weapon1 = this._battler.weapons()[0];
    if (!this._weaponSpriteIdle || this._oldWeapon1 !== weapon1) {
      if (this._weaponSpriteIdle) {
        this.removeChild(this._weaponSpriteIdle);
        this._weaponSpriteIdle.destroy();
      }
      const wtypeId = weapon1 ? weapon1.wtypeId : 0;
      const weaponDisplaySetting = weaponDisplaySettings[wtypeId];
      const { offsetX, offsetY, angle } = weaponDisplaySetting?.setting;
      this._oldWeapon1 = weapon1;
      this._weaponSpriteIdle = new Sprite_WeaponIdle();
      this._weaponSpriteIdle.anchor.x = 0.5;
      this._weaponSpriteIdle.anchor.y = 0.5;
      const attackMotion = $dataSystem.attackMotions[wtypeId];
      this._weaponSpriteIdle.setup(attackMotion.weaponImageId);
      this._weaponSpriteIdle._baseX = offsetX;
      this._weaponSpriteIdle._baseY = offsetY;
      const angleInDegrees = angle; // 傾けたい角度（例: 10度）
      const angleInRadians = (angleInDegrees * Math.PI) / 180; // ラジアンに変換
      this._weaponSpriteIdle._baseRotation = angleInRadians;
      this.addChild(this._weaponSpriteIdle);
    }
  };

  /**
   * @remarks 参考情報
   * @see Sprite_Actor.MOTIONS
   */
  //   walk: { index: 0, loop: true },
  //   wait: { index: 1, loop: true },
  //   chant: { index: 2, loop: true },
  //   guard: { index: 3, loop: true },
  //   damage: { index: 4, loop: false },
  //   evade: { index: 5, loop: false },
  //   thrust: { index: 6, loop: false },
  //   swing: { index: 7, loop: false },
  //   missile: { index: 8, loop: false },
  //   skill: { index: 9, loop: false },
  //   spell: { index: 10, loop: false },
  //   item: { index: 11, loop: false },
  //   escape: { index: 12, loop: true },
  //   victory: { index: 13, loop: true },
  //   dying: { index: 14, loop: true },
  //   abnormal: { index: 15, loop: true },
  //   sleep: { index: 16, loop: true },
  //   dead: { index: 17, loop: true },

  /**
   * 武器スプライトの可視状態を更新するメソッド。
   * アクターのモーションに応じて、武器スプライトを表示・非表示にする。
   */
  Sprite_Actor.prototype.updateWeaponSpriteIdleVisible = function () {
    if (!this._weaponSpriteIdle) return;

    // モーションの定数を定義
    const WALK = 0;
    const WAIT = 1;
    const CHANT = 2;
    const GUARD = 3;
    const SKILL = 9;
    const SPELL = 10;

    // 現在のモーションインデックスを取得
    const motionIndex = this._motion.index;

    // 特定のモーションでない場合、武器スプライトを非表示にする
    if (![WALK, CHANT, WAIT, SKILL, SPELL, GUARD].includes(motionIndex)) {
      this._weaponSpriteIdle.visible = false;
      return;
    }

    // モーションに基づいて武器スプライトの状態を設定
    this._weaponSpriteIdle._waiting = [WAIT].includes(motionIndex); // 待機モーション
    this._weaponSpriteIdle._casting = [CHANT].includes(motionIndex); // 詠唱モーション
    this._weaponSpriteIdle._spelling = [SKILL, SPELL].includes(motionIndex); // スキル/スペルモーション
    this._weaponSpriteIdle._guarding = [GUARD].includes(motionIndex); // ガードモーション

    // 武器スプライトが再生中でない場合、スプライトを表示する
    this._weaponSpriteIdle.visible = !this._weaponSprite.isPlaying();
  };

  /**
   * Sprite_Actor.prototype.updateMotionCountの元のメソッドを呼び出し、
   * 武器スプライトのフレームパターンを現在のモーションパターンに基づいて更新する。
   */
  const _Sprite_Actor_prototype_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;
  Sprite_Actor.prototype.updateMotionCount = function () {
    _Sprite_Actor_prototype_updateMotionCount.call(this);

    // 武器スプライトが存在する場合、モーションのパターンに基づいてフレームを更新
    if (this._weaponSpriteIdle) {
      this._weaponSpriteIdle.setFramePattern(this._pattern);
    }
  };

  // ---------------------------------------------------------------------
  // Sprite_Weaponの拡張クラス
  // ---------------------------------------------------------------------
  /**
   * 待機状態の武器スプライトを表すクラス
   *
   * @extends Sprite_Weapon
   */
  class Sprite_WeaponIdle extends Sprite_Weapon {
    /**
     * メンバ変数の初期化を行う。
     */
    initMembers() {
      super.initMembers();
      this._framePattern = 0; // フレームパターン
      this._motionCount = 1; // モーションのカウント
      this._baseX = 0; // 基本位置のX座標
      this._baseY = 0; // 基本位置のY座標
      this._baseRotation = 0; // 基本回転角度
      this._rotateCount = 0; // 回転カウント
      this._casting = false; // 詠唱モーションかどうか
      this._waiting = false; // 待機モーションかどうか
      this._spelling = false; // スキル使用モーションかどうか
      this._guarding = false; // 防御モーションかどうか
    }

    /**
     * 武器の画像を設定し、スプライトを初期化する。
     *
     * @param {number} weaponImageId - 武器の画像ID
     */
    setup(weaponImageId) {
      this._weaponImageId = weaponImageId;
      this._animationCount = 0; // アニメーションカウントの初期化
      this._pattern = 2; // 初期パターンを設定
      this.loadBitmap(); // 画像の読み込み
      this.updateFrame(); // フレームの更新
    }

    /**
     * フレームパターンを設定する。
     *
     * @param {number} framePattern - 設定するフレームパターン
     */
    setFramePattern(framePattern) {
      this._framePattern = framePattern;
    }

    /**
     * スプライトの状態を毎フレーム更新する。
     */
    update() {
      super.update();
      this._animationCount++;
      this.updateFrame(); // フレームの更新
      this.updatePosition(); // 位置の更新
      this._animationCount = 0; // アニメーションカウントのリセット
    }

    /**
     * 武器スプライトの位置をモーションに応じて更新する。
     */
    updatePosition() {
      if (this._casting) {
        // 詠唱中の位置設定
        this.x = this._baseX;
        this.y = this._baseY - 3;
        this.rotation = this._baseRotation;
        return;
      }
      if (this._spelling) {
        // スキル使用中の位置設定
        this.x = this._baseX;
        this.y = this._baseY;
        this.rotate(-20); // 左に20度回転
        return;
      }
      if (this._waiting) {
        // 待機中の位置設定
        this.x = this._baseX;
        this.y = this._baseY - 3;
        this.rotation = this._baseRotation;
        return;
      }
      if (this._guarding) {
        // 防御中の位置設定
        this.x = this._baseX + 10;
        this.y = this._baseY - 3;
        const angle = 20;
        this.rotation = this._baseRotation + (angle * Math.PI) / 180; // 20度回転
        return;
      }

      this.rotation = this._baseRotation;

      // 各フレームパターンにおける手の位置のオフセット
      const offsetYOfHand = {
        0: 0,
        1: 2,
        2: 3,
        3: 2,
      };

      // 基本位置に手の位置オフセットを加算
      this.x = this._baseX;
      this.y = this._baseY + offsetYOfHand[this._framePattern];
    }

    /**
     * 武器スプライトを回転させる。
     *
     * @param {number} angle - 回転角度（度数）
     */
    rotate(angle) {
      this._rotateCount += angle;
      if (this._rotateCount >= 360) this._rotateCount = 0; // 360度を超えたらリセット
      const angleInRadians = (this._rotateCount * Math.PI) / 180; // 度数法をラジアンに変換
      this.rotation = angleInRadians; // 回転角度を設定
    }
  }

  // ---------------------------------------------------------------------
  // Sprite_Enemyの拡張
  // ---------------------------------------------------------------------
  /**
   * Sprite_Enemy.prototype.initMembersの元のメソッドを呼び出し、
   * 呼吸アニメーションのタイマーを初期化する。
   */
  const _Sprite_Enemy_prototype_initMembers = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function () {
    _Sprite_Enemy_prototype_initMembers.call(this);
    this._breathingTimer = 0; // 呼吸アニメーション用タイマーの初期化
  };

  /**
   * Sprite_Enemy.prototype.setBattlerの元のメソッドを呼び出し、
   * 敵キャラクターの初期位置を設定する。
   *
   * @param {Game_Enemy} battler - 設定するバトラー
   */
  const _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    _Sprite_Enemy_prototype_setBattler.call(this, battler);
    this._initialX = this._homeX; // 初期X座標を記録
    this._initialY = this._homeY; // 初期Y座標を記録
  };

  /**
   * Sprite_Enemyのupdateメソッドを拡張し、呼吸エフェクトを更新する。
   */
  const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function () {
    _Sprite_Enemy_update.call(this);
    this.updateBreathingEffect(); // 呼吸アニメーションを更新
  };

  /**
   * 呼吸アニメーションを更新し、敵が動ける場合にスケールを調整して息づくように見せる。
   */
  Sprite_Enemy.prototype.updateBreathingEffect = function () {
    if (this._battler.canMove()) {
      this._breathingTimer += 0.05; // タイマーを徐々に増加
      const scaleAmount = 1 + Math.sin(this._breathingTimer) * 0.05; // サイン波でスケール変動
      this.scale.set(1.0, scaleAmount); // X軸は固定、Y軸のみ拡縮
    } else {
      this.scale.set(1.0, 1.0); // 敵が動けない場合は元のサイズ
    }
  };

  // ---------------------------------------------------------------------
  // Spriteset_Battle の拡張
  // ---------------------------------------------------------------------
  /**
   * Spriteset_Battle.prototype.createLowerLayerの元のメソッドを呼び出し、
   * 追加のスプライトレイヤー（ダメージスプライトレイヤーとチャットバブルスプライトレイヤー）を作成する。
   */
  const _Spriteset_Battle_prototype_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function () {
    _Spriteset_Battle_prototype_createLowerLayer.call(this); // 元の処理を呼び出す
    this.createDamageSpriteLayer(); // ダメージスプライトレイヤーを作成
    this.createChatBubbleSpriteLayer(); // チャットバブルスプライトレイヤーを作成
  };

  /**
   * ダメージスプライトレイヤーを作成し、バトルフィールドに追加する。
   */
  Spriteset_Battle.prototype.createDamageSpriteLayer = function () {
    this._damageSpriteLayer = new Sprite(); // ダメージスプライト用の新しいスプライトを作成
    this._damageSpriteLayer.z = 1; // Zインデックスを設定して前面に表示
    this._battleField.addChild(this._damageSpriteLayer); // バトルフィールドに追加
  };

  /**
   * チャットバブルスプライトレイヤーを作成し、バトルフィールドに追加する。
   */
  Spriteset_Battle.prototype.createChatBubbleSpriteLayer = function () {
    this._chatBubbleSpriteLayer = new Sprite(); // チャットバブル用の新しいスプライトを作成
    this._chatBubbleSpriteLayer.z = 1; // Zインデックスを設定して前面に表示
    this._battleField.addChild(this._chatBubbleSpriteLayer); // バトルフィールドに追加
  };

  // ---------------------------------------------------------------------
  // Window_BattleLog の拡張
  // ---------------------------------------------------------------------
  /**
   * 対象の前にジャンプするアニメーションを実行する。
   *
   * @param {Game_Battler} subject - ジャンプを行うキャラクター
   * @param {Game_Battler[]} targets - ジャンプ先のターゲット
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.duration - ジャンプにかける時間（フレーム数）
   * @param {number} param.jumpHeight - ジャンプの高さ
   * @param {number} param.rotationAmount - ジャンプ中の回転量
   */
  Window_BattleLog.prototype.performJumpToTargetFront = function (
    subject,
    targets,
    { duration, jumpHeight, rotationAmount }
  ) {
    const subjectSprite = SceneManager._scene._spriteset.findTargetSprite(subject);
    const targetSprite = SceneManager._scene._spriteset.findTargetSprite(targets[0]);
    if (subjectSprite && targetSprite) {
      if (subjectSprite === targetSprite) {
        return;
      }
      const offsetTargetPositionX = subject.isActor() ? 100 : -100;
      const x = targetSprite.x + offsetTargetPositionX;
      const y = targetSprite.y;
      subjectSprite.jumpToTarget({
        x,
        y,
        duration,
        jumpHeight,
        rotationAmount,
      });
    }
  };

  /**
   * 現在の位置にジャンプするアニメーションを実行する。
   *
   * @param {Game_Battler} subject - ジャンプを行うキャラクター
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.duration - ジャンプにかける時間（フレーム数）
   * @param {number} param.jumpHeight - ジャンプの高さ
   * @param {number} param.rotationAmount - ジャンプ中の回転量
   */
  Window_BattleLog.prototype.performJumpHere = function (
    subject,
    { duration, jumpHeight, rotationAmount }
  ) {
    const subjectSprite = SceneManager._scene._spriteset.findTargetSprite(subject);
    if (!subjectSprite) return;
    subjectSprite.jumpHere({ duration, jumpHeight, rotationAmount });
  };

  /**
   * キャラクターを元の位置に戻すジャンプアニメーションを実行する。
   *
   * @param {Game_Battler} subject - 元の位置に戻るキャラクター
   */
  Window_BattleLog.prototype.performJumpBackToOriginalPosition = function (subject) {
    const subjectSprite = SceneManager._scene._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      const x = subjectSprite._initialX;
      const y = subjectSprite._initialY;
      if (subjectSprite.x === x && subjectSprite.y === y) {
        return;
      }
      subjectSprite.jumpToTarget({ x, y, duration: 15, jumpHeight: 10 });
    }
  };

  /**
   * 回避アニメーションを実行し、ジャンプする。
   *
   * @param {Game_Battler} target - 回避を行うキャラクター
   */
  const _Window_BattleLog_prototype_performEvasion = Window_BattleLog.prototype.performEvasion;
  Window_BattleLog.prototype.performEvasion = function (target) {
    const targetSprite = SceneManager._scene._spriteset.findTargetSprite(target);
    if (!targetSprite) return;
    targetSprite.jumpHere({ duration: 20, jumpHeight: 100, rotationAmount: 1 });
    _Window_BattleLog_prototype_performEvasion.call(this, target);
  };

  /**
   * 魔法回避アニメーションを実行し、ジャンプする。
   *
   * @param {Game_Battler} target - 魔法回避を行うキャラクター
   */
  const _Window_BattleLog_prototype_performMagicEvasion =
    Window_BattleLog.prototype.performMagicEvasion;
  Window_BattleLog.prototype.performMagicEvasion = function (target) {
    const targetSprite = SceneManager._scene._spriteset.findTargetSprite(target);
    if (!targetSprite) return;
    // targetSprite.jumpHere({ duration: 20, jumpHeight: 100, rotationAmount: 0 });
    _Window_BattleLog_prototype_performMagicEvasion.call(this, target);
  };

  /**
   * 代わりに攻撃を受けるキャラクターのジャンプアニメーションを実行する。
   *
   * @param {Game_Battler} substitute - 代わりに攻撃を受けるキャラクター
   * @param {Game_Battler} target - 攻撃を受ける対象キャラクター
   */
  const _Window_BattleLog_prototype_performSubstitute =
    Window_BattleLog.prototype.performSubstitute;
  Window_BattleLog.prototype.performSubstitute = function (substitute, target) {
    const subjectSprite = SceneManager._scene._spriteset.findTargetSprite(substitute);
    const targetSprite = SceneManager._scene._spriteset.findTargetSprite(target);
    if (subjectSprite && targetSprite) {
      if (subjectSprite === targetSprite) {
        return;
      }
      const offsetTargetPositionX = substitute.isActor() ? -50 : 50;
      const x = targetSprite.x + offsetTargetPositionX;
      const y = targetSprite.y;
      subjectSprite.jumpToTarget({ x, y, duration: 5, jumpHeight: 10, rotationAmount: 0 });
      this.push('performJumpBackToOriginalPosition', substitute);
    }
    _Window_BattleLog_prototype_performSubstitute.call(this, substitute, target);
  };

  /**
   * バトルアクション開始時にジャンプアニメーションを追加で実行する。
   *
   * @param {Game_Battler} subject - アクションを行うキャラクター
   * @param {Game_Action} action - 実行するアクション
   * @param {Game_Battler[]} targets - ターゲットとなるキャラクター
   */
  const _Window_BattleLog_prototype_startAction = Window_BattleLog.prototype.startAction;
  Window_BattleLog.prototype.startAction = function (subject, action, targets) {
    // 攻撃対象にジャンプが必要かどうかを判定する関数
    const isActorNeedJumpToTarget = (subject, action) => {
      if (action.isAttack()) {
        if (subject.isEnemy()) {
          return action.isForOne();
        }
        const weapons = subject.weapons();
        const wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
        const attackMotion = $dataSystem.attackMotions[wtypeId];
        if (attackMotion) {
          const THRUST_MOTION = 0;
          const SWING_MOTION = 1;
          const MISSILE_MOTION = 2;
          if (attackMotion.type === THRUST_MOTION) {
            return action.isForOne();
          }
          if (attackMotion.type === SWING_MOTION) {
            return action.isForOne();
          }
          if (attackMotion.type === MISSILE_MOTION) {
            return false;
          }
        }
      }
      if (action.isMagicSkill()) {
        if (action.isForFriend()) {
          return action.isForOne();
        }
        return false;
      }
      return action.isForOne();
    };

    this.showSkillAndTargetInChatBubble(subject, action, targets); // チャットバブルでスキルを表示

    const subjectSprite = SceneManager._scene._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      if (isActorNeedJumpToTarget(subject, action)) {
        this.push('performJumpToTargetFront', subject, targets, {
          duration: 20,
          jumpHeight: 15,
          rotationAmount: 0,
        });
      }
    }

    _Window_BattleLog_prototype_startAction.call(this, subject, action, targets);
  };

  /**
   * バトルアクション終了時にジャンプアニメーションで元の位置に戻す。
   *
   * @param {Game_Battler} subject - アクションを行ったキャラクター
   */
  const _Window_BattleLog_prototype_endAction = Window_BattleLog.prototype.endAction;
  Window_BattleLog.prototype.endAction = function (subject) {
    _Window_BattleLog_prototype_endAction.call(this, subject);
    const subjectSprite = SceneManager._scene._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      this.push('performJumpBackToOriginalPosition', subject);
    }
  };

  /**
   * スキル名とターゲット名をチャットバブルに表示し、一定時間後にフェードアウトする。
   *
   * @param {Game_Battler} subject - スキルを使用するキャラクター
   * @param {Game_Action} action - 使用するアクション（スキル）
   * @param {Game_Battler[]} targets - アクションの対象キャラクターの配列
   */
  Window_BattleLog.prototype.showSkillAndTargetInChatBubble = function (subject, action, targets) {
    const skillName = action.item().name; // スキル名を取得
    let message = '';

    // ガードアクションの場合のメッセージ
    if (action.isGuard()) {
      message = `${skillName}！`; // ガードの場合はシンプルにスキル名を表示
    } else {
      if (targets.length === 1) {
        const target = targets[0];
        // 対象が自分自身の場合のメッセージ
        if (target === subject) {
          // message = `自分に、${skillName}！`;
          message = `${skillName}！`;
        } else {
          // 対象が他者の場合のメッセージ
          message = `${target.name()}に、${skillName}！`;
        }
      } else {
        // 複数のターゲットがいる場合のメッセージ
        message = `${skillName}！`;
      }
    }

    // 使用者の上にメッセージを表示
    const subjectSprite = BattleManager._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      subjectSprite.setChatBubbleText(message, action); // チャットバブルにテキストを設定

      // 60フレーム（約1秒）待機してから行動を開始
      this.push('wait', 60);

      // 60フレーム後にチャットバブルをフェードアウトさせる
      subjectSprite.startChatBubbleFadeOutCountdown(60, 5); // 1フレームごとに5ずつ透明度を減らす
    }
  };

  /**
   * 指定したフレーム数だけ待機する処理。
   *
   * @param {number} frames - 待機するフレーム数（指定しない場合はデフォルトのメッセージスピードを使用）
   */
  Window_BattleLog.prototype.wait = function (frames) {
    this._waitCount = frames || this.messageSpeed(); // フレーム数が指定されていない場合、デフォルトのメッセージスピードで待機
  };

  /**
   * Window_BattleLog の初期化メソッドをオーバーライドしてカスタマイズ。
   *
   * @param {Rectangle} rect - ウィンドウの領域を示す矩形オブジェクト
   */
  const _Window_BattleLog_prototype_initialize = Window_BattleLog.prototype.initialize;
  Window_BattleLog.prototype.initialize = function (rect) {
    _Window_BattleLog_prototype_initialize.call(this, rect);
    // ウィンドウの背景に暗めの効果を表示する（コメントアウトされている）
    // this.showBackgroundDimmer();
  };

  /**
   * バトルログに表示できる最大行数を指定する。
   *
   * @returns {number} 最大表示行数
   */
  Window_BattleLog.prototype.maxLines = function () {
    return 5; // 5行まで表示
  };

  /**
   * バトルログウィンドウの背景の不透明度を設定する。
   *
   * @returns {number} 背景の不透明度（0で完全な透明）
   */
  Window_BattleLog.prototype.backPaintOpacity = function () {
    return 0; // 背景を透明に設定
  };

  /**
   * バトルログウィンドウの各行の高さを指定する。
   *
   * @returns {number} 行の高さ（ピクセル単位）
   */
  Window_BattleLog.prototype.lineHeight = function () {
    return 26; // 各行の高さを26ピクセルに設定
  };

  /**
   * バトルログウィンドウの項目の高さを指定する。
   *
   * @returns {number} 項目の高さ（ピクセル単位）
   */
  Window_BattleLog.prototype.itemHeight = function () {
    return 26; // 各項目の高さも26ピクセルに設定
  };

  /**
   * バトルログウィンドウの項目の内側の余白を指定する。
   *
   * @returns {number} 内側の余白（ピクセル単位）
   */
  Window_BattleLog.prototype.itemPadding = function () {
    return 8; // 各項目の内側の余白を8ピクセルに設定
  };

  /**
   * フォント設定をリセットし、デフォルトのフォントに戻す。
   */
  Window_BattleLog.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace(); // メインフォントの設定
    this.contents.fontSize = 16; // フォントサイズを16ピクセルに設定
    this.contents.fontBold = false; // 太字を無効化
    this.resetTextColor(); // テキストカラーをリセット
  };

  /**
   * バトルログにテキストを追加し、5行以上の場合は古い行を削除する。
   *
   * @param {string} text - バトルログに追加するテキスト
   */
  Window_BattleLog.prototype.addText = function (text) {
    this._lines.push(text);

    // 5行以上になったら古い行を削除する
    if (this._lines.length > 5) {
      this._lines.shift(); // 一番古い行を削除
    }

    this.refresh(); // ログウィンドウを更新
    this.wait(); // 少し待機
  };

  /**
   * 対象のアクション結果を表示する。
   *
   * @param {Game_Battler} subject - アクションを行ったキャラクター
   * @param {Game_Battler} target - アクションを受けたキャラクター
   */
  Window_BattleLog.prototype.displayActionResults = function (subject, target) {
    if (target.result().used) {
      this.displayCritical(target); // クリティカルヒットの表示
      this.displayDamage(target); // ダメージの表示
      this.displayAffectedStatus(target); // 状態異常の表示
      this.displayFailure(target); // アクション失敗の表示
    }
  };

  /**
   * 対象が攻撃を外した（ミスした）場合の表示。
   *
   * @param {Game_Battler} target - 攻撃を受ける対象
   */
  Window_BattleLog.prototype.displayMiss = function (target) {
    let fmt;
    if (target.result().physical) {
      const isActor = target.isActor();
      fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit; // ミスのメッセージを選択
      this.performMiss(target); // ミスのアニメーションを実行
    } else {
      fmt = TextManager.actionFailure; // アクション失敗の場合のメッセージ
    }
    this.push('addText', fmt.format(target.name())); // ログにメッセージを追加
  };

  /**
   * 対象が攻撃を回避した場合の表示。
   *
   * @param {Game_Battler} target - 回避したキャラクター
   */
  Window_BattleLog.prototype.displayEvasion = function (target) {
    let fmt;
    if (target.result().physical) {
      fmt = TextManager.evasion; // 物理攻撃の回避メッセージ
      this.performEvasion(target); // 回避のアニメーションを実行
    } else {
      fmt = TextManager.magicEvasion; // 魔法攻撃の回避メッセージ
      this.performMagicEvasion(target); // 魔法回避のアニメーションを実行
    }
    this.push('addText', fmt.format(target.name())); // ログにメッセージを追加
  };

  /**
   * 対象が受けたHPダメージを表示する。
   *
   * @param {Game_Battler} target - ダメージを受けた対象
   */
  Window_BattleLog.prototype.displayHpDamage = function (target) {
    if (target.result().hpAffected) {
      if (target.result().hpDamage > 0 && !target.result().drain) {
        this.performDamage(target); // ダメージのアニメーションを実行
        if (target.isEnemy()) {
          $gameSystem.countupCombo(1, target.result().hpDamage); // コンボカウントの更新
        }
      }
      if (target.result().hpDamage < 0) {
        this.performRecovery(target); // 回復のアニメーションを実行
      }
      this.push('addText', this.makeHpDamageText(target)); // ログにHPダメージのテキストを追加
    }
  };

  /**
   * 対象が受けたMPダメージを表示する。
   *
   * @param {Game_Battler} target - MPダメージを受けた対象
   */
  Window_BattleLog.prototype.displayMpDamage = function (target) {
    if (target.isAlive() && target.result().mpDamage !== 0) {
      if (target.result().mpDamage < 0) {
        this.performRecovery(target); // 回復のアニメーションを実行
      }
      this.push('addText', this.makeMpDamageText(target)); // ログにMPダメージのテキストを追加
    }
  };

  /**
   * 対象が受けたTPダメージを表示する。
   *
   * @param {Game_Battler} target - TPダメージを受けた対象
   */
  Window_BattleLog.prototype.displayTpDamage = function (target) {
    if (target.isAlive() && target.result().tpDamage !== 0) {
      if (target.result().tpDamage < 0) {
        this.performRecovery(target); // 回復のアニメーションを実行
      }
      this.push('addText', this.makeTpDamageText(target)); // ログにTPダメージのテキストを追加
    }
  };

  Window_BattleLog.prototype.showNormalAnimation = function (targets, animationId, mirror) {
    // 何もしない
    // const animation = $dataAnimations[animationId];
    // if (animation) {
    //     $gameTemp.requestAnimation(targets, animationId, mirror);
    // }
  };

  // ---------------------------------------------------------------------
  // Sprite_Damage の拡張
  // ---------------------------------------------------------------------
  /**
   * 拡張ダメージスプライトクラス
   * ダメージポップアップの表示やエフェクトを追加する。
   *
   * @extends Sprite_Damage
   */
  class Sprite_DamageEx extends Sprite_Damage {
    /**
     * コンストラクタ
     * ダメージポップアップの表示時間を設定する。
     */
    constructor() {
      super();
      this._duration = durationOfDamagePop; // ダメージポップアップの表示期間
    }

    /**
     * 対象のダメージポップアップの設定を行う。
     *
     * @param {Game_Battler} target - ダメージポップアップの対象となるキャラクター
     */
    setup(target) {
      const damagePop = target.damagePops().shift(); // ダメージポップアップのデータを取得
      if (typeof damagePop === 'string') {
        this.createFreePopupNormalSize(damagePop); // 文字列の場合はフリーポップアップとして表示
        return;
      }
      if (damagePop.missed) {
        this._colorType = 0; // ミスの場合の色設定
        this.createFreePopupNormalSize(textForMiss); // ミス表示
        this.setupEvadeEffect(); // 回避エフェクト
        return;
      }
      if (damagePop.evaded) {
        this._colorType = 0; // 回避の場合の色設定
        this.createFreePopupNormalSize(textForEvade); // 回避表示
        this.setupEvadeEffect(); // 回避エフェクト
        return;
      }
      if (damagePop.hpAffected) {
        this._colorType = damagePop.hpDamage >= 0 ? 0 : 1; // HPダメージの色設定
        this.createDigits(damagePop.hpDamage); // ダメージを数字で表示

        if (!damagePop.critical && damagePop.damageRate !== undefined) {
          const damageRate = Number(damagePop.damageRate.toFixed(1));
          if (damageRate > 1) {
            this._colorType = 0; // 弱点攻撃の場合の色設定
            this.createFreePopupSmallSize(`${textForWeak} × ${damageRate.toFixed(1)}`, true);
            this.setupWeakEffect(); // 弱点エフェクト
          }
          if (damageRate < 1) {
            this._colorType = 0; // 耐性攻撃の場合の色設定
            this.createFreePopupSmallSize(`${textForReduce} × ${damageRate.toFixed(1)}`, true);
            this.setupResistEffect(); // 耐性エフェクト
          }
        }
      } else if (target.isAlive() && damagePop.mpDamage) {
        this._colorType = damagePop.mpDamage >= 0 ? 2 : 3; // MPダメージの色設定
        this.createDigits(damagePop.mpDamage, 'mp'); // MPダメージを数字で表示
      }
      if (damagePop.critical) {
        this.createFreePopupNormalSize(textForCritical, true); // クリティカルヒット表示
        $gameScreen.startFlashForCritical(); // クリティカルヒットのフラッシュエフェクト
        this.setupCriticalEffect(); // クリティカルエフェクト
      }
    }

    /**
     * 数字を作成してスプライトに表示する。
     *
     * @param {number} value - 表示するダメージまたは回復値
     * @param {string} [suffix=''] - 追加する接尾辞（例：'mp'）
     */
    createDigits(value, suffix = '') {
      const string = `${Math.abs(value).toString()}${suffix}`; // 数字と接尾辞を連結
      const h = this.fontSize(); // フォントサイズ
      const w = Math.floor(h * 0.75); // 幅を計算
      for (let i = 0; i < string.length; i++) {
        const sprite = this.createChildSpriteNormalSize(w, h); // スプライトを作成
        sprite.bitmap.drawText(string[i], 0, 0, w, h, 'center'); // 文字を描画
        sprite.x = (i - (string.length - 1) / 2) * w; // X座標を計算
        sprite.dy = -i; // Y座標のオフセット
      }
    }

    /**
     * フォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    fontSize() {
      return damagePopMainFontSize;
    }

    /**
     * フォントの種類を取得する。
     *
     * @returns {string} フォントファミリー
     */
    fontFace() {
      return fontFile ? $gameSystem.damagePopFontFace() : $gameSystem.numberFontFace();
    }

    /**
     * ダメージポップアップの色を取得する。
     *
     * @returns {string} ダメージの色
     */
    damageColor = function () {
      return ColorManager.damageColor(this._colorType);
    };

    /**
     * 通常サイズのスプライトを作成する。
     *
     * @param {number} width - スプライトの幅
     * @param {number} height - スプライトの高さ
     * @returns {Sprite} 作成したスプライト
     */
    createChildSpriteNormalSize(width, height) {
      const sprite = new Sprite();
      sprite.bitmap = this.createBitmap(width, height);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.y = -this.fontSize(); // Y座標をフォントサイズに合わせて設定
      sprite.ry = sprite.y;
      this.addChild(sprite);
      return sprite;
    }

    /**
     * 小さいサイズのスプライトを作成する。
     *
     * @param {number} width - スプライトの幅
     * @param {number} height - スプライトの高さ
     * @returns {Sprite} 作成したスプライト
     */
    createChildSpriteSmallSize(width, height) {
      const sprite = new Sprite();
      sprite.bitmap = this.createBitmap(width, height);
      sprite.bitmap.fontSize = damagePopSubFontSize; // フォントサイズを小さくする
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.y = -this.fontSize();
      sprite.ry = sprite.y;
      this.addChild(sprite);
      return sprite;
    }

    /**
     * 弱点攻撃エフェクトを設定する。
     */
    setupWeakEffect() {
      this._flashColor = [255, 128, 0, 160]; // 弱点エフェクトの色
      this._flashDuration = durationOfDamagePop; // フラッシュの持続時間
    }

    /**
     * 耐性攻撃エフェクトを設定する。
     */
    setupResistEffect() {
      this._flashColor = [0, 255, 255, 160]; // 耐性エフェクトの色
      this._flashDuration = durationOfDamagePop;
    }

    /**
     * 回避エフェクトを設定する。
     */
    setupEvadeEffect() {
      this._flashColor = [0, 255, 255, 160]; // 回避エフェクトの色
      this._flashDuration = durationOfDamagePop;
    }

    /**
     * クリティカル攻撃エフェクトを設定する。
     */
    setupCriticalEffect() {
      this._flashColor = [255, 255, 0, 160]; // クリティカルエフェクトの色
      this._flashDuration = durationOfDamagePop;
    }

    /**
     * 通常サイズのフリーテキストポップアップを作成する。
     *
     * @param {string} text - 表示するテキスト
     * @param {boolean} [offset=false] - Y軸のオフセットを有効にするか
     */
    createFreePopupNormalSize(text, offset = false) {
      const h = 100;
      const w = Math.floor(h * 6.0);
      const sprite = this.createChildSpriteNormalSize(w, h);
      const offsetHeight = this.fontSize() / 2;
      const y = offset ? -offsetHeight : 0;
      sprite.bitmap.drawText(text, 0, y, w, h, 'center');
      sprite.dy = 0;
    }

    /**
     * 小さいサイズのフリーテキストポップアップを作成する。
     *
     * @param {string} text - 表示するテキスト
     * @param {boolean} [offset=false] - Y軸のオフセットを有効にするか
     */
    createFreePopupSmallSize(text, offset = false) {
      const h = 100;
      const w = Math.floor(h * 6.0);
      const sprite = this.createChildSpriteSmallSize(w, h);
      const offsetHeight = this.fontSize() / 2;
      const y = offset ? -offsetHeight : 0;
      sprite.bitmap.drawText(text, 0, y, w, h, 'center');
      sprite.dy = 0;
    }

    /**
     * ダメージポップアップの透明度を更新する。
     */
    updateOpacity() {
      if (this._duration < 40) {
        this.opacity = (255 * this._duration) / 40;
        this.scale.y = (1.0 * this._duration) / 40;
      }
    }

    /**
     * 各子スプライトの位置と状態を更新する。
     *
     * @param {Sprite} sprite - 更新するスプライト
     */
    updateChild(sprite) {
      sprite.dy += 0.2;
      sprite.ry += sprite.dy;
      if (sprite.ry >= 0) {
        sprite.ry = 0;
        sprite.dy *= -0.6;
      }
      sprite.y = Math.round(sprite.ry) * $gameScreen.zoomScale();
      sprite.setBlendColor(this._flashColor);
    }
  }

  // ---------------------------------------------------------------------
  // Game_Screen の拡張
  // ---------------------------------------------------------------------
  Game_Screen.prototype.startFlashForCritical = function () {
    this.startFlash([255, 255, 0, 160], 60);
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
      return $gameSystem.mainFontFace();
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
      return $gameSystem.damagePopFontFace();
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
        if (showEnemyName) {
          // 敵の名前をウィンドウ中央に配置
          this.placeEnemyName(this._enemy, this.width / 2, 0);
        }

        const nameHeight = 24;

        if (showEnemyGauge) {
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
      const sx = Graphics.boxWidth;
      const sy = 20;
      const dx = Graphics.boxWidth - width;
      const dy = sy;
      const rect = new Rectangle(sx, sy, width, height);
      super(rect);

      this._sx = sx;
      this._sy = sy;
      this._dx = dx;
      this._dy = dy;
      this._hx = dx + width / 4;
      this._hy = dy;
      this._oldCount = 0;
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
      this._comboText.bitmap.fontFace = $gameSystem.damagePopFontFace(); // 使用するフォントを設定
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
      this._oldCount = $gameSystem.comboCount(); // 現在のコンボ数を保存
      this._updateCount = 240; // 240フレーム後にリセット
      this.forceTweenMoveTo({ x: this._dx, y: this._dy, count: 20 });
      this._comboText.bitmap.clear(); // 表示内容をクリア

      const x = 0;
      const y = 0;
      const w = 200;
      const h = 100;

      // --- コンボ数の表示（HIT数） ---
      this._comboText.bitmap.fontSize = 36; // フォントサイズを設定
      this._comboText.bitmap.textColor = '#FFFFFF'; // 文字色を白に設定
      this._comboText.bitmap.outlineColor = '#000000'; // アウトラインを黒に設定
      this._comboText.bitmap.outlineWidth = 6; // アウトラインの幅を設定
      this._comboText.bitmap.drawText($gameSystem.comboCount(), x, y, 150, h, 'right'); // コンボ数を表示

      // "Hits"テキストの表示
      this._comboText.bitmap.fontSize = 18;
      this._comboText.bitmap.textColor = '#FFD700'; // ゴールド色で表示
      this._comboText.bitmap.outlineColor = '#000000';
      this._comboText.bitmap.outlineWidth = 4;
      const hitText = $gameSystem.comboCount() < 2 ? 'Hit' : 'Hits';
      this._comboText.bitmap.drawText(` ${hitText}`, x + 150, y + 10, w, h, 'left'); // "Hits"を表示

      // --- ダメージの表示 ---
      this._comboText.bitmap.fontSize = 36;
      this._comboText.bitmap.textColor = '#FFFFFF';
      this._comboText.bitmap.outlineColor = '#000000';
      this._comboText.bitmap.outlineWidth = 6;
      this._comboText.bitmap.drawText($gameSystem.comboDamage(), x, y + 50, 150, h, 'right'); // ダメージ表示

      // "Damage"テキストの表示
      this._comboText.bitmap.fontSize = 18;
      this._comboText.bitmap.textColor = '#FFD700';
      this._comboText.bitmap.outlineColor = '#000000';
      this._comboText.bitmap.outlineWidth = 4;
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
      return this._oldCount !== $gameSystem.comboCount(); // コンボ数が変わった場合に更新
    }
  }

  // ----------------------------------------------------------------------------
  // スキル表示するための処理
  // ----------------------------------------------------------------------------

  const bubbleWidth = 200;
  const bubbleHeight = 30;

  /**
   * スキル名やターゲット名を表示するチャットバブルを生成する。
   * Sprite_Battler クラスに追加するメソッド。
   */
  Sprite_Battler.prototype.createChatBubble = function () {
    if (!this._chatBubbleSprite) {
      this._chatBubbleSprite = new Sprite();
      this._chatBubbleSprite.bitmap = new Bitmap(bubbleWidth, bubbleHeight); // チャットバブル用のビットマップ
      this._chatBubbleSprite.bitmap.fontSize = 18; // フォントサイズを設定
      this._chatBubbleSprite.anchor.x = 0;
      this._chatBubbleSprite.anchor.y = 0;
      this._chatBubbleSprite.x = this.x + -bubbleWidth / 2; // バトラーの頭の上に表示
      this._chatBubbleSprite.y = this.y - bubbleHeight - this.height; // バトラーの頭上に位置設定
      SceneManager._scene._spriteset.addChild(this._chatBubbleSprite); // シーンに追加
    }
  };

  /**
   * チャットバブルに表示するテキストとアクション情報を設定する。
   *
   * @param {string} text - チャットバブルに表示するテキスト
   * @param {Game_Action} action - 実行するアクション（スキルや攻撃）
   */
  Sprite_Battler.prototype.setChatBubbleText = function (text, action) {
    this.createChatBubble(); // チャットバブルを作成（未作成の場合）
    this._chatBubbleSprite.bitmap.clear(); // 前のテキストをクリア

    // フキダシのサイズと位置設定
    const width = bubbleWidth;
    const height = bubbleHeight;
    const x = 0;
    const y = 0;

    // ビットマップのコンテキストを取得してカスタム描画
    const ctx = this._chatBubbleSprite.bitmap.context;
    drawHexBackground({ ctx, x, y, width, height }); // 六角形の背景を描画

    /**
     * 使用者の種別やアクションに応じたテキスト色を返す関数。
     *
     * @param {Game_Battler} battler - スキルや攻撃を行うバトラー
     * @param {Game_Action} action - 実行されるアクション
     * @returns {string} テキストカラー
     */
    const getTextColor = (battler, action) => {
      if (battler.isEnemy()) {
        return ColorManager.textColor(skillDisplayFontColorByEnemy); // 敵キャラクターの場合の色
      }
      if (action.isAttack()) {
        return ColorManager.textColor(skillDisplayFontColorForAttack); // 通常攻撃の場合の色
      }
      if (action.isForFriend()) {
        return ColorManager.textColor(skillDisplayFontColorForFriend); // 味方に使用する場合の色
      }
      return ColorManager.textColor(skillDisplayFontColorForEnemy); // その他の場合の色
    };

    // テキストの描画設定
    this._chatBubbleSprite.bitmap.fontSize = skillDisplayFontSize;
    this._chatBubbleSprite.bitmap.fontBold = true;
    this._chatBubbleSprite.bitmap.textColor = getTextColor(this._battler, action); // テキストの色を設定
    this._chatBubbleSprite.bitmap.outlineColor = '#000000'; // アウトライン色
    this._chatBubbleSprite.bitmap.outlineWidth = 3; // アウトラインの太さ
    this._chatBubbleSprite.bitmap.drawText(text, x + 5, y, width - 5, height, 'center'); // テキストを描画

    // ビットマップの更新を手動で実行
    this._chatBubbleSprite.bitmap._baseTexture.update(); // ビットマップを更新
  };

  /**
   * チャットバブルをクリアして非表示にする。
   */
  Sprite_Battler.prototype.clearChatBubble = function () {
    if (this._chatBubbleSprite) {
      this._chatBubbleSprite.bitmap.clear(); // チャットバブルの内容をクリア
    }
  };

  // ---------------------------------------------------------------------
  // Scene_Battle の拡張
  // ---------------------------------------------------------------------
  /**
   * バトルログウィンドウの矩形（位置とサイズ）を定義。
   *
   * @returns {Rectangle} バトルログウィンドウの矩形
   */
  Scene_Battle.prototype.logWindowRect = function () {
    const wx = 0;
    const wy = 0;
    const ww = (Graphics.width / 3) * 2;
    const wh = 120;
    return new Rectangle(wx, wy, ww, wh);
  };

  // 元の update メソッドをフックしてカスタム処理を追加
  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    this.updateEnemyStatusWindows(); // 敵ステータスウィンドウの更新
    this.updateQueue(); // アニメーションキューの更新
  };

  // アニメーションとダメージフラッシュのためのキュー
  const animationsQueue = [];
  const flashActionsQueue = [];

  /**
   * アニメーションやアクションのキューを処理し、バトル中に適用。
   */
  Scene_Battle.prototype.updateQueue = function () {
    // アニメーションキューを処理
    const animations = animationsQueue.shift();
    if (animations) {
      for (const animation of animations) {
        const { targets, animationId, mirror } = animation;
        $gameTemp.requestAnimation(targets, animationId, mirror);
      }
    }

    // フラッシュアクションキューを処理
    const flashActions = flashActionsQueue.shift();
    const logWindow = BattleManager._logWindow;

    if (flashActions) {
      for (const flashAction of flashActions) {
        if (flashAction) {
          const { action, subject, target } = flashAction;
          const alreadyDead = target.isDead();
          action.apply(target); // ダメージ適用
          const damageRate = action.calcDamageRate(target);
          logWindow.displayActionResults(subject, target); // アクション結果を表示

          // ターゲットと使用者にダメージポップアップを表示
          target.pushDamagePop({ ...target._result, damageRate });
          target.clearResult();
          if (target !== subject) {
            subject.pushDamagePop({ ...subject._result });
            subject.clearResult();
          }
        }
      }
    }
  };

  /**
   * すべてのウィンドウを作成する。
   * 敵ステータスウィンドウの作成も追加。
   */
  const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_createAllWindows.call(this);
    this._enemyStatusWindows = []; // 敵ステータスウィンドウ用の配列
  };

  /**
   * バトル開始時の処理をフックして、敵ステータスウィンドウとコンボウィンドウを作成。
   */
  const _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function () {
    _Scene_Battle_start.call(this);
    this.createEnemyStatusWindows(); // 敵ステータスウィンドウの作成
    this.createComboWindow(); // コンボウィンドウの作成
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
   * コンボウィンドウを作成する。
   */
  Scene_Battle.prototype.createComboWindow = function () {
    this._comboWindow = new Window_Combo();
    this.addWindow(this._comboWindow);
  };

  /**
   * 敵ステータスウィンドウの更新処理。
   * ウィンドウの透明度や位置を調整する。
   */
  Scene_Battle.prototype.updateEnemyStatusWindows = function () {
    const { uiMarginX, uiMarginY } = getMarginOfUIArea();
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
              const x = -uiMarginX + sprite.x - window.width / 2;
              const y = -uiMarginY + sprite.y - window.height - sprite.height;
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
  // Game_Action の拡張
  // ---------------------------------------------------------------------
  /**
   * 対象に対するダメージレートを計算する。
   *
   * @param {Game_Battler} target - ダメージを受ける対象
   * @returns {number} ダメージレート（属性効果を考慮）
   */
  Game_Action.prototype.calcDamageRate = function (target) {
    const damageRate = this.calcElementRate(target); // 属性効果を考慮したダメージレートを計算
    return damageRate;
  };

  /**
   * フラッシュタイミングに基づいてアニメーションとダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - ダメージを与える主体
   * @param {Game_Battler} target - ダメージを受ける対象
   * @param {number} animationId - 再生するアニメーションのID
   * @param {number} [delay=0] - アニメーションの遅延フレーム数（オプション）
   */
  Game_Action.prototype.scheduleDamageWithAnimation = function (
    subject,
    target,
    animationId,
    delay = 0
  ) {
    /**
     * キューにエントリを追加するヘルパー関数。
     *
     * @param {Object} params - キューとエントリ情報
     * @param {Array} params.queue - スケジュールされるアクションのキュー
     * @param {number} params.frame - 実行されるフレーム
     * @param {Object} params.entry - キューに追加されるエントリ（アクションやアニメーション情報）
     */
    const pushEntryToQueue = ({ queue, frame, entry }) => {
      if (queue[frame]) {
        queue[frame].push(entry);
      } else {
        queue[frame] = [entry];
      }
    };

    const animation = $dataAnimations[animationId]; // アニメーションデータを取得

    // アニメーションが存在しない場合
    if (!animation) {
      const frame = 1 + delay;
      pushEntryToQueue({
        queue: flashActionsQueue, // フラッシュアクションキューにエントリを追加
        frame,
        entry: { action: JsonEx.makeDeepCopy(this), subject, target }, // アクションをディープコピー
      });
      return;
    }

    const flashTimings = animation.flashTimings; // フラッシュタイミングを取得
    if (flashTimings.length === 0) {
      const frame = 1 + delay;
      pushEntryToQueue({
        queue: flashActionsQueue, // フラッシュタイミングがない場合でもアクションを適用
        frame,
        entry: { action: JsonEx.makeDeepCopy(this), subject, target },
      });
      return;
    }

    // アニメーションの表示をスケジュール
    pushEntryToQueue({
      queue: animationsQueue, // アニメーションキューにエントリを追加
      frame: delay, // 遅延フレーム数
      entry: { targets: [target], animationId, mirror: true },
    });

    // フラッシュタイミングに基づいてダメージをスケジュール
    flashTimings.forEach((flashTiming) => {
      const frame = flashTiming.frame + delay;
      pushEntryToQueue({
        queue: flashActionsQueue, // フラッシュアクションキューにエントリを追加
        frame,
        entry: { action: JsonEx.makeDeepCopy(this), subject, target },
      });
    });
  };

  // ---------------------------------------------------------------------
  // BattleManager の拡張
  // ---------------------------------------------------------------------

  /**
   * 対象のアクションに基づいて使用するアニメーションIDを取得する。
   *
   * @param {Game_Battler} subject - アクションを行うキャラクター
   * @param {Game_Action} action - 実行するアクション
   * @param {number} [attackAnimationId=1] - 通常攻撃のアニメーションID（1または2）
   * @returns {number} アニメーションID
   */
  const getAnimationId = (subject, action, attackAnimationId = 1) => {
    const NORMAL_ATTACK_ANIMATION = -1;
    const NO_ANIMATION = 0;

    const gameItem = action._item;
    const itemId = gameItem.itemId();
    const dataItem = gameItem.isSkill() ? $dataSkills[itemId] : $dataItems[itemId];

    // アニメーションが設定されていない場合
    if (dataItem.animationId === NO_ANIMATION) {
      return NO_ANIMATION;
    }

    // 通常攻撃アニメーションを使用する場合
    if (dataItem.animationId === NORMAL_ATTACK_ANIMATION) {
      if (subject.isActor()) {
        if (attackAnimationId === 1) {
          return subject.attackAnimationId1();
        }
        if (attackAnimationId === 2) {
          return subject.attackAnimationId2();
        }
      }
      return NO_ANIMATION;
    }

    // データに基づくアニメーションIDを返す
    return dataItem.animationId;
  };

  /**
   * アクションの更新を行い、全てのターゲットに対してアクションを適用する。
   * すべてのターゲットにアクションが適用されたらアクションを終了する。
   */
  BattleManager.updateAction = function () {
    if (this._targets.length > 0) {
      for (const target of this._targets) {
        this.invokeAction(this._subject, target);
      }
      this._targets = [];
      return;
    }
    this.endAction();
  };

  /**
   * 通常攻撃のアクションを実行し、アニメーションやダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - アクションを行うキャラクター
   * @param {Game_Battler} target - アクションの対象キャラクター
   */
  BattleManager.invokeNormalAction = function (subject, target) {
    const realTarget = this.applySubstitute(target);

    // 二刀流のアニメーションとダメージスケジュール
    if (subject.isActor() && this._action.isAttack() && subject.attackAnimationId2()) {
      const weapon1Subject = JsonEx.makeDeepCopy(subject);
      weapon1Subject.forceChangeEquip(1, subject.equips()[1]);
      const animationId1 = getAnimationId(weapon1Subject, this._action, 1);
      this._action.scheduleDamageWithAnimation(weapon1Subject, realTarget, animationId1);

      const weapon2Subject = JsonEx.makeDeepCopy(subject);
      weapon2Subject.forceChangeEquip(0, subject.equips()[0]);
      const animationId2 = getAnimationId(weapon2Subject, this._action, 2);
      subject.performAction(this._action);
      const delay = 20;
      this._action.scheduleDamageWithAnimation(weapon2Subject, realTarget, animationId2, delay);
      return;
    }

    const animationId = getAnimationId(subject, this._action);
    this._action.scheduleDamageWithAnimation(subject, realTarget, animationId);
  };

  /**
   * カウンター攻撃を実行し、アニメーションやダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - 攻撃を受けたキャラクター
   * @param {Game_Battler} target - カウンター攻撃を行うキャラクター
   */
  BattleManager.invokeCounterAttack = function (subject, target) {
    const action = new Game_Action(target);
    action.setAttack();
    target.pushDamagePop('COUNTER!');
    target._movementDuration = 20;

    this._logWindow.push('performEvasion', target);
    this._logWindow.push('waitForMovement');
    this._logWindow.push('performAction', target, action);

    const animationId = getAnimationId(target, action);
    const delay = this._movementDuration;
    action.scheduleDamageWithAnimation(target, subject, animationId, delay);

    this._logWindow.displayCounter(target);
    this._logWindow.displayActionResults(target, subject);
  };

  /**
   * 魔法反射を実行し、アニメーションやダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - 攻撃を行ったキャラクター
   * @param {Game_Battler} target - 魔法を反射するキャラクター
   */
  BattleManager.invokeMagicReflection = function (subject, target) {
    this._action._reflectionTarget = target;
    this._logWindow.displayReflection(target);
    target.pushDamagePop('REFLECT!');

    $gameTemp.requestAnimation([target], reflectAnimation, false);

    const animationId = getAnimationId(subject, this._action);
    const delay = 50;
    this._action.scheduleDamageWithAnimation(target, subject, animationId, delay);
    this._logWindow.displayActionResults(target, subject);
  };

  // フォントの読み込み処理をオーバーライド
  const _Scene_Boot_prototype_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
  /**
   * ゲームフォントの読み込みを行う関数
   * プラグインで指定したフォントファイルがある場合、それも読み込みます。
   */
  Scene_Boot.prototype.loadGameFonts = function () {
    _Scene_Boot_prototype_loadGameFonts.call(this);
    if (fontFile) {
      FontManager.load('rmmz-damagePopFont', fontFile);
    }
  };

  /**
   * 使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.damagePopFontFace = function () {
    return 'rmmz-damagePopFont, ' + $dataSystem.advanced.fallbackFonts;
  };
})();
