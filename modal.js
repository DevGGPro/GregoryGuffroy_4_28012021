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
const formData = document.querySelectorAll('.formData');

const form = document.getElementById('form');
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

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
 * Créer un message d'erreur ou le supprime
 * @param {boolean} // un boulean pour indiquer s'il y a une erreur ou non
 * @param {string} // le message d'erreur à afficher
 * @param {Element} // Un objet Element contenant l'élément du DOM 
 */ 
function messageError(isError, message, id){
  const formSpan = document.createElement('span');

  if(isError){
    formSpan.classList.add('error');

    formSpan.innerHTML = message;

    formSpan.style.color = '#FF4E60';
    formSpan.style.fontSize = '10px';

    id.style.marginBottom = '0px';

    if(id.type == 'text' || id.type == 'email' || id.type == 'date' || id.type == 'number'){
      id.style.border = "solid 2px #FF4E60";
    }

    if(id.parentElement.lastChild.className == 'error'){
      id.parentElement.removeChild(id.parentElement.lastChild);
    }
    id.parentElement.appendChild(formSpan);
  }
  else{
    if(id.parentElement.lastChild.className == 'error'){
      id.parentElement.removeChild(id.parentElement.lastChild);

      if(id.type == 'text' || id.type == 'email' || id.type == 'date' || id.type == 'number'){
        id.style.border = "none";
        id.style.marginBottom = '10px';
      }   
    }
  }
}



/**
 * Valide le formulaire
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
    messageError(false, "Please enter 2 or more characters for the firstname field", formFirstname);
    firstname = true;
  }
  else{
    messageError(true, "Please enter 2 or more characters for the firstname field", formFirstname);
  }

  // On test la valeur du nom 
  if(formLastname.value.trim().length >= 2){
    messageError(false, "Please enter 2 or more characters for the lastname field", formLastname);
    lastname = true;
  }
  else{
    messageError(true, "Please enter 2 or more characters for the lastname field", formLastname);
  }
 
  // On test la valeur de l'email
  if(emailRegEx.test(formEmail.value)){
    messageError(false, "You must enter a valid email", formEmail);
    email = true;
  }
  else{
    messageError(true, "You must enter a valid email", formEmail);
  }

  // On test la valeur de la date de naissance
  if(birthdateRegEx.test(formBirthdate.value)){
    messageError(false, "You must enter your birthdate", formBirthdate);
    birthdate = true;
  }
  else{
    messageError(true, "You must enter your birthdate", formBirthdate);
  }

  // on test la valeur du nombre de tournois
  if(!isNaN(formQuantity.value) && formQuantity.value.trim() != ""){
    messageError(false, "You must enter a number", formQuantity);
    quantity = true;
  }
  else{
    messageError(true, "You must enter a number", formQuantity);
  }

  // On regarde les inputs pour savoir s'il y en a un de checked
  for(let i=0; i<formRadio.length;i++){
    if(formRadio[i].checked){
      messageError(false, "You must choose a city", formRadio[i]);
      radio = true;
      break;
    }
    else{
      messageError(true, "You must choose a city", formRadio[i]);
    }
  }

  // On regarde si la checkbox est checked
  if(formCheckbox.checked){
    messageError(false, "You must accept the terms of use", formCheckbox);
    checkbox = true;
  }
  else{
    messageError(true, "You must accept the terms of use", formCheckbox);
  }

  // on valide le formulaire et charge le remerciement
  if(firstname && lastname && email && birthdate && quantity && radio && checkbox){
    const modalBody = document.getElementsByClassName('modal-body');
    const bouton  = document.createElement('div');
    modalBody[0].innerHTML = '<h2>Thank you for submitting your registration details</h2>';
    modalBody[0].style.minHeight = '850px';
    modalBody[0].style.textAlign = 'center';
    modalBody[0].style.display = 'flex';
    modalBody[0].style.flexDirection = 'column';
    modalBody[0].style.justifyContent = "center";
    modalBody[0].style.alignItems = "center";


    bouton.innerHTML = "Close";
    bouton.classList.add('btn-submit');
    bouton.classList.add('button');
    bouton.style.position = 'absolute';
    bouton.style.bottom = '25px';
    modalBody[0].appendChild(bouton);

    bouton.addEventListener("click", closeModal);
    
  }
}