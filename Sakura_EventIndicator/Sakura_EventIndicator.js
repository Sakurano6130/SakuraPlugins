/*:
 * @target MZ
 * @plugindesc イベントに色々なインジケータを表示します
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * イベント上にフキダシや文字を配置したり、接触範囲を拡張したり、場所移動先を表示したりできます。
 *
 * -------------------------------------------------
 * Sakura_EventIndicator
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/09/11 1.0.0 公開
 * -------------------------------------------------
 *
 * プラグインコマンド:
 *
 * 🙈ｲﾝｼﾞｹｰﾀを一時的に隠す:
 * ｲﾝｼﾞｹｰﾀを一時的に隠します。
 *
 * 👀隠したｲﾝｼﾞｹｰﾀを表示:
 * 隠したｲﾝｼﾞｹｰﾀを表示します。
 *
 * 📝ｲﾝｼﾞｹｰﾀの設定:
 * ｲﾝｼﾞｹｰﾀをメモ欄ではなくイベントの中で設定します。
 * イベントの途中で内容を変えたり、ページ毎に異なる表示をしたい場合は
 * こちらを利用ください。
 *
 * 🚫このﾍﾟｰｼﾞではｲﾝｼﾞｹｰﾀを表示しない:
 * このコマンドをイベントリストに入れておくと、そのページでは
 * ｲﾝｼﾞｹｰﾀが表示されません。
 *
 * -------------------------------------------------
 *
 * @param fontSizeForIndicator
 * @text ｲﾝｼﾞｹｰﾀのフォントサイズ
 * @type number
 * @desc ｲﾝｼﾞｹｰﾀのフォントサイズを設定します
 * @default 16
 *
 * @param xOffsetIndicator
 * @text ｲﾝｼﾞｹｰﾀのX軸位置調整
 * @type number
 * @min -9999
 * @max 9999
 * @desc ｲﾝｼﾞｹｰﾀのX軸位置調整を設定します 正の値で右、負の値で左です
 * @default 0
 *
 * @param yOffsetIndicator
 * @text ｲﾝｼﾞｹｰﾀのY軸位置調整
 * @type number
 * @min -9999
 * @max 9999
 * @desc ｲﾝｼﾞｹｰﾀのY軸位置調整を設定します 正の値で下、負の値で上です
 * @default 0
 *
 * @param distanceToShowBubble
 * @text ﾌｷﾀﾞｼが表示されるﾌﾟﾚｲﾔｰとの距離
 * @type number
 * @max 9999
 * @desc ﾌｷﾀﾞｼが表示されるﾌﾟﾚｲﾔｰとの距離を設定します。0だとどんなに離れていても表示されます。
 * @default 5
 *
 * @command hideIndicator
 * @text 🙈ｲﾝｼﾞｹｰﾀを一時的に隠す
 * @desc ｲﾝｼﾞｹｰﾀを一時的に隠します。
 * @arg eventId
 * @text 対象のイベントID
 * @type number
 * @min -1
 * @desc 0はこのイベント、-1はプレイヤー、それ以外はイベントIDになります
 * @default 0
 *
 * @command showIndicator
 * @text 👀隠したｲﾝｼﾞｹｰﾀを表示
 * @desc 隠したｲﾝｼﾞｹｰﾀを表示します。
 * @arg eventId
 * @text 対象のイベントID
 * @type number
 * @min -1
 * @desc 0はこのイベント、-1はプレイヤー、それ以外はイベントIDになります
 * @default 0
 *
 * @command setIndicator
 * @text 📝ｲﾝｼﾞｹｰﾀの設定
 * @desc ｲﾝｼﾞｹｰﾀをイベントの中で設定します。イベントの途中で内容を変えたい場合はこちらを利用ください。対象のイベントIDに-1を指定すると、プレイヤーにもフキダシを出せます。
 * @arg note
 * @text メモ欄の内容
 * @desc 例１）縦線1 赤 「\移動先」　例２）横0 赤 （\移動先）　例３）赤「任意の文字」例４）（任意の文字）
 * @type string
 * @default （任意の文字）
 * @arg eventId
 * @text 対象のイベントID
 * @type number
 * @min -1
 * @desc 0はこのイベント、-1はプレイヤー、それ以外はイベントIDになります
 * @default 0
 *
 * @command clearIndicator
 * @text 🚫このﾍﾟｰｼﾞではｲﾝｼﾞｹｰﾀを表示しない
 * @desc このコマンドをイベントリストの1番最初に入れておくと、そのページの時はｲﾝｼﾞｹｰﾀが表示されません。
 *
 */

