# plv-progress-tracker

デレステのPLv（プロデューサーレベル）進捗を記録・分析するための  
Google Apps Script + LINE Bot プロジェクトです。


---

## 前提条件

- Docker Desktop（起動済み）
- Google アカウント
- LINE Developers アカウント
- Git

---

## 1. リポジトリをクローン

```bash
git clone https://github.com/yourname/plv-progress-tracker.git
cd plv-progress-tracker

2. 設定ファイルを作成
2-1. Config ファイル作成
cp src/config/Config.sample.gs src/config/Config.gs

2-2. Config.gs を編集
const CONFIG = {
  LINE_CHANNEL_ACCESS_TOKEN: "YOUR_LINE_CHANNEL_ACCESS_TOKEN",
  LINE_CHANNEL_SECRET: "YOUR_LINE_CHANNEL_SECRET",
};

※ Config.gs は git 管理外です

3. Docker イメージをビルド
docker compose build

4. clasp にログイン
docker compose run --rm gas clasp login


ブラウザが開くので、
GAS プロジェクトを管理する Google アカウントでログインしてください。

5. GAS プロジェクトを clone（初回のみ）

すでに GAS プロジェクトが存在する場合：

docker compose run --rm gas clasp clone <SCRIPT_ID> --rootDir src


SCRIPT_ID はスプレッドシートの
拡張機能 → Apps Script → URL から取得できます。

6. GAS に反映（push）
docker compose run --rm gas clasp push

7. GAS 側の設定
7-1. 実行権限の付与

GAS エディタで任意の関数を実行

権限ダイアログですべて許可

7-2. Webhook URL の設定（LINE）
https://script.google.com/macros/s/＜デプロイID＞/exec


LINE Developers → Messaging API → Webhook URL

Webhook を「有効」にする

8. 動作確認

LINE で以下を送信：

記録


正常に返信が返ってくれば成功です。

開発時の基本コマンド
GAS に反映
docker compose run --rm gas clasp push

ログ確認
docker compose run --rm gas clasp logs

トラブルシューティング
localhost 接続エラーが出る場合

Docker Desktop が起動しているか確認

WSL2 が有効か確認（Windows）

clasp が動かない場合
docker compose run --rm gas clasp --version


でバージョンが表示されるか確認。

設計方針

Router / Flow / Service / Domain 分離

LINE 会話は状態遷移（State Machine）で管理

GAS のグローバル汚染を避ける構成

将来的な Web / Discord 連携を考慮


---