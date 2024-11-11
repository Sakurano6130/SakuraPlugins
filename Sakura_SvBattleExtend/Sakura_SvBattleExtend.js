/*:
 * @target MZ
 * @plugindesc 💥 ｻｲﾄﾞﾋﾞｭｰﾊﾞﾄﾙいい感じプラグイン
 * @author Sakurano
 * @url https://github.com/Sakurano6130/SakuraPlugins/
 * @help
 * ｻｲﾄﾞﾋﾞｭｰﾊﾞﾄﾙをいい感じにします
 *
 * -------------------------------------------------
 * Sakura_SvBattleExtend
 * Copyright (c) 2024 Sakurano
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------
 * 2024/11/11 1.1.1 トリアコンタン様の BattlerGraphicExtend.js でバトラーの拡大・縮小をしていたときに
 *                  拡大・縮小が維持されたまま息遣いするように機能追加
 * 2024/11/02 1.1.0 物理・魔法の判定方法を各スキルの命中タイプを元にするように変更
 *                  各スキルのメモ欄に<移動する>を書くと物理・魔法に関係なく移動する機能を追加
 *                  スキル使用時の武器の動きを修正
 * 2024/10/25 1.0.2 スキル使用の対象が自分１人だったときにジャンプしないように修正
 * 2024/10/09 1.0.1 バトルで投げる動作した直後に戦闘勝利し、その直後にメニューを開いた時に、
 *                  開いた時に、エラーになってしまうことがあったため修正
 *                  防御の動きを修正
 * 2024/10/07 1.0.0 公開
 * 2024/09/30 0.6.0 敵画像の上に線が出ていた不具合の対応
 *                  スキル表示のフキダシをオンオフにできるように
 *                  オフにするとツクールMZデフォルトのバトルログの
 *                  レイアウトになる
 *                  これにより他のプラグインの挙動を邪魔しないようにする
 * 2024/09/29 0.5.0 β版公開
 * -------------------------------------------------
 *
 * 使用方法:
 * https://github.com/Sakurano6130/SakuraPlugins/blob/main/Sakura_SvBattleExtend/Sakura_SvBattleExtend.md
 *
 * @command jump
 * @text 🦘 ジャンプ
 * @desc ジャンプ
 *
 * @arg anchor
 * @text 着地先(target:相手,self:自分)
 * @desc 着地先を決めてください。相手/自分
 * @type select
 * @default target
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @arg offsetX
 * @text 着地先からのX軸ｵﾌｾｯﾄ
 * @desc 着地先からのX軸ｵﾌｾｯﾄです
 * @type number
 * @default 100
 * @min -9999
 * @max 9999
 *
 * @arg offsetY
 * @text 着地先からのY軸ｵﾌｾｯﾄ
 * @desc 着地先からのY軸ｵﾌｾｯﾄです
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 20
 *
 * @arg jumpHeight
 * @text ｼﾞｬﾝﾌﾟの高さ（px）
 * @desc ｼﾞｬﾝﾌﾟの高さです。
 * @type number
 * @default 15
 *
 * @arg rotationAmount
 * @text 回転
 * @desc 1で左1回転、-1だと右1回転です。ただし対象がｴﾈﾐｰの時は逆になります
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @command rotate
 * @text 🔄 回転
 * @desc 回転
 *
 * @arg anchor
 * @text 回転する対象(target:相手,self:自分)
 * @desc 回転する対象を決めてください。相手/自分
 * @type select
 * @default target
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 20
 *
 * @arg rotationAmount
 * @text 回転
 * @desc 1で左1回転、-1だと右1回転です。ただし対象がｴﾈﾐｰの時は逆になります
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @command stepForward
 * @text ⬅️ 一歩前進
 * @desc 一歩前進
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 20
 *
 * @command stepBackward
 * @text ➡️ 一歩後退
 * @desc 一歩後退
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 20
 *
 * @command teleport
 * @text 🌀 ﾃﾚﾎﾟｰﾄ
 * @desc ﾃﾚﾎﾟｰﾄ
 *
 * @arg anchor
 * @text 移動先(target:相手,self:自分)
 * @desc 移動先を決めてください。相手/自分
 * @type select
 * @default target
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @arg offsetX
 * @text 移動先からのX軸ｵﾌｾｯﾄ
 * @desc 移動先からのX軸ｵﾌｾｯﾄです
 * @type number
 * @default 100
 * @min -9999
 * @max 9999
 *
 * @arg offsetY
 * @text 移動先からのY軸ｵﾌｾｯﾄ
 * @desc 移動先からのY軸ｵﾌｾｯﾄです
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 60
 *
 * @command float
 * @text 🪶 浮遊
 * @desc 浮遊
 *
 * @arg anchor
 * @text 移動先(target:相手,self:自分)
 * @desc 移動先を決めてください。相手/自分
 * @type select
 * @default target
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @arg offsetX
 * @text 移動先からのX軸ｵﾌｾｯﾄ
 * @desc 移動先からのX軸ｵﾌｾｯﾄです
 * @type number
 * @default 100
 * @min -9999
 * @max 9999
 *
 * @arg offsetY
 * @text 移動先からのY軸ｵﾌｾｯﾄ
 * @desc 移動先からのY軸ｵﾌｾｯﾄです
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 20
 *
 * @arg floatHeight
 * @text 浮遊の高さ
 * @desc 浮遊の高さです
 * @type number
 * @default 100
 *
 * @command fall
 * @text 🪂 落下
 * @desc 浮遊状態から落下します
 *
 * @command motion
 * @text 🤸 ﾓｰｼｮﾝ変更
 * @desc ﾓｰｼｮﾝ変更
 *
 * @arg motionType
 * @text ﾓｰｼｮﾝﾀｲﾌﾟ
 * @desc ﾓｰｼｮﾝﾀｲﾌﾟです。
 * @type select
 * @default
 * @option 前進 @value walk
 * @option 突き @value thrust
 * @option 逃げる @value escape
 * @option 通常攻撃 @value attack
 * @option 振り @value swing
 * @option 勝利 @value victory
 * @option 詠唱待機 @value chant
 * @option 飛び道具 @value missile
 * @option 瀕死 @value dying
 * @option 防御 @value guard
 * @option 汎用スキル @value skill
 * @option 状態異常 @value abnormal
 * @option ダメージ @value damage
 * @option 魔法 @value spell
 * @option 睡眠 @value sleep
 * @option 回避 @value evade
 * @option アイテム @value item
 * @option 戦闘不能 @value dead
 *
 * @command animation
 * @text ✨ ｱﾆﾒｰｼｮﾝ表示
 * @desc ｱﾆﾒｰｼｮﾝ
 *
 * @arg animationId
 * @text ｱﾆﾒｰｼｮﾝ
 * @desc ｱﾆﾒｰｼｮﾝです。
 * @type animation
 * @default 0
 *
 * @arg anchor
 * @text 表示する対象(target:相手,self:自分)
 * @desc 表示する対象を決めてください。相手/自分
 * @type select
 * @default target
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @command playSe
 * @text 🔊 SEの再生
 * @desc SEの再生
 *
 * @arg audioName
 * @text 再生するSE
 * @desc 再生するSEです
 * @type file
 * @dir audio/se
 * @default
 *
 * @arg volume
 * @text ﾎﾞﾘｭｰﾑ
 * @desc ﾎﾞﾘｭｰﾑです
 * @type number
 * @default 80
 *
 * @arg pitch
 * @text ﾋﾟｯﾁ
 * @desc ﾋﾟｯﾁです
 * @type number
 * @default 100
 *
 * @arg pan
 * @text ﾊﾟﾝ
 * @desc ﾊﾟﾝです
 * @type number
 * @default 0
 *
 * @command wait
 * @text ⏳ ウェイト
 * @desc ウェイト
 *
 * @arg waitTime
 * @text ｳｪｲﾄする時間
 * @desc ｳｪｲﾄする時間です。
 * @type number
 * @default 60
 *
 * @command throw
 * @text 🏹 投げる
 * @desc 投げる
 *
 * @arg anchor
 * @text 投げたものの着地点(target:相手,self:自分)
 * @desc 投げたものの着地点を決めてください。相手/自分
 * @type select
 * @default target
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @arg offsetX
 * @text 着地点からのX軸ｵﾌｾｯﾄ
 * @desc 着地点からのX軸ｵﾌｾｯﾄです
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg offsetY
 * @text 着地点からのY軸ｵﾌｾｯﾄ
 * @desc 着地点からのY軸ｵﾌｾｯﾄです
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 20
 *
 * @arg jumpHeight
 * @text 投げる軌道の高さ
 * @desc 投げる軌道の高さです
 * @type number
 * @default 100
 *
 * @arg rotationAmount
 * @text 回転
 * @desc 1で左1回転、-1だと右1回転です。ただし投げる主体がｴﾈﾐｰの時は逆になります
 * @type number
 * @default 0
 *
 * @arg animationId
 * @text ｱﾆﾒｰｼｮﾝ
 * @desc 飛んでいる間に表示するｱﾆﾒｰｼｮﾝです
 * @type animation
 * @default 0
 *
 * @command applyDamage
 * @text 💥 ﾀﾞﾒｰｼﾞ実行
 * @desc ﾀﾞﾒｰｼﾞ実行
 *
 * @command changeOpacity
 * @text 🌫️ 不透明度の変更
 * @desc 不透明度の変更
 *
 * @arg anchor
 * @text 不透明度を変える対象(target:相手,self:自分)
 * @desc 不透明度を変える対象を決めてください。相手/自分
 * @type select
 * @default self
 * @option 相手
 * @value target
 * @option 自分
 * @value self
 *
 * @arg opacity
 * @text 不透明度
 * @desc 不透明度です。
 * @type number
 * @default 255
 * @max 255
 *
 * @command attackMotion
 * @text ⚔️ 武器を振る
 * @desc 武器を振る動作をします
 *
 * @command showMessage1
 * @text 💬 ｽｷﾙﾒｯｾｰｼﾞ1表示
 * @desc ｽｷﾙﾒｯｾｰｼﾞ1表示をします（ｽｷﾙのﾒｯｾｰｼﾞ1の内容を表示します）
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 120
 *
 * @command showMessage2
 * @text 💬 ｽｷﾙﾒｯｾｰｼﾞ2表示
 * @desc ｽｷﾙﾒｯｾｰｼﾞ2表示をします（ｽｷﾙのﾒｯｾｰｼﾞ2の内容を表示します）
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 120
 *
 * @command showFreeMessage
 * @text 💬 ﾌﾘｰﾒｯｾｰｼﾞ表示
 * @desc ﾌﾘｰﾒｯｾｰｼﾞ表示をします
 *
 * @arg message
 * @text ﾁｬｯﾄ内容
 * @desc ﾁｬｯﾄ内容です。
 * @type string
 * @default
 *
 * @arg duration
 * @text かける時間（ﾌﾚｰﾑ）
 * @desc かける時間です。
 * @type number
 * @default 120
 *
 * @command callOtherAction
 * @text 📞 他ｱｸｼｮﾝ呼び出し
 * @desc 他ｱｸｼｮﾝ呼び出しをします
 *
 * @arg callActionName
 * @text 呼び出すｱｸｼｮﾝ名（ﾏｯﾌﾟｲﾍﾞﾝﾄ名）
 * @desc 呼び出すｱｸｼｮﾝ名（ﾏｯﾌﾟｲﾍﾞﾝﾄ名）です。
 * @type string
 * @default
 *
 * @command execScript
 * @text 💻 ｽｸﾘﾌﾟﾄ
 * @desc ｽｸﾘﾌﾟﾄを実行します（thisは実行しているﾊﾞﾄﾗｰになります）
 *
 * @arg script
 * @text script内容
 * @desc script内容です。
 * @type multiline_string
 * @default
 *
 * @param layoutDamagePop
 * @text 💥 ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟのﾚｲｱｳﾄ ---
 *
 * @param fontFile
 * @parent layoutDamagePop
 * @desc 使用するﾌｫﾝﾄのﾌｧｲﾙ名
 * @text 使用するﾌｫﾝﾄのﾌｧｲﾙ名（拡張子.ttfまで含みます）
 * @type string
 * @default
 *
 * @param damagePopMainFontSize
 * @parent layoutDamagePop
 * @text ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟﾒｲﾝﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟﾒｲﾝﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 32
 *
 * @param damagePopSubFontSize
 * @parent layoutDamagePop
 * @text ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟｻﾌﾞﾌｫﾝﾄｻｲｽﾞ
 * @desc ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟｻﾌﾞﾌｫﾝﾄｻｲｽﾞです（WEAK!などの文字のことです）
 * @type number
 * @default 16
 *
 * @param durationOfDamagePop
 * @parent layoutDamagePop
 * @text ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟの表示時間
 * @desc ﾀﾞﾒｰｼﾞﾎﾟｯﾌﾟの表示時間です
 * @type number
 * @default 200
 *
 * @param textForMiss
 * @parent layoutDamagePop
 * @text ﾐｽのときに表示する文字
 * @desc ﾐｽのときに表示する文字です
 * @type string
 * @default MISS!
 *
 * @param textForEvade
 * @parent layoutDamagePop
 * @text 回避のときに表示する文字
 * @desc 回避のときに表示する文字です
 * @type string
 * @default DODGE!
 *
 * @param textForWeak
 * @parent layoutDamagePop
 * @text 弱点をついたときに表示する文字
 * @desc 弱点をついたときに表示する文字です
 * @type string
 * @default WEAK!
 *
 * @param textForReduce
 * @parent layoutDamagePop
 * @text 耐性があったときに表示する文字
 * @desc 耐性があったときに表示する文字です
 * @type string
 * @default REDUCE!
 *
 * @param textForCritical
 * @parent layoutDamagePop
 * @text クリティカルときに表示する文字
 * @desc クリティカルときに表示する文字です
 * @type string
 * @default CRITICAL!
 *
 * @param lineSpace
 * @parent layoutDamagePop
 * @text 同時にﾀﾞﾒｰｼﾞがあったときの行間
 * @desc 同時にﾀﾞﾒｰｼﾞがあったときの行間です
 * @type number
 * @min -9999
 * @max 9999
 * @default 24
 *
 * @param weaponDisplay
 * @text ⚔️ 武器表示設定 ---
 *
 * @param settingBareHands
 * @parent weaponDisplay
 * @text 素手
 * @desc 素手
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingDagger
 * @parent weaponDisplay
 * @text 短剣
 * @desc 短剣
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingSword
 * @parent weaponDisplay
 * @text 剣
 * @desc 剣
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingFlail
 * @parent weaponDisplay
 * @text フレイル
 * @desc フレイル
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingAxe
 * @parent weaponDisplay
 * @text 斧
 * @desc 斧
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-6","offsetY":"-38","angle":"0"}
 *
 * @param settingWhip
 * @parent weaponDisplay
 * @text ムチ
 * @desc ムチ
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingStaff
 * @parent weaponDisplay
 * @text 杖
 * @desc 杖
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-38","angle":"0"}
 *
 * @param settingBow
 * @parent weaponDisplay
 * @text 弓
 * @desc 弓
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-14","offsetY":"-22","angle":"-60"}
 *
 * @param settingCrossbow
 * @parent weaponDisplay
 * @text クロスボウ
 * @desc クロスボウ
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-14","offsetY":"-24","angle":"0"}
 *
 * @param settingGun
 * @parent weaponDisplay
 * @text 銃
 * @desc 銃
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-6","offsetY":"-28","angle":"20"}
 *
 * @param settingClaw
 * @parent weaponDisplay
 * @text 爪
 * @desc 爪
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-4","offsetY":"-28","angle":"20"}
 *
 * @param settingGlove
 * @parent weaponDisplay
 * @text グローブ
 * @desc グローブ
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-6","offsetY":"-28","angle":"20"}
 *
 * @param settingSpear
 * @parent weaponDisplay
 * @text 槍
 * @desc 槍
 * @type struct<WeaponDisplaySetting>
 * @default {"offsetX":"-10","offsetY":"-28","angle":"20"}
 *
 * @param skillDisplay
 * @text ⚡ ｽｷﾙ表示設定 ---
 *
 * @param showSkillNameExtend
 * @parent skillDisplay
 * @text ｽｷﾙ表示拡張機能のｵﾝｵﾌ
 * @desc ｽｷﾙ表示拡張機能のｵﾝｵﾌです。ｵﾌにするとﾃﾞﾌｫﾙﾄのﾛｸﾞ表示になります。他ﾌﾟﾗｸﾞｲﾝをお使いで邪魔されたくない方はｵﾌにしてください。
 * @type boolean
 * @default true
 *
 * @param skillDisplayFontSize
 * @parent skillDisplay
 * @text ｽｷﾙ表示のﾌｫﾝﾄｻｲｽﾞ
 * @desc ｽｷﾙ表示のﾌｫﾝﾄｻｲｽﾞです
 * @type number
 * @default 16
 *
 * @param skillDisplayFontColorByEnemy
 * @parent skillDisplay
 * @text 敵のｽｷﾙ表示の文字色
 * @desc 敵のｽｷﾙ表示の文字色です
 * @type color
 * @default 20
 *
 * @param skillDisplayFontColorForAttack
 * @parent skillDisplay
 * @text 味方の通常攻撃のｽｷﾙ表示の文字色
 * @desc 味方の通常攻撃のｽｷﾙ表示の文字色です
 * @type color
 * @default 0
 *
 * @param skillDisplayFontColorForFriend
 * @parent skillDisplay
 * @text 味方の味方へのｽｷﾙ表示の文字色
 * @desc 味方の味方へのｽｷﾙ表示の文字色です
 * @type color
 * @default 24
 *
 * @param skillDisplayFontColorForEnemy
 * @parent skillDisplay
 * @text 味方の敵へのｽｷﾙ表示の文字色
 * @desc 味方の敵へのｽｷﾙ表示の文字色です
 * @type color
 * @default 6
 *
 * @param battleLog
 * @text 📜 ﾊﾞﾄﾙﾛｸﾞ設定 ---
 *
 * @param showBattleLog
 * @parent battleLog
 * @text ﾊﾞﾄﾙﾛｸﾞを表示するかどうか
 * @desc ﾊﾞﾄﾙﾛｸﾞを表示するかどうかです。
 * @type boolean
 * @default true
 *
 * @param actionDefinition
 * @text 📜 ｱｸｼｮﾝ定義設定 ---
 *
 * @param actionMapId
 * @parent actionDefinition
 * @text ｱｸｼｮﾝ定義を登録するﾏｯﾌﾟID
 * @desc ｱｸｼｮﾝ定義を登録するﾏｯﾌﾟID
 * @type number
 * @default 0
 *
 * @param otherSettings
 * @text ⚙️ その他設定 ---
 *
 * @param reflectAnimation
 * @parent otherSettings
 * @text 魔法反射時のアニメーション
 * @desc 魔法反射時のアニメーションです
 * @type animation
 * @default 53
 *
 */

/*~struct~WeaponDisplaySetting:
 * @param offsetX
 * @text X軸位置調整
 * @desc X軸位置調整
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param offsetY
 * @text Y軸位置調整
 * @desc Y軸位置調整
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 *
 * @param angle
 * @text 傾き
 * @desc 傾き
 * @type number
 * @min -360
 * @max 360
 * @default 0
 *
 */

