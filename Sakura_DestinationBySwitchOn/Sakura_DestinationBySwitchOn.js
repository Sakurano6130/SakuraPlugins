// Sakura_DestinationBySwitchOn
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/09/03 1.0.0 公開
 * 2024/09/03 0.5.0 だいたい形に
 * 2024/09/02 0.0.1 作成
 */

/*:
 * @target MZ
 * @plugindesc スイッチオンで次の目的表示
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 *
 * @command HideDestinationText
 * @text 目的テキストを隠す
 * @desc 表示されている目的テキストを隠します。
 *
 * @command ShowDestinationText
 * @text 目的テキストを表示する
 * @desc 隠していた目的テキストを表示します。
 *
 * @param destinationPosition
 * @text 目的テキストの位置
 * @desc 目的テキストを表示する位置（左上、右上、左下、右下から選択）
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
 * @text 目的テキストX座標
 * @desc 目的テキストの表示位置（X座標）
 * @default 40
 *
 * @param destinationTextY
 * @text 目的テキストY座標
 * @desc 目的テキストの表示位置（Y座標）
 * @default 0
 *
 * @param fontSize
 * @text フォントサイズ
 * @desc 目的テキストのフォントサイズ
 * @type number
 * @min 10
 * @max 40
 * @default 16
 *
 * @param storyProgressText
 * @text ストーリーが進行したときに表示するテキスト
 * @desc ストーリーが進行したときに表示するテキストです。何も指定しないと、この表示はされなくなります。
 * @type string
 * @default 💡ストーリーがすすんだ
 *
 * @param storyProgressTextColor
 * @text ストーリーが進行したときに表示するテキストの色
 * @desc ストーリーが進行したときに表示するテキストの色です。
 * @type color
 * @default 0
 *
 * @param needsOutputDestinations
 * @text 目的を書き出すかどうか
 * @desc これをtrueにして、テストプレイを実行するとプロジェクトフォルダ直下に「destinationsBySwitch.txt」というファイルが出力されます
 * @type boolean
 * @default true
 *
 * @help
 * スイッチ名が$で始まる名前のものをオンにしたとき、
 * 自動的に次の目的を表示します。
 *
 * 使用方法:
 * プラグインコマンドを使って目的を設定してください。
 *
 * プラグインコマンド:
 * HideDestinationText
 * 表示されている目的テキストを隠します。
 *
 * ShowDestinationText
 * 隠していた目的テキストを表示します。
 *
 */

