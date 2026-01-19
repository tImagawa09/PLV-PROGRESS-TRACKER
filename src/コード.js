/*****************************************************
 * 📘 LINE × スプレッドシート 進捗記録システム
 * リファクタ済みバージョン（2025-11）
 *****************************************************/


/** ===============================
 * 共通ユーティリティ
 * =============================== */
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet(name) {
  const sheet = getSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error(`❌ シート「${name}」が見つかりません。`);
  return sheet;
}

function formatDate(date) {
  return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), CONFIG.DATE_FORMAT);
}

/** ===============================
 * メイン：日次進捗更新
 * =============================== */
function updateDailyValues() {
    ProgressService_recordToday();
}

/**
 * 999到達目標
 */
function getGoalEstimate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  const est = sheet.getRange("E9").getValue();
  return `🚀 999到達見込み：${est || "計算中"}`;
}





