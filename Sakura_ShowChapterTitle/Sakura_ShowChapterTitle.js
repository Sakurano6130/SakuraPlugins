// Sakura_ShowChapterTitle 1.0.1
// Copyright (c) 2024 Sakurano
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2024/08/30 1.0.1 行の途中で文字の大きさを変える制御文字があった場合の不具合対応
 * 2024/08/29 1.0.0 公開
 */

/*:
 * @target MZ
 * @plugindesc 1.0.1 章タイトルをコマンド１つで表示し、
 * フォントや背景を自由にカスタマイズできるプラグインです。
 *
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * このプラグインは、複数行の章タイトルをフェードイン・表示・フェードアウト
 * 付きで表示します。各行ごとにフォントとサイズを指定でき、ピクチャの色調や
 * ぼかし効果を調整することが可能です。
 *
 * 主な機能:
 * - 複数行の章タイトル表示
 * - フェードイン・アウトのトランジション効果
 * - ピクチャ背景の使用と調整
 * - タイトルとピクチャの表示位置のカスタマイズ
 * - 表示完了までのウェイト機能
 *
 * パラメータ説明:
 * - fontFaces: 使用するフォントのファイル名を指定します。
 * - lines: 表示する章タイトルの各行を入力し、各行ごとにフォントとサイズを
 *   設定できます。
 * - duration: タイトルを表示する時間をフレーム数で指定します
 *   （60フレーム=1秒）。
 * - picture: タイトルの背景に使用するピクチャ画像を設定します。
 * - tone: ピクチャの色調を設定します（例: [赤, 緑, 青, グレー]）。
 * - roundEdge: ピクチャの四隅に丸みをつける度合いを指定します。
 * - blurValue: ピクチャ全体にかけるぼかしの強さを指定します。
 * - titlePosition: タイトルの表示位置を選択します（中央、左上、右上、
 *   左下、右下）。
 * - picturePosition: ピクチャの表示位置を選択します（中央、左上、右上、
 *   左下、右下）。
 * - waitForFinish: 表示が完了するまでイベントの進行をウェイトするかどうかを
 *   指定します。
 *
 * 独自のフォントを使用したい場合:
 * 1. プロジェクトフォルダ直下のfontsフォルダに、使用したいフォントの
 *    .ttfファイルを入れます。
 * 2. プラグインの設定のパラメータで、使用したいフォント名を指定します。
 *    （.ttfまで含めたファイル名を指定します。）
 * 3. フォントは複数指定できます。複数のフォントを指定する場合、指定した順に
 *    番号が割り当てられます。
 * 4. プラグインコマンドでタイトル行を入力する際に、使用したいフォントの
 *    番号を指定します。
 *
 * 使用方法:
 * 1. プラグインコマンド「showChapterTitle」を使用して章タイトルを表示します。
 * 2. linesパラメータで表示する各行のテキスト、フォント、サイズを設定します。
 * 3. 必要に応じて、背景のピクチャ、タイトルの表示位置、色調、ぼかし効果を
 *    調整します。
 * 4. 表示完了までイベントの進行を待機したい場合は、「waitForFinish」を
 *    有効に設定します。
 *
 * @param fontFiles
 * @desc 使用するフォントのファイル名
 * @text 使用するフォントのファイル名
 * @type string[]
 * @default []
 *
 * @command showChapterTitle
 * @text 章タイトル表示
 * @desc 複数行の章タイトルをトランジション表示します。
 *
 * @arg lines
 * @text タイトル行
 * @desc 表示する章タイトルの各行を入力してください。各行のフォントとサイズも指定できます。
 * @type struct<TitleLine>[]
 * @default []
 *
 * @arg duration
 * @text 表示時間
 * @desc タイトルを表示する時間（フレーム数、60フレーム=1秒）。
 * @type number
 * @default 240
 *
 * @arg picture
 * @text ピクチャ画像
 * @desc タイトル表示の背景に使用するピクチャ画像。
 * @type file
 * @dir img/pictures
 * @default
 *
 * @arg tone
 * @text 色調
 * @desc ピクチャの色調を設定します（[赤,緑,青,グレー]）。例: [0,0,0,0]
 * @type select
 * @default [0,0,0,0]
 * @option 通常
 * @value [0,0,0,0]
 * @option ダーク
 * @value [-68,-68,-68,0]
 * @option セピア
 * @value [34,-34,-68,170]
 * @option 夕暮れ
 * @value [68,-34,-34,0]
 * @option 夜
 * @value [-68,-68,0,68]
 *
 * @arg roundEdge
 * @text 四隅の丸み
 * @desc 四隅の丸み
 * @type number
 * @default 50
 *
 * @arg blurValue
 * @text ぼかしの強さ
 * @desc ぼかしの強さ
 * @type number
 * @default 2
 *
 * @arg titlePosition
 * @text タイトル表示位置
 * @desc タイトルの表示位置を選択します。
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
 * @arg picturePosition
 * @text ピクチャ表示位置
 * @desc ピクチャの表示位置を選択します。
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
 * @arg waitForFinish
 * @text 表示完了までウェイトするか
 * @desc 表示完了までウェイトするか
 * @type boolean
 * @default true
 *
 */

