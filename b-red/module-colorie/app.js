// storage controller
const PersistCtrl = (function() {
  //
  return {
    storeItem(item) {
      let items;
      if (!localStorage.getItem('items')) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    },

    getItemsFromStorage() {
      let items;
      if (!localStorage.getItem('items')) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    updateItemStorage(item) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((itm, index) => {
        if (item.id === itm.id) {
          items.splice(index, 1, item);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteItemsFromStorage(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((itm, index) => {
        if (item.id === itm.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearItemsFromStorage() {
      localStorage.removeItem('items');
    }
  };
})();
// item controller
const ItemCtrl = (function() {
  // item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // data structure state
  const data = {
    // items: [
    //   // { id: 0, name: 'steak', calories: 1400 },
    //   // { id: 1, name: 'eggs', calories: 140 },
    //   // { id: 2, name: 'rice', calories: 1200 }
    // ],
    items: PersistCtrl.getItemsFromStorage(),
    currItem: null,
    totalCalories: 0
  };

  return {
    getItems() {
      return data.items;
    },

    addItem(name, calories) {
      let id;
      // auto inc id create id
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }
      // calories to number
      calories = parseInt(calories);
      newItem = new Item(id, name, calories);
      data.items.push(newItem);

      return newItem;
    },

    updateItem(name, calories) {
      // calories no num
      calories = parseInt(calories);
      //
      let found = null;
      data.items.forEach(item => {
        if (item.id === data.currItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem(id) {
      // get ids
      let ids = data.items.map(item => item.id);
      // get index
      const index = ids.indexOf(id);
      // remove item
      data.items.splice(index, 1);
    },

    getItemById(id) {
      let found;
      // loop
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    getTotalCalories() {
      let total = 0;
      data.items.forEach(item => {
        total += item.calories;
      });
      data.totalCalories = total;
      return total;
    },

    setCurrItem(item) {
      data.currItem = item;
    },

    getCurrItem() {
      return data.currItem;
    },

    clearAllItems() {
      data.items = [];
    },

    logData() {
      return data;
    }
  };
})();
// -------------------------------------------------------------------
// ui controller
const UICtrl = (function() {
  //
  const UISelectors = {
    itemList: document.getElementById('item-list'),
    listItems: document.querySelectorAll('#item-list li'),
    addBtn: document.querySelector('.add-btn'),
    itemNameInput: document.getElementById('item-name'),
    itemCaloriesInput: document.getElementById('item-calories'),
    totalCalories: document.querySelector('.total-calories'),
    updateBtn: document.querySelector('.update-btn'),
    deleteBtn: document.querySelector('.delete-btn'),
    backBtn: document.querySelector('.back-btn'),
    clearBtn: document.querySelector('.clear-btn')
  };
  return {
    getSelectors() {
      return UISelectors;
    },

    populateList(items) {
      let markup = '';
      items.forEach(({ id, name, calories }) => {
        markup += `
          <li class="collection-item" id="item-${id}">
            <strong>${name}: </strong> <em>${calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>
        `;
      });
      UISelectors.itemList.innerHTML = markup;
    },

    getItemInput() {
      return {
        name: UISelectors.itemNameInput.value,
        calories: UISelectors.itemCaloriesInput.value
      };
    },

    addListItem(item) {
      UISelectors.itemList.style.display = 'block';
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;

      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      UISelectors.itemList.insertAdjacentElement('beforeend', li);
    },

    updateListItem(item) {
      // node list
      let listItems = document.querySelectorAll('#item-list li');
      // turn node list to arr
      listItems = Array.from(listItems);
      listItems.forEach(listItem => {
        const itemId = listItem.getAttribute('id');
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          `;
        }
      });
    },

    deleteListItem(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },

    addItemToForm() {
      //
      UISelectors.itemNameInput.value = ItemCtrl.getCurrItem().name;
      UISelectors.itemCaloriesInput.value = ItemCtrl.getCurrItem().calories;
      UICtrl.showEditState();
    },

    clearFields() {
      UISelectors.itemNameInput.value = '';
      UISelectors.itemCaloriesInput.value = '';
    },

    hideList() {
      UISelectors.itemList.style.display = 'none';
    },

    showTotalCalories(total) {
      UISelectors.totalCalories.textContent = total;
    },

    clearEditState() {
      const { updateBtn, deleteBtn, backBtn, addBtn } = UISelectors;
      UICtrl.clearFields();
      updateBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      backBtn.style.display = 'none';
      addBtn.style.display = 'inline';
    },

    showEditState() {
      const { updateBtn, deleteBtn, backBtn, addBtn } = UISelectors;
      updateBtn.style.display = 'inline';
      deleteBtn.style.display = 'inline';
      backBtn.style.display = 'inline';
      addBtn.style.display = 'none';
    },

    clearItemsUI() {
      let allListItems = document.querySelectorAll('#item-list li');
      // turn node list into arr
      allListItems = Array.from(allListItems);
      allListItems.forEach(item => item.remove());
    }
  };
})();
// --------------------------------------------------------------------
// app controller
const App = (function(ItemCtrl, UICtrl, PersistCtrl) {
  // load eve listeners
  const loadEventListeners = function() {
    const {
      addBtn,
      itemList,
      updateBtn,
      deleteBtn,
      backBtn,
      clearBtn
    } = UICtrl.getSelectors();

    // add item event
    addBtn.addEventListener('click', itemAddSubmit);
    // disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    // edit item click
    itemList.addEventListener('click', itemEditClick);
    // item update submit
    updateBtn.addEventListener('click', itemUpdateSubmit);
    // item delete submit
    deleteBtn.addEventListener('click', itemDeleteSubmit);
    // back btn event
    backBtn.addEventListener('click', UICtrl.clearEditState);
    // clear btn event
    clearBtn.addEventListener('click', clearAllItemsClick);
  };

  // add Item submit func
  const itemAddSubmit = function(e) {
    e.preventDefault();
    // get from input UI controller
    const input = UICtrl.getItemInput();
    if (input.name && input.calories) {
      // add item to ds
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // add item to ui
      UICtrl.addListItem(newItem);
      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);

      // store to storrage
      PersistCtrl.storeItem(newItem);

      // clear fields
      UICtrl.clearFields();
    }
  };

  // edit item submit
  const itemEditClick = function(e) {
    e.preventDefault();
    if (e.target.classList.contains('edit-item')) {
      // get list item id (item-0 item-1)
      const listId = e.target.parentNode.parentNode.id.split('-');
      const id = parseInt(listId[1]);
      // get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // set curr item
      ItemCtrl.setCurrItem(itemToEdit);

      // add item to form
      UICtrl.addItemToForm();
    }
  };

  // update item submit
  const itemUpdateSubmit = function(e) {
    e.preventDefault();
    //
    const input = UICtrl.getItemInput();
    // update item;
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    console.log(updatedItem);
    // update ui
    UICtrl.updateListItem(updatedItem);
    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to ui
    UICtrl.showTotalCalories(totalCalories);

    // updata storage
    PersistCtrl.updateItemStorage(updatedItem);

    // clear fields
    UICtrl.clearEditState();
  };

  // delete item submit
  const itemDeleteSubmit = function(e) {
    e.preventDefault();
    /// get curr item
    const currItem = ItemCtrl.getCurrItem();
    // delete from ds
    ItemCtrl.deleteItem(currItem.id);
    // delete from ui
    UICtrl.deleteListItem(currItem.id);
    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to ui
    UICtrl.showTotalCalories(totalCalories);

    // delete from store
    PersistCtrl.deleteItemsFromStorage(currItem.id);

    // clear fields
    UICtrl.clearEditState();
  };

  const clearAllItemsClick = function(e) {
    // delete All items from ds
    ItemCtrl.clearAllItems();
    // delete all items from ui
    UICtrl.clearItemsUI();
    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to ui
    UICtrl.showTotalCalories(totalCalories);
    // clear fields
    UICtrl.clearEditState();

    // clear storage
    PersistCtrl.clearItemsFromStorage();

    // hide ul
    UICtrl.hideList();
  };

  return {
    init() {
      // init state
      UICtrl.clearEditState();
      // fetch items from ds.
      const items = ItemCtrl.getItems();
      // check if any items
      if (!items.length) {
        UICtrl.hideList();
      } else {
        // populate list with items
        UICtrl.populateList(items);
      }

      // load and call eve listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl, PersistCtrl);

// -------------------------------------------------------------------
App.init();
