/**
 * 日付を yyyy/MM/dd 形式に正規化
 */
function formatDate(date) {
  return Utilities.formatDate(
    new Date(date),
    Session.getScriptTimeZone(),
    CONFIG.DATE_FORMAT
  );
}