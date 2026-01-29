import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import * as Tree from "./Tree";

describe("Tree", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render a tree", () => {
    const { container } = render(
      <Tree.Root>
        <Tree.Item nodeId="item1">Item 1</Tree.Item>
      </Tree.Root>,
    );
    expect(container.querySelector('[role="tree"]')).toBeTruthy();
  });

  it("should render tree items", () => {
    const { container } = render(
      <Tree.Root>
        <Tree.Item nodeId="item1">Item 1</Tree.Item>
        <Tree.Item nodeId="item2">Item 2</Tree.Item>
      </Tree.Root>,
    );
    const items = container.querySelectorAll('[role="treeitem"]');
    expect(items.length).toBe(2);
  });

  it("should handle selected keys", () => {
    const { container } = render(
      <Tree.Root defaultSelectedKeys={["item1"]}>
        <Tree.Item nodeId="item1">Item 1</Tree.Item>
        <Tree.Item nodeId="item2">Item 2</Tree.Item>
      </Tree.Root>,
    );
    const items = container.querySelectorAll('[role="treeitem"]');
    expect(items[0]?.getAttribute("aria-selected")).toBe("true");
    expect(items[1]?.getAttribute("aria-selected")).toBe(null);
  });
});
