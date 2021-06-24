window.onload = createConfirmation();

const displayDate = (document.querySelector("#displayDate").textContent =
  cDay + " / " + cMonth + " / " + cYear);

const clearLocalStorage = document.querySelector("#index-reload");
clearLocalStorage.addEventListener("click", () => {
  clearBasket();
});

function createConfirmation() {
  const data = JSON.parse(localStorage.getItem("confirmation"));

  console.log(data.contact);

  document.querySelector("#clientName").textContent = `${
    data.contact.firstName + " " + data.contact.lastName
  }`;
  document.querySelector(
    "#userFirstName"
  ).textContent = `${data.contact.firstName}`;
  document.querySelector("#userEmail").textContent = `${data.contact.email}`;

  document.querySelector("#orderNumber").innerHTML = data.orderId;

  localStorage.getItem("grandTotal");
  console.log(localStorage.getItem("grandTotal")); //pour test
  let grandTotal = JSON.parse(window.localStorage.getItem("grandTotal"));
  document.querySelector("#totalPrice").innerHTML = `${priceConversion(
    grandTotal
  )}`;
}
