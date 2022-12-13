import { Entity } from "./common"
import { Product } from "./product"
import { User } from "./user"

export class List<T extends Entity> extends Array<T> {

    /* fix function fetchAll to save data in the array once the fetching is successful*/
    async fetchAll(url: string): Promise<T> {
        const jsondata = await fetch(url)
        const data: T | Error = await jsondata.json()
        this.push(data)
        return data
    }
    /* complete the function sortList() with a parameter "order", which can be 
    either "asc" or "desc". Sort the array by id according to the given order and return the
    reference to the same array*/
    sortList(order) { }

    /* complete method push(), which overrides original "push" method. New item can be added to the array if 
    id does not exist. Only add all the items to the array if every item satisfies the condition.
    Return 1 if can push all new items to the array, otherwise return 0 */
    push(...items: T[]): number {
        
    }

}

