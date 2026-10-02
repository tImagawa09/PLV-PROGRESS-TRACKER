# plv-progress-tracker

デレステの PLv（プロデューサーレベル）進捗を記録・分析するための  
**Google Apps Script + LINE Bot プロジェクト** です。

---

## 前提条件

- Docker Desktop（起動済み）
- Google アカウント
- LINE Developers アカウント
- Git

---

## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone git@github.com:tImagawa09/PLV-PROGRESS-TRACKER.git
cd plv-progress-tracker
```

### 2. 設定ファイルの作成
サンプルをコピーし、`LINE_TOKEN` などを自分の値に書き換えます。
```bash
cp Config.sample.gs src/config/Config.gs
```
| 注意: Config.gs は .gitignore に含まれており、Git 管理外です。

### 3. Dockerイメージをビルド
```bash
docker compose build
```
### 4. claspにログイン
```bash
docker compose run --rm gas clasp login
```
ブラウザが開くので、GAS プロジェクトを管理する Google アカウントでログインしてください。
### 5. GAS プロジェクトをクローン（初回のみ）
既存の GAS プロジェクトがある場合：
```bash
docker compose run --rm gas clasp clone <SCRIPT_ID> --rootDir src
```
- <SCRIPT_ID> はスプレッドシートの拡張機能 → Apps Script → URL から取得できます。

### 6. GAS に反映（push）
```bash
docker compose run --rm gas clasp push
```

### 7. GAS 側の設定
#### 7-1. 実行権限の付与
- GAS エディタで任意の関数を実行
- 権限ダイアログですべて許可
#### 7-2. Webhook URL の設定（LINE）
- URL: https://script.google.com/macros/s/<デプロイID>/exec
- LINE Developers → Messaging API → Webhook URL に設定
- Webhook を「有効」にする

### 8. 動作確認
- 正常に返信が返ってくるか確認してください

## 開発時の基本コマンド
- GASに反映（push）:
```bash
docker compose run --rm gas clasp push
```
- ログ確認：
```bash
docker compose run --rm gas clasp logs
```
