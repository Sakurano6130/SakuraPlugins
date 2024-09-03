# Sakura_MapNameExtend
マップ名表示をちょっといいかんじにします✨。

  ![alt text](image-5.png)

## ダウンロード
[Sakura_MapNameExtend.js](Sakura_MapNameExtend.js)

## 更新履歴
| ver   | 日付       | 説明 |
| ----- | ---------- | ---- |
| 1.0.0 | 2024/09/03 | 公開 |


## 機能概要
- マップ名表示を拡張
- フォント、サイズを指定可能
- マップ設定の表示名を|（半角）で区切ると、メイン行とサブ行の2行に分けて表示

## フォントファイルの配置
  （このステップは、独自のフォントを使用しない場合は不要です）
- プロジェクトフォルダ直下の/fontsフォルダの中に、拡張子「.ttf」ファイルを配置してください。
- プラグインパラメータの使用するフォントのファイル名で拡張子「.ttf」まで含めたファイル名を指定して下さい。
  
  ![alt text](image.png)

## プラグインパラメータ
- **mapNamePosition**
  - マップ表示を表示する位置（中央、左上、右上、左下、右下から選択）
- **mapNameTextX**
  - マップ表示の表示位置（X座標）
- **mapNameTextY**
  - マップ表示の表示位置（Y座標）
- **fontFile**
  - 使用するフォントのファイル名
- **mainFontSize**
  - メインのフォントサイズ
- **mainFontColor**
  - メインのフォント色
- **subFontSize**
  - サブのフォントサイズ
- **subFontColor**
  - サブのフォント色
- **needsOutputMaps**
  - マップ表示名一覧をファイルに書き込むかどうか。これをtrueにして、テストプレイを実行するとプロジェクトフォルダ直下に「mapsData.txt」というファイルが出力されます。
  - マップ表示名を一覧で確認する方法がなかったため、付けた機能です。
  
    ![alt text](image-2.png)

    ![alt text](image-3.png)

# License
- This software is released under the MIT license. http://opensource.org/licenses/mit-license.php
