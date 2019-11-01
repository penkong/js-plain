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

  function addItem(type, des, val) {
    let newItem, ID;
    // last el in arr
    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }
    // create new item base on
    if (type === 'exp') {
      newItem = new Expense(ID, des, val);
    } else if (type === 'inc') {
      newItem = new Income(ID, des, val);
    }
    data.allItems[type].push(newItem);
    return newItem;
  }
  return {
    addItem,
    test: function() {
      console.log(data);
    }
  };
})();
//----------------------------------------------------------------------------------

// UI module
const UIController = (function() {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  function getInput() {
    const { inputType, inputDescription, inputValue } = DOMStrings;
    return {
      type: document.querySelector(inputType).value, // inc or exp
      description: document.querySelector(inputDescription).value,
      value: parseFloat(document.querySelector(inputValue).value)
    };
  }

  function addListItem(obj, type) {
    let html, newHtml, element;
    // create html string with placeholder
    if (type === 'inc') {
      element = DOMStrings.incomeContainer;
      html =
        '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if (type === 'exp') {
      element = DOMStrings.expensesContainer;
      html =
        '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }
    // replace placeholder text
    newHtml = html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%value%', obj.value);
    // insert html in to DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  }

  function clearFields() {
    let fieldsArr;
    const { inputDescription, inputValue } = DOMStrings;
    // query selector all return list rather than arr.
    const fields = document.querySelectorAll(
      inputDescription + ',' + inputValue
    );
    // conver list to arr.
    fieldsArr = Array.prototype.slice.call(fields);
    fieldsArr.forEach(function(current, index, array) {
      current.value = '';
    });
    // back focus on first input
    fieldsArr[0].focus();
  }

  return {
    getInput,
    addListItem,
    clearFields,
    DOMStrings
  };
})();
//-----------------------------------------------------------------------------

// CONTROLLER module like event -- control entire app.
const controller = (function(bCtrl, UICtrl) {
  let updateBudget = function() {
    // 4. calculate budged
    // return budget
    // 5. display to ui
  };

  // custom func
  let ctrlAddItem = function() {
    // 1. get the input data
    let { type, description, value } = UICtrl.getInput();
    // 2. add item to budget controller
    if (description && !isNan(value) && value > 0) {
      let newItem = bCtrl.addItem(type, description, value);
      // 3. add the item to ui
      UICtrl.addListItem(newItem, type);
      // clear fields
      UICtrl.clearFields();
      // calculate and update budget
      updateBudget();
    }
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
