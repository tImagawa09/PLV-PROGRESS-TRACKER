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
  const songsNeededMasterPlus = main.getRange(CONFIG.SONGS_NEEDED_MASTER_PLUS_CELL).getValue();
  const songsNeededForte = main.getRange(CONFIG.SONGS_NEEDED_FORTE_CELL).getValue();


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
 * 999到達目標
 */
function getGoalEstimate() {
  const sheet = getSheet(CONFIG.MAIN_SHEET);
  const est = sheet.getRange(CONFIG.DAYS_TO_999_CELL).getValue();
  return `🚀 999到達見込み：${est || "計算中"}`;
}