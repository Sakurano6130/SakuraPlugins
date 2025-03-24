/*:
 * @target MZ
 * @plugindesc マップ名表示をちょっといい感じにします。
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * マップ名表示をちょっといい感じにします。
 *
 * -------------------------------------------------
 * Sakura_MapNameExtend
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2025/03/24 1.1.0 メイン行とサブ行で異なるフォントを指定できる機能を追加
 * 2024/12/17 1.0.6 ブラウザ版で ReferenceError: require is not defined のエラーが出ないように修正
 * 2024/09/25 1.0.5 マップ名非表示スイッチとイベントコマンドの「マップ名表示」を
 *                  OFFにしたときの動きが同じになるように。ただしスイッチの設定が優先
 * 2024/09/23 1.0.4 マップ名非表示スイッチを追加
 * 2024/09/09 1.0.3 ツクールのシステム設定で、画面の幅・高さとUIエリアの幅・高さが
 *                  異なる設定をしている場合の位置を調整。
 * 2024/09/07 1.0.2 メニューなどから戻ってきた場合に再表示されていたため修正
 * 2024/09/04 1.0.1 1行しかなかった場合の表示を若干修正
 * 2024/09/03 1.0.0 公開
 * -------------------------------------------------
 *
 * 主な機能:
 * - マップ名表示をちょっといい感じにします。
 * - マップ設定の表示名を|（半角）で区切ると、メイン行とサブ行の2行に分けて
 *   表示されます。
 *
 * 独自のフォントを使用したい場合:
 * 1. プロジェクトフォルダ直下のfontsフォルダに、使用したいフォントの
 *    .ttfファイルを入れます。
 * 2. プラグインの設定のパラメータで、使用したいフォント名を指定します。
 *    （.ttfまで含めたファイル名を指定します。）
 *
 * 使用方法:
 * 1. マップ設定の表示名を|（半角）で区切ると、メイン行とサブ行の2行に分けて表示されます。
 * 例）首都リディアス・中央通り|Central Avenue of Lydiaus, the Capital
 *    |を入れなければ1行で表示されます。
 *
 * @param mapNamePosition
 * @text マップ表示の位置
 * @desc マップ表示を表示する位置（中央、左上、右上、左下、右下から選択）
 * @type select
 * @option 中央
 * @value center
 * @option 左上
 * @value topLeft
 * @option 右上
 * @value topRight
 * @option 左下
 * @value bottomLeft
 * @option 右下
 * @value bottomRight
 * @default center
 *
 * @param mapNameTextX
 * @text マップ表示X座標
 * @desc マップ表示の表示位置（X座標）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param mapNameTextY
 * @text マップ表示Y座標
 * @desc マップ表示の表示位置（Y座標）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param fontFile
 * @desc 使用するメインのフォントのファイル名
 * @text メインのフォントファイル名
 * @type string
 * @default
 *
 * @param subFontFile
 * @desc 2行目に使用するフォントのファイル名(指定しない場合はメインと同じになります)
 * @text サブのフォントファイル名
 * @type string
 * @default
 *
 * @param mainFontSize
 * @text メインのフォントサイズ
 * @desc メインのフォントサイズ
 * @type number
 * @min 10
 * @max 50
 * @default 30
 *
 * @param mainFontColor
 * @text メインのフォント色
 * @desc メインのフォント色
 * @type color
 * @default 6
 *
 * @param subFontSize
 * @text サブのフォントサイズ
 * @desc サブのフォントサイズ
 * @type number
 * @min 10
 * @max 50
 * @default 16
 *
 * @param subFontColor
 * @text サブのフォント色
 * @desc サブのフォント色
 * @type color
 * @default 0
 *
 * @param fadeDuration
 * @text フェードイン・フェードアウトの時間
 * @desc フェードイン・フェードアウトの時間
 * @type number
 * @min 10
 * @max 360
 * @default 60
 *
 * @param holdDuration
 * @text 表示が制止する時間
 * @desc 表示が制止する時間
 * @type number
 * @min 10
 * @max 360
 * @default 180
 *
 * @param moveDistance
 * @text フェードイン/アウト時の移動距離
 * @desc フェードイン/アウト時の移動距離
 * @type number
 * @min 0
 * @max 120
 * @default 30
 *
 * @param hideSwitch
 * @text マップ名非表示スイッチ
 * @desc このスイッチがオンになっているとき、マップ名を表示しません。イベントコマンドの「マップ名表示」よりも優先されます。
 * @type switch
 * @default 0
 *
 * @param needsOutputMaps
 * @text マップ表示名一覧データを書き出すかどうか
 * @desc これをtrueにして、テストプレイを実行するとプロジェクトフォルダ直下に「mapsData.txt」というファイルが出力されます
 * @type boolean
 * @default false
 *
 */

