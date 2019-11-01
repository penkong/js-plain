// DATA module
// this is module pattern closure + IIFE
// it finally return object to use.
const budgedController = (function() {
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };
})();

// UI module
const UIController = (function() {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  };
  function getInput() {
    const { inputType, inputDescription, inputValue } = DOMStrings;
    return {
      type: document.querySelector(inputType).value, // inc or exp
      description: document.querySelector(inputDescription).value,
      value: document.querySelector(inputValue).value
    };
  }
  return {
    getInput,
    DOMStrings
  };
})();

// CONTROLLER module like event -- control entire app.
const controller = (function(bCtrl, UICtrl) {
  // custom func
  let ctrlAddItem = function() {
    // 1. get the input data
    let input = UICtrl.getInput();
    // 2. add item to budget controller
    // 3. add the item to ui
    // 4. calculate budged
    // 5. display to ui
  };

  let setupEventListeners = function() {
    let { inputButton } = UICtrl.DOMStrings;
    document.querySelector(inputButton).addEventListener('click', ctrlAddItem);
    // we add keypress to global.
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: setupEventListeners
  };
  //
})(budgedController, UIController);

controller.init();
