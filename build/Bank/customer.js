export class Person {
    constructor(name) {
        this.name = name;
        this.id = this.generateId();
    }
    // Auto-generate random ID
    generateId() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
}
export class Customer extends Person {
    constructor(name) {
        super(name);
        this.transaction = [];
    }
    getTransaction() {
        return this.transaction;
    }
    getBalance() {
        let balance = 0;
        this.transaction.forEach((trans) => (balance += trans.amount));
        return balance;
    }
    // Add transaction if after the transaction, the total amount is not negative
    addTransaction(amount) {
        if (this.getBalance() + amount < 0)
            return false;
        else {
            this.transaction.push({ amount: amount, date: new Date() });
            return true;
        }
    }
}
