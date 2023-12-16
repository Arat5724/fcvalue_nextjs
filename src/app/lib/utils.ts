export function cutValue(val: number) {
  const units = ["", "만", "억", "조", "경", "해"];
  val = val >= 100 ? Math.round(val) : Math.round(val * 100) / 100;
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


export const generatePagination = (currentPage: number, totalPages: number) => {

  const tempStartPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(tempStartPage + 4, totalPages);
  const startPage = Math.max(endPage - 4, 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  return pages;

};
