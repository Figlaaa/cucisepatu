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
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belom ada barang atau cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada di cart ,apakah barang berbeda atau sama dengan ada yang di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada ,tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan idnya
      const cartItem = this.items.find((item) => item.id === id);
      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        //telusuri 1 1
        this.items = this.items.map((item) => {
          //jika bkan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
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
