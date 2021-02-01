function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ----------------------------------------
// ------------- DOM Elements -------------
// ----------------------------------------
const modalbg = document.querySelector(".bground");

const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelectorAll('.close');

const formData = document.querySelectorAll(".formData");




// ----------------------------------------
// ---------------- Events ----------------
// ----------------------------------------
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalBtnClose.forEach((element) => element.addEventListener("click", closeModal));




// ----------------------------------------
// -------------- Functions ---------------
// ----------------------------------------

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}