/*~struct~TitleLine:
 * @param text
 * @text テキスト
 * @desc 表示するテキストです。制御文字が使用できます。
 * @type string
 * @default 

 * @param fontFaceIndex
 * @text フォント番号
 * @desc この行に使用するフォント。指定がない場合はデフォルトのフォントが使用されます。
 * @type number
 * @default 0

 * @param fontSize
 * @text フォントサイズ
 * @desc この行に使用するフォントサイズ。指定がない場合はデフォルトサイズが使用されます。
 * @type number
 * @default 48
 */

(() => {
  // プラグイン名と設定を取得
  const pluginName = 'Sakura_ShowChapterTitle';
  const parameters = PluginManager.parameters(pluginName);

  const settings = {
    fontFiles: JSON.parse(parameters.fontFiles || '[]'),
  };

  /**
   * プラグインコマンドの登録
   */
  PluginManager.registerCommand(pluginName, 'showChapterTitle', function (args) {
    const lines = JSON.parse(args.lines ?? '[]').map((line) => JSON.parse(line));
    const duration = Number(args.duration || 240);
    const picture = String(args.picture || '');
    const tone = JSON.parse(args.tone || '[0, 0, 0, 0]');
    const roundEdge = Number(args.roundEdge || 50);
    const blurValue = Number(args.blurValue || 2);
    const titlePosition = String(args.titlePosition || 'center');
    const picturePosition = String(args.picturePosition || 'center');
    const waitForFinish = String(args.waitForFinish) === 'true';

    SceneManager._scene.showChapterTitleWindow(
      lines,
      duration,
      picture,
      tone,
      roundEdge,
      blurValue,
      titlePosition,
      picturePosition
    );

    if (waitForFinish) {
      this.wait(duration + 60 * 2);
    }
  });

  /**
   * 章タイトル表示用ウィンドウクラス
   * @class
   * @extends {Window_Base}
   */
  class Sakura_Window_ChapterTitle extends Window_Base {
    /**
     * コンストラクタ
     * @param {Rectangle} rect - ウィンドウの矩形範囲
     */
    constructor(rect) {
      super(rect);
      this.opacity = 0;
      this.contentsOpacity = 0;
      this._duration = 0;
      this._pictureSprite = null;
      this._phase = 'fadeIn';
      this._frameCount = 0;
      this._lines = [];
    }

    /**
     * 更新処理
     */
    update() {
      super.update();

      if (this._phase === 'fadeIn') {
        this.fadeIn();
      } else if (this._phase === 'display') {
        this.display();
      } else if (this._phase === 'fadeOut') {
        this.fadeOut();
      }
    }

    /**
     * フェードイン処理
     */
    fadeIn() {
      this.contentsOpacity += 255 / 60;
      if (this._pictureSprite) this._pictureSprite.opacity += 255 / 60;
      this._frameCount++;

      if (this._frameCount >= 60) {
        this._phase = 'display';
        this._frameCount = 0;
      }
    }

    /**
     * 表示処理
     */
    display() {
      this._frameCount++;
      if (this._frameCount >= this._duration) {
        this._phase = 'fadeOut';
        this._frameCount = 0;
      }
    }

    /**
     * フェードアウト処理
     */
    fadeOut() {
      this.contentsOpacity -= 255 / 60;
      if (this._pictureSprite) this._pictureSprite.opacity -= 255 / 60;
      this._frameCount++;

      if (this._frameCount >= 60) {
        this._phase = null;
        this.hide();
        if (this._pictureSprite) this.removeChild(this._pictureSprite);
      }
    }

    /**
     * タイトルを設定し、表示位置やエフェクトを適用します
     * @param {Array} lines - 表示する章タイトルの各行
     * @param {Number} duration - 表示時間（フレーム数）
     * @param {String} picture - ピクチャ画像のファイル名
     * @param {Array} tone - ピクチャの色調 [赤, 緑, 青, グレー]
     * @param {Number} roundEdge - ピクチャの四隅の丸みの度合い
     * @param {Number} blurValue - ピクチャ全体のぼかしの強さ
     * @param {String} titlePosition - タイトルの表示位置
     * @param {String} picturePosition - ピクチャの表示位置
     */
    setTitle(lines, duration, picture, tone, roundEdge, blurValue, titlePosition, picturePosition) {
      this.contents.clear();
      this._lines = lines;
      this._duration = duration;

      if (picture) {
        const bitmap = ImageManager.loadPicture(picture);
        bitmap.addLoadListener(() => {
          this._pictureSprite = new Sprite(bitmap);
          this._pictureSprite.opacity = 0;
          if (blurValue) {
            this.applyBlurValue(this._pictureSprite, blurValue);
          }
          this._pictureSprite.setColorTone(tone);
          this.applyRoundEdge(this._pictureSprite, roundEdge);
          this.setPosition(this._pictureSprite, picturePosition);
          this.addChildToBack(this._pictureSprite);
        });
      }

      this._phase = 'fadeIn';
      this._frameCount = 0;
      this.contentsOpacity = 0;
      if (this._pictureSprite) this._pictureSprite.opacity = 0;

      this.drawTitleLines(titlePosition);
    }

    /**
     * ピクチャの四隅を丸くする
     * @param {Sprite} sprite - 対象のスプライト
     * @param {Number} roundEdge - 丸みの度合い
     */
    applyRoundEdge(sprite, roundEdge) {
      const mask = new PIXI.Graphics();
      mask.beginFill(0xffffff);
      mask.drawRoundedRect(0, 0, sprite.width, sprite.height, roundEdge);
      mask.endFill();
      sprite.mask = mask;
      sprite.addChild(mask); // マスクをスプライトの子として追加
    }

    /**
     * ピクチャにぼかし効果を適用する
     * @param {Sprite} sprite - 対象のスプライト
     * @param {Number} blurValue - ぼかしの強さ
     */
    applyBlurValue(sprite, blurValue) {
      const blurFilter = new PIXI.filters.BlurFilter();
      blurFilter.blur = blurValue; // ぼかしの強さを調整
      sprite.filters = [blurFilter];
    }

    /**
     * スプライトの表示位置を設定する
     * @param {Sprite} sprite - 対象のスプライト
     * @param {String} position - 表示位置（topLeft, topRight, bottomLeft, bottomRight, center）
     */
    setPosition(sprite, position) {
      switch (position) {
        case 'topLeft':
          sprite.x = 0;
          sprite.y = 0;
          break;
        case 'topRight':
          sprite.x = this.width - sprite.width;
          sprite.y = 0;
          break;
        case 'bottomLeft':
          sprite.x = 0;
          sprite.y = this.height - sprite.height;
          break;
        case 'bottomRight':
          sprite.x = this.width - sprite.width;
          sprite.y = this.height - sprite.height;
          break;
        case 'center':
        default:
          sprite.x = (this.width - sprite.width) / 2;
          sprite.y = (this.height - sprite.height) / 2;
          break;
      }
    }

    /**
     * タイトル行を描画する
     * @param {String} position - タイトルの表示位置
     */
    drawTitleLines(position) {
      let totalHeight = 0;
      let maxWidth = 0;

      const textSizes = [];

      // 各行の高さを計算して合計します
      this._lines.forEach((line) => {
        const fontFace = this.getFontFace(line.fontFaceIndex);
        const fontSize = Number(line.fontSize || 48);

        this.contents.fontFace = fontFace;
        this.contents.fontSize = fontSize;
        const { width, height } = this.textSizeEx(line.text);
        textSizes.push({ width, height });
        totalHeight += height;
        maxWidth = Math.max(maxWidth, width);
      });

      let y;
      const paddingY = 30; // 端からの余白
      switch (position) {
        case 'topLeft':
        case 'topRight':
          y = paddingY;
          break;
        case 'bottomLeft':
        case 'bottomRight':
          y = this.height - totalHeight - paddingY;
          break;
        case 'center':
        default:
          y = (this.height - totalHeight) / 2;
          break;
      }

      this._lines.forEach((line, index) => {
        const fontFace = this.getFontFace(line.fontFaceIndex);
        const fontSize = Number(line.fontSize || 48);

        this.contents.fontFace = fontFace;
        this.contents.fontSize = fontSize;
        const textWidth = textSizes[index].width;
        const textHeight = textSizes[index].height;

        let x;
        const paddingX = 30; // 端からの余白
        switch (position) {
          case 'topLeft':
            x = paddingX;
            break;
          case 'topRight':
            x = this.width - textWidth - paddingX;
            break;
          case 'bottomLeft':
            x = paddingX;
            break;
          case 'bottomRight':
            x = this.width - textWidth - paddingX;
            break;
          case 'center':
          default:
            x = (this.width - textWidth) / 2;
            break;
        }

        this.drawTextEx(line.text, x, y, textWidth, fontFace, fontSize);
        y += textHeight;
      });
    }

    /**
     * 指定されたインデックスのフォントを取得
     * @param {Number} index - フォントのインデックス
     * @returns {String} フォント名
     */
    getFontFace(index) {
      if (index === 0 || index === undefined) {
        return $gameSystem.mainFontFace();
      } else {
        return `rmmz-subfont-${index}, ${$dataSystem.advanced.fallbackFonts}`;
      }
    }

    /**
     * テキストを描画
     * @param {String} text - 描画するテキスト
     * @param {Number} x - x座標
     * @param {Number} y - y座標
     * @param {Number} width - 描画範囲の幅
     * @returns {Number} テキストの幅
     */
    drawTextEx(text, x, y, width, fontFace, fontSize) {
      this.resetFontSettings(fontFace, fontSize);
      const textState = this.createTextState(text, x, y, width);
      this.processAllText(textState);
      return textState.outputWidth;
    }

    /**
     * テキストのサイズを計算
     * @param {String} text - 対象のテキスト
     * @returns {Object} テキストの幅と高さ
     */
    textSizeEx(text, fontFace, fontSize) {
      this.resetFontSettings(fontFace, fontSize);
      const textState = this.createTextState(text, 0, 0, 0);
      textState.drawing = false;
      this.processAllText(textState);
      return { width: textState.outputWidth, height: textState.outputHeight };
    }

    /**
     * テキストの高さを計算
     * @param {Object} textState - テキストの状態
     * @returns {Number} テキストの高さ
     */
    calcTextHeight(textState) {
      const lineSpacing = 10;
      const lastFontSize = this.contents.fontSize;
      const lines = textState.text.slice(textState.index).split('\n');
      const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
      this.contents.fontSize = lastFontSize;
      return textHeight;
    }

    /**
     * フォント設定をリセット
     * @param {String} fontFace - フォント名
     * @param {Number} fontSize - フォントサイズ
     */
    resetFontSettings(fontFace, fontSize) {
      if (fontFace) this.contents.fontFace = fontFace;
      if (fontSize) this.contents.fontSize = fontSize;
      this.resetTextColor();
    }
  }

  // シーンマップでウィンドウを作成する処理をオーバーライド
  const _Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    _Scene_Map_prototype_createAllWindows.call(this);
    this.createChapterTitleWindow();
  };

  /**
   * 章タイトルウィンドウの作成
   */
  Scene_Map.prototype.createChapterTitleWindow = function () {
    const rect = this.chapterTitleWindowRect();
    this._chapterTitleWindow = new Sakura_Window_ChapterTitle(rect);
    this.addWindow(this._chapterTitleWindow);
  };

  /**
   * 章タイトルウィンドウの矩形範囲を取得
   * @returns {Rectangle} ウィンドウの矩形範囲
   */
  Scene_Map.prototype.chapterTitleWindowRect = function () {
    const ww = Graphics.width;
    const wh = Graphics.height;
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
  };

  /**
   * 章タイトルウィンドウを表示
   * @param {Array} lines - 表示する章タイトルの各行
   * @param {Number} duration - 表示時間（フレーム数）
   * @param {String} picture - ピクチャ画像のファイル名
   * @param {Array} tone - ピクチャの色調 [赤, 緑, 青, グレー]
   * @param {Number} roundEdge - ピクチャの四隅の丸みの度合い
   * @param {Number} blurValue - ピクチャ全体のぼかしの強さ
   * @param {String} titlePosition - タイトルの表示位置
   * @param {String} picturePosition - ピクチャの表示位置
   */
  Scene_Map.prototype.showChapterTitleWindow = function (
    lines,
    duration,
    picture,
    tone,
    roundEdge,
    blurValue,
    titlePosition,
    picturePosition
  ) {
    this._chapterTitleWindow.setTitle(
      lines,
      duration,
      picture,
      tone,
      roundEdge,
      blurValue,
      titlePosition,
      picturePosition
    );
    this._chapterTitleWindow.show();
  };

  // フォントの読み込み処理をオーバーライド
  const _Scene_Boot_prototype_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
  Scene_Boot.prototype.loadGameFonts = function () {
    _Scene_Boot_prototype_loadGameFonts.call(this);
    let index = 0;
    for (const fontName of settings.fontFiles) {
      index += 1;
      FontManager.load(`rmmz-subfont-${index}`, fontName);
    }
  };
})();
