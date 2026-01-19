/**
 * LINEへテキスト返信する共通関数
 */
function replyToLine(replyToken, text) {
  const url = "https://api.line.me/v2/bot/message/reply";

  const payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: text
      }
    ]
  };

  UrlFetchApp.fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + CONFIG.LINE_TOKEN
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

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

