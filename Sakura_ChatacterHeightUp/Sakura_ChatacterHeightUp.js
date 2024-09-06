/*:
 * @target MZ
 * @plugindesc キャラクターの頭身をアップします。
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * キャラクターの頭身をアップします。
 *
 * -------------------------------------------------
 * Sakura_ChatacterHeightUp
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/09/06 1.0.0 公開
 * -------------------------------------------------
 *
 * プラグインパラメータ:
 *
 * targetFiles: 頭身アップを適用するキャラクター画像ファイルのリスト。
 * それぞれのファイルに対して、8個のキャラクターインデックスの
 * 有効/無効を設定します。ファイルはimg/charactersフォルダから指定し、
 * インデックスは左上から右に1,2,3,4、折り返して5,6,7,8となっています。
 *
 * fileName: 頭身アップを適用するキャラクター画像ファイルの名前を指定します。
 *
 * characterIndexes: 8個のキャラクターインデックスに対して、頭身アップの
 * 有効/無効を設定します。trueで有効、falseで無効。左上から1～4、下段に
 * 5～8の順でインデックスが設定されています。
 *
 * note: メモ欄です。ここには自由にメモを記載できます。このメモは処理には
 * 使用されません。
 *
 * scaleUp: 頭身アップの倍率を設定します。1.0～2.0の範囲で設定可能。
 * 1.5～1.8くらいがいいと思います。
 *
 * @param targetFiles
 * @type struct<TargetFile>[]
 * @text 頭身アップ対象ファイルリスト
 * @desc 複数のファイル名とそれに対応する8個のキャラクターインデックスの有効/無効を設定します。
 * @default ["{\"fileName\":\"Actor1\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"Actor2\",\"characterIndexes\":\"[\\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\"]\"}","{\"fileName\":\"Actor3\",\"characterIndexes\":\"[\\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\"]\"}","{\"fileName\":\"Evil\",\"characterIndexes\":\"[\\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\"]\"}","{\"fileName\":\"Monster\",\"characterIndexes\":\"[\\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\"]\"}","{\"fileName\":\"People1\",\"characterIndexes\":\"[\\\"false\\\",\\\"false\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"1番目と2番目は子供なので対象外\"}","{\"fileName\":\"People2\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"false\\\",\\\"false\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"3番目と4番目は子供なので対象外\"}","{\"fileName\":\"People3\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"People4\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"SF_Actor1\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"SF_Actor2\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"SF_Actor3\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"SF_Monster\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"SF_People1\",\"characterIndexes\":\"[\\\"false\\\",\\\"false\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"1番目と2番目は子供なので対象外\"}","{\"fileName\":\"SF_People2\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"SF_People3\",\"characterIndexes\":\"[\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\",\\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"!Door1\",\"characterIndexes\":\"[\\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\", \\\"true\\\"]\",\"note\":\"\"}","{\"fileName\":\"!Door2\",\"characterIndexes\":\"[\\\"false\\\",\\\"false\\\",\\\"true\\\",\\\"true\\\",\\\"false\\\",\\\"false\\\",\\\"false\\\",\\\"false\\\"]\",\"note\":\"\"}"]
 *
 * @param scaleUp
 * @text 頭身アップ倍率
 * @desc 頭身アップ倍率です。1.5~1.8くらいが良いと思います。
 * @type select
 * @option 1.0
 * @option 1.1
 * @option 1.2
 * @option 1.3
 * @option 1.4
 * @option 1.5
 * @option 1.6
 * @option 1.7
 * @option 1.8
 * @option 1.9
 * @option 2.0
 * @default 1.7
 *
 */

/*~struct~TargetFile:
 * @param fileName
 * @type file
 * @dir img/characters
 * @text ファイル名
 * @desc 対象となるファイルの名前を指定します。
 *
 * @param characterIndexes
 * @type boolean[]
 * @text キャラクターインデックス有効
 * @desc 有効にするキャラクター番号を指定してください。左上から右に1,2,3,4折り返して5,6,7,8となっています。必ず8個の値を指定してください。（true: 有効, false: 無効）
 * @default ["true", "true", "true", "true", "true", "true", "true", "true"]
 *
 * @param note
 * @type multiline_string
 * @text メモ欄
 * @desc メモ欄です。これは処理には使用されませんので自由にメモしてください。
 * @default
 */

