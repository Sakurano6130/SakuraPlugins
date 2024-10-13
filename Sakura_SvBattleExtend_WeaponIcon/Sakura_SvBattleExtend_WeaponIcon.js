/*:
 * @target MZ
 * @plugindesc 💥-⚔️ ｻｲﾄﾞﾋﾞｭｰﾊﾞﾄﾙいい感じのｻﾌﾞﾌﾟﾗｸﾞｲﾝ 武器ｱｲｺﾝ表示
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @base Sakura_SvBattleExtend
 * @orderAfter Sakura_SvBattleExtend
 * @help
 * ｻｲﾄﾞﾋﾞｭｰﾊﾞﾄﾙいい感じのｻﾌﾞﾌﾟﾗｸﾞｲﾝ 武器ｱｲｺﾝ表示です
 *
 * -------------------------------------------------
 * Sakura_SvBattleExtend_WeaponIcon
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/10/13 1.0.0 公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_SvBattleExtend_WeaponIcon/Sakura_SvBattleExtend_WeaponIcon.md
 *
 * @param weaponPositionSetting
 * @text 武器アイコン表示位置設定
 * @desc 武器アイコン表示位置設定
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-18","offsetY":"-10","angle":"0"}
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
  const pluginName = 'Sakura_SvBattleExtend_WeaponIcon';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);

  const rawSetting = JSON.parse(
    parameters['weaponPositionSetting'] || '{ offsetX: "-18", offsetY: "-10", angle: "0" }'
  );

  const weaponPositionSetting = {
    offsetX: Number(rawSetting.offsetX || 0),
    offsetY: Number(rawSetting.offsetY || 0),
    angle: Number(rawSetting.angle || 0),
  };

  // ---------------------------------------------------------------------
  // メモ欄定数
  // ---------------------------------------------------------------------
  const NOTE = {
    WEAPON_ICON_OFFSET_X: '武器アイコン攻撃時位置X',
    WEAPON_ICON_OFFSET_Y: '武器アイコン攻撃時位置Y',
    WEAPON_ICON_ANGLE: '武器アイコン攻撃時角度',
  };

  class Sprite_WeaponIcon extends Sprite {
    constructor() {
      super();
      this.initMembers();
    }

    initMembers() {
      this._iconSprite = null;
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
      this._swinging = false;
      this._swingCount = 0;
      this._swingingPrev = false;
      this._swingOffsetX = 0;
      this._swingOffsetY = 0;
      this._thrusting = false;
      this._thrustCount = 0;
      this._thrustingPrev = false;
      this._thrustOffsetX = 0;
      this._thrustOffsetY = 0;
    }

    setup(weaponId, iconIndex) {
      const dataWeapon = $dataWeapons[weaponId];
      this._swingOffsetX = Number(dataWeapon?.meta[NOTE.WEAPON_ICON_OFFSET_X] ?? 9);
      this._swingOffsetY = Number(dataWeapon?.meta[NOTE.WEAPON_ICON_OFFSET_Y] ?? 5);
      this._thrustOffsetX = Number(dataWeapon?.meta[NOTE.WEAPON_ICON_OFFSET_X] ?? 7);
      this._thrustOffsetY = Number(dataWeapon?.meta[NOTE.WEAPON_ICON_OFFSET_Y] ?? 3);
      this._thrustAngle = Number(dataWeapon?.meta[NOTE.WEAPON_ICON_ANGLE] ?? -40);
      const index = iconIndex;
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (index % 16) * pw;
      const sy = Math.floor(index / 16) * ph;

      // アイコンスプライトが既に存在している場合
      if (this._iconSprite) {
        this._iconSprite.setFrame(sx, sy, pw, ph);
        return;
      }

      // まだアイコンスプライトが作成されていない場合
      const bitmap = ImageManager.loadSystem('IconSet');
      const onLoad = () => {
        if (!this._iconSprite) {
          this._iconSprite = new Sprite(bitmap);
          this._iconSprite.anchor.x = 0.5;
          this._iconSprite.anchor.y = 1.0;
          this.addChild(this._iconSprite);
        }
        this._iconSprite.bitmap = bitmap;
        this._iconSprite.setFrame(sx, sy, pw, ph);
      };

      // アイコンセットの画像が読み込まれている場合にも対応
      if (bitmap.isReady()) {
        onLoad();
      } else {
        bitmap.addLoadListener(onLoad.bind(this));
      }
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
      this.updatePosition(); // 位置の更新
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

      if (this._swinging) {
        // 振りの処理
        if (!this._swingingPrev) {
          this._swingCount = 0;
        }
        this._swingingPrev = this._swinging;
        this.anchor.x = 0.75;
        this.anchor.y = 0.75;
        const startAngle = 45;
        this.x = this._baseX + this._swingOffsetX;
        this.y = this._baseY + this._swingOffsetY;
        if (this._swingCount < 9) {
          this._swingCount += 1;
        }
        this.rotation = ((startAngle - this._swingCount * 16) * Math.PI) / 180;
        return;
      }
      this._swingingPrev = this._swinging;

      if (this._thrusting) {
        // 突きの処理
        if (!this._thrustingPrev) {
          this._thrustCount = 0;
        }
        this._thrustingPrev = this._thrusting;
        this.anchor.x = 0.75;
        this.anchor.y = 0.75;
        const startAngle = this._thrustAngle;
        if (this._thrustCount < 9) {
          this._thrustCount += 1;
        }
        this.x = this._baseX + this._thrustOffsetX - this._thrustCount;
        this.y = this._baseY + this._thrustOffsetY;
        this.rotation = (startAngle * Math.PI) / 180;
        return;
      }
      this._thrustingPrev = this._thrusting;

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

  /**
   * 武器のスプライトを作成し、キャラクターに表示する。
   * 武器が変更された場合、新しいスプライトを作成して古いスプライトを破棄する。
   */
  Sprite_Actor.prototype.createWeaponSpriteIdle = function () {
    if (!this._battler) return;
    if (!this._battler.weapons()) return;

    const weapon1 = this._battler.weapons()[0]; // バトラーの武器を取得
    if (!this._weaponSpriteIdle || this._oldWeapon1 !== weapon1) {
      if (this._weaponSpriteIdle) {
        this.removeChild(this._weaponSpriteIdle); // 古いスプライトを削除
        this._weaponSpriteIdle.destroy(); // メモリの解放
      }

      const wtypeId = weapon1 ? weapon1.wtypeId : 0; // 武器タイプのIDを取得
      console.log({ weaponPositionSetting });
      const { offsetX, offsetY, angle } = weaponPositionSetting; // オフセットと角度の設定
      this._oldWeapon1 = weapon1; // 古い武器を更新

      this._weaponSpriteIdle = new Sprite_WeaponIcon(); // 新しい武器スプライトを作成
      this._weaponSpriteIdle.anchor.x = 0.5; // スプライトのアンカー位置を中心に設定
      this._weaponSpriteIdle.anchor.y = 0.5;

      this._weaponSpriteIdle.setup(weapon1.id, weapon1.iconIndex); // 武器画像をセットアップ

      // オフセットと回転角度を設定
      this._weaponSpriteIdle._baseX = offsetX;
      this._weaponSpriteIdle._baseY = offsetY;
      const angleInDegrees = angle || 0; // 傾けたい角度（デフォルトは0度）
      const angleInRadians = (angleInDegrees * Math.PI) / 180; // ラジアンに変換
      this._weaponSpriteIdle._baseRotation = angleInRadians;

      this.addChild(this._weaponSpriteIdle); // スプライトをシーンに追加
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
    const THRUST = 6;
    const SWING = 7;
    const SKILL = 9;
    const SPELL = 10;

    // 現在のモーションインデックスを取得
    const motionIndex = this._motion.index;

    // 特定のモーションでない場合、武器スプライトを非表示にする
    if (![WALK, CHANT, WAIT, SKILL, SPELL, GUARD, THRUST, SWING].includes(motionIndex)) {
      this._weaponSpriteIdle.visible = false;
      return;
    }

    // モーションに基づいて武器スプライトの状態を設定
    this._weaponSpriteIdle._waiting = [WAIT].includes(motionIndex); // 待機モーション
    this._weaponSpriteIdle._casting = [CHANT].includes(motionIndex); // 詠唱モーション
    this._weaponSpriteIdle._spelling = [SKILL, SPELL].includes(motionIndex); // スキル/スペルモーション
    this._weaponSpriteIdle._guarding = [GUARD].includes(motionIndex); // ガードモーション
    this._weaponSpriteIdle._thrusting = [THRUST].includes(motionIndex); // 突きモーション
    this._weaponSpriteIdle._swinging = [SWING].includes(motionIndex); // 振りモーション

    // 武器スプライトが再生中でない場合、スプライトを表示する
    this._weaponSpriteIdle.visible = !this._weaponSprite.isPlaying();
  };

  Sprite_Actor.prototype.setupWeaponAnimation = function () {
    // アイコンを表示するので何もしない
    // if (this._actor.isWeaponAnimationRequested()) {
    //   this._weaponSprite.setup(this._actor.weaponImageId());
    //   this._actor.clearWeaponAnimation();
    // }
  };
})();
