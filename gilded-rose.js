export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class BasicItem extends Item {
  updateQuality() {
    if (this.quality > 0 && this.sellIn <= 10) {
      this.quality -= 2;
    } else if (this.quality > 0) {
      this.quality--;
    }
    this.sellIn--;
  }
}
export class CheeseItem extends Item {
  updateQuality() {
    this.sellIn--;
    this.quality++;
    if (this.quality > 50) {
      this.quality = 50
    }
  }
}
export class LegendaryItem extends Item {
  updateQuality() {
  }
}
export class ConjuredItem extends Item {
  updateQuality() {
    this.sellIn--;
    this.quality -= 2;
  }
}
export class ConcertItem extends Item {
  updateQuality() {
    if (this .sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality += 3;
    } else if (this.sellIn <= 10) {
      this.quality += 2;
    } else {
      this.quality++
    }
    this.sellIn --;
  }
}

export let items = [];

export function makeItem(name, sellIn, quality) {
  if (name === "Aged Brie") {
    return new CheeseItem(name, sellIn, quality);
  } else if (name === "Sulfuras, Hand of Ragnaros") {
    return new LegendaryItem(name, sellIn, quality);
  } else if (name === "Backstage passes to a TAFKAL80ETC concert") {
    return new ConcertItem(name, sellIn, quality);
  } else if (name.startsWith('Conjured')) {
    return new ConjuredItem(name, sellIn, quality);
  } else {
    return new BasicItem(name, sellIn, quality);
  }
}

items.push(makeItem("+5 Dexterity Vest", 10, 20));
items.push(makeItem("Aged Brie", 2, 0));
items.push(makeItem("Elixir of the Mongoose", 5, 7));
items.push(makeItem("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(makeItem("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(makeItem("Conjured Mana Cake", 3, 6));

export const updateQuality = () => {
  for (let item of items) {
    item.updateQuality();
  }
};
