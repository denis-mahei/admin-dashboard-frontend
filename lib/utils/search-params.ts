export const getSearchParams = (
  val: string | string[] | undefined,
  fallback: string = "",
): string => (typeof val === "string" ? val : fallback);
