/*:
 * @target MZ
 * @plugindesc スイッチオンで次の目的表示
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * スイッチオンで次の目的を表示します。
 *
 * -------------------------------------------------
 * Sakura_DestinationBySwitchOn
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/12/17 2.1.6 ブラウザ版で ReferenceError: require is not defined のエラーが出ないように修正
 * 2024/11/25 2.1.5 アーカイブシーンでピクチャを指定したときだけに小目的が表示されていたため、表示されないように修正
 * 2024/11/23 2.1.4 サブ目的のスイッチオンオフ時にサブ目的表示がリフレッシュされるように修正
 * 2024/11/06 2.1.3 アーカイブシーンのコマンドウィンドウの位置調整機能を追加
 * 2024/11/06 2.1.2 アーカイブシーンのコマンドウィンドウ背景を黒表示から通常のウィンドウに変更
 *                  アーカイブシーンのコマンドウィンドウが達成済みでも選択できてしまったため修正
 * 2024/11/06 2.1.1 アーカイブシーンのコマンドウィンドウ背景が透過しないように変更
 *                  アーカイブシーンのコマンドウィンドウの「やめる」がキャンセルできていなかったため修正
 * 2024/10/13 2.1.0 ストーリーが進んだ時に音を鳴らせるように
 * 2024/09/17 2.0.0 子目的表示の追加
 *                  アーカイブシーンの追加
 * 2024/09/09 1.0.3 ツクールのシステム設定で、画面の幅・高さとUIエリアの幅・高さが
 *                  異なる設定をしている場合の位置を調整。
 * 2024/09/04 1.0.2 ファイル出力判定ミス修正
 * 2024/09/03 1.0.1 初期表示時に後ろのｳｨﾝﾄﾞｳを隠さないように修正
 * 2024/09/03 1.0.0 公開
 * 2024/09/03 0.5.0 だいたい形に
 * 2024/09/02 0.0.1 作成
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_DestinationBySwitchOn/Sakura_DestinationBySwitchOn.md
 *
 * @command HideDestinationText
 * @text 🙈ﾏｯﾌﾟ上の目的ｳｨﾝﾄﾞｳを隠す
 * @desc 表示されている目的ｳｨﾝﾄﾞｳを隠します。
 *
 * @command ShowDestinationText
 * @text 👀ﾏｯﾌﾟ上の目的ｳｨﾝﾄﾞｳを表示する
 * @desc 隠していた目的ｳｨﾝﾄﾞｳを表示します。
 *
 * @command setDestinationCompleted
 * @text 🏆目的を達成状態にする
 * @desc 目的を達成状態にし、アーカイブシーンで「目的の優先表示」を選択できないようにします。
 * @arg switchId
 * @text スイッチ
 * @desc 達成状態にするスイッチを指定してください。
 * @type switch
 * @default
 *
 * @command takeSnapshot
 * @text 🖼️ｽｸﾘｰﾝｼｮｯﾄを撮る
 * @desc 現在のｽｸﾘｰﾝｼｮｯﾄを取って目的ｽｲｯﾁと紐づけます。注!ｾｰﾌﾞﾃﾞｰﾀに画像を保存しますので容量が大きくなります
 * @arg switchId
 * @text スイッチ
 * @desc 紐づけるスイッチを指定してください。
 * @type switch
 * @default
 * @arg width
 * @text ｽｸﾘｰﾝｼｮｯﾄの幅（画面中央中心）
 * @desc ｽｸﾘｰﾝｼｮｯﾄの幅（画面中央中心）
 * @type number
 * @default 400
 * @arg height
 * @text ｽｸﾘｰﾝｼｮｯﾄの高さ（画面中央中心）
 * @desc ｽｸﾘｰﾝｼｮｯﾄの高さ（画面中央中心）
 * @type number
 * @default 200
 * @arg quality
 * @text ｽｸﾘｰﾝｼｮｯﾄの圧縮率
 * @desc ｽｸﾘｰﾝｼｮｯﾄの圧縮率（0～1の間で指定。0.7は70%の品質）
 * @type number
 * @decimals 1
 * @default 0.7
 *
 * @command registerArchiveEntry
 * @text 📝ｱｰｶｲﾌﾞ登録
 * @desc ｱｰｶｲﾌﾞ登録します。ｹﾞｰﾑ開始時に自動で読取るので実行は不要です。
 *
 * @arg archiveCategory
 * @text 🗂️カテゴリ
 * @desc ｱｰｶｲﾌﾞのｶﾃｺﾞﾘです。このｶﾃｺﾞﾘごとに折りたたまれます。
 * @type string
 * @default
 *
 * @arg archiveTitle
 * @text 🏷️タイトル
 * @desc ｱｰｶｲﾌﾞのﾀｲﾄﾙです。
 * @type string
 * @default
 *
 * @arg switchId
 * @text 🔛スイッチ
 * @desc 紐づけるスイッチです。オンの時のみ表示されます。指定しない場合は常に表示されます。$付でないものも指定できます。
 * @type switch
 * @default 0
 *
 * @arg picture
 * @text 🖼️ピクチャ
 * @desc 背景に使用するピクチャ画像。
 * @type file
 * @dir img/pictures
 * @default
 *
 * @arg detail
 * @text 📑詳細
 * @desc 詳細の文章です。幅に合わせて自動的に改行され、縦に長い場合はスクロールします。
 * @type multiline_string
 * @default
 * 
 * @command callSceneArchive
 * @text 📞ｱｰｶｲﾌﾞｼｰﾝの呼び出し
 * @desc ｱｰｶｲﾌﾞｼｰﾝを呼び出します。
 * @arg title
 * @text タイトル
 * @desc タイトルを指定してください。ｱｰｶｲﾌﾞｼｰﾝの左上に大きく出るタイトルになります。指定しなければ表示されません。
 * @type string
 * @default
 * @arg targetCategories
 * @text 対象のｶﾃｺﾞﾘ
 * @desc 対象のｶﾃｺﾞﾘを指定してください。（前方一致検索します。複数指定可。未指定の場合はすべて対象になります）
 * @type string[]
 * @default []

 *
 * @param groupMapDisplay
 * @text 📍 ﾏｯﾌﾟ上の目的表示の設定 ---
 *
 * @param destinationPosition
 * @parent groupMapDisplay
 * @text 目的ｳｨﾝﾄﾞｳの位置
 * @desc 目的ｳｨﾝﾄﾞｳを表示する位置（左上、右上、左下、右下から選択）
 * @type select
 * @option 左上
 * @value topLeft
 * @option 右上
 * @value topRight
 * @option 左下
 * @value bottomLeft
 * @option 右下
 * @value bottomRight
 * @default topLeft
 *
 * @param destinationTextX
 * @parent groupMapDisplay
 * @text 目的ｳｨﾝﾄﾞｳX座標
 * @desc 目的ｳｨﾝﾄﾞｳの表示位置（X座標）
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param destinationTextY
 * @parent groupMapDisplay
 * @text 目的ｳｨﾝﾄﾞｳY座標
 * @desc 目的ｳｨﾝﾄﾞｳの表示位置（Y座標）
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param destinationFontSize
 * @parent groupMapDisplay
 * @text 目的のﾌｫﾝﾄｻｲｽﾞ
 * @desc 目的のﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 10
 * @max 40
 * @default 16
 *
 * @param destinationFontColor
 * @parent groupMapDisplay
 * @text 目的のﾌｫﾝﾄ色
 * @desc 目的のﾌｫﾝﾄ色
 * @type color
 * @default 0
 *
 * @param destinationFontColorIfHasChildren
 * @parent groupMapDisplay
 * @text 目的のﾌｫﾝﾄ色(子目的がある場合)
 * @desc 目的のﾌｫﾝﾄ色(子目的がある場合)
 * @type color
 * @default 6
 *
 * @param categoryFontSize
 * @parent groupMapDisplay
 * @text 目的の上に出るｶﾃｺﾞﾘのﾌｫﾝﾄｻｲｽﾞ
 * @desc 目的の上に出るｶﾃｺﾞﾘのﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 10
 * @max 40
 * @default 14
 *
 * @param categoryFontColor
 * @parent groupMapDisplay
 * @text 目的の上に出るｶﾃｺﾞﾘのﾌｫﾝﾄ色
 * @desc 目的の上に出るｶﾃｺﾞﾘのﾌｫﾝﾄ色
 * @type color
 * @default 16
 *
 * @param childrenFontSize
 * @parent groupMapDisplay
 * @text 子目的のﾌｫﾝﾄｻｲｽﾞ
 * @desc 子目的のﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 10
 * @max 40
 * @default 16
 *
 * @param childrenFontColor
 * @parent groupMapDisplay
 * @text 子目的のﾌｫﾝﾄ色
 * @desc 子目的のﾌｫﾝﾄ色
 * @type color
 * @default 0
 *
 * @param childrenFontColorIfCompleted
 * @parent groupMapDisplay
 * @text 子目的のﾌｫﾝﾄ色(達成している場合)
 * @desc 子目的のﾌｫﾝﾄ色(達成している場合)
 * @type color
 * @default 24
 *
 * @param storyProgressText
 * @parent groupMapDisplay
 * @text ｽﾄｰﾘｰが進行したときに表示するﾃｷｽﾄ
 * @desc ｽﾄｰﾘｰが進行したときに表示するﾃｷｽﾄです。何も指定しないと、この表示はされなくなります。
 * @type string
 * @default 💡ストーリーがすすんだ
 *
 * @param storyProgressTextColor
 * @parent groupMapDisplay
 * @text ｽﾄｰﾘｰが進行したときに表示するﾃｷｽﾄの色
 * @desc ｽﾄｰﾘｰが進行したときに表示するﾃｷｽﾄの色です。
 * @type color
 * @default 0
 *
 * @param storyProgressTextDuration
 * @parent groupMapDisplay
 * @text ｽﾄｰﾘｰが進行したときに表示するﾃｷｽﾄの時間
 * @desc ｽﾄｰﾘｰが進行したときに表示するﾃｷｽﾄの時間です。
 * @type number
 * @min 0
 * @max 9999
 * @default 120
 *
 * @param storyProgressAudio
 * @parent groupMapDisplay
 * @text ｽﾄｰﾘｰが進行したときに鳴らす音
 * @desc ｽﾄｰﾘｰが進行したときに鳴らす音です。
 * @type struct<AudioFile>
 * @default {"audioName":"Item3","volume":"80","pitch":"100","pan":"0"}
 *
 * @param groupSceneArchive
 * @text ⚙️ ｱｰｶｲﾌﾞｼｰﾝの設定 ---
 *
 * @param paddingInSceneArchive
 * @parent groupSceneArchive
 * @text シーン全体の画面との余白
 * @desc シーン全体の画面との余白
 * @type number
 * @min 0
 * @max 9999
 * @default 0
 *
 * @param listWindowWidthRate
 * @parent groupSceneArchive
 * @text 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳ幅の画面に対する大きさ（％）
 * @desc 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳ幅の画面に対する大きさ（％）
 * @type number
 * @min 0
 * @max 100
 * @default 35
 *
 * @param listWindowItemHeight
 * @parent groupSceneArchive
 * @text 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳの１行の高さ
 * @desc 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳの１行の高さ
 * @type number
 * @min 20
 * @max 100
 * @default 72
 *
 * @param listWindowFontSize
 * @parent groupSceneArchive
 * @text 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳのﾌｫﾝﾄｻｲｽﾞ
 * @desc 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳのﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 10
 * @max 40
 * @default 20
 *
 * @param detailWindowTitleFontSize
 * @parent groupSceneArchive
 * @text 右側の詳細ｳｨﾝﾄﾞｳのﾀｲﾄﾙのﾌｫﾝﾄｻｲｽﾞ
 * @desc 右側の詳細ｳｨﾝﾄﾞｳのﾀｲﾄﾙのﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 10
 * @max 40
 * @default 26
 *
 * @param detailWindowDescFontSize
 * @parent groupSceneArchive
 * @text 右側の詳細ｳｨﾝﾄﾞｳの詳細のﾌｫﾝﾄｻｲｽﾞ
 * @desc 右側の詳細ｳｨﾝﾄﾞｳの詳細のﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 10
 * @max 40
 * @default 20
 *
 * @param detailWindowPadding
 * @parent groupSceneArchive
 * @text 右側の詳細ｳｨﾝﾄﾞｳの内側の余白
 * @desc 右側の詳細ｳｨﾝﾄﾞｳの内側の余白
 * @type number
 * @min 0
 * @max 40
 * @default 24
 *
 * @param detailWindowPictureWidth
 * @parent groupSceneArchive
 * @text 右側の詳細ｳｨﾝﾄﾞｳのピクチャの幅
 * @desc 右側の詳細ｳｨﾝﾄﾞｳのピクチャの幅
 * @type number
 * @min 0
 * @max 9999
 * @default 300
 *
 * @param detailWindowPictureHeight
 * @parent groupSceneArchive
 * @text 右側の詳細ｳｨﾝﾄﾞｳのピクチャの高さ
 * @desc 右側の詳細ｳｨﾝﾄﾞｳのピクチャの高さ
 * @type number
 * @min 0
 * @max 9999
 * @default 300
 *
 * @param detailWindowMaxContentsHeight
 * @parent groupSceneArchive
 * @text 右側の詳細ｳｨﾝﾄﾞｳの文章の最大高さ(px)
 * @desc 右側の詳細ｳｨﾝﾄﾞｳの文章の最大高さ(px)（高くするほど長い文章を表示できますが重くなります）
 * @type number
 * @min 0
 * @max 50000
 * @default 10000
 *
 * @param commandWindowTextSetPriority
 * @parent groupSceneArchive
 * @text 「この目的を優先表示する」の言葉
 * @desc 「この目的を優先表示する」の言葉を変更します
 * @type string
 * @default この目的を優先表示する
 *
 * @param commandWindowTextAlreadyCompleted
 * @parent groupSceneArchive
 * @text 「この目的は達成済みです」の言葉
 * @desc 「この目的は達成済みです」の言葉を変更します
 * @type string
 * @default この目的は達成済みです
 *
 * @param commandWindowOffsetX
 * @parent groupSceneArchive
 * @text 達成済ｳｨﾝﾄﾞｳのX軸位置調整
 * @desc 達成済ｳｨﾝﾄﾞｳのX軸位置調整です
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param commandWindowOffsetY
 * @parent groupSceneArchive
 * @text 達成済ｳｨﾝﾄﾞｳのY軸位置調整
 * @desc 達成済ｳｨﾝﾄﾞｳのY軸位置調整です
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param groupAddDestinationToMenuCommand
 * @text ➕ ﾒﾆｭｰｺﾏﾝﾄﾞへの追加 ---
 *
 * @param commandsOfSceneArchive
 * @parent groupAddDestinationToMenuCommand
 * @text ﾒﾆｭｰｺﾏﾝﾄﾞ設定
 * @desc ﾒﾆｭｰｺﾏﾝﾄﾞを設定します
 * @type struct<CommandAddArchiveEntry>[]
 * @default []
 *
 * @param groupDebug
 * @text 🛠️ デバッグ ---
 *
 * @param needsOutputDestinations
 * @parent groupDebug
 * @text 目的を書き出すかどうか
 * @desc これをtrueにして、テストプレイを実行するとプロジェクトフォルダ直下に「destinationsBySwitch.txt」というファイルが出力されます
 * @type boolean
 * @default false
 *
 */

