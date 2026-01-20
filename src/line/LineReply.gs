/**
 * LINEへテキスト返信する共通関数
 */
function LineReply_send(replyToken, message) {
  const payload = Array.isArray(message) ? message : [message];

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + CONFIG.LINE_CHANNEL_ACCESS_TOKEN,
    },
    payload: JSON.stringify({
      replyToken,
      messages: payload,
    }),
  });
}

function LineReply_text(replyToken, text) {
  LineReply_send(replyToken, {
    type: "text",
    text,
  });
}

function LineReply_flex(replyToken, altText, contents) {
  LineReply_send(replyToken, {
    type: "flex",
    altText,
    contents,
  });
}

function ReplyTemplates_recordStart() {
  return {
    type: "text",
    text: "📘 PLvを入力してください。",
  };
}

function ReplyTemplates_recordComplete(plv, exp) {
  return {
    type: "text",
    text: `✅ PLv${plv} / 経験値${Number(exp).toLocaleString()} を記録しました！`,
  };
}