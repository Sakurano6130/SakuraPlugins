/*:
 * @target MZ
 * @plugindesc キーボードガイドを自由に出せるプラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 *
 * @help
 * キーボードガイドウィンドウを表示するプラグインです。
 *
 * -------------------------------------------------
 * Sakura_FreeKeyboardGuide
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2025/05/10 2.1.0 クリックなし表示、マウスホイールのハイライト機能を追加
 * 2025/05/09 2.0.0 マウスアイコンの表示ができるように
 * 2024/10/03 1.2.0 表示するウィンドウの幅と高さを指定できるように
 * 2024/09/18 1.1.1 プラグインパラメータの説明文の誤り修正（処理変更なし）
 * 2024/09/18 1.1.0 表示できるSceneを拡大。
 *                  外部ﾌﾟﾗｸﾞｲﾝ等任意のSceneでも表示できるように。（ただしそのﾌﾟﾗｸﾞｲﾝ次第
 *                  なのでｴﾗｰになる可能性はあります）
 *                  イベント実行中にも表示するか選択できる機能追加
 * 2024/09/09 1.0.2 ツクールのシステム設定で、画面の幅・高さとUIエリアの幅・高さが
 *                  異なる設定をしている場合の位置を調整。
 * 2024/09/02 1.0.1 デフォルト値変更
 * 2024/09/02 1.0.0 公開
 * 2024/09/02 0.5.0 ほぼ形に
 * 2024/08/31 0.0.1 作成
 * -------------------------------------------------
 *
 *
 * シーンごとにキーとその説明を定義し、スイッチで表示/非表示を制御することが
 * できます。
 *
 * 同じシーン名に複数設定がある場合、それぞれが独立して表示されます。
 *
 * また、メッセージウィンドウ内で \BTN[ボタン名]
 * を使用してボタンを描画する機能もついています。
 *
 * 利用方法:
 *
 * - キーボードガイドウィンドウを表示させるには、SceneKeysでシーンごとの設定を
 *   行い、指定したスイッチをONにしてください。
 *
 * - メッセージウィンドウ内で \BTN[ボタン名] を使用すると、指定したボタンが描画
 *   されます。
 *
 * @param SceneKeys
 * @text シーン別キー設定
 * @type struct<SceneKeySetting>[]
 * @desc 各シーンにおけるキーとその説明を定義します。設定されたスイッチによって表示内容が変わります。
 * @default ["{\"SceneName\":\"Scene_Map\",\"KeyDescriptions\":\"[\\\"{\\\\\\\"KeyName\\\\\\\":\\\\\\\"←\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"TriggerKey\\\\\\\":\\\\\\\"ArrowLeft\\\\\\\"}\\\",\\\"{\\\\\\\"KeyName\\\\\\\":\\\\\\\"↑\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"TriggerKey\\\\\\\":\\\\\\\"ArrowUp\\\\\\\"}\\\",\\\"{\\\\\\\"KeyName\\\\\\\":\\\\\\\"→\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"TriggerKey\\\\\\\":\\\\\\\"ArrowRight\\\\\\\"}\\\",\\\"{\\\\\\\"KeyName\\\\\\\":\\\\\\\"↓\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"移動\\\\\\\",\\\\\\\"TriggerKey\\\\\\\":\\\\\\\"ArrowDown\\\\\\\"}\\\",\\\"{\\\\\\\"KeyName\\\\\\\":\\\\\\\"Enter\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"決定/アクション\\\\\\\",\\\\\\\"TriggerKey\\\\\\\":\\\\\\\"Enter\\\\\\\"}\\\",\\\"{\\\\\\\"KeyName\\\\\\\":\\\\\\\"Esc\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"メニューを開く\\\\\\\",\\\\\\\"TriggerKey\\\\\\\":\\\\\\\"Escape\\\\\\\"}\\\"]\",\"WindowPosition\":\"left-bottom\",\"WindowOffsetX\":\"0\",\"WindowOffsetY\":\"0\",\"WindowWidth\":\"0\",\"WindowHeight\":\"0\",\"ShowDimmer\":\"true\",\"GameSwitch\":\"\",\"showIfEventRunning\":\"false\"}"]
 *
 * @param GlobalHideSwitch
 * @text 全体非表示スイッチ
 * @type switch
 * @desc このスイッチがONの時、キーボードガイドウィンドウを非表示にします。
 * @default 0
 *
 * @param FontSize
 * @text フォントサイズ
 * @type number
 * @min 10
 * @max 40
 * @desc ボタンの文字のフォントサイズです。
 * @default 16
 *
 * @param ButtonTextColor
 * @text ボタンの文字の色
 * @type string
 * @desc ボタンの文字の色です。
 * @default #FFFFFF
 *
 * @param ButtonEdgeColor
 * @text ボタンの外枠の色
 * @type string
 * @desc ボタンの外枠の色です。
 * @default #808080
 *
 * @param ButtonInnerColor
 * @text ボタンの内側の色
 * @type string
 * @desc ボタンの内側の色です。
 * @default #333333
 *
 * @param ButtonHeight
 * @text ボタンの高さ
 * @type number
 * @min 0
 * @max 40
 * @desc ボタンの高さです。
 * @default 32
 *
 * @param ButtonPaddingX
 * @text ボタンのX軸内側余白
 * @type number
 * @min -40
 * @max 40
 * @desc ボタンのX軸内側余白です。
 * @default 8
 *
 * @param ButtonPaddingY
 * @text ボタンのY軸内側余白
 * @type number
 * @min -40
 * @max 40
 * @desc ボタンのY軸内側余白です。
 * @default 2
 *
 * @param ButtonMarginX
 * @text ボタンと説明の間の余白
 * @type number
 * @min -40
 * @max 40
 * @desc ボタンと説明の間の余白です。
 * @default 14
 *
 * @param ButtonOffsetYInWindowMessage
 * @text メッセージ内ボタンYオフセット
 * @type number
 * @min -40
 * @max 40
 * @desc ﾒｯｾｰｼﾞｳｨﾝﾄﾞｳ内でﾎﾞﾀﾝを描画する際のY軸のｵﾌｾｯﾄ。正の値で下、負の値で上。別ﾌﾟﾗｸﾞｲﾝでﾙﾋﾞを振る際に高さ調整してください。
 * @default 0
 *
 * @param ButtonNameOffsetYInWindowMessage
 * @text メッセージ内ボタンの中のテキストYオフセット
 * @type number
 * @min -40
 * @max 40
 * @desc ﾎﾞﾀﾝ内のﾃｷｽﾄを描画する際のY軸のｵﾌｾｯﾄ。正の値で下に、負の値で上に。ﾌｫﾝﾄによって真ん中に収まらない場合に調整してください。
 * @default 0
 *
 */

