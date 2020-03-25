export function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(v => {
      if (typeof v === "object" && v !== null) {
        return deepClone(v);
      } else {
        return v;
      }
    });
  } else {
    const newObj = {};

    Object.keys(obj).forEach(v => {
      if (typeof obj[v] === "object" && obj[v] !== null) {
        newObj[v] = deepClone(obj[v]);
      } else {
        newObj[v] = obj[v];
      }
    });

    return newObj;
  }
}
export function formatDate(g) {
  var now = new Date(g);
  var year = now.getFullYear(); //取得4位数的年份
  var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate(); //返回日期月份中的天数（1到31）
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  return year + "-" + month + "-" + date;
}
