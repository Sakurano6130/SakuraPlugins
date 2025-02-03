/*:
 * @target MZ
 * @plugindesc 📦 マップ内宝箱数表示プラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * マップ内の宝箱数を表示します。
 *
 * -------------------------------------------------
 * Sakura_CountTreasures
 * Copyright (c) 2025 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2025/02/03 1.0.0 公開
 * -------------------------------------------------
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_CountTreasures/Sakura_CountTreasures.md
 *
 * 特定のマップでは非表示にしたい場合、マップのメモ欄に
 * <宝箱数表示しない>
 * と記載してください。
 *
 * @param windowTreasureSettings
 * @text 宝箱条件設定ﾘｽﾄ
 * @desc 宝箱条件設定をします（複数登録可）
 * @type struct<windowTreasureSetting>[]
 * @default ["{\"condition\":\"\",\"conditionEventName\":\"宝箱（\",\"openedSelfSwitchValue\":\"A\",\"contentsSetting\":\"\",\"treasureIcon\":\"210\",\"treasurePrefix\":\"宝箱\",\"treasureSuffix\":\"個\",\"showDenominator\":\"false\",\"showIfZeroRemaining\":\"false\",\"windowTreasureCountSetting\":\"\",\"windowPosition\":\"topLeft\",\"windowOffsetX\":\"0\",\"windowOffsetY\":\"0\",\"windowWidth\":\"200\",\"windowHeight\":\"68\",\"windowOpacity\":\"0\",\"windowBackgroundDimmer\":\"false\",\"treasureFontSize\":\"24\",\"treasureTextColor\":\"0\",\"visibleSetting\":\"\",\"showSwitchId\":\"0\",\"switchNeedsAutoOff\":\"false\",\"showIfEventRunning\":\"false\"}"]
 */

