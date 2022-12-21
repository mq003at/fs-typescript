import { Branch } from "./branch";
import { Customer } from "./customer";

export class Bank {
  private name: string;
  private branch: Branch[];

  constructor(name: string) {
    this.name = name;
    this.branch = [];
  }

  getBank() { return this.name };

  addBranch(branch: Branch): boolean {
    if (this.checkBranch(branch)) return false;
    this.branch.push(branch);
    return true;
  }

  addCustomer(branch: Branch, customer: Customer): boolean {
    if (!this.checkBranch(branch)) return false;
    return branch.addCustomer(customer);
  }

  addCustomerTransaction(branch: Branch, id: string, amount: number): boolean {
    if (!this.checkBranch(branch)) return false;
    return branch.addCustomerTransaction(id, amount);
  }

  findBranchByName(branch: string): Branch | null {
    const result = this.branch.find((br) => br.getName().toLowerCase().startsWith(branch.toLowerCase()));
    if (result) console.log(`Found branch ${result.getName()} in bank ${this.getBank()}.`) 
    return result || null;
  }

  checkBranch(branch: Branch): boolean {
    return this.branch.some((br) => br.getName() === branch.getName());
  }

  listCustomer(branch: Branch, isDetailed: boolean): boolean {
    if (!this.checkBranch(branch)) return false;
    const customers = branch.getCustomer();
    console.log(`List of customers in branch ${branch.getName()}`);
    customers.forEach((customer) => {
      console.log(`   ID: ${customer.getId()}. Name: ${customer.getName()}.`);
      if (isDetailed) {
        console.log("   Transaction details:");
        const transactionArrays = customer.getTransaction();
        if (!(transactionArrays.length > 0)) console.log("       Customer has no transaction.");
        else {
         transactionArrays.forEach((trans) => console.log(`      Date: ${trans.date.getDate()}/${trans.date.getMonth()}/${trans.date.getFullYear()}: ${trans.amount}.`));
        }
      }
      console.log("\n");
    });
    return true;
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John");
const customer2 = new Customer("Anna");
const customer3 = new Customer("John");

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

arizonaBank.findBranchByName("bank");
arizonaBank.findBranchByName("sun");

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransaction(-1000);
console.log("Customer 1's balance: " + customer1.getBalance());
arizonaBank.listCustomer(westBranch, true)
arizonaBank.listCustomer(sunBranch, true)
