// Decorators
// meta-programming
// maybe we don't want impact user let reuse code easier
// hidden transformation.
// can add to class
// at base it's function that you apply to sth;

// for decorator add to class we take one arguemnt
// target: is construcntor function
function Logger(target: Function) {
  console.log("logging");
  console.log(target);
}
// decorator exe when class defined not when instantiated.

// next step decorator factory : it return dec function
// allow us to configure more when add to sth;

// allow us to add arg to decorator.
function Loggered(logString: string) {
  return function(target: Function) {
    console.log(logString);
    console.log(target);
  };
}

function WithTemplate(template: string, hookId: string) {
  // _ underscore signal to ts i dont need it.
  //target
  // t is orginal constructor type == target
  // special type object type
  // args are field and arg pass to constructor down like name id location ...

  return function<T extends { new (...args: any[]): { name: string } }>(
    orginalConstructor: T
  ) {
    // const element = document.getElementById(hookId);
    // // e.x . to add name to class use this technic
    // const p = new orginalConstructor();
    // if (element) {
    //   element.innerHTML = template;
    //   element.querySelector("h1")!.textContent = p.name;
    // }
    // ===============================
    // also we can return and changing a class in decoratror and return
    // for decorator add ed to class
    // replace old one
    // now if we instantiate object it works
    return class extends orginalConstructor {
      // we replace orginal constructor with new there for we need to
      // initialize it to use new one
      // _ i get it but i dont use it
      constructor(..._: any[]) {
        super();
        const element = document.getElementById(hookId);
        // e.x . to add name to class use this technic
        if (element) {
          element.innerHTML = template;
          // this come from instead of orginal
          element.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}
// in creation and call decorators is top to bottom
// but in execution is bottom to top

@Logger
@Loggered("hellowww from 2")
@WithTemplate("<h1>we add html here</h1>", "app")
class Persona {
  name = "max";

  constructor() {
    console.log("creating new Person ...");
  }
}

const persona = new Persona();
console.log(persona);

// ================================================

function logg(target: any, propertyName: string | Symbol) {
  console.log("prop dec");
  console.log(target);
  console.log(propertyName);
}

// decorators for accessors;
function logg2(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Accessors dec");
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

// decorators for method;
function logg3(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("method dec");
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
}

// decorators for parameter;
function logg4(
  target: any,
  // this is name of method we use in
  name: string | Symbol,
  position: number
) {
  console.log("parameter dec");
  console.log(target);
  console.log(name);
  console.log(position);
}

// decorator on new places
class Product {
  @logg
  title: string;
  private _price: number;

  @logg2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @logg3
  getPrice(@logg4 tax: number) {
    return this._price * (1 + tax);
  }
}

// u can decorator with returns to methods and accessor and class also
// autobind

// createing auto bind decroatro
// to change method or config

// make autobind to add notation of this to each func we want;

function AutoBind(
  // target
  _: any,
  // methodName
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // this here is whatever trigger getter method
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjustDescriptor;
}

class Printer {
  message = "this is message";
  @AutoBind
  showMsg() {
    console.log(this.message);
  }
}
const pr = new Printer();
const button = document.querySelector("button")!;
// must config this;
button.addEventListener("click", pr.showMsg);

// validation with decorators
interface ValidatorConfig {
  // its class name
  [property: string]: {
    [validateProps: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Reuqired(target: any, propName: string) {
  // any func in js have .name attached to it to catch name
  // Course
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"]
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"]
  };
}

function validate(obj: any) {
  // to retrive the config for the concreate obj we deal with it
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  let isValid = true;
  for (const prop in objValidatorConfig) {
    // console.log(prop)
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Reuqired
  title: string;
  @PositiveNumber
  price: number;
  // must add valid data
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const formed = document.querySelector("form")!;
formed.addEventListener("submit", e => {
  e.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  // + make it number
  const price = +priceEl.value;
  // instead of if check use decorator to check valid info
  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("hoooooooooooosh");
    return;
  }
  console.log(createdCourse);
});

// ts -class validator package
// also nest js add decorator