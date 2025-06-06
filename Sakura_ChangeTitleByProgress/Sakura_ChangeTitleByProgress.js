/*:
 * @target MZ
 * @plugindesc 🖼 進行度でタイトルを切り替え
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * ゲームの進行度に応じてタイトル画像とBGMを変えます
 *
 * -------------------------------------------------
 * Sakura_ChangeTitleByProgress
 * Copyright (c) 2025 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2025/01/09 1.1.0 全セーブ内の最大進行度を使用するか、最後にセーブした
 *                  ファイルの進行度を使用するか選択できる機能を追加
 * 2025/01/08 1.0.0 公開
 * -------------------------------------------------
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_ChangeTitleByProgress/Sakura_ChangeTitleByProgress.md
 *
 * 【使い方】
 * 1. プラグインパラメータ「進行度を保存する変数ID」に、
 *    進行度として扱いたい変数を指定してください。
 *
 * 2. プラグインパラメータ「タイトルリスト」で、
 *    進行度の値ごとに表示したいタイトル画像・BGMを設定してください。
 *
 * 3. プラグインパラメータ「比較対象」を指定してください。
 *    ・全セーブの最大進行度を使用 (highest)
 *    ・最後にセーブしたファイルの進行度を使用 (latest)
 *
 * -------------------------------------------------
 *
 * @param progressVariableID
 * @text 進行度を保存する変数ID
 * @desc 進行度を保存する変数IDです。
 * @type variable
 * @default 1
 *
 * @param titleImages
 * @text タイトルリスト
 * @desc 進行度の値ごとに設定するタイトル画像・BGM情報
 * @type struct<TitleImage>[]
 * @default []
 *
 * @param compareType
 * @text 進行度の比較対象
 * @desc 進行度を「全セーブの最大値」にするか「最後にセーブしたファイル」にするかを選択
 * @type select
 * @option 全セーブデータから最大を使用
 * @value highest
 * @option 最後にセーブしたファイルを使用
 * @value latest
 * @default highest
 */

/*~struct~TitleImage:
 * @param progressValue
 * @text 進行度
 * @desc この値とゲーム内の進行度が一致したとき、以下の画像とBGMを使用します。
 * @type number
 * @default 0
 *
 * @param imageName
 * @text タイトル画像
 * @desc タイトル画像です。(指定しなければ元の画像です)
 * @type file
 * @dir img/titles1
 * @default
 *
 * @param bgm
 * @text タイトルBGM
 * @desc タイトルBGMです。(指定しなければ元のBGMです)
 * @type struct<AudioParam>
 * @default
 */

/*~struct~AudioParam:
 * @param name
 * @text ファイル名
 * @desc 再生するオーディオのファイル名（拡張子不要）[audio/bgm/]
 * @type file
 * @dir audio/bgm
 * @default
 *
 * @param volume
 * @text 音量
 * @desc BGMの音量（0～100）
 * @type number
 * @default 90
 *
 * @param pitch
 * @text ピッチ
 * @desc BGMのピッチ（50～150）
 * @type number
 * @default 100
 *
 * @param pan
 * @text 位相
 * @desc BGMの位相（-100～100）
 * @type number
 * @default 0
 */

