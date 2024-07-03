import "./style.css";

const fetchGreetings = () => {
  fetch("http://localhost:8080/greetings")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const emptyArray: string[] = [];
      if (data.value === emptyArray) {
        document.getElementById("greetingsDisplay")!.innerHTML =
          "No current greetings";
      } else {
        data.value.foreach((greeting) => {
          const listItem = document.createElement("li");
          listItem.textContent = greeting;
          document.getElementById("greetingsDisplay")?.appendChild(listItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching entries", error));
};
