# Sakura_SvBattleExtend
ｻｲﾄﾞﾋﾞｭｰﾊﾞﾄﾙいい感じプラグイン

![alt text](image.png)

[!['ｻｲﾄﾞﾋﾞｭｰﾊﾞﾄﾙいい感じプラグイン']('image.png')]('https://youtu.be/2dQbGTHGkeg')

## ダウンロード
[Sakura_SvBattleExtend.js](https://raw.githubusercontent.com/Sakurano6130/SakuraPlugins/main/Sakura_SvBattleExtend/Sakura_SvBattleExtend.js)

## 更新履歴
| ver   | 日付       | 説明                                                                                                                                                                                                           |
| ----- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0 | 2024/10/06 | 公開                                                                                                                                                                                                           |
| 0.6.0 | 2024/09/30 | 敵画像の上に線が出ていた不具合の対応<br>スキル表示のフキダシをオンオフにできるように<br>オフにするとツクールMZデフォルトのバトルログのレイアウトになる<br>これにより他のプラグインの挙動を邪魔しないようにする |
| 0.5.0 | 2024/09/29 | β版公開                                                                                                                                                                                                        |


## 機能概要
### ダメージ判定とダメージポップをMZアニメーションのフラッシュのタイミングに合わせて行う（これにより多段ヒットするダメージの表現ができる）

![alt text](image-12.png)

![alt text](image-13.png)

- フラッシュのタイミングで複数回ダメージ判定が入るようになるため、ゲームバランスにご注意を。
- 1回しかダメージさせたくないときは、フラッシュが1回だけになるように、アニメーションを直してください。
- MVアニメーションには非対応（1回だけダメージします）。もしご要望あれば考えます。

### アクターが待機時に武器を構えるようになる

  ![alt text](image-8.png)

### アクターやエネミーが行動時に相手の前に移動するようになる。

![alt text](image-9.png)

### 使用するスキルと相手が表示されるようになる。

![alt text](image-11.png)

### スキルごとに個別にアクションを指定することができる。アクションは自由に編集、作成することができる。

![alt text](image-14.png)


## 関連プラグイン

```mermaid
graph TD;
    style A fill:#FFCCFF,stroke:#FF99CC,stroke-width:2px;
    style B fill:#FFEEFF,stroke:#FF99CC,stroke-width:2px;
    style C fill:#FFEEFF,stroke:#FF99CC,stroke-width:2px;
    
    A[Sakura_SvBattleExtend.js<br>💥 SVバトルいい感じプラグイン] --> B[Sakura_ShowComboDamage.js<br>✨ コンボダメージ表示プラグイン];
    A[Sakura_SvBattleExtend.js<br>💥 SVバトルいい感じプラグイン] --> C[Sakura_EnemyHud.js<br>❤️ 敵ステータス表示プラグイン];
    
    A:::highlight;
    B:::normal;
    C:::normal;
    
    classDef highlight fill:#FFCCFF,stroke:#FF99CC,stroke-width:3px,font-size:16px,color:#993366;
    classDef normal fill:#FFEEFF,stroke:#FF99CC,stroke-width:2px,font-size:14px,color:#993366;

```


## プラグインパラメータ
🚧執筆中





### スキル表示は全体的にオンオフ指定ができる。オフにするとRPGツクールMZデフォルトの表示になる（これにより他プラグインをお使いで邪魔されたくない場合に対応できます） `ver0.6`
![alt text](image-4.png)

#### 参考
  この設定をオフにして、別プラグイン `MNKR_SimpleMsgSideViewMZ.js` を使うと、シンプルなスキル名表示だけになり戦闘のテンポがよくなっていい感じなのでご紹介します。

  > MNKR_SimpleMsgSideViewMZ.js
  > 
  > author 神無月サスケさま　munokuraさま 改変 Copyright (c) 2021 Munokura Ver.0.0.4 MIT license

  ![alt text](image-5.png)

  [https://github.com/munokura/MNKR-MZ-plugins/blob/master/MNKR_SimpleMsgSideViewMZ.js](https://github.com/munokura/MNKR-MZ-plugins/blob/master/MNKR_SimpleMsgSideViewMZ.js)

  `Sakura_SvBattleExtend` より、`MNKR_SimpleMsgSideViewMZ` を下に配置してください。

## β版
- このプラグインは、β版です。今後破壊的変更のある可能性があります。
- 不具合や他プラグインとの競合解決のご相談がありましたら、[https://x.com/minnon6130](https://x.com/minnon6130) まで、リプライかDMお願いします。

# License
- This software is released under the MIT license. http://opensource.org/licenses/mit-license.php
