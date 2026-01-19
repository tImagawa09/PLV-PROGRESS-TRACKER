function LineReply_flex(replyToken, altText, contents) {
  LineReply_send(replyToken, {
    type: "flex",
    altText,
    contents,
  });
}
