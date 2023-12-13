document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Fast Cleaning ", img: "foto2.jpg", price: 35000 },
      { id: 2, name: "Deep Cleaning ", img: "foto2.jpg", price: 70000 },
      { id: 3, name: "Premium Treatment ", img: "foto2.jpg", price: 100000 },
      { id: 4, name: "Unyellowing ", img: "foto2.jpg", price: 80000 },
      { id: 5, name: "Repaint ", img: "foto2.jpg", price: 150000 },
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

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const ObjData = Object.fromEntries(data);
  const message = formatMessage(ObjData);
  window.open(
    "http://wa.me/62895394511551?text=" + encodeURIComponent(message)
  );
});

//format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
   Nama: ${obj.name}
   Email: ${obj.email}
   No HP: ${obj.phone}
Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
TOTAL: ${rupiah(obj.total)}
Terima kasih.`;
};

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
