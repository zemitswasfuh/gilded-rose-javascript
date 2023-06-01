import { expect, describe, it } from "vitest";
import { Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });
  //Once the sellIn days is less then zero, quality degrades twice as fast.
  it("degrades quality by 2 when sellIn < 0", () => {
    const testItem = new Item("basic", -1, 5);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(3);
  });
  //The quality of an item is never negative.
  it("quality is never < 0", () => {
    const testItem = new Item("basic", -1, 5);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(-2);
    expect(testItem.quality).toBeGreaterThanOrEqual(0);
  });
  //"Aged Brie" actually increases in quality the older it gets.
  it("aged brie quality increases by 1", () => {
    const testItem = new Item("Aged Brie", 5, 5);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBeGreaterThanOrEqual(6);
  });
  //The quality of an item is never more than 50.
  it("never increases quality geater than 50", () => {
    const testItem = new Item("Aged Brie", 5, 50);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBe(50);
  });
  //"Sulfuras, Hand of Ragnaros," being a legendary item, never has to be sold nor does it decrease in quality.
  it("Sulfuras, Hand of Ragnaros doesn't change sellIn or Quality", () => {
    const testItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(0);
    expect(testItem.quality).toBe(80);
  });
  //"Backstage passes to a TAFKAL80ETC concert", increase in quality as it's sellIn value decreases:
  it("increases quality when sellIn > 10 before TAFKAL80ETC concert", () => {
    const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(14);
    expect(testItem.quality).toBe(21);
  });
    //quality increases by 2 when there are 10 days or less left before the concert.
    it("increases quality by 2 when 5 < sellIn <= 10 before TAFKAL80ETC concert", () => {
      const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
      items.push(testItem);
  
      updateQuality();
  
      expect(testItem.sellIn).toBe(9);
      expect(testItem.quality).toBe(22);
    });
    //quality increases by 3 when there are 5 days or less left before the concert.
    it("increases quality by 3 when 0 < sellIn <= 5 before TAFKAL80ETC concert", () => {
      const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
      items.push(testItem);
  
      updateQuality();
  
      expect(testItem.sellIn).toBe(4);
      expect(testItem.quality).toBe(23);
    });
    //quality drops to 0 after the concert.
    it("decreases quality to 0 after TAFKAL80ETC concert", () => {
      const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
      items.push(testItem);
  
      updateQuality();
  
      expect(testItem.sellIn).toBe(-1);
      expect(testItem.quality).toBe(0);
    });
});
