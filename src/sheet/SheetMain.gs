function SheetMain_setCurrent(plv, exp) {
  const sheet = getSheet(CONFIG.MAIN_SHEET);
  sheet.getRange("A2").setValue(plv);
  sheet.getRange("B2").setValue(exp);
}
