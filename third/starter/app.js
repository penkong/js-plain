// DATA module
// this is module pattern closure + IIFE
// it finally return object to use.
const budgedController = (function() {})();

// UI module
const UIController = (function() {})();

// CONTROLLER module like event -- control entire app.
const controller = (function(bCtrl, UICtrl) {
  // custom func
  let ctrlAddItem = function() {
    // 1. get the input data
    // 2. add item to budget controller
    // 3. add the item to ui
    // 4. calculate budged
    // 5. display to ui
    console.log('object');
  };

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  // we add keypress to global.
  document.addEventListener('keypress', function(e) {
    e.preventDefault();
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });
})(budgedController, UIController);
