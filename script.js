const today = new Date().getDay();
const bars = document.querySelectorAll(".bar");
const amounts = document.querySelectorAll(".amount");

// get day and change background-color of correct bar
if (today !== 0) {
  bars[today - 1].classList.add("highlight");
}
else {
  bars[6].classList.add("highlight");
}

// fetch data from json
const getAmounts = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}

getAmounts()
  .then(data => {
    data.forEach((item, index) => {
      // add amount to html
      amounts[index].innerHTML += item.amount;
      // set height of bars dynamically
      bars[index].style.height = item.amount * 2.86 + "px";
    });
  })
  .catch(err => console.log(err));

// mouseenter event to hide/show amount
bars.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    amounts[index].classList.remove("hidden");
  });
  item.addEventListener("mouseleave", () => {
    amounts[index].classList.add("hidden");
  });
});