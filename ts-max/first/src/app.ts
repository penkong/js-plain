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
  return function(target: any) {
    const element = document.getElementById(hookId);
    // e.x . to add name to class use this technic
    const p = new target();
    if (element) {
      element.innerHTML = template;
      element.querySelector("h1")!.textContent = p.name;
    }
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
