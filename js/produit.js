
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

    element.colors.forEach((element, index) => {
        let colors = document.createElement("a");

        if (index == 0) {
            colors.setAttribute('id', 'selected');
        }

        colors.classList.add('circle');

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
        // colors.appendChild(document.createTextNode(element));
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

} // combiner tout et faire un apercu du produit (image, nom, prix + bouton "voir produit")

function colorSelected(elt) {
    let previousSelected = document.getElementById('selected');

    if (previousSelected) {
        previousSelected.removeAttribute('id');
    }
    elt.id = 'selected';
}

function addStorage(id) {
    let color = document.getElementById('selected').getAttribute('value');
    let local = localStorage.getItem(id + '_' + color);
    if (local) {
        localStorage.setItem(id + '_' + color, parseInt(local) + 1);
    } else {
        localStorage.setItem(id + '_' + color, 1);
    }
}
async function fillProducts(id) {
    await fetch('http://localhost:3000/api/teddies/' + id) // will return info, but in wrong format
        .then((response) => response.json()) // will return info, in json format
        .then((nounours) => builder(nounours)) // main code here, using json info
}

function getUrlParameter(name) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get(name)
    return param
}
var id = getUrlParameter('nid');
fillProducts(id)
// afficherLeToutSousFormeDeDivisions(nounourses)