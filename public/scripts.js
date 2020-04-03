const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

// Fill CEP

const fieldsetInputs = document.querySelectorAll("form fieldset input:not(#cep)"); //without cep
const inputCEP = document.querySelector("form fieldset input#cep")

function fillAdress() {
  fieldsetInputs.forEach(input => {
    input.removeAttribute("disabled")
    input.value = "Qualquer texto"
  })
  console.log("TO AQUIS")
}