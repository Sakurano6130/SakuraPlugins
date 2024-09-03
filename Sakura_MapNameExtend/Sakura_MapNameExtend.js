// Sakura_MapNameExtend 1.0.0
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/09/03 1.0.0 公開
 */

/*:
 * @target MZ
 * @plugindesc マップ名表示を拡張します。
 *
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * マップ名表示を拡張します。
 *
 * 主な機能:
 * - マップ名表示を拡張します。
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
 * @desc 使用するフォントのファイル名
 * @text 使用するフォントのファイル名
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
  const mainFontSize = Number(parameters.mainFontSize || 30);
  const mainFontColor = Number(parameters.mainFontColor || 0);
  const subFontSize = Number(parameters.subFontSize || 16);
  const subFontColor = Number(parameters.subFontColor || 0);
  const needsOutputMaps = parameters['needsOutputMaps'] === 'false';

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
    const outputData = [header.join(','), ...resultList.sort((a, b) => a[0] - b[0])].join('\n');
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
      return [mapId, name, displayName].join(',');
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

    switch (mapNamePosition) {
      case 'topLeft':
        this.x = 0 + mapNameTextX;
        this.y = 0 + mapNameTextY;
        break;
      case 'topRight':
        this.x = Graphics.boxWidth - width + mapNameTextX;
        this.y = 0 + mapNameTextY;
        break;
      case 'bottomLeft':
        this.x = 0 + mapNameTextX;
        this.y = Graphics.boxHeight - height + mapNameTextY;
        break;
      case 'bottomRight':
        this.x = Graphics.boxWidth - width + mapNameTextX;
        this.y = Graphics.boxHeight - height + mapNameTextY;
        break;
      case 'center':
      default:
        this.x = Math.floor((Graphics.boxWidth - width) / 2) + mapNameTextX;
        this.y = Math.floor((Graphics.boxHeight - height) / 2) + mapNameTextY;
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

  // Window_MapNameのリフレッシュをオーバーライドして幅と高さを自動計算
  /**
   * ウィンドウのリフレッシュを行う関数
   * 表示するマップ名のテキストの幅と高さを自動的に計算し、ウィンドウサイズを調整します。
   */
  Window_MapName.prototype.refresh = function () {
    this.contents.clear();
    if ($gameMap.displayName()) {
      this.resetFontSettings();

      const [mainName, subName] = $gameMap.displayName().split('|') || ['', ''];

      const mainText = `\\FS[${mainFontSize}]\\C[${mainFontColor}]${mainName}`;
      const subText = subName ? `\\FS[${subFontSize}]\\C[${subFontColor}]- ${subName} -` : '';

      const { width: mainTextWidth, height: mainTextHeight } = this.textSizeEx(mainText);
      const { width: subTextWidth, height: subTextHeight } = subText
        ? this.textSizeEx(subText)
        : { width: 0, height: 0 };

      // ウィンドウの幅と高さを計算
      const marginX = 20;
      const width = Math.max(mainTextWidth, subTextWidth) + this.padding * 2 + marginX * 2;
      const height = mainTextHeight + subTextHeight + this.padding * 2;

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
          mainTextX = width - this.padding - marginX - mainTextWidth;
          subTextX = width - this.padding - marginX - subTextWidth;
          break;
        case 'center':
        default:
          mainTextX = (width - this.padding * 2 - mainTextWidth) / 2;
          subTextX = (width - this.padding * 2 - subTextWidth) / 2;
          break;
      }

      this.drawTextEx(mainText, mainTextX, 0);
      if (subName) {
        this.drawGradientLine(0, mainTextHeight, width, 2);
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
    const wx = 0;
    const wy = 0;
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight;
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
  };

  /**
   * マップ名表示に使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.mapNameFontFace = function () {
    return 'rmmz-mapNamefont, ' + $dataSystem.advanced.fallbackFonts;
  };
})();
