import { formatYen } from "@/shared/utils/number";

describe("formatYen", () => {
  it("formats small numbers", () => {
    expect(formatYen(0)).toBe("0");
    expect(formatYen(12)).toBe("12");
    expect(formatYen(999)).toBe("999");
  });
  it("adds commas every 3 digits", () => {
    expect(formatYen(1000)).toBe("1,000");
    expect(formatYen(9999)).toBe("9,999");
    expect(formatYen(123456789)).toBe("123,456,789");
  });
  it("rejects negative numbers", () => {
    expect(() => formatYen(-1)).toThrow();
  });
});
