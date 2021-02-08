import { isBoolean } from "class-validator"

/**
 * Convert a value to boolean if its equivalent
 * @param value 
 */
export function convertBooleanString(value: string | boolean | undefined) {

    if (typeof value === undefined) {
        return undefined
    }

    if (isBoolean(value)) {
        return Boolean(value)
    }

    if (value === 'true') {
        return true
    }

    if (value === 'false') {
        return false
    }

    return undefined
}