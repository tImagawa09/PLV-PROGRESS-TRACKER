function LineStateStore_set(userId, state) {
  PropertiesService.getScriptProperties()
    .setProperty(`state_${userId}`, state);
}

function LineStateStore_get(userId) {
  return PropertiesService.getScriptProperties()
    .getProperty(`state_${userId}`);
}

function LineStateStore_setTemp(userId, key, value) {
  PropertiesService.getScriptProperties()
    .setProperty(`tmp_${key}_${userId}`, value);
}

function LineStateStore_getTemp(userId, key) {
  return PropertiesService.getScriptProperties()
    .getProperty(`tmp_${key}_${userId}`);
}

function LineStateStore_clear(userId) {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty(`state_${userId}`);
  props.deleteProperty(`tmp_plv_${userId}`);
}