/*~struct~SceneKeySetting:
 * @param SceneName
 * @text シーン名
 * @desc キーボードガイドを表示するシーン名を選択します。（選択肢以外の場合は、テキストから直接入力してください）
 * @type select
 * @option Scene_Map
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Battle
 * @option Scene_Shop
 * @option Scene_Title
 * @option Scene_Load
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_GameEnd
 *
 * @param KeyDescriptions
 * @text キーと説明のペア
 * @type struct<KeyDescriptionPair>[]
 * @desc このスイッチがオンの時に表示するキーとその説明を定義します。
 *
 * @param WindowPosition
 * @text ウィンドウ位置
 * @desc キーボードガイドウィンドウの画面内の位置を指定します。
 * @type select
 * @option 左下
 * @value left-bottom
 * @option 右下
 * @value right-bottom
 * @option 左上
 * @value left-top
 * @option 右上
 * @value right-top
 * @default left-bottom
 *
 * @param WindowOffsetX
 * @text ウィンドウXオフセット
 * @type number
 * @min -9999
 * @max 9999
 * @desc キーボードガイドウィンドウのX軸のオフセット。正の値で右に、負の値で左に移動します。
 * @default 0
 *
 * @param WindowOffsetY
 * @text ウィンドウYオフセット
 * @type number
 * @min -9999
 * @max 9999
 * @desc キーボードガイドウィンドウのY軸のオフセット。正の値で下に、負の値で上に移動します。
 * @default 0
 *
 * @param WindowWidth
 * @text ウィンドウ幅
 * @type number
 * @min 0
 * @max 9999
 * @desc キーボードガイドウィンドウの幅。0だと自動調整されます
 * @default 0
 *
 * @param WindowHeight
 * @text ウィンドウ高さ
 * @type number
 * @min 0
 * @max 9999
 * @desc キーボードガイドウィンドウの高さ。0だと自動調整されます
 * @default 0
 *
 * @param ShowDimmer
 * @text 背景を暗くするか
 * @type boolean
 * @desc 背景を暗くするかどうかを設定します。
 * @default true
 *
 * @param GameSwitch
 * @text スイッチID
 * @type switch
 * @desc この設定を有効にするゲームスイッチのIDです。
 *
 * @param showIfEventRunning
 * @text イベント実行中も表示するか
 * @type boolean
 * @desc ﾃﾞﾌｫﾙﾄはｲﾍﾞﾝﾄ実行中非表示にします。これをtrueにするとイベント実行中であっても表示します。
 * @default false
 */