/*~struct~windowTreasureSetting:
 * @param condition
 * @text 宝箱条件設定 ---
 *
 * @param conditionEventName
 * @parent condition
 * @text ｲﾍﾞﾝﾄ名が次で始まる
 * @desc ｲﾍﾞﾝﾄ名がここで指定した文字で始まる場合、宝箱とみなします。
 * @type string
 * @default 宝箱（
 *
 * @param openedSelfSwitchValue
 * @parent condition
 * @text 宝箱が空いたと判断するｾﾙﾌｽｲｯﾁ
 * @desc ここで指定したｾﾙﾌｽｲｯﾁがｵﾝのとき、宝箱が空いているとみなします
 * @type select
 * @option A
 * @option B
 * @option C
 * @option D
 * @default A
 *
 * @param contentsSetting
 * @text 表示内容設定 ---
 *
 * @param treasureIcon
 * @parent contentsSetting
 * @text ｱｲｺﾝ表示
 * @type icon
 * @desc 表示するｱｲｺﾝを指定してください。(なしで非表示)
 * @default 210
 *
 * @param treasurePrefix
 * @parent contentsSetting
 * @text 接頭語
 * @type text
 * @desc 宝箱数の数字の前につける言葉(なしで非表示)
 * @default 宝箱
 *
 * @param treasureSuffix
 * @parent contentsSetting
 * @text 単位
 * @type text
 * @desc 宝箱数の数字の後につける言葉(なしで非表示)
 * @default 個
 *
 * @param showDenominator
 * @parent contentsSetting
 * @text 分母を表示するか
 * @type boolean
 * @desc 分母も表示したい場合はｵﾝにしてください
 * @default false
 *
 * @param showIfZeroRemaining
 * @parent contentsSetting
 * @text 開けてない宝箱数0の場合も表示するか
 * @type boolean
 * @desc 開けてない宝箱数0の場合でも表示したい場合はｵﾝにしてください
 * @default false
 *
 * @param windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳ設定 ---
 *
 * @param windowPosition
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳ位置
 * @desc 宝箱数ｳｨﾝﾄﾞｳの画面内の位置を指定します。
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
 * @param windowOffsetX
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳXｵﾌｾｯﾄ
 * @type number
 * @min -9999
 * @max 9999
 * @desc 宝箱数ｳｨﾝﾄﾞｳのX軸のｵﾌｾｯﾄ。正の値で右に、負の値で左に移動します。
 * @default 0
 *
 * @param windowOffsetY
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳYｵﾌｾｯﾄ
 * @type number
 * @min -9999
 * @max 9999
 * @desc 宝箱数ｳｨﾝﾄﾞｳのY軸のｵﾌｾｯﾄ。正の値で下に、負の値で上に移動します。
 * @default 0
 *
 * @param windowWidth
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳ幅
 * @type number
 * @min 0
 * @max 9999
 * @desc 宝箱数ｳｨﾝﾄﾞｳの幅
 * @default 200
 *
 * @param windowHeight
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳ高さ
 * @type number
 * @min 0
 * @max 9999
 * @desc 宝箱数ｳｨﾝﾄﾞｳの高さ。
 * @default 68
 *
 * @param windowOpacity
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳの透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 宝箱数ｳｨﾝﾄﾞｳの背景の透明度
 * @default 0
 *
 * @param windowBackgroundDimmer
 * @parent windowTreasureCountSetting
 * @text ｳｨﾝﾄﾞｳの背景暗くするか
 * @type boolean
 * @desc ｳｨﾝﾄﾞｳの背景を暗くするかどうかを指定します。
 * @default false
 *
 * @param treasureFontSize
 * @parent windowTreasureCountSetting
 * @text ﾌｫﾝﾄｻｲｽﾞ
 * @type number
 * @min 1
 * @max 9999
 * @desc ﾌｫﾝﾄｻｲｽﾞです。
 * @default 24
 *
 * @param treasureTextColor
 * @parent windowTreasureCountSetting
 * @text 文字の色
 * @type color
 * @desc 文字の色です。（\C[番号]に相当）
 * @default 0
 *
 * @param visibleSetting
 * @text 表示/非表示設定 ---
 *
 * @param showSwitchId
 * @parent visibleSetting
 * @text 表示するｽｲｯﾁ
 * @type switch
 * @desc ここで指定したｽｲｯﾁがｵﾝのとき、宝箱数ｳｨﾝﾄﾞｳが表示されます。指定しない場合は常に表示。
 * @default 0
 *
 * @param switchNeedsAutoOff
 * @parent visibleSetting
 * @text ﾏｯﾌﾟが変わった時にこのｽｲｯﾁを自動ｵﾌするか
 * @type boolean
 * @desc ﾏｯﾌﾟが切り替わる際に自動でこのｽｲｯﾁをｵﾌにするかどうかを指定してください
 * @default false
 *
 * @param showIfEventRunning
 * @parent visibleSetting
 * @text ｲﾍﾞﾝﾄ実行中も表示するか
 * @type boolean
 * @desc ｲﾍﾞﾝﾄ実行中も表示したい場合はｵﾝにしてください
 * @default false
 *
 */
