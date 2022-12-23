import { Entity } from "./common";
import { Product } from "./product";
import { User } from "./user";

export class List<T extends Entity> extends Array<T> {
  constructor() {
    super();
    Object.setPrototypeOf(this, List.prototype);
  }

  /* fix function fetchAll to save data in the array once the fetching is successful*/
  async fetchAll(url: string): Promise<T[] | Error> {
    const jsondata = await fetch(url);
    const data: T[] | Error = await jsondata.json();

    if ("message" in data) throw new Error(`Fetch failed: ${jsondata.statusText}`);
    this.push(...data);
    return [...data];
  }
  /* complete the function sortList() with a parameter "order", which can be 
    either "asc" or "desc". Sort the array by id according to the given order and return the
    reference to the same array*/
  sortList(order: "asc" | "desc"): T[] {
    order === "asc" ? this.sort((a, b) => a.id - b.id) : this.sort((a, b) => b.id - a.id);
    return this;
  }

  /* complete method push(), which overrides original "push" method. New item can be added to the array if 
    id does not exist. Only add all the items to the array if every item satisfies the condition.
    Return 1 if can push all new items to the array, otherwise return 0 */
  push(...items: T[]): number {
    let unique = true;

    items.forEach((elem) => {
      if (unique === false) return;
      this.forEach((originalElem) => {
        if (elem.id === originalElem.id) {
          unique = false;
          return;
        }
      });
    });

    if (unique === true) {
      items.forEach((item) => (this[this.length] = item));
      return 1
    } else return 0;
  }
}
