/*:
 * @target MZ
 * @plugindesc フリーコマンドバトル（仮）
 * フリーコマンドバトル（仮）
 * -------------------------------------------------
 * 2024/10/20 0.0.1 作成
 * -------------------------------------------------
 */

(() => {
  // --------------------------------------------------------------------
  // 定数
  // --------------------------------------------------------------------
  const TEXT_TURN_END = 'ターン終了';
  const TEXT_PLAYER_TURN = 'Player Turn';
  const TEXT_ENEMY_TURN = 'Enemy Turn';

  // --------------------------------------------------------------------
  // Window_PartyCommand
  // --------------------------------------------------------------------
  /**
   * パーティコマンドに「ターン終了」コマンドを追加します。
   * @override
   */
  const _Window_PartyCommand_prototype_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
  Window_PartyCommand.prototype.makeCommandList = function () {
    // 元のパーティコマンドリストを生成するメソッドを呼び出し
    _Window_PartyCommand_prototype_makeCommandList.call(this);

    // 新しく「ターン終了」コマンドを追加
    this.addCommand(TEXT_TURN_END, 'playerTurnEnd');
  };

  // --------------------------------------------------------------------
  // Scene_Battle
  // --------------------------------------------------------------------
  /**
   * Scene_Battleにターン名スプライトを追加します。
   * プレイヤーターンとエネミーターンのスプライトを作成し、それぞれ画面に表示されるようにします。
   * @override
   */
  const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    // 親クラスのメソッドを呼び出し、既存のディスプレイオブジェクトを作成
    _Scene_Battle_createDisplayObjects.call(this);

    // プレイヤーターンのスプライトを作成
    this._playerTurnSprite = new Sprite_TurnName(TEXT_PLAYER_TURN);
    this.addChild(this._playerTurnSprite); // プレイヤーターンスプライトをシーンに追加

    // エネミーターンのスプライトを作成
    this._enemyTurnSprite = new Sprite_TurnName(TEXT_ENEMY_TURN);
    this.addChild(this._enemyTurnSprite); // エネミーターンスプライトをシーンに追加
  };

  /**
   * プレイヤーターンの表示を開始します。
   * スプライトの移動アニメーションを開始し、完了後にコールバックが呼ばれます。
   * @param {function} onEnd - アニメーションが終了したときに呼ばれるコールバック関数。
   */
  Scene_Battle.prototype.showPlayerTurn = function (onEnd) {
    // プレイヤーターンスプライトのアニメーションを開始
    this._playerTurnSprite.start(onEnd);
  };

  /**
   * 敵ターンの表示を開始します。
   * スプライトの移動アニメーションを開始し、完了後にコールバックが呼ばれます。
   * @param {function} onEnd - アニメーションが終了したときに呼ばれるコールバック関数。
   */
  Scene_Battle.prototype.showEnemyTurn = function (onEnd) {
    // 敵ターンスプライトのアニメーションを開始
    this._enemyTurnSprite.start(onEnd);
  };

  /**
   * パーティコマンドウィンドウを作成し、ターン終了ハンドラを追加します。
   * @override
   */
  Scene_Battle.prototype.createPartyCommandWindow = function () {
    const rect = this.partyCommandWindowRect();
    const commandWindow = new Window_PartyCommand(rect);

    // 標準のコマンドハンドラを設定
    commandWindow.setHandler('fight', this.commandFight.bind(this));
    commandWindow.setHandler('escape', this.commandEscape.bind(this));

    // パーティコマンドに「ターン終了」ハンドラを追加
    commandWindow.setHandler('playerTurnEnd', this.commandPlayerTurnEnd.bind(this));

    commandWindow.deselect();
    this.addWindow(commandWindow);
    this._partyCommandWindow = commandWindow;
  };

  /**
   * パーティコマンド「ターン終了」を選択した際のハンドラ。
   * 敵のターンに移行する処理を実行します。
   */
  Scene_Battle.prototype.commandPlayerTurnEnd = function () {
    // 敵のターンに移行するメソッドを呼び出す
    BattleManager.setEnemyTurn();
  };

  /**
   * バトルシーンでアクターコマンドウィンドウを作成し、PageUpおよびPageDownキーによるキャラクター切り替え機能を追加します。
   * @override
   */
  Scene_Battle.prototype.createActorCommandWindow = function () {
    const rect = this.actorCommandWindowRect(); // アクターコマンドウィンドウの矩形（領域）を取得
    const commandWindow = new Window_ActorCommand(rect); // アクターコマンドウィンドウを作成
    commandWindow.y = Graphics.boxHeight - commandWindow.height; // コマンドウィンドウのY座標を設定（画面下部に表示）

    // 各コマンドに対応するハンドラを設定
    commandWindow.setHandler('attack', this.commandAttack.bind(this)); // 攻撃コマンド
    commandWindow.setHandler('skill', this.commandSkill.bind(this)); // スキルコマンド
    commandWindow.setHandler('guard', this.commandGuard.bind(this)); // 防御コマンド
    commandWindow.setHandler('item', this.commandItem.bind(this)); // アイテムコマンド
    commandWindow.setHandler('cancel', this.commandCancel.bind(this)); // キャンセルコマンド
    // pagedown, pageupキーでキャラクターを切り替える機能を追加
    commandWindow.setHandler('pagedown', this.commandNextActor.bind(this)); // 次のアクターに切り替え
    commandWindow.setHandler('pageup', this.commandPrevActor.bind(this)); // 前のアクターに切り替え

    this.addWindow(commandWindow); // ウィンドウをシーンに追加
    this._actorCommandWindow = commandWindow; // 作成したコマンドウィンドウをシーンのプロパティに設定
  };

  // 最初と最後のアクターのときの挙動を調整
  /**
   * 現在のアクターから次のアクターに切り替えます。最後のアクターの場合は何もしません。
   * @method commandNextActor
   * @override
   */
  Scene_Battle.prototype.commandNextActor = function () {
    SoundManager.playCursor(); // カーソル移動音を再生
    const members = $gameParty.battleMembers().filter((actor) => actor.canInput()); // 行動可能なバトルメンバーを取得
    const actor = BattleManager._currentActor; // 現在のアクターを取得

    // 現在のアクターがバトルメンバーの何番目かを調べる
    const currentIndex = members.indexOf(actor);

    // 最後のアクターであれば処理を終了
    if (currentIndex === members.length - 1) return;

    // 次のアクターに切り替え（trueで進む、falseで戻る）
    BattleManager.changeCurrentActor(true);
  };

  // 最初と最後のアクターのときの挙動を調整
  /**
   * 現在のアクターから前のアクターに切り替えます。最初のアクターの場合は何もしません。
   * @method commandPrevActor
   * @override
   */
  Scene_Battle.prototype.commandPrevActor = function () {
    SoundManager.playCursor(); // カーソル移動音を再生
    const members = $gameParty.battleMembers().filter((actor) => actor.canInput()); // 行動可能なバトルメンバーを取得
    const actor = BattleManager._currentActor; // 現在のアクターを取得

    // 現在のアクターがバトルメンバーの何番目かを調べる
    const currentIndex = members.indexOf(actor);

    // 最初のアクターであれば処理を終了
    if (currentIndex === 0) return;

    // 前のアクターに切り替え（trueで進む、falseで戻る）
    BattleManager.changeCurrentActor(false);
  };

  /**
   * キャンセルボタンが押された際の挙動を修正し、パーティコマンドウィンドウに戻ります。
   * @method commandCancel
   * @override
   */
  Scene_Battle.prototype.commandCancel = function () {
    BattleManager.cancelActorInput(); // 現在のアクターの入力をキャンセル
    BattleManager.selectPreviousActor(); // 前回選択されていたアクターを選択
    BattleManager.changeCurrentActor(true); // アクターの切り替え（進む）
    BattleManager._currentActor = null; // 現在のアクターをクリア
    BattleManager.startActorInput(); // 新たなアクターの入力を開始
  };

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
    this._movableEnemiesCount = 0; // 動ける敵のカウントを初期化
    this._actedEnemiesCount = 0; // 行動済みの敵のカウントを初期化
  };

  /**
   * プレイヤーターンを設定します。
   * 「Player Turn」の表示を行った後、プレイヤーターンに切り替えます。
   */
  BattleManager.setPlayerTurn = function () {
    const onEnd = function () {
      this._turn = 'player'; // プレイヤーターンを設定
    }.bind(this);

    // 「Player Turn」表示を呼び出し、表示が終了したらターンを設定
    SceneManager._scene.showPlayerTurn(onEnd);
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
    // ターン終了後の処理を行うコールバック関数
    const onEnd = function () {
      this._turn = 'enemy'; // ターンをエネミーに設定

      // 行動可能なエネミーをフィルタリング（死亡しておらず、行動制限を受けていないエネミー）
      const movableEnemies = $gameTroop
        .members()
        .filter((enemy) => !enemy.isDead() && !enemy.isRestricted());

      this._movableEnemiesCount = movableEnemies.length; // 行動可能なエネミーの数を設定

      // 行動可能なエネミーのTPB（時間バトルゲージ）を満タンにして行動を開始
      for (const enemy of movableEnemies) {
        enemy._tpbChargeTime = 1; // TPBゲージを満タンにする
        enemy.onTpbCharged(); // エネミーのTPBゲージが満タンになった時の処理を実行
      }
    }.bind(this);

    // エネミーターンを画面に表示し、終了後に onEnd を実行
    SceneManager._scene.showEnemyTurn(onEnd);
  };

  /**
   * ターンの進行を更新します。
   * @param {number} timeActive - タイムアクティブの値
   */
  const _BattleManager_updateTurn = BattleManager.updateTurn;
  BattleManager.updateTurn = function (timeActive) {
    // 元の updateTurn メソッドを呼び出し
    _BattleManager_updateTurn.call(this, timeActive);

    // 現在がエネミーターンの場合
    if (this._turn === 'enemy') {
      // 行動可能なエネミー数と行動済みエネミー数が一致した場合
      if (this._movableEnemiesCount <= this._actedEnemiesCount) {
        // エネミーの行動カウントをリセット
        this._actedEnemiesCount = 0;
        // プレイヤーターンに切り替え
        this.setPlayerTurn();
      }
    }
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
   * プレイヤーが入力中かどうかを判定します。
   * プレイヤーターンの時のみコマンドを表示するため、条件を追加しています。
   * @method isInputting
   * @returns {boolean} - プレイヤーが入力中の場合はtrue、それ以外はfalseを返す。
   */
  BattleManager.isInputting = function () {
    // プレイヤーターンの時だけコマンド表示するため、条件を追加
    return this._inputting && this._turn === 'player';
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
   * バトラーの行動終了時の処理を行います。
   * アクターとエネミーのTPB（タイムプログレスバトル）時間をそれぞれ異なる処理で扱います。
   * @param {Game_Battler} battler - 行動を終了するバトラー
   */
  BattleManager.endBattlerActions = function (battler) {
    battler.setActionState(this.isTpb() ? 'undecided' : 'done'); // TPBなら未決定状態にする
    battler.onAllActionsEnd(); // バトラーのすべてのアクション終了を呼び出す

    if (battler.isActor()) {
      // プレイヤーのTPB時間はほとんど消費せずにすぐに次のターンが回るように設定
      battler.costTpbChargeTime(0.0001);
    } else {
      // 敵は一度行動したらTPB時間をリセットする
      battler.clearTpbChargeTime();
      if (BattleManager._actedEnemiesCount === undefined) BattleManager._actedEnemiesCount = 0;
      BattleManager._actedEnemiesCount += 1; // 行動した敵のカウントを増加
    }

    this.displayBattlerStatus(battler, true); // バトラーのステータスを表示
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

  /**
   * TPB（タイムプログレスバトル）チャージ時間を初期化します。
   * 状況に応じてチャージ時間の初期値を設定し、アクターや敵キャラが
   * すぐに行動できるようにほぼ満タンに設定します。
   *
   * @param {boolean} advantageous - プレイヤー側が有利かどうかのフラグ
   */
  Game_Battler.prototype.initTpbChargeTime = function (advantageous) {
    this._tpbState = 'charging'; // TPB状態を "charging" に設定
    // チャージ時間をほぼ満タンに設定
    this._tpbChargeTime = 0.99999;
    // 行動が制限されている場合はチャージを0に設定
    if (this.isRestricted()) {
      this._tpbChargeTime = 0;
    }
  };

  // --------------------------------------------------------------------
  // Sprite_TurnName
  // --------------------------------------------------------------------
  /**
   * Sprite_TurnName クラス
   * ターン名を表示するためのスプライトで、画面にテキストをアニメーション表示します。
   * テキストは画面の左から中央にスライドし、一定時間待機した後に右側にスライドして消えます。
   */
  class Sprite_TurnName extends Sprite {
    /**
     * ターン名スプライトを初期化します。
     * @param {string} text - 表示するテキスト
     */
    constructor(text) {
      super();
      this.initialize(text);
    }

    /**
     * 初期化処理
     * @param {string} text - 表示するテキスト
     */
    initialize(text) {
      super.initialize();
      const width = 400;
      const height = 100;
      const offsetY = -100;
      this.bitmap = new Bitmap(width, height); // テキスト表示用ビットマップを作成
      this.bitmap.fontSize = 48; // 文字サイズ
      this.bitmap.textColor = '#FFD700'; // 文字色
      this.bitmap.outlineColor = '#000000'; // アウトラインの色
      this.bitmap.outlineWidth = 10; // アウトラインの幅
      this.bitmap.drawText(text, 0, 0, width, height, 'center'); // テキストを描画
      this.anchor.x = 0.5; // スプライトのアンカー（中央揃え）
      this.anchor.y = 0.5;
      this.x = -width; // 初期位置を画面左外に設定
      this.y = Graphics.height / 2 + offsetY; // Y座標は画面の中央
      this._state = ''; // 状態管理用のフラグ
      this._frameCount = 0; // フレームカウントを初期化
      this._onEnd = () => {}; // 終了時のコールバック
    }

    /**
     * スプライトのアニメーションを開始します。
     * @param {Function} onEnd - アニメーション終了時に実行されるコールバック関数
     */
    start(onEnd) {
      this.x = -100;
      this.visible = true;
      this._state = 'moveIn'; // スプライトが移動する状態に設定
      this._onEnd = onEnd; // 終了時に実行されるコールバックを設定
    }

    /**
     * フレームごとの更新処理を行います。
     * 状態に応じてスプライトを移動させます。
     */
    update() {
      super.update();
      this._frameCount++; // フレームごとにカウントを増やす

      switch (this._state) {
        case 'moveIn':
          this.x += 20; // スプライトを右に移動
          if (this.x >= Graphics.width / 2) {
            this._state = 'wait'; // 中央に到達したら「待機」に変更
            this._frameCount = 0; // カウントをリセット
          }
          break;
        case 'wait':
          if (this._frameCount >= 60) {
            // 60フレーム（約1秒）待機
            this._state = 'moveOut'; // 「移動中」に変更
          }
          break;
        case 'moveOut':
          this.x += 20; // スプライトを右に移動
          if (this.x >= Graphics.width + 100) {
            this._state = 'done'; // 画面外に出たら終了状態に変更
            this._onEnd.call(); // 終了時のコールバックを呼び出す
          }
          break;
        case 'done':
          this.visible = false; // スプライトを非表示にする
          break;
      }
    }
  }
})();
