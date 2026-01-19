function LineReply_text(replyToken, text) {
  LineReply_send(replyToken, {
    type: "text",
    text,
  });
}
