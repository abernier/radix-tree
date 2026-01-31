import { describe, it, expect } from "vitest";
import { Bar } from "./index";

describe("Bar", () => {
  it("should return bar", () => {
    expect(Bar()).toBe("bar");
  });
});
