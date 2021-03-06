## 電子ペーパー
## お天気ガジェットの作り方
@Ki4mTaria

---

## 電子ペーパーとは
- 電子書籍リーダー
- 災害用案内板
- 時刻表
- etc...

---

## 電子ペーパーの特徴
![chart](https://simpart.github.io/epd-trial/img/epdchart.png)

---

## お手軽電子ペーパー
ワイズ・ラブ社 Y-Con W042R<br>
![ycon](https://simpart.github.io/epd-trial/img/epd3.jpg)

---

## お天気ガジェット 動作概要
### 今日は傘が必要かどうかを表示

- 12時間以内の天気情報を集計
- お天気アイコンを表示

---

## 機能構成
![overview](https://simpart.github.io/epd-trial/img/overview.png)

---

## 用意するもの
- Y-Con P027B or W042 or W042R
- Raspberry Pi
- ピンヘッダ (2.54mmピッチ)
- ジャンパーワイヤー (メス-メス)
- 半田付けセット
- お天気APIアカウント (フリープラン)

¥1,7000 〜 ¥20,000

---

## 半田付け,配線
![soldering](https://simpart.github.io/epd-trial/img/YCon-Raspi.png)

---

## ラズパイ設定
- OSイメージ作成
- WiFi設定
- UART設定
- お天気ツールインストール

---

## OSイメージ作成

```bash
dd if=path/to/2018-04-18-raspbian-stretch-lite.img of=/dev/sdc bs=1M
# sdcの部分は環境に合わて変更させる。
sync
```

## WiFi設定

```bash
sudo su
wpa_passphrase (SSID) (pass) >> /etc/wpa_supplicant/wpa_supplicant.conf
reboot
```
---

## UART設定
```bash
sudo vi /boot/cmdline.txt
# 以下に置き換え
dwc_otg.lpm_enable=0 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline rootwait
####################
sudo su
echo enable_uart=1 >> /boot/config.txt
exit

sudo systemctl stop serial-getty@ttyS0.service
sudo systemctl disable serial-getty@ttyS0.service

sudo apt-get install screen python-dev python-pip
sudo pip install pyserial
sudo reboot
```
---

## お天気ツールインストール

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install apache2 git php php-curl
sudo /etc/init.d/apache2 start
cd /var/www/html/
sudo git clone https://github.com/simpart/epd-trial.git
sudo git clone https://github.com/simpart/tetraring4php.git epd-trial/src/php/ttr
chown -R :www-data ./epd-trial/
# 必要に応じてwww-dataに権限付与を行う
```
---

## お天気APIアカウント作成
[OpenWeatherMap](https://openweathermap.org/)
<br>
APIキー作成

---

## お天気ツールアクセス
Webアクセス(http://(raspi_addr)/epd_trial/)

![demo](https://simpart.github.io/epd-trial/img/demo3.png)
<br>

[ロケーション一覧](https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=35.6662&lon=139.3726&zoom=7)

---

## 完成
![demo](https://simpart.github.io/epd-trial/img/demo3.gif)

---
![qr](https://simpart.github.io/epd-trial/img/qr.jpg)
<br>
https://github.com/simpart/epd-trial.git





