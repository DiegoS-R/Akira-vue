<script>
import {getProductList, getProductListLike, ignoreThisPart} from "@/product/services/products.service";
export default {
    props:{
      categories: {
        required: true,
      },
      rows: {
        required: false,
        default: 2,
      },
      category:{
        type: Number,
        required: false,
        default: ignoreThisPart,
      },
      subcategory:{
        type: Number,
        required: false,
        default: ignoreThisPart,
      },
      franchise:{
        type: Number,
        required: false,
        default: ignoreThisPart,
      },
      searchLabel:{
        required: false,
        default: false,
      },
      isManga:{
        required: false,
        default: false,
      }
    },
    data(){
      return{
        products: [],
        productsHeight: this.productsHeight = 14 + 15*(this.rows-1),
        limit:this.rows*15,
      }
    },
    methods: {
      getProducts(){
        if(this.searchLabel){
          getProductListLike(this.searchLabel, this.limit, this.category, this.subcategory, this.franchise)
              .then((response)=>{
                for(let i = 0; i < response.length; i++){
                  response[i].imageOpacity = 1;
                  response[i].showText = 0;
                }
                this.products = response;
              })
              .catch((error)=>{
                console.log(error)
              });
        }
        else{
          getProductList(this.limit,this.category, this.subcategory, this.franchise)
              .then((response)=>{
                for(let i = 0; i < response.length; i++){
                  response[i].imageOpacity = 1;
                  response[i].showText = 0;
                }
                this.products = response;
              })
              .catch((error)=>{
                console.log(error)
              });
        }
      },
      showText(product) {
        product.showText = 1;
        product.imageOpacity = 0.3;
      },
      hideText(product) {
        product.showText = 0;
        product.imageOpacity = 1;
      },
      showProduct(product){
        this.$emit("product", product)
      }
    },
    created() {
      if(this.isManga) this.productsHeight = 21 + 22*(this.rows-1);
      this.getProducts();
    },
}
</script>

<template>
  <div class="flex-auto gap-2 products" :style="`max-height: ${productsHeight}rem`">
    <div class="width-min" v-for="product in products" :key="product.id" @mouseenter="showText(product)" @mouseleave="hideText(product)" @click="showProduct(product)"
         :class="this.isManga?'manga-black-background':'black-background border-radius'">
      <pv-image
          :src="`/images/product-images/${product.id}/${product.image[0]}`"
          :alt="product.name"
          class="background-image flex-col align-center"
          :style="`opacity: ${product.imageOpacity};`"
          :class="this.isManga?'manga-image':'image'"
      />
      <div class="data" :style="`opacity: ${product.showText};`">
        <div class="product-text text-2 montserrat title">
          {{ product.name }}
        </div>
        <div class="product-text text-0 montserrat franchise">
          {{categories[product.category].subcategory[product.subcategory].franchise[product.franchise].name}}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.image > img {
  background-color: #fff;
  color: var(--text-color);
  width: 14rem;
  height: 14rem;
  border-radius: 2rem;
  object-fit: contain;
}
.manga-image > img {
  background-color: var(--surface-b);
  color: var(--text-color);
  width: 14rem;
  height: 21rem;
  object-fit: contain;
}
.black-background{
  background-color: #000;
  width: 14rem;
  height: 14rem;
}
.manga-black-background{
  background-color: #000;
  width: 14rem;
  height: 21rem;
}
.background-image{
  transition: opacity 0.3s;
  background-size: auto 100%;
  background-repeat: no-repeat;
}
.border-radius{
  border-radius: 2rem;
}
.product-text{
  color: #fff;
  opacity: 100%;
}
.data{
  width: 10rem;
  height: auto;
  max-height: 4rem;
  position: relative;
  overflow: hidden;
  top: -6rem;
  margin-left: 2rem;
  transition: opacity 0.3s;
}
.title{
  max-height: 3.1rem;
  line-height: 1.1;
  overflow: hidden;
}
.franchise{
  max-height: 1rem;
  overflow: hidden;
}
.products{
  horiz-align: center;
  overflow: hidden;
  justify-content: center;
}
</style>