(() => {
  const pluginName = 'Sakura_SvBattleExtend';

  // ---------------------------------------------------------------------
  // プラグインパラメータの取得
  // ---------------------------------------------------------------------
  const parameters = PluginManager.parameters(pluginName);
  const fontFile = String(parameters['fontFile'] || '');
  const damagePopMainFontSize = Number(parameters['damagePopMainFontSize'] || 32);
  const damagePopSubFontSize = Number(parameters['damagePopSubFontSize'] || 16);
  const durationOfDamagePop = Number(parameters['durationOfDamagePop'] || 200);
  const textForMiss = String(parameters['textForMiss'] || 'MISS!');
  const textForEvade = String(parameters['textForEvade'] || 'DODGE!');
  const textForWeak = String(parameters['textForWeak'] || 'WEAK!');
  const textForReduce = String(parameters['textForReduce'] || 'WEAK!');
  const textForCritical = String(parameters['textForCritical'] || 'CRITICAL!');
  const lineSpace = Number(parameters['lineSpace'] || 24);

  const showEnemyName = parameters['showEnemyName'] === 'true';
  const enemyNameFontSize = Number(parameters['enemyNameFontSize'] || 16);
  const enemyNameWidth = Number(parameters['enemyNameWidth'] || 128);
  const showEnemyGauge = parameters['showEnemyGauge'] === 'true';

  const reflectAnimation = Number(parameters['reflectAnimation'] || 53);

  const enemyGaugeLabelFontSize = Number(parameters['enemyGaugeLabelFontSize'] || 12);
  const enemyGaugeValueFontSize = Number(parameters['enemyGaugeValueFontSize'] || 12);
  const enemyGaugeWidth = Number(parameters['enemyGaugeWidth'] || 80);

  // プラグインパラメータとしては未開放
  const enemyGaugeHeight = Number(parameters['enemyGaugeHeight'] || 6);
  const gaugeColorHp1 = Number(parameters['gaugeColorHp1'] || 20);
  const gaugeColorHp2 = Number(parameters['gaugeColorHp2'] || 21);
  const gaugeColorMp1 = Number(parameters['gaugeColorMp1'] || 22);
  const gaugeColorMp2 = Number(parameters['gaugeColorMp2'] || 23);
  const gaugeColorTp1 = Number(parameters['gaugeColorTp1'] || 28);
  const gaugeColorTp2 = Number(parameters['gaugeColorTp2'] || 29);

  // デフォルトの設定値
  const defaultSetting = { offsetX: -10, offsetY: -38, angle: 0 };

  // JSONパースの安全処理関数 (Numberに変換)
  function parseSetting(param, defaultValue) {
    try {
      const parsed = JSON.parse(param);
      return {
        offsetX: Number(parsed.offsetX),
        offsetY: Number(parsed.offsetY),
        angle: Number(parsed.angle),
      };
    } catch (error) {
      console.warn(`Failed to parse setting: ${param}, using default value.`);
      return {
        offsetX: Number(defaultValue.offsetX),
        offsetY: Number(defaultValue.offsetY),
        angle: Number(defaultValue.angle),
      };
    }
  }

  const weaponDisplaySettings = [
    {
      name: 'bareHands',
      setting: parseSetting(parameters['settingBareHands'], defaultSetting),
    },
    {
      name: 'dagger',
      setting: parseSetting(parameters['settingDagger'], defaultSetting),
    },
    {
      name: 'sword',
      setting: parseSetting(parameters['settingSword'], defaultSetting),
    },
    {
      name: 'flail',
      setting: parseSetting(parameters['settingFlail'], defaultSetting),
    },
    {
      name: 'axe',
      setting: parseSetting(parameters['settingAxe'], {
        offsetX: -6,
        offsetY: -38,
        angle: 0,
      }),
    },
    {
      name: 'whip',
      setting: parseSetting(parameters['settingWhip'], defaultSetting),
    },
    {
      name: 'staff',
      setting: parseSetting(parameters['settingStaff'], defaultSetting),
    },
    {
      name: 'bow',
      setting: parseSetting(parameters['settingBow'], {
        offsetX: -14,
        offsetY: -22,
        angle: -60,
      }),
    },
    {
      name: 'crossbow',
      setting: parseSetting(parameters['settingCrossbow'], {
        offsetX: -14,
        offsetY: -24,
        angle: 0,
      }),
    },
    {
      name: 'gun',
      setting: parseSetting(parameters['settingGun'], {
        offsetX: -6,
        offsetY: -28,
        angle: 20,
      }),
    },
    {
      name: 'claw',
      setting: parseSetting(parameters['settingClaw'], {
        offsetX: -4,
        offsetY: -28,
        angle: 20,
      }),
    },
    {
      name: 'glove',
      setting: parseSetting(parameters['settingGlove'], {
        offsetX: -6,
        offsetY: -28,
        angle: 20,
      }),
    },
    {
      name: 'spear',
      setting: parseSetting(parameters['settingSpear'], {
        offsetX: -10,
        offsetY: -28,
        angle: 20,
      }),
    },
  ];

  const showSkillNameExtend = parameters['showSkillNameExtend'] !== 'false';
  const skillDisplayFontSize = Number(parameters['skillDisplayFontSize'] || 16);
  const skillDisplayFontColorByEnemy = Number(parameters['skillDisplayFontColorByEnemy'] || 20);
  const skillDisplayFontColorForAttack = Number(parameters['skillDisplayFontColorForAttack'] || 0);
  const skillDisplayFontColorForFriend = Number(parameters['skillDisplayFontColorForFriend'] || 24);
  const skillDisplayFontColorForEnemy = Number(parameters['skillDisplayFontColorForEnemy'] || 6);

  const actionMapId = Number(parameters['actionMapId'] || 0);

  const showBattleLog = parameters['showBattleLog'] !== 'false';

  // ---------------------------------------------------------------------
  // メモ欄定数
  // ---------------------------------------------------------------------
  const NOTE = {
    NORMAL_ATTACK_JUMP: 'ジャンプ通常攻撃',
    NORMAL_ATTACK_STEP_FORWARD: '前進通常攻撃',
    ACTION: 'アクション',
    NEED_MOVE: '移動する',
    NO_MOVE: '移動しない',
    NO_BREATHE: '息しない',
    NO_NAME: '名前表示しない',
    NO_HUD: 'ステータス表示しない',
    JUMP_HIGH: 'ハイジャンプ',
    JUMP_ROTATE: '回転ジャンプ',
    JUMP_ROTATE_HIGH: '回転ハイジャンプ',
  };

  // ---------------------------------------------------------------------
  // アクションイベントマップ読込処理の追加
  // ---------------------------------------------------------------------
  const _Game_Temp_prototype_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_prototype_initialize.call(this);
    DataManager.loadMapDataAction();
  };

  let dataMapActionExists = false;

  DataManager.loadMapDataAction = function () {
    const mapId = actionMapId;
    if (!mapId) return;
    dataMapActionExists = true;
    const filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$dataMapAction', filename);
  };

  // ---------------------------------------------------------------------
  // 共通関数
  // ---------------------------------------------------------------------
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

  /**
   * 六角形の背景を描画する関数
   *
   * @param {Object} params - 描画に使用するパラメータオブジェクト
   * @param {CanvasRenderingContext2D} params.ctx - 描画対象のキャンバスのコンテキスト
   * @param {number} params.x - 六角形の左上のX座標
   * @param {number} params.y - 六角形の左上のY座標
   * @param {number} params.width - 六角形の幅
   * @param {number} params.height - 六角形の高さ
   */
  const drawHexBackground = ({ ctx, x, y, width, height }) => {
    // 六角形の描画開始
    ctx.beginPath();
    const horizontalLineLength = width * 0.9; // 上下の直線の長さ

    // 六角形の6つの頂点を定義（上下は長い横線、左右が頂点）
    ctx.moveTo(x + (width - horizontalLineLength) / 2, y); // 左の頂点
    ctx.lineTo(x + (width - horizontalLineLength) / 2 + horizontalLineLength, y); // 上横線
    ctx.lineTo(x + width, y + height / 2); // 右の頂点
    ctx.lineTo(x + (width - horizontalLineLength) / 2 + horizontalLineLength, y + height); // 下横線
    ctx.lineTo(x + (width - horizontalLineLength) / 2, y + height); // 下左頂点
    ctx.lineTo(x, y + height / 2); // 左の頂点
    ctx.closePath(); // 六角形の閉じ

    // 背景色を設定して塗りつぶす（枠線なし）
    const bgColor = 'rgba(0, 0, 0, 0.5)'; // 背景色
    ctx.fillStyle = bgColor;
    ctx.fill(); // 六角形を塗りつぶす
  };

  // ---------------------------------------------------------------------
  // イベントがない場合のプリセット
  // ---------------------------------------------------------------------
  const ACTION_PRESET = {
    ジャンプ通常攻撃: [
      {
        actionName: 'jump',
        anchor: 'target',
        offsetX: 100,
        duration: 20,
        jumpHeight: 15,
        rotationAmount: 0,
      },
      { actionName: 'attackMotion' },
    ],
    前進通常攻撃: [{ actionName: 'stepForward', duration: 10 }, { actionName: 'attackMotion' }],
    ハイジャンプ: [
      { actionName: 'motion', motionType: 'guard' },
      { actionName: 'wait', waitTime: 60 },
      {
        actionName: 'jump',
        anchor: 'target',
        duration: 60,
        jumpHeight: 1000,
        rotationAmount: 0,
        offsetX: 30,
      },
    ],
    回転ジャンプ: [
      { actionName: 'motion', motionType: 'guard' },
      { actionName: 'wait', waitTime: 60 },
      {
        actionName: 'jump',
        anchor: 'target',
        duration: 40,
        jumpHeight: 100,
        rotationAmount: 1,
        offsetX: 30,
      },
    ],
    大魔法: [
      { actionName: 'showFreeMessage', message: '詠唱！' },
      { actionName: 'motion', motionType: 'chant' },
      { actionName: 'float', anchor: 'self', offsetX: 20, floatHeight: 40, duration: 60 },
      { actionName: 'motion', motionType: 'spell' },
      { actionName: 'wait', waitTime: 40 },
    ],
    テレポート: [
      { actionName: 'motion', motionType: 'chant' },
      { actionName: 'teleport', anchor: 'target', offsetX: 100, duration: 60 },
      { actionName: 'wait', waitTime: 20 },
      { actionName: 'attackMotion' },
    ],
    バク転: [
      {
        actionName: 'jump',
        anchor: 'self',
        duration: 15,
        jumpHeight: 50,
        rotationAmount: -1,
        offsetX: 30,
      },
      { actionName: 'attackMotion' },
    ],
    瞬足剣: [
      { actionName: 'changeOpacity', anchor: 'self', opacity: 50 },
      {
        actionName: 'jump',
        anchor: 'target',
        offsetX: -150,
        offsetY: 0,
        duration: 10,
        jumpHeight: 15,
        rotationAmount: 0,
      },
      { actionName: 'applyDamage' },
      { actionName: 'animation', anchor: 'target', animationId: 7 },
      { actionName: 'changeOpacity', anchor: 'self', opacity: 255 },
      { actionName: 'wait', waitTime: 60 },
      { actionName: 'attackMotion' },
    ],
    二段ジャンプ: [
      {
        actionName: 'jump',
        anchor: 'target',
        offsetX: 300,
        offsetY: 50,
        duration: 20,
        jumpHeight: 100,
        rotationAmount: -1,
      },
      {
        actionName: 'jump',
        anchor: 'target',
        offsetX: 30,
        offsetY: 0,
        duration: 40,
        jumpHeight: 300,
        rotationAmount: 1,
      },
      { actionName: 'applyDamage' },
    ],
    弓矢: [
      { actionName: 'stepForward', duration: 20 },
      { actionName: 'attackMotion' },
      {
        actionName: 'throw',
        eventId: 10,
        anchor: 'target',
        offsetX: 30,
        offsetY: -60,
        duration: 60,
        jumpHeight: 100,
        rotationAmount: 0,
      },
    ],
    クロスボウ: [
      { actionName: 'stepForward', duration: 20 },
      { actionName: 'attackMotion' },
      {
        actionName: 'throw',
        eventId: 11,
        anchor: 'target',
        offsetX: 30,
        offsetY: -60,
        duration: 20,
        jumpHeight: 20,
        rotationAmount: 0,
      },
    ],
  };

  // ---------------------------------------------------------------------
  // アクションイベント管理クラス
  // ---------------------------------------------------------------------
  class ActionEventManager {
    constructor() {
      this._cache = {};
    }

    getEventFromDataMapActionByName(itemActionName) {
      if (!dataMapActionExists) return undefined;
      return $dataMapAction.events.find((event) => !!event && event.name === itemActionName);
    }

    findProperPage(pages) {
      const meetsConditions = (page) => {
        const c = page.conditions;
        if (c.switch1Valid) {
          if (!$gameSwitches.value(c.switch1Id)) return false;
        }
        if (c.switch2Valid) {
          if (!$gameSwitches.value(c.switch2Id)) return false;
        }
        if (c.variableValid) {
          if ($gameVariables.value(c.variableId) < c.variableValue) return false;
        }
        if (c.selfSwitchValid) {
          const key = [this._mapId, this._eventId, c.selfSwitchCh];
          if ($gameSelfSwitches.value(key) !== true) return false;
        }
        if (c.itemValid) {
          const item = $dataItems[c.itemId];
          if (!$gameParty.hasItem(item)) return false;
        }
        if (c.actorValid) {
          const actor = $gameActors.actor(c.actorId);
          if (!$gameParty.members().includes(actor)) return false;
        }
        return true;
      };

      for (const page of pages) {
        if (meetsConditions(page)) return page;
      }
      return undefined;
    }

    showPictureCommand(list, parameters) {
      const [pictureId, name, origin, directDesignation, x, y, scaleX, scaleY, opacity, blendMode] =
        parameters;
      list.push({
        actionName: 'showPicture',
        pictureId,
        name,
        origin,
        directDesignation,
        x,
        y,
        scaleX,
        scaleY,
        opacity,
        blendMode,
      });
    }

    movePictureCommand(list, parameters) {
      const [
        pictureId,
        name,
        origin,
        directDesignation,
        x,
        y,
        scaleX,
        scaleY,
        opacity,
        blendMode,
        duration,
        wait,
        easingType,
      ] = parameters;
      list.push({
        actionName: 'movePicture',
        pictureId,
        name,
        origin,
        directDesignation,
        x,
        y,
        scaleX,
        scaleY,
        opacity,
        blendMode,
        duration,
        wait,
        easingType,
      });
    }

    rotatePictureCommand(list, parameters) {
      const [pictureId, speed] = parameters;
      list.push({
        actionName: 'rotatePicture',
        pictureId,
        speed,
      });
    }

    tintPictureCommand(list, parameters) {
      const [pictureId, tone, duration] = parameters;
      list.push({
        actionName: 'tintPicture',
        pictureId,
        tone,
        duration,
        wait,
      });
    }

    erasePictureCommand(list, parameters) {
      const [pictureId] = parameters;
      list.push({
        actionName: 'erasePicture',
        pictureId,
      });
    }

    svBattleExtendCommand(list, eventId, parameters) {
      const [
        pluginName,
        pluginCommand,
        _,
        {
          duration,
          jumpHeight,
          rotationAmount,
          anchor,
          offsetX,
          offsetY,
          waitTime,
          motionType,
          floatHeight,
          animationId,
          audioName,
          volume,
          pitch,
          pan,
          opacity,
          message,
          callActionName,
          script,
        },
      ] = parameters;
      if (pluginName === 'Sakura_SvBattleExtend') {
        if (pluginCommand === 'callOtherAction') {
          const childList = this.getActionListFromDataMapActionEvents(callActionName);
          for (const childAction of childList) {
            list.push(childAction);
          }
        } else {
          list.push({
            actionName: pluginCommand,
            duration: Number(duration ?? 0),
            jumpHeight: Number(jumpHeight ?? 0),
            rotationAmount: Number(rotationAmount ?? 0) * -1,
            anchor,
            offsetX: Number(offsetX ?? 0),
            offsetY: Number(offsetY ?? 0),
            waitTime: Number(waitTime ?? 0),
            motionType,
            floatHeight: Number(floatHeight ?? 0),
            animationId: Number(animationId ?? 0),
            audioName,
            volume: Number(volume ?? 0),
            pitch: Number(pitch ?? 0),
            pan: Number(pan ?? 0),
            opacity: Number(opacity ?? 0),
            eventId,
            message,
            script,
          });
        }
      }
    }

    getActionList(eventId, eventList) {
      const list = [];
      for (const { code, parameters } of eventList) {
        const SHOW_PICTURE_COMMAND = 231;
        if (code === SHOW_PICTURE_COMMAND) {
          this.showPictureCommand(list, parameters);
        }
        const MOVE_PICTURE_COMMAND = 232;
        if (code === MOVE_PICTURE_COMMAND) {
          this.movePictureCommand(list, parameters);
        }
        const ROTATE_PICTURE_COMMAND = 233;
        if (code === ROTATE_PICTURE_COMMAND) {
          this.rotatePictureCommand(list, parameters);
        }
        const TINT_PICTURE_COMMAND = 234;
        if (code === TINT_PICTURE_COMMAND) {
          this.tintPictureCommand(list, parameters);
        }
        const ERASE_PICTURE_COMMAND = 235;
        if (code === ERASE_PICTURE_COMMAND) {
          this.erasePictureCommand(list, parameters);
        }
        const CODE_PLUGIN_COMMAND = 357;
        if (code === CODE_PLUGIN_COMMAND) {
          this.svBattleExtendCommand(list, eventId, parameters);
        }
      }
      return list;
    }

    getActionListFromDataMapActionEvents(itemActionName) {
      if (this._cache[itemActionName]) return this._cache[itemActionName];

      const event = this.getEventFromDataMapActionByName(itemActionName);

      if (!event) {
        const preset = ACTION_PRESET[itemActionName] ?? [];
        this._cache[itemActionName] = preset;
        return preset;
      }
      const page = this.findProperPage(event.pages);
      if (!page) {
        const preset = ACTION_PRESET[itemActionName] ?? [];
        this._cache[itemActionName] = preset;
        return preset;
      }

      const actionList = this.getActionList(event.id, page.list);
      this._cache[itemActionName] = actionList;
      return actionList;
    }

    clearCache() {
      this._cache = {};
    }
  }

  const actionEventManager = new ActionEventManager();
  window['actionEventManager'] = actionEventManager;

  // ---------------------------------------------------------------------
  // Spriteset_Battle の拡張
  // ---------------------------------------------------------------------
  const _Spriteset_Battle_prototype_initialize = Spriteset_Battle.prototype.initialize;
  Spriteset_Battle.prototype.initialize = function () {
    _Spriteset_Battle_prototype_initialize.call(this);
    this._throwObjects = [];
  };

  // findTargetSpriteの拡張
  const _Spriteset_Battle_prototype_findTargetSprite = Spriteset_Battle.prototype.findTargetSprite;
  Spriteset_Battle.prototype.findTargetSprite = function (target) {
    // 通常のターゲットスプライト検索
    const found = _Spriteset_Battle_prototype_findTargetSprite.call(this, target);
    if (found) return found; // 見つかればそれを返す

    // 見つからなければ、_throwObjects の中から該当するスプライトを検索
    return this._throwObjects.find(
      (sprite) => sprite._uniqueId === target._uniqueId // uniqueId が一致するかどうか
    );
  };

  // ヘルパー関数
  const findSprite = (target) => SceneManager._scene._spriteset.findTargetSprite(target);

  /**
   * Spriteset_Battle.prototype.createLowerLayerの元のメソッドを呼び出し、
   * 追加のスプライトレイヤー（ダメージスプライトレイヤーとチャットバブルスプライトレイヤー）を作成する。
   */
  const _Spriteset_Battle_prototype_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function () {
    _Spriteset_Battle_prototype_createLowerLayer.call(this); // 元の処理を呼び出す
    this.createDamageSpriteLayer(); // ダメージスプライトレイヤーを作成
    this.createChatBubbleSpriteLayer(); // チャットバブルスプライトレイヤーを作成
    this.createThrowObjectLayer(); // 投擲オブジェクトレイヤーを作成
  };

  /**
   * ダメージスプライトレイヤーを作成し、バトルフィールドに追加する。
   */
  Spriteset_Battle.prototype.createDamageSpriteLayer = function () {
    this._damageSpriteLayer = new Sprite(); // ダメージスプライト用の新しいスプライトを作成
    this._damageSpriteLayer.z = 1; // Zインデックスを設定して前面に表示
    this._battleField.addChild(this._damageSpriteLayer); // バトルフィールドに追加
  };

  /**
   * チャットバブルスプライトレイヤーを作成し、バトルフィールドに追加する。
   */
  Spriteset_Battle.prototype.createChatBubbleSpriteLayer = function () {
    this._chatBubbleSpriteLayer = new Sprite(); // チャットバブル用の新しいスプライトを作成
    this._chatBubbleSpriteLayer.z = 1; // Zインデックスを設定して前面に表示
    this._battleField.addChild(this._chatBubbleSpriteLayer); // バトルフィールドに追加
  };

  /**
   * 投擲オブジェクトスプライトレイヤーを作成し、バトルフィールドに追加する。
   */
  Spriteset_Battle.prototype.createThrowObjectLayer = function () {
    this._throwObjectLayer = new Sprite(); // 投擲オブジェクト用の新しいスプライトを作成
    this._throwObjectLayer.z = 1; // Zインデックスを設定して前面に表示
    this._battleField.addChild(this._throwObjectLayer); // バトルフィールドに追加
  };

  // ---------------------------------------------------------------------
  // バトルでダメージポップするための既存クラスの拡張
  // ---------------------------------------------------------------------
  /**
   * Game_Battler.prototype.initMembersの元のメソッドを呼び出し、
   * バトラーのダメージポップアップ管理用配列を初期化する。
   */
  const _Game_Battler_prototype_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function () {
    _Game_Battler_prototype_initMembers.call(this);
    this._damagePops = []; // ダメージポップアップ用の配列
  };

  /**
   * ダメージポップアップ配列を取得する。
   *
   * @returns {Array} ダメージポップアップの配列。
   */
  Game_Battler.prototype.damagePops = function () {
    if (!this._damagePops) this._damagePops = [];
    return this._damagePops;
  };

  /**
   * ダメージポップアップを追加する。
   *
   * @param {Object} damagePop - 表示するダメージポップアップのデータ。
   */
  Game_Battler.prototype.pushDamagePop = function (damagePop) {
    if (!this._damagePops) this._damagePops = [];
    this._damagePops.push(damagePop);
  };

  /**
   * ダメージポップアップをすべてクリアする。
   */
  Game_Battler.prototype.clearDamagePops = function () {
    this._damagePops = [];
  };

  /**
   * ダメージポップアップが要求されているかを判定する。
   *
   * @returns {boolean} ダメージポップアップが要求されている場合にtrueを返す。
   */
  Game_Battler.prototype.isDamagePopupRequested = function () {
    if (!this._damagePops) this._damagePops = [];
    return this._damagePops.length > 0;
  };

  /**
   * Game_Battler.prototype.regenerateHpの元のメソッドを呼び出し、
   * HP再生時にダメージポップアップを追加する。
   */
  const _Game_Battler_prototype_regenerateHp = Game_Battler.prototype.regenerateHp;
  Game_Battler.prototype.regenerateHp = function () {
    _Game_Battler_prototype_regenerateHp.call(this);
    const minRecover = -this.maxSlipDamage();
    const value = Math.max(Math.floor(this.mhp * this.hrg), minRecover);
    if (value !== 0) this.pushDamagePop({ hpAffected: true, hpDamage: -value });
  };

  // ---------------------------------------------------------------------
  // Game_Actorの拡張
  // ---------------------------------------------------------------------
  /**
   * スキルでも、敵への攻撃かつダメージかつ物理の時は、武器攻撃のモーションを取らせるため、
   * オーバーライドします
   */
  Game_Actor.prototype.performAction = function (action) {
    Game_Battler.prototype.performAction.call(this, action);
    if (action.isAttack()) {
      this.performAttack();
    } else if (action.isGuard()) {
      this.requestMotion('guard');
      /**
       * ここを変更
       */
      // } else if (action.isMagicSkill()) {
    } else if (action.isMagical()) {
      this.requestMotion('spell');
    } else if (action.isSkill()) {
      /**
       * ここを上書き
       */
      // this.requestMotion('skill');
      // if (action.isForOpponent() && action.isForOne() && action.isDamage() && action.isPhysical()) {
      if (action.isForOpponent() && action.isDamage() && action.isPhysical()) {
        this.performAttack();
      } else {
        this.requestMotion('skill');
      }
    } else if (action.isItem()) {
      this.requestMotion('item');
    }
  };

  // 武器をGame_Itemで取得するための処理
  // Game_Actor.weaponsだと$dataItemsが返ってきてしまうため
  Game_Actor.prototype.weaponItems = function () {
    return this._equips.filter((item) => item && item.isWeapon());
  };

  // ---------------------------------------------------------------------
  // Sprite_Battler の拡張
  // ---------------------------------------------------------------------
  /**
   * Sprite_Battler.prototype.initMembersの元のメソッドを呼び出し、
   * バトラーのダメージスプライトや位置情報を初期化する。
   */
  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function () {
    _Sprite_Battler_initMembers.call(this);
    this._damageSprites = []; // ダメージスプライト用の配列
    this._initialX = 0; // 初期X座標
    this._initialY = 0; // 初期Y座標
    this._targetOffsetX = 0; // 目標のXオフセット
    this._targetOffsetY = 0; // 目標のYオフセット
    this._oldWeapon1 = null; // 装備変更を検知するため前回装備していた武器を保存する
  };

  /**
   * Sprite_Battlerの更新処理。
   * ジャンプ、テレポート、浮遊、落下などのアニメーションを順次更新。
   */
  const _Sprite_Battler_update = Sprite_Battler.prototype.update;
  Sprite_Battler.prototype.update = function () {
    // 元のupdateメソッドを呼び出し
    _Sprite_Battler_update.call(this);

    // ジャンプが実行中ならジャンプの更新処理を行う
    if (this._jumpDuration > 0) {
      this.updateJump();
    }

    // テレポートが実行中ならテレポートの更新処理を行う
    if (this._teleportDuration > 0) {
      this.updateTeleport();
    }

    // 浮遊が実行中なら浮遊の更新処理を行う
    if (this._floatDuration > 0) {
      this.updateFloat();
    }

    // 落下が実行中なら落下の更新処理を行う
    if (this._fallDuration > 0) {
      this.updateFall();
    }

    // チャットバブルの更新処理
    this.updateChatBubble();
  };

  /**
   * ダメージポップアップを更新し、スプライトの位置と可視状態を調整する。
   */
  Sprite_Battler.prototype.updateDamagePopup = function () {
    this.setupDamagePopup();
    if (this._damageSprites.length > 0) {
      const y = this.y - 24; // ダメージポップアップのY座標を調整
      let index = 0;
      for (const damageSprite of this._damageSprites) {
        if (!damageSprite) continue;
        damageSprite.update();
        damageSprite.x = this.x * $gameScreen.zoomScale(); // X座標をズームスケールに合わせる
        // 行間の設定
        const lineHeight = lineSpace;
        damageSprite.y = (y - index * lineHeight) * $gameScreen.zoomScale(); // Y座標を計算
        index += 1;
      }
      if (!this._damageSprites[0].isPlaying()) {
        this.destroyDamageSprite(this._damageSprites[0]); // 最初のダメージスプライトが完了したら破棄
      }
    }
  };

  /**
   * ダメージポップアップが必要な場合にダメージスプライトを作成する。
   */
  Sprite_Battler.prototype.setupDamagePopup = function () {
    if (!this._battler) return;
    if (this._battler.isDamagePopupRequested()) {
      this.createDamageSprite();
    }
  };

  /**
   * チャットバブルの表示を更新し、時間が経過するとフェードアウトする。
   */
  Sprite_Battler.prototype.updateChatBubble = function () {
    if (!this._chatBubbleSprite) return;
    const chatBubbleFadeOutSpeed = 5; // フェードアウト速度
    if (this._chatBubbleWaitCount === undefined) this._chatBubbleWaitCount = 0;
    if (this._chatBubbleWaitCount > 0) {
      this._chatBubbleWaitCount--; // カウントダウン
    } else if (this._chatBubbleSprite.opacity > 0) {
      this._chatBubbleSprite.opacity -= chatBubbleFadeOutSpeed; // 徐々に透明度を下げる
      if (this._chatBubbleSprite.opacity <= 0) {
        this.clearChatBubble(); // 透明度が0になったら削除
      }
    }
  };

  /**
   * チャットバブルのフェードアウトをカウントダウンと共に開始する。
   *
   * @param {number} frames - フェードアウトまでの待機時間（フレーム数）
   * @param {number} fadeOutSpeed - フェードアウトの速度（デフォルトは5）
   */
  Sprite_Battler.prototype.startChatBubbleFadeOutCountdown = function (frames, fadeOutSpeed) {
    this._chatBubbleWaitCount = frames; // カウントダウンの開始
    this._chatBubbleFadeOutSpeed = fadeOutSpeed || 5; // フェードアウト速度を設定
    this._chatBubbleSprite.opacity = 255; // チャットバブルを完全に表示
  };

  /**
   * ダメージスプライトを作成して画面に追加する。
   */
  Sprite_Battler.prototype.createDamageSprite = function () {
    const damageSprite = new Sprite_DamageEx(); // ダメージスプライトの作成
    damageSprite.x = (this.x + this.damageOffsetX()) * $gameScreen.zoomScale(); // X座標を設定
    damageSprite.y = (this.y + this.damageOffsetY()) * $gameScreen.zoomScale(); // Y座標を設定
    damageSprite.setup(this._battler); // ダメージスプライトにバトラー情報を設定
    this._damageSprites.push(damageSprite); // ダメージスプライトを配列に追加
    SceneManager._scene._spriteset._damageSpriteLayer.addChild(damageSprite); // スプライトレイヤーに追加
  };

  /**
   * ダメージポップアップのX座標のオフセットを返す。
   *
   * @returns {number} X座標のオフセット
   */
  Sprite_Battler.prototype.damageOffsetX = function () {
    return 0; // X座標のデフォルトオフセット
  };

  /**
   * ダメージポップアップのY座標のオフセットを返す。
   *
   * @returns {number} Y座標のオフセット
   */
  Sprite_Battler.prototype.damageOffsetY = function () {
    return 0; // Y座標のデフォルトオフセット
  };

  /**
   * ダメージスプライトを破棄して、レイヤーと配列から削除する。
   *
   * @param {Sprite_DamageEx} damageSprite - 破棄するダメージスプライト
   */
  Sprite_Battler.prototype.destroyDamageSprite = function (damageSprite) {
    SceneManager._scene._spriteset._damageSpriteLayer.removeChild(damageSprite); // レイヤーから削除
    this._damageSprites.remove(damageSprite); // 配列から削除
    damageSprite.destroy(); // スプライトを破棄
  };

  /**
   * 指定されたターゲット位置にジャンプする。
   *
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.x - ターゲットのX座標
   * @param {number} param.y - ターゲットのY座標
   * @param {number} [param.duration=20] - ジャンプにかけるフレーム数
   * @param {number} [param.jumpHeight=20] - ジャンプの高さ
   * @param {number} [param.rotationAmount=0] - 回転量
   */
  Sprite_Battler.prototype.jumpToTarget = function ({
    x,
    y,
    duration = 20,
    jumpHeight = 20,
    rotationAmount = 0,
  }) {
    this._jumpTargetX = x;
    this._jumpTargetY = y; // ターゲットのY座標
    this._jumpStartX = this.x; // 元のX座標
    this._jumpStartY = this.y; // 元のY座標
    this._jumpHeight = jumpHeight; // ジャンプの高さ
    this._jumpDuration = duration; // ジャンプの所要時間
    this._jumpFrame = 0; // 現在のフレーム
    this._rotationAmount = rotationAmount; // 回転量を設定
    this._movementDuration = duration; // 移動時間
  };

  /**
   * 現在位置にジャンプする。
   *
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.duration - ジャンプの時間
   * @param {number} param.jumpHeight - ジャンプの高さ
   * @param {number} param.rotationAmount - 回転量
   */
  Sprite_Battler.prototype.jumpHere = function ({ duration, jumpHeight, rotationAmount }) {
    this.jumpToTarget({ x: this.x, y: this.y, duration, jumpHeight, rotationAmount });
  };

  /**
   * ジャンプのアニメーションを更新する。
   */
  Sprite_Battler.prototype.updateJump = function () {
    if (this._jumpDuration > 0) {
      this._jumpFrame++;
      const progress = this._jumpFrame / this._jumpDuration; // ジャンプ進行度

      // X座標の線形移動
      this.x = this._jumpStartX + (this._jumpTargetX - this._jumpStartX) * progress;

      // Y座標のジャンプ移動（サイン波）＋ターゲットに向かって移動
      const jumpY = this._jumpStartY - this._jumpHeight * Math.sin(Math.PI * progress); // ジャンプの高さ
      const targetY = this._jumpTargetY; // ターゲットの最終Y座標
      this.y = jumpY + (targetY - this._jumpStartY) * progress;

      // 回転処理
      if (this._rotationAmount) {
        this.rotation = this._rotationAmount * Math.PI * 2 * progress; // 回転計算
      }

      if (this._jumpFrame >= this._jumpDuration) {
        this.setHome(this._jumpTargetX, this._jumpTargetY); // ジャンプ終了後の座標を設定
        this.rotation = 0; // 回転をリセット
        this._jumpDuration = 0; // ジャンプ終了
      }
    }
  };

  /**
   * キャラクターを指定された座標にテレポートさせる。
   *
   * @param {Object} params - テレポートに関する設定を含むオブジェクト
   * @param {number} params.x - テレポート先のX座標
   * @param {number} params.y - テレポート先のY座標
   * @param {number} [params.duration=20] - テレポートにかける時間（フレーム数）
   */
  Sprite_Battler.prototype.teleportToTarget = function ({ x, y, duration = 20 }) {
    this._teleportTargetX = x; // テレポート先のX座標
    this._teleportTargetY = y; // テレポート先のY座標
    this._teleportDuration = duration; // テレポートの所要時間
    this._teleportFrame = 0; // 現在のフレーム
    this._movementDuration = duration; // 移動時間
  };

  /**
   * テレポート中のキャラクターの更新処理。
   * 進行度に応じてフェードアウトし、座標を移動してフェードインする。
   */
  Sprite_Battler.prototype.updateTeleport = function () {
    if (this._teleportDuration > 0) {
      this._teleportFrame++;
      const progress = this._teleportFrame / this._teleportDuration; // テレポートの進行度

      // フェードアウトとフェードインのタイミングを決定
      if (progress < 0.5) {
        // フェードアウト
        this.opacity = 255 * (1 - progress * 2); // 徐々に透明になる
      } else if (progress >= 0.5 && this.opacity === 0) {
        // 座標を瞬時に変更（テレポート効果）
        this.x = this._teleportTargetX;
        this.y = this._teleportTargetY;

        // フェードイン
        this.opacity = 255 * ((progress - 0.5) * 2); // 徐々に再表示される
      }

      // テレポートが完了したらリセット
      if (this._teleportFrame >= this._teleportDuration) {
        this.opacity = 255; // 完全に表示状態に戻す
        this._teleportDuration = 0; // テレポート終了
        this.setHome(this._teleportTargetX, this._teleportTargetY); // テレポート後の座標を設定
      }
    }
  };

  /**
   * キャラクターを浮遊させるアニメーションを開始する。
   *
   * @param {Object} params - 浮遊の設定を含むオブジェクト
   * @param {number} params.x - 浮遊する先のX座標
   * @param {number} [params.floatHeight=50] - 浮遊する高さ
   * @param {number} [params.duration=60] - 浮遊にかかる時間（フレーム数）
   * @param {number} [params.rotationAmount=0] - 浮遊中の回転量
   */
  Sprite_Battler.prototype.startFloat = function ({
    x,
    floatHeight = 50,
    duration = 60,
    rotationAmount = 0,
  }) {
    this._floatStartX = this.x; // 現在のX座標を記録
    this._floatStartY = this.y; // 現在のY座標を記録
    this._floatTargetX = x; // 浮遊する先の場所
    this._floatTargetY = this._floatStartY - floatHeight; // 浮遊する高さを計算
    this._floatHeight = floatHeight; // 浮遊の高さ
    this._floatDuration = duration; // 上昇にかかる時間
    this._floatFrame = 0; // フレームカウンタをリセット
    this._rotationAmount = rotationAmount; // 回転量を設定
    this._movementDuration = duration; // 移動時間
    this._shadowBaseY = this.y; // 影の固定位置を設定
  };

  /**
   * 浮遊アニメーション中のキャラクターの更新処理。
   * キャラクターのX座標、Y座標、および回転を進行度に応じて更新する。
   */
  Sprite_Battler.prototype.updateFloat = function () {
    if (this._floatDuration > 0) {
      this._floatFrame++;
      const progress = this._floatFrame / this._floatDuration; // 全体の進行度

      // X座標の線形移動
      this.x = this._floatStartX + (this._floatTargetX - this._floatStartX) * progress;

      if (progress <= 1) {
        // 上昇フェーズ
        const jumpProgress = progress; // 0から1までの進行度
        this.y = this._floatStartY - this._floatHeight * Math.sin((Math.PI * jumpProgress) / 2); // ジャンプの高さ計算
        if (this._shadowSprite) {
          this._shadowSprite.y = this._floatStartY - this.y;
        }
      } else {
        // 浮遊したまま
        this.y = this._floatTargetY; // 浮遊位置で固定
      }

      // 回転処理
      if (this._rotationAmount) {
        this.rotation = this._rotationAmount * Math.PI * 2 * progress; // 回転計算
      }

      // 上昇フェーズが終了したら、浮遊位置に固定
      if (this._floatFrame >= this._floatDuration) {
        this.y = this._floatTargetY; // 浮遊したままのY座標に固定
        this.rotation = 0; // 回転をリセット
        this._floatDuration = 0; // 上昇処理終了
        this.setHome(this.x, this._floatTargetY); // 浮遊終了後の座標を設定
      }
    }
  };

  /**
   * キャラクターが浮遊から降下するアニメーションを開始する。
   *
   * @param {Object} params - 降下に関する設定を含むオブジェクト
   * @param {number} [params.fallDuration=60] - 降下にかかる時間（フレーム数）
   * @param {number} [params.rotationAmount=0] - 降下中の回転量
   */
  Sprite_Battler.prototype.startFall = function ({ fallDuration = 60, rotationAmount = 0 }) {
    this._fallStartY = this.y; // 現在のY座標を記録
    this._fallTargetY = this._floatStartY; // 元のY座標に戻る
    this._fallDuration = fallDuration; // 降下にかかる時間
    this._rotationAmount = rotationAmount; // 回転量を設定
    this._movementDuration = fallDuration; // 移動時間
    this._fallFrame = 0; // フレームカウンタをリセット
  };

  // イージング関数 (easeInOutSine)
  const easeInOutSine = (x) => {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  };

  /**
   * 降下アニメーション中のキャラクターの更新処理。
   * 進行度に応じてキャラクターのY座標と回転を更新し、元の位置に戻す。
   */
  Sprite_Battler.prototype.updateFall = function () {
    if (this._fallDuration > 0) {
      this._fallFrame++;
      const progress = this._fallFrame / this._fallDuration; // 全体の進行度

      // 降下フェーズ
      if (progress <= 1) {
        // イージング・イン・アウトを適用
        const fallProgress = easeInOutSine(progress); // イージングされた進行度
        this.y = this._fallStartY + (this._fallTargetY - this._fallStartY) * fallProgress; // 降下の計算
        if (this._shadowSprite) {
          this._shadowSprite.y = -(this.y - this._fallTargetY); // 影のY座標は動かないように
        }
        // 回転処理
        if (this._rotationAmount) {
          this.rotation = this._rotationAmount * Math.PI * 2 * progress; // 回転計算
        }
      }

      // 降下フェーズが終了したら、元の位置に戻る
      if (this._fallFrame >= this._fallDuration) {
        this.y = this._fallTargetY; // 元のY座標に戻す
        this.rotation = 0; // 回転をリセット
        this._fallDuration = 0; // 降下処理終了
        this.setHome(this.x, this._fallTargetY); // 最終座標を設定
        if (this._shadowSprite) {
          this._shadowSprite.y = 0;
        }
      }
    }
  };

  // ---------------------------------------------------------------------
  // Sprite_Actorの拡張
  // ---------------------------------------------------------------------
  /**
   * アクターのホーム位置を設定し、初期位置を記録する。
   *
   * @param {number} index - アクターのインデックス。
   */
  const _Sprite_Actor_prototype_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function (index) {
    _Sprite_Actor_prototype_setActorHome.call(this, index);
    this._initialX = this._homeX;
    this._initialY = this._homeY;
  };

  /**
   * Sprite_Actorのupdateメソッドを拡張し、武器スプライトの作成と更新を行う。
   */
  const _Sprite_Actor_prototype_update = Sprite_Actor.prototype.update;
  Sprite_Actor.prototype.update = function () {
    _Sprite_Actor_prototype_update.call(this);
    this.createWeaponSpriteIdle(); // 武器スプライトの作成
    this.updateWeaponSpriteIdleVisible(); // 武器スプライトの可視状態を更新
  };

  /**
   * 武器のスプライトを作成し、キャラクターに表示する。
   * 武器が変更された場合、新しいスプライトを作成して古いスプライトを破棄する。
   */
  Sprite_Actor.prototype.createWeaponSpriteIdle = function () {
    if (!this._battler) return;
    if (!this._battler.weapons()) return;

    const weapon1 = this._battler.weapons()[0]; // バトラーの武器を取得
    if (!this._weaponSpriteIdle || this._oldWeapon1 !== weapon1) {
      if (this._weaponSpriteIdle) {
        this.removeChild(this._weaponSpriteIdle); // 古いスプライトを削除
        this._weaponSpriteIdle.destroy(); // メモリの解放
      }

      const wtypeId = weapon1 ? weapon1.wtypeId : 0; // 武器タイプのIDを取得
      const weaponDisplaySetting = weaponDisplaySettings[wtypeId]; // 表示設定を取得
      const { offsetX, offsetY, angle } = weaponDisplaySetting?.setting || {}; // オフセットと角度の設定
      this._oldWeapon1 = weapon1; // 古い武器を更新

      this._weaponSpriteIdle = new Sprite_WeaponIdle(); // 新しい武器スプライトを作成
      this._weaponSpriteIdle.anchor.x = 0.5; // スプライトのアンカー位置を中心に設定
      this._weaponSpriteIdle.anchor.y = 0.5;

      const attackMotion = $dataSystem.attackMotions[wtypeId]; // 攻撃モーションを取得
      this._weaponSpriteIdle.setup(attackMotion.weaponImageId); // 武器画像をセットアップ

      // オフセットと回転角度を設定
      this._weaponSpriteIdle._baseX = offsetX;
      this._weaponSpriteIdle._baseY = offsetY;
      const angleInDegrees = angle || 0; // 傾けたい角度（デフォルトは0度）
      const angleInRadians = (angleInDegrees * Math.PI) / 180; // ラジアンに変換
      this._weaponSpriteIdle._baseRotation = angleInRadians;

      this.addChild(this._weaponSpriteIdle); // スプライトをシーンに追加
    }
  };

  /**
   * @remarks 参考情報
   * @see Sprite_Actor.MOTIONS
   */
  //   walk: { index: 0, loop: true },
  //   wait: { index: 1, loop: true },
  //   chant: { index: 2, loop: true },
  //   guard: { index: 3, loop: true },
  //   damage: { index: 4, loop: false },
  //   evade: { index: 5, loop: false },
  //   thrust: { index: 6, loop: false },
  //   swing: { index: 7, loop: false },
  //   missile: { index: 8, loop: false },
  //   skill: { index: 9, loop: false },
  //   spell: { index: 10, loop: false },
  //   item: { index: 11, loop: false },
  //   escape: { index: 12, loop: true },
  //   victory: { index: 13, loop: true },
  //   dying: { index: 14, loop: true },
  //   abnormal: { index: 15, loop: true },
  //   sleep: { index: 16, loop: true },
  //   dead: { index: 17, loop: true },

  /**
   * 武器スプライトの可視状態を更新するメソッド。
   * アクターのモーションに応じて、武器スプライトを表示・非表示にする。
   */
  Sprite_Actor.prototype.updateWeaponSpriteIdleVisible = function () {
    if (!this._weaponSpriteIdle) return;

    // モーションの定数を定義
    const WALK = 0;
    const WAIT = 1;
    const CHANT = 2;
    const GUARD = 3;
    const SKILL = 9;
    const SPELL = 10;

    // 現在のモーションインデックスを取得
    const motionIndex = this._motion.index;

    // 特定のモーションでない場合、武器スプライトを非表示にする
    if (![WALK, CHANT, WAIT, SKILL, SPELL, GUARD].includes(motionIndex)) {
      this._weaponSpriteIdle.visible = false;
      return;
    }

    // モーションに基づいて武器スプライトの状態を設定
    this._weaponSpriteIdle._waiting = [WAIT].includes(motionIndex); // 待機モーション
    this._weaponSpriteIdle._casting = [CHANT].includes(motionIndex); // 詠唱モーション
    this._weaponSpriteIdle._spelling = [SKILL, SPELL].includes(motionIndex); // スキル/スペルモーション
    this._weaponSpriteIdle._guarding = [GUARD].includes(motionIndex); // ガードモーション

    // 武器スプライトが再生中でない場合、スプライトを表示する
    this._weaponSpriteIdle.visible = !this._weaponSprite.isPlaying();
  };

  /**
   * Sprite_Actor.prototype.updateMotionCountの元のメソッドを呼び出し、
   * 武器スプライトのフレームパターンを現在のモーションパターンに基づいて更新する。
   */
  const _Sprite_Actor_prototype_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;
  Sprite_Actor.prototype.updateMotionCount = function () {
    _Sprite_Actor_prototype_updateMotionCount.call(this);

    // 武器スプライトが存在する場合、モーションのパターンに基づいてフレームを更新
    if (this._weaponSpriteIdle) {
      this._weaponSpriteIdle.setFramePattern(this._pattern);
    }
  };

  /**
   * shouldStepForwardをオーバーライド
   * 行動時に自動で１歩手前に出てほしくないため
   */
  Sprite_Actor.prototype.shouldStepForward = function () {
    // return this._actor.isInputting() || this._actor.isActing();
    return this._actor.isInputting();
  };

  // ---------------------------------------------------------------------
  // Sprite_Weaponの拡張クラス
  // ---------------------------------------------------------------------
  /**
   * 待機状態の武器スプライトを表すクラス
   *
   * @extends Sprite_Weapon
   */
  class Sprite_WeaponIdle extends Sprite_Weapon {
    /**
     * メンバ変数の初期化を行う。
     */
    initMembers() {
      super.initMembers();
      this._framePattern = 0; // フレームパターン
      this._motionCount = 1; // モーションのカウント
      this._baseX = 0; // 基本位置のX座標
      this._baseY = 0; // 基本位置のY座標
      this._baseRotation = 0; // 基本回転角度
      this._rotateCount = 0; // 回転カウント
      this._casting = false; // 詠唱モーションかどうか
      this._waiting = false; // 待機モーションかどうか
      this._spelling = false; // スキル使用モーションかどうか
      this._guarding = false; // 防御モーションかどうか
    }

    /**
     * 武器の画像を設定し、スプライトを初期化する。
     *
     * @param {number} weaponImageId - 武器の画像ID
     */
    setup(weaponImageId) {
      this._weaponImageId = weaponImageId;
      this._animationCount = 0; // アニメーションカウントの初期化
      this._pattern = 2; // 初期パターンを設定
      this.loadBitmap(); // 画像の読み込み
      this.updateFrame(); // フレームの更新
    }

    /**
     * フレームパターンを設定する。
     *
     * @param {number} framePattern - 設定するフレームパターン
     */
    setFramePattern(framePattern) {
      this._framePattern = framePattern;
    }

    /**
     * スプライトの状態を毎フレーム更新する。
     */
    update() {
      super.update();
      this._animationCount = 0; // アニメーションカウントは固定にする
      this.updateFrame(); // フレームの更新
      this.updatePosition(); // 位置の更新
    }

    /**
     * 武器スプライトの位置をモーションに応じて更新する。
     */
    updatePosition() {
      if (this._casting) {
        // 詠唱中の位置設定
        this.x = this._baseX;
        this.y = this._baseY - 3;
        this.rotation = this._baseRotation;
        return;
      }
      if (this._spelling) {
        // 一瞬遅らせるためにframePatternを見る
        if (this._framePattern > 0) {
          // スキル使用中の位置設定
          this.x = this._baseX - 10;
          this.y = this._baseY - 6;
          const angle = 20;
          this.rotation = this._baseRotation + (angle * Math.PI) / 180;
        }
        // this.rotate(-20); // 左に20度回転
        return;
      }
      if (this._waiting) {
        // 待機中の位置設定
        this.x = this._baseX;
        this.y = this._baseY - 3;
        this.rotation = this._baseRotation;
        return;
      }
      if (this._guarding) {
        // 防御中の位置設定
        this.x = this._baseX + 10;
        this.y = this._baseY - 3;
        const angle = 20;
        this.rotation = this._baseRotation + (angle * Math.PI) / 180; // 20度回転
        return;
      }

      this.rotation = this._baseRotation;

      // 各フレームパターンにおける手の位置のオフセット
      const offsetYOfHand = {
        0: 0,
        1: 2,
        2: 3,
        3: 2,
      };

      // 基本位置に手の位置オフセットを加算
      this.x = this._baseX;
      this.y = this._baseY + offsetYOfHand[this._framePattern];
    }

    /**
     * 武器スプライトを回転させる。
     *
     * @param {number} angle - 回転角度（度数）
     */
    rotate(angle) {
      this._rotateCount += angle;
      if (this._rotateCount >= 360) this._rotateCount = 0; // 360度を超えたらリセット
      const angleInRadians = (this._rotateCount * Math.PI) / 180; // 度数法をラジアンに変換
      this.rotation = angleInRadians; // 回転角度を設定
    }
  }

  // ---------------------------------------------------------------------
  // Sprite_Enemyの拡張
  // ---------------------------------------------------------------------
  /**
   * Sprite_Enemy.prototype.initMembersの元のメソッドを呼び出し、
   * 呼吸アニメーションのタイマーを初期化する。
   */
  const _Sprite_Enemy_prototype_initMembers = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function () {
    _Sprite_Enemy_prototype_initMembers.call(this);
    this._breathingTimer = 0; // 呼吸アニメーション用タイマーの初期化
  };

  /**
   * Sprite_Enemy.prototype.setBattlerの元のメソッドを呼び出し、
   * 敵キャラクターの初期位置を設定する。
   *
   * @param {Game_Enemy} battler - 設定するバトラー
   */
  const _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function (battler) {
    _Sprite_Enemy_prototype_setBattler.call(this, battler);
    this._initialX = this._homeX; // 初期X座標を記録
    this._initialY = this._homeY; // 初期Y座標を記録
  };

  /**
   * Sprite_Enemyのupdateメソッドを拡張し、呼吸エフェクトを更新する。
   */
  const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
  Sprite_Enemy.prototype.update = function () {
    _Sprite_Enemy_update.call(this);
    this.updateBreathingEffect(); // 呼吸アニメーションを更新
  };

  /**
   * 呼吸アニメーションを更新し、敵が動ける場合にスケールを調整して息づくように見せる。
   */
  Sprite_Enemy.prototype.updateBreathingEffect = function () {
    if (this._battler.canMove() && !this._battler.isSvBattleExMeta(NOTE.NO_BREATHE)) {
      this._breathingTimer += 0.05; // タイマーを徐々に増加

      /**
       * @remarks トリアコンタン様BattlerGraphicExtend.jsでバトラーの拡大率が設定されている場合を考慮
       */
      // getScaleX と getScaleY が関数かどうかをチェック
      const baseScaleX =
        typeof this._battler.getScaleX === 'function' ? this._battler.getScaleX() : 1.0;
      const baseScaleY =
        typeof this._battler.getScaleY === 'function' ? this._battler.getScaleY() : 1.0;

      const scaleAmountY = baseScaleY + Math.sin(this._breathingTimer) * 0.05; // サイン波でY軸スケール変動
      this.scale.set(baseScaleX, scaleAmountY); // X軸はベース値固定、Y軸のみ拡縮
    } else {
      const baseScaleX =
        typeof this._battler.getScaleX === 'function' ? this._battler.getScaleX() : 1.0;
      const baseScaleY =
        typeof this._battler.getScaleY === 'function' ? this._battler.getScaleY() : 1.0;

      this.scale.set(baseScaleX, baseScaleY); // 敵が動けない場合は元のサイズに戻す
    }
  };
  // ---------------------------------------------------------------------
  // Window_BattleLog の拡張
  // ---------------------------------------------------------------------
  /**
   * Window_BattleLog の初期化メソッドをオーバーライドしてカスタマイズ。
   *
   * @param {Rectangle} rect - ウィンドウの領域を示す矩形オブジェクト
   */
  const _Window_BattleLog_prototype_initialize = Window_BattleLog.prototype.initialize;
  Window_BattleLog.prototype.initialize = function (rect) {
    _Window_BattleLog_prototype_initialize.call(this, rect);
    // ウィンドウの背景に暗めの効果を表示する（コメントアウトされている）
    // this.showBackgroundDimmer();
  };

  /**
   * バトルログに表示できる最大行数を指定する。
   *
   * @returns {number} 最大表示行数
   */
  const _Window_BattleLog_prototype_maxLines = Window_BattleLog.prototype.maxLines;
  Window_BattleLog.prototype.maxLines = function () {
    if (!showSkillNameExtend) {
      return _Window_BattleLog_prototype_maxLines.call(this);
    }
    return 5; // 5行まで表示
  };

  /**
   * バトルログウィンドウの背景の不透明度を設定する。
   *
   * @returns {number} 背景の不透明度（0で完全な透明）
   */
  const _Window_BattleLog_prototype_backPaintOpacity = Window_BattleLog.prototype.backPaintOpacity;
  Window_BattleLog.prototype.backPaintOpacity = function () {
    if (!showSkillNameExtend) {
      return _Window_BattleLog_prototype_backPaintOpacity.call(this);
    }
    return 0; // 背景を透明に設定
  };

  /**
   * バトルログウィンドウの各行の高さを指定する。
   *
   * @returns {number} 行の高さ（ピクセル単位）
   */
  const _Window_BattleLog_prototype_lineHeight = Window_BattleLog.prototype.lineHeight;
  Window_BattleLog.prototype.lineHeight = function () {
    if (!showSkillNameExtend) {
      return _Window_BattleLog_prototype_lineHeight.call(this);
    }
    return 26; // 各行の高さを26ピクセルに設定
  };

  /**
   * バトルログウィンドウの項目の高さを指定する。
   *
   * @returns {number} 項目の高さ（ピクセル単位）
   */
  const _Window_BattleLog_prototype_itemHeight = Window_BattleLog.prototype.itemHeight;
  Window_BattleLog.prototype.itemHeight = function () {
    if (!showSkillNameExtend) {
      return _Window_BattleLog_prototype_itemHeight.call(this);
    }
    return 26; // 各項目の高さも26ピクセルに設定
  };

  /**
   * バトルログウィンドウの項目の内側の余白を指定する。
   *
   * @returns {number} 内側の余白（ピクセル単位）
   */
  const _Window_BattleLog_prototype_itemPadding = Window_BattleLog.prototype.itemPadding;
  Window_BattleLog.prototype.itemPadding = function () {
    if (!showSkillNameExtend) {
      return _Window_BattleLog_prototype_itemPadding.call(this);
    }
    return 8; // 各項目の内側の余白を8ピクセルに設定
  };

  /**
   * フォント設定をリセットし、デフォルトのフォントに戻す。
   */
  const _Window_BattleLog_prototype_resetFontSettings =
    Window_BattleLog.prototype.resetFontSettings;
  Window_BattleLog.prototype.resetFontSettings = function () {
    if (!showSkillNameExtend) {
      _Window_BattleLog_prototype_resetFontSettings.call(this);
      return;
    }
    this.contents.fontFace = $gameSystem.mainFontFace(); // メインフォントの設定
    this.contents.fontSize = 16; // フォントサイズを16ピクセルに設定
    this.contents.fontBold = false; // 太字を無効化
    this.resetTextColor(); // テキストカラーをリセット
  };

  /**
   * バトルログにテキストを追加し、5行以上の場合は古い行を削除する。
   *
   * @param {string} text - バトルログに追加するテキスト
   */
  const _Window_BattleLog_prototype_addText = Window_BattleLog.prototype.addText;
  Window_BattleLog.prototype.addText = function (text) {
    if (!showSkillNameExtend) {
      _Window_BattleLog_prototype_addText.call(this, text);
      return;
    }

    this._lines.push(text);

    // 5行以上になったら古い行を削除する
    if (this._lines.length > 5) {
      this._lines.shift(); // 一番古い行を削除
    }

    this.refresh(); // ログウィンドウを更新
    this.wait(); // 少し待機
  };

  /**
   * 対象のアクション結果を表示する。
   *
   * @param {Game_Battler} subject - アクションを行ったキャラクター
   * @param {Game_Battler} target - アクションを受けたキャラクター
   */
  Window_BattleLog.prototype.displayActionResults = function (subject, target) {
    if (target.result().used) {
      this.displayCritical(target); // クリティカルヒットの表示
      this.displayDamage(target); // ダメージの表示
      this.displayAffectedStatus(target); // 状態異常の表示
      this.displayFailure(target); // アクション失敗の表示
    }
  };

  /**
   * 対象が攻撃を外した（ミスした）場合の表示。
   *
   * @param {Game_Battler} target - 攻撃を受ける対象
   */
  Window_BattleLog.prototype.displayMiss = function (target) {
    let fmt;
    if (target.result().physical) {
      const isActor = target.isActor();
      fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit; // ミスのメッセージを選択
      this.performMiss(target); // ミスのアニメーションを実行
    } else {
      fmt = TextManager.actionFailure; // アクション失敗の場合のメッセージ
    }
    this.push('addText', fmt.format(target.name())); // ログにメッセージを追加
  };

  /**
   * 対象が攻撃を回避した場合の表示。
   *
   * @param {Game_Battler} target - 回避したキャラクター
   */
  Window_BattleLog.prototype.displayEvasion = function (target) {
    let fmt;
    if (target.result().physical) {
      fmt = TextManager.evasion; // 物理攻撃の回避メッセージ
      if (!target.isSvBattleExMeta(NOTE.NO_MOVE)) {
        this.performEvasion(target); // 回避のアニメーションを実行
      }
    } else {
      fmt = TextManager.magicEvasion; // 魔法攻撃の回避メッセージ
      if (!target.isSvBattleExMeta(NOTE.NO_MOVE)) {
        this.performMagicEvasion(target); // 魔法回避のアニメーションを実行
      }
    }
    this.push('addText', fmt.format(target.name())); // ログにメッセージを追加
  };

  /**
   * 対象が受けたHPダメージを表示する。
   *
   * @param {Game_Battler} target - ダメージを受けた対象
   */
  Window_BattleLog.prototype.displayHpDamage = function (target) {
    if (target.result().hpAffected) {
      if (target.result().hpDamage > 0 && !target.result().drain) {
        this.performDamage(target); // ダメージのアニメーションを実行
      }
      if (target.result().hpDamage < 0) {
        this.performRecovery(target); // 回復のアニメーションを実行
      }
      this.push('addText', this.makeHpDamageText(target)); // ログにHPダメージのテキストを追加
    }
  };

  /**
   * 対象が受けたMPダメージを表示する。
   *
   * @param {Game_Battler} target - MPダメージを受けた対象
   */
  Window_BattleLog.prototype.displayMpDamage = function (target) {
    if (target.isAlive() && target.result().mpDamage !== 0) {
      if (target.result().mpDamage < 0) {
        this.performRecovery(target); // 回復のアニメーションを実行
      }
      this.push('addText', this.makeMpDamageText(target)); // ログにMPダメージのテキストを追加
    }
  };

  /**
   * 対象が受けたTPダメージを表示する。
   *
   * @param {Game_Battler} target - TPダメージを受けた対象
   */
  Window_BattleLog.prototype.displayTpDamage = function (target) {
    if (target.isAlive() && target.result().tpDamage !== 0) {
      if (target.result().tpDamage < 0) {
        this.performRecovery(target); // 回復のアニメーションを実行
      }
      this.push('addText', this.makeTpDamageText(target)); // ログにTPダメージのテキストを追加
    }
  };

  /**
   * 通常のアニメーションを表示するための関数。
   * 現在はアニメーション表示を無効化している（何もしない）。
   *
   * アニメーションIDに対応するアニメーションが存在する場合、本来はそのアニメーションを
   * ターゲットに対して再生する処理が行われますが、ここでは無効化されています。
   *
   * @param {Game_Battler[]} targets - アニメーションを表示する対象（アクターまたは敵）。
   * @param {number} animationId - 再生するアニメーションのID。
   * @param {boolean} mirror - アニメーションを左右反転させるかどうかを指定するフラグ。
   */
  Window_BattleLog.prototype.showNormalAnimation = function (targets, animationId, mirror) {
    // 何もしない
    // const animation = $dataAnimations[animationId];
    // if (animation) {
    //     $gameTemp.requestAnimation(targets, animationId, mirror);
    // }
  };

  /**
   * バトルログの行テキストを描画する関数。
   * `showBattleLog` フラグが `true` の場合にのみ、通常のログ描画を実行します。
   * `showBattleLog` が `false` の場合は、ログの描画をスキップします。
   *
   * @param {number} index - 描画する行のインデックス。
   */
  const _Window_BattleLog_prototype_drawLineText = Window_BattleLog.prototype.drawLineText;
  Window_BattleLog.prototype.drawLineText = function (index) {
    if (showBattleLog) {
      _Window_BattleLog_prototype_drawLineText.call(this, index);
      return;
    }
    // 何もしない（ログ描画をスキップ）
    // const rect = this.lineRect(index);
    // this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    // this.drawTextEx(this._lines[index], rect.x, rect.y, rect.width);
  };

  /**
   * 対象の前にジャンプするアニメーションを実行する。
   *
   * @param {Game_Battler} subject - ジャンプを行うキャラクター
   * @param {Game_Battler[]} targets - ジャンプ先のターゲット
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.duration - ジャンプにかける時間（フレーム数）
   * @param {number} param.jumpHeight - ジャンプの高さ
   * @param {number} param.rotationAmount - ジャンプ中の回転量
   */
  Window_BattleLog.prototype.performJump = function (
    subject,
    { anchor, duration, jumpHeight, rotationAmount, offsetX = 0, offsetY = 0 }
  ) {
    const subjectSprite = findSprite(subject);
    if (!subjectSprite) return;
    const targetSprite = findSprite(anchor);
    if (!targetSprite) return;

    // Offsetはアクターと敵で反転
    const offsetTargetPositionX = subject.isActor() ? offsetX : -offsetX;

    // ターゲットの目の前の座標を計算
    const x = targetSprite.x + offsetTargetPositionX;
    const y = targetSprite.y + offsetY;

    const rotationByTarget = subject.isActor() ? rotationAmount : -rotationAmount;

    subjectSprite.jumpToTarget({ x, y, duration, jumpHeight, rotationAmount: rotationByTarget });
  };

  /**
   * 現在の位置にジャンプするアニメーションを実行する。
   *
   * @param {Game_Battler} subject - ジャンプを行うキャラクター
   * @param {Object} param - ジャンプのパラメータ
   * @param {number} param.duration - ジャンプにかける時間（フレーム数）
   * @param {number} param.jumpHeight - ジャンプの高さ
   * @param {number} param.rotationAmount - ジャンプ中の回転量
   */
  Window_BattleLog.prototype.performJumpHere = function (
    subject,
    { duration, jumpHeight, rotationAmount }
  ) {
    const subjectSprite = findSprite(subject);
    if (!subjectSprite) return;
    subjectSprite.jumpHere({ duration, jumpHeight, rotationAmount });
  };

  /**
   * キャラクターを元の位置に戻すジャンプアニメーションを実行する。
   *
   * @param {Game_Battler} subject - 元の位置に戻るキャラクター
   */
  Window_BattleLog.prototype.performJumpBackToOriginalPosition = function (subject) {
    const subjectSprite = findSprite(subject);
    if (!subjectSprite) return;
    const x = subjectSprite._initialX;
    const y = subjectSprite._initialY;
    if (subjectSprite.x === x && subjectSprite.y === y) return;
    subjectSprite.jumpToTarget({ x, y, duration: 15, jumpHeight: 10 });
  };

  /**
   * キャラクターをターゲットの目の前に瞬間移動させる処理。
   * 主にバトル中の演出で使用。
   *
   * @param {Game_Battler} subject - 瞬間移動するキャラクター（アクターまたは敵）
   * @param {Object} options - 瞬間移動に関する設定
   * @param {Game_Battler} options.anchor - 瞬間移動先となるターゲット
   * @param {number} [options.duration=20] - 瞬間移動にかかる時間（フレーム数）
   * @param {number} [options.offsetX=0] - 瞬間移動時のX座標のオフセット量
   */
  Window_BattleLog.prototype.performTeleportToTargetFront = function (
    subject,
    { anchor, duration = 20, offsetX = 0 }
  ) {
    const subjectSprite = findSprite(subject); // 移動するキャラクターのスプライトを取得
    if (!subjectSprite) return;
    const targetSprite = findSprite(anchor); // 移動先のターゲットのスプライトを取得
    if (!targetSprite) return;
    if (subjectSprite === targetSprite) return; // 自分自身がターゲットの場合は処理をスキップ

    // アクターと敵でオフセットの向きを反転
    const offsetTargetPositionX = subject.isActor() ? offsetX : -offsetX;

    // ターゲットの目の前の座標を計算
    const x = targetSprite.x + offsetTargetPositionX;
    const y = targetSprite.y;

    // 瞬間移動を実行
    subjectSprite.teleportToTarget({ x, y, duration });
    subjectSprite._teleported = true; // 瞬間移動フラグを設定
  };

  /**
   * キャラクターを元の位置に瞬間移動させる処理。
   * 主にバトル中の演出で使用し、行動後にキャラクターを元の位置に戻す。
   *
   * @param {Game_Battler} subject - 瞬間移動させるキャラクター（アクターまたは敵）
   */
  Window_BattleLog.prototype.performTeleportBackToOriginalPosition = function (subject) {
    const subjectSprite = findSprite(subject); // キャラクターのスプライトを取得
    if (!subjectSprite) return;

    const x = subjectSprite._initialX; // 初期X座標
    const y = subjectSprite._initialY; // 初期Y座標

    // キャラクターがすでに元の位置にいる場合は処理をスキップ
    if (subjectSprite.x === x && subjectSprite.y === y) return;

    // 元の位置に瞬間移動
    subjectSprite.teleportToTarget({ x, y, duration: 15 });
  };

  /**
   * キャラクターを指定されたターゲットの位置に浮遊させる処理。
   * 主にバトル中の演出で使用。
   *
   * @param {Game_Battler} subject - 浮遊するキャラクター（アクターまたは敵）
   * @param {Object} options - 浮遊に関する設定
   * @param {Game_Battler} options.anchor - 浮遊先のターゲット
   * @param {number} [options.duration=60] - 浮遊にかかる時間（フレーム数）
   * @param {number} [options.floatHeight=50] - 浮遊する高さ（Y座標の変化量）
   * @param {number} [options.offsetX=0] - 浮遊時のX座標のオフセット量
   */
  Window_BattleLog.prototype.performFloat = function (
    subject,
    { anchor, duration = 60, floatHeight = 50, offsetX = 0 }
  ) {
    const subjectSprite = findSprite(subject); // 移動するキャラクターのスプライトを取得
    if (!subjectSprite) return;

    const targetSprite = findSprite(anchor); // 移動先のターゲットのスプライトを取得
    if (!targetSprite) return;

    // アクターと敵でオフセットの向きを反転
    const offsetTargetPositionX = subject.isActor() ? offsetX : -offsetX;

    // ターゲットのX座標に対するオフセットを計算
    const x = targetSprite.x + offsetTargetPositionX;

    // 浮遊を開始
    subjectSprite.startFloat({ x, duration, floatHeight });
    subjectSprite._floated = true; // 浮遊フラグを設定
  };

  /**
   * キャラクターを元の位置に降下させる処理。
   * 主にバトル中の演出で使用し、キャラクターが浮遊した後に元の位置に戻るために使用。
   *
   * @param {Game_Battler} subject - 降下するキャラクター（アクターまたは敵）
   */
  Window_BattleLog.prototype.performFall = function (subject) {
    const subjectSprite = findSprite(subject); // キャラクターのスプライトを取得
    if (!subjectSprite) return;

    const x = subjectSprite._initialX; // 初期X座標
    const y = subjectSprite._initialY; // 初期Y座標

    // キャラクターがすでに元の位置にいる場合は処理をスキップ
    if (subjectSprite.x === x && subjectSprite.y === y) return;

    // 降下を開始
    subjectSprite.startFall({ fallDuration: 15 }); // 降下にかかる時間を15フレームで設定
  };

  /**
   * キャラクターにダメージを適用する処理。
   * 主にバトル中の攻撃やスキル使用時に対象となるキャラクターにダメージを与えるために使用。
   *
   * @param {Game_Battler} subject - 攻撃やスキルを使用するキャラクター（アクターまたは敵）
   * @param {Game_Battler[]} targets - ダメージを受けるターゲットの配列
   * @param {Game_Action} action - 実行されるアクション（攻撃やスキル）
   */
  Window_BattleLog.prototype.performApplyDamage = function (subject, targets, action) {
    for (const target of targets) {
      applyDamage(subject, target, action); // 個々のターゲットにダメージを適用
    }
  };

  /**
   * 指定されたサウンドエフェクト（SE）を再生する処理。
   * 主にバトル中の演出や効果音を再生するために使用。
   *
   * @param {string} audioName - 再生するオーディオファイルの名前（拡張子なし）
   * @param {number} [volume] - 再生音量
   * @param {number} [pitch] - ピッチ
   * @param {number} [pan] - パン
   */
  Window_BattleLog.prototype.performPlaySe = function (audioName, volume, pitch, pan) {
    AudioManager.playSe({ name: audioName, volume, pitch, pan }); // サウンドエフェクトを再生
  };

  /**
   * 指定されたターゲットにアニメーションを再生する処理。
   * 主にバトル中のスキルや攻撃に伴うアニメーションを表示するために使用。
   *
   * @param {Game_Battler[]} targets - アニメーションを再生するターゲットの配列
   * @param {number} animationId - 再生するアニメーションのID
   * @param {boolean} mirror - アニメーションを左右反転させるかどうか（trueで反転）
   */
  Window_BattleLog.prototype.performAnimation = function (targets, animationId, mirror) {
    $gameTemp.requestAnimation(targets, animationId, mirror); // アニメーションのリクエストを行う
  };

  /**
   * 指定されたキャラクターにモーションを再生する処理。
   * 主にバトル中のアクションやスキルの演出で、キャラクターが特定のモーションを実行するために使用。
   *
   * @param {Game_Actor | Game_Enemy} subject - モーションを再生するキャラクター（アクターまたは敵）
   * @param {string} motionType - 再生するモーションのタイプ（"attack"、"guard"、"magic" など）
   */
  Window_BattleLog.prototype.performMotion = function (subject, motionType) {
    subject.requestMotion(motionType); // 指定されたモーションをリクエスト
  };

  /**
   * 指定されたキャラクターが投擲するオブジェクトをバトルシーンに追加する処理。
   * 主にスキルやアクションの演出で、キャラクターが投擲する武器やアイテムを表示するために使用。
   *
   * @param {Sprite_ThrowObject} throwObject - 投擲されるオブジェクトのスプライト
   * @param {Game_Battler} subject - 投擲を行うキャラクター（アクターまたは敵）
   */
  Window_BattleLog.prototype.addThrowObject = function (throwObject, subject) {
    SceneManager._scene._spriteset.addThrowObject(throwObject, subject); // 投擲オブジェクトをシーンに追加
  };

  Window_BattleLog.prototype.requestAnimation = function (targets, animationId, mirror) {
    $gameTemp.requestAnimation(targets, animationId, mirror);
  };

  /**
   * 指定された投擲オブジェクトをバトルシーンから削除する処理。
   * 主に投擲アクションの終了後に、シーンから投擲物を消すために使用。
   *
   * @param {Sprite_ThrowObject} throwObject - 削除する投擲オブジェクトのスプライト
   */
  Window_BattleLog.prototype.removeThrowObject = function (throwObject) {
    setTimeout(() => {
      if (typeof SceneManager?._scene?._spriteset?.removeThrowObject === 'function') {
        SceneManager._scene._spriteset.removeThrowObject(throwObject);
      }
    }, 10000);
  };

  /**
   * 指定されたターゲットの透明度を変更する処理。
   * 主にバトル中の演出や効果で、キャラクターの透明度を調整するために使用。
   *
   * @param {Game_Battler[]} targets - 透明度を変更する対象のキャラクターの配列
   * @param {number} opacity - 設定する透明度（0〜255の範囲で指定）
   */
  Window_BattleLog.prototype.performChangeOpacity = function (targets, opacity) {
    for (const target of targets) {
      const targetSprite = findSprite(target); // ターゲットのスプライトを取得
      if (targetSprite) {
        targetSprite.opacity = opacity; // スプライトの透明度を設定
      }
    }
  };

  /**
   * 回避アニメーションを実行し、ジャンプする。
   *
   * @param {Game_Battler} target - 回避を行うキャラクター
   */
  const _Window_BattleLog_prototype_performEvasion = Window_BattleLog.prototype.performEvasion;
  Window_BattleLog.prototype.performEvasion = function (target) {
    const targetSprite = findSprite(target);
    if (!targetSprite) return;

    targetSprite.jumpHere({ duration: 20, jumpHeight: 100, rotationAmount: 1 });
    _Window_BattleLog_prototype_performEvasion.call(this, target);
  };

  /**
   * 魔法回避アニメーションを実行し、ジャンプする。
   *
   * @param {Game_Battler} target - 魔法回避を行うキャラクター
   */
  const _Window_BattleLog_prototype_performMagicEvasion =
    Window_BattleLog.prototype.performMagicEvasion;
  Window_BattleLog.prototype.performMagicEvasion = function (target) {
    const targetSprite = findSprite(target);
    if (!targetSprite) return;

    _Window_BattleLog_prototype_performMagicEvasion.call(this, target);
  };

  /**
   * 代わりに攻撃を受けるキャラクターのジャンプアニメーションを実行する。
   *
   * @param {Game_Battler} substitute - 代わりに攻撃を受けるキャラクター
   * @param {Game_Battler} target - 攻撃を受ける対象キャラクター
   */
  const _Window_BattleLog_prototype_performSubstitute =
    Window_BattleLog.prototype.performSubstitute;
  Window_BattleLog.prototype.performSubstitute = function (substitute, target) {
    const subjectSprite = findSprite(substitute);
    if (!subjectSprite) return;
    const targetSprite = findSprite(target);
    if (!targetSprite) return;
    if (subjectSprite === targetSprite) return;

    const offsetTargetPositionX = substitute.isActor() ? -50 : 50;
    const x = targetSprite.x + offsetTargetPositionX;
    const y = targetSprite.y;
    subjectSprite.jumpToTarget({ x, y, duration: 5, jumpHeight: 10, rotationAmount: 0 });
    this.push('performJumpBackToOriginalPosition', substitute);

    _Window_BattleLog_prototype_performSubstitute.call(this, substitute, target);
  };

  /**
   * ピクチャの座標を取得するための関数。
   * 座標は直接指定か変数指定のどちらかで取得されます。
   * Game_Interpreterから流用。
   *
   * @param {Array} params - パラメータ配列（座標指定方法と値）。
   * @returns {Point} 指定された座標を持つPointオブジェクトを返します。
   */
  const picturePoint = function (params) {
    const point = new Point();
    if (params[3] === 0) {
      // 直接指定
      point.x = params[4];
      point.y = params[5];
    } else {
      // 変数指定
      point.x = $gameVariables.value(params[4]);
      point.y = $gameVariables.value(params[5]);
    }
    return point;
  };

  /**
   * ピクチャを表示するための関数。
   * Game_Interpreterから流用。
   *
   * @param {Object} params - ピクチャ表示に必要なパラメータ。
   * @param {number} params.pictureId - ピクチャのID。
   * @param {string} params.name - ピクチャのファイル名。
   * @param {number} params.origin - 原点（0: 左上、1: 中心）。
   * @param {number} params.directDesignation - 座標の指定方法（0: 直接指定、1: 変数指定）。
   * @param {number} params.x - X座標（直接指定の場合）。
   * @param {number} params.y - Y座標（直接指定の場合）。
   * @param {number} params.scaleX - 横方向の拡大率（%単位）。
   * @param {number} params.scaleY - 縦方向の拡大率（%単位）。
   * @param {number} params.opacity - 不透明度（0～255）。
   * @param {number} params.blendMode - ブレンドモード（0: 通常、1: 加算、2: 乗算、3: スクリーン）。
   */
  Window_BattleLog.prototype.performShowPicture = function ({
    pictureId,
    name,
    origin,
    directDesignation,
    x,
    y,
    scaleX,
    scaleY,
    opacity,
    blendMode,
  }) {
    const params = [
      pictureId,
      name,
      origin,
      directDesignation,
      x,
      y,
      scaleX,
      scaleY,
      opacity,
      blendMode,
    ];
    const point = picturePoint(params);
    $gameScreen.showPicture(
      params[0],
      params[1],
      params[2],
      point.x,
      point.y,
      params[6],
      params[7],
      params[8],
      params[9]
    );
  };

  /**
   * ピクチャを移動するための関数。
   * Game_Interpreterから流用。
   *
   * @param {Object} params - ピクチャ移動に必要なパラメータ。
   * @param {number} params.pictureId - ピクチャのID。
   * @param {string} params.name - ピクチャのファイル名（使用されませんが、保持されます）。
   * @param {number} params.origin - 原点（0: 左上、1: 中心）。
   * @param {number} params.directDesignation - 座標の指定方法（0: 直接指定、1: 変数指定）。
   * @param {number} params.x - X座標（直接指定の場合）。
   * @param {number} params.y - Y座標（直接指定の場合）。
   * @param {number} params.scaleX - 横方向の拡大率（%単位）。
   * @param {number} params.scaleY - 縦方向の拡大率（%単位）。
   * @param {number} params.opacity - 不透明度（0～255）。
   * @param {number} params.blendMode - ブレンドモード（0: 通常、1: 加算、2: 乗算、3: スクリーン）。
   * @param {number} params.duration - 移動にかける時間（フレーム単位）。
   * @param {boolean} params.wait - ピクチャが移動する間待機するかどうか。
   * @param {number} params.easingType - イージングの種類（デフォルトは0: なし）。
   */
  Window_BattleLog.prototype.performMovePicture = function ({
    pictureId,
    name,
    origin,
    directDesignation,
    x,
    y,
    scaleX,
    scaleY,
    opacity,
    blendMode,
    duration,
    wait,
    easingType,
  }) {
    const params = [
      pictureId,
      name,
      origin,
      directDesignation,
      x,
      y,
      scaleX,
      scaleY,
      opacity,
      blendMode,
      duration,
      wait,
      easingType,
    ];
    const point = picturePoint(params);
    $gameScreen.movePicture(
      params[0],
      params[2],
      point.x,
      point.y,
      params[6],
      params[7],
      params[8],
      params[9],
      params[10],
      params[12] || 0
    );
    if (params[11]) {
      this.wait(params[10]);
    }
  };

  /**
   * ピクチャを回転させる関数。
   *
   * @param {Object} params - ピクチャ回転に必要なパラメータ。
   * @param {number} params.pictureId - ピクチャのID。
   * @param {number} params.speed - 回転速度（正: 時計回り、負: 反時計回り）。
   */
  Window_BattleLog.prototype.performRotatePicture = function ({ pictureId, speed }) {
    const params = [pictureId, speed];
    $gameScreen.rotatePicture(params[0], params[1]);
  };

  /**
   * ピクチャに色調変更（ティント）を適用する関数。
   *
   * @param {Object} params - ピクチャの色調変更に必要なパラメータ。
   * @param {number} params.pictureId - ピクチャのID。
   * @param {Array<number>} params.tone - 色調を表す配列 [赤, 緑, 青, グレー]。
   * @param {number} params.duration - 色調変更にかける時間（フレーム単位）。
   * @param {boolean} params.wait - 色調変更が完了するまで待機するかどうか。
   */
  Window_BattleLog.prototype.performTintPicture = function ({ pictureId, tone, duration, wait }) {
    const params = [pictureId, tone, duration, wait];
    $gameScreen.tintPicture(params[0], params[1], params[2]);
    if (params[3]) {
      this.wait(params[2]);
    }
  };

  /**
   * ピクチャを消去する関数。
   *
   * @param {Object} params - ピクチャの消去に必要なパラメータ。
   * @param {number} params.pictureId - 消去するピクチャのID。
   */
  Window_BattleLog.prototype.performErasePicture = function ({ pictureId }) {
    const params = [pictureId];
    $gameScreen.erasePicture(params[0]);
  };

  /**
   * バトル中に対象キャラクターが指定されたアクションを実行する際に、ターゲットに向かってジャンプする必要があるかどうかを判定する関数。
   * 主にアクションの種類や装備している武器のタイプに応じて、キャラクターがジャンプするかを決定する。
   *
   * @param {Game_Battler} subject - アクションを実行するキャラクター（アクターまたは敵）
   * @param {Game_Action} action - 実行されるアクション（攻撃やスキルなど）
   * @returns {boolean} - ジャンプが必要であれば true、不要であれば false を返す
   *
   * @remarks
   * - action._item は Game_Item のインスタンスで、action.item() は $dataItem を指します。
   * - キャラクターやアクションが特定のメタデータ (NOTE.NO_MOVE) を持っている場合、ジャンプは不要になります。
   */
  const isBattlerNeedJumpToTarget = (subject, action, targets) => {
    if (subject.isSvBattleExMeta(NOTE.NO_MOVE)) return false;
    if (action._item.isSvBattleExMeta(NOTE.NO_MOVE)) return false;
    if (action._item.isSvBattleExMeta(NOTE.NEED_MOVE)) return true;

    if (action.isForOne() && subject === targets[0]) {
      return false;
    }

    if (action.isAttack()) {
      if (subject.isEnemy()) {
        return action.isForOne();
      }

      const weapons = subject.weapons();
      const wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
      const attackMotion = $dataSystem.attackMotions[wtypeId];

      if (attackMotion) {
        const THRUST_MOTION = 0;
        const SWING_MOTION = 1;
        const MISSILE_MOTION = 2;

        if (attackMotion.type === THRUST_MOTION) {
          return action.isForOne();
        }
        if (attackMotion.type === SWING_MOTION) {
          return action.isForOne();
        }
        if (attackMotion.type === MISSILE_MOTION) {
          return false;
        }
      }
    }

    // if (action.isMagicSkill()) {
    if (!action.isPhysical()) {
      if (action.isForFriend()) {
        return action.isForOne();
      }
      return false;
    }

    return action.isForOne();
  };

  /**
   * スキル名やアクション名を表示する必要があるかどうかを判定する関数。
   * 主にバトル中の演出において、特定のアクションに対してスキル名を表示するかを決定する。
   *
   * @param {Game_Action} action - 判定対象のアクション（スキルやアイテム）
   * @returns {boolean} - スキル名を表示する必要がある場合は true、表示しない場合は false
   */
  const needsShowSkillName = (action) => {
    if (!showSkillNameExtend) return false; // グローバル設定による表示可否
    if (action._item.isSvBattleExMeta(NOTE.NO_NAME)) return false; // 特定のアクションで表示しない場合
    return true; // 表示が必要な場合
  };

  /**
   * 新しいユニークなIDを生成します。
   *
   * この関数は、`BattleManager._assignedEventId`を利用して一意のIDを生成します。
   * `BattleManager._assignedEventId`が未定義の場合は初期化され、毎回この関数が呼ばれるごとにIDが1増えます。
   *
   * @returns {number} ユニークなID
   */
  const createNewUniqueId = () => {
    // BattleManager._assignedEventIdが定義されていなければ0に初期化
    if (!BattleManager._assignedEventId) BattleManager._assignedEventId = 0;
    // IDを1つ増やす
    BattleManager._assignedEventId += 1;
    // 一意のIDを返す
    const uniqueId = BattleManager._assignedEventId;
    return uniqueId;
  };

  /**
   * 指定されたキャラクターをジャンプさせるアクションを実行します。
   *
   * この関数は`logWindow`に対してジャンプアクションをスケジュールします。
   * `anchor`が'self'の場合は`subject`自身がジャンプの基準点となり、それ以外の場合はターゲットに向けてジャンプします。
   *
   * @param {Object} params - ジャンプアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - ジャンプするキャラクター（バトラー）
   * @param {string} params.anchor - ジャンプの基準点 ('self' または ターゲット)
   * @param {Game_Battler[]} params.targets - ジャンプ先のターゲットとなるキャラクターの配列
   * @param {number} params.offsetX - ジャンプする際のX座標のオフセット
   * @param {number} params.offsetY - ジャンプする際のY座標のオフセット
   * @param {number} params.duration - ジャンプにかけるフレーム数
   * @param {number} params.jumpHeight - ジャンプの高さ
   * @param {number} params.rotationAmount - ジャンプ中の回転量
   */
  const jumpAction = ({
    logWindow,
    subject,
    anchor,
    targets,
    offsetX,
    offsetY,
    duration,
    jumpHeight,
    rotationAmount,
  }) => {
    // 'performJump'アクションをバトルログに追加
    logWindow.push('performJump', subject, {
      anchor: anchor === 'self' ? subject : targets[0], // アンカーが'self'なら自身、それ以外なら最初のターゲット
      offsetX,
      offsetY,
      duration,
      jumpHeight,
      rotationAmount,
    });
  };

  /**
   * 指定した対象に回転アクションを実行する関数。
   * 対象はジャンプの動作中に回転させます。
   *
   * @param {Object} params - アクションの設定パラメータ。
   * @param {Object} params.logWindow - バトルログウィンドウ。
   * @param {Object} params.subject - アクションを実行するバトラー。
   * @param {string} params.anchor - 回転の基準対象 ('self' で実行者自身、それ以外でターゲット)。
   * @param {Object[]} params.targets - ターゲットのリスト。
   * @param {number} params.duration - 回転アクションの持続時間（フレーム数）。
   * @param {number} params.rotationAmount - 回転量（1.0で1回転）。
   */
  const rotateAction = ({ logWindow, subject, anchor, targets, duration, rotationAmount }) => {
    // 'performJump'アクションをバトルログに追加
    logWindow.push('performJump', anchor === 'self' ? subject : targets[0], {
      anchor: anchor === 'self' ? subject : targets[0],
      offsetX: 0,
      offsetY: 0,
      duration,
      jumpHeight: 0,
      rotationAmount,
    });
  };

  /**
   * キャラクターを一歩前進させるアクションを実行します。
   *
   * キャラクターは指定された`duration`（フレーム数）で「歩く」モーションを行い、一歩前進します。
   *
   * @param {Object} params - ステップフォワードアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 前進するキャラクター（バトラー）
   * @param {number} params.duration - 前進にかけるフレーム数
   */
  const stepForwardAction = ({ logWindow, subject, duration }) => {
    // キャラクターの現在のモーションを記録
    const prevMotionType = subject.motionType();

    // 「歩く」モーションを実行
    logWindow.push('performMotion', subject, 'walk');

    // 一歩前進する（ジャンプを使って前進を表現）
    logWindow.push('performJump', subject, {
      anchor: subject, // 自分自身を基準点としてジャンプ
      offsetX: -48, // X座標を-48ピクセル進める（前進）
      duration, // 指定されたフレーム数でジャンプ（前進）を行う
      jumpHeight: 0, // ジャンプの高さは0（水平移動のみ）
      rotationAmount: 0, // 回転なし
    });

    // 元のモーションに戻す
    logWindow.push('performMotion', subject, prevMotionType);
  };

  /**
   * キャラクターを後退させるアクションを実行します。
   *
   * キャラクターは指定された`duration`（フレーム数）で「歩く」モーションを行い、一歩後退します。
   *
   * @param {Object} params - ステップバックアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 後退するキャラクター（バトラー）
   * @param {number} params.duration - 後退にかけるフレーム数
   */
  const stepBackwardAction = ({ logWindow, subject, duration }) => {
    // 「歩く」モーションを実行
    logWindow.push('performMotion', subject, 'walk');

    // 一歩後退する（ジャンプを使って後退を表現）
    logWindow.push('performJump', subject, {
      anchor: subject, // 自分自身を基準点としてジャンプ
      offsetX: 48, // X座標を48ピクセル後退させる
      duration, // 指定されたフレーム数でジャンプ（後退）を行う
      jumpHeight: 0, // ジャンプの高さは0（水平移動のみ）
      rotationAmount: 0, // 回転なし
    });

    // 元のモーションに戻す
    logWindow.push('performMotion', subject, subject.motionType());
  };

  /**
   * キャラクターを指定されたターゲットの前にテレポートさせるアクションを実行します。
   *
   * キャラクターは指定された`duration`（フレーム数）で、ターゲットの前に瞬間移動します。
   *
   * @param {Object} params - テレポートアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - テレポートするキャラクター（バトラー）
   * @param {string} params.anchor - テレポート先の基準点（'self'かターゲット）
   * @param {Game_Battler[]} params.targets - ターゲットとなるキャラクター（複数）
   * @param {number} params.duration - テレポートにかけるフレーム数
   * @param {number} params.offsetX - テレポート先のX座標オフセット
   */
  const teleportAction = ({ logWindow, subject, anchor, targets, duration, offsetX }) => {
    // テレポートアクションをバトルログに追加
    logWindow.push('performTeleportToTargetFront', subject, {
      anchor: anchor === 'self' ? subject : targets[0], // テレポート先を自分自身か、最初のターゲットに設定
      duration, // テレポートにかけるフレーム数
      offsetX, // X座標のオフセット値（対象の前に移動するために使用）
    });
  };

  /**
   * キャラクターを指定されたターゲットの位置に浮遊させるアクションを実行します。
   *
   * キャラクターは指定された`duration`（フレーム数）で浮遊し、`floatHeight`分の高さまで上昇します。
   *
   * @param {Object} params - 浮遊アクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 浮遊させるキャラクター（バトラー）
   * @param {string} params.anchor - 浮遊する基準点（'self'かターゲット）
   * @param {Game_Battler[]} params.targets - ターゲットとなるキャラクター（複数）
   * @param {number} params.duration - 浮遊にかけるフレーム数
   * @param {number} params.floatHeight - 浮遊する高さ
   * @param {number} params.offsetX - 浮遊先のX座標オフセット
   */
  const floatAction = ({ logWindow, subject, anchor, targets, duration, floatHeight, offsetX }) => {
    // 浮遊アクションをバトルログに追加
    logWindow.push('performFloat', subject, {
      anchor: anchor === 'self' ? subject : targets[0], // 浮遊の基準点を自分自身か、最初のターゲットに設定
      duration, // 浮遊にかけるフレーム数
      floatHeight, // 浮遊する高さ
      offsetX, // X座標のオフセット値（対象の前に浮遊させるために使用）
    });
  };

  /**
   * キャラクターが元の位置に降下するアクションを実行します。
   *
   * このアクションでは、キャラクターが一定時間をかけて元の位置まで降下します。
   *
   * @param {Object} params - 降下アクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 降下させるキャラクター（バトラー）
   */
  const fallAction = ({ logWindow, subject }) => {
    // 降下アクションをバトルログに追加
    logWindow.push('performFall', subject);
  };

  /**
   * 指定されたモーションをキャラクターに実行させるアクションを追加します。
   *
   * このアクションでは、指定されたモーション（攻撃、ガードなど）をキャラクターに実行させます。
   *
   * @param {Object} params - モーションアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - モーションを実行するキャラクター（バトラー）
   * @param {string} params.motionType - 実行するモーションの種類（例: 'attack', 'guard' など）
   */
  const motionAction = ({ logWindow, subject, motionType }) => {
    // モーションアクションをバトルログに追加
    logWindow.push('performMotion', subject, motionType);
  };

  /**
   * アニメーションを再生するアクションを追加します。
   *
   * 指定されたキャラクターまたはターゲットに対してアニメーションを再生します。
   *
   * @param {Object} params - アニメーションアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - アニメーションを実行するキャラクター（バトラー）
   * @param {Game_Battler[]} params.targets - アニメーションを対象とするキャラクター（複数可）
   * @param {number} params.animationId - 再生するアニメーションのID
   * @param {string} params.anchor - アニメーションを再生する対象（'self' なら自身、それ以外はターゲット）
   */
  const animationAction = ({ logWindow, subject, targets, animationId, anchor }) => {
    logWindow.push(
      'performAnimation',
      anchor === 'self' ? [subject] : targets, // アニメーションの対象が自身かターゲットかを判定
      animationId, // アニメーションIDを指定
      !subject.isActor() // アクターかエネミーかによってミラーリングを設定
    );
  };

  /**
   * 指定された時間待機するアクションを追加します。
   *
   * バトルの進行を指定されたフレーム数分だけ待機させます。
   *
   * @param {Object} params - 待機アクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {number} params.waitTime - 待機するフレーム数（1秒 = 60フレーム）
   */
  const waitAction = ({ logWindow, waitTime }) => {
    logWindow.push('wait', waitTime); // 指定された時間（フレーム）だけ待機
  };

  /**
   * 投擲オブジェクトを生成し、対象に向かって投げるアクションを追加します。
   *
   * 投擲オブジェクトを生成し、指定されたターゲットに向けてジャンプアクションを実行します。
   * アニメーションやジャンプ動作、回転、フェードアウトなどを含む一連のアクションをバトルログに追加します。
   *
   * @param {Object} params - 投擲アクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 投擲を行う主体（アクターまたはエネミー）
   * @param {Game_Battler[]} params.targets - 投擲のターゲットとなるバトラーの配列
   * @param {number} params.eventId - 投擲オブジェクトのイベントID
   * @param {number} params.animationId - 投擲時に再生するアニメーションID
   * @param {number} params.duration - 投擲オブジェクトの移動にかかる時間（フレーム数）
   * @param {number} params.jumpHeight - ジャンプの高さ
   * @param {number} params.rotationAmount - 投擲オブジェクトの回転量
   * @param {number} params.offsetX - 投擲時のX座標のオフセット
   * @param {number} params.offsetY - 投擲時のY座標のオフセット
   */
  const throwObjectAction = ({
    logWindow,
    subject,
    targets,
    eventId,
    animationId,
    duration,
    jumpHeight,
    rotationAmount,
    offsetX,
    offsetY,
  }) => {
    let throwObjects = [];
    for (const target of targets) {
      const uniqueId = createNewUniqueId();
      const throwObject = new Game_ThrowObject(eventId, uniqueId, subject);
      logWindow.push('addThrowObject', throwObject, subject);
      if (animationId) {
        const mirror = !subject.isActor();
        logWindow.push('requestAnimation', [throwObject], animationId, mirror);
      }
      logWindow.push('performJump', throwObject, {
        anchor: target,
        offsetX,
        offsetY,
        duration,
        jumpHeight,
        rotationAmount,
      });
      throwObjects.push(throwObject);
    }
    logWindow.push('wait', duration);
    logWindow.push('performChangeOpacity', throwObjects, 0);
    for (const throwObject of throwObjects) {
      logWindow.push('removeThrowObject', throwObject);
    }
  };

  /**
   * ダメージを対象に適用するアクションを追加します。
   *
   * 指定された対象に対して、与えられたアクションに基づいてダメージを適用します。
   *
   * @param {Object} params - ダメージアクションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - ダメージを与える主体（アクターまたはエネミー）
   * @param {Game_Battler[]} params.targets - ダメージのターゲットとなるバトラーの配列
   * @param {Game_Action} params.action - ダメージを適用するアクションオブジェクト
   */
  const applyDamageAction = ({ logWindow, subject, targets, action }) => {
    logWindow.push('performApplyDamage', subject, targets, action);
  };

  /**
   * SE（サウンドエフェクト）を再生するアクションを追加します。
   *
   * 指定されたサウンドエフェクトを再生します。
   *
   * @param {Object} params - SE再生に必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {string} params.audioName - 再生するSEの名前
   * @param {number} params.volume - SEのボリューム（0〜100）
   * @param {number} params.pitch - SEのピッチ（音の高さ）
   * @param {number} params.pan - SEのパン（左右のステレオ位置）
   */
  const playSeAction = ({ logWindow, audioName, volume, pitch, pan }) => {
    logWindow.push('performPlaySe', audioName, volume, pitch, pan);
  };

  /**
   * 対象の透明度を変更するアクションを追加します。
   *
   * 指定された対象（subject または targets）の透明度（opacity）を変更します。
   *
   * @param {Object} params - 透明度変更に必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 透明度を変更する主体（アクターまたは敵）
   * @param {Array<Game_Battler>} params.targets - 透明度を変更する対象のリスト
   * @param {number} params.opacity - 変更する透明度（0〜255）
   * @param {string} params.anchor - "self" の場合は subject を対象にし、その他の場合は targets を対象にする
   */
  const changeOpacityAction = ({ logWindow, subject, targets, opacity, anchor }) => {
    logWindow.push('performChangeOpacity', anchor === 'self' ? [subject] : targets, opacity);
  };

  /**
   * アクションに基づいて攻撃モーションを実行します。
   *
   * 指定された主体（subject）による攻撃アクションを実行するモーションを追加します。
   *
   * @param {Object} params - 攻撃モーションに必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - 攻撃を行う主体（アクターまたは敵）
   * @param {Game_Action} params.action - 実行するアクション（攻撃アクション）
   */
  const attackMotion = ({ logWindow, subject, action }) => {
    logWindow.push('performAction', subject, action);
  };

  /**
   * スキルのメッセージ1を表示する関数です。
   *
   * 指定された主体（subject）によるスキルのメッセージ1をバトルログウィンドウに表示します。
   *
   * @param {Object} params - スキルメッセージ表示に必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - メッセージを表示する主体（アクターまたは敵）
   * @param {number} params.duration - 表示にかかる時間（フレーム数）
   * @param {Game_Action} params.action - 実行するスキルまたはアクション
   */
  const showMessage1 = ({ logWindow, subject, duration, action }) => {
    logWindow.push('performShowMessage', subject, duration, action, 'message1');
    logWindow.push('wait', duration);
  };

  /**
   * スキルのメッセージ2を表示する関数です。
   *
   * 指定された主体（subject）によるスキルのメッセージ2をバトルログウィンドウに表示します。
   *
   * @param {Object} params - スキルメッセージ表示に必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - メッセージを表示する主体（アクターまたは敵）
   * @param {number} params.duration - 表示にかかる時間（フレーム数）
   * @param {Game_Action} params.action - 実行するスキルまたはアクション
   */
  const showMessage2 = ({ logWindow, subject, duration, action }) => {
    logWindow.push('performShowMessage', subject, duration, action, 'message2');
    logWindow.push('wait', duration);
  };

  /**
   * 自由メッセージを表示する関数です。
   *
   * 指定されたメッセージをバトルログウィンドウに表示します。
   *
   * @param {Object} params - 自由メッセージ表示に必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - メッセージを表示する主体（アクターまたは敵）
   * @param {string} params.message - 表示するメッセージ内容
   * @param {number} params.duration - 表示にかかる時間（フレーム数）
   * @param {Game_Action} [params.action] - 実行するスキルまたはアクション（オプション）
   */
  const showFreeMessage = ({ logWindow, subject, message, duration, action }) => {
    logWindow.push('performShowFreeMessage', subject, message, duration, action);
  };

  /**
   * スクリプトを実行する関数です。
   *
   * 指定されたスクリプトをバトルログウィンドウ内で実行します。
   *
   * @param {Object} params - スクリプト実行に必要なパラメータ
   * @param {Window_BattleLog} params.logWindow - バトルログウィンドウオブジェクト
   * @param {Game_Battler} params.subject - スクリプトを実行する主体（アクターまたは敵）
   * @param {string} params.script - 実行するスクリプトの内容
   */
  const execScript = ({ logWindow, subject, script }) => {
    logWindow.push('performExecScript', subject, script);
  };

  const showPicture = ({ logWindow, ...args }) => {
    logWindow.push('performShowPicture', args);
  };

  const movePicture = ({ logWindow, ...args }) => {
    logWindow.push('performMovePicture', args);
  };

  const rotatePicture = ({ logWindow, ...args }) => {
    logWindow.push('performRotatePicture', args);
  };

  const tintPicture = ({ logWindow, ...args }) => {
    logWindow.push('performTintPicture', args);
  };

  const erasePicture = ({ logWindow, ...args }) => {
    logWindow.push('performErasePicture', args);
  };

  /**
   * 指定されたアクションリストに従って、各アクションを実行する関数です。
   *
   * @param {Window_BattleLog} logWindow - バトルログウィンドウオブジェクト
   * @param {Array<Object>} actionItems - 実行するアクションの配列。各アクションはオブジェクト形式で指定されます。
   * @param {Game_Battler} subject - アクションを実行する主体（アクターまたは敵）
   * @param {Game_Action} action - 実行するアクション
   * @param {Array<Game_Battler>} targets - アクションのターゲットとなるバトラーの配列
   */
  const performActions = function (logWindow, actionItems, subject, action, targets) {
    for (const actionItem of actionItems) {
      const args = { ...actionItem, logWindow, subject, action, targets };

      switch (actionItem.actionName) {
        case 'jump':
          jumpAction(args);
          break;
        case 'rotate':
          rotateAction(args);
          break;
        case 'stepForward':
          stepForwardAction(args);
          break;
        case 'stepBackward':
          stepBackwardAction(args);
          break;
        case 'teleport':
          teleportAction(args);
          break;
        case 'float':
          floatAction(args);
          break;
        case 'fall':
          fallAction(args);
          break;
        case 'motion':
          motionAction(args);
          break;
        case 'animation':
          animationAction(args);
          break;
        case 'wait':
          waitAction(args);
          break;
        case 'throw':
          throwObjectAction(args);
          break;
        case 'applyDamage':
          applyDamageAction(args);
          break;
        case 'playSe':
          playSeAction(args);
          break;
        case 'changeOpacity':
          changeOpacityAction(args);
          break;
        case 'attackMotion':
          attackMotion(args);
          break;
        case 'showMessage1':
          showMessage1(args);
          break;
        case 'showMessage2':
          showMessage2(args);
          break;
        case 'showFreeMessage':
          showFreeMessage(args);
          break;
        case 'execScript':
          execScript(args);
          break;
        case 'showPicture':
          showPicture(args);
          break;
        case 'movePicture':
          movePicture(args);
          break;
        case 'rotatePicture':
          rotatePicture(args);
          break;
        case 'tintPicture':
          tintPicture(args);
          break;
        case 'erasePicture':
          erasePicture(args);
          break;
      }

      logWindow.push('waitForMovement');
    }
  };

  /**
   * バトルアクション開始時にジャンプアニメーションを追加で実行する。（オーバーライド）
   *
   * @param {Game_Battler} subject - アクションを行うキャラクター
   * @param {Game_Action} action - 実行するアクション
   * @param {Game_Battler[]} targets - ターゲットとなるキャラクター
   */
  Window_BattleLog.prototype.startAction = function (subject, action, targets) {
    if (needsShowSkillName(action)) {
      this.showSkillAndTargetInChatBubble(subject, action, targets); // チャットバブルでスキルを表示
    }
    // 防御の場合は何もしない
    if (action.isGuard()) {
      return;
    }

    const item = action._item;

    const subjectSprite = findSprite(subject);
    if (!subjectSprite) return;

    const getItemActionName = () => {
      const isNormalAttack = () => {
        const NORMAL_ATTACK_ID = 1;
        return item._itemId === NORMAL_ATTACK_ID;
      };
      if (subject.isActor() && isNormalAttack() && subject.weaponItems()[0]) {
        return subject.weaponItems()[0].getSvBattleExMetaAction();
      }
      return item.getSvBattleExMetaAction();
    };

    const itemActionName = getItemActionName();

    // アクション名が取得できた場合はこの処理
    if (itemActionName) {
      performActions(
        this,
        actionEventManager.getActionListFromDataMapActionEvents(itemActionName),
        subject,
        action,
        targets
      );
      return;
    }

    // アクション名が取得できない場合は、ジャンプする必要があるかどうかで分岐
    if (isBattlerNeedJumpToTarget(subject, action, targets)) {
      performActions(
        this,
        actionEventManager.getActionListFromDataMapActionEvents(NOTE.NORMAL_ATTACK_JUMP),
        subject,
        action,
        targets
      );
    } else {
      performActions(
        this,
        actionEventManager.getActionListFromDataMapActionEvents(NOTE.NORMAL_ATTACK_STEP_FORWARD),
        subject,
        action,
        targets
      );
    }
  };

  /**
   * バトルアクション終了時にジャンプアニメーションで元の位置に戻す。
   *
   * @param {Game_Battler} subject - アクションを行ったキャラクター
   */
  const _Window_BattleLog_prototype_endAction = Window_BattleLog.prototype.endAction;
  Window_BattleLog.prototype.endAction = function (subject) {
    _Window_BattleLog_prototype_endAction.call(this, subject);
    const subjectSprite = findSprite(subject);
    if (!subjectSprite) return;

    // テレポートしていた場合
    if (subjectSprite._teleported) {
      this.push('performTeleportBackToOriginalPosition', subject);
      subjectSprite._teleported = false;
      this.push('waitForMovement');
    }

    // 浮遊していた場合
    if (subjectSprite._floated) {
      this.push('performFall', subject);
      subjectSprite._floated = false;
      this.push('waitForMovement');
    }

    // 元の位置へ
    this.push('performJumpBackToOriginalPosition', subject);
    this.push('waitForMovement');
  };

  /**
   * スキル名とターゲット名をチャットバブルに表示し、一定時間後にフェードアウトする。
   *
   * @param {Game_Battler} subject - スキルを使用するキャラクター
   * @param {Game_Action} action - 使用するアクション（スキル）
   * @param {Game_Battler[]} targets - アクションの対象キャラクターの配列
   */
  Window_BattleLog.prototype.showSkillAndTargetInChatBubble = function (subject, action, targets) {
    const skillName = action.item().name; // スキル名を取得
    let message = '';

    // ガードアクションの場合のメッセージ
    if (action.isGuard()) {
      message = `${skillName}！`; // ガードの場合はシンプルにスキル名を表示
    } else {
      if (targets.length === 1) {
        const target = targets[0];
        // 対象が自分自身の場合のメッセージ
        if (target === subject) {
          // message = `自分に、${skillName}！`;
          message = `${skillName}！`;
        } else {
          // 対象が他者の場合のメッセージ
          message = `${target.name()}に、${skillName}！`;
        }
      } else {
        // 複数のターゲットがいる場合のメッセージ
        message = `${skillName}！`;
      }
    }

    // 使用者の上にメッセージを表示
    const subjectSprite = BattleManager._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      subjectSprite.setChatBubbleText(message, action); // チャットバブルにテキストを設定

      // 60フレーム（約1秒）待機してから行動を開始
      this.push('wait', 60);

      // 60フレーム後にチャットバブルをフェードアウトさせる
      subjectSprite.startChatBubbleFadeOutCountdown(60, 5); // 1フレームごとに5ずつ透明度を減らす
    }
  };

  /**
   * 使用者の上にスキルやアイテムのメッセージを表示する関数。
   * メッセージはチャットバブル形式で表示され、指定された時間後にフェードアウトします。
   *
   * @param {Game_Battler} subject - メッセージを表示する主体（アクターまたは敵）。
   * @param {number} duration - メッセージが表示される時間（フレーム数）。
   * @param {Game_Action} action - 実行されたアクション。
   * @param {string} itemProperty - 表示するメッセージのプロパティ（例: 'message1', 'message2'）。
   */
  Window_BattleLog.prototype.performShowMessage = function (
    subject,
    duration,
    action,
    itemProperty
  ) {
    // 使用者の上にメッセージを表示
    const subjectSprite = BattleManager._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      this._movementDuration = duration; // 移動時間
      const item = action.item();
      const message = (item[itemProperty] ?? '').format(subject.name(), item.name);
      subjectSprite.setChatBubbleText(message, action); // チャットバブルにテキストを設定

      // durationフレーム後にチャットバブルをフェードアウトさせる
      subjectSprite.startChatBubbleFadeOutCountdown(duration, 5); // 1フレームごとに5ずつ透明度を減らす
    }
  };

  /**
   * 自由メッセージを使用者の上に表示する関数。
   * メッセージはチャットバブル形式で表示され、指定された時間後にフェードアウトします。
   *
   * @param {Game_Battler} subject - メッセージを表示する主体（アクターまたは敵）。
   * @param {string} message - 表示する自由メッセージ。
   * @param {number} duration - メッセージが表示される時間（フレーム数）。
   * @param {Game_Action} action - 実行されたアクション。
   */
  Window_BattleLog.prototype.performShowFreeMessage = function (
    subject,
    message,
    duration,
    action
  ) {
    // 使用者の上にメッセージを表示
    const subjectSprite = BattleManager._spriteset.findTargetSprite(subject);
    if (subjectSprite) {
      this._movementDuration = duration; // 移動時間
      subjectSprite.setChatBubbleText(message, action); // チャットバブルにテキストを設定

      // durationフレーム後にチャットバブルをフェードアウトさせる
      subjectSprite.startChatBubbleFadeOutCountdown(duration, 5); // 1フレームごとに5ずつ透明度を減らす
    }
  };

  /**
   * 指定されたスクリプトを実行する関数。
   * スクリプトは `subject` を `this` として評価され、実行されます。
   *
   * @param {Game_Battler} subject - スクリプトを実行する主体（アクターまたは敵）。
   * @param {string} script - 実行するスクリプト。
   */
  Window_BattleLog.prototype.performExecScript = function (subject, script) {
    const formula = function () {
      eval(script); // スクリプトを評価して実行
    }.bind(subject); // subjectをthisにバインド
    formula(); // スクリプト実行
  };

  /**
   * 指定したフレーム数だけ待機する処理。
   *
   * @param {number} frames - 待機するフレーム数（指定しない場合はデフォルトのメッセージスピードを使用）
   */
  Window_BattleLog.prototype.wait = function (frames) {
    this._waitCount = frames || this.messageSpeed(); // フレーム数が指定されていない場合、デフォルトのメッセージスピードで待機
  };

  // ---------------------------------------------------------------------
  // Sprite_Damage の拡張
  // ---------------------------------------------------------------------
  /**
   * 拡張ダメージスプライトクラス
   * ダメージポップアップの表示やエフェクトを追加する。
   *
   * @extends Sprite_Damage
   */
  class Sprite_DamageEx extends Sprite_Damage {
    /**
     * コンストラクタ
     * ダメージポップアップの表示時間を設定する。
     */
    constructor() {
      super();
      this._duration = durationOfDamagePop; // ダメージポップアップの表示期間
    }

    /**
     * 対象のダメージポップアップの設定を行う。
     *
     * @param {Game_Battler} target - ダメージポップアップの対象となるキャラクター
     */
    setup(target) {
      const damagePop = target.damagePops().shift(); // ダメージポップアップのデータを取得
      if (typeof damagePop === 'string') {
        this.createFreePopupNormalSize(damagePop); // 文字列の場合はフリーポップアップとして表示
        return;
      }
      if (damagePop.missed) {
        this._colorType = 0; // ミスの場合の色設定
        this.createFreePopupNormalSize(textForMiss); // ミス表示
        this.setupEvadeEffect(); // 回避エフェクト
        return;
      }
      if (damagePop.evaded) {
        this._colorType = 0; // 回避の場合の色設定
        this.createFreePopupNormalSize(textForEvade); // 回避表示
        this.setupEvadeEffect(); // 回避エフェクト
        return;
      }
      if (damagePop.hpAffected) {
        this._colorType = damagePop.hpDamage >= 0 ? 0 : 1; // HPダメージの色設定
        this.createDigits(damagePop.hpDamage); // ダメージを数字で表示

        if (!damagePop.critical && damagePop.damageRate !== undefined) {
          const damageRate = Number(damagePop.damageRate.toFixed(1));
          if (damageRate > 1) {
            this._colorType = 0; // 弱点攻撃の場合の色設定
            this.createFreePopupSmallSize(`${textForWeak} × ${damageRate.toFixed(1)}`, true);
            this.setupWeakEffect(); // 弱点エフェクト
          }
          if (damageRate < 1) {
            this._colorType = 0; // 耐性攻撃の場合の色設定
            this.createFreePopupSmallSize(`${textForReduce} × ${damageRate.toFixed(1)}`, true);
            this.setupResistEffect(); // 耐性エフェクト
          }
        }
      } else if (target.isAlive() && damagePop.mpDamage) {
        this._colorType = damagePop.mpDamage >= 0 ? 2 : 3; // MPダメージの色設定
        this.createDigits(damagePop.mpDamage, 'mp'); // MPダメージを数字で表示
      }
      if (damagePop.critical) {
        this.createFreePopupNormalSize(textForCritical, true); // クリティカルヒット表示
        $gameScreen.startFlashForCritical(); // クリティカルヒットのフラッシュエフェクト
        this.setupCriticalEffect(); // クリティカルエフェクト
      }
    }

    /**
     * 数字を作成してスプライトに表示する。
     *
     * @param {number} value - 表示するダメージまたは回復値
     * @param {string} [suffix=''] - 追加する接尾辞（例：'mp'）
     */
    createDigits(value, suffix = '') {
      const string = `${Math.abs(value).toString()}${suffix}`; // 数字と接尾辞を連結
      const h = this.fontSize(); // フォントサイズ
      const w = Math.floor(h * 0.75); // 幅を計算
      for (let i = 0; i < string.length; i++) {
        const sprite = this.createChildSpriteNormalSize(w, h); // スプライトを作成
        sprite.bitmap.drawText(string[i], 0, 0, w, h, 'center'); // 文字を描画
        sprite.x = (i - (string.length - 1) / 2) * w; // X座標を計算
        sprite.dy = -i; // Y座標のオフセット
      }
    }

    /**
     * フォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    fontSize() {
      return damagePopMainFontSize;
    }

    /**
     * フォントの種類を取得する。
     *
     * @returns {string} フォントファミリー
     */
    fontFace() {
      return fontFile ? $gameSystem.damagePopFontFace() : $gameSystem.numberFontFace();
    }

    /**
     * ダメージポップアップの色を取得する。
     *
     * @returns {string} ダメージの色
     */
    damageColor = function () {
      return ColorManager.damageColor(this._colorType);
    };

    /**
     * 通常サイズのスプライトを作成する。
     *
     * @param {number} width - スプライトの幅
     * @param {number} height - スプライトの高さ
     * @returns {Sprite} 作成したスプライト
     */
    createChildSpriteNormalSize(width, height) {
      const sprite = new Sprite();
      sprite.bitmap = this.createBitmap(width, height);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.y = -this.fontSize(); // Y座標をフォントサイズに合わせて設定
      sprite.ry = sprite.y;
      this.addChild(sprite);
      return sprite;
    }

    /**
     * 小さいサイズのスプライトを作成する。
     *
     * @param {number} width - スプライトの幅
     * @param {number} height - スプライトの高さ
     * @returns {Sprite} 作成したスプライト
     */
    createChildSpriteSmallSize(width, height) {
      const sprite = new Sprite();
      sprite.bitmap = this.createBitmap(width, height);
      sprite.bitmap.fontSize = damagePopSubFontSize; // フォントサイズを小さくする
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      sprite.y = -this.fontSize();
      sprite.ry = sprite.y;
      this.addChild(sprite);
      return sprite;
    }

    /**
     * 弱点攻撃エフェクトを設定する。
     */
    setupWeakEffect() {
      this._flashColor = [255, 128, 0, 160]; // 弱点エフェクトの色
      this._flashDuration = durationOfDamagePop; // フラッシュの持続時間
    }

    /**
     * 耐性攻撃エフェクトを設定する。
     */
    setupResistEffect() {
      this._flashColor = [0, 255, 255, 160]; // 耐性エフェクトの色
      this._flashDuration = durationOfDamagePop;
    }

    /**
     * 回避エフェクトを設定する。
     */
    setupEvadeEffect() {
      this._flashColor = [0, 255, 255, 160]; // 回避エフェクトの色
      this._flashDuration = durationOfDamagePop;
    }

    /**
     * クリティカル攻撃エフェクトを設定する。
     */
    setupCriticalEffect() {
      this._flashColor = [255, 255, 0, 160]; // クリティカルエフェクトの色
      this._flashDuration = durationOfDamagePop;
    }

    /**
     * 通常サイズのフリーテキストポップアップを作成する。
     *
     * @param {string} text - 表示するテキスト
     * @param {boolean} [offset=false] - Y軸のオフセットを有効にするか
     */
    createFreePopupNormalSize(text, offset = false) {
      const h = 100;
      const w = Math.floor(h * 6.0);
      const sprite = this.createChildSpriteNormalSize(w, h);
      const offsetHeight = this.fontSize() / 2;
      const y = offset ? -offsetHeight : 0;
      sprite.bitmap.drawText(text, 0, y, w, h, 'center');
      sprite.dy = 0;
    }

    /**
     * 小さいサイズのフリーテキストポップアップを作成する。
     *
     * @param {string} text - 表示するテキスト
     * @param {boolean} [offset=false] - Y軸のオフセットを有効にするか
     */
    createFreePopupSmallSize(text, offset = false) {
      const h = 100;
      const w = Math.floor(h * 6.0);
      const sprite = this.createChildSpriteSmallSize(w, h);
      const offsetHeight = this.fontSize() / 2;
      const y = offset ? -offsetHeight : 0;
      sprite.bitmap.drawText(text, 0, y, w, h, 'center');
      sprite.dy = 0;
    }

    /**
     * ダメージポップアップの透明度を更新する。
     */
    updateOpacity() {
      if (this._duration < 40) {
        this.opacity = (255 * this._duration) / 40;
        this.scale.y = (1.0 * this._duration) / 40;
      }
    }

    /**
     * 各子スプライトの位置と状態を更新する。
     *
     * @param {Sprite} sprite - 更新するスプライト
     */
    updateChild(sprite) {
      sprite.dy += 0.2;
      sprite.ry += sprite.dy;
      if (sprite.ry >= 0) {
        sprite.ry = 0;
        sprite.dy *= -0.6;
      }
      sprite.y = Math.round(sprite.ry) * $gameScreen.zoomScale();
      sprite.setBlendColor(this._flashColor);
    }
  }

  // ---------------------------------------------------------------------
  // Game_Screen の拡張
  // ---------------------------------------------------------------------
  Game_Screen.prototype.startFlashForCritical = function () {
    this.startFlash([255, 255, 0, 160], 60);
  };

  // ---------------------------------------------------------------------
  // 敵のゲージ
  // ---------------------------------------------------------------------
  /**
   * 敵キャラクターのステータスHUD用のゲージスプライト
   * HP、MP、TPなどのゲージをアニメーションで表示・更新する。
   *
   * @extends Sprite_Gauge
   */
  class Sprite_Gauge_EnemyStatusHud extends Sprite_Gauge {
    /**
     * 初期化メソッド。初期値としてゲージの値を0に設定。
     */
    initialize() {
      super.initialize();
      this._displayedValue = 0; // 表示される値の初期化
      this._gaugeMode = 'bar'; // ゲージモードを設定（バー表示）
    }

    /**
     * ゲージの幅を取得する。
     *
     * @returns {number} ゲージの幅
     */
    bitmapWidth() {
      return enemyGaugeWidth;
    }

    /**
     * ゲージの高さを取得する。
     *
     * @returns {number} ゲージの高さ
     */
    bitmapHeight() {
      return this.gaugeHeight() + 20;
    }

    /**
     * テキストの高さを取得する。
     *
     * @returns {number} テキストの高さ
     */
    textHeight() {
      return Math.max(enemyGaugeLabelFontSize, enemyGaugeValueFontSize);
    }

    /**
     * ゲージの高さを取得する。
     *
     * @returns {number} ゲージの高さ
     */
    gaugeHeight() {
      return enemyGaugeHeight;
    }

    /**
     * ゲージのX座標を取得する。
     *
     * @returns {number} ゲージのX座標
     */
    gaugeX() {
      if (this._statusType === 'time') {
        return 0;
      } else {
        return 0; // タイプが異なる場合もX座標は0
      }
    }

    /**
     * ラベルのフォントフェイスを取得する。
     *
     * @returns {string} フォントフェイス
     */
    labelFontFace() {
      return $gameSystem.mainFontFace();
    }

    /**
     * ラベルのフォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    labelFontSize() {
      return enemyGaugeLabelFontSize;
    }

    /**
     * ラベルのアウトライン色を取得する。
     *
     * @returns {string} アウトラインの色
     */
    labelOutlineColor() {
      return ColorManager.outlineColor();
    }

    /**
     * ラベルのアウトライン幅を取得する。
     *
     * @returns {number} アウトライン幅
     */
    labelOutlineWidth() {
      return 3;
    }

    /**
     * ゲージの数値部分のフォントフェイスを取得する。
     *
     * @returns {string} フォントフェイス
     */
    valueFontFace() {
      return $gameSystem.damagePopFontFace();
    }

    /**
     * ゲージの数値部分のフォントサイズを取得する。
     *
     * @returns {number} フォントサイズ
     */
    valueFontSize() {
      return enemyGaugeValueFontSize;
    }

    /**
     * ゲージの開始色を取得する。
     *
     * @returns {string} ゲージの開始色
     */
    gaugeColor1() {
      switch (this._statusType) {
        case 'hp':
          return ColorManager.textColor(gaugeColorHp1);
        case 'mp':
          return ColorManager.textColor(gaugeColorMp1);
        case 'tp':
          return ColorManager.textColor(gaugeColorTp1);
        case 'time':
          return ColorManager.ctGaugeColor1();
        default:
          return ColorManager.normalColor();
      }
    }

    /**
     * ゲージの終了色を取得する。
     *
     * @returns {string} ゲージの終了色
     */
    gaugeColor2() {
      switch (this._statusType) {
        case 'hp':
          return ColorManager.textColor(gaugeColorHp2);
        case 'mp':
          return ColorManager.textColor(gaugeColorMp2);
        case 'tp':
          return ColorManager.textColor(gaugeColorTp2);
        case 'time':
          return ColorManager.ctGaugeColor2();
        default:
          return ColorManager.normalColor();
      }
    }

    /**
     * バトラーとステータスタイプを設定し、表示値を初期化する。
     *
     * @param {Game_Battler} battler - バトラーオブジェクト
     * @param {string} statusType - ステータスの種類（'hp', 'mp', 'tp', 'time'など）
     */
    setup(battler, statusType) {
      super.setup(battler, statusType);
      this._displayedValue = this._value; // 表示する値を現在の値で初期化
    }

    /**
     * フレームごとに更新処理を行う。
     */
    update() {
      super.update();
      this.updateDisplayedValue(); // 表示する値を更新
      this.updateCheckAppear(); // 可視状態のチェック
    }

    /**
     * アニメーションで表示されるゲージの値を更新する。
     */
    updateDisplayedValue() {
      const realValue = this._value; // ゲージの実際の値
      if (this._displayedValue !== realValue) {
        const changeSpeed = Math.abs(realValue - this._displayedValue) / 10; // 値の変化速度
        if (this._displayedValue < realValue) {
          this._displayedValue = Math.min(this._displayedValue + changeSpeed, realValue);
        } else {
          this._displayedValue = Math.max(this._displayedValue - changeSpeed, realValue);
        }
        this.redraw(); // 値が変わったら再描画
      }
    }

    /**
     * バトラーが死んでいるかをチェックし、可視状態を更新する。
     */
    updateCheckAppear() {
      this.visible = !this._battler.isDead(); // バトラーが死んでいる場合は非表示
    }

    /**
     * ゲージの数値を描画する。
     */
    drawValue() {
      const currentValue = Math.floor(this._displayedValue); // 表示用の値を使用
      const width = this.bitmapWidth();
      const height = this.textHeight();
      this.setupValueFont();
      this.bitmap.drawText(currentValue, 0, 0, width, height, 'right'); // 右揃えで描画
    }

    /**
     * 数値部分のフォント設定を行う。
     */
    setupValueFont() {
      this.bitmap.fontFace = this.valueFontFace();
      this.bitmap.fontBold = false;
      this.bitmap.fontSize = this.valueFontSize();
      this.bitmap.textColor = this.valueColor();
      this.bitmap.outlineColor = this.valueOutlineColor();
      this.bitmap.outlineWidth = this.valueOutlineWidth();
    }
  }

  // ----------------------------------------------------------------------------
  // スキル表示するための処理
  // ----------------------------------------------------------------------------

  const bubbleWidth = 200;
  const bubbleHeight = 30;

  /**
   * スキル名やターゲット名を表示するチャットバブルを生成する。
   * Sprite_Battler クラスに追加するメソッド。
   */
  Sprite_Battler.prototype.createChatBubble = function () {
    if (!this._chatBubbleSprite) {
      this._chatBubbleSprite = new Sprite();
      this._chatBubbleSprite.bitmap = new Bitmap(bubbleWidth, bubbleHeight); // チャットバブル用のビットマップ
      this._chatBubbleSprite.bitmap.fontSize = 18; // フォントサイズを設定
      this._chatBubbleSprite.anchor.x = 0;
      this._chatBubbleSprite.anchor.y = 0;
      this._chatBubbleSprite.x = this.x + -bubbleWidth / 2; // バトラーの頭の上に表示

      /**
       * @remarks トリアコンタン様BattlerGraphicExtend.jsでバトラーの拡大率が設定されている場合を考慮
       */
      // 高さのスケールを取得（デフォルト値は1.0）
      const scaleY =
        typeof this._battler.getScaleY === 'function' ? this._battler.getScaleY() : 1.0;
      this._chatBubbleSprite.y = this.y - bubbleHeight - this.height * scaleY; // 高さスケールに基づく調整

      SceneManager._scene._spriteset.addChild(this._chatBubbleSprite); // シーンに追加
    }
  };

  /**
   * チャットバブルに表示するテキストとアクション情報を設定する。
   *
   * @param {string} text - チャットバブルに表示するテキスト
   * @param {Game_Action} action - 実行するアクション（スキルや攻撃）
   */
  Sprite_Battler.prototype.setChatBubbleText = function (text, action) {
    this.createChatBubble(); // チャットバブルを作成（未作成の場合）
    this._chatBubbleSprite.bitmap.clear(); // 前のテキストをクリア

    // フキダシのサイズと位置設定
    const width = bubbleWidth;
    const height = bubbleHeight;
    const x = 0;
    const y = 0;

    // ビットマップのコンテキストを取得してカスタム描画
    const ctx = this._chatBubbleSprite.bitmap.context;
    drawHexBackground({ ctx, x, y, width, height }); // 六角形の背景を描画

    /**
     * 使用者の種別やアクションに応じたテキスト色を返す関数。
     *
     * @param {Game_Battler} battler - スキルや攻撃を行うバトラー
     * @param {Game_Action} action - 実行されるアクション
     * @returns {string} テキストカラー
     */
    const getTextColor = (battler, action) => {
      if (battler.isEnemy()) {
        return ColorManager.textColor(skillDisplayFontColorByEnemy); // 敵キャラクターの場合の色
      }
      if (action.isAttack()) {
        return ColorManager.textColor(skillDisplayFontColorForAttack); // 通常攻撃の場合の色
      }
      if (action.isForFriend()) {
        return ColorManager.textColor(skillDisplayFontColorForFriend); // 味方に使用する場合の色
      }
      return ColorManager.textColor(skillDisplayFontColorForEnemy); // その他の場合の色
    };

    // テキストの描画設定
    this._chatBubbleSprite.bitmap.fontSize = skillDisplayFontSize;
    this._chatBubbleSprite.bitmap.fontBold = true;
    this._chatBubbleSprite.bitmap.textColor = getTextColor(this._battler, action); // テキストの色を設定
    this._chatBubbleSprite.bitmap.outlineColor = '#000000'; // アウトライン色
    this._chatBubbleSprite.bitmap.outlineWidth = 3; // アウトラインの太さ
    this._chatBubbleSprite.bitmap.drawText(text, x + 5, y, width - 5, height, 'center'); // テキストを描画

    // ビットマップの更新を手動で実行
    this._chatBubbleSprite.bitmap._baseTexture.update(); // ビットマップを更新
  };

  /**
   * チャットバブルをクリアして非表示にする。
   */
  Sprite_Battler.prototype.clearChatBubble = function () {
    if (this._chatBubbleSprite) {
      this._chatBubbleSprite.bitmap.clear(); // チャットバブルの内容をクリア
    }
  };

  // ---------------------------------------------------------------------
  // Scene_Battle の拡張
  // ---------------------------------------------------------------------
  /**
   * バトルログウィンドウの矩形（位置とサイズ）を定義。
   *
   * @returns {Rectangle} バトルログウィンドウの矩形
   */
  const _Scene_Battle_prototype_logWindowRect = Scene_Battle.prototype.logWindowRect;
  Scene_Battle.prototype.logWindowRect = function () {
    if (!showSkillNameExtend) {
      return _Scene_Battle_prototype_logWindowRect.call(this);
    }
    const wx = 0;
    const wy = 0;
    const ww = (Graphics.width / 3) * 2;
    const wh = 120;
    return new Rectangle(wx, wy, ww, wh);
  };

  // 元の update メソッドをフックしてカスタム処理を追加
  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    this.updateQueue(); // アニメーションキューの更新
    this._spriteset.updateThrowObjects(); // キューを使った投擲オブジェクトの更新処理
  };

  // アニメーションとダメージフラッシュのためのキュー
  const animationsQueue = [];
  const flashActionsQueue = [];

  const applyDamage = (subject, target, action) => {
    const logWindow = BattleManager._logWindow;
    action.apply(target); // ダメージ適用
    const damageRate = action.calcDamageRate(target);
    logWindow.displayActionResults(subject, target); // アクション結果を表示
    // ターゲットと使用者にダメージポップアップを表示
    target.pushDamagePop({ ...target._result, damageRate });
    target.clearResult();
    if (target !== subject) {
      subject.pushDamagePop({ ...subject._result });
      subject.clearResult();
    }
  };

  /**
   * アニメーションやアクションのキューを処理し、バトル中に適用。
   */
  Scene_Battle.prototype.updateQueue = function () {
    // アニメーションキューを処理
    const animations = animationsQueue.shift();
    if (animations) {
      for (const animation of animations) {
        const { targets, animationId, mirror } = animation;
        $gameTemp.requestAnimation(targets, animationId, mirror);
      }
    }

    // フラッシュアクションキューを処理
    const flashActions = flashActionsQueue.shift();

    if (flashActions) {
      for (const flashAction of flashActions) {
        if (flashAction) {
          const { action, subject, target } = flashAction;
          applyDamage(subject, target, action);
        }
      }
    }
  };

  // ---------------------------------------------------------------------
  // Game_Action の拡張
  // ---------------------------------------------------------------------
  /**
   * 対象に対するダメージレートを計算する。
   *
   * @param {Game_Battler} target - ダメージを受ける対象
   * @returns {number} ダメージレート（属性効果を考慮）
   */
  Game_Action.prototype.calcDamageRate = function (target) {
    const damageRate = this.calcElementRate(target); // 属性効果を考慮したダメージレートを計算
    return damageRate;
  };

  /**
   * フラッシュタイミングに基づいてアニメーションとダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - ダメージを与える主体
   * @param {Game_Battler} target - ダメージを受ける対象
   * @param {number} animationId - 再生するアニメーションのID
   * @param {number} [delay=0] - アニメーションの遅延フレーム数（オプション）
   */
  Game_Action.prototype.scheduleDamageWithAnimation = function (
    subject,
    target,
    animationId,
    delay = 0
  ) {
    /**
     * キューにエントリを追加するヘルパー関数。
     *
     * @param {Object} params - キューとエントリ情報
     * @param {Array} params.queue - スケジュールされるアクションのキュー
     * @param {number} params.frame - 実行されるフレーム
     * @param {Object} params.entry - キューに追加されるエントリ（アクションやアニメーション情報）
     */
    const pushEntryToQueue = ({ queue, frame, entry }) => {
      if (queue[frame]) {
        queue[frame].push(entry);
      } else {
        queue[frame] = [entry];
      }
    };

    const animation = $dataAnimations[animationId]; // アニメーションデータを取得

    // アニメーションが存在しない場合
    if (!animation) {
      const frame = 1 + delay;
      pushEntryToQueue({
        queue: flashActionsQueue, // フラッシュアクションキューにエントリを追加
        frame,
        entry: { action: JsonEx.makeDeepCopy(this), subject, target }, // アクションをディープコピー
      });
      return;
    }

    const flashTimings = animation.flashTimings; // フラッシュタイミングを取得
    if (flashTimings.length === 0) {
      const frame = 1 + delay;
      pushEntryToQueue({
        queue: flashActionsQueue, // フラッシュタイミングがない場合でもアクションを適用
        frame,
        entry: { action: JsonEx.makeDeepCopy(this), subject, target },
      });
      return;
    }

    const mirror = !subject.isActor();

    // アニメーションの表示をスケジュール
    pushEntryToQueue({
      queue: animationsQueue, // アニメーションキューにエントリを追加
      frame: delay, // 遅延フレーム数
      entry: { targets: [target], animationId, mirror },
    });

    // フラッシュタイミングに基づいてダメージをスケジュール
    flashTimings.forEach((flashTiming) => {
      const frame = flashTiming.frame + delay;
      pushEntryToQueue({
        queue: flashActionsQueue, // フラッシュアクションキューにエントリを追加
        frame,
        entry: { action: JsonEx.makeDeepCopy(this), subject, target },
      });
    });
  };

  // ---------------------------------------------------------------------
  // BattleManager の拡張
  // ---------------------------------------------------------------------
  const _BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function () {
    _BattleManager_startBattle.call(this);
    this._assignedEventId = 0;
  };

  /**
   * 対象のアクションに基づいて使用するアニメーションIDを取得する。
   *
   * @param {Game_Battler} subject - アクションを行うキャラクター
   * @param {Game_Action} action - 実行するアクション
   * @param {number} [attackAnimationId=1] - 通常攻撃のアニメーションID（1または2）
   * @returns {number} アニメーションID
   */
  const getAnimationId = (subject, action, attackAnimationId = 1) => {
    const NORMAL_ATTACK_ANIMATION = -1;
    const NO_ANIMATION = 0;

    const gameItem = action._item;
    const itemId = gameItem.itemId();
    const dataItem = gameItem.isSkill() ? $dataSkills[itemId] : $dataItems[itemId];

    // アニメーションが設定されていない場合
    if (dataItem.animationId === NO_ANIMATION) {
      return NO_ANIMATION;
    }

    // 通常攻撃アニメーションを使用する場合
    if (dataItem.animationId === NORMAL_ATTACK_ANIMATION) {
      if (subject.isActor()) {
        if (attackAnimationId === 1) {
          return subject.attackAnimationId1();
        }
        if (attackAnimationId === 2) {
          return subject.attackAnimationId2();
        }
      }
      return NORMAL_ATTACK_ANIMATION;
    }

    // データに基づくアニメーションIDを返す
    return dataItem.animationId;
  };

  /**
   * アクションの更新を行い、全てのターゲットに対してアクションを適用する。
   * すべてのターゲットにアクションが適用されたらアクションを終了する。
   */
  BattleManager.updateAction = function () {
    if (this._targets.length > 0) {
      for (const target of this._targets) {
        this.invokeAction(this._subject, target);
      }
      this._targets = [];
      return;
    }
    this.endAction();
  };

  /**
   * 通常攻撃のアクションを実行し、アニメーションやダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - アクションを行うキャラクター
   * @param {Game_Battler} target - アクションの対象キャラクター
   */
  BattleManager.invokeNormalAction = function (subject, target) {
    const realTarget = this.applySubstitute(target);

    // ガードの時はガードを適用して抜ける
    if (this._action.isGuard()) {
      this._action.apply(realTarget);
      return;
    }

    // 二刀流のアニメーションとダメージスケジュール
    if (subject.isActor() && this._action.isAttack() && subject.attackAnimationId2()) {
      const weapon1Subject = JsonEx.makeDeepCopy(subject);
      weapon1Subject.forceChangeEquip(1, subject.equips()[1]);
      const animationId1 = getAnimationId(weapon1Subject, this._action, 1);
      this._action.scheduleDamageWithAnimation(weapon1Subject, realTarget, animationId1);

      const weapon2Subject = JsonEx.makeDeepCopy(subject);
      weapon2Subject.forceChangeEquip(0, subject.equips()[0]);
      const animationId2 = getAnimationId(weapon2Subject, this._action, 2);
      subject.performAction(this._action);
      const delay = 20;
      this._action.scheduleDamageWithAnimation(weapon2Subject, realTarget, animationId2, delay);
      return;
    }

    const animationId = getAnimationId(subject, this._action);
    if (animationId) {
      this._action.scheduleDamageWithAnimation(subject, realTarget, animationId);
    }
  };

  /**
   * カウンター攻撃を実行し、アニメーションやダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - 攻撃を受けたキャラクター
   * @param {Game_Battler} target - カウンター攻撃を行うキャラクター
   */
  BattleManager.invokeCounterAttack = function (subject, target) {
    const action = new Game_Action(target);
    action.setAttack();
    target.pushDamagePop('COUNTER!');
    target._movementDuration = 20;

    this._logWindow.push('performEvasion', target);
    this._logWindow.push('waitForMovement');
    this._logWindow.push('performAction', target, action);

    const animationId = getAnimationId(target, action);
    const delay = this._movementDuration;
    action.scheduleDamageWithAnimation(target, subject, animationId, delay);

    this._logWindow.displayCounter(target);
    this._logWindow.displayActionResults(target, subject);
  };

  /**
   * 魔法反射を実行し、アニメーションやダメージをスケジュールする。
   *
   * @param {Game_Battler} subject - 攻撃を行ったキャラクター
   * @param {Game_Battler} target - 魔法を反射するキャラクター
   */
  BattleManager.invokeMagicReflection = function (subject, target) {
    this._action._reflectionTarget = target;
    this._logWindow.displayReflection(target);
    target.pushDamagePop('REFLECT!');

    const mirror = !subject.isActor();
    $gameTemp.requestAnimation([target], reflectAnimation, mirror);

    const animationId = getAnimationId(subject, this._action);
    const delay = 50;
    this._action.scheduleDamageWithAnimation(target, subject, animationId, delay);
    this._logWindow.displayActionResults(target, subject);
  };

  // ---------------------------------------------------------------------
  // 投擲オブジェクトのための処理
  // ---------------------------------------------------------------------

  /**
   * Sprite_ThrowObject クラス
   *
   * 投擲オブジェクトを管理するためのスプライトクラスです。
   * このクラスは、バトルシーンで投げられたオブジェクト（武器やアイテムなど）を表現し、
   * ジャンプやテレポート、浮遊などの特殊な動きをサポートします。
   *
   * @extends Sprite_Battler
   */
  class Sprite_ThrowObject extends Sprite_Battler {
    /**
     * コンストラクタ
     *
     * @param {Object} event - イベントオブジェクト
     * @param {Game_Battler} subject - 投擲したバトラーオブジェクト
     */
    constructor(event, subject) {
      super();
      this.initMembers();
      this.setEvent(event);
      this._subject = subject;
      this._uniqueId = event._uniqueId;
      const subjectSprite = findSprite(subject);
      this.x = subjectSprite.x;
      this.y = subjectSprite.y;
    }

    /**
     * メンバ変数の初期化
     */
    initMembers() {
      super.initMembers();
      this.anchor.x = 0.5;
      this.anchor.y = 1;
      this._event = null;
      this._characterName = '';
      this._characterIndex = 0;
    }

    /**
     * イベントオブジェクトをセットし、ビットマップを更新
     *
     * @param {Object} event - イベントオブジェクト
     */
    setEvent(event) {
      this._event = event;
      this.updateBitmap();
    }

    /**
     * スプライトがアクターかどうかを返します
     *
     * @returns {boolean} - アクターなら true、そうでなければ false
     */
    isActor() {
      return this._subject.isActor();
    }

    /**
     * スプライトが敵かどうかを返します
     *
     * @returns {boolean} - 敵なら true、そうでなければ false
     */
    isEnemy() {
      return this._subject.isEnemy();
    }

    /**
     * 更新処理
     */
    update() {
      this.updateBitmap();
      this.updateFrame();
      if (this._jumpDuration > 0) {
        this.updateJump();
      }
      if (this._teleportDuration > 0) {
        this.updateTeleport();
      }
      if (this._floatDuration > 0) {
        this.updateFloat();
      }
      if (this._fallDuration > 0) {
        this.updateFall();
      }
    }

    /**
     * ビットマップの更新
     */
    updateBitmap() {
      const characterName = this._event.characterName();
      const characterIndex = this._event.characterIndex();
      if (this._characterName !== characterName || this._characterIndex !== characterIndex) {
        this._characterName = characterName;
        this._characterIndex = characterIndex;
        this.setCharacterBitmap();
      }
    }

    /**
     * キャラクターのビットマップを設定
     */
    setCharacterBitmap() {
      this.bitmap = ImageManager.loadCharacter(this._characterName);
    }

    /**
     * フレームの更新
     */
    updateFrame() {
      const pw = this.patternWidth();
      const ph = this.patternHeight();
      const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
      const sy = (this.characterBlockY() + this.characterPatternY()) * ph;
      this.setFrame(sx, sy, pw, ph);
    }

    /**
     * キャラクターのパターン幅を計算
     *
     * @returns {number} - パターンの幅
     */
    patternWidth() {
      return this._isBigCharacter() ? this.bitmap.width / 3 : this.bitmap.width / 12;
    }

    /**
     * キャラクターのパターン高さを計算
     *
     * @returns {number} - パターンの高さ
     */
    patternHeight() {
      return this._isBigCharacter() ? this.bitmap.height / 4 : this.bitmap.height / 8;
    }

    /**
     * キャラクターブロックX座標を計算
     *
     * @returns {number} - X座標
     */
    characterBlockX() {
      return this._isBigCharacter() ? 0 : (this._event.characterIndex() % 4) * 3;
    }

    /**
     * キャラクターブロックY座標を計算
     *
     * @returns {number} - Y座標
     */
    characterBlockY() {
      return this._isBigCharacter() ? 0 : Math.floor(this._event.characterIndex() / 4) * 4;
    }

    /**
     * キャラクターパターンXを取得
     *
     * @returns {number} - パターンX
     */
    characterPatternX() {
      return this._event.pattern();
    }

    /**
     * キャラクターパターンYを取得
     *
     * @returns {number} - パターンY
     */
    characterPatternY() {
      return (this._event.direction() - 2) / 2;
    }

    /**
     * キャラクターがビッグキャラクターかどうかを判定
     *
     * @returns {boolean} - ビッグキャラクターなら true、そうでなければ false
     */
    _isBigCharacter() {
      return ImageManager.isBigCharacter(this._characterName);
    }

    /**
     * ジャンプの更新処理
     */
    updateJump() {
      if (this._jumpDuration > 0) {
        this._jumpFrame++;
        const progress = this._jumpFrame / this._jumpDuration;
        this.x = this._jumpStartX + (this._jumpTargetX - this._jumpStartX) * progress;
        const jumpY = this._jumpStartY - this._jumpHeight * Math.sin(Math.PI * progress);
        this.y = jumpY + (this._jumpTargetY - this._jumpStartY) * progress;

        if (this._rotationAmount) {
          this.rotation = this._rotationAmount * Math.PI * 2 * progress;
        } else {
          this._prevX = this._prevX || this.x;
          this._prevY = this._prevY || this.y;
          const rad = Math.atan2(this.y - this._prevY, this.x - this._prevX);
          this.rotation = rad + Math.PI / 2;
          this._prevX = this.x;
          this._prevY = this.y;
        }

        if (this._jumpFrame >= this._jumpDuration) {
          this.setHome(this._jumpTargetX, this._jumpTargetY);
          this._jumpDuration = 0;
        }
      }
    }
  }

  const TEMPLATE_EVENT = {
    id: 0,
    name: '',
    note: '',
    pages: [
      {
        conditions: {
          actorId: 1,
          actorValid: false,
          itemId: 1,
          itemValid: false,
          selfSwitchCh: 'A',
          selfSwitchValid: false,
          switch1Id: 1,
          switch1Valid: false,
          switch2Id: 1,
          switch2Valid: false,
          variableId: 1,
          variableValid: false,
          variableValue: 0,
        },
        directionFix: false,
        image: { tileId: 0, characterName: '', direction: 2, pattern: 1, characterIndex: 3 },
        list: [{ code: 0, indent: 0, parameters: [] }],
        moveFrequency: 3,
        moveRoute: {
          list: [{ code: 0, parameters: [] }],
          repeat: true,
          skippable: false,
          wait: false,
        },
        moveSpeed: 3,
        moveType: 0,
        priorityType: 0,
        stepAnime: false,
        through: false,
        trigger: 0,
        walkAnime: true,
      },
    ],
    x: 0,
    y: 0,
  };

  class Game_ThrowObject extends Game_Event {
    /**
     * コンストラクタ
     *
     * @param {number} eventId - 投擲オブジェクトのイベントID
     * @param {number} uniqueId - ユニークID
     * @param {Game_Battler} subject - 投擲したキャラクター
     */
    constructor(eventId, uniqueId, subject) {
      super(actionMapId, eventId); // actionMapId は事前に定義されたアクションマップID
      this._uniqueId = uniqueId;
      this._subject = subject;
    }

    /**
     * イベントデータを取得
     *
     * @returns {Object} イベントデータ
     */
    event() {
      if (!dataMapActionExists) return TEMPLATE_EVENT;
      return $dataMapAction.events[this._eventId]; // $dataMapAction はアクションマップのデータ
    }

    /**
     * 草むら判定（投擲オブジェクトは草むらに影響しない）
     *
     * @returns {boolean} 常に false
     */
    isOnBush() {
      return false;
    }

    /**
     * 横方向のスクロール補正
     *
     * @returns {number} 実際のX座標
     */
    scrolledX() {
      return this._realX;
    }

    /**
     * 縦方向のスクロール補正
     *
     * @returns {number} 実際のY座標
     */
    scrolledY() {
      return this._realY;
    }

    /**
     * キャラクターがアクターかどうかを判定
     *
     * @returns {boolean} アクターなら true、そうでなければ false
     */
    isActor() {
      return this._subject.isActor();
    }

    /**
     * キャラクターが敵かどうかを判定
     *
     * @returns {boolean} 敵なら true、そうでなければ false
     */
    isEnemy() {
      return this._subject.isEnemy();
    }
  }

  // 投擲オブジェクトを追加するメソッド
  Spriteset_Battle.prototype.addThrowObject = function (event, subject) {
    const spriteObject = new Sprite_ThrowObject(event, subject);
    this._throwObjectLayer.addChild(spriteObject);
    this._throwObjects.push(spriteObject);
  };

  // 投擲オブジェクトを削除するメソッド
  Spriteset_Battle.prototype.removeThrowObject = function (throwObject) {
    const spriteObject = findSprite(throwObject);
    this._throwObjectLayer.removeChild(spriteObject);
    this._throwObjects.remove(spriteObject);
  };

  // 投擲オブジェクトのキューを処理するメソッド
  Spriteset_Battle.prototype.updateThrowObjects = function () {
    // レイヤーの中の投擲オブジェクトを更新する
    for (const child of this._throwObjectLayer.children) {
      child.update();
    }
  };

  // ---------------------------------------------------------------------
  // フォント設定
  // ---------------------------------------------------------------------
  // フォントの読み込み処理をオーバーライド
  const _Scene_Boot_prototype_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
  /**
   * ゲームフォントの読み込みを行う関数
   * プラグインで指定したフォントファイルがある場合、それも読み込みます。
   */
  Scene_Boot.prototype.loadGameFonts = function () {
    _Scene_Boot_prototype_loadGameFonts.call(this);
    if (fontFile) {
      FontManager.load('rmmz-damagePopFont', fontFile);
    }
  };

  /**
   * 使用するフォント名を取得する関数
   * @returns {string} フォント名
   */
  Game_System.prototype.damagePopFontFace = function () {
    return 'rmmz-damagePopFont, ' + $dataSystem.advanced.fallbackFonts;
  };

  // ---------------------------------------------------------------------
  // バグフィックス
  // ---------------------------------------------------------------------
  /**
   * 敵画像の拡大縮小時に上部に線が出てしまうのを回避する
   * @see https://forum.tkool.jp/index.php?threads/%E3%80%90%E8%A7%A3%E6%B1%BA%E3%80%91%E5%8A%A9%E8%A8%80%E9%A1%98%E3%81%84%EF%BC%9A%E3%83%90%E3%83%88%E3%83%A9%E3%83%BC%E8%A1%A8%E7%A4%BA%E6%8B%A1%E5%BC%B5%E3%81%AE%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E3%82%92%E4%BF%AE%E6%AD%A3%E3%81%97%E3%81%9F%E3%81%84.4504/#post-26371
   */
  const _Sprite_Enemy_initialize = Sprite_Enemy.prototype.initialize;
  Sprite_Enemy.prototype.initialize = function (battler) {
    _Sprite_Enemy_initialize.call(this, battler);
    this._stateIconSprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  };

  // ---------------------------------------------------------------------
  // Game_Battler個別設定
  // ---------------------------------------------------------------------
  Game_Battler.prototype.isSvBattleExMeta = function (_meta) {
    return '';
  };

  // ---------------------------------------------------------------------
  // Game_Enemy個別設定
  // ---------------------------------------------------------------------
  Game_Enemy.prototype.isSvBattleExMeta = function (meta) {
    return this.enemy().meta[meta] || '';
  };

  // ---------------------------------------------------------------------
  // Game_Actor個別設定
  // ---------------------------------------------------------------------
  Game_Actor.prototype.isSvBattleExMeta = function (meta) {
    return this.actor().meta[meta] || '';
  };

  // ---------------------------------------------------------------------
  // Game_Item個別設定
  // ---------------------------------------------------------------------
  Game_Item.prototype.isSvBattleExMeta = function (meta) {
    return this.object().meta[meta] || '';
  };

  Game_Item.prototype.getSvBattleExMetaAction = function () {
    return this.object().meta[NOTE.ACTION] || '';
  };

  // ---------------------------------------------------------------------
  // スイッチが変わった時にActionEventManagerのキャッシュもクリアする
  // ---------------------------------------------------------------------
  const _Game_Switches_prototype_onChange = Game_Switches.prototype.onChange;
  Game_Switches.prototype.onChange = function () {
    _Game_Switches_prototype_onChange.call(this);
    actionEventManager.clearCache();
  };

  // ---------------------------------------------------------------------
  // 変数が変わった時にActionEventManagerのキャッシュもクリアする
  // ---------------------------------------------------------------------
  const _Game_Variables_prototype_onChange = Game_Variables.prototype.onChange;
  Game_Variables.prototype.onChange = function () {
    _Game_Variables_prototype_onChange.call(this);
    actionEventManager.clearCache();
  };
})();
