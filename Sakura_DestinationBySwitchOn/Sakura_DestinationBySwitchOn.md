# Sakura_DestinationBySwitchOn
### スイッチオンで次の目的表示
### 子目的も表示できる `ver.2.0`

![alt text](image-19.png)

### 目的表示シーンを表示できる `ver.2.0`

![alt text](image-18.png)

### ゲーム内で撮ったスクリーンショットを目的表示シーンの背景画像にできる `ver.2.0`

![alt text](image-40.png)

## ダウンロード
[Sakura_DestinationBySwitchOn.js](https://raw.githubusercontent.com/Sakurano6130/SakuraPlugins/main/Sakura_DestinationBySwitchOn/Sakura_DestinationBySwitchOn.js)


## 更新履歴
| ver   | 日付       | 説明                                                                                                 |
| ----- | ---------- | ---------------------------------------------------------------------------------------------------- |
| 2.0.0 | 2024/09/17 | 子目的表示の追加<br>目的表示シーンの追加                                                             |
| 1.0.3 | 2024/09/09 | ツクールのシステム設定で、画面の幅・高さとUIエリアの幅・高さが異なる設定をしている場合の位置を調整。 |
| 1.0.2 | 2024/09/04 | ファイル出力判定ミス修正                                                                             |
| 1.0.1 | 2024/09/03 | 初期表示時に後ろのウィンドウを隠さないように修正                                                     |
| 1.0.0 | 2024/09/03 | 公開                                                                                                 |


## 機能説明

### スイッチの名前が`$`で始まるものが`オン`になったとき、そのスイッチの名前を自動的に次の目的として表示します。
  ![alt text](image-1.png)

### スイッチの名前が `@親=親のスイッチ` で始まるものをスイッチに登録しておくと、そのスイッチが自動的に子目的になって表示されます。`ver.2.0`
  
  ![alt text](image-8.png)

  ![alt text](image-20.png)

  ![alt text](image-9.png)

  子目的のスイッチがオンになると、自動でチェックがついて進捗が上がります。

  ![alt text](image-10.png)


###  ここまでの機能でよければ、ここまでで大丈夫です。以下は、目的表示シーンを表示する機能の説明です。

---

### **コモンイベント** で プラグインコマンド**「目的登録」** をしておくと、目的表示シーンで目的の一覧を表示することができます。`ver.2.0`
  
  - コモンイベントのどこにおいても大丈夫ですが、目的表示シーンで表示される順番はコモンイベントに置いた順になります。
  - ゲーム起動時に自動的にコモンイベントの中を検索して読み込むので、このイベントを実行する必要はありません。トリガーは「なし」でよいです。
  - １つのコモンイベントの中に書いても良いし、別々のコモンイベントに分けて書いても良いです。

    ![alt text](image-22.png)
    
    ![alt text](image-12.png)

    ![alt text](image-13.png)

    ![alt text](image-14.png)

    ![alt text](image-15.png)

    ![alt text](image-16.png)

    ![alt text](image-17.png)

    上記の通り設定しておくと、以下のようになります。

    ![alt text](image-21.png)


### 目的表示シーンを呼び出す方法`ver.2.0`

2つ方法があります。

### ①プラグインコマンドから呼び出す

  ![alt text](image-25.png)

  ![alt text](image-26.png)

  表示する対象のカテゴリを選べます。

  ![alt text](image-27.png)


### ②プラグインパラメータでメニューコマンドに登録する

  ![alt text](image-28.png)


  「メインストーリー」と「登場人物紹介」、「チュートリアル」などのように、カテゴリ別々にしておけば別のシーンとしてメニューに登録できます。

  ![alt text](image-29.png)

  ![alt text](image-30.png)

  ![alt text](image-31.png)

  ![alt text](image-32.png)

  このスイッチがオンになっていない場合は、非活性となり呼び出すことができません。ストーリーが進むと解放されるメニューコマンドのような演出にご利用ください。

  ![alt text](image-33.png)

## プラグインパラメータ
### 📍 ﾏｯﾌﾟ上の目的表示の設定

- **destinationPosition**
  - 目的を表示する位置です。左上、右上、左下、右下から選べます。

- **destinationTextX**
  - 目的を表示する位置のX軸補正です。

- **destinationTextY**
  - 目的を表示する位置のY軸補正です。

- **destinationFontSize**
  - 目的を表示するフォントサイズです。

- **destinationFontColor** `ver.2.0`
  - 目的のﾌｫﾝﾄ色です。

- **destinationFontColorIfHasChildren** `ver.2.0`
  - 目的のﾌｫﾝﾄ色(子目的がある場合)です。

- **categoryFontSize** `ver.2.0`
  - 目的の上に出るｶﾃｺﾞﾘのﾌｫﾝﾄｻｲｽﾞです。

- **categoryFontColor** `ver.2.0`
  - 目的の上に出るｶﾃｺﾞﾘのﾌｫﾝﾄ色です。

- **childrenFontSize** `ver.2.0`
  - 子目的のﾌｫﾝﾄｻｲｽﾞです。

- **childrenFontColor** `ver.2.0`
  - 子目的のﾌｫﾝﾄ色です。

- **childrenFontColorIfCompleted** `ver.2.0`
  - 子目的のﾌｫﾝﾄ色(達成している場合)です。

- **storyProgressText**
  - 目的が変わった時に差し込む言葉です。指定しなかった場合は表示されません。
   
  ![alt text](image-6.png)

- **storyProgressTextColor**
  - 目的が変わった時に差し込む言葉の色です。

---

### ⚙️ 目的表示シーンの設定 `ver.2.0`

- **paddingInSceneDestination** `ver.2.0`
  - シーン全体の画面との余白です。

- **listWindowWidthRate** `ver.2.0`
  - 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳ幅の画面に対する大きさ（％）です。

- **listWindowItemHeight** `ver.2.0`
  - 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳの１行の高さです。

- **listWindowFontSize** `ver.2.0`
  - 左側のｶﾃｺﾞﾘｳｨﾝﾄﾞｳのﾌｫﾝﾄｻｲｽﾞです。

- **detailWindowTitleFontSize** `ver.2.0`
  - 右側の詳細ｳｨﾝﾄﾞｳのﾀｲﾄﾙのﾌｫﾝﾄｻｲｽﾞです。

- **detailWindowPadding** `ver.2.0`
  - 右側の詳細ｳｨﾝﾄﾞｳの内側の余白です。

- **detailWindowPictureWidth** `ver.2.0`
  - 右側の詳細ｳｨﾝﾄﾞｳのピクチャの幅です。

- **detailWindowPictureHeight** `ver.2.0`
  - 右側の詳細ｳｨﾝﾄﾞｳのピクチャの高さです。

- **detailWindowMaxContentsHeight** `ver.2.0`
  - 右側の詳細ｳｨﾝﾄﾞｳの文章の最大高さ(px)（高くするほど長い文章を表示できますが重くなります）

- **commandWindowTextSetPriority** `ver.2.0`
  - 「この目的を優先表示する」の言葉を変更します

- **commandWindowTextAlreadyCompleted** `ver.2.0`
  - 「この目的は達成済みです」の言葉を変更します

---
### ➕ ﾒﾆｭｰへの追加 `ver.2.0`

  上記、目的表示シーンを呼び出す方法 > ②プラグインパラメータでメニューコマンドに登録する を参照ください。

---
- **needsOutputDestinations**
  - 目的をファイルに書き込むかどうか。これをtrueにして、テストプレイを実行するとプロジェクトフォルダ直下に「destinationsBySwitch.txt」というファイルが出力されます。
  - スイッチの親子関係を表にしたテキストファイルを出力します。`ver.2.0`
  
  ![alt text](image-3.png)

  ![alt text](image-34.png)


## プラグインコマンドの使用

プラグインコマンドから、以下を使用できます。

![alt text](image-35.png)

![alt text](image-36.png)

![alt text](image-37.png)


### スクリーンショット機能

ゲーム内のスクリーンショットを撮って、目的表示画面のピクチャに設定することができます。このコマンドを実行すると元々のピクチャ表示設定ではなく、スクリーンショットの方が表示されるようになります。便利機能ですがその分、セーブデータの容量が大きくなるため、セーブデータの容量が大きくなっても問題ない作品のみでご使用ください。

![alt text](image-39.png)

# License
- This software is released under the MIT license. http://opensource.org/licenses/mit-license.php
