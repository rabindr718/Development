const cart = ["Mango", "Lemon", "Orange"];
createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
    //Proceed to payments
    // proceedtoPayment(orderId);
    return orderId;
  })
  .then(function (orderId) {
    return proceedtoPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    console.log(err.message);
  })
  .then(function (orderId) {
    console.log("No matter what happens , it will be definetly called");
  });

///Producer
function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    //createOrder
    //validateCart
    //orderId
    if (!validateCart(cart)) {
      const err = new Error("Cart is Not Found");
      reject(err);
    }
    const orderId = "17203";
    if (orderId) {
      setTimeout(function () {
        resolve(orderId);
      }, 3000);
    }
  });
  return pr;
}

function proceedtoPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Paymnets Successfull");
  });
}

function validateCart(cart) {
  //True the Promise return value
  return true;
}