(() => {
  'use strict';

  /**
   * プラグイン名。PluginManager.parameters でパラメータを取得する際に使用します。
   * @type {string}
   */
  const pluginName = 'Sakura_CountTreasures';

  /**
   * マップのメモ欄にこの文字列が含まれている場合は宝箱数表示をしない、という判定に使われるキーワードです。
   * @type {string}
   */
  const HIDE_TREASURES = '宝箱数表示しない';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------

  /**
   * プラグインパラメータを取得し、必要に応じて JSON.parse などで処理します。
   * @type {object}
   */
  const parameters = PluginManager.parameters(pluginName);

  /**
   * パラメータのうち、宝箱表示に関する設定配列です。
   * @type {Array<object>}
   */
  const windowTreasureSettings = JSON.parse(parameters['windowTreasureSettings'] || '[]').map(
    (setting) => {
      /**
       * 各要素は JSON 文字列なので、再度 JSON.parse します。
       */
      const parsedSetting = JSON.parse(setting);

      return {
        conditionEventName: parsedSetting.conditionEventName || '宝箱（',
        openedSelfSwitchValue: parsedSetting.openedSelfSwitchValue || 'A',

        windowPosition: parsedSetting.windowPosition || 'bottomRight',
        windowOffsetX: Number(parsedSetting.windowOffsetX || 0),
        windowOffsetY: Number(parsedSetting.windowOffsetY || 0),
        windowWidth: Number(parsedSetting.windowWidth || 200),
        windowHeight: Number(parsedSetting.windowHeight || 68),
        windowOpacity: Number(parsedSetting.windowOpacity || 0),
        windowBackgroundDimmer: parsedSetting.windowBackgroundDimmer === 'true',

        treasureIcon: Number(parsedSetting.treasureIcon || 210),
        treasureFontSize: Number(parsedSetting.treasureFontSize || 24),
        treasureTextColor: Number(parsedSetting.treasureTextColor || 0),
        treasurePrefix: parsedSetting.treasurePrefix || '宝箱',
        treasureSuffix: parsedSetting.treasureSuffix || '個',
        showDenominator: parsedSetting.showDenominator === 'true',

        showSwitchId: Number(parsedSetting.showSwitchId || 0),
        switchNeedsAutoOff: parsedSetting.switchNeedsAutoOff === 'true',
        showIfZeroRemaining: parsedSetting.showIfZeroRemaining === 'true',
        showIfEventRunning: parsedSetting.showIfEventRunning === 'true',
      };
    }
  );

  /**
   * 切り替わり時に自動でオフにする必要があるｽｲｯﾁIDをすべて配列として取り出します。
   * @type {number[]}
   */
  const needsAutoOffSwitchIds = windowTreasureSettings
    .filter((setting) => setting.switchNeedsAutoOff)
    .map((setting) => setting.showSwitchId);

  /**
   * 配列内の重複を排除するユーティリティ関数です。
   * @param {Array<any>} arr - 重複を取り除きたい配列
   * @returns {Array<any>} 重複が排除された配列
   */
  const uniqueArray = (arr) => [...new Set(arr)];

  /**
   * マップ切り替え時に自動でオフにするユニークなｽｲｯﾁID一覧です。
   * @type {number[]}
   */
  const uniqueNeedsAutoOffSwitchIds = uniqueArray(needsAutoOffSwitchIds);

  /**
   * UIエリア（実際の描画画面）の余白を求める関数です。
   *
   * @returns {Object} 余白のオブジェクト { uiMarginX: number, uiMarginY: number }
   */
  const getMarginOfUIArea = () => {
    return {
      uiMarginX: (Graphics.width - Graphics.boxWidth) / 2,
      uiMarginY: (Graphics.height - Graphics.boxHeight) / 2,
    };
  };

  /**
   * イベントが「宝箱」とみなせるかどうかを判定するユーティリティ関数です。
   * @param {object} obj - 判定に必要なオブジェクト
   * @param {Game_Event} obj.event - 判定対象のイベント
   * @param {string} obj.conditionEventName - イベント名の冒頭部分を比較する文字列
   * @returns {boolean} 宝箱ならtrue、それ以外ならfalse
   */
  const isTreasureEvent = ({ event, conditionEventName }) => {
    if (!event) return false;
    // イベント名が指定文字列で始まっていれば宝箱扱いにします
    if (conditionEventName && event.event().name.startsWith(conditionEventName)) return true;
    return false;
  };

  /**
   * イベントが「開けられた宝箱」とみなせるかどうかを判定するユーティリティ関数です。
   * @param {object} obj - 判定に必要なオブジェクト
   * @param {Game_Event} obj.event - 判定対象のイベント
   * @param {string} obj.openedSelfSwitchValue - 指定されたセルフｽｲｯﾁ（A/B/C/D）の値
   * @returns {boolean} 開けられた宝箱ならtrue、それ以外ならfalse
   */
  const isOpenedTreasureEvent = ({ event, openedSelfSwitchValue }) => {
    if (!event) return false;
    // セルフｽｲｯﾁがONになっていれば「開けられた」と判断する
    if ($gameSelfSwitches.value([$gameMap.mapId(), event.eventId(), openedSelfSwitchValue])) {
      return true;
    }
    return false;
  };

  /**
   * 現在のマップにある宝箱数、および未開封の宝箱数を取得します。
   * @param {object} obj - 宝箱の条件
   * @param {string} obj.conditionEventName - イベント名がこの文字列から始まる場合に宝箱とみなす
   * @param {string} obj.openedSelfSwitchValue - ONの場合に開封済みとみなすセルフｽｲｯﾁ
   * @returns {object} 宝箱の総数と未開封数 { treasuresCount: number, unopenedCount: number }
   */
  Game_Map.prototype.getTreasuresCount = function ({ conditionEventName, openedSelfSwitchValue }) {
    const treasures = this.events().filter((event) =>
      isTreasureEvent({ event, conditionEventName })
    );
    const unopenedTreasures = treasures.filter(
      (event) => !isOpenedTreasureEvent({ event, openedSelfSwitchValue })
    );
    return { treasuresCount: treasures.length, unopenedCount: unopenedTreasures.length };
  };

  /**
   * セルフｽｲｯﾁを変更するメソッドをオーバーライドし、
   * 宝箱ウィンドウを更新するためのフックを追加します。
   */
  const _Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue;
  Game_SelfSwitches.prototype.setValue = function (key, value) {
    _Game_SelfSwitches_setValue.call(this, key, value);

    // シーンがマップで、かつ宝箱ウィンドウが存在する場合は更新をかける
    const scene = SceneManager._scene;
    if (
      scene instanceof Scene_Map &&
      scene._treasureWindows &&
      Array.isArray(scene._treasureWindows)
    ) {
      for (const treasureWindow of scene._treasureWindows) {
        treasureWindow.refresh();
      }
    }
  };

  /**
   * Scene_Mapの全ウィンドウを作成するメソッドをオーバーライドし、
   * 宝箱ウィンドウを追加で生成します。
   */
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    this.createTreasureWindows();
  };

  /**
   * 宝箱ウィンドウの生成を行います。
   * プラグインパラメータ windowTreasureSettings に基づいて複数作成可能です。
   */
  Scene_Map.prototype.createTreasureWindows = function () {
    this._treasureWindows = [];

    // 設定がない場合は作らない
    if (windowTreasureSettings.length === 0) return;

    for (const {
      conditionEventName,
      openedSelfSwitchValue,
      windowPosition,
      windowOffsetX,
      windowOffsetY,
      windowWidth,
      windowHeight,
      windowOpacity,
      windowBackgroundDimmer,
      treasureIcon,
      treasureFontSize,
      treasureTextColor,
      treasurePrefix,
      treasureSuffix,
      showDenominator,
      showSwitchId,
      switchNeedsAutoOff,
      showIfEventRunning,
      showIfZeroRemaining,
    } of windowTreasureSettings) {
      // 設定に基づき、宝箱ウィンドウを生成
      const window = new Window_Treasure({
        conditionEventName,
        openedSelfSwitchValue,
        windowPosition,
        windowOffsetX,
        windowOffsetY,
        windowWidth,
        windowHeight,
        windowOpacity,
        windowBackgroundDimmer,
        treasureIcon,
        treasureFontSize,
        treasureTextColor,
        treasurePrefix,
        treasureSuffix,
        showDenominator,
        showSwitchId,
        switchNeedsAutoOff,
        showIfEventRunning,
        showIfZeroRemaining,
      });

      this._treasureWindows.push(window);
      this.addWindow(window);
    }
  };

  /**
   * Scene_Mapのupdateメソッドをオーバーライドし、
   * 毎フレームごとに宝箱ウィンドウの可視性を更新します。
   */
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    for (const treasureWindow of this._treasureWindows) {
      treasureWindow.updateVisible();
    }
  };

  /**
   * 宝箱数を表示するためのウィンドウクラスです。
   */
  class Window_Treasure extends Window_Base {
    /**
     * @param {object} obj - ウィンドウに渡す設定
     * @param {string} obj.conditionEventName - イベント名がこの文字列で始まれば宝箱とみなす
     * @param {string} obj.openedSelfSwitchValue - セルフｽｲｯﾁがONであれば開封済みとみなす
     * @param {string} obj.windowPosition - ウィンドウの表示位置（topLeft / topRight / bottomLeft / bottomRight）
     * @param {number} obj.windowOffsetX - X軸方向のオフセット
     * @param {number} obj.windowOffsetY - Y軸方向のオフセット
     * @param {number} obj.windowWidth - ウィンドウ幅
     * @param {number} obj.windowHeight - ウィンドウ高さ
     * @param {number} obj.windowOpacity - ウィンドウの背景透明度
     * @param {boolean} obj.windowBackgroundDimmer - ウィンドウの背景を暗くするかどうか
     * @param {number} obj.treasureIcon - 宝箱数のアイコンID
     * @param {number} obj.treasureFontSize - 表示するフォントサイズ
     * @param {number} obj.treasureTextColor - 文字色（\C[]に相当）
     * @param {string} obj.treasurePrefix - 表示時の接頭語（例：『宝箱』）
     * @param {string} obj.treasureSuffix - 表示時の単位（例：『個』）
     * @param {boolean} obj.showDenominator - 分母（総数）も表示するかどうか
     * @param {number} obj.showSwitchId - このｽｲｯﾁがONのときのみ表示
     * @param {boolean} obj.showIfEventRunning - イベント実行中でも表示するかどうか
     * @param {boolean} obj.showIfZeroRemaining - 未開封の宝箱が0個でも表示するかどうか
     */
    initialize({
      conditionEventName,
      openedSelfSwitchValue,
      windowPosition,
      windowOffsetX,
      windowOffsetY,
      windowWidth,
      windowHeight,
      windowOpacity,
      windowBackgroundDimmer,
      treasureIcon,
      treasureFontSize,
      treasureTextColor,
      treasurePrefix,
      treasureSuffix,
      showDenominator,
      showSwitchId,
      showIfEventRunning,
      showIfZeroRemaining,
    }) {
      const rect = this.windowRect({
        windowPosition,
        windowOffsetX,
        windowOffsetY,
        windowWidth,
        windowHeight,
      });
      super.initialize(rect);
      // ウィンドウ透明度
      this.opacity = windowOpacity;
      // ウィンドウ背景を暗くするかどうか
      this._windowBackgroundDimmer = windowBackgroundDimmer;

      this._conditionEventName = conditionEventName;
      this._openedSelfSwitchValue = openedSelfSwitchValue;
      this._treasureIcon = treasureIcon;
      this._treasureFontSize = treasureFontSize;
      this._treasureTextColor = treasureTextColor;
      this._treasurePrefix = treasurePrefix;
      this._treasureSuffix = treasureSuffix;
      this._showDenominator = showDenominator;
      this._showSwitchId = showSwitchId;
      this._showIfEventRunning = showIfEventRunning;
      this._showIfZeroRemaining = showIfZeroRemaining;

      this.refresh();
    }

    /**
     * ウィンドウの表示矩形を計算します。
     * @param {object} obj - パラメータオブジェクト
     * @param {string} obj.windowPosition - ウィンドウ表示位置指定
     * @param {number} obj.windowOffsetX - ウィンドウXオフセット
     * @param {number} obj.windowOffsetY - ウィンドウYオフセット
     * @param {number} obj.windowWidth - ウィンドウ幅
     * @param {number} obj.windowHeight - ウィンドウ高さ
     * @returns {Rectangle} 表示座標とサイズをまとめた Rectangle オブジェクト
     */
    windowRect({ windowPosition, windowOffsetX, windowOffsetY, windowWidth, windowHeight }) {
      const width = windowWidth;
      const height = windowHeight;
      const { uiMarginX, uiMarginY } = getMarginOfUIArea();
      let x;
      let y;

      // windowPositionに応じてウィンドウの左上座標を決定する
      switch (windowPosition) {
        case 'topLeft':
          x = -uiMarginX + windowOffsetX;
          y = -uiMarginY + windowOffsetY;
          break;
        case 'topRight':
          x = -uiMarginX + Graphics.width - width + windowOffsetX;
          y = -uiMarginY + windowOffsetY;
          break;
        case 'bottomLeft':
          x = -uiMarginX + windowOffsetX;
          y = -uiMarginY + Graphics.height - height + windowOffsetY;
          break;
        case 'bottomRight':
          x = -uiMarginX + Graphics.width - width + windowOffsetX;
          y = -uiMarginY + Graphics.height - height + windowOffsetY;
          break;
        default:
          // 指定が不正な場合は右上に合わせる
          x = -uiMarginX + Graphics.width - width + windowOffsetX;
          y = -uiMarginY + windowOffsetY;
          break;
      }
      return new Rectangle(x, y, width, height);
    }

    /**
     * ウィンドウの表示内容をリフレッシュ（再描画）します。
     */
    refresh() {
      // 背景を暗くする設定の場合は暗くする
      if (this._windowBackgroundDimmer) {
        this.showBackgroundDimmer();
      } else {
        this.hideBackgroundDimmer();
      }

      this.contents.clear();

      // 現在マップの宝箱数と未開封数を取得
      const { treasuresCount, unopenedCount } = $gameMap.getTreasuresCount({
        conditionEventName: this._conditionEventName,
        openedSelfSwitchValue: this._openedSelfSwitchValue,
      });

      // 未開封数が0の場合でも表示するかどうかの判定
      if (this._showIfZeroRemaining || unopenedCount > 0) {
        const text = this.createText({ treasuresCount, unopenedCount });
        this.drawTextEx(text, 0, 0, this.contentsWidth());
      }
    }

    /**
     * 実際に描画する文字列を組み立てます。
     * @param {object} obj - パラメータオブジェクト
     * @param {number} obj.treasuresCount - 対象となる宝箱の総数
     * @param {number} obj.unopenedCount - 未開封の宝箱数
     * @returns {string} 描画用の制御文字入りテキスト
     */
    createText({ treasuresCount, unopenedCount }) {
      // アイコン(\I[n])、フォントサイズ(\FS[n])、文字色(\C[n])を組み合わせた文字列を組み立て
      const icon = this._treasureIcon ? `\\I[${this._treasureIcon}]` : '';
      const fontSize = this._treasureFontSize ? `\\FS[${this._treasureFontSize}]` : '';
      const textColor = this._treasureTextColor ? `\\C[${this._treasureTextColor}]` : '';

      // 接頭語と接尾語
      const prefix = `${this._treasurePrefix} ` ?? '';
      const suffix = ` ${this._treasureSuffix}` ?? '';

      // 分母（総数）を表示するかどうかの判定
      const denominator = this._showDenominator ? ` / ${treasuresCount}` : '';

      // 例: \I[210]\FS[24]\C[0]宝箱 3 / 5個
      return `${icon}${fontSize}${textColor}${prefix}${unopenedCount}${denominator}${suffix}`;
    }

    /**
     * ウィンドウの可視状態をチェックし、表示のON/OFFを行います。
     * @returns {boolean} 表示するべきかどうか
     */
    checkVisible() {
      // イベント実行中でも表示しない設定なら、イベント実行中は非表示
      if (!this._showIfEventRunning && $gameMap.isEventRunning()) return false;
      // マップのメモ欄に <宝箱数表示しない> が書かれていたら非表示
      if ($dataMap.meta[HIDE_TREASURES]) return false;
      // ｽｲｯﾁ設定がない場合は常時表示、あればｽｲｯﾁがONのときだけ表示
      if (!this._showSwitchId) return true;
      if (this._showSwitchId && $gameSwitches.value(this._showSwitchId)) return true;

      return false;
    }

    /**
     * フレームごとに可視性を更新します。
     * checkVisible()の結果に応じて this.visible を変更します。
     */
    updateVisible() {
      this.visible = this.checkVisible();
    }
  }

  /**
   * 複数のｽｲｯﾁを一括で変更するためのユーティリティ関数です。
   * @param {number[]} switchIds - OFFにしたいｽｲｯﾁIDの配列
   * @param {boolean} value - trueまたはfalse
   *
   * @see Game_Switches.prototype.setValue
   */
  const bulkSetValuesToGameSwitches = (switchIds, value) => {
    for (const switchId of switchIds) {
      if (switchId > 0 && switchId < $dataSystem.switches.length) {
        $gameSwitches._data[switchId] = value;
      }
    }
    // 変更を反映するため、onChangeを呼び出す
    $gameSwitches.onChange();
  };

  /**
   * マップ移動時の処理をオーバーライドし、
   * マップが変わったタイミングで自動オフ対象のｽｲｯﾁを一括でOFFにします。
   */
  const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
  Game_Player.prototype.performTransfer = function () {
    // マップが変わる際（もしくはリロード）にｽｲｯﾁをオフにする
    if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
      bulkSetValuesToGameSwitches(uniqueNeedsAutoOffSwitchIds, false);
    }
    _Game_Player_performTransfer.call(this);
  };
})();
