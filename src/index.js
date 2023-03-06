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

let userNameList = localStorage.getItem("userNameList");
let thisUser = localStorage.getItem("thisUser");


const btnUser = document.querySelector("#btnUser");
const userWrap = document.querySelector("#userWrap");
const btnLogout = userWrap.querySelector("#btnLogout");


if (userNameList != null) {
  let userNameListArr = JSON.parse(userNameList);
  userNameListArr.forEach((element) => {
    const userNameListUl = userWrap.querySelector("#userList ul");
    let li = document.createElement("li");
    li.innerText = element;
    if(element === thisUser){
      let img = document.createElement("img");
      img.src="src/img/star.png";
      img.width = 10;
      img.style.marginLeft = "5px";
      li.appendChild(img);
      li.classList.add("active");
    }
    userNameListUl.appendChild(li);
  });
}

if(thisUser != null){
  const h1 = document.querySelector("#logInWarp h1");
  h1.innerText = "Hello, " + thisUser;
  const toDoH1 = document.querySelector("#todoWrap h1");
  toDoH1.innerHTML = thisUser + "'s To-Do List";
}

if(thisUser == null) thisUser = "";

let toDoList = localStorage.getItem(`${thisUser}_todoList`);
let todoArr = new Array();

if(toDoList != null){
  todoArr = JSON.parse(toDoList);
  todoArr.forEach((element) => {
    const toDoUl = document.querySelector("#todoWrap #todoListWrap ul");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkIcon");

    checkbox.checked = element.checked;
    checkbox.addEventListener("click", handleCheckBox);
    li.appendChild(checkbox);

    const label = document.createElement("label");
    label.innerText = element.toDo;
    if(element.checked){
      label.classList.add("comp");
    }
    li.appendChild(label);

    const img = document.createElement("img");
    img.src = "src/img/delete.png";
    img.classList.add("deleteIcon");
    img.addEventListener("click", handleBtnDelete);
    li.appendChild(img);
    toDoUl.appendChild(li);
  });

}


const btnLogin = document.querySelector("#logInWarp #btnLogin");
let userNameArray = new Array();

function userLogin(event) {
  event.preventDefault();
  userNameList = localStorage.getItem("userNameList");
  const userName = document.querySelector("#logInWarp #userForm input#userName").value;

  if (userNameList != null) {
    userNameArray = JSON.parse(userNameList);
    if (userNameArray.includes(userName)) {
      alert("중복된 로그인 이름입니다. 다른 이름을 입력해주세요.");
      return false;
    }
  }

  const h1 = document.querySelector("#logInWarp h1");
  h1.innerText = "Hello, " + userName;
  const toDoH1 = document.querySelector("#todoWrap h1");
  toDoH1.innerHTML = userName + "'s To-Do List";
  userNameArray.push(userName);

  localStorage.setItem("thisUser", userName);
  localStorage.setItem("userNameList", JSON.stringify(userNameArray));

  const defaultLi = userWrap.querySelectorAll("#userList ul li");

  if(defaultLi != null){
    for(let i=0; i<defaultLi.length; i++){
      defaultLi[i].classList.remove("active");
      let img = defaultLi[i].querySelector("img");
      if(img != null){
        img.remove();
      }
    }
  }

  const ul = userWrap.querySelector("#userList ul");
  const li = document.createElement("li");
  li.innerText = userName;
  let img = document.createElement("img");
  img.src="src/img/star.png";
  img.width = 10;
  img.style.marginLeft = "5px";
  li.appendChild(img);
  li.classList.add("active");
  li.addEventListener("click", handleChangeUser);
  ul.appendChild(li);

  thisUser = localStorage.getItem("thisUser");
  let toDoList = localStorage.getItem(`${thisUser}_todoList`);
  let toDoArray = new Array();

  const toDoUl = document.querySelector("#todoWrap #todoListWrap ul");
  const toDoLi = toDoUl.querySelectorAll("li");

  toDoLi.forEach((element) => { element.remove();});

  if(toDoList != null){
    toDoArray = JSON.parse(toDoList);
    toDoArray.forEach((element) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkIcon");

      checkbox.checked = element.checked;
      checkbox.addEventListener("click", handleCheckBox);
      li.appendChild(checkbox);

      const label = document.createElement("label");
      label.innerText = element.toDo;
      if(element.checked){
        label.classList.add("comp");
      }
      li.appendChild(label);

      const img = document.createElement("img");
      img.src = "src/img/delete.png";
      img.classList.add("deleteIcon");
      img.addEventListener("click", handleBtnDelete);
      li.appendChild(img);
      toDoUl.appendChild(li);
    });

  }
}

function userLogout() {
  localStorage.removeItem("thisUser");
  thisUser = "";
  const h1 = document.querySelector("#logInWarp h1");
  h1.innerText = "Hello, Please Login";
  const toDoH1 = document.querySelector("#todoWrap h1");
  toDoH1.innerHTML = "To-Do List";

  const toDoUl = document.querySelector("#todoWrap #todoListWrap ul");
  const toDoLi = toDoUl.querySelectorAll("li");

  toDoLi.forEach((element) => { element.remove();});

  let toDoList = localStorage.getItem(`${thisUser}_todoList`);

  if(toDoList != null){
    todoArr = JSON.parse(toDoList);
    todoArr.forEach((element) => {

      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkIcon");

      checkbox.checked = element.checked;
      checkbox.addEventListener("click", handleCheckBox);
      li.appendChild(checkbox);

      const label = document.createElement("label");
      label.innerText = element.toDo;
      if(element.checked){
        label.classList.add("comp");
      }
      li.appendChild(label);

      const img = document.createElement("img");
      img.src = "src/img/delete.png";
      img.classList.add("deleteIcon");
      img.addEventListener("click", handleBtnDelete);
      li.appendChild(img);
      toDoUl.appendChild(li);
    });

  }
}

