function builder(nounours) {

    nounours.forEach(element => {
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

        let price = document.createElement("p");
        price.classList.add('price-container');
        price.appendChild(document.createTextNode(element.price / 100 + '€'));
        body.appendChild(price);

        let btn = document.createElement("a");
        btn.classList.add('btn', 'btn-primary');
        btn.href = 'produit.html?nid=' + element._id;
        btn.appendChild(document.createTextNode("Plus d\'infos"));
        let btn_plus = document.createElement("i");
        btn_plus.classList.add('fas', 'fa-plus-circle', 'ms-2');
        btn.appendChild(btn_plus)
        body.appendChild(btn)

        card.appendChild(body)
        elt.appendChild(card)
    });
}

async function fillProducts() {
    await fetch('http://localhost:3000/api/teddies') // Retourne des infos mais dans le mauvais format
        .then((response) => response.json()) // Retourne les infos au format JSON
        .then((nounours) => builder(nounours)) // Lance la fonction avec en params les infos au format JSON
}

fillProducts()