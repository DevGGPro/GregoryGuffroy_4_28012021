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
const modalBg = document.querySelector(".bground");

const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelectorAll('.close'); // #issue1

// element input de type text,date,number and email #issue2
const formFirstname = document.getElementById('first');
const formLastname = document.getElementById('last');
const formEmail = document.getElementById('email');
const formBirthdate = document.getElementById('birthdate');
const formQuantity = document.getElementById('quantity');
const formRadio = document.querySelectorAll('input[type=radio]')
const formCheckbox = document.getElementById('checkbox1');



// ----------------------------------------
// ---------------- RegEx -----------------
// ----------------------------------------
const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const birthdateRegEx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
const quantityRegEx = /^\+?(0|[1-9]\d*)$/;



// ----------------------------------------
// ---------------- Events ----------------
// ----------------------------------------
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event #issue1
modalBtnClose.forEach((element) => element.addEventListener("click", closeModal));



// ----------------------------------------
// -------------- Functions ---------------
// ----------------------------------------

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// Close modal form #issue1
function closeModal() {
  modalBg.style.display = "none";
}

/**
 * Valide le formulaire
 * @returns {boolean}
 */ 
function validate(){
  let firstname = false;
  let lastname = false;
  let email = false;
  let birthdate = false;
  let quantity = false;
  let radio = false;
  let checkbox = false;

  // On test la valeur du prénom
  if(formFirstname.value.trim().length >= 2){
    console.log('true pour le prenom ' + formFirstname.value);
    firstname = true;
  }

  // On test la valeur du nom
  if(formLastname.value.trim().length >= 2){
    console.log('true pour le nom ' + formLastname.value);
    lastname = true;
  }
 
  // On test la valeur de l'email
  if(emailRegEx.test(formEmail.value)){
    console.log('true pour l\'email ' + formEmail.value);
    email = true;
  }

  // On test la valeur de la date de naissance
  if(birthdateRegEx.test(formBirthdate.value)){
    console.log('true pour la date de naissance ' + formBirthdate.value);
    birthdate = true;
  }

  // on test la valeur du nombre de tournois
  if(!isNaN(formQuantity.value) && formQuantity.value.trim() != ""){
    console.log('true pour le nombre de tournois ' + formQuantity.value);
    quantity = true;
  }

  // On regarde les inputs pour savoir s'il y en a un de checked
  for(let i=0; i<formRadio.length;i++){
    if(formRadio[i].checked){
      console.log('La ville est ' + formRadio[i].value);
      radio = true;
    }
  }

  // On regarde si la checkbox est checked
  if(formCheckbox.checked){
    console.log('true pour la checkbox');
    checkbox = true;
  }

  if(firstname && lastname && email && birthdate && quantity && radio && checkbox){
    return true
  }
  else{
    return false;
  }
}