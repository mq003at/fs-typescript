import { Branch } from "./branch";
import { Customer } from "./customer";
export class Bank {
    constructor(name) {
        this.name = name;
        this.branch = [];
    }
    addBranch(branch) {
        if (this.findBranchByName(branch.getName()))
            return false;
        this.branch.push(branch);
        return true;
    }
    addCustomer(branch, customer) {
        if (!this.checkBranch(branch))
            return false;
        return branch.addCustomer(customer);
    }
    addCustomerTransaction(branch, id, amount) {
        if (!this.checkBranch(branch))
            return false;
        return branch.addCustomerTransaction(id, amount);
    }
    findBranchByName(branch) {
        const result = this.branch.find((br) => br.getName() === branch);
        return result || null;
    }
    checkBranch(branch) {
        return this.branch.some((br) => br.getName() === branch.getName());
    }
    listCustomer(branch, isDetailed) {
        if (!this.checkBranch(branch))
            return false;
        const customers = branch.getCustomer();
        console.log(`List of customers in branch ${branch.getName()}`);
        customers.forEach(customer => {
            console.log(`   ID: ${customer.getId()}. Name: ${customer.getName()}.`);
            if (isDetailed) {
                console.log("   Transaction details:");
                customer.getTransaction().forEach(trans => console.log(`      Date: ${trans.date.getDate}/${trans.date.getMonth}/${trans.date.getFullYear}: ${trans.amount}.`));
            }
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
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomer(westBranch, true));
console.log(arizonaBank.listCustomer(sunBranch, true));
