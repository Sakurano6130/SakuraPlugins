/*:
 * @target MZ
 * @plugindesc フリーコマンドバトル（仮）
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * フリーコマンドバトル（仮）
 *
 * -------------------------------------------------
 * Sakura_FreeCommandBattle
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/10/21 0.0.2 setPlayerTurn, setEnemyTurn時に強制的に行動終了するように
 *                  "PlayerTurn", "EnemyTurn"の表示を廃止
 *                  キャラクター選択は外部プラグインで行うため、このプラグインからは機能削除
 * 2024/10/20 0.0.1 作成
 * -------------------------------------------------
 */

(() => {
  // --------------------------------------------------------------------
  // 定数
  // --------------------------------------------------------------------
  // アクター側行動時のTPBチャージタイムコスト
  const TPB_CHARGE_TIME_COST_ACTOR = 0;
  // エネミー側行動時のTPBチャージタイムコスト
  const TPB_CHARGE_TIME_COST_ENEMY = 0.5;

  // --------------------------------------------------------------------
  // BattleManager
  // --------------------------------------------------------------------
  /**
   * BattleManagerのメンバー変数を初期化します。
   * プレイヤーターンからバトルを開始し、敵の行動カウントをリセットします。
   */
  const _BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function () {
    _BattleManager_initMembers.call(this);

    // プレイヤーターンから開始
    this._turn = 'player'; // 現在のターンをプレイヤーのターンに設定
  };

  /**
   * プレイヤーターンを設定します。
   * 「Player Turn」の表示を行った後、プレイヤーターンに切り替えます。
   */
  BattleManager.setPlayerTurn = function () {
    // エネミーの行動を強制終了
    for (enemy of $gameTroop.members()) {
      enemy.clearTpbChargeTime();
      enemy.removeCurrentAction();
    }

    // 行動可能なアクターをフィルタリング（死亡しておらず、行動制限を受けていないエネミー）
    const movableActors = $gameParty
      .battleMembers()
      .filter((enemy) => !enemy.isDead() && !enemy.isRestricted());

    // 行動可能なアクターのTPB（時間バトルゲージ）を満タンにして行動を開始
    for (const actor of movableActors) {
      actor._tpbChargeTime = 0.99999; // TPBゲージをほぼ満タンにする
    }

    this._turn = 'player'; // プレイヤーターンを設定

    // ターンのカウントアップ
    this.endTurn();
  };

  /**
   * 現在のターンがプレイヤーターンであるかどうかを判定します。
   * @returns {boolean} プレイヤーターンであれば true を返します。
   */
  BattleManager.isPlayerTurn = function () {
    return this._turn === 'player';
  };

  /**
   * エネミーターンを開始します。
   * @method
   */
  BattleManager.setEnemyTurn = function () {
    // アクターの行動を強制終了
    for (actor of $gameParty.battleMembers()) {
      actor.clearTpbChargeTime();
      actor.removeCurrentAction();
    }

    // 行動可能なエネミーをフィルタリング（死亡しておらず、行動制限を受けていないエネミー）
    const movableEnemies = $gameTroop
      .members()
      .filter((enemy) => !enemy.isDead() && !enemy.isRestricted());

    // 行動可能なエネミーのTPB（時間バトルゲージ）を満タンにして行動を開始
    for (const enemy of movableEnemies) {
      enemy._tpbChargeTime = 0.99999; // TPBゲージをほぼ満タンにする
    }

    this._turn = 'enemy'; // ターンをエネミーに設定
  };

  /**
   * 現在がエネミーターンかどうかを判定します。
   * @returns {boolean} - 現在のターンがエネミーターンである場合はtrueを返します。
   */
  BattleManager.isEnemyTurn = function () {
    return this._turn === 'enemy';
  };

  /**
   * TPB (Time Progress Battle) の更新を行います。
   * プレイヤーのターンと敵のターンに応じて、それぞれのバトル進行を更新します。
   */
  BattleManager.updateTpb = function () {
    // プレイヤーターンの場合、プレイヤー側の TPB を更新する
    if (this.isPlayerTurn()) {
      $gameParty.updateTpb(); // パーティメンバーの TPB の進行を更新
    }

    // エネミーターンの場合、敵側の TPB を更新する
    if (this.isEnemyTurn()) {
      $gameTroop.updateTpb(); // 敵グループの TPB の進行を更新
    }

    // 全てのバトラーの TPB を更新する（プレイヤーと敵両方）
    this.updateAllTpbBattlers();

    // TPB ターンの終了チェックを行う
    this.checkTpbTurnEnd();
  };

  /**
   * バトルの開始処理を拡張し、プレイヤーのターンを設定します。
   * @override
   * @method startBattle
   */
  const _BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function () {
    _BattleManager_startBattle.call(this);
    this.setPlayerTurn(); // プレイヤーターンの開始を設定
  };

  /**
   * バトラーの行動終了時の処理を行います。オーバーライド！
   * アクターとエネミーのTPB（タイムプログレスバトル）時間をそれぞれ異なる処理で扱います。
   * @param {Game_Battler} battler - 行動を終了するバトラー
   */
  BattleManager.endBattlerActions = function (battler) {
    battler.setActionState(this.isTpb() ? 'undecided' : 'done');
    battler.onAllActionsEnd();

    // const skill = this._action._item;
    // console.log({ skill });
    /**
     * @remarks
     * スキルなどでTPBチャージタイムのコストを個別設定する処理を入れたい場合はここに入れる
     */
    if (battler.isActor()) {
      battler.costTpbChargeTime(TPB_CHARGE_TIME_COST_ACTOR);
    } else {
      battler.costTpbChargeTime(TPB_CHARGE_TIME_COST_ENEMY);
    }

    this.displayBattlerStatus(battler, true);
  };

  // --------------------------------------------------------------------
  // Game_Battler
  // --------------------------------------------------------------------
  /**
   * TPB（タイムプログレスバトル）チャージ時間にコストを適用して減少させます。
   * TPBの状態を "charging" に設定し、指定されたコスト分チャージ時間を減少させます。
   *
   * @param {number} cost - 減少させるチャージ時間のコスト
   */
  Game_Battler.prototype.costTpbChargeTime = function (cost) {
    this._tpbState = 'charging'; // TPB状態を "charging" に設定
    this._tpbChargeTime -= cost; // チャージ時間から指定コストを減少
  };
})();