btnLogin.addEventListener("click", userLogin);
btnLogout.addEventListener("click", userLogout);

function handleBtnUserClick() {
  userWrap.classList.toggle("hide");
}

btnUser.addEventListener("click", handleBtnUserClick);


const changeUserLi = userWrap.querySelectorAll("#userList > ul > li");

function handleChangeUser(event){
  const userName = event.target.innerText;
  localStorage.setItem("thisUser", userName);
  thisUser = localStorage.getItem("thisUser");

  const h1 = document.querySelector("#logInWarp h1");
  h1.innerText = "Hello, " + userName;
  const toDoH1 = document.querySelector("#todoWrap h1");
  toDoH1.innerHTML = userName + "'s To-Do List";

  const defaultLi = userWrap.querySelectorAll("#userList ul li");
  if(defaultLi != null){
    for(let i=0; i<defaultLi.length; i++){
      defaultLi[i].classList.remove("active");
      let img = defaultLi[i].querySelector("img");
      if(img != null){
        img.remove();
      }
    }
  }

  const li = event.target;
  let img = document.createElement("img");
  img.src="src/img/star.png";
  img.width = 10;
  img.style.marginLeft = "5px";
  li.appendChild(img);
  li.classList.add("active");

  let toDoList = localStorage.getItem(`${thisUser}_todoList`);

  const toDoUl = document.querySelector("#todoWrap #todoListWrap ul");
  const toDoLi = toDoUl.querySelectorAll("li");

  toDoLi.forEach((element) => { element.remove();});

  if(toDoList != null){
    todoArr = JSON.parse(toDoList);
    todoArr.forEach((element) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkIcon");

      checkbox.checked = element.checked;
      checkbox.addEventListener("click", handleCheckBox);
      li.appendChild(checkbox);

      const label = document.createElement("label");
      label.innerText = element.toDo;
      if(element.checked){
        label.classList.add("comp");
      }
      li.appendChild(label);

      const img = document.createElement("img");
      img.src = "src/img/delete.png";
      img.classList.add("deleteIcon");
      img.addEventListener("click", handleBtnDelete);
      li.appendChild(img);
      toDoUl.appendChild(li);
    });

  }
}

if(changeUserLi != null){
  for(let i=0; i<changeUserLi.length; i++){
    changeUserLi[i].addEventListener("click", handleChangeUser);
  }
}

function handleCheckBox(event){
  const label = event.target.parentElement.querySelector("label");

  label.classList.toggle("comp");

  const toDoUl= event.target.parentElement.parentElement;
  const toDoLabel = toDoUl.querySelectorAll("li label");
  const toDoCheck = toDoUl.querySelectorAll("li input.checkIcon");

  let toDoArray = new Array();
  for(let i=0; i<toDoLabel.length; i++){
    console.log(toDoLabel[i].innerText);
    const checked = toDoCheck[i].checked;
    const toDo = toDoLabel[i].innerText;
    const toDoObj = {'checked' : checked, 'toDo' : toDo};
    toDoArray.push(toDoObj);
  }

  localStorage.setItem(`${thisUser}_todoList`, JSON.stringify(toDoArray));
}

function handleBtnDelete(event){
  const toDoUl= event.target.parentElement.parentElement;
  event.target.parentElement.remove();


  const toDoLabel = toDoUl.querySelectorAll("li label");
  let toDoArray = new Array();
  for(let i=0; i<toDoLabel.length; i++){
    const checked = toDoLabel[i].parentElement.querySelector("input.checkIcon").checked;
    const toDo = toDoLabel[i].innerText;
    const toDoObj = {'checked' : checked, 'toDo' : toDo};
    toDoArray.push(toDoObj);
  }

  localStorage.setItem(`${thisUser}_todoList`, JSON.stringify(toDoArray));

}

function handleToDoInput(event){
  let toDoArray = new Array();
  event.preventDefault();
  if(event.keyCode == 13){
    const todoListUl = document.querySelector("#todoWrap #todoListWrap ul");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkIcon");
    checkbox.addEventListener("click", handleCheckBox);
    li.appendChild(checkbox);

    const toDo = document.querySelector("#todoWrap #todoForm #todoInput").value;
    const label = document.createElement("label");
    label.innerText = toDo;
    li.appendChild(label);

    const img = document.createElement("img");
    img.src = "src/img/delete.png";
    img.classList.add("deleteIcon");
    img.addEventListener("click", handleBtnDelete);
    li.appendChild(img);
    todoListUl.appendChild(li);
    console.log(`${thisUser}_todoList`);
    toDoList = localStorage.getItem(`${thisUser}_todoList`);
    if(toDoList != null){
      toDoArray = JSON.parse(toDoList);
    }
    const toDoObj = {'checked' : false, 'toDo' : toDo};
    toDoArray.push(toDoObj);

    let userName = "";
    if(thisUser != null){
      userName = thisUser;
    }

    localStorage.setItem(`${userName}_todoList`, JSON.stringify(toDoArray));
  }
}

const todoInput = document.querySelector("#todoForm input#todoInput");

todoInput.addEventListener("keyup", handleToDoInput);
