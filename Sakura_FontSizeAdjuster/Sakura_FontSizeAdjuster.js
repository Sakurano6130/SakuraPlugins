// Sakura_FontSizeAdjuster 1.0.0
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/08/30 1.0.0 初回公開
 */

/*:
 * @target MZ
 * @plugindesc 1.0.0 フォントサイズの増減幅を自由に設定できるプラグインです。
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * メッセージウィンドウの制御文字`\}` `\{`で変化させるフォントサイズの増減幅を
 * 自由に設定できるプラグインです。
 *
 * 主な機能:
 * - フォントサイズの増減幅を調整可能。
 *
 * パラメータの説明:
 * - FontSizeStep: フォントサイズを増減させる幅を指定します。
 *
 * @param FontSizeStep
 * @text フォントサイズの増減幅
 * @desc フォントサイズを増減させる幅を指定します。
 * @default 12
 * @type number
 *
 */

(() => {
  const pluginName = 'Sakura_FontSizeAdjuster';
  const parameters = PluginManager.parameters(pluginName);
  const fontSizeStep = Number(parameters['FontSizeStep'] || 12);

  /**
   * フォントサイズを大きくするメソッド。
   * @method makeFontBigger
   * @memberof Window_Base
   * @description 現在のフォントサイズが最大96以下の場合、フォントサイズを増加させます。
   */
  Window_Base.prototype.makeFontBigger = function () {
    if (this.contents.fontSize <= 96 - fontSizeStep) {
      this.contents.fontSize += fontSizeStep;
    }
  };

  /**
   * フォントサイズを小さくするメソッド。
   * @method makeFontSmaller
   * @memberof Window_Base
   * @description 現在のフォントサイズが最小24以上の場合、フォントサイズを減少させます。
   */
  Window_Base.prototype.makeFontSmaller = function () {
    if (this.contents.fontSize >= 24 + fontSizeStep) {
      this.contents.fontSize -= fontSizeStep;
    }
  };
})();
