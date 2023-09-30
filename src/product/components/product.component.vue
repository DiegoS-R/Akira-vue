<script>
import {getCategoriesFullData} from "@/product/services/categories.service";

export default {
  data(){
    return{
      cart: [
        {id: 0,amount:5},
        {id: 20,amount:10}
      ],
      cardId: -1,
      categories: [],
      selectedImageSrc: "/images/product-images/default.png",
      selectedImage: 0,
    }
  },
  props:{
    product: {
      required: true,
    },
  },
  methods: {
    getCartArticlePos(){
      //Si existe en el carrito, devuelve su posicion
      for(let i = 0; i < this.cart.length; i++){
        if(this.cart.id === this.product.id){
          return i;
        }
      }
      //sino, lo inserta y devuelve como id la ultima posicion del carrito
      this.cart.push({id: this.product.id, amount:0})
      return this.cart.length -1;
    },
    addOne(){
      this.cart[this.cardId] += 1;
    },
    buy(){
      this.addOne();
      this.$emit('cart')
    }
  },
  created() {
    this.cardId = this.getCartArticlePos();
    getCategoriesFullData()
        .then((response)=>{
          this.categories = response;
        })
  },
}
</script>

<template>
  <div class="flex flex-row align-center">
    <div class="flex flex-col width-auto">
      <pv-image :src="`/images/product-images/${this.product.id}/${this.product.image[this.selectedImage]}`" alt="Main Picture" class="main-image"/>
    </div>
    <div class="flex flex-col width-auto align-left margin-3-width ">
        <div>
              <div class="margin-2-height">
                  <div class="text-3">{{categories[product.category].subcategory[product.subcategory].franchise[product.franchise].name}}</div>
                  <div class="text-4">{{product.name}}</div>
              </div>
              <div class="text-4">S/. {{product.price.toFixed(2)}}</div>
        </div>
        <div>
              <div>
                  <div>{{product.stock}} Unidades Disponibles</div>
                  <div id="link">Se puede comprar un máximo de 20 unidades</div>
                  <div class="flex gap-1">
                    <pv-button label="Comprar" size="large" severity="secondary" rounded @click="buy"/>
                    <pv-button label="Agregar al Carrito" size="large" severity="secondary" outlined rounded @click="addOne"/>
                  </div>
              </div>
        </div>


    </div>
  </div>

</template>

<style>
button {
  width: 16rem;
}
.main-image{
  height: 30rem;
  width: auto;
}
.main-image > img{
  height: 30rem;
  width: auto;
}
</style>