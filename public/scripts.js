const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

// Fill CEP
const inputCEP = document.querySelector("form fieldset input#cep")
const fieldsetInputs = document.querySelectorAll("form fieldset input:not(#cep)");

const hasValue = (inputs) => Array.from(inputs).some(input => input.value.trim() !== '')

function setCep() {
  if (!(localStorage.getItem('cepFull'))) window.utils.getCep(inputCEP.value)
}

function getCep() {
  return JSON.parse(atob(localStorage.getItem('cepFull')))
}

async function fillAdress() {
  const { logradouro: street, bairro: neighborhood, localidade: city, uf: state } = JSON.parse(getCep());
  const cep = { street, neighborhood, city, state }

  if (hasValue(fieldsetInputs)) return;

  fieldsetInputs.forEach(input => {
    input.value = cep[input.name]
    input.removeAttribute("disabled")
  })
}
