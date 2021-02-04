

/**
 * "Translate" pagination rule to database equivalent
 * @param page 
 * @param pageSize 
 */
export function handlePagination(page: number | string, pageSize: number | string): { take: number, skip: number } {
    const _page = parseInt(page.toString())
    const _pageSize = parseInt(pageSize.toString())

    return {
        skip: (_page - 1) * _pageSize,
        take: _pageSize
    }
}
