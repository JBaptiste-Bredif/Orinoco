var total = 0;
function builder(element, color, quantity) {
    // let elt = document.getElementById("main-container");
    // let card = document.createElement("div");

    // let info = document.createElement("p");
    // info.appendChild(document.createTextNode(element.name + " / " + color + " / " + quantity + " x " + element.price / 100 + '€ / ' + quantity * element.price / 100 + '€'));
    // card.appendChild(info);

    // elt.appendChild(card)
    total += element.price / 100;
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
    // colors.appendChild(document.createTextNode(element));
    div_color.appendChild(colors);


    body.appendChild(div_color);

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

function cleanStorage() {
    window.localStorage.clear();
    location.reload();
}
function addStorage(id) {
    let color = document.getElementById('selected').getAttribute('value');
    let local = localStorage.getItem(id + '_' + color);
    if (local) {
        localStorage.setItem(id + '_' + color, parseInt(local) + 1);
    } else {
        localStorage.setItem(id + '_' + color, 1);
    }

    const items = { ...localStorage }; // important !!
    console.log(items); // important !! 
    console.log(Object.keys(items).length); // important !! 


}
async function fillProducts() {
    let elt = document.getElementById("main-container");
    const items = { ...localStorage }; // important !!

    console.log(items); // important !!
    console.log(Object.keys(items).length); // important !! 
    console.log(typeof items)
    if (Object.keys(items).length === 0) {
        let title = document.createElement("h5");
        title.appendChild(document.createTextNode('Votre panier est vide !'));
        elt.appendChild(title);
    } else {
        for (const [key, value] of Object.entries(items)) {

            console.log(`${key}: ${value}`);

            let id = key.split('_')[0];
            let color = key.split('_')[1];
            let quantity = value;
            // price * quantity 
            // img 
            // Nom
            // Img | Nom | Couleur | quantity x price | total price
            await fetch('http://localhost:3000/api/teddies/' + id) // will return info, but in wrong format
                .then((response) => response.json()) // will return info, in json format
                .then((nounours) => builder(nounours, color, quantity)) // main code here, using json info

        }
        let title = document.createElement("p");
        title.classList.add("mt-4", "price-text")
        title.appendChild(document.createTextNode('Le prix total est de ' + total + '€'));
        elt.appendChild(title);

        let btn_container = document.createElement("div")
        btn_container.classList.add("d-flex", 'w-75', 'justify-content-around', 'btn_container')

        let btn_empty = document.createElement("a");
        btn_empty.classList.add('btn', 'btn-primary', 'mt-4', 'text-nowrap', 'me-2');
        btn_empty.appendChild(document.createTextNode("Vider le panier"));
        btn_container.appendChild(btn_empty);

        let btn_cmd = document.createElement("a");
        btn_cmd.classList.add('btn', 'btn-primary', 'mt-4', 'ms-2');
        btn_cmd.appendChild(document.createTextNode("Commander"));
        btn_container.appendChild(btn_cmd);

        // let icon_plus = document.createElement("i");
        // icon_plus.classList.add('fas', 'fa-plus-circle', 'ms-2');
        // icon.appendChild(icon_plus)
        btn_empty.setAttribute('onclick', "cleanStorage()")
        elt.appendChild(btn_container);
    }
}

fillProducts()
// afficherLeToutSousFormeDeDivisions(nounourses)