/*~struct~KeyDescriptionPair:
 * @param keyboard
 * @text ｷｰﾎﾞｰﾄﾞ表示 ---
 *
 * @param KeyName
 * @parent keyboard
 * @text 表示するキー
 * @desc 表示するキー（例: "M"）
 *
 * @param TriggerKey
 * @parent keyboard
 * @text クリックされたときにトリガーするキー
 * @desc クリックされたときにトリガーするキー
 * @default なし
 * @type select
 * @option なし
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option A
 * @option B
 * @option C
 * @option D
 * @option E
 * @option F
 * @option G
 * @option H
 * @option I
 * @option J
 * @option K
 * @option L
 * @option M
 * @option N
 * @option O
 * @option P
 * @option Q
 * @option R
 * @option S
 * @option T
 * @option U
 * @option V
 * @option W
 * @option X
 * @option Y
 * @option Z
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 * @option ArrowLeft
 * @option ArrowUp
 * @option ArrowRight
 * @option ArrowDown
 * @option Shift
 * @option Ctrl
 * @option Alt
 * @option CapsLock
 * @option Tab
 * @option Enter
 * @option Escape
 * @option Space
 * @option Backspace
 * @option Insert
 * @option Delete
 * @option Home
 * @option End
 * @option PageUp
 * @option PageDown
 * @option NumLock
 * @option PrintScreen
 * @option ScrollLock
 * @option PauseBreak
 * @option LeftWindows
 * @option RightWindows
 * @option ContextMenu
 * @option Numpad0
 * @option Numpad1
 * @option Numpad2
 * @option Numpad3
 * @option Numpad4
 * @option Numpad5
 * @option Numpad6
 * @option Numpad7
 * @option Numpad8
 * @option Numpad9
 * @option NumpadMultiply
 * @option NumpadAdd
 * @option NumpadEnter
 * @option NumpadSubtract
 * @option NumpadDecimal
 * @option NumpadDivide
 * @option Semicolon
 * @option Equal
 * @option Comma
 * @option Minus
 * @option Period
 * @option Slash
 * @option Backslash
 * @option Quote
 * @option BracketLeft
 * @option BracketRight
 *
 * @param mouse
 * @text ﾏｳｽ表示(ﾏｳｽを指定するとﾏｳｽ表示優先になります) ---
 *
 * @param MouseIcon
 * @parent mouse
 * @text ﾏｳｽｱｲｺﾝ
 * @type select
 * @default none
 * @option 表示しない
 * @value none
 * @option 左ｸﾘｯｸを表示
 * @value leftClick
 * @option 右ｸﾘｯｸを表示
 * @value rightClick
 * @option ｸﾘｯｸなし表示
 * @value noClick
 * @option ﾏｳｽﾎｲｰﾙ表示
 * @value wheel
 *
 * @param MouseIconScale
 * @parent mouse
 * @text ﾏｳｽｱｲｺﾝのｻｲｽﾞ(1.0が標準)
 * @type number
 * @default 1.0
 * @decimals 1
 *
 * @param MouseIconOffsetX
 * @parent mouse
 * @text ﾏｳｽｱｲｺﾝのｵﾌｾｯﾄX
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param MouseIconOffsetY
 * @parent mouse
 * @text ﾏｳｽｱｲｺﾝのｵﾌｾｯﾄY
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @param Description
 * @text 説明
 * @desc キーの機能に関する説明です。
 *
 */

