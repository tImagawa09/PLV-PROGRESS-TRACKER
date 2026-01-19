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