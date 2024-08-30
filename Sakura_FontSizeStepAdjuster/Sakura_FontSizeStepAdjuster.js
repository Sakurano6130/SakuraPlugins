// Sakura_FontSizeStepAdjuster 1.1.0
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/08/31 1.0.1 デフォルト値を修正
 * 2024/08/30 1.0.0 初回公開
 */

/*:
 * @target MZ
 * @plugindesc 1.0.0 フォントサイズの増減幅および最大値と最小値を設定できるプラグインです。
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * フォントサイズの増減幅および最大値と最小値を設定できるプラグインです。
 *
 * 主な機能:
 * - フォントサイズの増減幅を調整可能。
 * - フォントサイズの最大値と最小値を設定可能。
 *
 * パラメータの説明:
 * - FontSizeStep: フォントサイズを増減させる幅を指定します。
 * - MaxFontSize: フォントサイズの最大値を指定します。
 * - MinFontSize: フォントサイズの最小値を指定します。
 *
 * @param FontSizeStep
 * @text フォントサイズの増減幅
 * @desc フォントサイズを増減させる幅を指定します。
 * @default 12
 * @type number
 *
 * @param MaxFontSize
 * @text フォントサイズの最大値
 * @desc フォントサイズの最大値を指定します。
 * @default 108
 * @type number
 *
 * @param MinFontSize
 * @text フォントサイズの最小値
 * @desc フォントサイズの最小値を指定します。
 * @default 12
 * @type number
 *
 */

(() => {
  const pluginName = 'Sakura_FontSizeStepAdjuster';
  const parameters = PluginManager.parameters(pluginName);
  const fontSizeStep = Number(parameters['FontSizeStep'] || 12);
  const maxFontSize = Number(parameters['MaxFontSize'] || 108);
  const minFontSize = Number(parameters['MinFontSize'] || 12);

  /**
   * フォントサイズを大きくするメソッド。
   * @method makeFontBigger
   * @memberof Window_Base
   * @description フォントサイズを増加させ、最大値を超えた場合は最大値に設定します。
   */
  Window_Base.prototype.makeFontBigger = function () {
    this.contents.fontSize = Math.min(this.contents.fontSize + fontSizeStep, maxFontSize);
  };

  /**
   * フォントサイズを小さくするメソッド。
   * @method makeFontSmaller
   * @memberof Window_Base
   * @description フォントサイズを減少させ、最小値を下回った場合は最小値に設定します。
   */
  Window_Base.prototype.makeFontSmaller = function () {
    this.contents.fontSize = Math.max(this.contents.fontSize - fontSizeStep, minFontSize);
  };
})();
