console.table(localStorage);
//création var qui cherche le champs _id afin de réaliser une url par produit
let id = new URLSearchParams(location.search).get("id");
//url personnalisée par produit
const urlCamera = url + id;

fetch(urlCamera)
  .then((response) => response.json())
  .then((data) => {
    let idCamera = data._id;
    console.table(data); //pour test

    document.querySelector(
      "#itemCard"
    ).innerHTML = `<img class="card-img" src="${
      data.imageUrl
    }" alt="Photo du produit" />
      <div class="card-body" id="itemName">
        <h4 class="card-title">${data.name}</h4>
        <p class="card-text">${data.description}</p>
        <div class="options">
        <label for="lense">Choisissez un objectif:</label>
        <select name="lense" id="lenses">
        </select>
        </div>
        <br>
        <div class="quantity">
        <label for="quantity">Quantité :</label>
          <select name="quantity" id="quantity">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
    
        <div class="buy d-flex justify-content-between align-items-center">
          <div class="price text-success">
            <h5 class="mt-4" id="price">${priceConversion(data.price)}</h5>
          </div>
          <a href="#" class="btn btn-danger mt-3" id="buy">Ajouter au panier</a>
        </div>
      </div>
    </div>`;

    for (let lenses of data.lenses) {
      document.querySelector("#lenses").innerHTML +=
        //pas oublier le += pour rajouter tous les objectifs
        ` 
        <option value="${lenses}">${lenses}</option>
      `;
    }
    document.querySelector("#buy").addEventListener("click", function () {
      //écouter #buy onclick et si click exectuer =>
      let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")); //création local storage
      let id = data._id;
      let chosenLense = document.querySelector("#lenses").value; //reference objectif
      let quantity = document.querySelector("#quantity").value; //reference quantité
      let price = data.price;

      if (shoppingCart === null) {
        //!!null important sinon erreur et impossible de push car array pas créé
        shoppingCart = [];
      }
      let product = new Product(idCamera, chosenLense, quantity, price); // création d'un nouvel item avec les parametres définis (id, objectif, quantité, prix dans le panier)
      let found = shoppingCart.find(
        (e) =>
          e.idCamera === product.idCamera &&
          e.chosenLense === product.chosenLense
      );
      console.table(product);
      console.table(shoppingCart);
      if (!found) {
        shoppingCart.push(product); //push de l'element item créé dans le array shoppingCart
        console.log("pas trouvé");
      } else {
        found.quantity = parseInt(found.quantity) + parseInt(quantity);
        console.log(found.quantity);
        console.log("trouvé");
      }
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart)); //parsing
      console.table(shoppingCart); //test
      console.table(found);
    });
  });
