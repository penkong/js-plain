//

const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');
// db.collection('recipe')
//   .get()
//   .then(snapshot => {
//     // when have resp
//     snapshot.docs.forEach(doc => {
//       addRecipe(doc.data(), doc.id);
//     });
//   })
//   .catch(err => console.log(err));

const addRecipe = (recipe, id) => {
  let time = recipe.created_at.toDate();
  let html = `
    <li data-id="${id}">
      <div>${recipe.title}</div>
      <div>${time}</div>
      <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>
  `;
  list.innerHTML += html;
};

const delRecipe = id => {
  const recipes = document.querySelectorAll('li');
  recipes.forEach(recipe => {
    if (recipe.getAttribute('data-id') === id) {
      recipe.remove();
    }
  });
};

// set real time listener
// on snapshot is real time listener
const unsub = db.collection('recipe').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    if (change.type === 'added') {
      addRecipe(doc.data(), doc.id);
    } else if (change.type === 'removed') {
      delRecipe(doc.id);
    }
  });
});

// delete
list.addEventListener('click', e => {
  if ((e.target.tagName = 'button')) {
    const id = e.target.parentElement.getAttribute('data-id');
    db.collection('recipe')
      .doc(id)
      .delete()
      .then(() => {
        console.log('delete');
      });
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const now = new Date();
  const recipe = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  };
  db.collection('recipe')
    .add(recipe)
    .then(() => {
      console.log('added');
    })
    .catch(err => console.log(err));
});

// unsub from db

button.addEventListener('click', () => {
  unsub();
  console.log('unsubed from collection');
});
