export const getNumberParams = (
  val: string | string[] | undefined,
  fallback = 1,
): number => {
  const num = Number(val);
  return isNaN(num) ? fallback : num;
};
