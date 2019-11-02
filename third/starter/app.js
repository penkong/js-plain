// DATA module
// this is module pattern closure + IIFE
// it finally return object to use.
const budgedController = (function() {
  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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
    },
    budget: 0,
    percentage: -1
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

  function caclTotal(type) {
    let sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    });
    data.total[type] = sum;
  }

  function calcBudget() {
    // calc total income and expenses
    caclTotal('exp');
    caclTotal('inc');
    // calc budget : income - expenses
    data.budget = data.total.inc - data.total.exp;
    // calc percentage of income we spent.
    if (data.total.inc) {
      data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
    } else {
      data.percentage = -1;
    }
  }

  function getBudget() {
    return {
      budget: data.budget,
      totalInc: data.total.inc,
      totalExp: data.total.exp,
      percentage: data.percentage
    };
  }

  function deleteItem(type, id) {
    // we get ids and put them in arr
    let ids = data.allItems[type].map(function(current) {
      return current.id;
    });
    // check for that id exist then omit it.
    let index = ids.indexOf(id);
    if (index !== -1) {
      data.allItems[type].splice(index, 1);
    }
  }

  function calcPercentages() {
    data.allItems.exp.forEach(function(current) {
      current.calcPercentage(data.total.inc);
    });
  }

  function getPercentages() {
    let allPercentages = data.allItems.exp.map(function(current) {
      return current.getPercentage();
    });
    return allPercentages;
  }

  return {
    addItem,
    calcBudget,
    getBudget,
    deleteItem,
    calcPercentages,
    getPercentages,
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expPercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
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
        '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if (type === 'exp') {
      element = DOMStrings.expensesContainer;
      html =
        '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }
    // replace placeholder text
    newHtml = html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%value%', formatNum(obj.value, type));
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

  function displayBudget(obj) {
    const {
      budgetLabel,
      incomeLabel,
      expenseLabel,
      percentageLabel
    } = DOMStrings;
    let type;
    obj.budget > 0 ? (type = 'inc') : (type = 'exp');
    document.querySelector(budgetLabel).textContent = formatNum(
      obj.budget,
      type
    );
    document.querySelector(incomeLabel).textContent = formatNum(
      obj.totalInc,
      'inc'
    );
    document.querySelector(expenseLabel).textContent = formatNum(
      obj.totalExp,
      'exp'
    );
    if (obj.percentage > 0) {
      document.querySelector(percentageLabel).textContent =
        obj.percentage + '%';
    } else {
      document.querySelector(percentageLabel).textContent = '--';
    }
  }

  function deleteListItem(selectorID) {
    // it's entire item id inc-1 e.g.
    let el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
  }

  function nodeListForEach(list, cb) {
    for (let i = 0; i < list.length; i++) {
      cb(list[i], i);
    }
  }

  function displayPercentages(percentagesArr) {
    const { expPercentageLabel } = DOMStrings;
    // it give us node list
    let fields = document.querySelectorAll(expPercentageLabel);

    nodeListForEach(fields, function(current, index) {
      if (percentagesArr[index] > 0) {
        current.textContent = percentagesArr[index] + '%';
      } else {
        current.textContent = '--';
      }
    });
  }

  function formatNum(num, type) {
    let number = Math.abs(num);
    number = number.toFixed(2);
    let numSplit = number.split('.');
    let int = numSplit[0];
    if (int.length > 3) {
      int =
        int.substr(0, int.length - 3) +
        ',' +
        int.substr(int.length - 3, int.length);
    }
    let dec = numSplit[1];
    let sign;
    type === 'exp' ? (sign = '-') : (sign = '+');
    return sign + '' + int + '.' + dec;
  }

  function displayMonth() {
    const { dateLabel } = DOMStrings;
    let newDate = new Date();
    let months = [
      'jan',
      'feb',
      'march',
      'april',
      'may',
      'jun',
      'july',
      'aug',
      'sep',
      'oct',
      'Nov',
      'dec'
    ];
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    document.querySelector(dateLabel).textContent = months[month] + ' ' + year;
  }

  function changeType() {
    const { inputType, inputDescription, inputValue, inputButton } = DOMStrings;
    let fields = document.querySelectorAll(
      inputType + ',' + inputDescription + ',' + inputValue
    );
    nodeListForEach(fields, function(current, index) {
      current.classList.toggle('red-focus');
    });

    document.querySelector(inputButton).classList.toggle('red');
  }

  return {
    getInput,
    addListItem,
    clearFields,
    displayBudget,
    deleteListItem,
    displayPercentages,
    displayMonth,
    changeType,
    DOMStrings
  };
})();
//-----------------------------------------------------------------------------

// CONTROLLER module like event -- control entire app.
const controller = (function(bCtrl, UICtrl) {
  let updateBudget = function() {
    // 4. calculate budged
    bCtrl.calcBudget();
    // return budget
    let budget = bCtrl.getBudget();
    // 5. display to ui
    UICtrl.displayBudget(budget);
  };

  let updatePercentages = function() {
    // calc percentage
    bCtrl.calcPercentages();
    // reade percentages from budged
    let percentages = bCtrl.getPercentages();
    // update ui
    UICtrl.displayPercentages(percentages);
  };

  let ctrlAddItem = function() {
    // 1. get the input data
    let { type, description, value } = UICtrl.getInput();
    // 2. add item to budget controller
    if (description && !isNaN(value) && value > 0) {
      let newItem = bCtrl.addItem(type, description, value);
      // 3. add the item to ui
      UICtrl.addListItem(newItem, type);
      // clear fields
      UICtrl.clearFields();
      // calculate and update budget
      updateBudget();
      updatePercentages();
    }
  };

  // event delegation to put handler on parent rather than original element
  // and catch event there because event bubble up.
  // use cases : when our el have lots of child , when want an event handler
  // attch to el that is not yet on dom.

  // DOM traversing : when we click on delete but our goal is whole item.
  let ctrlDeleteItem = function(e) {
    let itemID, splitID, typeOf, ID;
    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitID = itemID.split('-');
      typeOf = splitID[0];
      ID = parseInt(splitID[1]);
      // delete from data structure
      bCtrl.deleteItem(typeOf, ID);
      // delete item from UI
      UICtrl.deleteListItem(itemID);
      // update and show new budget.
      updateBudget();
      updatePercentages();
    }
  };

  let setupEventListeners = function() {
    let { inputButton, container, inputType } = UICtrl.DOMStrings;

    document.querySelector(inputButton).addEventListener('click', ctrlAddItem);
    // we add keypress to global.
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(container).addEventListener('click', ctrlDeleteItem);
    document
      .querySelector(inputType)
      .addEventListener('change', UICtrl.changeType);
  };

  return {
    init: function() {
      budget = {
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      };
      UICtrl.displayBudget(budget);
      UICtrl.displayMonth();
      setupEventListeners();
    }
  };
  //
})(budgedController, UIController);

controller.init();
