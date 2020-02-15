class Account {
  constructor(name) {
    this.name = name;
    this.transactions = [];

  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  isAllowed () {
    return (this.account.balance - this.amount >= 0)
  }

  get value() {
    return (-this.amount);
  }
}

class Deposit extends Transaction {
  isAllowed () {
    return true;
  }

  get value() {
    return this.amount;
  }
}


// DRIVER CODE BELOW

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
// console.log('t1: ', t1)

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
// console.log('t2: ', t2)

console.log('Ending Balance:', myAccount.balance);
console.log('Transactions:', myAccount.transactions);
