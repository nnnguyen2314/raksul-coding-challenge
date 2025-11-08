// Utility: format positive integers with comma as thousands separator without using toLocaleString or Intl.NumberFormat
// Source inspiration: chunking digits from the end and joining with commas is a common approach.
// Implementation by Junie.
export function formatYen(n: number): string {
    if (!Number.isFinite(n) || n < 0) throw new Error("formatYen expects a non-negative finite number");
    const s = Math.floor(n).toString();
    // Insert commas every 3 digits from the end
    let out = "";
    let count = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        out = s[i] + out;
        count++;
        if (count === 3 && i !== 0) {
            out = "," + out;
            count = 0;
        }
    }
    return out;
}
