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
