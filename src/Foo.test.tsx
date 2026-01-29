import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Foo } from "./Foo";

describe("Foo", () => {
  afterEach(() => {
    cleanup();
  });

  it("should be ok", () => {
    expect(true).toBeTruthy();
  });
});
