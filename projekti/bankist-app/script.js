'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnRegister = document.querySelector('.register__btn');
const regForm = document.querySelector('.registration_form');
const regFormContainer = document.querySelector('.form-container');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formTransfer = document.querySelector('.operation.operation--transfer');
const formLoan = document.querySelector('.operation.operation--loan');
const formClose = document.querySelector('.operation.operation--close');
const regSummary = document.querySelector('.summary');
const regBalance = document.querySelector('.balance');
const regBalance2 = document.querySelector('.balance.balance');
const regTimer = document.querySelector('.logout-timer');

const newName = document.querySelector('.fname');
const newLastName = document.querySelector('.lname');
const newPIN = document.querySelector('.newPIN');
const confNewPIN = document.querySelector('.confPIN');
const createNewAccButon = document.querySelector('.submitButton');

const welcomeBonus = 100;
const newNameError = document.querySelector('.form-container input.fname');
const newLastNameError = document.querySelector('.form-container input.lname');
const newPINError = document.querySelector('.form-container input.newPIN');
const confNewPINError = document.querySelector('.form-container input.confPIN');

// Display movements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//  Computing Usernames

const createUsernames = function (accs) {
  accs.forEach(function (accs) {
    accs.username = accs.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

createUsernames(accounts);

// reduce method
const updateUI = function (acc) {
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov <= 0)
    .reduce((acc, mov) => (acc = acc + mov), 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

//Implementing login 158

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    regForm.style.opacity = 0;
    containerMovements.style.opacity =
      formTransfer.style.opacity =
      formLoan.style.opacity =
      formClose.style.opacity =
      regTimer.style.opacity =
      regSummary.style.opacity =
      regBalance2.style.opacity =
        100;
    if (currentAccount.movements.length === 1)
      alert(
        `Welcome to Bankist Bank ${
          currentAccount.owner.split(' ')[0]
        }! \nEnjoy your welcome bonus of ${currentAccount.movements[0]} €`
      );
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    btnRegister.style.cursor = 'not-allowed';
    btnRegister.style.opacity = 0;
    btnRegister.style.pointerEvents = 'none';
    regForm.style.opacity = 0;

    updateUI(currentAccount);

    inputLoginUsername.value = inputLoginPin.value = ' ';
    inputLoginPin.blur();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, recieverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc.username !== currentAccount.username
  ) {
    //Doing the transfer

    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
    btnRegister.style.opacity = 1;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov >= amount * 0.01)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//btn sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//Register button functionality

btnRegister.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('myRegistration').style.display = 'block';
  containerApp.style.opacity = 100;
  containerMovements.style.opacity =
    formTransfer.style.opacity =
    formLoan.style.opacity =
    formClose.style.opacity =
    regTimer.style.opacity =
    regSummary.style.opacity =
      0;
  labelBalance.textContent = 'Your money matters';
});
createNewAccButon.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    newName.value === '' ||
    newLastName.value === '' ||
    newPIN.value === '' ||
    newPIN.value > 9999 ||
    confNewPIN.value !== newPIN.value
  ) {
    alert('Form is not correctly filled. Please try again');
    newName.value === ''
      ? (newNameError.style.backgroundColor = '#d85764')
      : (newNameError.style.backgroundColor = '#f1f1f1');
    newLastName.value === ''
      ? (newLastNameError.style.backgroundColor = '#d85764')
      : (newLastNameError.style.backgroundColor = '#f1f1f1');
    newPIN.value === ''
      ? (newPINError.style.backgroundColor = '#d85764')
      : (newPINError.style.backgroundColor = '#f1f1f1');
    newPIN.value > 9999
      ? (newPINError.style.backgroundColor = '#d85764')
      : (newPINError.style.backgroundColor = '#f1f1f1');
    confNewPIN.value === '' ||
    (newPIN.value !== '' && confNewPIN.value !== newPIN.value)
      ? (confNewPINError.style.backgroundColor = '#d85764')
      : (confNewPINError.style.backgroundColor = '#f1f1f1');
  } else {
    const ownerName = newName.value.concat(' ' + newLastName.value);
    const newAccPIN = newPIN.value;

    const newAccount = {};
    newAccount.owner = ownerName;
    newAccount.pin = Number(newAccPIN);
    newAccount.balance = 0;
    newAccount.interestRate = 1.0; // interest rate for new users
    newAccount.movements = [];
    newAccount.movements.push(100); //Welcome bonus

    accounts.push(newAccount);
    createUsernames(accounts);
    alert(
      `Your accout has sucessfully been created! \nYour nickname is "${newAccount.username}" and your PIN is "${newAccount.pin}" \nPlease, log in.`
    );
    regForm.style.opacity = 0;
    regBalance2.style.opacity = 0;
    console.log(accounts);
    console.log(ownerName);
  }
});
