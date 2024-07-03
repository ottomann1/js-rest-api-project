import "./style.css";

const fetchGreetings = () => {
  fetch("http://localhost:3000/api/v1/greetings")
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });

      const greetingsDisplay = document.getElementById(
        "greetingsDisplay"
      ) as HTMLDivElement;
      if (data.length === 0) {
        greetingsDisplay.innerHTML = "No current greetings";
      } else {
        data.value.forEach((greeting: string) => {
          const listItem = document.createElement("li");
          listItem.textContent = greeting;
          greetingsDisplay.appendChild(listItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching greetings", error));
};
fetchGreetings();

// Get the modal
const modal = document.getElementById("myModal") as HTMLDivElement;

// Get the button that opens the modal
const btn = document.getElementById("myBtn") as HTMLButtonElement;

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0] as HTMLSpanElement;

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function handleFormSubmit(event: Event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const nameInput = document.getElementById('greetingInput') as HTMLInputElement;
  const nameValue = nameInput.value;
  const requestOptions = { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(nameValue)
  }
  fetch("http://localhost:3000/api/v1/greetings", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('greetingsForm') as HTMLFormElement;
  form.addEventListener('submit', handleFormSubmit);
});