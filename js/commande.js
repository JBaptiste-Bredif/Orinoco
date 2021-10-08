
function builder(cid, price) {
  let element = document.getElementById("main-container");

  let text_price = document.createElement("p");
  text_price.appendChild(document.createTextNode("Le prix total de votre commande s'élève à " + price + ' euros.'))
  text_price.classList.add('text-increase', 'my-2', 'text-center')
  element.appendChild(text_price);

  let text_cid = document.createElement("p");
  text_cid.appendChild(document.createTextNode("Votre numéro de commande : " + cid))
  text_cid.classList.add('text-increase', 'my-2', 'text-center')
  element.appendChild(text_cid);
}


function getUrlParameter(name) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const param = urlParams.get(name)
  return param
}

function cleanStorage() {
  window.localStorage.clear();
}

/* CID = commande ID */
var cid = getUrlParameter('cid');
var price = getUrlParameter('price');
builder(cid, price);
cleanStorage();