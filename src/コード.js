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
 * LINE Webhook受信
 */
function doPost(e) {
  LineController_handleEvent(e);
}

/** ===============================
 * 進捗レポート生成
 * =============================== */
function generateProgressReport() {
  const sheet = getSheet(CONFIG.LOG_SHEET);
  const main = getSheet(CONFIG.MAIN_SHEET); // ← シート1を参照
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "まだ進捗データがありません。";

  const [date, plv, exp, , nextExp, daysTo999] = sheet.getRange(lastRow, 1, 1, 6).getValues()[0];
  const formattedDate = formatDate(date);

  // 「必要楽曲数」を取得
  const songsNeededMasterPlus = main.getRange("B9").getValue();
  const songsNeededForte = main.getRange("B13").getValue();

  return [
    `📊 進捗レポート（${formattedDate}）`,
    `・現在PLv：${plv}`,
    `・経験値：${Number(exp).toLocaleString()}`,
    `・次PLvまで：${Number(nextExp).toLocaleString()} EXP`,
    `・次PLvまでMas+楽曲数：約${songsNeededMasterPlus}曲`,
    `・次PLvまでforte楽曲数：約${songsNeededForte}曲`,
    `・999到達見込み：${daysTo999}日`
  ].join("\n");
}



/**
 * 次のLvまでの残り経験値
 */
function getRemainingExp() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  const nextExp = sheet.getRange("A9").getValue();
  return `🎯 次のPLvまで残り ${Number(nextExp).toLocaleString()} EXP`;
}

/**
 * 999到達目標
 */
function getGoalEstimate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1");
  const est = sheet.getRange("E9").getValue();
  return `🚀 999到達見込み：${est || "計算中"}`;
}

/**
 * 最新3件の履歴表示
 */
function getRecentLogs() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("進捗確認");
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "📄 まだ記録がありません。";

  const start = Math.max(2, lastRow - 2);
  const data = sheet.getRange(start, 1, lastRow - start + 1, 4).getValues();

  const lines = data.map(row => {
    const [date, plv, exp, total] = row;
    const formattedDate = Utilities.formatDate(new Date(date), "Asia/Tokyo", "MM/dd");
    return `${formattedDate}｜PLv${plv}｜EXP:${exp.toLocaleString()}｜累計:${total.toLocaleString()}`;
  });

  return "🕓 最近の記録\n" + lines.join("\n");
}

/**
 * 週間・月間サマリー
 */
function getSummaryReport(days) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("進捗確認");
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return "データが不足しています。";

  const header = data[0];
  const rows = data.slice(1);
  const today = new Date();
  const fromDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));

  // 指定期間内の行のみ抽出
  const recentRows = rows.filter(r => {
    const date = new Date(r[0]);
    return date >= fromDate;
  });
  if (recentRows.length === 0) return `${days}日以内のデータがありません。`;

  const first = recentRows[0];
  const last = recentRows[recentRows.length - 1];

  const diffPlv = last[1] - first[1];
  const diffExp = last[3] - first[3];

  return [
    `📅 ${days === 7 ? "週間" : "月間"}レポート`,
    `期間：${Utilities.formatDate(fromDate, "Asia/Tokyo", "MM/dd")}〜${Utilities.formatDate(today, "Asia/Tokyo", "MM/dd")}`,
    `・PLv：${first[1]} → ${last[1]}（+${diffPlv}）`,
    `・累計EXP増加：${diffExp.toLocaleString()}`,
    `・記録日数：${recentRows.length}日`
  ].join("\n");
}

