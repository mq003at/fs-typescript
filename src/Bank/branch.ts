import { Customer } from "./customer";

export class Branch {
  private name: string;
  private customer: Customer[];

  constructor(name: string) {
    this.name = name;
    this.customer = [];
  }

  getName() {
    return this.name;
  }

  getCustomer() {
    return this.customer;
  }

  addCustomer(customer: Customer): boolean {
    if (this.customer.find((person) => person.getId() === customer.getId())) return false;
      this.customer.push(customer);
      return true;
  }

  addCustomerTransaction(id: string, transaction: number): boolean {
    const customer = this.findCustomer(id);
    if (!customer) return false;
    else {
      return customer.addTransaction(transaction);
    }
  }
  
  findCustomer(id: string): Customer | null {
    const customer = this.customer.find((person) => person.getId() === id);
    return customer || null;
  }
}
