export const paginate = (currentPage: any, totalPages: any) => {
  let pages = [];

  let limit = 5;
  if (totalPages > limit) {
    const nearEnd = totalPages - limit;
    if (currentPage > nearEnd) {
      for (let i = nearEnd + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    if (currentPage <= nearEnd) {
      for (let i = 0; i < limit; i++) {
        pages.push(currentPage + i);
      }
    }
  }
  if (totalPages <= limit) {
    totalPages < limit && (limit = totalPages);
    for (let i = 0; i < limit; i++) {
      pages.push(i + 1);
    }
  }
  return pages;
};