(() => {
  const pluginName = 'Sakura_MapNameExtend';
  const parameters = PluginManager.parameters(pluginName);

  // マップ名の表示位置の設定
  const mapNamePosition = String(parameters['mapNamePosition'] || 'topLeft');
  const mapNameTextX = Number(parameters['mapNameTextX'] || 40);
  const mapNameTextY = Number(parameters['mapNameTextY'] || 0);
  const fontFile = String(parameters.fontFile || '');
  const subFontFile = String(parameters.subFontFile || '');
  const mainFontSize = Number(parameters.mainFontSize || 30);
  const mainFontColor = Number(parameters.mainFontColor || 0);
  const subFontSize = Number(parameters.subFontSize || 16);
  const subFontColor = Number(parameters.subFontColor || 0);
  const fadeDuration = Number(parameters['fadeDuration'] || 60); // フェードイン・フェードアウトの時間
  const holdDuration = Number(parameters['holdDuration'] || 180); // 表示が制止する時間
  const moveDistance = Number(parameters['moveDistance'] || 30); // フェードイン/アウト時の移動距離
  const hideSwitch = Number(parameters.hideSwitch || 0);

  const needsOutputMaps = String(parameters['needsOutputMaps']) === 'true';

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

  // ファイル操作とパス操作のモジュールをインポート
  let fs, path;
  if (typeof require !== 'undefined' && Utils.isNwjs()) {
    fs = require('fs');
    path = require('path');
  }

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
   * ディレクトリ内のJSONファイルを取得する
   * @param {string} directory - ディレクトリパス
   * @returns {string[]} JSONファイルのリスト
   */
  const getJsonFiles = (directory) =>
    fs.readdirSync(directory).filter((file) => /^Map\d+\.json$/.test(file));

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
   * 抽出されたマップデータを保存する
   * @param {string[]} resultList - 抽出されたマップデータのリスト
   */
  const saveMapData = (resultList) => {
    const header = ['mapId', 'mapName', 'displayName'];
    const outputFilePath = path.join(getBasePath(), 'mapsData.txt');
    const outputData = [header.join(','), ...resultList].join('\n');
    fs.writeFileSync(outputFilePath, outputData);
  };

  /**
   * マップデータを処理し、保存する
   */
  const processMapData = () => {
    const dataDirectory = getDataDirectory();
    const jsonFiles = getJsonFiles(dataDirectory);

    const resultList = jsonFiles.map((file) => {
      const mapData = parseJsonFile(path.join(dataDirectory, file));
      const { displayName } = mapData;
      const mapId = parseInt(file.match(/Map(\d+)/)?.[1], 10);
      const mapInfo = $dataMapInfos[mapId];
      const { name } = mapInfo;
      return [String(mapId).padStart(3, '0'), name, displayName].join(',');
    });

    saveMapData(resultList);
  };

  // データベースがロードされた後の処理を拡張
  const _Scene_Boot_prototype_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function () {
    _Scene_Boot_prototype_onDatabaseLoaded.call(this);
    if (!Utils.isOptionValid('test') || !needsOutputMaps) return;
    processMapData();
  };

  /**
   * ウィンドウの位置を更新する関数
   * マップ名の表示位置に応じてウィンドウの座標を設定します。
   */
  Window_MapName.prototype.updatePosition = function () {
    const width = this.width;
    const height = this.height;
    const { uiMarginX, uiMarginY } = getMarginOfUIArea();

    switch (mapNamePosition) {
      case 'topLeft':
        this.x = -uiMarginX + mapNameTextX;
        this.y = -uiMarginY + mapNameTextY;
        break;
      case 'topRight':
        this.x = -uiMarginX + Graphics.width - width + mapNameTextX;
        this.y = -uiMarginY + +mapNameTextY;
        break;
      case 'bottomLeft':
        this.x = -uiMarginX + mapNameTextX;
        this.y = -uiMarginY + Graphics.height - height + mapNameTextY;
        break;
      case 'bottomRight':
        this.x = -uiMarginX + Graphics.width - width + mapNameTextX;
        this.y = -uiMarginY + Graphics.height - height + mapNameTextY;
        break;
      case 'center':
      default:
        this.x = -uiMarginX + Math.floor((Graphics.width - width) / 2) + mapNameTextX;
        this.y = -uiMarginY + Math.floor((Graphics.height - height) / 2) + mapNameTextY;
        break;
    }
  };

  // Window_MapNameの初期化をオーバーライド
  const _Window_MapName_initialize = Window_MapName.prototype.initialize;
  /**
   * ウィンドウの初期化を行う関数
   * @param {Rectangle} rect - ウィンドウの表示領域を示す矩形
   */
  Window_MapName.prototype.initialize = function (rect) {
    _Window_MapName_initialize.call(this, rect);
    this.opacity = 0; // ウィンドウの透明度を0に設定
    this.updatePosition(); // ウィンドウの位置を更新
    this._initialX = this.x; // 初期X座標を保存
    this._phase = 0; // フェーズ管理: 0 = フェードイン, 1 = 制止, 2 = フェードアウト
    this._fadeTimer = 0; // タイマーの初期化
    this._started = false;
    this._lastHideSwitchOn = false;
    this._lastIsNameDisplayEnabled = true;
  };

  const _Window_MapName_prototype_open = Window_MapName.prototype.open;
  Window_MapName.prototype.open = function () {
    _Window_MapName_prototype_open.call(this);
    this._started = true;
  };

  Window_MapName.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.updateMapNameVisible();
    if (this._started && $gameMap.isNameDisplayEnabled()) {
      this.updateFade();
    }
  };

  Window_MapName.prototype.updateMapNameVisible = function () {
    const resetPhaseAndTimer = function () {
      this._phase = 0; // フェーズ管理: 0 = フェードイン, 1 = 制止, 2 = フェードアウト
      this._fadeTimer = 0; // タイマーの初期化
      this._started = false;
    }.bind(this);

    // スイッチがオンの場合は、常に非表示を優先
    if ($gameSwitches.value(hideSwitch)) {
      this._lastHideSwitchOn = true;
      if (this.visible) {
        this.visible = false;
        this.close();
        resetPhaseAndTimer();
      }
      // スイッチがオンの場合は、ここで処理を終える
      return;
    }

    // スイッチがオフの場合は通常の表示処理
    if (this._lastHideSwitchOn) {
      this._lastHideSwitchOn = false;
      this.close();
      resetPhaseAndTimer();
      this.visible = true;
      this.open();
    }

    // マップ名表示が無効の場合は非表示
    if (!$gameMap.isNameDisplayEnabled()) {
      this._lastIsNameDisplayEnabled = false;
      if (this.visible) {
        this.visible = false;
        this.close();
        resetPhaseAndTimer();
      }
    } else {
      if (!this._lastIsNameDisplayEnabled) {
        this._lastIsNameDisplayEnabled = true;
        this.close();
        resetPhaseAndTimer();
        this.visible = true;
        this.open();
      }
    }
  };

  Window_MapName.prototype.updateFade = function () {
    if (this._phase === 0) {
      // フェードイン
      this._fadeTimer++;
      this.contentsOpacity = (this._fadeTimer / fadeDuration) * 255;
      this.x = this._initialX - moveDistance * (1 - this._fadeTimer / fadeDuration);
      if (this._fadeTimer >= fadeDuration) {
        this._fadeTimer = 0;
        this._phase = 1;
        this.x = this._initialX; // 元の位置に戻す
      }
    } else if (this._phase === 1) {
      // 制止
      this._fadeTimer++;
      if (this._fadeTimer >= holdDuration) {
        this._fadeTimer = 0;
        this._phase = 2;
      }
    } else if (this._phase === 2) {
      // フェードアウト
      this._fadeTimer++;
      this.contentsOpacity = 255 - (this._fadeTimer / fadeDuration) * 255;
      this.x = this._initialX + moveDistance * (this._fadeTimer / fadeDuration);
      if (this._fadeTimer >= fadeDuration) {
        this._fadeTimer = 0;
        this._phase = 3;
        this.close(); // フェードアウト後ウィンドウを閉じる
      }
    }
  };

  /**
   * フォント設定をリセットする関数
   * マップ名の表示に使用するフォントとフォントサイズを設定します。
   */
  Window_MapName.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mapNameFontFace();
    this.contents.fontSize = mainFontSize;
    this.resetTextColor();
  };

  /**
   * フォント設定(2行目用)をリセットする関数
   * マップ名の表示に使用するフォントとフォントサイズを設定します。
   */
  Window_MapName.prototype.resetSubFontSettings = function () {
    if (!subFontFile) return;
    this.contents.fontFace = $gameSystem.mapNamefont2Face();
    this.contents.fontSize = subFontSize;
    this.resetTextColor();
  };

  /**
   * drawTextExの中でresetFontSettingsが呼ばれることを防ぐため、
   * 致し方なくオーバーライドする
   */
  Window_MapName.prototype.drawTextEx = function (text, x, y, width) {
    // this.resetFontSettings();
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
  };

  /**
   * textSizeExの中でresetFontSettingsが呼ばれることを防ぐため、
   * 致し方なくオーバーライドする
   */
  Window_MapName.prototype.textSizeEx = function (text) {
    // this.resetFontSettings();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.drawing = false;
    this.processAllText(textState);
    return { width: textState.outputWidth, height: textState.outputHeight };
  };

  // Window_MapNameのリフレッシュをオーバーライドして幅と高さを自動計算
  /**
   * ウィンドウのリフレッシュを行う関数
   * 表示するマップ名のテキストの幅と高さを自動的に計算し、ウィンドウサイズを調整します。
   */
  Window_MapName.prototype.refresh = function () {
    this.contents.clear();
    if ($gameMap.displayName()) {
      const [mainName, subName] = $gameMap.displayName().split('|') || ['', ''];

      const mainText = `\\FS[${mainFontSize}]\\C[${mainFontColor}]${mainName}`;
      const subText = subName
        ? `\\FS[${subFontSize}]\\C[${subFontColor}]- ${subName} \\C[${subFontColor}]-`
        : '';

      this.resetFontSettings();
      const { width: mainTextWidth, height: mainTextHeight } = this.textSizeEx(mainText);

      this.resetSubFontSettings();
      const { width: subTextWidth, height: subTextHeight } = subText
        ? this.textSizeEx(subText)
        : { width: 0, height: 0 };

      // ウィンドウの幅と高さを計算
      const marginX = 100;
      const width = Math.max(mainTextWidth, subTextWidth) + this.padding * 2 + marginX * 2;
      const height = mainTextHeight + subTextHeight + this.padding * (subName ? 2 : 4);

      // ウィンドウの位置を再計算して配置
      this.width = width;
      this.height = height;
      this.updatePosition();

      // 背景の描画
      this.drawBackground(0, 0, width, height);

      // テキストの描画
      let mainTextX, subTextX;
      switch (mapNamePosition) {
        case 'topLeft':
        case 'bottomLeft':
          mainTextX = this.padding;
          subTextX = this.padding;
          break;
        case 'topRight':
        case 'bottomRight':
          mainTextX = width - this.padding * 2 - mainTextWidth;
          subTextX = width - this.padding * 2 - subTextWidth;
          break;
        case 'center':
        default:
          mainTextX = (width - this.padding * 2 - mainTextWidth) / 2;
          subTextX = (width - this.padding * 2 - subTextWidth) / 2;
          break;
      }

      this.resetFontSettings();
      console.log(this.contents.fontFace);
      this.drawTextEx(mainText, mainTextX, 0);
      this.drawGradientLine(0, mainTextHeight, width, 2);
      if (subName) {
        this.resetSubFontSettings();
        console.log(this.contents.fontFace);
        this.drawTextEx(subText, subTextX, 0 + mainTextHeight);
      }
    }
  };

  /**
   * 透明から不透明へ、再び透明へと変化する線を描画する関数
   * @param {number} x - 描画開始位置のX座標
   * @param {number} y - 描画開始位置のY座標
   * @param {number} width - 線の幅
   * @param {number} height - 線の高さ
   */
  Window_MapName.prototype.drawGradientLine = function (x, y, width, height) {
    const context = this.contents.context;
    const gradient = context.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // 左端が透明
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)'); // 中央が不透明
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // 右端が透明

    context.save();
    context.fillStyle = gradient;
    context.fillRect(x, y, width, height);
    context.restore();
  };

  /**
   * マップ名ウィンドウの矩形領域を設定する関数
   * @returns {Rectangle} ウィンドウの矩形領域
   */
  Scene_Map.prototype.mapNameWindowRect = function () {
    const { uiMarginX, uiMarginY } = getMarginOfUIArea();
    const wx = -uiMarginX;
    const wy = -uiMarginY;
    const ww = Graphics.width;
    const wh = Graphics.height;
    return new Rectangle(wx, wy, ww, wh);
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
      FontManager.load('rmmz-mapNamefont', fontFile);
    }
    if (subFontFile) {
      FontManager.load('rmmz-mapNamefont2', subFontFile);
    }
  };

  /**
   * マップ名表示に使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.mapNameFontFace = function () {
    return 'rmmz-mapNamefont, ' + $dataSystem.advanced.fallbackFonts;
  };

  /**
   * マップ名表示に使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.mapNamefont2Face = function () {
    return subFontFile ? 'rmmz-mapNamefont2, ' + $dataSystem.advanced.fallbackFonts : '';
  };
})();
