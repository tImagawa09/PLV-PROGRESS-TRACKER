function ProgressService_recordToday() {
  const today = formatDate(new Date());

  const input = MainSheet_getCurrentInput();
  if (!input.plv || !input.exp) {
    throw new Error("PLvまたはEXPが未入力です");
  }

  const baseExp = PlvTable_getBaseExp(Number(input.plv) - 1);
  const totalExp = baseExp + Number(input.exp);

  const row = [
    today,
    Number(input.plv),
    Number(input.exp),
    totalExp,
    input.nextExp,
    input.daysTo999
  ];

  LogSheet_upsert(today, row);
}
