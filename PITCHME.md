## 電子ペーパーお天気ガジェットの作り方
@Ki4mTaria

---

## 電子ペーパー(E-Paper Display)とは
- 電子書籍リーダー
- 災害時案内板
- 時刻表
- etc...

---

## 電子ペーパーの特徴
![chart](https://simpart.github.io/epd-trial/img/epdchart.png)

---

## 超お手軽電子ペーパー
ワイズ・ラブ社 Y-Con W042R<br>
![ycon](https://simpart.github.io/epd-trial/img/epd3.jpg)

---

## お天気ガジェットの作成
- 12時間以内の天気情報を集計
- お天気アイコンを表示

今日は傘が必要かどうかを表示

---

## 機能構成概要
![overview](https://simpart.github.io/epd-trial/img/overview.png)

---

## 用意するもの
- Y-Con W042 or W042R
- Raspberry Pi
- ピンヘッダ (2.54mmピッチ)
- ジャンパーワイヤー (メス-メス)
- お天気APIアカウント (フリープラン)

¥1,7000くらい

---

## 半田付け,配線
![soldering](https://simpart.github.io/epd-trial/img/YCon-Raspi.png)

---

## ラズパイ設定
- OSイメージ作成
- WiFi設定
- UART有効化
- サンプルツールインストール

---

## お天気APIアカウント作成
[OpenWeatherMap](https://openweathermap.org/)

---

## サンプルツールアクセス
- Webアクセス(http://(your_ip)/epd_trial/)
- APIキー,[ロケーション](https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=35.6662&lon=139.3726&zoom=7)入力
- 更新ボタン押下

---

## デモ




