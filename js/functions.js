//url API
const url = "http://localhost:3000/api/cameras/";

//url API hébéergée en ligne
// const url = "https://p5-api-tb.herokuapp.com/api/cameras/";

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