(() => {
  const pluginName = 'Sakura_FreeKeyboardGuide';

  const parameters = PluginManager.parameters(pluginName);
  const sceneKeySettings = JSON.parse(parameters['SceneKeys'] || '[]').map((setting) => {
    const parsedSetting = JSON.parse(setting);
    return {
      sceneName: parsedSetting.SceneName,
      keyDescriptions: JSON.parse(parsedSetting.KeyDescriptions || '[]').map((keyDesc) =>
        JSON.parse(keyDesc)
      ),
      windowPosition: parsedSetting.WindowPosition || 'left-bottom',
      windowOffsetX: Number(parsedSetting.WindowOffsetX || 0),
      windowOffsetY: Number(parsedSetting.WindowOffsetY || 0),
      windowWidth: Number(parsedSetting.WindowWidth || 0),
      windowHeight: Number(parsedSetting.WindowHeight || 0),
      showDimmer: String(parsedSetting.ShowDimmer) === 'true',
      gameSwitch: Number(parsedSetting.GameSwitch || 0),
      showIfEventRunning: String(parsedSetting.showIfEventRunning) === 'true',
    };
  });
  const fontSize = Number(parameters['FontSize'] || 16);
  const buttonEdgeColor = String(parameters['ButtonEdgeColor'] || 'grey');
  const buttonInnerColor = String(parameters['ButtonInnerColor'] || '#333333');
  const buttonTextColor = String(parameters['ButtonTextColor'] || '#FFFFFF');
  const buttonMarginX = Number(parameters['ButtonMarginX'] || 10);
  const buttonMarginY = 26;
  const buttonPaddingX = Number(parameters['ButtonPaddingX'] || 8);
  const buttonPaddingY = Number(parameters['ButtonPaddingY'] || 2);
  const buttonCornerRadius = Number(parameters['ButtonCornerRadius'] || 6);
  const buttonHeight = Number(parameters['ButtonHeight'] || 32);
  const globalHideSwitch = Number(parameters['GlobalHideSwitch'] || 0);
  const buttonNameOffsetYInWindowMessage = Number(
    parameters['ButtonNameOffsetYInWindowMessage'] || 0
  );
  const buttonOffsetYInWindowMessage = Number(parameters['ButtonOffsetYInWindowMessage'] || 0);

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

  function drawMouseIcon(contents, x, y, scale = 1, clickType = 'noClick') {
    const ctx = contents.context;

    // ==== 定数定義 ====
    const BASE_SIZE = 32;
    const MOUSE_WIDTH = BASE_SIZE * scale;
    const MOUSE_HEIGHT = BASE_SIZE * scale;
    const RADIUS = MOUSE_WIDTH / 2;
    const LINE_WIDTH = 1.5 * scale;

    const OUTLINE_ARC = 10 * scale;
    const EDGE_MARGIN = 2 * scale;

    const WHEEL_WIDTH = 4 * scale;
    const WHEEL_HEIGHT = 7 * scale;
    const WHEEL_RADIUS = 1.5 * scale;
    const WHEEL_OFFSET_Y = 4 * scale;

    const COLOR_BODY = '#FFFFFF';
    const COLOR_CLICK = '#DBA901';
    const COLOR_BORDER = '#000000';

    // ==== 描画開始 ====
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = COLOR_BORDER;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // 背景（本体）
    ctx.fillStyle = COLOR_BODY;
    ctx.beginPath();
    ctx.moveTo(RADIUS - OUTLINE_ARC, MOUSE_HEIGHT / 2);
    ctx.quadraticCurveTo(RADIUS - OUTLINE_ARC, EDGE_MARGIN, RADIUS, EDGE_MARGIN);
    ctx.quadraticCurveTo(RADIUS + OUTLINE_ARC, EDGE_MARGIN, RADIUS + OUTLINE_ARC, MOUSE_HEIGHT / 2);
    ctx.quadraticCurveTo(
      RADIUS + OUTLINE_ARC,
      MOUSE_HEIGHT - EDGE_MARGIN,
      RADIUS,
      MOUSE_HEIGHT - EDGE_MARGIN
    );
    ctx.quadraticCurveTo(
      RADIUS - OUTLINE_ARC,
      MOUSE_HEIGHT - EDGE_MARGIN,
      RADIUS - OUTLINE_ARC,
      MOUSE_HEIGHT / 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 左クリックハイライト
    if (clickType === 'leftClick') {
      ctx.fillStyle = COLOR_CLICK;
      ctx.beginPath();
      ctx.moveTo(RADIUS - OUTLINE_ARC, MOUSE_HEIGHT / 2);
      ctx.quadraticCurveTo(RADIUS - OUTLINE_ARC, EDGE_MARGIN, RADIUS, EDGE_MARGIN);
      ctx.lineTo(RADIUS, MOUSE_HEIGHT / 2);
      ctx.closePath();
      ctx.fill();
    }

    // 右クリックハイライト
    if (clickType === 'rightClick') {
      ctx.fillStyle = COLOR_CLICK;
      ctx.beginPath();
      ctx.moveTo(RADIUS, EDGE_MARGIN);
      ctx.quadraticCurveTo(
        RADIUS + OUTLINE_ARC,
        EDGE_MARGIN,
        RADIUS + OUTLINE_ARC,
        MOUSE_HEIGHT / 2
      );
      ctx.lineTo(RADIUS, MOUSE_HEIGHT / 2);
      ctx.closePath();
      ctx.fill();
    }

    // 中央縦線
    ctx.beginPath();
    ctx.moveTo(RADIUS, EDGE_MARGIN);
    ctx.lineTo(RADIUS, MOUSE_HEIGHT / 2 - 0.5 * scale);
    ctx.stroke();

    // 水平線
    ctx.beginPath();
    ctx.moveTo(RADIUS - OUTLINE_ARC, MOUSE_HEIGHT / 2);
    ctx.lineTo(RADIUS + OUTLINE_ARC, MOUSE_HEIGHT / 2);
    ctx.stroke();

    // ホイール（角丸長方形）
    const wheelX = RADIUS - WHEEL_WIDTH / 2;
    const wheelY = MOUSE_HEIGHT / 2 - WHEEL_HEIGHT / 2 - WHEEL_OFFSET_Y;

    if (clickType === 'wheel') {
      ctx.fillStyle = COLOR_CLICK;
    }

    ctx.beginPath();
    ctx.moveTo(wheelX + WHEEL_RADIUS, wheelY);
    ctx.lineTo(wheelX + WHEEL_WIDTH - WHEEL_RADIUS, wheelY);
    ctx.quadraticCurveTo(wheelX + WHEEL_WIDTH, wheelY, wheelX + WHEEL_WIDTH, wheelY + WHEEL_RADIUS);
    ctx.lineTo(wheelX + WHEEL_WIDTH, wheelY + WHEEL_HEIGHT - WHEEL_RADIUS);
    ctx.quadraticCurveTo(
      wheelX + WHEEL_WIDTH,
      wheelY + WHEEL_HEIGHT,
      wheelX + WHEEL_WIDTH - WHEEL_RADIUS,
      wheelY + WHEEL_HEIGHT
    );
    ctx.lineTo(wheelX + WHEEL_RADIUS, wheelY + WHEEL_HEIGHT);
    ctx.quadraticCurveTo(
      wheelX,
      wheelY + WHEEL_HEIGHT,
      wheelX,
      wheelY + WHEEL_HEIGHT - WHEEL_RADIUS
    );
    ctx.lineTo(wheelX, wheelY + WHEEL_RADIUS);
    ctx.quadraticCurveTo(wheelX, wheelY, wheelX + WHEEL_RADIUS, wheelY);
    ctx.closePath();

    if (clickType === 'wheel') {
      ctx.fill();
    }
    ctx.stroke();

    ctx.restore();
  }

  /**
   * 角丸の矩形を描画するための関数
   * @param {CanvasRenderingContext2D} context - キャンバスの描画コンテキスト
   * @param {number} x - 矩形の左上のX座標
   * @param {number} y - 矩形の左上のY座標
   * @param {number} width - 矩形の幅
   * @param {number} height - 矩形の高さ
   * @param {number} radius - 角の丸みの半径
   * @param {string} color - 塗りつぶしの色
   */
  const drawRoundedRectToContext = (context, x, y, width, height, radius, color) => {
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
    context.fillStyle = color;
    context.fill();
  };

  /**
   * ボタンの形状を描画する関数
   * @param {Bitmap} contents - 描画先のビットマップ
   * @param {number} x - 描画するX座標
   * @param {number} y - 描画するY座標
   * @param {number} buttonWidth - ボタンの幅
   * @param {number} buttonHeight - ボタンの高さ
   * @param {number} buttonCornerRadius - ボタンの角の丸みの半径
   */
  const drawButtonShapeToContents = (
    contents,
    x,
    y,
    buttonWidth,
    buttonHeight,
    buttonCornerRadius
  ) => {
    const context = contents.context;
    // ボタンの影の部分を描画
    drawRoundedRectToContext(
      context,
      x + 2,
      y + 2,
      buttonWidth,
      buttonHeight,
      buttonCornerRadius,
      'rgba(0, 0, 0, 0.7)'
    );
    // ボタンの外枠を描画
    drawRoundedRectToContext(
      context,
      x,
      y,
      buttonWidth,
      buttonHeight,
      buttonCornerRadius,
      buttonEdgeColor
    );
    // ボタンの内部を描画
    drawRoundedRectToContext(
      context,
      x + 2,
      y + 2,
      buttonWidth - 4,
      buttonHeight - 4,
      buttonCornerRadius - 2,
      buttonInnerColor
    );
    // 光部分を描画
    contents.paintOpacity = 120;
    contents.fillRect(x, y, buttonWidth, 8, 'rgba(255, 255, 255, 0.2)');
    contents.paintOpacity = 255;
  };

  const KEY_CODES = {
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    CapsLock: 20,
    Tab: 9,
    Enter: 13,
    Escape: 27,
    Space: 32,
    Backspace: 8,
    Insert: 45,
    Delete: 46,
    Home: 36,
    End: 35,
    PageUp: 33,
    PageDown: 34,
    NumLock: 144,
    PrintScreen: 44,
    ScrollLock: 145,
    PauseBreak: 19,
    LeftWindows: 91,
    RightWindows: 92,
    ContextMenu: 93,
    Numpad0: 96,
    Numpad1: 97,
    Numpad2: 98,
    Numpad3: 99,
    Numpad4: 100,
    Numpad5: 101,
    Numpad6: 102,
    Numpad7: 103,
    Numpad8: 104,
    Numpad9: 105,
    NumpadMultiply: 106,
    NumpadAdd: 107,
    NumpadEnter: 108,
    NumpadSubtract: 109,
    NumpadDecimal: 110,
    NumpadDivide: 111,
    Semicolon: 186,
    Equal: 187,
    Comma: 188,
    Minus: 189,
    Period: 190,
    Slash: 191,
    Backslash: 220,
    Quote: 222,
    BracketLeft: 219,
    BracketRight: 221,
  };

  /**
   * キーマネージャークラス
   * キーの登録、位置検索、およびトリガーを管理
   */
  class KeyManager {
    constructor() {
      this.keys = {};
    }

    /**
     * 登録されたすべてのキーをクリアするメソッド
     */
    clearKeys() {
      this.keys = {};
    }

    /**
     * キーを登録するメソッド
     * @param {string} triggerKey - トリガーキーの名前
     * @param {number} absX - ボタンのX座標
     * @param {number} absY - ボタンのY座標
     * @param {number} width - ボタンの幅
     * @param {number} height - ボタンの高さ
     */
    registerKey(triggerKey, absX, absY, width, height) {
      const positionKey = [absX, absY, width, height].join(',');
      this.keys[positionKey] = triggerKey;
    }

    /**
     * 座標位置に基づいてキー名を検索するメソッド
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @returns {string|null} 見つかったキー名、またはnull
     */
    findKeyNameByPosition(x, y) {
      for (const [positionKey, keyName] of [...Object.entries(this.keys)].reverse()) {
        const [buttonX, buttonY, buttonWidth, buttonHeight] = positionKey.split(',');
        const numButtonX = Number(buttonX);
        const numButtonY = Number(buttonY);
        const numButtonWidth = Number(buttonWidth);
        const numButtonHeight = Number(buttonHeight);
        if (
          x >= numButtonX &&
          x <= numButtonX + numButtonWidth &&
          y >= numButtonY &&
          y <= numButtonY + numButtonHeight
        ) {
          return keyName;
        }
      }
      return null;
    }

    /**
     * 入力キー名に対応する最初のキーコードを検索するメソッド
     * @param {string} value - 入力されたキー名
     * @returns {number|null} 見つかったキーコード、またはnull
     */
    findFirstKeyCodeFromInputKeyMapper(value) {
      const uppercaseValue = value.toUpperCase();
      for (const key in KEY_CODES) {
        if (key.toUpperCase() === uppercaseValue) {
          return Number(KEY_CODES[key]);
        }
      }
      return null; // 見つからなかった場合
    }

    /**
     * 座標位置に基づいて登録されたキーイベントをトリガーするメソッド
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @returns {boolean} イベントがトリガーされたかどうか
     */
    triggerKeyEventByPosition(x, y) {
      const keyName = this.findKeyNameByPosition(x, y);
      if (!keyName) return false;
      const keyCode = this.findFirstKeyCodeFromInputKeyMapper(keyName);
      if (!keyCode) return false;
      this.onKeyDown(keyCode);
      return true;
    }

    /**
     * キーダウンイベントをシミュレートするメソッド
     * @param {number} keyCode - トリガーするキーのコード
     */
    onKeyDown(keyCode) {
      const buttonName = Input.keyMapper[keyCode];
      if (buttonName) {
        Input._currentState[buttonName] = true;
        setTimeout(() => {
          Input._currentState[buttonName] = false;
        }, 100); // 100ミリ秒後にキーを離す
      }
    }
  }

  const keyManager = new KeyManager();

  /**
   * キーボードガイドウィンドウのクラス
   * @extends {Window_Base}
   */
  class Window_InputKeyGuide extends Window_Base {
    /**
     * キーボードガイドウィンドウの初期化
     * @param {String} position - ウィンドウの位置 (left-bottom, right-bottom, left-top, right-top)
     * @param {number} offsetX - X座標のオフセット
     * @param {number} offsetY - Y座標のオフセット
     * @param {number} fixedWidth - 指定された幅
     * @param {number} fixedHeight - 指定された高さ
     * @param {Array} keyDescriptions - キーとその説明のリスト
     * @param {boolean} showDimmer - 背景を暗くするか
     * @param {number} gameSwitchForVisible - 表示/非表示を制御するゲームスイッチID
     * @param {boolean} showIfEventRunning - イベント実行中も表示するか
     */
    initialize(
      position,
      offsetX,
      offsetY,
      fixedWidth,
      fixedHeight,
      keyDescriptions,
      showDimmer,
      gameSwitchForVisible,
      showIfEventRunning
    ) {
      const { uiMarginX, uiMarginY } = getMarginOfUIArea();

      this._position = position;
      this._offsetX = offsetX;
      this._offsetY = offsetY;
      this._fixedWidth = fixedWidth;
      this._fixedHeight = fixedHeight;
      this._keyDescriptions = keyDescriptions;
      this._showDimmer = showDimmer;
      this._gameSwitchForVisible = gameSwitchForVisible;
      this._showIfEventRunning = showIfEventRunning;
      const rect = new Rectangle(-uiMarginX, -uiMarginY, Graphics.width, this.windowHeight()); // 初期の幅はGraphics.widthを使用
      super.initialize(rect);
      this.opacity = 0;
      this.visible = false;
      this._initialized = false;
      this.refresh();
    }

    /**
     * ウィンドウの内容を再描画するメソッド
     */
    refresh() {
      this.contents.clear();

      this.contents.fontSize = fontSize;

      // 必要なウィンドウ幅を計算し、再設定する
      this.move(
        this.calculateXPosition(),
        this.calculateYPosition(),
        this.windowWidth(),
        this.windowHeight()
      );

      let x = 0;
      const y = 0;
      const adjustedTextY = y - this.itemPadding() + 4 + buttonPaddingY;

      this._keyDescriptions.forEach((keyDesc) => {
        const {
          MouseIcon: clickType = 'none',
          MouseIconScale: mouseIconScale = 1,
          MouseIconOffsetX: mouseIconOffsetX = 0,
          MouseIconOffsetY: mouseIconOffsetY = 0,
          KeyName: keyName,
          Description: description,
        } = keyDesc;

        const triggerKey = keyDesc.TriggerKey === 'なし' ? '' : keyDesc.TriggerKey;

        const textWidth = this.textWidth(keyName);
        const buttonWidth = textWidth + buttonPaddingX * 2;

        if (clickType !== 'none') {
          // マウスの描画
          drawMouseIcon(
            this.contents,
            x + mouseIconOffsetX,
            y + mouseIconOffsetY,
            mouseIconScale,
            clickType
          );
        } else {
          // ボタンの描画
          drawButtonShapeToContents(
            this.contents,
            x,
            y,
            buttonWidth,
            buttonHeight,
            buttonCornerRadius
          );

          // keyManagerへの登録
          keyManager.registerKey(
            triggerKey,
            this.x + this.padding + x,
            this.y + this.padding + y,
            buttonWidth,
            buttonHeight
          );

          this.contents.textColor = buttonTextColor;
          this.drawText(
            keyName,
            x + buttonPaddingX,
            adjustedTextY,
            buttonWidth - buttonPaddingX * 2,
            'center'
          );
        }

        if (description) {
          x += buttonWidth + buttonMarginX;

          const descriptionWidth = this.textWidth(description) + buttonMarginX;
          this.drawText(description, x, adjustedTextY, descriptionWidth, 'left');
          x += descriptionWidth + buttonMarginX;
        } else {
          x += buttonWidth;
        }
      });

      if (this._showDimmer) {
        this.showBackgroundDimmer();
      } else {
        this.hideBackgroundDimmer();
      }
      this._initialized = true;
    }

    /**
     * ウィンドウの幅を計算するメソッド
     * @returns {number} - ウィンドウの幅
     */
    windowWidth() {
      // 指定された幅がある場合はそれを返す
      if (this._fixedWidth) {
        return this._fixedWidth;
      }

      let width = 0;

      this._keyDescriptions.forEach((keyDesc) => {
        width += this.textWidth(keyDesc.KeyName);
        +buttonPaddingX * 2 + buttonMarginX;

        const descriptionWidth = this.textWidth(keyDesc.Description) + buttonMarginX;
        width += descriptionWidth + buttonMarginX;
      });

      return width;
    }

    /**
     * ウィンドウの高さを計算するメソッド
     * @returns {number} - ウィンドウの高さ
     */
    windowHeight() {
      // 指定された高さがある場合はそれを返す
      if (this._fixedHeight) {
        return this._fixedHeight;
      }

      return buttonHeight + buttonMarginY;
    }

    /**
     * ウィンドウのX座標を計算するメソッド
     * @returns {number} - ウィンドウのX座標
     */
    calculateXPosition() {
      const { uiMarginX } = getMarginOfUIArea();

      if (['left-bottom', 'left-top'].includes(this._position)) {
        return -uiMarginX + this._offsetX;
      }
      return -uiMarginX + Graphics.width - this.windowWidth() + this._offsetX;
    }

    /**
     * ウィンドウのY座標を計算するメソッド
     * @returns {number} - ウィンドウのY座標
     */
    calculateYPosition() {
      const { uiMarginY } = getMarginOfUIArea();

      if (['left-top', 'right-top'].includes(this._position)) {
        return -uiMarginY + this._offsetY;
      }
      return -uiMarginY + Graphics.height - this.windowHeight() + this._offsetY;
    }

    /**
     * 毎フレームの更新処理
     */
    update() {
      super.update();

      if (!this._initialized) {
        this.refresh();
      }

      if ($gameSwitches.value(globalHideSwitch)) {
        this.visible = false;
        return;
      }

      if (this._gameSwitchForVisible && $gameSwitches.value(this._gameSwitchForVisible) === false) {
        this.visible = false;
        return;
      }

      if (!this._showIfEventRunning && $gameMap.isEventRunning()) {
        this.visible = false;
        return;
      }

      this.visible = true;
    }
  }

  /**
   * 各シーンでキーボードガイドウィンドウを作成する関数
   * @param {Scene_Base} scene - シーンオブジェクト
   */
  function createKeyboardHelpWindowsForScene(scene) {
    // keyManager初期化
    keyManager.clearKeys();

    scene._keyboardHelpWindows = [];
    const sceneName = SceneManager._scene.constructor.name;

    const sceneSettings = sceneKeySettings.filter((setting) => setting.sceneName === sceneName);

    if (sceneSettings.length === 0) return;

    for (const sceneSetting of sceneSettings) {
      const windowPosition = sceneSetting.windowPosition || 'left-bottom';
      const windowOffsetX = sceneSetting.windowOffsetX || 0;
      const windowOffsetY = sceneSetting.windowOffsetY || 0;
      const windowWidth = sceneSetting.windowWidth || 0;
      const windowHeight = sceneSetting.windowHeight || 0;
      const keyDescriptions = sceneSetting.keyDescriptions;
      const showDimmer = sceneSetting.showDimmer;
      const gameSwitchForVisible = sceneSetting.gameSwitch;
      const showIfEventRunning = sceneSetting.showIfEventRunning;

      const window = new Window_InputKeyGuide(
        windowPosition,
        windowOffsetX,
        windowOffsetY,
        windowWidth,
        windowHeight,
        keyDescriptions,
        showDimmer,
        gameSwitchForVisible,
        showIfEventRunning
      );

      scene._keyboardHelpWindows.push(window);
      scene.addWindow(window);
    }
  }

  /**
   * マップシーンでのボタンクリックをチェックするメソッド
   * @returns {boolean} クリックがトリガーされたかどうか
   */
  const checkButtonClick = () => {
    if (TouchInput.isPressed()) {
      const x = TouchInput.x;
      const y = TouchInput.y;
      const { uiMarginX, uiMarginY } = getMarginOfUIArea();
      const triggered = keyManager.triggerKeyEventByPosition(x - uiMarginX, y - uiMarginY);
      return triggered;
    }
    return false;
  };

  // Scene_Mapは、クリックで移動してしまうことを防ぐため他のSceneとは別の処理を行う
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    createKeyboardHelpWindowsForScene(this);
  };

  const _Scene_Map_prototype_onMapTouch = Scene_Map.prototype.onMapTouch;
  Scene_Map.prototype.onMapTouch = function () {
    const buttonClicked = checkButtonClick(); // ボタンがクリックされたかどうかをチェック
    if (!buttonClicked) {
      _Scene_Map_prototype_onMapTouch.call(this);
    }
  };

  // シーン名のリストをユニークにする関数
  const uniqueSceneNames = (sceneNames) => [...new Set(sceneNames)];
  const targetSceneNames = sceneKeySettings.map((sceneKeySetting) => sceneKeySetting.sceneName);
  const uniqueTargetSceneNames = uniqueSceneNames(targetSceneNames);

  // Scene_Map以外はScene_Baseのstartメソッドにフック
  const _Scene_Base_start = Scene_Base.prototype.start;
  Scene_Base.prototype.start = function () {
    _Scene_Base_start.call(this);
    const sceneName = SceneManager._scene.constructor.name;
    // プラグインパラメータで指定されたシーンかどうかを確認
    // Scene_Mapは上で特殊処理を行っているので除外
    if (sceneName !== 'Scene_Map' && uniqueTargetSceneNames.includes(sceneName)) {
      createKeyboardHelpWindowsForScene(this);
    }
  };

  const _Scene_Base_update = Scene_Base.prototype.update;
  Scene_Base.prototype.update = function () {
    _Scene_Base_update.call(this);
    const sceneName = SceneManager._scene.constructor.name;
    // プラグインパラメータで指定されたシーンかどうかを確認
    // Scene_Mapは上で特殊処理を行っているので除外
    if (sceneName !== 'Scene_Map' && uniqueTargetSceneNames.includes(sceneName)) {
      checkButtonClick();
    }
  };

  /**
   * メッセージウィンドウ内で制御文字 \BTN[ボタン名] を使用してカスタムボタンを描画
   * @param {string} code - 制御文字のコード
   * @param {Object} textState - テキストステートオブジェクト
   */
  const _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function (code, textState) {
    switch (code) {
      case 'BTN':
        const buttonName = this.obtainButtonNameParam(textState);
        this.processButtonDraw(buttonName, textState);
        break;
      default:
        _Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  /**
   * メッセージウィンドウ内のボタン名を取得するためのメソッド
   * @param {Object} textState - テキストステートオブジェクト
   * @returns {string} ボタン名
   */
  Window_Message.prototype.obtainButtonNameParam = function (textState) {
    const regExp = /^\[([^\]]+)\]/;
    const arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return '';
    }
  };

  /**
   * メッセージウィンドウ内にカスタムボタンを描画
   * @param {string} buttonName - ボタン名
   * @param {Object} textState - テキストステートオブジェクト
   */
  Window_Message.prototype.processButtonDraw = function (buttonName, textState) {
    const originalFontSize = this.contents.fontSize;
    const originalTextColor = this.contents.textColor;
    const originalOutlineColor = this.contents.outlineColor;

    this.contents.fontSize = fontSize;
    this.contents.textColor = buttonTextColor;
    this.contents.outlineColor = ColorManager.outlineColor();

    const textWidth = this.textWidth(buttonName);
    const buttonWidth = textWidth + buttonPaddingX * 2;
    const x = textState.x;

    const y = textState.y + this.itemPadding() + buttonOffsetYInWindowMessage - 4;
    const adjustedTextY =
      y - this.itemPadding() + 4 + buttonPaddingY + buttonNameOffsetYInWindowMessage;

    // ボタンの描画
    drawButtonShapeToContents(this.contents, x, y, buttonWidth, buttonHeight, buttonCornerRadius);

    this.drawText(
      buttonName,
      x + buttonPaddingX,
      adjustedTextY,
      buttonWidth - buttonPaddingX * 2,
      'center'
    );
    this.contents.fontSize = originalFontSize;
    this.contents.textColor = originalTextColor;
    this.contents.outlineColor = originalOutlineColor;

    // テキストの位置をボタン分右に移動
    textState.x += buttonWidth;
  };
})();
