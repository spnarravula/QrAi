export function getPaginationSize(page: number, size: number) {
  page = page > 0 ? page - 1 : 0;
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { take: limit, skip: offset };
}

export function formatPageData<T extends Array<unknown>>(
  data: [T, number],
  page: number,
  limit: number
) {
  const [items, count] = data;

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit - 1);

  return { items, totalPages, currentPage, count };
}
