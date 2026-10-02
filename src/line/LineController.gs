function LineController_handleEvent(e) {
  try {
    // ガード：e が無い / postData が無い場合は何もしない
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log("LineController_handleEvent: no postData (ignored)");
      return;
    }

    const json = JSON.parse(e.postData.contents);
    const event = json.events && json.events[0];

    // LINE以外のイベント（follow/unfollowなど）や空メッセージもあり得る
    if (!event || !event.replyToken) return;

    // message.text が無いイベントもあるのでガード
    if (!event.message || !event.message.text) {
      // フォローイベント等はここで返信しない方針なら return
      return;
    }

    MessageRouter_route(event);

  } catch (err) {
    Logger.log("LineController error: " + err);
  }
}