(() => {
  const pluginName = 'Sakura_EventIndicator';
  const parameters = PluginManager.parameters(pluginName);
  const fontSizeForIndicator = Number(parameters['fontSizeForIndicator'] || 16);
  const xOffsetIndicator = Number(parameters['xOffsetIndicator'] || 0);
  const yOffsetIndicator = Number(parameters['yOffsetIndicator'] || 0);
  const distanceToShowBubble = Number(parameters['distanceToShowBubble'] || 5);

  const INITIAL_OPACITY = 255;

  /**
   * プラグインコマンドの登録
   * 'hideIndicator' コマンドを登録して、イベントのテキスト表示を一時的に非表示にします。
   */
  PluginManager.registerCommand(pluginName, 'hideIndicator', function (args) {
    const eventId = Number(args.eventId || 0);
    this.character(eventId)._hideIndicator = true;
  });

  /**
   * プラグインコマンドの登録
   * 'showIndicator' コマンドを登録して、非表示にしたテキスト表示を再度表示します。
   */
  PluginManager.registerCommand(pluginName, 'showIndicator', function (args) {
    const eventId = Number(args.eventId || 0);
    this.character(eventId)._hideIndicator = false;
  });

  /**
   * プラグインコマンドの登録
   * 'setIndicator' コマンドを登録して、指定されたテキストを表示します。
   * @param {object} args - コマンド引数
   * @param {string} args.note - 表示するテキストの内容
   */
  PluginManager.registerCommand(pluginName, 'setIndicator', function (args) {
    const note = String(args.note || '');
    if (!note) return;
    const eventId = Number(args.eventId || 0);
    this.character(eventId)._requestCreateIndicator = note;
  });

  // ------------------------------------------------------------------------------- //
  // ■ 共通関数の定義
  // ------------------------------------------------------------------------------- //

  // ファイル操作とパス操作のモジュールをインポート
  const fs = require('fs');
  const path = require('path');

  /**
   * ベースパスを取得する
   * @returns {string} ベースパス
   */
  const getBasePath = () => path.dirname(process.mainModule.filename);

  /**
   * データディレクトリのパスを取得する
   * @returns {string} データディレクトリのパス
   */
  const getDataDirectory = () => path.join(getBasePath(), 'data');

  /**
   * JSONファイルをパースしてオブジェクトに変換する
   * @param {string} filePath - ファイルパス
   * @returns {object} パースされたオブジェクト
   */
  const parseJsonFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  };

  /**
   * イベントの移動先を抽出する
   * @param {object} event - ゲームイベント
   * @returns {string} イベントの移動先
   */
  const getTransferDestinationNameFromEventList = (event) => {
    if (!event) return '';
    if (!(event instanceof Game_Event)) return '';
    for (const { code, parameters } of event?.page()?.list ?? []) {
      const TRANSFER_CODE = 201;
      if (code === TRANSFER_CODE) {
        const [type, mapId] = parameters;
        if (type === 0) {
          const filePath = path.join(
            getDataDirectory(),
            `Map${String(mapId).padStart(3, '0')}.json`
          );
          const mapData = parseJsonFile(filePath);
          const mapName = mapData?.displayName ?? '';
          return mapName || ($dataMapInfos[mapId]?.name ?? '');
        }
      }
    }
    return '';
  };

  const eventListHasClearIndicatorCommand = (event) => {
    if (!event) return false;
    if (!(event instanceof Game_Event)) return false;

    let index = 0;

    for (const { code, parameters } of event?.page()?.list ?? []) {
      if (index > 0) break;
      const PLUGIN_COMMAND_CODE = 357;
      if (code === PLUGIN_COMMAND_CODE) {
        const [eventPluginName, eventPluginCommandName] = parameters;
        if (eventPluginName === pluginName) {
          if (eventPluginCommandName === 'clearIndicator') {
            return true;
          }
        }
      }
      index += 1;
    }
    return false;
  };

  /**
   * HTMLカラー名をRGBA形式に変換する
   * @param {string} colorName - HTMLカラー名
   * @param {number} [alpha=1] - 透明度
   * @returns {string} RGBA形式のカラー文字列
   */
  const htmlColorToRgba = (colorName, alpha = 1) => {
    // HTMLカラー名とその対応するRGB値をマップしたオブジェクト
    const colors = {
      blue: [135, 206, 250], // ライトブルー
      magenta: [255, 182, 193], // ピンク
      green: [144, 238, 144], // ライトグリーン
      purple: [216, 191, 216], // 薄い紫
      red: [255, 160, 122], // ライトサーモン
      white: [255, 255, 255], // 白
      yellow: [255, 255, 224], // ライトイエロー
      orange: [255, 200, 124], // ライトオレンジ
    };

    const defaultColor = [175, 238, 238];

    // 指定されたカラー名がマップに存在するか確認
    const rgb = colors[colorName?.toLowerCase()] ?? defaultColor;
    if (rgb) {
      // RGB値をもとにRGBA形式の文字列を作成
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    }
  };

  /**
   * 全角数字を半角に変換する関数
   * @param {string} str - 変換する文字列
   * @returns {string} 半角に変換された文字列
   */
  const toHalfWidth = (str) =>
    str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));

  /**
   * テキストから縦/横の軸を抽出
   * @param {string} input - テキスト入力
   * @returns {string} 抽出された軸 (X or Y)
   */
  const extractAxis = (input) => {
    const axisMatch = input.match(/(縦|横)/);
    return axisMatch ? (axisMatch[0] === '縦' ? 'Y' : 'X') : '';
  };

  /**
   * テキストから線の長さを抽出
   * @param {string} input - テキスト入力
   * @returns {number|null} 抽出された線の長さ、またはnull
   */
  const extractLineLength = (input) => {
    const lineLengthMatch = input.match(/(縦|横)\s*線?\s*([０-９\d]+)/);
    return lineLengthMatch ? parseInt(toHalfWidth(lineLengthMatch[2]), 10) : null;
  };

  /**
   * テキストから色を抽出
   * @param {string} input - テキスト入力
   * @returns {string} 抽出された色 (デフォルトは 'white')
   */
  const extractLineColor = (input) => {
    const colors = {
      赤: 'red',
      青: 'blue',
      緑: 'green',
      ピンク: 'magenta',
      紫: 'purple',
      黄: 'yellow',
      オレンジ: 'orange',
    };

    for (const [key, value] of Object.entries(colors)) {
      if (input.includes(key)) return value;
    }

    return 'white'; // デフォルトの色
  };

  /**
   * フリーテキストを抽出し、その種類を判定
   * @param {string} input - テキスト入力
   * @returns {object} フリーテキストとその種類 (triangle or bubble)
   */
  const extractFreeText = (input) => {
    const triangleMatch = input.match(/「(.*?)」/);
    const bubbleMatch = input.match(/\（(.*?)\）|\((.*?)\)/);

    if (triangleMatch) {
      return { freeText: triangleMatch[1], textType: 'triangle' };
    } else if (bubbleMatch) {
      return { freeText: bubbleMatch[1] || bubbleMatch[2], textType: 'bubble' };
    }

    return { freeText: '', textType: '' }; // デフォルト値
  };

  /**
   * 移動先の有無を確認
   * @param {string} input - テキスト入力
   * @returns {boolean} 移動先が含まれているかどうか
   */
  const checkShowLocation = (input) => {
    return /(?:\(|（|「)?\\移動先(?:\)|）|」)?(?:$|\s)/.test(input);
  };

  /**
   * テキストからアイコン数字を抽出
   * @param {string} input - テキスト入力
   * @returns {number|null} 抽出されたアイコン数字、またはnull
   */
  const extractIconIndex = (input) => {
    const iconIndexMatch = input.match(/アイコン\s*([０-９\d]+)/);
    return iconIndexMatch ? parseInt(toHalfWidth(iconIndexMatch[1]), 10) : null;
  };

  /**
   * テキストの内容から軸と移動先、その他の情報を抽出する
   * @param {string} input - テキスト入力
   * @returns {object} 抽出された情報のオブジェクト
   */
  const extractIndicatorInfo = (input) => {
    const { freeText, textType } = extractFreeText(input);

    // 「」や()内の文字列を除外
    const strippedInput = input.replace(/「.*?」|\（.*?\）|\(.*?\)/g, '');

    return {
      axis: extractAxis(strippedInput),
      lineLength: extractLineLength(strippedInput),
      showLocation: checkShowLocation(input),
      needsDrawLine: /縦線|横線/.test(strippedInput),
      lineColor: extractLineColor(strippedInput),
      freeText,
      textType,
      iconIndex: extractIconIndex(strippedInput),
    };
  };

  /**
   * ドットラインを描画するメソッド
   * @param {object} options - ライン描画のオプション
   * @param {Bitmap} options.bitmap - 描画対象のビットマップ
   * @param {number} options.x1 - 開始点のX座標
   * @param {number} options.y1 - 開始点のY座標
   * @param {number} options.x2 - 終了点のX座標
   * @param {number} options.y2 - 終了点のY座標
   * @param {string} options.style - ラインのスタイル（LINE or DOT）
   * @param {string} options.colorName - ラインの色
   */
  const drawDotLine = function ({ bitmap, x1, y1, x2, y2, style, colorName }) {
    const context = bitmap._context;
    context.save();

    if (style === 'DOT') {
      // ドットを描く間隔（12px間隔で描画）
      const dotSpacing = 12;
      const dotRadius = 3; // 各ドットの半径

      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const dotCount = Math.floor(distance / dotSpacing);

      for (let i = 0; i <= dotCount; i++) {
        const t = i / dotCount;
        const x = x1 + t * dx;
        const y = y1 + t * dy;

        // 丸いドットを描画
        context.beginPath();
        context.arc(x, y, dotRadius, 0, Math.PI * 2);
        context.fillStyle = htmlColorToRgba(colorName);
        context.fill();
      }
    }

    context.restore();

    bitmap._baseTexture.update(); // 描画を反映
  };

  /**
   * 吹き出しの描画
   * @param {object} args - 吹き出しを描画するためのパラメータ
   * @param {Bitmap} options.bitmap - 描画対象のビットマップ
   * @param {string} args.text - 吹き出しに表示するテキスト
   * @param {number} args.x - 吹き出しのX座標
   * @param {number} args.y - 吹き出しのY座標
   * @param {number} args.padding - 吹き出しの内側余白
   * @param {number} args.radius - 吹き出しの角の半径
   * @param {number} args.tailWidth - 吹き出しのテールの幅
   * @param {number} args.tailHeight - 吹き出しのテールの高さ
   * @param {number} args.maxCharsPerLine - 1行あたりの最大文字数
   * @param {string} args.fontColor - テキストのフォントカラー
   */
  const drawSpeechBubble = ({
    bitmap,
    text,
    x,
    y,
    padding,
    radius,
    tailWidth,
    tailHeight,
    maxCharsPerLine,
    fontColor,
  }) => {
    const context = bitmap.context;
    context.font = `bold ${fontSizeForIndicator}px ${$gameSystem.mainFontFace()}`;

    // テキストを半角 | または全角 ｜ で分割して複数行に
    const lines = text.split(/[|｜]/);
    const lineHeight = fontSizeForIndicator; // 行の高さ

    // 各行の最大幅を計算
    let maxLineWidth = 0;
    lines.forEach((line) => {
      const lineWidth = context.measureText(line).width;
      if (lineWidth > maxLineWidth) {
        maxLineWidth = lineWidth;
      }
    });

    maxLineWidth = Math.max(maxLineWidth, tailWidth + 15); // 最小幅を20pxに設定

    // 吹き出しのサイズを計算
    const bubbleWidth = maxLineWidth + padding * 2;
    const bubbleHeight = lines.length * lineHeight + padding * 2;

    // 吹き出しとテールを描画
    context.beginPath();
    context.moveTo(x + radius - bubbleWidth / 2, y); // 左上角
    context.arcTo(x + bubbleWidth / 2, y, x + bubbleWidth / 2, y + radius, radius); // 右上角
    context.arcTo(
      x + bubbleWidth / 2,
      y + bubbleHeight,
      x + bubbleWidth / 2 - radius,
      y + bubbleHeight,
      radius
    ); // 右下角

    // テールを描画
    const tailPosX = x + bubbleWidth / 2 - bubbleWidth / 2; // 吹き出しの中央にテールを配置
    context.lineTo(tailPosX + tailWidth / 2, y + bubbleHeight); // テール右側
    context.lineTo(tailPosX, y + bubbleHeight + tailHeight); // テールの先端
    context.lineTo(tailPosX - tailWidth / 2, y + bubbleHeight); // テール左側

    context.arcTo(
      x - bubbleWidth / 2,
      y + bubbleHeight,
      x - bubbleWidth / 2,
      y + bubbleHeight - radius,
      radius
    ); // 左下角
    context.arcTo(x - bubbleWidth / 2, y, x + radius - bubbleWidth / 2, y, radius); // 左上角

    // 吹き出しの塗りつぶしと枠線
    context.fillStyle = 'rgba(255,255,255,0.8)'; // 吹き出しの背景色
    context.fill();
    context.strokeStyle = '#000000'; // 枠線の色
    context.lineWidth = 1; // 枠線の太さ
    context.stroke();
    context.closePath(); // パスを閉じる

    // 各行のテキストを吹き出し内に描画
    context.fillStyle = fontColor;
    context.strokeStyle = '#000000'; // アウトラインの色
    context.lineWidth = 3; // アウトラインの太さ

    // テキスト揃えの設定
    context.textAlign = 'center'; // 中央揃え
    context.textBaseline = 'middle'; // 縦方向も中央に揃える

    // 各行のテキストを描画
    lines.forEach((line, i) => {
      const textX = x + bubbleWidth / 2 - bubbleWidth / 2; // テキストを吹き出しの中央に
      const textY = y + padding + lineHeight * (i + 0.5); // 縦方向中央

      // アウトラインを描画
      context.strokeText(line.slice(0, maxCharsPerLine), textX, textY);

      // テキストを描画
      context.fillText(line.slice(0, maxCharsPerLine), textX, textY);
    });
  };

  /**
   * 三角形の吹き出しを描画する関数
   * @param {object} args - 吹き出しを描画するためのパラメータ
   * @param {Bitmap} options.bitmap - 描画対象のビットマップ
   * @param {string} args.text - 吹き出しに表示するテキスト
   * @param {number} args.x - 吹き出しのX座標
   * @param {number} args.y - 吹き出しのY座標
   * @param {number} args.padding - 吹き出しの内側余白
   * @param {number} args.tailWidth - 吹き出しのテールの幅
   * @param {number} args.tailHeight - 吹き出しのテールの高さ
   * @param {number} args.maxCharsPerLine - 1行あたりの最大文字数
   * @param {string} args.fontColor - テキストのフォントカラー
   */
  const drawTriangle = ({
    bitmap,
    text,
    x,
    y,
    padding,
    tailWidth,
    tailHeight,
    maxCharsPerLine,
    fontColor,
  }) => {
    const context = bitmap.context;
    context.font = `bold ${fontSizeForIndicator}px ${$gameSystem.mainFontFace()}`;

    // テキストを半角 | または全角 ｜ で分割して複数行に
    const lines = text.split(/[|｜]/);
    const lineHeight = fontSizeForIndicator; // 行の高さ

    // 各行の最大幅を計算
    let maxLineWidth = 0;
    lines.forEach((line) => {
      const lineWidth = context.measureText(line).width;
      if (lineWidth > maxLineWidth) {
        maxLineWidth = lineWidth;
      }
    });

    maxLineWidth = Math.max(maxLineWidth, 50); // 最小幅を50pxにする

    // 吹き出しのサイズを計算
    const bubbleWidth = maxLineWidth + padding * 2;
    const bubbleHeight = lines.length * lineHeight + padding * 2;

    // テールを描画
    const tailPosX = x + bubbleWidth / 2 - bubbleWidth / 2; // 吹き出しの中央にテールを配置
    context.beginPath();
    context.moveTo(tailPosX + tailWidth / 2, y + bubbleHeight); // 左上角
    context.lineTo(tailPosX, y + bubbleHeight + tailHeight); // テールの先端
    context.lineTo(tailPosX - tailWidth / 2, y + bubbleHeight); // テール左側
    context.lineTo(tailPosX + tailWidth / 2, y + bubbleHeight); // 左上角

    // 吹き出しの塗りつぶしと枠線
    context.fillStyle = 'rgba(255,100,100,0.8)'; // 吹き出しの背景色
    context.fill();
    context.strokeStyle = '#000000'; // 枠線の色
    context.lineWidth = 1; // 枠線の太さ
    context.stroke();
    context.closePath(); // パスを閉じる

    // 各行のテキストを吹き出し内に描画
    context.fillStyle = fontColor;
    context.strokeStyle = '#000000'; // アウトラインの色
    context.lineWidth = 3; // アウトラインの太さ

    // テキスト揃えの設定
    context.textAlign = 'center'; // 中央揃え
    context.textBaseline = 'middle'; // 縦方向も中央に揃える

    // 各行のテキストを描画
    lines.forEach((line, i) => {
      const textX = x + bubbleWidth / 2 - bubbleWidth / 2; // テキストを吹き出しの中央に
      const textY = y + padding + lineHeight * (i + 0.5); // 縦方向中央

      // アウトラインを描画
      context.strokeText(line.slice(0, maxCharsPerLine), textX, textY);

      // テキストを描画
      context.fillText(line.slice(0, maxCharsPerLine), textX, textY);
    });
  };

  const _Spriteset_Map_prototype_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    _Spriteset_Map_prototype_createLowerLayer.call(this);
    this.createIndicatorLayer();
  };

  Spriteset_Map.prototype.createIndicatorLayer = function () {
    this._indicatorLayer = new Sprite();
    this._indicatorLayer.z = 10;
    this._tilemap.addChild(this._indicatorLayer);
  };

  // ------------------------------------------------------------------------------- //
  // ■ Game_CharacterBase, Sprite_Characterに拡張用の初期値をセット
  // ------------------------------------------------------------------------------- //
  const _Game_CharacterBase_prototype_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    _Game_CharacterBase_prototype_initMembers.call(this);
    this._requestCreateIndicator = null; // テキスト作成要求
    this._requestClearIndicator = null; // テキストクリア要求
    this._hideIndicator = null; // テキスト非表示フラグの初期化
  };

  const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
  Sprite_Character.prototype.initialize = function (character) {
    _Sprite_Character_initialize.call(this, character);
    this._lineSprite = null; // ラインスプライトの初期化
    this._lineOpacityDirection = 1; // ラインの不透明度の変化方向
    this._lineOpacitySpeed = 5; // ラインの不透明度の変化速度
    this._hasCustomRange = false; // カスタム範囲が設定されているかどうか
    this._eventPageIndex = null; // イベントページインデックスの初期化
    this._showLocation = null; // 移動先表示フラグの初期化
    this._needsDrawLine = null; // 線表示フラグの初期化
    this._freeText = null; // フリーテキストの初期化
    this._textType = null; // フリーテキスト表示タイプの初期化
    this._textSprite = null; // テキストスプライトの初期化
    this._isNearPlayer = null; // フキダシのとき、プレイヤーの近くにいたらtrueになるフラグを初期化
    this._iconIndex = null; // アイコンインデックスの初期化
    this._iconSprite = null; // アイコンスプライトの初期化
  };

  /**
   * キャラクターがマップ上のキャラクターか（ただし、Game_Vehicleは除外）
   * @returns {boolean} キャラクターがマップ上のキャラクターかどうか
   */
  Sprite_Character.prototype.isNotVehicleCharacter = function () {
    const character = this._character;
    if (character instanceof Game_Vehicle) return false;
    if (character instanceof Game_Event) return true;
    if (character instanceof Game_Player) return true;
    if (character instanceof Game_Follower) return true;
    return false;
  };

  // ------------------------------------------------------------------------------- //
  // ■ Sprite_Character.prototype.createIndicator で使用する関数群
  // ------------------------------------------------------------------------------- //
  /**
   * ラインの長さを設定
   * @param {string} axis - 軸 (XまたはY)
   * @param {number|null} lineLength - ラインの長さ
   * @returns {object} xLineLength, yLineLength のオブジェクト
   */
  const getLineLengths = (axis, lineLength) => {
    const xLineLength = axis === 'X' ? (lineLength === null ? $gameMap.width() : lineLength) : 0;
    const yLineLength = axis === 'Y' ? (lineLength === null ? $gameMap.height() : lineLength) : 0;
    return { xLineLength, yLineLength };
  };

  /**
   * キャラクターのカスタムレンジを設定
   * @param {object} character - キャラクターオブジェクト
   * @param {number} xLineLength - X軸の長さ
   * @param {number} yLineLength - Y軸の長さ
   */
  const setCustomRange = (character, xLineLength, yLineLength) => {
    character._customRange = { width: xLineLength + 0.5, height: yLineLength + 0.5 };
    character._hasCustomRange = true;
  };

  /**
   * 指定されたノートを基に、テキストとラインのスプライトを作成してキャラクターに関連付けます。
   * @param {string} note - イベントノートの内容
   */
  Sprite_Character.prototype.createIndicator = function (note) {
    if (!this.isNotVehicleCharacter()) return;

    // 既存のテキストやラインをクリア
    this.clearIndicator();

    const {
      axis,
      lineLength,
      showLocation,
      needsDrawLine,
      lineColor,
      freeText,
      textType,
      iconIndex,
    } = extractIndicatorInfo(note);

    // テキスト表示フラグを設定
    this._showLocation = showLocation;
    this._needsDrawLine = needsDrawLine;
    this._freeText = freeText;
    this._textType = textType;
    this._exTextTextColorName = lineColor; // テキストの色を設定
    this._iconIndex = iconIndex;

    // フリーテキストを表示
    if (freeText) {
      this.createTextOnEvent(freeText, textType);
    }

    // アイコン表示を表示
    if (iconIndex) {
      this.createIconOnEvent(iconIndex);
    }

    // 移動先表示
    if (showLocation) {
      // イベントリスト内に場所移動があれば、移動先の名前を取得
      const locationName = getTransferDestinationNameFromEventList(this._character);
      if (!locationName) return;
      this.createTextOnEvent(locationName, this._textType);
    }

    // 縦横の指定がなければここで終了
    if (!axis) return;

    // 軸の設定に基づいてラインの長さを設定
    const { xLineLength, yLineLength } = getLineLengths(axis, lineLength);

    // キャラクターのカスタムレンジを設定
    setCustomRange(this._character, xLineLength, yLineLength);

    // ラインスプライトの作成
    if (needsDrawLine) {
      // ラインの描画スタイルを設定
      const style = needsDrawLine ? 'DOT' : 'NOLINE';
      this.createLineSprite(xLineLength, yLineLength, axis, style, lineColor);
    }
  };

  /**
   * イベントにテキストを表示するメソッド
   * @param {string} text - 表示するテキスト
   * @param {string} type - 表示タイプ 'location' | 'eventName' | 'freeText'
   */
  Sprite_Character.prototype.createTextOnEvent = function (text, type) {
    if (!this.isNotVehicleCharacter()) return;

    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();

    // テキストを描画するスプライトを作成
    const textSprite = new Sprite();
    const bitmap = new Bitmap(tileWidth * 8, tileHeight * 5); // テキストを描画するビットマップ

    // 吹き出しのパラメータを設定
    const bubbleX = bitmap.width / 2; // 吹き出しの左上のX座標
    const bubbleY = bitmap.height / 2 - tileHeight + 20; // 吹き出しの左上のY座標
    const padding = 5; // テキストと吹き出しの内側の間隔
    const bubbleRadius = 10; // 吹き出しの角の半径
    const tailWidth = 20; // 吹き出しの尾の幅
    const tailHeight = 8; // 吹き出しの尾の高さ
    const maxCharsPerLine = 20; // 1行あたりの最大文字数

    // 吹き出しを描画
    const args = {
      bitmap,
      text,
      x: bubbleX,
      y: bubbleY,
      padding,
      radius: bubbleRadius,
      tailWidth,
      tailHeight,
      maxCharsPerLine,
      fontColor: htmlColorToRgba(this._exTextTextColorName),
    };

    if (type === 'triangle') {
      drawTriangle(args); // 三角形のテールのみ描画
    } else {
      drawSpeechBubble(args); // 吹き出しを描画
    }

    textSprite.bitmap = bitmap;

    // イベントの位置にスプライトを配置
    textSprite.x = 0 + xOffsetIndicator;
    textSprite.y = 0;
    textSprite.anchor.x = 0.5;
    textSprite.anchor.y = 0.5;

    this._textSprite = textSprite;

    // ここで indicatorLayer にスプライトを追加
    SceneManager._scene._spriteset._indicatorLayer.addChild(this._textSprite);
  };

  Sprite_Character.prototype.createIconOnEvent = function (iconIndex) {
    const bitmap = ImageManager.loadSystem('IconSet');
    const onLoad = () => {
      const iconSprite = new Sprite(bitmap);
      const w = 32;
      const h = 32;
      iconSprite.anchor.x = 0.5;
      iconSprite.anchor.y = 1.0;
      const index = iconIndex;
      const sx = (index % 16) * 32;
      const sy = Math.floor(index / 16) * 32;
      iconSprite.setFrame(sx, sy, w, h);
      this._iconSprite = iconSprite;
      this.addChild(this._iconSprite);
    };
    bitmap.addLoadListener(onLoad.bind(this));
  };

  /**
   * ラインスプライトを作成
   * @param {number} xLineLength - X軸のラインの長さ
   * @param {number} yLineLength - Y軸のラインの長さ
   * @param {string} axis - X または Y 軸
   * @param {string} style - ラインのスタイル
   * @param {string} colorName - ラインの色
   */
  Sprite_Character.prototype.createLineSprite = function (
    xLineLength,
    yLineLength,
    axis,
    style,
    colorName
  ) {
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const lengthX = xLineLength ? Number(xLineLength) * 2 : 0;
    const lengthY = yLineLength ? Number(yLineLength) * 2 : 0;
    const realWidth = Math.max(lengthX * tileWidth + tileWidth, tileWidth);
    const realHeight = Math.max(lengthY * tileHeight + tileHeight, tileHeight);

    this._lineSprite = new Sprite(new Bitmap(realWidth, realHeight));
    this._lineSprite.anchor.x = 0.5;
    this._lineSprite.anchor.y = 0.5;
    this._lineSprite.y -= tileHeight / 2; // ラインの位置を調整

    if (axis === 'X') {
      drawDotLine({
        bitmap: this._lineSprite.bitmap,
        x1: 0,
        y1: realHeight / 2,
        x2: realWidth,
        y2: realHeight / 2,
        style,
        colorName,
      });
    }

    if (axis === 'Y') {
      drawDotLine({
        bitmap: this._lineSprite.bitmap,
        x1: realWidth / 2,
        y1: 0,
        x2: realWidth / 2,
        y2: realHeight,
        style,
        colorName,
      });
    }

    this._lineSprite.opacity = INITIAL_OPACITY; // 初期の透明度
    this.addChild(this._lineSprite); // キャラクターの後ろに線を表示
  };

  /**
   * @remarks コアスクリプトでは Sprite_Character.prototype.updateVisibilityでのみ使用
   * これをいれないとグラフィックが指定されていないイベントがisEmptyCharacterとみなされて
   * 表示されない。
   */
  const _Sprite_Character_prototype_isEmptyCharacter = Sprite_Character.prototype.isEmptyCharacter;
  Sprite_Character.prototype.isEmptyCharacter = function () {
    const originalIsEmpty = _Sprite_Character_prototype_isEmptyCharacter.call(this);
    return (
      originalIsEmpty &&
      !this._hasCustomRange &&
      !this._showLocation &&
      !this._freeText &&
      !this._needsDrawLine &&
      !this._iconIndex
    );
  };

  /**
   * updateに独自メソッドを追加
   */
  const _Sprite_Character_prototype_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function () {
    _Sprite_Character_prototype_update.call(this);
    this.updateIndicator();
  };

  /**
   * 各スプライト（ライン、テキスト）の表示位置や透明度を更新するメソッド
   */
  Sprite_Character.prototype.updateIndicator = function () {
    this.checkNearPlayer();
    this.updateIndicatorVisible();
    this.updateCreateIndicator();
    this.updateIndicatorLineOpacity();
    this.updateTextSpritePosition();
    this.updateIconSpritePosition();
  };

  /**
   * テキストやラインの表示状態を更新するメソッド
   * opacityを徐々に変化させるように修正
   */
  Sprite_Character.prototype.checkNearPlayer = function () {
    if (!this._freeText) return;
    if (!this.isNotVehicleCharacter()) return;
    if (this._textType !== 'bubble') return;
    this._isNearPlayer =
      distanceToShowBubble === 0 ? true : this._character.checkNearPlayer(distanceToShowBubble);
  };

  /**
   * 目標の透明度を取得
   * @param {"bubble"|"triangle"} textType
   * @param {boolean} hideIndicator
   * @param {boolean} isNearPlayer
   * @returns
   */
  const getTargetOpacity = (textType, hideIndicator, isNearPlayer) => {
    if (hideIndicator) return 0;
    if (textType === 'triangle') return 255;
    return isNearPlayer ? 255 : 0;
  };

  /**
   * テキストやラインの表示状態を更新するメソッド
   * opacityを徐々に変化させるように修正
   */
  Sprite_Character.prototype.updateIndicatorVisible = function () {
    // 目標の透明度
    const targetOpacity = getTargetOpacity(
      this._textType,
      this._character._hideIndicator,
      this._isNearPlayer
    );

    // 透明度が変わる速度
    const fadeSpeed = 10;

    if (this._textSprite) {
      // 現在の透明度と目標透明度の差を徐々に埋める
      if (this._textSprite.opacity < targetOpacity) {
        this._textSprite.opacity = Math.min(this._textSprite.opacity + fadeSpeed, targetOpacity);
      } else if (this._textSprite.opacity > targetOpacity) {
        this._textSprite.opacity = Math.max(this._textSprite.opacity - fadeSpeed, targetOpacity);
      }
    }
  };

  /**
   * イベントのノートを返す。
   * @returns note
   */
  const getEventNote = function () {
    if (this._character instanceof Game_Event) {
      return this._character.event()?.note ?? '';
    }
    return '';
  };

  /**
   * イベントノートに基づいてテキストやラインの作成・更新を行うメソッド
   */
  Sprite_Character.prototype.updateCreateIndicator = function () {
    if (!this.isNotVehicleCharacter()) return;

    // イベントページインデックスやリクエストの状態を確認
    if (
      this._eventPageIndex === this._character._pageIndex &&
      this._character._requestCreateIndicator === null &&
      this._character._requestClearIndicator === null
    ) {
      return;
    }

    // ページインデックスを更新
    this._eventPageIndex = this._character._pageIndex;

    // テキストクリアのプラグインコマンドがイベントリスト内に置かれているか確認
    if (eventListHasClearIndicatorCommand(this._character)) {
      this.clearIndicator(); // テキストやラインをクリア
      return;
    }

    // テキストクリア要求があるか確認
    if (this._character._requestClearIndicator) {
      this._character._requestClearIndicator = null;
      this.clearIndicator(); // テキストやラインをクリア
      return;
    }

    // イベントノートからテキストを作成
    const note = this._character._requestCreateIndicator ?? getEventNote.call(this);
    this._character._requestCreateIndicator = null;
    this.createIndicator(note);
  };

  /**
   * クリア時に既存のテキストスプライトとラインスプライトを消去するメソッド
   */
  Sprite_Character.prototype.clearIndicator = function () {
    if (this._lineSprite) this._lineSprite.bitmap.clear();
    if (this._textSprite) this._textSprite.bitmap.clear();
    if (this._iconSprite) this._iconSprite.bitmap.clear();
  };

  /**
   * ラインの透明度を更新して明滅させるメソッド
   */
  Sprite_Character.prototype.updateIndicatorLineOpacity = function () {
    if (!this._lineSprite) return;
    // 不透明度を変化させて明滅させる
    this._lineSprite.opacity += this._lineOpacityDirection * this._lineOpacitySpeed;

    // 透明度が0以下または初期値を超えた場合、方向を逆転させる
    if (this._lineSprite.opacity <= 0 || this._lineSprite.opacity >= INITIAL_OPACITY) {
      this._lineOpacityDirection *= -1;
    }
  };

  /**
   * テキストスプライトの位置を更新するメソッド
   */
  Sprite_Character.prototype.updateTextSpritePosition = function () {
    if (!this._textSprite) return;

    const fontSize = this._textSprite.bitmap.fontSize;
    const tileHeight = $gameMap.tileHeight();
    let y = this._character.characterName() ? -this.patternHeight() - fontSize + 10 : -tileHeight; // テキストの位置を調整

    if (this._character.y < 1) {
      y += tileHeight;
    }

    // キャラクターと同期する位置にテキストスプライトを配置
    this._textSprite.x = this.x + xOffsetIndicator;
    this._textSprite.y = this.y + y + yOffsetIndicator;
  };

  /**
   * アイコンスプライトの位置を更新するメソッド
   */
  Sprite_Character.prototype.updateIconSpritePosition = function () {
    if (!this._iconSprite) return;

    // 現在のアイコンスプライトの基本Y位置を設定（初期位置）
    const baseY = 0 - this.patternHeight(); // アイコンスプライトをキャラクターの上に表示

    // アニメーションを制御する変数 (フレームごとに値を変動させる)
    const animationSpeed = 0.05; // 動作の速さを調整（値が小さいほどゆっくり）
    const amplitude = 3; // 上下移動するピクセル数

    // フレームの進行に基づき、sin波を使って上下に移動させる
    const offsetY = Math.sin(Graphics.frameCount * animationSpeed) * amplitude;

    // アイコンスプライトの位置を更新
    this._iconSprite.x = 0;
    this._iconSprite.y = baseY + offsetY;
  };

  // ------------------------------------------------------------------------------- //
  // ■ 接触範囲拡張に関する処理
  // ------------------------------------------------------------------------------- //

  /**
   * マップ上の指定された座標に存在するイベントを取得するメソッドを拡張します。
   * カスタム範囲が設定されたイベントにも対応します。
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @returns {Game_Event[]} 指定された座標に存在するイベントの配列
   */
  const _Game_Map_prototype_eventsXyNt = Game_Map.prototype.eventsXyNt;
  Game_Map.prototype.eventsXyNt = function (x, y) {
    const events = _Game_Map_prototype_eventsXyNt.call(this, x, y);
    if (events.length > 0) {
      return events;
    }
    // カスタム範囲が設定されたイベントをフィルタリングして取得
    return this.events().filter((event) => event.posNtInCustomRange(x, y));
  };

  /**
   * 指定された座標に存在するかどうかをカスタム範囲で判定します。
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @returns {boolean} 指定された座標に存在するかどうか
   */
  Game_CharacterBase.prototype.posNtInCustomRange = function (x, y) {
    return this.posInCustomRange(x, y) && !this.isThrough();
  };

  /**
   * 指定された座標がカスタム範囲内に存在するかを判定します。
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @returns {boolean} 指定された座標がカスタム範囲内に存在するか
   */
  Game_CharacterBase.prototype.posInCustomRange = function (x, y) {
    if (!this._customRange) {
      return this.pos(x, y);
    }
    // カスタム範囲内かどうかを判定する
    return (
      this._x + this._customRange.width >= x &&
      this._x - this._customRange.width <= x &&
      this._y + this._customRange.height >= y &&
      this._y - this._customRange.height <= y
    );
  };

  /**
   * プレイヤーがマップイベントを開始する際の処理を拡張します。
   * カスタム範囲内にあるイベントも対象とします。
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @param {number[]} triggers - イベントトリガーの種類
   * @param {boolean} normal - 通常優先度かどうか
   */
  const _Game_Player_prototype_startMapEvent = Game_Player.prototype.startMapEvent;
  Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
    _Game_Player_prototype_startMapEvent.call(this, x, y, triggers, normal);
    if (!$gameMap.isEventRunning()) {
      // カスタム範囲内にあるイベントを処理
      for (const event of $gameMap.eventsXyInCustomRange(x, y)) {
        if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
          event.start();
        }
      }
    }
  };

  /**
   * 指定された座標のカスタム範囲内にあるイベントを取得するメソッド
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @returns {Game_Event[]} カスタム範囲内にあるイベントの配列
   */
  Game_Map.prototype.eventsXyInCustomRange = function (x, y) {
    return this.events().filter((event) => event.posInCustomRange(x, y));
  };

  /**
   * このイベントとプレイヤーの距離が範囲内か確認する関数
   * イベントコマンドの条件分岐で使用できる関数です
   * @param {number} range - プレイヤーとの距離（デフォルト5）
   * @returns
   */
  Game_CharacterBase.prototype.checkNearPlayer = function (range = 5) {
    if (isNaN(range)) false;
    const character = this;
    const sx = Math.abs(character.deltaXFrom($gamePlayer.x));
    const sy = Math.abs(character.deltaYFrom($gamePlayer.y));
    return sx + sy < range;
  };

  // ------------------------------------------------------------------------------- //
  // ■ おまけ
  // ------------------------------------------------------------------------------- //
  /**
   * このイベントとプレイヤーの距離が範囲内か確認する関数
   * イベントコマンドの条件分岐で使用できる関数です
   * @param {number} range - プレイヤーとの距離（デフォルト5）
   * @returns
   */
  Game_Interpreter.prototype.isNearPlayer = function (range = 5) {
    return this.character(0).checkNearPlayer(range);
  };
})();
