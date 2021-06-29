window.onload = getData();

function createCameraDisplay(response) {
  for (let camera of response) {
    document.querySelector("#produits").innerHTML += `<div class="card"> 
                    <img src="${camera.imageUrl}" class="card-img-top" alt="teste alternatif"/>
                    <div class="card-body">
                        <h5 class="card-title">${camera.name}</h5>
                        <p class="card-text">${camera.description}</p> 
                        <a href="item.html?id=${camera._id}" class="btn btn-warning">En savoir plus</a>
                    </div>
                </div>`;
  }
}

function getData() {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      createCameraDisplay(response);
    });
}
