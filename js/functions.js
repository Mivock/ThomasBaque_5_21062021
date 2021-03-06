//url API en local
const url = "http://localhost:3000/api/cameras/";

//url API hébéergée en ligne
//const url = "https://p5-api-tb.herokuapp.com/api/cameras/";

//création var qui cherche le champs _id afin de réaliser une url par produit
let id = new URLSearchParams(location.search).get("id");

//url personnalisée par produit
const urlCamera = url + id;

//conversion du prix et ajout devise
function priceConversion(productPrice) {
  return Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(`${productPrice}` / 100);
}

//date pour confirmation
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

//vider le panier
function clearBasket() {
  localStorage.clear();
}

//création de la class pour la mise dans le panier
class Product {
  constructor(id, name, chosenLense, quantity, price, image) {
    this.id = id;
    this.name = name;
    this.chosenLense = chosenLense;
    this.quantity = quantity;
    this.price = price;
    this.image = image;
  }
}
