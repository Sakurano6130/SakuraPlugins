/*:
 * @target MZ
 * @plugindesc 🎵 指定したシーンで好きなBGM再生
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * 指定したシーンで任意のBGMを再生します
 *
 * -------------------------------------------------
 * Sakura_PlayBgmInScene
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/10/16 1.0.0 公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_PlayBgmInScene/Sakura_PlayBgmInScene.md
 *
 * @param bgmSettings
 * @text BGM設定
 * @desc BGM設定です
 * @type struct<AudioFile>[]
 * @default
 *
 */

/*~struct~AudioFile:
 * @param sceneName
 * @text シーン名
 * @desc シーン名を選択します。（Scene_Map,Scene_Title,Scene_Battleは無効。選択肢以外の場合は、テキストから直接入力してください）
 * @type select
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Shop
 * @option Scene_Load
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_GameEnd
 * @option Scene_Gameover
 *
 * @param audioName
 * @text 再生するBGM
 * @desc 再生するBGMです
 * @type file
 * @dir audio/bgm
 * @default
 *
 * @param volume
 * @text ﾎﾞﾘｭｰﾑ
 * @desc ﾎﾞﾘｭｰﾑです
 * @type select
 * @default 80
 * @option 0
 * @option 5
 * @option 10
 * @option 15
 * @option 20
 * @option 25
 * @option 30
 * @option 35
 * @option 40
 * @option 45
 * @option 50
 * @option 55
 * @option 60
 * @option 65
 * @option 70
 * @option 75
 * @option 80
 * @option 85
 * @option 90
 * @option 95
 * @option 100
 *
 * @param pitch
 * @text ﾋﾟｯﾁ
 * @desc ﾋﾟｯﾁです
 * @type select
 * @default 100
 * @option 50
 * @option 60
 * @option 70
 * @option 80
 * @option 90
 * @option 100
 * @option 110
 * @option 120
 * @option 130
 * @option 140
 * @option 150
 *
 * @param pan
 * @text 位相
 * @desc 位相です
 * @type select
 * @default 0
 * @option -100
 * @option -80
 * @option -60
 * @option -40
 * @option -20
 * @option 0
 * @option 20
 * @option 40
 * @option 60
 * @option 80
 * @option 100
 *
 * @param alwaysStartFromBeginning
 * @text 常に最初から再生するか
 * @desc シーンが切り替わった時に常に最初から再生するかどうかです
 * @type boolean
 * @default false
 */

