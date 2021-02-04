import { defaultPageSize, defautlInitialPage } from "../../config/constants"

/**
 * "Translate" pagination rule to database equivalent
 * @param page 
 * @param pageSize 
 */
export function handlePagination(page: number | string, pageSize: number | string): { take: number, skip: number } {
    let _page = parseInt(page.toString())
    let _pageSize = parseInt(pageSize.toString())

    if (_page <= 0) {
        _page = defautlInitialPage
    }

    if (_pageSize <= 0) {
        _pageSize = defaultPageSize
    }

    return {
        skip: (_page - 1) * _pageSize,
        take: _pageSize
    }
}
