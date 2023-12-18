export function cutValue(val: number) {
  const units = ["", "만", "억", "조", "경", "해"];
  val = val >= 100 ? Math.round(val)
    : val >= 10 ? Math.round(val * 10) / 10
      : Math.round(val * 100) / 100;
  let first = 0;
  let second = val;
  let cnt = -1;
  while (second >= 10000) {
    first = second % 10000;
    second = Math.floor(second / 10000);
    cnt++;
  }
  if (second >= 100 || first === 0)
    return `${second.toString()}${units[cnt + 1]}`;
  return `${second.toString()}${units[cnt + 1]} ${first.toString()}${units[cnt]}`;
}

