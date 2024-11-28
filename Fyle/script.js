// const showpop = document.getElementById(showPop).innerHTML;

document.querySelectorAll(".input-container input").forEach((input) => {
  const label = input.nextElementSibling;
  input.addEventListener("input", () => {
    if (input.value !== "") {
      label.textContent = label.textContent.replace("*", "");
    } else {
      label.textContent = label.textContent.includes("*")
        ? label.textContent
        : label.textContent + "*";
    }
  });
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector(".btnContact");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function PopUpFunction() {
  modal.style.display = "block";
}

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

document.querySelectorAll(".input-container input").forEach((input) => {
  const label = input.nextElementSibling;
  input.addEventListener("input", () => {
    if (input.value !== "") {
      label.textContent = label.textContent.replace("*", "");
    } else {
      label.textContent = label.textContent.includes("*")
        ? label.textContent
        : label.textContent + "*";
    }
  });
});
console.log("Rabindra");
