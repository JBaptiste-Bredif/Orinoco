
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

    element.colors.forEach(element => {
        let colors = document.createElement("a");
        colors.classList.add('circle');
        colors.style.backgroundColor = element;
        // colors.appendChild(document.createTextNode(element));

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
    btn_plus.classList.add('fas', 'fa-plus-circle', 'ms-2', 'block');
    btn.appendChild(btn_plus)
    body.appendChild(btn)

    card.appendChild(body)
    elt.appendChild(card)

} // combiner tout et faire un apercu du produit (image, nom, prix + bouton "voir produit")
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
async function fillProducts(id) {
    await fetch('http://localhost:3000/api/teddies/' + id) // will return info, but in wrong format
        .then((response) => response.json()) // will return info, in json format
        .then((nounours) => builder(nounours)) // main code here, using json info
}
let test = getUrlParameter('nid');
console.log("test" + test)
fillProducts(test)
// afficherLeToutSousFormeDeDivisions(nounourses)