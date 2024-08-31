// Sakura_DisplayKeyboardButtonHelp
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/08/31 0.0.1 作成
 */

/*:
 * @target MZ
 * @plugindesc キーボードヘルプを自由に出せるプラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 *
 * @help
 * キーボードヘルプウィンドウを表示するプラグインです。
 * シーンごとにキーとその説明を定義し、表示/非表示を制御することができます。
 * また、メッセージウィンドウ内でカスタムボタンを描画する機能も備えています。
 * 同じシーン名に複数設定がある場合、それぞれが独立して表示されます。

 * また、メッセージウィンドウ内で \BTN[ボタン名]
 * を使用してボタンを描画する機能もついています。
 *
 * プラグインパラメータの説明:
 *
 * - SceneKeys: 各シーンにおけるキーとその説明を定義します。
 *   設定されたスイッチによって表示/非表示を制御できます。
 *
 * - FontSize: フォントサイズを指定します。
 *
 * - BUTTON_CORNER_RADIUS: ボタンの角の丸みの半径を指定します。
 *
 * - GlobalHideSwitch: このスイッチがONの時、キーボードヘルプウィンドウを全体を
 *   非表示にします。
 *
 * 利用方法:
 *
 * - キーボードヘルプウィンドウを表示させるには、SceneKeysでシーンごとの設定を
 *   行い、指定したスイッチをONにしてください。
 *
 * - メッセージウィンドウ内で \BTN[ボタン名] を使用すると、指定したボタンが描画
 *   されます。
 *
 * @param SceneKeys
 * @text シーン別キー設定
 * @type struct<SceneKeySetting>[]
 * @desc 各シーンにおけるキーとその説明を定義します。設定されたスイッチによって表示内容が変わります。
 * @default ["{\"SceneName\":\"Scene_Map\",\"KeyDescriptions\":\"[\\\"{\\\\\\\"Key\\\\\\\":\\\\\\\"←,↑,→,↓\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"移動\\\\\\\"}\\\",\\\"{\\\\\\\"Key\\\\\\\":\\\\\\\"M\\\\\\\",\\\\\\\"Description\\\\\\\":\\\\\\\"メニューを開く\\\\\\\"}\\\"]\",\"windowPosition\":\"left-bottom\",\"windowOffsetX\":\"0\",\"windowOffsetY\":\"0\",\"GameSwitch\":\"\"}"]
 *
 * @param FontSize
 * @text フォントサイズ
 * @type number
 * @min 10
 * @max 72
 * @desc キーテキストに使用するフォントサイズです。
 * @default 16
 *
 * @param GlobalHideSwitch
 * @text 全体非表示スイッチ
 * @type switch
 * @desc このスイッチがONの時、キーボードヘルプウィンドウを非表示にします。
 * @default 0
 *
 * @param KeyTextOffsetYInButton
 * @text ボタン内のテキストYオフセット
 * @type number
 * @min -100
 * @max 100
 * @desc ボタン内のテキストを描画する際のY軸のオフセット。正の値で下に、負の値で上に移動します。フォントによってうまく真ん中に収まらない場合に調整してください。
 * @default 0
 *
 * @param ButtonOffsetYInWindowMessage
 * @text メッセージ内ボタンYオフセット
 * @type number
 * @min -100
 * @max 100
 * @desc メッセージウィンドウ内でボタンを描画する際のY軸のオフセット。正の値で下に、負の値で上に移動します。別プラグインでルビを振る際に高さを揃えるために調整してください。
 * @default 0
 *
 */

/*~struct~SceneKeySetting:
 * @param SceneName
 * @text シーン名
 * @desc キーボードヘルプを表示するシーン名を選択します。
 * @type select
 * @option Scene_Map
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Battle
 *
 * @param KeyDescriptions
 * @text キーと説明のペア
 * @type struct<KeyDescriptionPair>[]
 * @desc このスイッチがオンの時に表示するキーとその説明を定義します。
 *
 * @param WindowPosition
 * @text ウィンドウ位置
 * @desc キーボードヘルプウィンドウの画面内の位置を指定します。
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
 * @desc キーボードヘルプウィンドウのX軸のオフセット。正の値で右に、負の値で左に移動します。
 * @default 0
 *
 * @param WindowOffsetY
 * @text ウィンドウYオフセット
 * @type number
 * @min -9999
 * @max 9999
 * @desc キーボードヘルプウィンドウのY軸のオフセット。正の値で下に、負の値で上に移動します。
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
 */

/*~struct~KeyDescriptionPair:
 * @param Key
 * @text キー
 * @desc 表示するキー（例: "M,Esc"）。複数のキーはカンマで区切ってください。
 *
 * @param Description
 * @text 説明
 * @desc キーの機能に関する説明です。
 */

