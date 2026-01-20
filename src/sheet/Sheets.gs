/* LogSheet */

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

/* MainSheet */
function MainSheet_getCurrentInput() {
  const sheet = getSheet(CONFIG.MAIN_SHEET);
  return {
    plv: sheet.getRange("A2").getValue(),
    exp: sheet.getRange("B2").getValue(),
    nextExp: sheet.getRange(CONFIG.NEXT_EXP_CELL).getValue(),
    daysTo999: sheet.getRange(CONFIG.DAYS_TO_999_CELL).getValue()
  };
}

function MainSheet_setInput(plv, exp) {
  const sheet = getSheet(CONFIG.MAIN_SHEET);
  sheet.getRange("A2").setValue(plv);
  sheet.getRange("B2").setValue(exp);
}

/* PlvTableSheet */
function PlvTable_getBaseExp(plv) {
  const sheet = getSheet(CONFIG.PLV_TABLE);
  const list = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues().flat();
  const index = list.indexOf(plv);
  if (index === -1) throw new Error(`PLv ${plv} が見つかりません`);
  return Number(sheet.getRange(index + 1, 3).getValue());
}

/* SheetMain */
function SheetMain_setCurrent(plv, exp) {
  const sheet = getSheet(CONFIG.MAIN_SHEET);
  sheet.getRange("A2").setValue(plv);
  sheet.getRange("B2").setValue(exp);
}
