function MessageRouter_route(event) {
  if (LineRecordFlow_handle(event)) return;
  
  const message = event.message.text.trim();

  // 記録フロー
  if (message === "記録する") {
    LineRecordFlow_start(event);
    return;
  }

  // 進捗確認
  if (message === "進捗確認" || message === "進捗") {
    LineReply_text(event.replyToken, generateProgressReport());
    return;
  }

  // カスタムコマンド
  if (message === "残り") {
    LineReply_text(event.replyToken, getRemainingExp());
    return;
  }

  if (message === "履歴") {
    LineReply_text(event.replyToken, getRecentLogs());
    return;
  }

  if (message === "週報") {
    LineReply_text(event.replyToken, getSummaryReport(7));
    return;
  }

  if (message === "月報") {
    LineReply_text(event.replyToken, getSummaryReport(30));
    return;
  }

  // 不明入力
  LineReply_text(
    event.replyToken,
    "📘 ボタンまたはコマンドを使用してください。\n\n・記録する\n・進捗確認\n・残り\n・履歴\n・週報\n・月報"
  );
}