(() => {
  'use strict';

  const pluginName = 'Sakura_ChangeTitleByProgress';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const progressVariableID = Number(parameters['progressVariableID'] || 1);
  // 比較対象 ( "highest" or "latest" )
  const compareType = String(parameters['compareType'] || 'highest');

  /**
   * タイトル画面の差し替え情報（進行度ごとの画像＆BGM設定）の配列。
   * @typedef  {Object} TitleImageData
   * @property {number} progressValue - 進行度の値。
   * @property {string} imageName     - タイトル画像ファイル名（拡張子なし）。
   * @property {Object} [bgm]         - タイトルBGMの情報（AudioParam相当）。
   *
   * @type {TitleImageData[]}
   */
  const titleImages = (() => {
    // パラメータをJSONパース
    const titleImagesRaw = JSON.parse(parameters['titleImages'] || '[]');
    return titleImagesRaw.map((item) => {
      const data = JSON.parse(item);

      const imageName = data.imageName || '';
      let bgm = null;

      // BGM情報をパース
      if (data.bgm) {
        bgm = JSON.parse(data.bgm);
        bgm.volume = Number(bgm.volume || 90);
        bgm.pitch = Number(bgm.pitch || 100);
        bgm.pan = Number(bgm.pan || 0);
      }

      return {
        progressValue: Number(data.progressValue || 0),
        imageName: imageName,
        bgm: bgm,
      };
    });
  })();

  /**
   * セーブファイルに保存される基本情報オブジェクトを拡張し、
   * 進行度（progress）を追加して返す。
   *
   * @returns {Object} セーブファイル情報
   */
  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    // 元のセーブファイル情報を作成
    const info = _DataManager_makeSavefileInfo.call(this);

    // progressVariableIDの指定がない場合はそのまま info を返す
    if (!progressVariableID) {
      return info;
    }

    // ゲーム内変数 progressVariableID の値を「進行度」として保存する
    const progress = $gameVariables.value(progressVariableID) || 0;
    info.progress = progress;

    return info;
  };

  /**
   * グローバル情報(DataManager._globalInfo)から、
   * 全セーブファイルにおける最高進行度を計算して返す。
   *
   * @returns {number} 最高進行度（セーブファイルがない場合は0）
   */
  const calculateHighestProgress = () => {
    const globalInfo = DataManager._globalInfo;
    if (!globalInfo) return 0;

    let highestProgress = 0;
    for (let i = 1; i <= DataManager.maxSavefiles(); i++) {
      const info = globalInfo[i];
      if (info?.progress >= 0) {
        highestProgress = Math.max(highestProgress, info.progress);
      }
    }
    return highestProgress;
  };

  /**
   * 最後にセーブしたファイルの進行度を取得（latestSavefileIdを使用）
   *
   * @returns {number} 最高進行度（セーブファイルがない場合は0）
   */
  const calculateLatestProgress = () => {
    const globalInfo = DataManager._globalInfo;
    if (!globalInfo) return 0;

    // ここでDataManager.latestSavefileId()を呼び出し
    const lastSavedId = DataManager.latestSavefileId();
    if (!lastSavedId) return 0;

    const info = globalInfo[lastSavedId];
    return info?.progress || 0;
  };

  /**
   * 進行度を取得
   *
   * @returns {number} 最高進行度（セーブファイルがない場合は0）
   */
  const getProgressForTitle = () => {
    if (!progressVariableID) return 0;
    if (compareType === 'latest') {
      return calculateLatestProgress();
    } else {
      // デフォルトは highest
      return calculateHighestProgress();
    }
  };

  /**
   * タイトル画面の背景画像生成をオーバーライドし、
   * 最高進行度に合ったタイトル画像を表示する。
   * 一致しない場合はデフォルトの処理を実行。
   */
  const _Scene_Title_createBackground = Scene_Title.prototype.createBackground;
  Scene_Title.prototype.createBackground = function () {
    // progressVariableIDの指定がない場合はデフォルトの生成処理
    if (!progressVariableID) {
      _Scene_Title_createBackground.call(this);
      return;
    }

    // 進行度を取得
    const progress = getProgressForTitle();

    // 最高進行度と一致する設定を検索
    const matchedImage = titleImages.find((titleImage) => titleImage.progressValue === progress);

    if (matchedImage && matchedImage.imageName) {
      // タイトル画像を差し替え
      this._backSprite1 = new Sprite(ImageManager.loadTitle1(matchedImage.imageName));
      // タイトル2枚目は既定の画像を使用
      this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
      this.addChild(this._backSprite1);
      this.addChild(this._backSprite2);
    } else {
      // 一致するものがない場合はデフォルトの生成処理
      _Scene_Title_createBackground.call(this);
    }
  };

  /**
   * タイトル画面のBGM再生をオーバーライドし、
   * 最高進行度に合ったBGMを再生する。
   * 一致しない場合はデフォルトのBGM再生を実行。
   */
  const _Scene_Title_playTitleMusic = Scene_Title.prototype.playTitleMusic;
  Scene_Title.prototype.playTitleMusic = function () {
    // progressVariableIDの指定がない場合はデフォルトの処理
    if (!progressVariableID) {
      _Scene_Title_playTitleMusic.call(this);
      return;
    }

    // 進行度を取得
    const progress = getProgressForTitle();
    const matchedImage = titleImages.find((data) => data.progressValue === progress);

    if (matchedImage?.bgm?.name) {
      const { name, volume, pitch, pan } = matchedImage.bgm;
      // カスタムBGMを再生
      AudioManager.playBgm({ name, volume, pitch, pan });
      AudioManager.stopBgs();
      AudioManager.stopMe();
    } else {
      // 一致しない場合はデフォルトの処理
      _Scene_Title_playTitleMusic.call(this);
    }
  };
})();