(() => {
  const pluginName = 'Sakura_DestinationBySwitchOn';

  // プラグインパラメータの取得
  const parameters = PluginManager.parameters(pluginName);
  const destinationPosition = String(parameters['destinationPosition'] || 'topLeft');
  const destinationTextX = Number(parameters['destinationTextX'] || 40);
  const destinationTextY = Number(parameters['destinationTextY'] || 0);
  const fontSize = Number(parameters['fontSize'] || 16);
  const storyProgressText = String(parameters['storyProgressText'] || '');
  const storyProgressTextColor = Number(parameters['storyProgressTextColor'] || 0);
  const needsOutputDestinations = parameters['needsOutputDestinations'] === 'true';

  /**
   * 目的地の管理を行うクラス
   */
  class DestinationManager {
    constructor() {
      this._destinationText = '';
      this._destinationVisible = true;
      this._needsInformDestinationChanged = false;
    }

    get destinationText() {
      return this._destinationText ?? '';
    }

    set destinationText(text) {
      this._destinationText = text;
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
  }

  const destinationManager = new DestinationManager();

  // ファイル操作とパス操作のモジュールをインポート
  const fs = require('fs');
  const path = require('path');

  const splitFirstCharacter = (str) => {
    if (str.length === 0) {
      return ['', '']; // 空文字列の場合は、空の配列を返す
    }

    const firstCharacter = str.charAt(0); // 1文字目を取得
    const restOfString = str.slice(1); // 2文字目以降を取得

    return [firstCharacter, restOfString];
  };

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
   * スイッチデータを抽出する
   * @param {object} mapData - マップデータ
   * @param {string[]} dataSwitches - スイッチデータの配列
   * @param {number} mapId - マップID
   * @returns {string[]} 抽出されたスイッチデータ
   */
  const extractSwitchData = (mapData, dataSwitches, mapId) => {
    const resultList = [];
    mapData.events.forEach((event) => {
      if (!event) return;
      event.pages.forEach((page, pageIndex) => {
        page.list.forEach((command) => {
          if (command.code === 121) {
            // スイッチの操作コマンド
            const [switchIdLow, switchIdHigh, enable] = command.parameters;
            const value = enable === 0;
            for (let switchId = switchIdLow; switchId <= switchIdHigh; switchId++) {
              const switchName = dataSwitches[switchId];
              const mapInfo = $dataMapInfos[mapId];
              if (switchName.startsWith('$') && mapInfo) {
                resultList.push(
                  [
                    switchId,
                    switchName,
                    value,
                    mapId,
                    mapInfo.name,
                    event.name,
                    pageIndex + 1,
                  ].join(',')
                );
              }
            }
          }
        });
      });
    });
    return resultList;
  };

  /**
   * 抽出された目的地データを保存する
   * @param {string[]} resultList - 抽出された目的地データのリスト
   */
  const saveDestinationData = (resultList) => {
    const header = [
      'switchId',
      'switchName',
      'value',
      'mapId',
      'mapName',
      'eventName',
      'pageIndex',
    ];
    const outputFilePath = path.join(getBasePath(), 'destinationsBySwitch.txt');
    const outputData = [
      header.join(','),
      ...resultList.sort((a, b) => a[0] - b[0] || a[3] - b[3]),
    ].join('\n');
    fs.writeFileSync(outputFilePath, outputData);
  };

  /**
   * 目的地データを処理し、保存する
   */
  const processDestinationData = () => {
    const dataDirectory = getDataDirectory();
    const dataSwitches = $dataSystem.switches;
    const jsonFiles = getJsonFiles(dataDirectory);

    const resultList = jsonFiles.flatMap((file) => {
      const mapData = parseJsonFile(path.join(dataDirectory, file));
      const mapId = parseInt(file.match(/Map(\d+)/)?.[1], 10);
      return extractSwitchData(mapData, dataSwitches, mapId);
    });

    saveDestinationData(resultList);
  };

  // データベースがロードされた後の処理を拡張
  const _Scene_Boot_prototype_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
  Scene_Boot.prototype.onDatabaseLoaded = function () {
    _Scene_Boot_prototype_onDatabaseLoaded.call(this);
    if (!Utils.isOptionValid('test') || !needsOutputDestinations) return;
    processDestinationData();
  };

  /**
   * 目的地テキストを表示するウィンドウクラス
   */
  class Window_DestinationText extends Window_Base {
    constructor() {
      const rect = new Rectangle(0, 0, Graphics.width, Graphics.height);
      super(rect);
      this.opacity = 0;
      this.contents.fontSize = fontSize;
      this._text = '';
      this._showStoryProgressText = false;
      this._storyProgressTextDuration = 120;
      this._fadeOutDuration = 0;
      this._fadeInDuration = 0;
    }

    /**
     * テキストを設定し、ウィンドウをリフレッシュする
     * @param {string} text - 表示するテキスト
     */
    setText(text) {
      if (this._text !== text) {
        this._text = text;
        this.refresh();
      }
    }

    /**
     * ストーリー進行時のテキスト表示を設定する
     */
    setDestinationChanged() {
      if (storyProgressText) {
        this._showStoryProgressText = true;
        this._storyProgressTextDuration = 120;
        this.contentsOpacity = 255;
        this.refresh();
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

    refresh() {
      this.contents.clear();
      const [first, rest] = splitFirstCharacter(this._text);
      const text = this._showStoryProgressText
        ? `\\FS[${fontSize}]\\C[${storyProgressTextColor}]${storyProgressText}`
        : `\\FS[${fontSize}]\\{${first}\\}${rest}`;
      this.drawTextEx(text, 0, 0);
      const paddingX = 6;
      const paddingY = 10;
      const height = this.maxFontSizeInLine(text) + paddingY;
      this.drawUnderlineWithShadow(0, height, this.textWidth(text) + paddingX);
      this.width = this.textWidth(text) + this.padding * 2;
      this.height = this.lineHeight() + this.padding * 2 + paddingY + 1;
      // ウィンドウの位置を更新
      this.updatePlacement();
    }

    /**
     * テキストの下線を描画する
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @param {number} width - 線の幅
     */
    drawUnderlineWithShadow(x, y, width) {
      const context = this.contents.context;
      context.lineWidth = 1;
      const gradient = context.createLinearGradient(x, y, x + width, y);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
      context.strokeStyle = gradient;
      context.beginPath();
      context.moveTo(x, y + 16);
      context.lineTo(x + width, y + 16);
      context.stroke();
    }

    /**
     * ウィンドウの位置とサイズを更新する
     */
    updatePlacement() {
      switch (destinationPosition) {
        case 'topLeft':
          this.x = 0 + destinationTextX;
          this.y = 0 + destinationTextY;
          break;
        case 'topRight':
          this.x = Graphics.boxWidth - this.width + destinationTextX;
          this.y = 0 + destinationTextY;
          break;
        case 'bottomLeft':
          this.x = 0 + destinationTextX;
          this.y = Graphics.boxHeight - this.height + destinationTextY;
          break;
        case 'bottomRight':
          this.x = Graphics.boxWidth - this.width + destinationTextX;
          this.y = Graphics.boxHeight - this.height + destinationTextY;
          break;
      }
    }
  }

  // シーンマップの全ウィンドウ作成を拡張
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    this.createDestinationWindow();
  };

  /**
   * 目的地表示用ウィンドウを作成する
   */
  Scene_Map.prototype.createDestinationWindow = function () {
    this._destinationWindow = new Window_DestinationText();
    this.addWindow(this._destinationWindow);
  };

  // シーンマップのアップデートを拡張
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    this._destinationWindow.setText(destinationManager.destinationText);
    if (destinationManager.needsInformDestinationChanged) {
      this._destinationWindow.setDestinationChanged();
      destinationManager.needsInformDestinationChanged = false;
    }
  };

  // スイッチの設定処理を拡張
  const _Game_Switches_setValue = Game_Switches.prototype.setValue;
  Game_Switches.prototype.setValue = function (switchId, value) {
    _Game_Switches_setValue.call(this, switchId, value);
    const switchName = $dataSystem.switches[switchId];
    if (switchName.startsWith('$') && value) {
      destinationManager.destinationText = switchName.substring(1);
      destinationManager.destinationVisible = true;
      destinationManager.needsInformDestinationChanged = true;
    }
  };

  // セーブデータ保存前の処理を拡張
  const _Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
  Game_System.prototype.onBeforeSave = function () {
    _Game_System_onBeforeSave.call(this);
    this._destinationText = destinationManager.destinationText;
    this._destinationVisible = destinationManager.destinationVisible;
  };

  // セーブデータ読み込み後の処理を拡張
  const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    _Game_System_onAfterLoad.call(this);
    destinationManager.destinationText = this._destinationText ?? '';
    destinationManager.destinationVisible =
      this._destinationVisible !== undefined ? this._destinationVisible : true;
  };

  // プラグインコマンドを登録
  PluginManager.registerCommand(pluginName, 'ShowDestinationText', (args) => {
    destinationManager.destinationVisible = true;
  });

  PluginManager.registerCommand(pluginName, 'HideDestinationText', () => {
    destinationManager.destinationVisible = false;
  });
})();
