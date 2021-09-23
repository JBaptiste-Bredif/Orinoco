
const nounourses = [{
    "colors": [
        "Tan",
        "Chocolate",
        "Black",
        "White"
    ],
    "_id": "5be9c8541c9d440000665243",
    "name": "Norbert",
    "price": 2900,
    "imageUrl": "http://localhost:5500/images/teddy_1.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
},
{
    "colors": [
        "Pale brown",
        "Dark brown",
        "White"
    ],
    "_id": "5beaa8bf1c9d440000a57d94",
    "name": "Arnold",
    "price": 3900,
    "imageUrl": "http://localhost:5500/images/teddy_2.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
},
{
    "colors": [
        "Brown"
    ],
    "_id": "5beaaa8f1c9d440000a57d95",
    "name": "Lenny and Carl",
    "price": 5900,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "http://localhost:5500/images/teddy_3.jpg"
},
{
    "colors": [
        "Brown",
        "Blue",
        "Pink"
    ],
    "_id": "5beaabe91c9d440000a57d96",
    "name": "Gustav",
    "price": 4500,
    "imageUrl": "http://localhost:5500/images/teddy_4.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
},
{
    "colors": [
        "Beige",
        "Tan",
        "Chocolate"
    ],
    "_id": "5beaacd41c9d440000a57d97",
    "name": "Garfunkel",
    "price": 5500,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "http://localhost:5500/images/teddy_5.jpg"
}]
// copier/coller ici le contenu de la premiere requête GET

function afficherNomDesNounours(array) {
    array.forEach(element => {
        afficherNounoursNameParagraphe(element.name)
    });
}

// afficherNomDesNounours(nounourses);

// utiliser une BOUCLE (for) !

function afficherPrixTotal(array) {
    array.forEach(element => {
        console.log('Price : ' + element.price / 100 + ' €')
    });
}
// afficherPrixTotal(nounourses);

function afficherMoitiePrix(array) {
    array.forEach(element => {
        console.log('Price - 20%  : ' + ((element.price / 100) * 0.8).toFixed(2) + ' €')
        console.log('Price - 50% : ' + (element.price / 100) * 0.5 + ' €')
    });
}
// afficherMoitiePrix(nounourses);

// si tu peux, essaye aussi d'afficher celui à -20%

function afficherColorisDisponibles(array) {
    array.forEach(element => {
        console.log('Couleur dispo pour ' + element.name + ' : ')
        element.colors.forEach(elt => {
            console.log(elt)
        });
    });
}
// afficherColorisDisponibles(nounourses);

function afficherSuperieurTrente(array) {
    array.forEach(element => {
        if (element.price > 3000) {
            console.log('Price : ' + element.price / 100 + ' €')
        } else {
            console.log('Price : ' + element.price / 100 + ' € abordable :) ')
        }
    });
}
// afficherSuperieurTrente(nounourses)
// essayer une VARIANTE en affichant "abordable" si le prix est en dessous

function afficherSommeDescriptions(array) {
    let sommeDescriptions;
    array.forEach(element => {
        sommeDescriptions += element.description
    });
    console.log(sommeDescriptions)
}
// afficherSommeDescriptions(nounourses)
// Attention, c'est bien la SOMME des descriptions qu'il faut afficher, pas les unes après les autres

function afficherTroisiemeCouleurDispo(array) {
    array.forEach(element => {
        console.log('3eme couleur pour ' + element.name + ' : ')
        if (element.colors[2]) {
            console.log(element.colors[2])
        } else {
            console.log('Pas assez de couleur dispo')
        }
    });
}
// afficherTroisiemeCouleurDispo(nounourses)
// Attention: gérer les cas où aucune troisième couleur n'existe

function addTenToAge(age) {
    return age + 10;
}
// should increase age passed as argument by 10.
// Ex:
let ageJulie = 12
let agePaul = 24
// Help: use the note "What's an argument ?" to really get how arguments work

function afficherDivAvecNomEtPrixNounours(array) {

    array.forEach(element => {
        let elt = document.getElementById("main-container");
        let div = document.createElement("div");
        let text = document.createElement("p");
        text.appendChild(document.createTextNode(element.name + ' est au prix de ' + element.price / 100 + ' €'))
        div.appendChild(text);
        elt.appendChild(div);
    });

} // pour chaque nounours, creer division et a l'interieur, ajoute nom + prix du nounours
// afficherDivAvecNomEtPrixNounours(nounourses)

function afficherPhotoDesNounours(array) {
    array.forEach(element => {
        let elt = document.getElementById("main-container");
        let img = document.createElement("img");
        img.setAttribute('src', element.imageUrl)
        elt.appendChild(img);
    });

} // reussir a integrer les liens dans la balise src de tag <img>
// afficherPhotoDesNounours(nounourses)


// 5) reussir a faire la page des produit (il ne s'agit plus de faire un apercu des produits comme sur la page d'accueil, mais bien de remplir les informations sur un template de page HTML)
function afficherNounoursNameParagraphe(name) {
    // afficher les noms des nounours sous forme de paragraphes dans la page
    // Vanilla
    let element = document.getElementById("main-container");
    let child = document.createElement("p");
    child.classList.add("name")
    // let text = document.createTextNode(name);    
    // child.appendChild(text)
    child.appendChild(document.createTextNode(name))

    element.appendChild(child);
    // document.getElementById("main-container").appendChild(document.createElement("p").appendChild(document.createTextNode(name)))
}
// afficherNounoursNameParagraphe();

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

        // let info = document.createElement("p");
        // info.classList.add('card-text');
        // info.appendChild(document.createTextNode('Un magnifique prix de ' + element.price / 100 + ' €'));
        // body.appendChild(info);

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

} // combiner tout et faire un apercu du produit (image, nom, prix + bouton "voir produit")

async function fillProducts() {
    await fetch('http://localhost:3000/api/teddies') // will return info, but in wrong format
        .then((response) => response.json()) // will return info, in json format
        .then((nounours) => builder(nounours)) // main code here, using json info
}

fillProducts()
// afficherLeToutSousFormeDeDivisions(nounourses)