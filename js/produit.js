function builder(element) {
  let elt = document.getElementById("main-container");
  let card = document.createElement("div");
  card.classList.add("card", "card-asset")

  let img = document.createElement("img");
  img.classList.add("card-img-top", "border-bottom");
  img.setAttribute('src', element.imageUrl)
  img.setAttribute('alt', "Image de l\'ours " + element.name)
  card.appendChild(img);

  let body = document.createElement("div");
  body.classList.add("card-body");

  let title = document.createElement("h5");
  title.classList.add("card-title");
  title.appendChild(document.createTextNode(element.name));
  body.appendChild(title);

  let info = document.createElement("p");
  info.classList.add('card-text');
  info.appendChild(document.createTextNode(element.description));
  body.appendChild(info);

  let div_color = document.createElement("div");
  div_color.classList.add("d-flex", "justify-content-center", "w-100", "mb-3");

  // index permet de connaître le nombre d'itérations de la boucle forEach, ici il est utilisé pour connaître la première itération
  element.colors.forEach((element, index) => {
    let colors = document.createElement("a");

    if (index == 0) {
      colors.setAttribute('id', 'selected');
    }

    colors.classList.add('circle');
    // Dark brown et Pale brow n'existe pas en CSS il faut donc envoyer un code couleur à la place du nom de la couleur
    switch (element) {
      case 'Dark brown':
        colors.style.backgroundColor = '#654321';
        break;
      case 'Pale brown':
        colors.style.backgroundColor = '#987654';
        break;
      default:
        colors.style.backgroundColor = element;
        break;
    }
    colors.setAttribute('value', element)
    colors.setAttribute('onclick', "colorSelected(this)")
    div_color.appendChild(colors);
  });

  body.appendChild(div_color);

  let price = document.createElement("p");
  price.classList.add('price-container');
  price.appendChild(document.createTextNode(element.price / 100 + '€'));
  body.appendChild(price);

  let btn = document.createElement("a");
  btn.classList.add('btn', 'btn-primary');
  btn.appendChild(document.createTextNode("Ajouter au panier "));
  let btn_plus = document.createElement("i");
  btn_plus.classList.add('fas', 'fa-plus-circle', 'ms-2');
  btn.appendChild(btn_plus)
  btn.setAttribute('onclick', "addStorage('" + id + "')")
  body.appendChild(btn)

  card.appendChild(body)
  elt.appendChild(card)
}

function colorSelected(elt) {
  let previousSelected = document.getElementById('selected');
  if (previousSelected) {
    previousSelected.removeAttribute('id');
  }
  elt.id = 'selected';
}

function addStorage(id) {

  let color = document.getElementById('selected').getAttribute('value');
  // Récupère le panier du localStorage
  let existingEntries = JSON.parse(localStorage.getItem("Panier Orinoco"));

  if (existingEntries == null) {
    existingEntries = [];
  }

  //On cherche dans le 'panier' si l'élèment qu'on veut ajouter existe déjà 
  let entry = existingEntries.find(element => element.id === id && element.color === color);

  // Si entry != null alors il y a dejà la même réf d'ours en peluche avec la même couleur dans le panier, on ajoute donc 1 à sa quantité SINON on crée l'objet {id, color, 1} puis on l'ajoute dans le panier
  if (entry != null) {
    entry.qtn = entry.qtn + 1;
  } else {
    entry = {
      "id": id,
      "color": color,
      'qtn': 1
    };
    existingEntries.push(entry);
  }

  // Renvoie dans le localStorage le nouveau panier
  localStorage.setItem("Panier Orinoco", JSON.stringify(existingEntries));
}

async function fillProducts(id) {
  await fetch('http://localhost:3000/api/teddies/' + id) // Retourne des infos mais dans le mauvais format
    .then((response) => response.json()) // Retourne les infos au format JSON
    .then((nounours) => builder(nounours)) // Lance la fonction avec en params les infos au format JSON
}

function getUrlParameter(name) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const param = urlParams.get(name)
  return param
}

/* NID = nounours id */
var id = getUrlParameter('nid');
fillProducts(id)
