export function deepCopy(obj) {
  if (!isObject(obj)) return obj;
  const newer = {};
  //   for (const k of obj) {
  //     newer[k] = copyObject(obj[k]); // 재귀
  //   }

  for (const k in Reflect.ownKeys(obj)) {
    newer[k] = deepCopy(obj[k]);
  }
  return newer;
}