(() => {
  const pluginName = 'Sakura_PlayBgmInScene';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const bgmSettingsRaw = JSON.parse(String(parameters['bgmSettings'] || '[]'));
  const bgmSettings = bgmSettingsRaw.map((bgmSettingRawString) => {
    const bgmSettingRaw = JSON.parse(bgmSettingRawString);
    return {
      sceneName: bgmSettingRaw.sceneName ?? '',
      audioName: bgmSettingRaw.audioName ?? '',
      volume: Number(bgmSettingRaw.volume ?? 80),
      pitch: Number(bgmSettingRaw.pitch ?? 100),
      pan: Number(bgmSettingRaw.pan ?? 0),
      alwaysStartFromBeginning: bgmSettingRaw.alwaysStartFromBeginning === 'true',
    };
  });

  // ---------------------------------------------------------------------
  // 共通関数
  // ---------------------------------------------------------------------
  /**
   * 特殊処理を行うシーン名
   */
  const SPECIFIC_SCENE_NAMES = ['Scene_Map', 'Scene_Title', 'Scene_Battle'];

  /**
   * 現在のシーン名を取得する関数。
   *
   * @returns {string} 現在のシーンのクラス名。
   */
  const getCurrentSceneName = () => SceneManager._scene.constructor.name;

  /**
   * シーン名に基づいて、指定されたシーンでのBGM設定を取得します。
   * マップ、タイトル、バトルシーンの場合は `null` を返します。
   *
   * @param {string} sceneName - 現在のシーン名
   * @returns {Object|null} - 対応するBGM設定オブジェクトまたは `null`
   */
  const getAudioSetting = (sceneName) => {
    // マップ、タイトル、バトルシーンの場合はBGM設定を適用しない
    if (SPECIFIC_SCENE_NAMES.includes(sceneName)) return null;

    // シーン名に基づいてBGM設定を検索し、該当するものを返す
    return bgmSettings.find((bgmSetting) => bgmSetting.sceneName === sceneName);
  };

  // ---------------------------------------------------------------------
  // Game_System
  // ---------------------------------------------------------------------
  /**
   * ゲームシステムの初期化処理を行います。
   * 特定のシーン用のBGMリストを保存するためのオブジェクト `_savedBgmList` を初期化します。
   */
  const _Game_System_prototype_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_prototype_initialize.call(this); // 元の初期化処理を呼び出す
    this._savedBgmList = {}; // 特定シーン用のBGMリストを保存するオブジェクトを初期化
  };

  /**
   * 特定のシーンで現在のBGMを保存します。
   * シーン名をキーにして、BGMを `_savedBgmList` に保存します。
   *
   * @param {string} sceneName - 保存するシーンの名前
   */
  Game_System.prototype.saveBgmAtScene = function (sceneName) {
    if (!this._savedBgmList) this._savedBgmList = {}; // BGMリストが存在しない場合は初期化
    this._savedBgmList[sceneName] = AudioManager.saveBgm(); // シーン名をキーにBGMを保存
  };

  /**
   * 特定のシーンでBGMが保存されているかを確認します。
   *
   * @param {string} sceneName - 確認するシーンの名前
   * @returns {boolean} - 指定されたシーンでBGMが保存されていればtrue、そうでなければfalse
   */
  Game_System.prototype.isBgmSavedAtScene = function (sceneName) {
    if (!this._savedBgmList) this._savedBgmList = {}; // BGMリストが存在しない場合は初期化
    return !!this._savedBgmList[sceneName]; // 指定されたシーンにBGMが保存されているかをチェック
  };

  /**
   * 指定されたシーンで保存されているBGMを取得します。
   *
   * @param {string} sceneName - BGMを取得するシーンの名前
   * @returns {object} - 保存されたBGMデータ。保存されていない場合はundefinedを返す。
   */
  Game_System.prototype.getBgmAtScene = function (sceneName) {
    return this._savedBgmList[sceneName]; // 指定されたシーンのBGMを取得
  };

  /**
   * セーブデータがロードされた後の処理を拡張します。
   * ロード後は、BGMを最初から再生する必要があるため、フラグをリセットします。
   * @override
   */
  const _Game_System_prototype_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    // 元のセーブデータロード後の処理を実行
    _Game_System_prototype_onAfterLoad.call(this);

    // セーブデータがロードされた直後であることを示すフラグを追加し、BGMを最初から再生する設定にする
    this._firstTimeChangeBgmAfterLoaded = false;
  };

  // ---------------------------------------------------------------------
  // SceneManager
  // ---------------------------------------------------------------------
  /**
   * シーン遷移時に現在のシーンのBGMを保存します。
   *
   * @param {function} sceneClass - 遷移先のシーンクラス
   */
  const _SceneManager_goto = SceneManager.goto;
  SceneManager.goto = function (sceneClass) {
    if (sceneClass) {
      if ($gameSystem) {
        // 現在のシーンのBGMを保存
        $gameSystem.saveBgmAtScene(getCurrentSceneName());
      }
    }
    _SceneManager_goto.call(this, sceneClass);
  };

  // ---------------------------------------------------------------------
  // Scene_Base
  // ---------------------------------------------------------------------
  /**
   * シーンの開始時にBGMを設定する処理。
   * 特定のシーンに設定されたBGMがある場合は再生し、保存されたBGMがあれば再生します。
   */
  const _Scene_Base_prototype_start = Scene_Base.prototype.start;
  Scene_Base.prototype.start = function () {
    _Scene_Base_prototype_start.call(this);

    // 現在のシーンのBGM設定を取得
    const audioSetting = getAudioSetting(getCurrentSceneName());

    if (audioSetting) {
      const { sceneName, audioName, volume, pitch, pan, alwaysStartFromBeginning } = audioSetting;

      // 常に最初から再生する設定の場合は、最初からBGMを再生
      if (alwaysStartFromBeginning) {
        AudioManager.playBgm({ name: audioName, volume, pitch, pan });
        return;
      }

      // シーンのBGMが保存されている場合は再生
      if ($gameSystem?.isBgmSavedAtScene(sceneName)) {
        AudioManager.replayBgm($gameSystem._savedBgmList[sceneName]);
        return;
      }

      // 保存されていない場合は最初からBGMを再生
      AudioManager.playBgm({ name: audioName, volume, pitch, pan });
      return;
    }

    // マップシーン名の場合は、保存しておいたBGMを再生
    const currentSceneName = getCurrentSceneName();
    if (['Scene_Map'].includes(currentSceneName)) {
      if ($gameSystem?.isBgmSavedAtScene(currentSceneName)) {
        const currentBgm = $gameSystem.getBgmAtScene(currentSceneName);

        if ($gameSystem._firstTimeChangeBgmAfterLoaded) {
          // ロード後の初回のBGM再生は最初から再生する
          AudioManager.replayBgm(currentBgm);
        } else {
          // それ以外は途中から再生する
          AudioManager.playBgm(currentBgm);
          $gameSystem._firstTimeChangeBgmAfterLoaded = false;
        }
      }
    }
  };

  /**
   * シーンがポップされる際に、現在のシーンのBGMを保存する処理。
   * 特定のシーンに設定されたBGMがあれば、そのBGMを保存します。
   */
  const _Scene_Base_prototype_popScene = Scene_Base.prototype.popScene;
  Scene_Base.prototype.popScene = function () {
    // 現在のシーンのBGM設定を取得
    const audioSetting = getAudioSetting(getCurrentSceneName());

    if (audioSetting) {
      // 現在のシーンのBGMを保存
      $gameSystem.saveBgmAtScene(getCurrentSceneName());
    }

    // 元のポップシーン処理を実行
    _Scene_Base_prototype_popScene.call(this);
  };

  /**
   * ゲームオーバー時にBGMを再生する処理を拡張。
   * 特定のシーンにBGMが設定されている場合、そのBGMを再生します。
   */
  const _Scene_Gameover_prototype_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
  Scene_Gameover.prototype.playGameoverMusic = function () {
    // 元のゲームオーバーBGM再生処理を実行
    _Scene_Gameover_prototype_playGameoverMusic.call(this);

    // 現在のシーンのBGM設定を取得
    const audioSetting = getAudioSetting(getCurrentSceneName());

    // BGM設定がある場合、そのBGMを再生
    if (audioSetting) {
      const { audioName, volume, pitch, pan } = audioSetting;
      AudioManager.playBgm({ name: audioName, volume, pitch, pan });
    }
  };
})();
