export class List extends Array {
    constructor() {
        super();
        Object.setPrototypeOf(this, List.prototype);
    }
    /* fix function fetchAll to save data in the array once the fetching is successful*/
    async fetchAll(url) {
        const jsondata = await fetch(url);
        const data = await jsondata.json();
        if ("message" in data)
            throw new Error(`Fetch failed: ${jsondata.statusText}`);
        this.push(...data);
        return data;
    }
    /* complete the function sortList() with a parameter "order", which can be
      either "asc" or "desc". Sort the array by id according to the given order and return the
      reference to the same array*/
    sortList(order) {
        order === "asc" ? this.sort((a, b) => a.id - b.id) : this.sort((a, b) => b.id - a.id);
    }
    /* complete method push(), which overrides original "push" method. New item can be added to the array if
      id does not exist. Only add all the items to the array if every item satisfies the condition.
      Return 1 if can push all new items to the array, otherwise return 0 */
    push(...items) {
        for (const item of items) {
            if (this.some((i) => i.id === item.id))
                return 0;
        }
        this.push(...items);
        return 1;
    }
}
