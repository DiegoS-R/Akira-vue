<script>
import productGroupComponent from "@/product/components/product-group.component.vue";
import {getProductByID, ignoreThisPart} from "@/product/services/products.service";
import {getCategoriesFullData} from "@/product/services/categories.service";
import bigProductComponent from "@/product/components/big-product.component.vue";
export default {
  components: {productGroupComponent, bigProductComponent},
  data() {
    return {
      categories: [],
      bigProduct: {},
      ignoreThisPart,
    }
  },
  props: {
    category:{
      default: ignoreThisPart,
      type: Number,
      required: false,
    },
    subcategory:{
      default: ignoreThisPart,
      type: Number,
      required: false,
    },
    franchise:{
      default: ignoreThisPart,
      type: Number,
      required: false,
    }
  },
  methods: {
    async getCategories() {
      await getCategoriesFullData()
          .then((response) => {
            console.log(response)
            this.categories = response;
          })
          .catch((error) => {
            console.log(error)
          });
    },
    getBigProduct() {
      if(this.category === ignoreThisPart) {getProductByID(this.categories[0].bigProduct).then((response)=>{this.bigProduct = response}) ; }
      else{
        if(this.subcategory === ignoreThisPart) {getProductByID(this.categories[this.category].bigProduct).then((response)=>{this.bigProduct = response}) }
        else{getProductByID(this.categories[this.category].subcategory[this.subcategory].bigProduct).then((response)=>{this.bigProduct = response}) ;}
      }
    },
    showProduct(product){
      this.$emit("product", product)
    }
  },
  created() {
    this.getCategories()
        .then((response)=>{
          this.getBigProduct();
        })
  },
}
</script>

<template>
  <bigProductComponent :categories="categories" :product="this.bigProduct"/>
  <div class="margin-2" v-if="category === ignoreThisPart">
    <div v-for="category in categories" :key="category.id" class="margin-2">
      <div class="margin-2">
        <div class="flex align-center text-4">{{category.title}}</div>
        <div class="flex align-center text-1">{{category.subtitle}}</div>
      </div>
      <product-group-component :categories="categories" :category="category.id" :rows="2" @product="showProduct" :is-manga="category.id === 2"/>
    </div>
  </div>
  <div class="margin-2" v-else-if="category !== ignoreThisPart && subcategory === ignoreThisPart">
    <div class="margin-2">
      <div class="margin-2">
        <div class="flex align-center text-4">{{categories[this.category].name}}</div>
      </div>
      <product-group-component :categories="categories" :category="category" :rows="10" @product="showProduct" :is-manga="category === 2"/>
    </div>
  </div>
  <div class="margin-2" v-else-if="category !== ignoreThisPart && subcategory !== ignoreThisPart && franchise === ignoreThisPart">
    <div class="margin-2">
      <div class="margin-2">
        <div class="flex align-center text-4">{{categories[category].subcategory[subcategory].name}}</div>
      </div>
      <product-group-component :categories="categories" :category="category" :subcategory="subcategory" :rows="10" @product="showProduct" :is-manga="category === 2"/>
    </div>
  </div>
  <div class="margin-2" v-else-if="category !== ignoreThisPart && subcategory !== ignoreThisPart && franchise !== ignoreThisPart">
    <div class="margin-2">
      <div class="margin-2">
        <div class="flex align-center text-4">{{categories[category].subcategory[subcategory].franchise[franchise].name}}</div>
      </div>
      <product-group-component :categories="categories" :category="category" :subcategory="subcategory" :franchise="franchise" :rows="10" @product="showProduct" :is-manga="category === 2"/>
    </div>
  </div>
</template>