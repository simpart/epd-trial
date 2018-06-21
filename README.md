# Overview
電子ペーパーを手軽に試せるサンプルキットです。<br>
電子ペーパーとラズペリーパイを用いたお天気表示ガジェットの作り方、中身のソースコードをまとめています。

# 対象者
- 電子ペーパーに興味のある人。
- プログラミングは必要ありません。
- ラズパイ初心者向けにまとめていますが、"ラズパイって何ですか？"な人はキツイかもしれません。
- 半田付けに慣れている必要はないですが、全くの初心者はキツイかもしれません。


# 概要説明、ガジェット作成手順
[こちら](https://gitpitch.com/simpart/epd-trial/master?grs=github&t=sky)


# OSイメージ作成
wget https://downloads.raspberrypi.org/raspbian_lite_latest
unzip raspbian_lite_latest
dd if=./20xx-xx-xx-raspbian-stretch-lite.img of=/dev/sdx bs=1M

# OS設定
## WiFi設定
sudo su
wpa_passphrase (SSID) (pass) >> /etc/wpa_supplicant/wpa_supplicant.conf

# パッケージ更新
apt-get update
apt-get -y upgrade

# UART設定
vi /boot/cmdline.txt

dwc_otg.lpm_enable=0 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline rootwait

sudo systemctl stop serial-getty@ttyS0.service
sudo systemctl disable serial-getty@ttyS0.service


sudo apt-get install screen
sudo reboot

sudo screen /dev/ttyS0 115200


# dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=PARTUUID=3c2d2e40-02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait




 
