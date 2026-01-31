import { describe, it, expect } from "vitest";
import { Foo } from "./index";

describe("Foo", () => {
  it("should return foo", () => {
    expect(Foo()).toBe("foo");
  });
});
