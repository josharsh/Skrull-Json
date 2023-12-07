function flattenJson(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          flattenJson(item, `${newKey}[${index}]`, result);
        });
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenJson(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

export default flattenJson;
