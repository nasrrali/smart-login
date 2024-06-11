let signupNameInput = document.querySelector("#signupName");
let signupEmailInput = document.querySelector("#signupEmail");
let signupPasswordInput = document.querySelector("#signupPassword");
let signInEmailInput = document.querySelector("#signInEmail");
let signInPasswordInput = document.querySelector("#signInPassword");
let signupBtn = document.querySelector("#signup");
let loginBtn = document.querySelector("#login");
let showUser = document.querySelector(".showUser");
let updateNameInput = document.querySelector("#updateName");
let updateEmailInput = document.querySelector("#updateEmail");
let updatePasswordInput = document.querySelector("#updatePassword");
let saveUpdateBtn = document.querySelector("#saveUpdateBtn");
// !for validation regex
let userNameValidation = /^[a-zA-Z0-9._-]{3,16}$/;
let emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordValidation =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let users = [];
// !check localStorage is not empty
if (localStorage.getItem("usersDetails")) {
  users = JSON.parse(localStorage.getItem("usersDetails"));
}

function saveInformation() {
  if (validationInput()) {
    let user = {
      userName: signupNameInput.value,
      email: signupEmailInput.value,
      password: signupPasswordInput.value,
    };
    users.push(user);
    clearInput();
    localStorage.setItem("usersDetails", JSON.stringify(users));
  }
}

function clearInput() {
  signupNameInput.value = "";
  signupEmailInput.value = "";
  signupPasswordInput.value = "";
}

function validationInput() {
  for (let i = 0; i < users.length; i++) {
    if (signupEmailInput.value === users[i].email) {
      showUser.innerHTML = "Email already exists";
      showUser.classList.add("red");
      showUser.classList.remove("green");
      return false;
    }
  }
  if (
    userNameValidation.test(signupNameInput.value) &&
    emailValidation.test(signupEmailInput.value) &&
    passwordValidation.test(signupPasswordInput.value)
  ) {
    showUser.innerHTML = "Success";
    showUser.classList.add("green");
    showUser.classList.remove("red");
    setInterval(() => {
      showUser.innerHTML=''
    }, 4000);
    return true;
  } else {
    showUser.innerHTML = "Please confirm name, email, and password are valid";
    showUser.classList.add("red");
    showUser.classList.remove("green");
    return false;
  }
}

function checkData() {
  if (
    signInEmailInput.value === "admin" &&
    signInPasswordInput.value === "admin"
  ) {
    window.location.href = "admin.html";
  } else {
    for (let i = 0; i < users.length; i++) {
      if (
        signInEmailInput.value === users[i].email &&
        signInPasswordInput.value === users[i].password
      ) {
        let userName = `Welcome, ${users[i].userName}`;
        localStorage.setItem("nameForUser", userName);
        window.location.href = "home.html";
        return;
      }
    }
    showUser.innerHTML = "Incorrect email or password";
    showUser.classList.add("red");
    showUser.classList.remove("green");
  }
}

// !events click
if (document.querySelector(".welcome")) {
  document.querySelector(".welcome").innerHTML =
    localStorage.getItem("nameForUser");
}
signupBtn?.addEventListener("click", saveInformation);
loginBtn?.addEventListener("click", checkData);