(() => {
  const pluginName = 'Sakura_ChatacterHeightUp';
  const parameters = PluginManager.parameters(pluginName);

  const rawTargetFiles = JSON.parse(parameters['targetFiles'] || '[]');
  /* TargetFiles をパース */
  const targetFiles = rawTargetFiles.map((rawFile) => {
    const parsedFile = JSON.parse(rawFile);
    // characterIndexesをboolean[]に変換
    parsedFile.characterIndexes = JSON.parse(parsedFile.characterIndexes).map(
      (index) => index === 'true'
    );
    return parsedFile;
  });

  const scaleUp = Number(parameters.scaleUp || 1.7);

  const HEAD_HEIGHT = 33; // headの高さ
  const BODY_HEIGHT = 8; // bodyの高さ
  const FOOT_HEIGHT = 7; // footの高さ

  // キャラクター名がターゲットリストにあるか確認
  Sprite_Character.prototype.needsScaleUpSize = function () {
    if (this._needsScaleUpSize !== null && this._needsScaleUpSize !== undefined)
      return this._needsScaleUpSize;

    for (const targetFile of targetFiles) {
      const { fileName, characterIndexes } = targetFile;
      if (this._characterName !== fileName) continue;
      const targetIndexes = characterIndexes
        .map((value, index) => (value === true ? index : null)) // true の場所をインデックスとして返す
        .filter((index) => index !== null); // nullを除外する
      if (targetIndexes.includes(this._characterIndex)) {
        this._needsScaleUpSize = true;
        return this._needsScaleUpSize;
      }
    }
    this._needsScaleUpSize = false;
    return this._needsScaleUpSize;
  };

  Sprite_Character.prototype.createBodyParts = function () {
    this.createHead();
    this.createBody();
    this.createFoot();
    this.adjustPartsPosition();
  };

  Sprite_Character.prototype.createHead = function () {
    if (!this._head) {
      this._head = new Sprite();
      this._head.anchor.x = 0.5;
      this._head.anchor.y = 1;
      this._head.scale.y = 1.0;
      this.addChild(this._head);
    }
  };

  Sprite_Character.prototype.createBody = function () {
    if (!this._body) {
      this._body = new Sprite();
      this._body.anchor.x = 0.5;
      this._body.anchor.y = 1;

      // needsScaleUpSizeがtrueならscaleUp、それ以外は通常のスケール
      if (this.needsScaleUpSize()) {
        this._body.scale.y = scaleUp; // bodyのスケールをscaleUp倍にする
      } else {
        this._body.scale.y = 1.0; // 通常のスケール
      }

      this.addChild(this._body);
    }
  };

  Sprite_Character.prototype.createFoot = function () {
    if (!this._foot) {
      this._foot = new Sprite();
      this._foot.anchor.x = 0.5;
      this._foot.anchor.y = 1;
      this.addChild(this._foot);
    }
  };

  Sprite_Character.prototype.adjustPartsPosition = function () {
    // 各部位の位置調整
    if (this.needsScaleUpSize()) {
      this._head.y = -BODY_HEIGHT * scaleUp - FOOT_HEIGHT; // headの位置を上に移動
      this._body.y = -FOOT_HEIGHT; // bodyの位置を調整
    } else {
      this._head.y = -BODY_HEIGHT - FOOT_HEIGHT; // 通常の高さに調整
      this._body.y = -FOOT_HEIGHT; // 通常の位置
    }

    this._foot.y = 0; // footはそのまま
  };

  const _Sprite_Character_prototype_updateCharacterFrame =
    Sprite_Character.prototype.updateCharacterFrame;
  Sprite_Character.prototype.updateCharacterFrame = function () {
    if (!this.needsScaleUpSize())
      return _Sprite_Character_prototype_updateCharacterFrame.call(this);

    const pw = this.patternWidth();
    const ph = this.patternHeight();
    const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    const sy = (this.characterBlockY() + this.characterPatternY()) * ph;

    // head, body, footの高さを指定してフレームを設定
    this.updateBodyParts();

    // head, body, footのそれぞれのフレーム
    this._head.setFrame(sx, sy, pw, HEAD_HEIGHT); // headのフレーム設定
    this._body.setFrame(sx, sy + HEAD_HEIGHT, pw, BODY_HEIGHT); // bodyのフレーム設定
    this._foot.setFrame(sx, sy + HEAD_HEIGHT + BODY_HEIGHT, pw, FOOT_HEIGHT); // footのフレーム設定

    // 全体のフレーム
    this.setFrame(sx, sy, 0, HEAD_HEIGHT + BODY_HEIGHT + FOOT_HEIGHT);
  };

  Sprite_Character.prototype.updateBodyParts = function () {
    this.createBodyParts();

    // head, body, footのビットマップを設定
    this._head.bitmap = this.bitmap;
    this._body.bitmap = this.bitmap;
    this._foot.bitmap = this.bitmap;

    // bushDepthが0より大きい場合、footの透明度を半透明に設定
    if (this._bushDepth > 0) {
      this._foot.opacity = 128; // footだけを半透明にする
    } else {
      this._foot.opacity = 255; // 通常は透明度100%に戻す
    }

    // 各パーツを表示
    this._head.visible = true;
    this._body.visible = true;
    this._foot.visible = true;

    // カラートーンとブレンドモードの適用
    this._head.setBlendColor(this.getBlendColor());
    this._body.setBlendColor(this.getBlendColor());
    this._foot.setBlendColor(this.getBlendColor());
    this._head.setColorTone(this.getColorTone());
    this._body.setColorTone(this.getColorTone());
    this._foot.setColorTone(this.getColorTone());
    this._head.blendMode = this.blendMode;
    this._body.blendMode = this.blendMode;
    this._foot.blendMode = this.blendMode;
  };
})();
