"use strict";

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Data
const account1 = {
  owner: "Jobas Schmed",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
let currentAccount, timer;
const dateNow = new Date();
const optionsDate = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  weekday: "long",
  month: "long",
  year: "numeric",
};
/////
inputLoginUsername.value = "js";
inputLoginPin.value = 1111;
/////////////////////////////////////////
//DOM
//new property : username
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
//////////////////////////////////////////// Reusable Functions
//currency format
const formatCur = function (val, local, curr) {
  return new Intl.NumberFormat(local, {
    style: "currency",
    currency: curr,
  }).format(val);
};

//date format function
const formatMovementDate = function (date) {
  //days passed calculation
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  //old way
  // const Day = `${date.getDate()}`.padStart(2, 0);
  // const Month = `${date.getMonth()}`.padStart(2, 0);
  // const Year = date.getFullYear();
  // //
  // if (daysPassed === 0) return "Today";
  // return `${Day}/${Month}/${Year} (${daysPassed} days ago)`;

  //int way
  const dateDisplay = new Intl.DateTimeFormat(currentAccount.language).format(
    dateNow
  );
  if (daysPassed === 0) return "Today";
  return `${dateDisplay} (${daysPassed} days ago)`;
};

const startLogoutTimer = function () {
  let time = 5 * 60;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      currentAccount = 0;
      labelWelcome.textContent = `Session timeout`;
    }

    time--;
  };
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////////////////////////
//ui display : rows of movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = " ";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (movement, index) {
    const type = movement < 0 ? "withdrawal" : "deposit";

    //display date
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date);
    //currency display

    const FormattedMov = formatCur(movement, acc.locale, acc.currency);

    //display rows
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    }: ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${FormattedMov}</div>
        </div>
  `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//ui display total acc balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((a, mov) => a + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//ui display summary at the bottom
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );
  const interes = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(interes, acc.locale, acc.currency);
};

//////////////////////////////////////////////////
//update ui with current acc
const updateUi = function (acc) {
  containerMovements.innerHTML = " ";
  if (currentAccount) {
    //movements
    displayMovements(acc);
    //balance
    calcDisplayBalance(acc);
    //summary
    calcDisplaySummary(acc);

    //update timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
};
//log in button / display ui/ current acc
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //ui
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUi(currentAccount);
  } else {
    labelWelcome.textContent = `Incorrect login or password`;
  }
  [...document.querySelectorAll(".movements__row")].forEach((mov, i) => {
    if (i % 2 === 0) mov.style.backgroundColor = "#eee";
  });
  //date label format
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount?.language,
    optionsDate
  ).format(dateNow);
  //old stupid method
  // const Day = `${dateNow.getDate()}`.padStart(2, 0);
  // const Month = `${dateNow.getMonth()}`.padStart(2, 0);
  // const Year = dateNow.getFullYear();
  // labelDate.textContent = `${Day}/${Month}/${Year}`;
});

// transfer to
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    ////////////////////////
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);
  }
});

//button close/delete  account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(accounts);
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);
    console.log(accounts);

    currentAccount = 0;
    containerApp.style.opacity = 0;
    updateUi(currentAccount);
    labelWelcome.textContent = "Account Deleted";
  }
});
//button add loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((move) => move > amount * 0.1)
  ) {
    //////////////////////
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);

    inputLoanAmount.value = "";
    console.log(currentAccount.movements);
  } else {
    console.log(`can't loan`);
  }
});

//sort button
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// labelBalance.addEventListener('click', updateUi(currentAccount))

// //flatmap test
// const totalBalance = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((a, mov) => a + mov, 0);
// console.log(totalBalance);

// //sort test 1
// account1.movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// })
// console.log(account1.movements);

// //sort test 2
// account1.movements.sort((a, b) => a - b);
// console.log(account1.movements);

// //arrays test
// //1
// const x = new Array(10);
// console.log(x);
// x.fill(1);
// console.log(x);
// x.fill(2, 1, -1);
// console.log(x);
// //2
// const y = Array.from({length: 10}, () => 1);
// console.log(y);
// const z = Array.from({length: 10}, (_,i) => i+1);
// console.log(z);
// const a = Array.from({length: 10}, (arg) => arg = Math.floor(Math.random() * 6));
// console.log(a);

// labelBalance.addEventListener('click', function () {
//   const movementsUi = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent))
//   console.log(movementsUi);
//   const movementsUi2 = [...document.querySelectorAll('.movements__value')];
//   console.log(movementsUi2);
// })

// const totaldeposit = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((count, el) => el>=1000 ? ++count : count, 0);
// console.log(totaldeposit);

// //reduce test
// const { dep, wit } = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (accu, mov) => {
//      accu[mov > 0 ? `dep` : `wit`] += mov;
//       return accu;
//     },
//     { dep: 0, wit: 0 }
//   );
// console.log(dep, wit);

// const allowed = ['pin', 'username'];

// const result = function(acc){
//   return Object.keys(acc).reduce((next, key) => {
//     if (allowed.includes(key)){
//       return {...next, [key]: acc[key]};
//     } else {
//      return next;
//     }
//   }, {});
// }
// console.log(result(accounts));

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(3, 5));
// labelBalance.addEventListener('click', function(){
//   [...document.querySelectorAll(".movements__row")].forEach((mov, i) => {
//     if (i % 2 === 0) mov.style.backgroundColor = '#eee'
//   });

// })
