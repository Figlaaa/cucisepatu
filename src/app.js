document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil ", img: "foto2.jpg", price: 100000 },
      { id: 2, name: "Robusta Brazi ", img: "foto2.jpg", price: 200000 },
      { id: 3, name: "Robusta Braz ", img: "foto2.jpg", price: 300000 },
      { id: 4, name: "Robusta Bra ", img: "foto2.jpg", price: 400000 },
      { id: 5, name: "Robusta Br ", img: "foto2.jpg", price: 500000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      this.items.push(newItem);
      this.quantity++;
      this.total += newItem.price;
      console.log(this.total);
    },
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
