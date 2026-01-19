function PlvTable_getBaseExp(plv) {
  const sheet = getSheet(CONFIG.PLV_TABLE);
  const list = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues().flat();
  const index = list.indexOf(plv);
  if (index === -1) throw new Error(`PLv ${plv} が見つかりません`);
  return Number(sheet.getRange(index + 1, 3).getValue());
}
