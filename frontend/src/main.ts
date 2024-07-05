const fetchGreetings = () => {
  fetch("http://localhost:3000/api/v1/greetings")
    .then((response) => response.json())
    .then((data) => {
      const greetingsDisplay = document.getElementById(
        "greetingsDisplay"
      ) as HTMLDivElement;
      if (data.length === 0) {
        greetingsDisplay.innerHTML = "No current greetings";
      } else {
        data.forEach((greeting) => {
          console.log(greeting);
          const listItem = document.createElement("li");
          listItem.textContent = greeting.greeting;
          greetingsDisplay.appendChild(listItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching greetings", error));
};
fetchGreetings();

const greetingModal = document.getElementById(
  "greetingModal"
) as HTMLDivElement;
const greetingBtn = document.getElementById("greetingBtn") as HTMLButtonElement;
const greetingSpan = document.getElementById(
  "greetingClose"
) as HTMLSpanElement;
greetingBtn.onclick = function () {
  greetingModal.style.display = "block";
};
greetingSpan.onclick = function () {
  greetingModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == greetingModal) {
    greetingModal.style.display = "none";
  }
};

const profileModal = document.getElementById("profileModal") as HTMLDivElement;
const profileBtn = document.getElementById(
  "profileButton"
) as HTMLButtonElement;
const profileSpan = document.getElementById("profileClose") as HTMLSpanElement;
profileBtn.onclick = function () {
  profileModal.style.display = "block";
  const uuid = localStorage.getItem("user_uuid");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authentication": `${uuid}`,
    },
  };
  fetch(`localhost:3000/api/v1/users/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const profileText = document.getElementById(
        "profileText"
      ) as HTMLParagraphElement;
      profileText.innerText = data;
    });
};
profileSpan.onclick = function () {
  profileModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == profileModal) {
    profileModal.style.display = "none";
  }
};

const userModal = document.getElementById("userModal") as HTMLDivElement;
const userBtn = document.getElementById("userBtn") as HTMLButtonElement;
const userSpan = document.getElementById("userClose") as HTMLSpanElement;
userBtn.onclick = function () {
  userModal.style.display = "block";
};
userSpan.onclick = function () {
  userModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == userModal) {
    userModal.style.display = "none";
  }
};

const loginModal = document.getElementById("loginModal") as HTMLDivElement;
const loginBtn = document.getElementById("loginButton") as HTMLButtonElement;
const loginSpan = document.getElementById("loginClose") as HTMLSpanElement;
loginBtn.onclick = function () {
  loginModal.style.display = "block";
};
loginSpan.onclick = function () {
  loginModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
};

function handleGreetingFormSubmit(event: Event) {
  event.preventDefault();
  const nameInput = document.getElementById(
    "greetingInput"
  ) as HTMLInputElement;
  const nameValue = nameInput.value;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ greeting: nameValue }),
  };
  fetch("http://localhost:3000/api/v1/greetings", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function handleUserFormSubmit(event: Event) {
  event.preventDefault();
  const nameInput = document.getElementById(
    "usernameInput"
  ) as HTMLInputElement;
  const emailInput = document.getElementById("emailInput") as HTMLInputElement;
  const passwordInput = document.getElementById(
    "passwordInput"
  ) as HTMLInputElement;
  const birthDayInput = document.getElementById(
    "birthDayInput"
  ) as HTMLInputElement;
  const nameValue = nameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const birthDayValue = birthDayInput.value;
  console.log(birthDayValue);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: nameValue,
      email: emailValue,
      password: passwordValue,
      birthday: birthDayValue,
    }),
  };
  fetch("http://localhost:3000/api/v1/users", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function handleLogin(event: Event) {
  event.preventDefault();

  const emailInput = document.getElementById(
    "loginEmailInput"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "loginPasswordInput"
  ) as HTMLInputElement;

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue,
    }),
  };
  fetch("http://localhost:3000/auth/login", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
      localStorage.setItem("user_uuid", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const greetingsForm = document.getElementById(
    "greetingsForm"
  ) as HTMLFormElement;
  greetingsForm.addEventListener("submit", handleGreetingFormSubmit);
  const userForm = document.getElementById("userForm") as HTMLFormElement;
  userForm.addEventListener("submit", handleUserFormSubmit);
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  loginForm.addEventListener("submit", handleLogin);
});
