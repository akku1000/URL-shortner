const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Converts a decimal number to a Base62 string.
 * @param {number} num - The unique ID from Redis
 */
export const encodeBase62 = (num) => {
    if (num === 0) return CHARSET[0];
    
    let result = "";
    while (num > 0) {
        result = CHARSET[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result;
};