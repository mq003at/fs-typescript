export class Branch {
    constructor(name) {
        this.name = name;
        this.customer = [];
    }
    getName() {
        return this.name;
    }
    getCustomer() {
        return this.customer;
    }
    addCustomer(customer) {
        if (this.customer.find((person) => person.getId() === customer.getId()))
            return false;
        this.customer.push(customer);
        return true;
    }
    addCustomerTransaction(id, transaction) {
        const customer = this.findCustomer(id);
        if (!customer)
            return false;
        else {
            return customer.addTransaction(transaction);
        }
    }
    findCustomer(id) {
        const customer = this.customer.find((person) => person.getId() === id);
        return customer || null;
    }
}
