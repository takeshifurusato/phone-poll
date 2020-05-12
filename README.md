# phone-poll

## 概要
2000年頃に一斉を風靡した、電話で調査投票するサービスをTwilio Serverless環境で再現しました。

## 機能
### 集計
設定電話番号ごとの着信数をカウントします。

### カットスルー(未対応)
着信の中からピックアップして、オペレーターと話ができる。  
※とりあえず、画面下部に着信番号を表示しているので、自分で架電してください。

## 使い方
### 前提条件
Twilio Serverlessを利用します。前提条件として以下が必要になります。
- Twilio CLI 
- Twilio CLI Serverless Plugin

### 設置方法
1. Twilioのコンソール(管理画面)から、[Sync/Services](https://jp.twilio.com/console/sync/services)にアクセスし、Servicesを作成します。
1. [Sync/ツール/APIキー](https://jp.twilio.com/console/sync/project/api-keys)にアクセスし、APIキーを作成します。
1. Twilio Serverlessで適当なプロジェクトを作り、assetsとfunctionsを差し替えます。
1. .env.exampleを参考にし.envに追記します。※ACCOUNT_SIDとAUTH_TOKENは変更しない。
1. aseets/imagesにある画像を、任意のものに差し替えます。
1. デプロイします。※コマンドは「twilio serverless:deploy」
1. [電話番号](https://jp.twilio.com/console/phone-numbers/search)にアクセスし、電話番号を2つ購入します。
1. 購入した電話番号の設定画面で、Voice & FaxのA CALL COMES INに、上記デプロイ時に発行されたpollへのURLを指定します。(例) https://phone-poll-0000-dev.twil.io/poll 
1. 上記デプロイ時に発行されたindex.htmlへブラウザからアクセスします。(例) https://phone-poll-0000-dev.twil.io/index.html
1. 「スタート」を押すと、集計が開始されます。
1. 電話をかけると、カウントされ、画面下部に着信番号が表示されます。

### 補足
オンラインセミナーなどで、画像・電話番号・カウントが表示されているエリアだけ配信し、昔のテレビ番組みたいな感じで楽しめると思います。
