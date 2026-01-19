function LineRecordFlow_start(event) {
  LineStateStore_set(event.source.userId, "awaiting_plv");
  LineReply_send(event.replyToken, ReplyTemplates_recordStart());
}

function LineRecordFlow_handle(event) {
  const userId = event.source.userId;
  const text = event.message.text.trim();
  const state = LineStateStore_get(userId);

  if (state === "awaiting_plv" && /^\d+$/.test(text)) {
    LineStateStore_set(userId, "awaiting_exp");
    LineStateStore_setTemp(userId, "plv", text);
    LineReply_text(event.replyToken, "📊 現在の経験値を入力してください。");
    return true;
  }

  if (state === "awaiting_exp" && /^\d+$/.test(text)) {
    const plv = LineStateStore_getTemp(userId, "plv");
    const exp = text;

    SheetMain_setCurrent(plv, exp);
    updateDailyValues();

    LineReply_send(
      event.replyToken,
      ReplyTemplates_recordComplete(plv, exp)
    );

    LineStateStore_clear(userId);
    return true;
  }

  return false;
}

