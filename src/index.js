const colors = [
  "#282260",
  "#121212",
  "#9f4296",
  "#ef6564",
  "#16b695",
  "#332059",
  "#303a42",
  "#1f1c59",
  "#669bd4",
  "#332059",
  "#c5559f",
  "#a14f46"
];

function colorChange() {
  const randomNum1 = Math.floor(Math.random() * colors.length);
  let randomNum2 = Math.floor(Math.random() * colors.length);

  while (randomNum1 === randomNum2) {
    randomNum2 = Math.floor(Math.random() * colors.length);
  }

  const color1 = colors[randomNum1];
  const color2 = colors[randomNum2];

  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
  document.querySelector(
    "#todoWrap"
  ).style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

setInterval(colorChange, 5000);

const btnLogin = document.querySelector("#logInWarp #btnLogin");
const userNameArray = [];
const userNameList = localStorage.getItem("userNameList");
const thisUser = localStorage.getItem("thisUser");
function userLogin(event) {
  event.preventDefault();
  const userName = document.querySelector("#logInWarp #userForm input#userName")
    .value;
  if (userNameList != null) {
    if (userNameList.contain(userName)) {
      alert("중복된 로그인 이름입니다. 다른 이름을 입력해주세요.");
      return false;
    }
    userNameArray = JSON.parse(userNameList);
  }
  const h1 = document.querySelector("#logInWarp h1");
  h1.innerText = "Hello, " + userName;
  const toDoH1 = document.querySelector("#todoWrap h1");
  toDoH1.innerHTML = userName + "'s To-Do List";
  userNameArray.push(userName);

  localStorage.setItem("thisUser", userName);
  localStorage.setItem("userNameList", userNameArray);
}

function userLogout() {
  localStorage.setItem("thisUser", "");
}

const btnLogout = document.querySelector("#userListWrap #btnLogout");

btnLogin.addEventListener("click", userLogin);
btnLogout.addEventListener("click", userLogout);

const btnUser = document.querySelector("#btnUser");
const userWrap = document.querySelector("#userWrap");
function handleBtnUserClick() {
  userWrap.classList.toggle("hide");
}

btnUser.addEventListener("click", handleBtnUserClick);

if (userNameList != null) {
  userNameList.forEach((element) => {
    const userNameListUl = document.querySelector("#userListWrap #userList ul");
    let li = document.createElement("li");
    li.innerText = element;
    userNameListUl.appendChild(li);
  });
}
