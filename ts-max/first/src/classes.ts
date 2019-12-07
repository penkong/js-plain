//
class Department {
  protected employees: string[] = [];
  constructor(private name: string, private readonly id: string) {}

  public describe(): void {
    console.log("department: " + this.name);
  }

  public addEmployee(employee: string): void {
    this.employees.push(employee);
  }

  public printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

let acc = new Department("1", "account");

acc.addEmployee("mk");
acc.addEmployee("mkz");
acc.printEmployeeInfo();

class ITDepartment extends Department {
  // add dedicated constructor

  constructor(id: string, public admin: string[]) {
    super(id, "it");
  }

  addEmployee(name: string): void {
    if (name === "mk") {
      return;
    }
    this.employees.push(name);
  }

  // abstract method on parent class force inherited class
  // implement it .
  // abstract means you must give override method in child
}

const itDepar = new ITDepartment("3", ["mk"]);

console.log(itDepar);

// singleton pattern is about ensuring that you will always only
// have exactly one instance of a certain class

class AccountDepartment {
  // cause can not use new;
  private static instance: AccountDepartment;
  private constructor(private id: string, private reports: string[]) {}

  static getInstance() {
    if (AccountDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountDepartment("1", []);
    return this.instance;
  }
}

// =========================================
