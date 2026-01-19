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
