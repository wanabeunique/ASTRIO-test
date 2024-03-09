export default function getPrice(price, count = 1) {
  let currency = "";
  switch (price.currency) {
    case "USD":
      currency = "$";
      break;
  }
  return currency + (price.value * count).toFixed(2);
}
