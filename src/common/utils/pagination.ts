export const pagination = <T>(
  page: number,
  limit: number,
  data: T,
  count: number
) => {
  const currentPage = page++;
  const totalPages = Math.ceil(count / limit);

  return { count, totalPages, currentPage, data };
};