(() => {
  const pluginName = 'Sakura_DisplayKeyboardButtonHelp';

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
      showDimmer: String(parsedSetting.ShowDimmer) === 'true',
      gameSwitch: Number(parsedSetting.GameSwitch || 0),
    };
  });
  const fontSize = Number(parameters['FontSize'] || 16);
  const globalHideSwitch = Number(parameters['GlobalHideSwitch'] || 0);
  const keyTextOffsetYInButton = Number(parameters['KeyTextOffsetYInButton'] || 0);
  const buttonOffsetYInWindowMessage = Number(parameters['ButtonOffsetYInWindowMessage'] || 0);

  const BUTTON_MARGIN_X = 10;
  const BUTTON_MARGIN_Y = 26;
  const BUTTON_PADDING_X = 20;
  const BUTTON_PADDING_Y = 10;
  const BUTTON_CORNER_RADIUS = 6;

  const buttonHeight = fontSize + BUTTON_PADDING_Y;

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
   * @param {number} BUTTON_CORNER_RADIUS - ボタンの角の丸みの半径
   */
  const drawButtonShapeToContents = (
    contents,
    x,
    y,
    buttonWidth,
    buttonHeight,
    BUTTON_CORNER_RADIUS
  ) => {
    const context = contents.context;
    // ボタンの影の部分を描画
    drawRoundedRectToContext(
      context,
      x + 2,
      y + 2,
      buttonWidth,
      buttonHeight,
      BUTTON_CORNER_RADIUS,
      'rgba(0, 0, 0, 0.7)'
    );
    // ボタンの外枠を描画
    drawRoundedRectToContext(
      context,
      x,
      y,
      buttonWidth,
      buttonHeight,
      BUTTON_CORNER_RADIUS,
      'grey'
    );
    // ボタンの内部を描画
    drawRoundedRectToContext(
      context,
      x + 2,
      y + 2,
      buttonWidth - 4,
      buttonHeight - 4,
      BUTTON_CORNER_RADIUS - 2,
      '#333333'
    );
    contents.paintOpacity = 120;
    contents.fillRect(x, y, buttonWidth, 8, 'rgba(255, 255, 255, 0.2)');
    contents.paintOpacity = 255;
  };

  /**
   * キーボードヘルプウィンドウのクラス
   * @extends {Window_Base}
   */
  class Window_KeyboardHelp extends Window_Base {
    /**
     * キーボードヘルプウィンドウの初期化
     * @param {String} position - ウィンドウの位置 (left-bottom, right-bottom, left-top, right-top)
     * @param {number} offsetX - X座標のオフセット
     * @param {number} offsetY - Y座標のオフセット
     * @param {Array} keyDescriptions - キーとその説明のリスト
     * @param {boolean} showDimmer - 背景を暗くするか
     * @param {number} gameSwitchForVisible - 表示/非表示を制御するゲームスイッチID
     */
    initialize(position, offsetX, offsetY, keyDescriptions, showDimmer, gameSwitchForVisible) {
      this._position = position;
      this._offsetX = offsetX;
      this._offsetY = offsetY;
      this._keyDescriptions = keyDescriptions;
      this._showDimmer = showDimmer;
      this._gameSwitchForVisible = gameSwitchForVisible;
      const rect = new Rectangle(0, 0, Graphics.width, this.windowHeight()); // 初期の幅はGraphics.widthを使用
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
      const adjustedTextY = y - this.itemPadding() / 2 + keyTextOffsetYInButton;

      this._keyDescriptions.forEach((keyDesc) => {
        const keys = keyDesc.Key.split(',').map((keyText) => keyText.trim());
        keys.forEach((keyText, index) => {
          const textWidth = this.textWidth(keyText);
          const buttonWidth = textWidth + 20;
          const isLastKey = index === keys.length - 1;

          // ボタンの描画
          drawButtonShapeToContents(
            this.contents,
            x,
            y,
            buttonWidth,
            buttonHeight,
            BUTTON_CORNER_RADIUS
          );

          this.contents.textColor = '#FFFFFF';
          this.drawText(
            keyText,
            x + BUTTON_MARGIN_X,
            adjustedTextY,
            buttonWidth - BUTTON_PADDING_X,
            'center'
          );

          x += buttonWidth + (isLastKey ? BUTTON_MARGIN_X : 0);
        });

        const descriptionWidth = this.textWidth(keyDesc.Description) + BUTTON_MARGIN_X;
        this.drawText(keyDesc.Description, x, adjustedTextY, descriptionWidth, 'left');
        x += descriptionWidth + BUTTON_PADDING_X;
      });

      if (this._showDimmer) {
        this.showBackgroundDimmer();
      }
      this._initialized = true;
    }

    /**
     * ウィンドウの幅を計算するメソッド
     * @returns {number} - ウィンドウの幅
     */
    windowWidth() {
      let width = 0;

      this._keyDescriptions.forEach((keyDesc) => {
        const keys = keyDesc.Key.split(',').map((keyText) => keyText.trim());
        keys.forEach((keyText) => {
          const textWidth = this.textWidth(keyText);
          width += textWidth + BUTTON_PADDING_X + BUTTON_MARGIN_X;
        });

        const descriptionWidth = this.textWidth(keyDesc.Description) + BUTTON_MARGIN_X;
        width += descriptionWidth + BUTTON_PADDING_X;
      });

      return width;
    }

    /**
     * ウィンドウの高さを計算するメソッド
     * @returns {number} - ウィンドウの高さ
     */
    windowHeight() {
      return buttonHeight + BUTTON_MARGIN_Y;
    }

    /**
     * ウィンドウのX座標を計算するメソッド
     * @returns {number} - ウィンドウのX座標
     */
    calculateXPosition() {
      if (['left-bottom', 'left-top'].includes(this._position)) {
        return 0 + this._offsetX;
      }
      return Graphics.width - this.windowWidth() + this._offsetX;
    }

    /**
     * ウィンドウのY座標を計算するメソッド
     * @returns {number} - ウィンドウのY座標
     */
    calculateYPosition() {
      if (['left-top', 'right-top'].includes(this._position)) {
        return 0 + this._offsetY;
      }
      return Graphics.height - this.windowHeight() + this._offsetY;
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

      if ($gameMap.isEventRunning()) {
        this.visible = false;
        return;
      }

      this.visible = true;
    }
  }

  /**
   * 各シーンでキーボードヘルプウィンドウを作成する関数
   * @param {Scene_Base} scene - シーンオブジェクト
   */
  function createKeyboardHelpWindowsForScene(scene) {
    scene._keyboardHelpWindows = [];
    const sceneName = SceneManager._scene.constructor.name;

    const sceneSettings = sceneKeySettings.filter((setting) => setting.sceneName === sceneName);

    if (sceneSettings.length === 0) return;

    for (const sceneSetting of sceneSettings) {
      const windowPosition = sceneSetting.windowPosition || 'left-bottom';
      const windowOffsetX = sceneSetting.windowOffsetX || 0;
      const windowOffsetY = sceneSetting.windowOffsetY || 0;
      const keyDescriptions = sceneSetting.keyDescriptions;
      const showDimmer = sceneSetting.showDimmer;
      const gameSwitchForVisible = sceneSetting.gameSwitch;

      const window = new Window_KeyboardHelp(
        windowPosition,
        windowOffsetX,
        windowOffsetY,
        keyDescriptions,
        showDimmer,
        gameSwitchForVisible
      );
      scene._keyboardHelpWindows.push(window);
      scene.addWindow(window);
    }
  }

  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_createAllWindows.call(this);
    createKeyboardHelpWindowsForScene(this);
  };

  const _Scene_Item_create = Scene_Item.prototype.create;
  Scene_Item.prototype.create = function () {
    _Scene_Item_create.call(this);
    createKeyboardHelpWindowsForScene(this);
  };

  const _Scene_Skill_create = Scene_Skill.prototype.create;
  Scene_Skill.prototype.create = function () {
    _Scene_Skill_create.call(this);
    createKeyboardHelpWindowsForScene(this);
  };

  const _Scene_Equip_create = Scene_Equip.prototype.create;
  Scene_Equip.prototype.create = function () {
    _Scene_Equip_create.call(this);
    createKeyboardHelpWindowsForScene(this);
  };

  const _Scene_Status_create = Scene_Status.prototype.create;
  Scene_Status.prototype.create = function () {
    _Scene_Status_create.call(this);
    createKeyboardHelpWindowsForScene(this);
  };

  const _Scene_Battle_create = Scene_Battle.prototype.create;
  Scene_Battle.prototype.create = function () {
    _Scene_Battle_create.call(this);
    createKeyboardHelpWindowsForScene(this);
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
    const textWidth = this.textWidth(buttonName);
    const buttonWidth = textWidth;
    const x = textState.x;
    const y = textState.y + (this.lineHeight() - buttonHeight) / 2 + buttonOffsetYInWindowMessage;

    // ボタンの描画
    drawButtonShapeToContents(this.contents, x, y, buttonWidth, buttonHeight, BUTTON_CORNER_RADIUS);

    const originalFontSize = this.contents.fontSize;
    const originalTextColor = this.contents.textColor;
    const originalOutlineColor = this.contents.outlineColor;

    // テキストの表示位置をボタンの中央に調整する
    const adjustedTextY =
      y + (buttonHeight - fontSize) / 2 - fontSize + this.itemPadding() + keyTextOffsetYInButton;

    this.contents.fontSize = fontSize;
    this.contents.textColor = 'white';
    this.contents.outlineColor = ColorManager.outlineColor();
    this.drawText(
      buttonName,
      x + BUTTON_MARGIN_X,
      adjustedTextY,
      buttonWidth - BUTTON_PADDING_X,
      'center'
    );
    this.contents.fontSize = originalFontSize;
    this.contents.textColor = originalTextColor;
    this.contents.outlineColor = originalOutlineColor;

    // テキストの位置をボタン分右に移動
    textState.x += buttonWidth + 4;
  };
})();
