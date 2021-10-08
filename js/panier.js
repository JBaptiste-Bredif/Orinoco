function builder(element, color, quantity) {
  let elt = document.getElementById("flex-container");
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
  info.classList.add('card-text', 'text-increase');
  info.appendChild(document.createTextNode("Quantité : " + quantity + " x " + element.price / 100 + '€ = ' + quantity * element.price / 100 + '€'));
  body.appendChild(info);

  let div_color = document.createElement("div");
  div_color.classList.add("d-flex", "justify-content-center", "w-100", "mb-3");

  let colors = document.createElement("a");

  colors.setAttribute('id', 'selected');


  colors.classList.add('circle');
  // Dark brown et Pale brow n'existe pas en CSS il faut donc envoyer un code couleur à la place du nom de la couleur
  switch (color) {
    case 'Dark brown':
      colors.style.backgroundColor = '#654321';
      break;
    case 'Pale brown':
      colors.style.backgroundColor = '#987654';
      break;
    default:
      colors.style.backgroundColor = color;
      break;
  }
  div_color.appendChild(colors);


  body.appendChild(div_color);

  card.appendChild(body)
  elt.appendChild(card)
}


function cleanStorage() {
  window.localStorage.clear();
  location.reload();
}

var total = 0;
function getTotalPrice(price, qtn) {
  total += (price / 100) * qtn;
}

async function fillProducts() {

  // Récupère le panier du localStorage
  let panier = JSON.parse(localStorage.getItem("Panier Orinoco"));
  let elt = document.getElementById("main-container");

  if (!panier) {
    let title = document.createElement("h5");
    title.appendChild(document.createTextNode('Votre panier est vide !'));
    elt.appendChild(title);
  } else {

    for (let item of panier) {
      // Ajoute l'ID de l'item dans la liste si il n'y est pas, cette liste sera envoyé à l'api /orders
      if (!list_id.find(element => element === item.id)) {
        list_id.push(item.id)
      }
      await fetch('http://localhost:3000/api/teddies/' + item.id) // Retourne des infos mais dans le mauvais format
        .then((response) => response.json()) // Retourne les infos au format JSON
        .then((nounours) => {
          builder(nounours, item.color, item.qtn);  // Lance la fonction avec en params les infos au format JSON
          getTotalPrice(nounours.price, item.qtn);
        })
    }
    constructor();
  }
}

function constructor() {
  let elt = document.getElementById("main-container");
  let title = document.createElement("p");
  title.classList.add("mt-4", "price-text");
  title.appendChild(document.createTextNode('Le prix total est de ' + total + '€'));
  elt.appendChild(title);

  let btn_container = document.createElement("div")
  btn_container.classList.add("d-flex", 'w-75', 'justify-content-around', 'btn_container')

  let btn_empty = document.createElement("a");
  btn_empty.classList.add('btn', 'btn-primary', 'mt-4', 'text-nowrap', 'me-2');
  btn_empty.appendChild(document.createTextNode("Vider le panier"));
  btn_container.appendChild(btn_empty);

  let btn_cmd = document.createElement("button");
  btn_cmd.classList.add('btn', 'btn-primary', 'mt-4', 'ms-2');
  btn_cmd.setAttribute('data-bs-toggle', "modal");
  btn_cmd.setAttribute('data-bs-target', "#form-modal");
  btn_cmd.appendChild(document.createTextNode("Commander"));
  btn_container.appendChild(btn_cmd);

  btn_empty.setAttribute('onclick', "cleanStorage()")
  elt.appendChild(btn_container);
}

// Fonction boostrap de vérification du form
// Example starter JavaScript for disabling form submissions if there are invalid fields
function checkForm() {

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        // Ajout par rapport à la fonction de base boostrap, permet d'invalider le formulaire même si le code HTML a été modifié via le DevTool
        if (!document.getElementById('validationMail').value.match(mailformat)) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      })

    })
}

function constructData() {
  let formEl = document.forms.formInfo;
  let formData = new FormData(formEl);
  let email = formData.get('email');
  let surname = formData.get('surname');
  let name = formData.get('name');
  let adress = formData.get('adress');
  let city = formData.get('city');
  const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Vérifie qu'aucun champs de soit vide + que le format de mail est respecté ( en cas de changement du code HTML via le DevTool)
  if (city !== '' && adress !== '' && name !== '' && surname !== '' && email.match(mailformat)) {

    const data_send = {

      "contact": {
        "firstName": surname,
        "lastName": name,
        "email": email,
        "address": adress,
        "city": city
      },
      "products": list_id
    }

    sender(data_send);
  }
}

async function sender(data) {
  await fetch('http://localhost:3000/api/teddies/order', { // Envoie à l'API les données de la commande en format JSON et récupères des infos au mauvais format
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())// Retourne les infos au format JSON
    .then((content) => window.location.replace('commande.html?cid=' + content.orderId + '&price=' + total)) // Change de page avec en param dans l'url : l'id de la commande ainsi que le prix
}

// list_id est composé de chaque ID des objets présent dans le panier
var list_id = [];
fillProducts();
checkForm();

