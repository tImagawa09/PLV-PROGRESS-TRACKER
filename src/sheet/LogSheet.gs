function LogSheet_upsert(date, rowData) {
  const sheet = getSheet(CONFIG.LOG_SHEET);
  const dates = sheet
    .getRange(2, 1, Math.max(sheet.getLastRow() - 1, 0), 1)
    .getValues()
    .flat()
    .map(formatDate);

  const index = dates.indexOf(date);

  if (index !== -1) {
    sheet.getRange(index + 2, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }
}

function LogSheet_getLatest() {
  const sheet = getSheet(CONFIG.LOG_SHEET);
  if (sheet.getLastRow() < 2) return null;
  return sheet.getRange(sheet.getLastRow(), 1, 1, 6).getValues()[0];
}
