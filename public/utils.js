function utils() {
  xmlhttp = new XMLHttpRequest();

  function getCep(cep) {

    const url = (getCep) => `https://viacep.com.br/ws/${getCep}/json`

    xmlhttp.open("GET", url(String(cep)), true);

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        const response = xmlhttp.responseText
        localStorage.setItem('cepFull', btoa(JSON.stringify(response)))
      }
    }

    xmlhttp.send(null);
  }

  function init() {
    return {
      getCep,
    }
  }

  return {
    init
  }
}

window.utils = utils().init()