/*~struct~CommandAddArchiveEntry:
 * @param commandName
 * @text コマンド名
 * @desc メニューに表示されるコマンド名です。例）ストーリー、人物紹介、チュートリアル
 * @type string
 * @default ストーリー
 *
 * @param categories
 * @text 表示するｶﾃｺﾞﾘ
 * @desc 表示するｶﾃｺﾞﾘを指定できます。複数指定できます。指定しない場合は全ｶﾃｺﾞﾘが表示されます。
 * @type string[]
 * @default []
 *
 * @param enableSwitchId
 * @text 有効/無効を制御するスイッチID
 * @desc 有効/無効を制御するスイッチIDを指定できます。指定しない場合は有効になります。
 * @type switch
 * @default
 *
 */

/*~struct~AudioFile:
 * @param audioName
 * @text 再生するSE
 * @desc 再生するSEです
 * @type file
 * @dir audio/se
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
 */

(() => {
  const pluginName = 'Sakura_DestinationBySwitchOn';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const destinationPosition = String(parameters['destinationPosition'] || 'topLeft');
  const destinationTextX = Number(parameters['destinationTextX'] || 40);
  const destinationTextY = Number(parameters['destinationTextY'] || 0);
  const destinationFontSize = Number(parameters['destinationFontSize'] || 16);
  const destinationFontColor = Number(parameters['destinationFontColor'] || 0);
  const destinationFontColorIfHasChildren = Number(
    parameters['destinationFontColorIfHasChildren'] || 6
  );
  const categoryFontSize = Number(parameters['categoryFontSize'] || 14);
  const categoryFontColor = Number(parameters['categoryFontColor'] || 16);
  const childrenFontSize = Number(parameters['childrenFontSize'] || 16);
  const childrenFontColor = Number(parameters['childrenFontColor'] || 0);
  const childrenFontColorIfCompleted = Number(parameters['childrenFontColorIfCompleted'] || 24);
  const storyProgressText = String(parameters['storyProgressText'] || '');
  const storyProgressTextColor = Number(parameters['storyProgressTextColor'] || 0);
  const storyProgressTextDuration = Number(parameters['storyProgressTextDuration'] || 120);

  const storyProgressAudioRaw = JSON.parse(String(parameters['storyProgressAudio'] || '{}'));
  const storyProgressAudio = {
    audioName: storyProgressAudioRaw.audioName ?? '',
    volume: Number(storyProgressAudioRaw.volume ?? 80),
    pitch: Number(storyProgressAudioRaw.pitch ?? 100),
    pan: Number(storyProgressAudioRaw.pan ?? 0),
  };

  const paddingInSceneArchive = Number(parameters['paddingInSceneArchive'] || 10);
  const listWindowWidthRate = Number(parameters['listWindowWidthRate'] || 35);
  const listWindowItemHeight = Number(parameters['listWindowItemHeight'] || 72);
  const listWindowFontSize = Number(parameters['listWindowFontSize'] || 20);
  const detailWindowTitleFontSize = Number(parameters['detailWindowTitleFontSize'] || 26);
  const detailWindowDescFontSize = Number(parameters['detailWindowDescFontSize'] || 20);
  const detailWindowPadding = Number(parameters['detailWindowPadding'] || 24);
  const detailWindowPictureWidth = Number(parameters['detailWindowPictureWidth'] || 300);
  const detailWindowPictureHeight = Number(parameters['detailWindowPictureHeight'] || 300);
  const detailWindowMaxContentsHeight = Number(
    parameters['detailWindowMaxContentsHeight'] || 10000
  );

  const commandWindowTextSetPriority = String(
    parameters['commandWindowTextSetPriority'] || 'この目的を優先表示する'
  );
  const commandWindowTextAlreadyCompleted = String(
    parameters['commandWindowTextAlreadyCompleted'] || 'この目的は達成済みです'
  );
  const commandWindowOffsetX = Number(parameters['commandWindowOffsetX'] || 0);
  const commandWindowOffsetY = Number(parameters['commandWindowOffsetY'] || 0);

  const commandsOfSceneArchiveRaw = parameters['commandsOfSceneArchive'];

  const commandsOfSceneArchive = JSON.parse(commandsOfSceneArchiveRaw || '[]').map((command) => {
    const parsedCommand = JSON.parse(command);
    return {
      commandName: parsedCommand.commandName || 'ストーリー', // デフォルト値
      categories: JSON.parse(parsedCommand.categories || '[]'), // カテゴリは配列
      enableSwitchId: Number(parsedCommand.enableSwitchId) || 0, // スイッチIDは数値、未指定なら0（無効）
    };
  });

  const needsOutputDestinations = parameters['needsOutputDestinations'] === 'true';

  // ---------------------------------------------------------------------
  // 既存オブジェクトへのプロパティ追加 Game_Temp
  // ---------------------------------------------------------------------
  const _Game_Temp_prototype_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_prototype_initialize.call(this);
    this._sceneArchiveTitle = '';
    this._sceneArchiveTargetCategories = [];
  };

  // ---------------------------------------------------------------------
  // 既存オブジェクトへのプロパティ追加 Game_System
  // ---------------------------------------------------------------------
  const _Game_System_prototype_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_prototype_initialize.call(this);
    this._destinationSwitchId = null;
    this._destinationText = null;
    this._destinationVisible = null;
    this._snapShots = {};
    this._completedDestinationSwitchIds = [];
    this._seenDestinationSwitchIds = [];
  };

  // ---------------------------------------------------------------------
  // プラグインコマンドを登録
  // ---------------------------------------------------------------------
  PluginManager.registerCommand(pluginName, 'ShowDestinationText', () => {
    destinationManager.destinationVisible = true;
  });

  PluginManager.registerCommand(pluginName, 'HideDestinationText', () => {
    destinationManager.destinationVisible = false;
  });

  PluginManager.registerCommand(pluginName, 'setDestinationCompleted', (args) => {
    const switchId = Number(args['switchId'] || 0);
    destinationManager.setDestinationCompleted(switchId);
  });

  PluginManager.registerCommand(pluginName, 'takeSnapshot', (args) => {
    const switchId = Number(args['switchId'] || 0);
    const width = Number(args['width'] || 400);
    const height = Number(args['height'] || 200);
    const quality = Number(args['quality'] || 0.7);
    destinationManager.saveSnapshot(switchId, width, height, quality);
  });

  PluginManager.registerCommand(pluginName, 'callSceneArchive', (args) => {
    const title = args['title'] ?? '';
    $gameTemp._sceneArchiveTitle = title;

    const targetCategories = JSON.parse(args['targetCategories'] || '[]');
    if (!$gameTemp._sceneArchiveTargetCategories) {
      $gameTemp._sceneArchiveTargetCategories = [];
    }
    $gameTemp._sceneArchiveTargetCategories = targetCategories;
    SceneManager.push(Scene_Archive);
  });

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
   * 1文字目と2文字目以降を分割します。
   *
   * @param {string} str
   * @returns
   */
  const splitFirstCharacter = (str) => {
    if (str.length === 0) {
      return ['', '']; // 空文字列の場合は、空の配列を返す
    }

    const firstCharacter = str.charAt(0); // 1文字目を取得
    const restOfString = str.slice(1); // 2文字目以降を取得

    return [firstCharacter, restOfString];
  };

  const createDataDestinations = () => {
    const flatList = $dataCommonEvents
      .filter((event) => {
        if (!event) return false;
        return true;
      })
      .flatMap((event) => {
        const list = [];
        for (const { code, parameters } of event.list) {
          const CODE_PLUGIN_COMMAND = 357;
          if (code === CODE_PLUGIN_COMMAND) {
            const [
              pluginName,
              pluginCommand,
              _,
              { switchId, archiveCategory, archiveTitle, detail, picture },
            ] = parameters;
            if (pluginName === 'Sakura_DestinationBySwitchOn') {
              if (pluginCommand === 'registerArchiveEntry') {
                list.push({
                  categoryName: archiveCategory,
                  switchId: Number(switchId || 0),
                  archiveCategory: archiveCategory ?? '',
                  archiveTitle: archiveTitle ?? '',
                  detail: detail ?? '',
                  picture: picture ?? '',
                });
              }
            }
          }
        }
        return list;
      });
    window['$dataDestinations'] = flatList;
  };

  // ---------------------------------------------------------------------
  // Window_MenuCommandへScene_Destinationの追加
  // ---------------------------------------------------------------------
  const _Window_MenuCommand_prototype_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function () {
    _Window_MenuCommand_prototype_addOriginalCommands.call(this);
    for (const { categories, commandName, enableSwitchId } of commandsOfSceneArchive) {
      const enabled = enableSwitchId === 0 ? true : $gameSwitches.value(enableSwitchId);
      this.addCommand(commandName, 'archive', enabled, categories);
    }
    //
  };

  // ---------------------------------------------------------------------
  // Window_MenuCommand okが押されたとき、$gameTempにカテゴリを入れる
  // ---------------------------------------------------------------------
  const _Window_MenuCommand_prototype_processOk = Window_MenuCommand.prototype.processOk;
  Window_MenuCommand.prototype.processOk = function () {
    if (this.currentSymbol() === 'archive') {
      $gameTemp._sceneArchiveTitle = this.commandName(this.index());
      $gameTemp._sceneArchiveTargetCategories = this.currentExt();
    }
    _Window_MenuCommand_prototype_processOk.call(this);
  };

  // ---------------------------------------------------------------------
  // Scene_MenuにScene_Archiveへのハンドラを追加
  // ---------------------------------------------------------------------
  const _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function () {
    _Scene_Menu_prototype_createCommandWindow.call(this);
    this._commandWindow.setHandler('archive', () => {
      SceneManager.push(Scene_Archive);
    });
  };

  // ---------------------------------------------------------------------
  // データベースがロードされた後の処理を拡張
  // ---------------------------------------------------------------------
  const _Scene_Boot_prototype_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function () {
    _Scene_Boot_prototype_onDatabaseLoaded.call(this);
    createDataDestinations();
    if (!Utils.isOptionValid('test') || !needsOutputDestinations) return;
    // 親子スイッチ情報を出力する
    outputParentChildSwitchInfo();
  };

  // ---------------------------------------------------------------------
  // シーンマップの全ｳｨﾝﾄﾞｳ作成を拡張
  // ---------------------------------------------------------------------
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    this.createDestinationWindow();
  };

  // ---------------------------------------------------------------------
  // 目的地表示用ｳｨﾝﾄﾞｳを作成する
  // ---------------------------------------------------------------------
  Scene_Map.prototype.createDestinationWindow = function () {
    this._destinationWindow = new Window_DestinationOnMap();
    this.addWindow(this._destinationWindow);
  };

  // ---------------------------------------------------------------------
  // シーンマップのアップデートを拡張
  // ---------------------------------------------------------------------
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    this._destinationWindow.setSwitchId(destinationManager.switchId);
    if (destinationManager.needsInformDestinationChanged) {
      this._destinationWindow.setDestinationChanged();
      destinationManager.needsInformDestinationChanged = false;
    }
  };

  // ---------------------------------------------------------------------
  // スイッチの設定処理を拡張
  // ---------------------------------------------------------------------
  const _Game_Switches_setValue = Game_Switches.prototype.setValue;
  Game_Switches.prototype.setValue = function (switchId, value) {
    _Game_Switches_setValue.call(this, switchId, value);
    const switchName = $dataSystem.switches[switchId];
    if (switchName.startsWith('$') && value) {
      destinationManager.setActiveSwitchId(switchId, true);
    }
  };

  // ---------------------------------------------------------------------
  // Game_Map.refresh時に、Window_DestinationOnMapもrefreshする
  // ---------------------------------------------------------------------
  const _Game_Map_prototype_refresh = Game_Map.prototype.refresh;
  Game_Map.prototype.refresh = function () {
    _Game_Map_prototype_refresh.call(this);
    const scene = SceneManager._scene;
    if (scene?._destinationWindow) {
      scene._destinationWindow.refresh();
    }
  };

  // ---------------------------------------------------------------------
  // セーブデータ保存前の処理を拡張
  // ---------------------------------------------------------------------
  const _Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
  Game_System.prototype.onBeforeSave = function () {
    _Game_System_onBeforeSave.call(this);
    this._destinationSwitchId = destinationManager.switchId;
    this._destinationText = destinationManager.destinationText;
    this._destinationVisible = destinationManager.destinationVisible;
  };

  // ---------------------------------------------------------------------
  // セーブデータ読み込み後の処理を拡張
  // ---------------------------------------------------------------------
  const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    _Game_System_onAfterLoad.call(this);
    destinationManager.switchId = this._destinationSwitchId ?? 0;
    destinationManager.destinationText = this._destinationText ?? '';
    destinationManager.destinationVisible =
      this._destinationVisible !== undefined ? this._destinationVisible : true;
  };

  // ---------------------------------------------------------------------
  // 該当スイッチIDの目的を達成扱いにする
  // ---------------------------------------------------------------------
  Game_System.prototype.addCompletedDestinationSwitchId = function (switchId) {
    if (!this._completedDestinationSwitchIds) {
      this._completedDestinationSwitchIds = [];
    }

    if (this._completedDestinationSwitchIds.includes(switchId)) return;
    this._completedDestinationSwitchIds.push(switchId);
  };

  // ---------------------------------------------------------------------
  // 該当スイッチIDの目的を未達扱いにする
  // ---------------------------------------------------------------------
  Game_System.prototype.removeCompletedDestinationSwitchId = function (switchId) {
    if (!this._completedDestinationSwitchIds) {
      this._completedDestinationSwitchIds = [];
    }

    if (!this._completedDestinationSwitchIds.includes(switchId)) return;
    this._completedDestinationSwitchIds.remove(switchId);
  };

  // ---------------------------------------------------------------------
  // 該当スイッチIDの目的が達成状態かどうか
  // ---------------------------------------------------------------------
  Game_System.prototype.isDestinationSwitchIdCompleted = function (switchId) {
    if (!this._completedDestinationSwitchIds) {
      this._completedDestinationSwitchIds = [];
    }

    return this._completedDestinationSwitchIds.includes(switchId);
  };

  // ---------------------------------------------------------------------
  // 該当スイッチIDの目的を既読状態にする
  // ---------------------------------------------------------------------
  Game_System.prototype.addSeenDestinationSwitchId = function (switchId) {
    if (!this._seenDestinationSwitchIds) {
      this._seenDestinationSwitchIds = [];
    }

    if (this._seenDestinationSwitchIds.includes(switchId)) return;
    this._seenDestinationSwitchIds.push(switchId);
  };

  // ---------------------------------------------------------------------
  // 該当スイッチIDの目的が既読かどうか
  // ---------------------------------------------------------------------
  Game_System.prototype.hasDestinationSwitchIdSeen = function (switchId) {
    if (!this._seenDestinationSwitchIds) {
      this._seenDestinationSwitchIds = [];
    }

    return this._seenDestinationSwitchIds.includes(switchId);
  };

  // ---------------------------------------------------------------------
  // 該当スイッチIDの目的のｽｸﾘｰﾝｼｮｯﾄを撮る
  // ---------------------------------------------------------------------
  Game_System.prototype.saveSnapshot = function (switchId, dataUrl) {
    if (!this._snapShots) {
      this._snapShots = {};
    }
    this._snapShots[switchId] = dataUrl; // スクリーンショットをセット
  };

  // ---------------------------------------------------------------------
  // Window_Baseに拡張処理を追加
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // だんだん薄くなる背景を描画
  // ---------------------------------------------------------------------
  Window_Base.prototype.showGradientBackground = function () {
    if (!this._gradientSprite) {
      this.createGradientSprite();
    }
    const bitmap = this._gradientSprite.bitmap;
    if (bitmap.width !== this.width || bitmap.height !== this.height) {
      this.refreshGradientBitmap();
    }
    this._gradientSprite.visible = true;
    this.updateGradientBackground();
  };

  // ---------------------------------------------------------------------
  // だんだん薄くなる背景を作成
  // ---------------------------------------------------------------------
  Window_Base.prototype.createGradientSprite = function () {
    this._gradientSprite = new Sprite();
    this._gradientSprite.bitmap = new Bitmap(0, 0);
    this._gradientSprite.x = 0; // 背景を表示するX位置
    this._gradientSprite.y = 0; // 背景を表示するY位置
    this.addChildToBack(this._gradientSprite);
  };

  // ---------------------------------------------------------------------
  // 背景を隠す
  // ---------------------------------------------------------------------
  Window_Base.prototype.hideGradientBackground = function () {
    if (this._gradientSprite) {
      this._gradientSprite.visible = false;
    }
  };

  // ---------------------------------------------------------------------
  // 背景の透過状態更新
  // ---------------------------------------------------------------------
  Window_Base.prototype.updateGradientBackground = function () {
    if (this._gradientSprite) {
      this._gradientSprite.opacity = this.openness;
    }
  };

  // ---------------------------------------------------------------------
  // 背景のリフレッシュ
  // ---------------------------------------------------------------------
  Window_Base.prototype.refreshGradientBitmap = function () {
    if (this._gradientSprite) {
      const bitmap = this._gradientSprite.bitmap;
      const w = this.width; // ｳｨﾝﾄﾞｳの幅
      const h = this.height; // ｳｨﾝﾄﾞｳの高さ
      const c1 = ColorManager.dimColor1(); // グラデーション開始色
      const c2 = 'rgba(0, 0, 0, 0)'; // グラデーション終了色（透明）

      bitmap.resize(w, h);
      // 横方向のグラデーションを作成
      bitmap.gradientFillRect(0, 0, w, h, c1, c2, false);
      this._gradientSprite.setFrame(0, 0, w, h);
    }
  };

  // ---------------------------------------------------------------------
  // だんだん薄くなる線の描画
  // ---------------------------------------------------------------------
  Window_Base.prototype.drawUnderlineWithLinearOpacity = function (x, y, width) {
    const context = this.contents.context;
    context.lineWidth = 1;
    const gradient = context.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(x, y + 16);
    context.lineTo(x + width, y + 16);
    context.stroke();
  };

  // ---------------------------------------------------------------------
  // 幅に合わせて自動的に改行する処理
  // ---------------------------------------------------------------------
  Window_Base.prototype.drawTextExAutoWrap = function (text, x, y, width) {
    this.resetFontSettings(); // ﾌｫﾝﾄ設定をリセット
    const textState = this.createTextState(text, x, y, width);
    this.processAllTextAutoWrap(textState); // 改行に対応したテキスト処理を実行
    return textState.outputHeight; // 出力された高さを返す
  };

  // ---------------------------------------------------------------------
  // 幅に合わせて自動的に改行したサイズを取得する処理
  // ---------------------------------------------------------------------
  Window_Base.prototype.textSizeExAutoWrap = function (text) {
    this.resetFontSettings();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllTextAutoWrap(textState);
    return { width: textState.outputWidth, height: textState.outputHeight };
  };

  // ---------------------------------------------------------------------
  // テキスト全体を処理するメソッド
  // ---------------------------------------------------------------------
  Window_Base.prototype.processAllTextAutoWrap = function (textState) {
    while (textState.index < textState.text.length) {
      this.processCharacterAutoWrap(textState); // 各文字を処理
    }
    this.flushTextState(textState); // バッファのフラッシュ
  };

  // ---------------------------------------------------------------------
  // 改行に対応した文字処理
  // ---------------------------------------------------------------------
  Window_Base.prototype.processCharacterAutoWrap = function (textState) {
    const c = textState.text[textState.index++]; // 次の文字を取得
    const textWidth = this.textWidth(textState.buffer + c); // 現在のバッファに加えた文字列の幅を取得
    if (c.charCodeAt(0) < 0x20) {
      // 制御文字や特殊文字はそのまま処理
      this.flushTextState(textState);
      this.processControlCharacter(textState, c);
    } else if (textWidth > textState.width) {
      // テキストが横幅を超えた場合、自動改行
      this.flushTextState(textState); // 現在の行を描画
      this.processNewLine(textState); // 新しい行を開始
      textState.buffer += c; // 新しい行に文字を追加
    } else {
      // 幅に収まる場合はそのままバッファに追加
      textState.buffer += c;
    }
  };

  // ---------------------------------------------------------------------
  // 目的管理クラス
  // ---------------------------------------------------------------------
  class DestinationManager {
    constructor() {
      this._switchId = 0;
      this._destinationText = '';
      this._destinationVisible = true;
      this._needsInformDestinationChanged = false;
    }

    get switchId() {
      return this._switchId ?? '';
    }

    set switchId(switchId) {
      this._switchId = switchId;
    }

    get destinationText() {
      return this._destinationText ?? '';
    }

    set destinationText(text) {
      this._destinationText = text;
    }

    get archiveCategoryName() {
      return this._archiveCategoryName ?? '';
    }

    set archiveCategoryName(text) {
      this._archiveCategoryName = text;
    }

    get destinationVisible() {
      return this._destinationVisible;
    }

    set destinationVisible(value) {
      this._destinationVisible = value;
    }

    get needsInformDestinationChanged() {
      return this._needsInformDestinationChanged;
    }

    set needsInformDestinationChanged(enable) {
      this._needsInformDestinationChanged = enable;
    }

    setActiveSwitchId(switchId, needsInformDestinationChanged) {
      this.switchId = switchId;
      const switchName = $dataSystem.switches[switchId];
      this.destinationText = switchName.substring(1);
      const categoryName =
        $dataDestinations.find((destination) => destination.switchId === switchId)?.categoryName ??
        '';
      this.archiveCategoryName = categoryName;
      this.needsInformDestinationChanged = needsInformDestinationChanged;
    }

    getChildDestinations(switchId = null) {
      return this.extractAllByParentNumber(switchId ?? this.switchId);
    }

    extractAllByParentNumber(parentNumber) {
      // 正規表現で $親= の形式を解析
      const regex = new RegExp(`\\@親=${parentNumber}(?!\\d)\\s*(.*)`);

      // 結果を格納する配列
      const result = [];

      // $dataSystem.switches の中から番号に一致する文字列を検索
      for (let i = 0; i < $dataSystem.switches.length; i++) {
        const text = $dataSystem.switches[i];
        if (text) {
          const match = text.match(regex);
          if (match) {
            // 一致するものを配列に追加
            result.push({
              switchId: i,
              switchName: match[1], // 番号の後の文字列を返す
            });
          }
        }
      }

      return result; // 結果配列を返す
    }

    hasChildren(switchId) {
      return this.getChildDestinations(switchId).length > 0;
    }

    getChildDestinationsProgress(switchId) {
      const childDestinations = destinationManager.getChildDestinations(switchId);
      const denominator = childDestinations.length;
      const numerator = childDestinations.filter(({ switchId }) =>
        $gameSwitches.value(switchId)
      ).length;
      return [numerator, denominator];
    }

    setDestinationCompleted(switchId) {
      $gameSystem.addCompletedDestinationSwitchId(switchId);
    }

    setDestinationInCompleted(switchId) {
      $gameSystem.removeCompletedDestinationSwitchId(switchId);
    }

    isDestinationCompleted(switchId) {
      if (this.hasChildren(switchId)) {
        const [numerator, denominator] = this.getChildDestinationsProgress(switchId);
        return numerator === denominator;
      }
      return $gameSystem.isDestinationSwitchIdCompleted(switchId);
    }

    saveSnapshot(switchId, width, height, quality) {
      SceneManager.snapForBackground(); // 現在の画面をスナップ
      const bitmap = SceneManager._backgroundBitmap; // ビットマップを取得

      // Bitmapがロードされるのを待ってから処理を実行
      bitmap.addLoadListener(() => {
        // 画面サイズを取得
        const screenWidth = Graphics.width;
        const screenHeight = Graphics.height;

        // 画面の中心を基準に、切り抜き範囲の左上の座標を計算
        const x = screenWidth / 2 - width / 2; // 中心から幅の半分だけ左に移動
        const y = screenHeight / 2 - height / 2; // 中心から高さの半分だけ上に移動

        // 新しいキャンバスを作成して、指定した領域を描画（切り抜き）
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap._canvas, x, y, width, height, 0, 0, width, height);

        // JPEG形式で画像を圧縮してデータURLを取得
        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        // gameSystemに保存
        $gameSystem.saveSnapshot(switchId, dataUrl);
      });
    }

    removeSnapshot(switchId) {
      if (!$gameSystem._snapShots) {
        $gameSystem._snapShots = {};
      }
      delete $gameSystem._snapShots[switchId];
    }

    hasSnapshot(switchId) {
      if (!$gameSystem._snapShots) {
        $gameSystem._snapShots = {};
      }
      return !!$gameSystem._snapShots[switchId];
    }

    getSnapshotUrl(switchId) {
      if (!$gameSystem._snapShots) {
        $gameSystem._snapShots = {};
      }
      return $gameSystem._snapShots[switchId];
    }

    isDestinationSwitch(switchId) {
      return $dataSystem.switches[switchId]?.startsWith('$');
    }

    getSwitchName(switchId) {
      return this.isDestinationSwitch(switchId)
        ? $dataSystem.switches[switchId]?.slice(1)
        : $dataSystem.switches[switchId] ?? '';
    }

    isNew(switchId) {
      if (switchId === 0) return false;
      return !$gameSystem.hasDestinationSwitchIdSeen(switchId);
    }

    setSeen(switchId) {
      $gameSystem.addSeenDestinationSwitchId(switchId);
    }
  }

  const destinationManager = new DestinationManager();

  // ファイル操作とパス操作のモジュールをインポート
  let fs, path;
  if (typeof require !== 'undefined' && Utils.isNwjs()) {
    fs = require('fs');
    path = require('path');
  }

  /**
   * 抽出された目的地データを保存する
   * @param {string[]} resultList - 抽出された目的地データのリスト
   */
  const saveDestinationData = (resultList) => {
    const outputFilePath = path.join(
      path.dirname(process.mainModule.filename),
      'destinationsBySwitch.txt'
    );
    const outputData = resultList.join('\n');
    fs.writeFileSync(outputFilePath, outputData);
    alert(`
プラグイン:Sakura_DestinationBySwitchOnによって、

${outputFilePath}

にファイルが書き込まれました。
ご確認ください。

※この設定はプラグインパラメータからオフにできます。`);
  };

  /**
   * 親子スイッチ情報を出力する
   */
  const outputParentChildSwitchInfo = () => {
    const extractNumberFromText = (text) => {
      // 正規表現を使って数字部分を抽出
      const match = text.match(/@親=(\d+)/);
      // 数字部分が見つかった場合はそれを返す。見つからなければnullを返す。
      return match ? match[1] : '';
    };

    const destinationSwitches = $dataSystem.switches
      .map((switchName, index) => ({ switchId: index, switchName }))
      .filter(({ switchName }) => switchName.startsWith('$') || switchName.startsWith('@親='))
      .map(({ switchId, switchName }) => {
        const parentSwitchId = extractNumberFromText(switchName);
        return [parentSwitchId || switchId, switchId, switchName];
      })
      .sort((a, b) => {
        // まず第一キー (a[0], b[0]) で比較
        if (Number(a[0]) !== Number(b[0])) {
          return Number(a[0]) - Number(b[0]);
        }
        // 第一キーが同じ場合、第二キー (a[1], b[1]) で比較
        return Number(a[1]) - Number(b[1]);
      });

    const header = ['"親"', '"ID"', '"スイッチ名"'];
    const separator = '-------------------------------------------------------';
    const csvData = [header.join('\t|')];
    csvData.push(separator);

    let lastParentSwitchId = null;

    destinationSwitches.forEach(([parentSwitchId, switchId, switchName]) => {
      // 親IDが数値として変わったらセパレーターを挿入
      if (lastParentSwitchId !== null && Number(lastParentSwitchId) !== Number(parentSwitchId)) {
        csvData.push(separator);
      }
      csvData.push([`"${parentSwitchId}"`, `"${switchId}"`, `"${switchName}"`].join('\t|'));
      lastParentSwitchId = parentSwitchId;
    });

    saveDestinationData(csvData);
  };

  /**
   * マップ上に目的地を表示するWindowクラス
   */
  class Window_DestinationOnMap extends Window_Base {
    constructor() {
      const rect = new Rectangle(0, 0, Graphics.width, Graphics.height);
      super(rect);
      this.opacity = 0;
      this.move(0, 0, 0, 0);
      this.contents.fontSize = destinationFontSize;
      this._switchId = 0;
      this._text = '';
      this._categoryName = '';
      this._showStoryProgressText = false;
      this._storyProgressTextDuration = storyProgressTextDuration;
      this._fadeOutDuration = 0;
      this._fadeInDuration = 0;
    }

    /**
     * スイッチIDを設定し、ｳｨﾝﾄﾞｳをリフレッシュする
     * @param {number} switchId - 表示するスイッチID
     */
    setSwitchId(switchId) {
      if (this._switchId !== switchId) {
        this._switchId = switchId;
        this.refresh();
      }
    }

    /**
     * ストーリー進行時のテキスト表示を設定する
     */
    setDestinationChanged() {
      if (storyProgressText) {
        this._showStoryProgressText = true;
        this._storyProgressTextDuration = storyProgressTextDuration;
        this.contentsOpacity = 255;
        this.refresh();
      }
      if (storyProgressAudio.audioName) {
        const { audioName, volume, pitch, pan } = storyProgressAudio;
        AudioManager.playSe({ name: audioName, volume, pitch, pan }); // サウンドエフェクトを再生
      }
    }

    update() {
      super.update();
      this.visible = destinationManager.destinationVisible && !$gameMap.isEventRunning();

      if (this._showStoryProgressText) {
        this._storyProgressTextDuration--;
        if (this._storyProgressTextDuration <= 0) {
          this._showStoryProgressText = false;
          this._fadeOutDuration = 60;
        }
      } else if (this._fadeOutDuration > 0) {
        this._fadeOutDuration--;
        this.contentsOpacity = Math.max(0, 255 * (this._fadeOutDuration / 60));
        if (this._fadeOutDuration <= 0) {
          this._fadeInDuration = 30;
          this.contentsOpacity = 0;
          this.refresh();
        }
      } else if (this._fadeInDuration > 0) {
        this._fadeInDuration--;
        this.contentsOpacity = Math.min(255, 255 * (1 - this._fadeInDuration / 30));
      }
    }

    createText() {
      const [first, rest] = splitFirstCharacter(destinationManager.destinationText);
      if (this._showStoryProgressText) {
        return `\\FS[${destinationFontSize}]\\C[${storyProgressTextColor}]${storyProgressText}`;
      }
      if (destinationManager.hasChildren()) {
        const [numerator, denominator] = destinationManager.getChildDestinationsProgress();
        return `\\FS[${destinationFontSize}]\\C[${destinationFontColorIfHasChildren}]\\{${first}\\}${rest} ${numerator}/${denominator}`;
      }
      return `\\FS[${destinationFontSize}]\\C[${destinationFontColor}]\\{${first}\\}${rest}`;
    }

    refresh() {
      this.contents.clear();
      const categoryName = destinationManager.archiveCategoryName;
      if (categoryName) {
        this.contents.fontBold = true;
        this.drawTextEx(
          `\\FS[${categoryFontSize}]\\C[${categoryFontColor}]${categoryName}`,
          0,
          -10
        );
        this.contents.fontBold = false;
      }
      const text = this.createText();
      this.drawTextEx(text, 0, 10);
      const paddingX = 6;
      const paddingY = 6;
      const height = this.maxFontSizeInLine(text) + paddingY;
      this.drawUnderlineWithLinearOpacity(0, height + 10, this.textWidth(text) + paddingX);

      this.height = height + 10 + this.padding * 2 + paddingY + 1;
      this.width = this.textWidth(text) + this.padding * 2;

      if (!this._showStoryProgressText) {
        const childDestinations = destinationManager.getChildDestinations();
        let index = 0;
        for (const { switchId, switchName } of childDestinations) {
          const completed = $gameSwitches.value(switchId);
          const checkMark = completed ? '✔' : '□';
          const textColor = completed ? childrenFontColorIfCompleted : childrenFontColor;
          const subText = `\\FS[${childrenFontSize}]\\C[${textColor}]${checkMark} ${switchName}`;

          const subLineHeight = this.maxFontSizeInLine(subText) + paddingY;
          this.drawTextEx(subText, 10, height + 10 + 10 + subLineHeight * index);
          this.width = Math.max(this.width, this.textWidth(subText) + this.padding * 2);
          this.height += subLineHeight;
          index += 1;
        }
        this.height += this.padding;
      }

      // this.height = this.lineHeight() + this.padding * 2 + paddingY + 1 + 100;
      this.showGradientBackground();
      // ｳｨﾝﾄﾞｳの位置を更新
      this.updatePlacement();
    }

    // 角丸の矩形を描画するメソッド（グラデーション対応）
    drawRoundRect(x, y, width, height, radius, color, fill = true) {
      const context = this.contents.context;
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();

      // グラデーションの作成（左から右にかけて透明になる）
      const gradient = context.createLinearGradient(x, y, x + width, y);
      gradient.addColorStop(0, color); // 最初は指定した色
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // 最後は透明

      if (fill) {
        context.fillStyle = gradient;
        context.fill();
      } else {
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
      }
    }

    /**
     * ｳｨﾝﾄﾞｳの位置とサイズを更新する
     */
    updatePlacement() {
      const { uiMarginX, uiMarginY } = getMarginOfUIArea();

      switch (destinationPosition) {
        case 'topLeft':
          this.x = -uiMarginX + destinationTextX;
          this.y = -uiMarginY + destinationTextY;
          break;
        case 'topRight':
          this.x = -uiMarginX + Graphics.width - this.width + destinationTextX;
          this.y = -uiMarginY + destinationTextY;
          break;
        case 'bottomLeft':
          this.x = -uiMarginX + destinationTextX;
          this.y = -uiMarginY + Graphics.height - this.height + destinationTextY;
          break;
        case 'bottomRight':
          this.x = -uiMarginX + Graphics.width - this.width + destinationTextX;
          this.y = -uiMarginY + Graphics.height - this.height + destinationTextY;
          break;
      }
    }
  }

  // ---------------------------------------------------------------------
  // Window_CategorySelectable
  // Window_Selectableを拡張して、カテゴリごとに開閉できる機能を追加
  // ---------------------------------------------------------------------
  class Window_CategorySelectable extends Window_Selectable {
    constructor(rect) {
      super(rect);
      this._data = [];
      this._categories = [];
      this._expandedCategories = {};
      this._animatingCategories = {};
      this._animationSpeed = 1;
      this.initializeCategories();
    }

    createCategories() {
      return [];
    }

    initializeCategories() {
      this._categories = this.createCategories();
      this._categories.forEach((category) => {
        this._expandedCategories[category.name] = false;
        this._animatingCategories[category.name] = 0;
      });

      this.refresh();
    }

    maxItems() {
      let count = 0;
      for (const category of this._categories) {
        count += 1;

        count += Math.ceil(this._animatingCategories[category.name]);
      }
      return count;
    }

    drawItem(index) {
      const itemData = this.itemAt(index);
      if (itemData) {
        const rect = this.itemRectWithPadding(index);

        if (this.isCategory(index)) {
          this.drawCategoryName(itemData, rect);
        } else {
          this.drawItemName(itemData, rect);
        }
      }
    }

    drawCategoryName(itemData, rect) {
      this.drawText(`[${itemData}]`, rect.x, rect.y, rect.width);
    }

    drawItemName(itemData, rect) {
      this.drawText(itemData, rect.x, rect.y, rect.width);
    }

    itemAt(index) {
      let currentIndex = 0;
      for (const category of this._categories) {
        if (currentIndex === index) return category.name;
        currentIndex += 1;
        const displayItemCount = Math.ceil(this._animatingCategories[category.name]);
        for (let i = 0; i < displayItemCount; i++) {
          if (currentIndex === index) return category.items[i];
          currentIndex += 1;
        }
      }
      return null;
    }

    isCategory(index) {
      let currentIndex = 0;
      for (const category of this._categories) {
        if (currentIndex === index) return true;
        currentIndex += 1;
        const displayItemCount = Math.ceil(this._animatingCategories[category.name]);
        currentIndex += displayItemCount;
      }
      return false;
    }

    processOk() {
      const index = this.index();
      if (this.isCategory(index)) {
        this.playOkSound();
        this.toggleCategory(index);
      } else {
        const itemData = this.itemAt(index);
        if (itemData) {
          super.processOk();
        }
      }
    }

    toggleCategory(index) {
      let currentIndex = 0;
      for (const category of this._categories) {
        if (currentIndex === index) {
          const isExpanding = this._expandedCategories[category.name] === false;

          if (isExpanding) {
            // 開く場合
            this._expandedCategories[category.name] = true;
          } else {
            // 閉じる場合
            this._expandedCategories[category.name] = false;
          }

          break;
        }
        currentIndex += 1;
        currentIndex += Math.ceil(this._animatingCategories[category.name]);
      }
    }

    update() {
      super.update();
      this.updateCategoryAnimations();
    }

    updateCategoryAnimations() {
      let needsRefresh = false;
      for (const category of this._categories) {
        const targetItemCount = this._expandedCategories[category.name] ? category.items.length : 0;
        const currentCount = this._animatingCategories[category.name];

        if (currentCount !== targetItemCount) {
          const direction = currentCount < targetItemCount ? 1 : -1;
          this._animatingCategories[category.name] += this._animationSpeed * direction;

          if (direction > 0 && this._animatingCategories[category.name] > targetItemCount) {
            this._animatingCategories[category.name] = targetItemCount;
          } else if (direction < 0 && this._animatingCategories[category.name] < 0) {
            this._animatingCategories[category.name] = 0;
          }

          needsRefresh = true;
        }
      }

      if (needsRefresh) {
        this.refresh();
      }
    }
  }

  const OPACITY_IF_ACTIVE = 255;
  const OPACITY_IF_DEACTIVE = 100;

  // ---------------------------------------------------------------------
  // Window_ScrollableText
  // Window_Baseを拡張して、長い文章をスクロールできる機能を追加
  // ---------------------------------------------------------------------
  class Window_ScrollableText extends Window_Base {
    constructor(rect) {
      super(rect);
      this._text = '';
      this._overallHeight = 0; // テキストの高さを保持
      this._handlers = {};
      this.opacity = 0;
      this.refresh();
      this.deactivate();
    }

    activate() {
      super.activate();
      this.contentsOpacity = OPACITY_IF_ACTIVE;
    }

    deactivate() {
      super.deactivate();
      this.contentsOpacity = OPACITY_IF_DEACTIVE;
    }

    contentsHeight() {
      return 10000;
    }

    // 文章を設定するメソッド
    setText(text) {
      this._text = text;
      this.refresh();
    }

    // テキストの表示領域を再描画
    refresh() {
      this.contents.clear();
      const textHeight = this.drawTextExAutoWrap(this._text, 0, 0, this.contentsWidth());
      this._overallHeight = textHeight; // テキストの全体の高さを更新
    }

    // 最大スクロール可能な高さを計算する
    maxScrollY() {
      return Math.max(0, this._overallHeight - this.innerHeight); // スクロール可能な範囲
    }

    // スクロール位置をリセットする
    resetScroll() {
      this.origin.y = 0; // スクロール位置をリセット
    }

    isOkEnabled() {
      return this.isHandled('ok');
    }

    isCancelEnabled() {
      return this.isHandled('cancel');
    }

    isOkTriggered() {
      return this._canRepeat ? Input.isRepeated('ok') : Input.isTriggered('ok');
    }

    isCancelTriggered() {
      return Input.isRepeated('cancel');
    }

    setHandler(symbol, method) {
      this._handlers[symbol] = method;
    }

    isHandled(symbol) {
      return !!this._handlers[symbol];
    }

    callHandler(symbol) {
      if (this.isHandled(symbol)) {
        this._handlers[symbol]();
      }
    }

    isOpenAndActive() {
      return this.isOpen() && this.visible && this.active;
    }

    processHandling() {
      if (!this.isOpenAndActive()) return;
      if (this.isOkEnabled() && this.isOkTriggered()) {
        return this.processOk();
      }
      if (this.isCancelEnabled() && this.isCancelTriggered()) {
        return this.processCancel();
      }
      if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
        return this.processPagedown();
      }
      if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
        return this.processPageup();
      }
    }

    updateInputData() {
      Input.update();
      TouchInput.update();
      // this.clearScrollStatus();
    }

    processOk() {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callOkHandler();
    }

    callOkHandler() {
      this.callHandler('ok');
    }

    processCancel() {
      SoundManager.playCancel();
      this.updateInputData();
      this.deactivate();
      this.resetScroll();
      this.callCancelHandler();
    }

    callCancelHandler() {
      this.callHandler('cancel');
    }

    // 十字キーによるスクロールの処理
    processKeyScroll() {
      if (!this.isOpenAndActive()) return;
      // 下にスクロール
      if (Input.isPressed('down')) {
        this.scrollDown(10);
      }

      // 上にスクロール
      if (Input.isPressed('up')) {
        this.scrollUp(10);
      }
    }

    processWheelScroll() {
      if (!this.isOpenAndActive()) return;
      if (this.isTouchedInsideFrame()) {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
          this.scrollDown(this.lineHeight());
        }
        if (TouchInput.wheelY <= -threshold) {
          this.scrollUp(this.lineHeight());
        }
      }
    }

    processTouchScroll() {
      if (!this.isOpenAndActive()) return;
      if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.onTouchScrollStart();
      }
      if (this._scrollTouching) {
        if (TouchInput.isReleased()) {
          this.onTouchScrollEnd();
        } else if (TouchInput.isMoved()) {
          this.onTouchScroll();
        }
      }
    }

    isTouchedInsideFrame() {
      const touchPos = new Point(TouchInput.x, TouchInput.y);
      const localPos = this.worldTransform.applyInverse(touchPos);
      return this.innerRect.contains(localPos.x, localPos.y);
    }

    onTouchScrollStart() {
      this._scrollTouching = true;
      this._scrollLastTouchX = TouchInput.x;
      this._scrollLastTouchY = TouchInput.y;
    }

    onTouchScroll() {
      const accelY = this._scrollLastTouchY - TouchInput.y;
      if (accelY > 0) {
        this.scrollDown(accelY);
      } else {
        this.scrollUp(-accelY);
      }
      this._scrollLastTouchX = TouchInput.x;
      this._scrollLastTouchY = TouchInput.y;
    }

    onTouchScrollEnd() {
      this._scrollTouching = false;
    }

    scrollUp(scrollSpeed) {
      this.origin.y = Math.max(this.origin.y - scrollSpeed, 0); // 最小値までスクロール
    }

    scrollDown(scrollSpeed) {
      this.origin.y = Math.min(this.origin.y + scrollSpeed, this.maxScrollY()); // 最大値までスクロール
    }

    // キー入力によるスクロール処理を追加
    update() {
      super.update();
      this.processHandling(); // ｳｨﾝﾄﾞｳがアクティブなときのみキー入力を処理
      this.processKeyScroll();
      this.processWheelScroll();
      this.processTouchScroll();
      this.updateArrows(); // 矢印の更新
    }

    // 矢印の表示/非表示を更新
    updateArrows() {
      this.downArrowVisible = this.origin.y < this.maxScrollY(); // 下にスクロール可能なら表示
      this.upArrowVisible = this.origin.y > 0; // 上にスクロール可能なら表示
    }
  }

  const TITLE_WINDOW_HEIGHT = 64;

  // ---------------------------------------------------------------------
  // Window_ArchiveTitle
  // Scene_Archiveの上のタイトルウィンドウ
  // ---------------------------------------------------------------------
  class Window_ArchiveTitle extends Window_Base {
    constructor() {
      const x = 0 + paddingInSceneArchive;
      const y = 0 + paddingInSceneArchive;
      const width = Graphics.boxWidth - paddingInSceneArchive * 2;
      const height = $gameTemp._sceneArchiveTitle ? TITLE_WINDOW_HEIGHT : 0;
      const rect = new Rectangle(x, y, width, height);
      super(rect);
      this.opacity = 0;
      this.refresh();
    }

    resetFontSettings() {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = 32;
      this.contents.fontBold = true;
      this.resetTextColor();
    }

    refresh() {
      this.contents.clear();
      const text = $gameTemp._sceneArchiveTitle;
      const [first, rest] = splitFirstCharacter(text);
      this.drawTextEx(`\\FS[32]${first}\\FS[20]${rest}`, 0, 0, this.contentsWidth());
      this.drawUnderlineWithLinearOpacity(0, 24, this.contentsWidth());
    }
  }

  // ---------------------------------------------------------------------
  // Window_ArchiveList
  // Scene_Archiveの左側のカテゴリウィンドウ
  // ---------------------------------------------------------------------
  class Window_ArchiveList extends Window_CategorySelectable {
    constructor() {
      const titleWindowHeight = $gameTemp._sceneArchiveTitle ? TITLE_WINDOW_HEIGHT : 0;
      const x = paddingInSceneArchive;
      const y = paddingInSceneArchive + titleWindowHeight;
      const width = (Graphics.boxWidth - paddingInSceneArchive * 2) * (listWindowWidthRate / 100);
      const height = Graphics.boxHeight - paddingInSceneArchive * 2 - titleWindowHeight;
      const rect = new Rectangle(x, y, width, height);
      super(rect);
      this.opacity = 0;
      this.showBackgroundDimmer();
      this.refresh();
    }

    drawItemBackground() {
      // itemBackgroundを描画しない
    }

    activate() {
      super.activate();
      this.contentsOpacity = OPACITY_IF_ACTIVE;
    }

    deactivate() {
      super.deactivate();
      this.contentsOpacity = OPACITY_IF_DEACTIVE;
    }

    itemHeight() {
      return listWindowItemHeight;
    }

    resetFontSettings() {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = listWindowFontSize;
      this.resetTextColor();
    }

    createCategories() {
      const inputData = $dataDestinations;
      // 結果を格納する配列
      const result = [];

      // ｶﾃｺﾞﾘごとのアイテムを管理するマップ
      const categoryMap = {};

      // データをループし、ｶﾃｺﾞﾘごとにグループ化
      for (const entry of inputData) {
        const { categoryName, switchId, archiveTitle, detail, picture } = entry;

        if (!$gameTemp._sceneArchiveTargetCategories) {
          $gameTemp._sceneArchiveTargetCategories = [];
        }

        // 前方一致でカテゴリを判定する
        const hasMatchingCategory = $gameTemp._sceneArchiveTargetCategories.some((targetCategory) =>
          categoryName.startsWith(targetCategory)
        );

        if ($gameTemp._sceneArchiveTargetCategories.length > 0 && !hasMatchingCategory) {
          continue;
        }

        const switchName = destinationManager.getSwitchName(switchId);

        // $gameSwitches.value(switchId)がtrueのものまたはswitchId===0だけ抽出
        if ($gameSwitches.value(Number(switchId)) || switchId === 0) {
          // ｶﾃｺﾞﾘが存在しない場合は新しく追加
          if (!categoryMap[categoryName]) {
            categoryMap[categoryName] = {
              name: categoryName,
              items: [],
            };
          }

          // 該当ｶﾃｺﾞﾘのitemsにオブジェクト形式で追加
          categoryMap[categoryName].items.push({
            switchId,
            switchName,
            archiveTitle,
            detail,
            picture,
          });
        }
      }

      // マップの内容を結果に変換
      for (const key in categoryMap) {
        if (categoryMap[key].items.length > 0) {
          result.push(categoryMap[key]);
        }
      }

      $gameTemp._sceneArchiveTargetCategories = [];

      return result;
    }

    drawCategoryName(itemData, rect) {
      this.contents.fontBold = true;
      const isExpanding = this._expandedCategories[itemData] === false;
      const prefix = isExpanding ? '▶' : '▼';

      // テキストの描画
      const textHeight = this.drawTextExAutoWrap(
        `\\FS[14]${prefix} \\FS[${listWindowFontSize}]\\C[${categoryFontColor}]${itemData}`,
        rect.x,
        rect.y,
        rect.width - 16
      );

      // 1行目の高さ
      const firstLineHeight = textHeight;

      // 1行目の下に縦線を描画
      const lineX = rect.x + 8; // 左側からの距離を調整
      const lineY1 = rect.y + firstLineHeight; // 1行目の下
      const lineY2 = rect.y + this.itemHeight(); // 縦線の終わり（全体の高さ）
      const lineThickness = 2; // 線の太さ

      const LINE_OPACITY = 200;

      this.contents.paintOpacity = LINE_OPACITY; // 線の透明度
      this.contents.fillRect(lineX, lineY1, lineThickness, lineY2 - lineY1, 'white'); // 縦線を描画
      this.contents.paintOpacity = 255; // 描画後に透明度を元に戻す
    }

    translucentOpacity() {
      return 100;
    }

    drawItemName(itemData, rect) {
      const { switchId, archiveTitle } = itemData;
      this.contents.fontBold = false;

      // 現在のスイッチIDと一致するかどうか
      const isCurrentDestination =
        destinationManager.switchId > 0 && destinationManager.switchId === switchId;
      const textColor = isCurrentDestination ? '6' : '0';
      // 目的達成済みか
      const isCompleted = destinationManager.isDestinationCompleted(switchId);
      this.changePaintOpacity(!isCompleted);
      // 未読か
      const isNew = destinationManager.isNew(switchId);

      this.drawTextExAutoWrap(
        `\\C[${textColor}]${archiveTitle} ${isNew ? '\\FS[14]\\C[3]NEW' : ''}`,
        rect.x + 20,
        rect.y,
        rect.width - 20 - this.padding
      );
      this.changePaintOpacity(true);

      // 縦線を描画 (余白に線を引く)
      const lineX = rect.x + 8; // 左側からの距離を調整
      const lineY1 = rect.y;
      const lineY2 = rect.y + this.itemHeight();
      const lineThickness = 2; // 線の太さ

      const LINE_OPACITY = 200;

      // 現在のアイテムがカテゴリ内の最後かどうかを確認
      const currentCategory = this._categories.find((category) =>
        category.items.includes(itemData)
      );
      const isLastInCategory =
        currentCategory.items.indexOf(itemData) === currentCategory.items.length - 1;

      // 円の部分で縦線を消す処理のために円の中心と半径を計算
      const firstLineHeight = this.lineHeight(); // 1行目の高さ
      const centerY = rect.y + firstLineHeight / 2; // 1行目の中央のY位置
      const radius = 6; // 円の半径を設定

      // 縦線を描画（最後のアイテムでも円の上までは描画する）
      this.contents.paintOpacity = LINE_OPACITY; // 線の透明度
      this.contents.fillRect(lineX, lineY1, lineThickness, centerY - radius - lineY1, 'white'); // 縦線を円の上まで描画

      // 円の部分で縦線を消す
      const circleClearY1 = centerY - radius;
      const circleClearY2 = centerY + radius;
      this.contents.clearRect(lineX, circleClearY1, lineThickness, circleClearY2 - circleClearY1);

      // 円の下に縦線を描画するかどうか
      if (!isLastInCategory) {
        this.contents.fillRect(
          lineX,
          circleClearY2,
          lineThickness,
          lineY2 - circleClearY2,
          'white'
        ); // 縦線を円の下に描画
      }

      const isDestinationSwitch = destinationManager.isDestinationSwitch(switchId);

      // 円の描画（塗りつぶし or 空洞）
      if (isCompleted || !isDestinationSwitch) {
        // 塗りつぶされた円
        this.contents.drawFilledCircle = function (x, y, radius, fillColor = 'white') {
          const context = this.context;
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.fillStyle = fillColor; // 円の色を設定
          context.globalAlpha = LINE_OPACITY / 255; // 透明度を設定
          context.fill(); // 塗りつぶし
          context.globalAlpha = 1; // 描画後に透明度を元に戻す
        };
        const fillColor = isCurrentDestination ? ColorManager.textColor(6) : 'white'; // 黄緑か白
        this.contents.drawFilledCircle(lineX + 1, centerY, radius, fillColor);
      } else {
        // 空洞の円
        this.contents.drawHollowCircle = function (x, y, radius, strokeColor = 'white') {
          const context = this.context;
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI);
          context.strokeStyle = strokeColor; // 円の枠線の色を設定
          context.lineWidth = lineThickness; // 円の枠線の太さ
          context.globalAlpha = LINE_OPACITY / 255; // 透明度を設定
          context.stroke(); // 枠線のみ描画
          context.globalAlpha = 1; // 描画後に透明度を元に戻す
        };
        const strokeColor = isCurrentDestination ? ColorManager.textColor(6) : 'white'; // 黄緑か白
        this.contents.drawHollowCircle(lineX + 1, centerY, radius, strokeColor);
      }

      // 不透明度をリセット
      this.contents.paintOpacity = 255;
    }

    rowSpacing() {
      return 0;
    }

    item = function () {
      return this.itemAt(this.index());
    };

    updateHelp() {
      const index = this.index();
      if (this.isCategory(index)) {
        this.setHelpWindowItem(null);
        return;
      }
      this.setHelpWindowItem(this.item());
    }
  }

  // ---------------------------------------------------------------------
  // Window_ArchiveDetail
  // Scene_Archiveの右側の詳細ウィンドウ
  // ---------------------------------------------------------------------
  class Window_ArchiveDetail extends Window_ScrollableText {
    constructor() {
      const titleWindowHeight = $gameTemp._sceneArchiveTitle ? TITLE_WINDOW_HEIGHT : 0;
      const x = (Graphics.boxWidth - paddingInSceneArchive) * (listWindowWidthRate / 100);
      const y = paddingInSceneArchive + titleWindowHeight;
      const width =
        (Graphics.boxWidth - paddingInSceneArchive * 2) * ((100 - listWindowWidthRate) / 100);
      const height = Graphics.boxHeight - paddingInSceneArchive * 2 - titleWindowHeight;
      const rect = new Rectangle(x, y, width, height);
      super(rect);
      this._title = '';
      this._item = null;
      this._commandWindow = null;
      this.refresh();
    }

    updatePadding() {
      this.padding = detailWindowPadding;
    }

    contentsHeight() {
      return detailWindowMaxContentsHeight;
    }

    resetFontSettings() {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = detailWindowDescFontSize;
      this.resetTextColor();
    }

    setItem(item) {
      this._item = item;
      const newText = item?.detail ?? '';
      if (this._text !== newText) {
        this._title = item?.archiveTitle ?? '';
        this.setText(newText);
      }
    }

    refresh() {
      this.contents.clear();
      let y = 0;

      this.contents.fontBold = true;
      y += this.drawTextExAutoWrap(
        `\\FS[${detailWindowTitleFontSize}]\\C[${destinationFontColorIfHasChildren}]${this._title}`,
        0,
        y,
        this.contentsWidth()
      );
      this.drawUnderlineWithLinearOpacity(0, y, this.contentsWidth());
      y += this.lineHeight();

      // 現在表示されている画像を削除（初期化）
      if (this._pictureSprite) {
        this.removeChild(this._pictureSprite); // スプライトを削除
        this._pictureSprite = null; // スプライトを初期化
      }

      if (this._item?.picture) {
        const { switchId } = this._item;
        let bitmap;
        if (destinationManager.hasSnapshot(switchId)) {
          bitmap = ImageManager.loadBitmapFromUrl(destinationManager.getSnapshotUrl(switchId));
        } else {
          bitmap = ImageManager.loadPicture(this._item.picture);
        }

        bitmap.addLoadListener(() => {
          this._pictureSprite = new Sprite(bitmap);

          // 指定した幅と高さを設定
          const specifiedWidth = detailWindowPictureWidth;
          const specifiedHeight = detailWindowPictureHeight;

          // 元の画像の幅と高さ
          const originalWidth = bitmap.width;
          const originalHeight = bitmap.height;

          // 幅と高さのスケーリング比率を計算
          const widthScale = specifiedWidth / originalWidth;
          const heightScale = specifiedHeight / originalHeight;

          // 比率が小さい方を使用して、アスペクト比を維持したスケーリングを行う
          const scale = Math.min(widthScale, heightScale);

          // スプライトのスケーリングを設定
          this._pictureSprite.scale.x = scale;
          this._pictureSprite.scale.y = scale;

          // 画像の中央揃えの位置計算
          const x = (this.contentsWidth() - originalWidth * scale) / 2 + this.padding;
          const yPosition = y;

          this._pictureSprite.x = x;
          this._pictureSprite.y = yPosition + this.padding;

          // 画像の高さを次の描画の基準として使用
          y += originalHeight * scale; // スケール後の高さを使用

          this.addChildToBack(this._pictureSprite); // スプライトを追加

          this.contents.fontBold = false;
          y += this.drawTextExAutoWrap(this._text, 0, y, this.contentsWidth());

          /**
           * アーカイブシーンでは小目的は表示しないようにする
           */
          // if (destinationManager.hasChildren(this._item.switchId)) {
          //   this.drawUnderlineWithLinearOpacity(0, y, this.contentsWidth());
          //   y += this.lineHeight();

          //   const childDestinations = destinationManager.getChildDestinations(this._item.switchId);
          //   let index = 0;
          //   for (const { switchId, switchName } of childDestinations) {
          //     const completed = $gameSwitches.value(switchId);
          //     const checkMark = completed ? '✔' : '□';
          //     const textColor = completed ? 24 : 0;
          //     const subText = `\\C[${textColor}]${checkMark} ${switchName}`;

          //     const subLineHeight = this.maxFontSizeInLine(subText);
          //     this.drawTextEx(subText, 10, y);
          //     y += subLineHeight;
          //     index += 1;
          //   }
          //   y += this.padding;
          // }
          this._overallHeight = y; // テキストの全体の高さを更新
        });
      } else {
        this.contents.fontBold = false;
        y += this.drawTextExAutoWrap(this._text, 0, y, this.contentsWidth());
        this._overallHeight = y; // テキストの全体の高さを更新
      }
    }

    activate() {
      super.activate();
      if (this._item.switchId) {
        destinationManager.setSeen(this._item.switchId);
        this._listWindow.refresh();
      }
    }

    update() {
      super.update();
      this.updatePictureTone();
    }

    updatePictureTone() {
      if (!this._pictureSprite) return;

      if (!this.active) {
        this._pictureSprite.opacity = OPACITY_IF_DEACTIVE;
      } else {
        this._pictureSprite.opacity = OPACITY_IF_ACTIVE;
      }

      const NORMAL_TONE = [0, 0, 0, 0];
      const DIMMER_TONE = [-100, -100, -100, 0];

      // 目標トーン
      const targetTone = this.origin.y === 0 ? NORMAL_TONE : DIMMER_TONE;

      // 現在のトーンを取得
      const currentTone = this._pictureSprite.getColorTone();

      // トーンの変化速度（1フレームあたりの変化量）
      const toneSpeed = 5;

      // リニア補間（Lerp）を使って徐々にトーンを変化させる
      const newTone = [
        this.lerp(currentTone[0], targetTone[0], toneSpeed),
        this.lerp(currentTone[1], targetTone[1], toneSpeed),
        this.lerp(currentTone[2], targetTone[2], toneSpeed),
        this.lerp(currentTone[3], targetTone[3], toneSpeed),
      ];

      // 新しいトーンを適用
      this._pictureSprite.setColorTone(newTone);
    }

    lerp(start, end, speed) {
      return start + (end - start) / speed;
    }

    processOk() {
      this._commandWindow.setItem(this._item);
      super.processOk();
    }
  }

  // ---------------------------------------------------------------------
  // Window_ArchiveCommand
  // Scene_Archiveで目的を優先表示するかどうか確認するダイアログ
  // ---------------------------------------------------------------------
  class Window_ArchiveCommand extends Window_Command {
    constructor() {
      const width = 300;
      const height = Graphics.boxHeight * (1 / 4);
      // 画面の中央に配置するためのX, Yの計算
      const x = (Graphics.boxWidth - width) / 2 + commandWindowOffsetX;
      const y = (Graphics.boxHeight - height) / 2 + commandWindowOffsetY;
      const rect = new Rectangle(x, y, width, height);
      super(rect);
      this.opacity = 255;
      this._item = null;
      this.deactivate();
      this.close();
      this.hide();
    }

    drawItemBackground() {
      // itemBackgroundを描画しない
    }

    makeCommandList() {
      this.height = this.lineHeight() * 3 + this.padding;
      if (!this._item) return;
      const enabled = !destinationManager.isDestinationCompleted(this._item.switchId);
      if (enabled) {
        this.addCommand(commandWindowTextSetPriority, 'ok', enabled);
      } else {
        this.addCommand(commandWindowTextAlreadyCompleted, 'ok', enabled);
      }
      this.addCommand(TextManager.cancel, 'cancel');
    }

    setItem(item) {
      this._item = item;
      this.refresh();
    }

    processOk() {
      if (!this.isCurrentItemEnabled()) {
        this.playBuzzerSound();
        return;
      }
      const currentSymbol = this.currentSymbol();
      if (currentSymbol === 'cancel') {
        SoundManager.playCancel();
        this.callCancelHandler();
        return;
      }
      const { switchId } = this._item;
      destinationManager.setActiveSwitchId(switchId, false);
      super.processOk();
    }
  }

  // ---------------------------------------------------------------------
  // Scene_Archive
  // アーカイブシーン
  // ---------------------------------------------------------------------
  class Scene_Archive extends Scene_MenuBase {
    create() {
      super.create();
      this.createArchiveTitleWindow();
      this.createArchiveDetailWindow();
      this.createArchiveListWindow();
      this.createArchiveCommandWindow();
      this._listWindow._helpWindow = this._detailWindow;
      this._detailWindow._commandWindow = this._commandWindow;
      this._detailWindow._listWindow = this._listWindow;
      this._listWindow.activate();
      this._listWindow.select(0);
      this._detailWindow.deactivate();
    }

    createArchiveTitleWindow() {
      this._titleWindow = new Window_ArchiveTitle();
      this.addWindow(this._titleWindow);
    }

    createArchiveListWindow() {
      this._listWindow = new Window_ArchiveList();
      this._listWindow.setHandler('ok', this.onCategoryOk.bind(this));
      this._listWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
      this.addWindow(this._listWindow);
    }

    createArchiveDetailWindow() {
      this._detailWindow = new Window_ArchiveDetail();
      this._detailWindow.setHandler('ok', this.onDetailOk.bind(this));
      this._detailWindow.setHandler('cancel', this.onDetailCancel.bind(this));
      this.addWindow(this._detailWindow);
    }

    createArchiveCommandWindow() {
      this._commandWindow = new Window_ArchiveCommand();
      this._commandWindow.setHandler('ok', this.onCommandOk.bind(this));
      this._commandWindow.setHandler('cancel', this.onCommandCancel.bind(this));
      this.addWindow(this._commandWindow);
    }

    onCategoryOk() {
      this._listWindow.deactivate();
      this._detailWindow.activate();
    }

    onCategoryCancel() {
      this.popScene();
    }

    onDetailOk() {
      if (destinationManager.isDestinationSwitch(this._detailWindow?._item?.switchId)) {
        this._detailWindow.deactivate();
        this._commandWindow.show();
        this._commandWindow.open();
        this._commandWindow.activate();
      } else {
        this._detailWindow.activate();
      }
    }

    onDetailCancel() {
      this._detailWindow.deactivate();
      this._listWindow.activate();
    }

    onCommandOk() {
      this._commandWindow.close();
      this._commandWindow.deactivate();
      this._listWindow.refresh();
      this._listWindow.activate();
    }

    onCommandCancel() {
      this._commandWindow.close();
      this._commandWindow.deactivate();
      this._detailWindow.activate();
    }
  }

  window['Scene_Archive'] = Scene_Archive;
  window['destinationManager'] = destinationManager;
})();
