console.table(localStorage);
window.onload = getLocalStorage();
//vider le panier au click et reload de la page
const emptyBasket = document
  .querySelector("#clearBasket")
  .addEventListener("click", function () {
    clearBasket();
    window.location.href = window.location.href;
  });

function getLocalStorage() {
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  console.table(shoppingCart); //pour test
  let cameraData = JSON.parse(localStorage.getItem("cameraData"));
  console.table(cameraData); //pour test
  createBasket(shoppingCart);
  validateForm(shoppingCart);
}

function postData(contact, products) {
  fetch(url + "order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then((response) => response.json()) // response.json nous donnera l'orderId
    .then((orderId) => {
      localStorage.setItem("confirmation", JSON.stringify(orderId));

      document.location.href = "/confirmation.html";
    })
    .catch((error) => console.log("Erreur : " + error));
}

function validateForm(shoppingCart) {
  //création const pour regex
  const confirmation = document.querySelector("#validateBasket");

  const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
  const regexCity =
    /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
  const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

  confirmation.addEventListener("click", (event) => {
    //écouter #validateBasket onclick et si click exectuer =>

    let contact = {
      email: document.getElementById("inputEmail").value,
      firstName: document.getElementById("inputFirstName").value,
      lastName: document.getElementById("inputLastName").value,
      address: document.getElementById("inputAddress").value,
      city: document.getElementById("inputCity").value,
      zipCode: document.getElementById("inputZip").value,
    };
    if (
      //test regex pour data form
      (regexMail.test(contact.email) == true) &
      (regexName.test(contact.firstName) == true) &
      (regexName.test(contact.lastName) == true) &
      (regexAddress.test(contact.address) == true) &
      (regexCity.test(contact.city) == true)
    ) {
      event.preventDefault();

      let products = [];
      for (let product of shoppingCart) products.push(product.id);
      console.table(products);

      //fnc

      postData(contact, products);
    } else {
      alert("Merci de renseigner le formulaire afin de valider la commande.");
    }
  });
}

function createBasket(shoppingCart) {
  //creation HTML pour tableau du panier
  if (shoppingCart === null) {
    //si panier vide alors cacher tableau et afficher h1
    document.querySelector("#tableBasket").classList.add("d-none");
    document.querySelector(
      "#basketEmpty"
    ).innerHTML = `<h1>Le panier est vide.</h1> <br>`;
  } else {
    for (let product of shoppingCart)
      document.querySelector("#basketDisplay").innerHTML += `
        <tr class="text-center">
          <td class="w-25">
              <img src="${
                product.image
              }" class="img-fluid img-thumbnail" alt="${product.name}}">
          </td>
          <td class="align-middle">
              <span>${product.name}</span>
          </td>
        <td class="align-middle">
        <span>${product.chosenLense}</span>
    </td>
    <td class="align-middle">
    <span>${product.quantity}</span>
  </td>
  <td class="align-middle">
              <span>${priceConversion(product.price)}</span>
          </td>
          <td class="align-middle">
              <span>${priceConversion(product.quantity * product.price)}</span>
    </td>
      </tr>
  `;
    let grandTotal = [];
    for (let product of shoppingCart)
      grandTotal.push(product.quantity * product.price);
    console.log(grandTotal);
    let allPrices = Array.from(grandTotal, (x) => parseFloat(x || 0));
    grandTotal = allPrices.reduce((r, c) => r + c, 0);

    document.querySelector("#grandTotal").innerHTML =
      priceConversion(grandTotal);

    localStorage.setItem("grandTotal", JSON.stringify(grandTotal));

    //fnc
    validateForm();
  }
}
