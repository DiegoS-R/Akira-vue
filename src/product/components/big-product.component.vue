<script>
export default{
  props:{
    product: {
      required: true,
    },
    categories: {
      required: true,
    }
  },
  data(){
    return{

    }
  },
}
</script>

<template>
  <div class="width-full">
    <pv-image class="big-component" :src="`/images/category-images/${product.id}/big.png`"></pv-image>
  </div>
</template>

<style>
.big-component {
  width:100%
}
.big-component > img{
  width: 100%;
}
</style>