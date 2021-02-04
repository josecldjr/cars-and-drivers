import { handlePagination } from "./query.utils"


describe('query.utils', () => {

    describe('handlePagination', () => {


        it('with one page', async () => {

            const { skip, take } = handlePagination(1, 100)

            expect(skip).toBe(0)
            expect(take).toBe(100)
        })

        it('with multi pages', async () => {

            const { skip, take } = handlePagination(3, 100)

            expect(skip).toBe(200)
            expect(take).toBe(100)
        })
    })
})