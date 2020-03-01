const storage = window.localStorage;
function get(key) {
  return storage.getItem(key);
}
function set(key, val) {
  return storage.setItem(key, val);
}
function remove(key) {
  return storage.removeItem(key);
}
function clearAll() {
  return storage.clear();
}
export default {
  get,
  set,
  remove,
  clearAll
};
