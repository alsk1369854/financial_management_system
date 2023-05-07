export const getStringByteCount = (
    str: string
): number => {
    let count = 0;
    if (str) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255) {
                count += 2;
            } else {
                count++;
            }
        }
    }
    return count;
}