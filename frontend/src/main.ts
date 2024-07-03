import "./style.css";

const fetchGreetings = () => {
  fetch("http://localhost:8080/greetings")
    .then((response) => response.json())
    .then((data) => {
      console.log({data});
      const emptyArray: string[] = [];
      const greetingsDisplay = document.getElementById("greetingsDisplay") as HTMLDivElement;
      if (data.value.length() === 0) {
        greetingsDisplay.innerHTML =
          "No current greetings";
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
