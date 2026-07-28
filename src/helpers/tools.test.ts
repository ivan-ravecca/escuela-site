import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ciPattern, debounce, emailPattern, phonePattern } from "./tools";

describe("tools helpers", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("validates email values", () => {
    expect(emailPattern.test("demo@example.com")).toBe(true);
    expect(emailPattern.test("invalid@com")).toBe(false);
    expect(emailPattern.test("demo.com")).toBe(false);
  });

  it("validates phone values", () => {
    expect(phonePattern.test("099123456")).toBe(true);
    expect(phonePattern.test("99123456")).toBe(true);
    expect(phonePattern.test("1234")).toBe(false);
  });

  it("validates CI values", () => {
    expect(ciPattern.test("1.234.567-8")).toBe(true);
    expect(ciPattern.test("1234567-8")).toBe(true);
    expect(ciPattern.test("12345678")).toBe(true);
    expect(ciPattern.test("abc")).toBe(false);
  });

  it("debounces repeated calls and keeps latest args", () => {
    const callback = vi.fn<(value: string) => void>();
    const debounced = debounce(callback, 200);

    debounced("first");
    debounced("second");
    debounced("last");

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(199);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("last");
  });
});
