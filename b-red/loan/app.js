//
// listen for submit
document.getElementById('loan-form').addEventListener('submit', e => {
  e.preventDefault();
  // hide result
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(caclRes, 2000);
  // show loader
});

//
function caclRes(e) {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  // give monthly interest.
  const caclInterest = parseFloat(interest.value) / 100 / 12;
  // give months for repay
  const calcPayments = parseFloat(years.value) * 12;

  // monthly pay
  const x = Math.pow(1 + caclInterest, calcPayments);
  const monthly = (principal * x * caclInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = (monthly * calcPayments - principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showErr('Please provide valid numbers');
  }
}

function showErr(msg) {
  // create div
  const errDiv = document.createElement('div');
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //add class
  errDiv.className = 'alert alert-danger';
  // create textNode and append
  errDiv.appendChild(document.createTextNode(msg));
  // insert err above heading
  card.insertBefore(errDiv, heading);
  setTimeout(clearErr, 3000);
}

function clearErr() {
  document.querySelector('.alert').remove();
}
