export interface Transaction {
  amount: number
  date: Date
}

export class Person {
  private name: string;
  private id: string;

  constructor(name: string) {
    this.name = name;
    this.id = this.generateId();
  }

  // Auto-generate random ID
  private generateId(): string {
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
  private transaction: Transaction[];

  constructor(name: string) {
    super(name);
    this.transaction = [];
  }

  getTransaction(): Transaction[] {
    return this.transaction;
  }

  getBalance(): number {
    let balance = 0;
    this.transaction.forEach((trans) => (balance += trans.amount));
    return balance;
  }

  // Add transaction if after the transaction, the total amount is not negative
  addTransaction(amount: number): boolean {
    if (this.getBalance() + amount < 0) return false;
    else {
      this.transaction.push({ amount: amount, date: new Date() });
      return true;
    }
  }
}
