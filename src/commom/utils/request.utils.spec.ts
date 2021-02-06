import { convertBooleanString } from "./request.utils"

describe('convertBooleanString', () => {

    it('test values', () => {

        const inputs = [
            'true',
            'false',
            true,
            false,
            undefined,
            '',
            'foo'
        ]

        const expectedResults = [
            true,
            false,
            true,
            false,
            undefined,
            undefined,
            undefined
        ]

        inputs.forEach((value, index) => {
            const result = convertBooleanString(value)

            expect(result).toBe(expectedResults[index])
        })
    })
})
