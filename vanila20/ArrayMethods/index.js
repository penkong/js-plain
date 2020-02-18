const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong>wealth</h2>";
  providedData.forEach((item, index, arr) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

getRandomUser();
getRandomUser();
getRandomUser();

// ---------------------------------------------------

function doubleMoney() {
  data = data.map(item => {
    return {
      ...item,
      money: item.money * 2
    };
  });
  updateDOM();
}

// ---------------------------------------------------

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// ---------------------------------------------------

function showOnlyMillionaires() {
  data = data.filter(item => {
    return item.money > 1000000;
  });
  updateDOM();
}

// ---------------------------------------------------

function calcWealth() {
  const wealth = data.reduce((acc, item) => (acc += item.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>total wealth : <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

//////////////////////////////////////////////////////
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showOnlyMillionaires);
calculateWealthBtn.addEventListener("click", calcWealth);
