console.log('dfsd');

const body = document.querySelector('body');

const styeBody = () => {
  body.style.background = 'blue';
};

const addTitle = text => {
  const title = document.createElement('h1');
  title.textContent = text;
  body.appendChild(title);
};

styeBody();
addTitle('heeelllo');
