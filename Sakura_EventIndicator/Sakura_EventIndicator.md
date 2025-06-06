# Sakura_EventIndicator
イベントに色々なインジケータを表示します。

![alt text](image.png)

## ダウンロード
[Sakura_EventIndicator.js](https://raw.githubusercontent.com/Sakurano6130/SakuraPlugins/main/Sakura_EventIndicator/Sakura_EventIndicator.js)

## 更新履歴
| ver   | 日付       | 説明                                                     |
| ----- | ---------- | -------------------------------------------------------- |
| 2.0.0 | 2024/01/08 | ブラウザ版デプロイに対応するため、移動先の表示仕様を変更 |
| 1.0.0 | 2024/09/11 | 公開                                                     |

## ver.2.0の変更点
ブラウザデプロイしたゲームがエラーとなってしまうことを防ぐため、`\移動先`の表示仕様を変更しました。

＜変更前＞

  - 移動先のマップの「表示名」を表示

＜変更後＞

  - 移動先のマップの「名前」を表示

機能としてはダウングレードすることとなり、申し訳ございません。

## 機能概要

イベントのメモ欄に以下を書くと色々な表示を追加できる。
- カッコ`（` `）`で囲むと、フキダシ表示
- カギカッコ`「` `」`で囲むと、下向き▼表示
- 色名を書くと、色が変えられる
- アイコン`番号`と書くと、その番号のアイコンを表示できる
- 線の描画と接触範囲拡張ができる

## 機能詳細

### カッコ`（` `）`で囲むと、フキダシ表示

メモ欄記述例）

```
（ｶｯｺで囲むとﾌｷﾀﾞｼに）
```

![alt text](image-1.png)

![alt text](image-2.png)

- カッコは全角でも半角でも大丈夫。ただしカッコはじめと終わりは全角同士、半角同士じゃないとだめです。
- フキダシは、プレイヤーと近づいた時だけ表示されます（デフォルト5マス）
- `|`がある場合は、改行します。

---

### カギカッコ`「` `」`で囲むと、下向き▼表示

メモ欄記述例）
```
「ｶｷﾞｶｯｺで囲むと下向き▼」
```

![alt text](image-3.png)

![alt text](image-4.png)

- `|`がある場合は、改行します。


### 色名を書くと、色が変えられる

使える色は、`赤`、`青`、`緑`、`ピンク`、`紫`、`黄`、`オレンジ`

メモ欄記述例）
```
赤（任意の文字）
```
```
青「任意の文字」
```


![alt text](image-6.png)

---
### アイコン`番号`と書くと、その番号のアイコンを表示できる
メモ欄記述例）
```
アイコン96 「ナイトソード|100G」
```
![alt text](image-19.png)

![alt text](image-20.png)

### 線の描画と接触範囲拡張ができる

- `横線`または`縦線`と書くと、線が表示されプレイヤーとの接触範囲が拡張される。
- その後ろに数字を書くと、その長さの分、線が伸びる。数字を書かないと画面いっぱいに伸びる。０だとそのイベントのマスだけ線を引く。数字は全角でも半角でも大丈夫。
- `横`または`縦`のように`線`を書かないと、線が表示されずに、接触範囲だけが拡張される。
- その後ろに`「\移動先」`と書くと、イベントの中の場所移動コマンドを読み取って移動先のマップ名を表示する `ver2.0 変更点 表示名ではなくマップ名に`
  
メモ欄記述例）

```
横線１ 「\移動先」
```
```
縦線０ 赤「\移動先」
```
```
横１
```
```
縦　「任意の文字列」
```


  ![alt text](image-7.png)

  ![alt text](image-24.png)

### 機能は組み合わせできる

  ![alt text](image-22.png)

  ![alt text](image-25.png)

メモ欄記述例）

```
アイコン165 オレンジ　横線１「\移動先」
```

## プラグインパラメータの説明

![alt text](image-21.png)

- **ｲﾝｼﾞｹｰﾀのフォントサイズ** 
  - ｲﾝｼﾞｹｰﾀのフォントサイズを設定します。

- **ｲﾝｼﾞｹｰﾀのX軸位置調整** 
  - ｲﾝｼﾞｹｰﾀのX軸位置調整を設定します。正の値で右、負の値で左です。

- **ｲﾝｼﾞｹｰﾀのY軸位置調整** 
  - ｲﾝｼﾞｹｰﾀのY軸位置調整を設定します。正の値で下、負の値で上です。

- **ﾌｷﾀﾞｼが表示されるﾌﾟﾚｲﾔｰとの距離** 
  - ﾌｷﾀﾞｼが表示されるﾌﾟﾚｲﾔｰとの距離を設定します。


## プラグインコマンドの説明

![alt text](image-12.png)

- **🙈ｲﾝｼﾞｹｰﾀを一時的に隠す** 
  - ｲﾝｼﾞｹｰﾀを一時的に隠します。

- **👀隠したｲﾝｼﾞｹｰﾀを表示** 
  - 隠したｲﾝｼﾞｹｰﾀを表示します。

- **📝ｲﾝｼﾞｹｰﾀの設定** 
  - ｲﾝｼﾞｹｰﾀをメモ欄ではなくイベントの中で設定します。
  - イベントの途中で内容を変えたい場合はこちらを利用ください。
  - 対象のイベントIDに-1を指定すると、プレイヤーにもフキダシを出せます。

    ![alt text](image-17.png)

    ![alt text](image-18.png)

- **🚫このﾍﾟｰｼﾞではｲﾝｼﾞｹｰﾀを表示しない** 
  - このコマンドをイベントリストの **１番最初** 入れておくと、そのページではｲﾝｼﾞｹｰﾀが表示されません。
  - **1番最初に置いた時だけです！！！ご注意を。**

## おまけ関数
  - イベントの条件分岐などで、「このイベントがプレイヤーの近くにいるか？」を確認できる関数が使えるようになります。

    ```javascript
    this.isNearPlayer(5)
    // 5は5マス以内かどうかを表します。この数字は変えられます。
    ```
    ![alt text](image-13.png)


# License
- This software is released under the MIT license. http://opensource.org/licenses/mit-license.php
