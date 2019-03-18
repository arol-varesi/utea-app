
var app = new Vue({
  el: '#app',
  data: {
    product: 'Calzini',
    image: './assets/calzini_blu.jpeg',
    inventory: 100,
    details: ["80% cotone", "20% poliestere", "Unisex"],
    variants: [
      { 
        variantId: 2234,
        variantColor: "verde"
      },
      { 
        variantId: 2235,
        variantColor: "blu"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function () {
      this.cart += 1;
    }
  }
})

