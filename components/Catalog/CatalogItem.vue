<script setup>
import { useBasket } from "@/store/basket.store";
import getPrice from "@/functions/getPrice";

const props = defineProps({
  item: Object,
});

const basketStore = useBasket();
const showButton = ref(false);
const addedToBasket = ref(false);

const addToBasket = () => {
  basketStore.addToBasket(props.item.id);
  if (window.innerWidth > 768){
    addedToBasket.value = true;
  }
  showButton.value = true;
  setTimeout(() => {
    addedToBasket.value = false;
  }, 5000);
};

function shouldShowButton() {
  return showButton.value || window.innerWidth < 1024;
}
</script>

<template>
  <div
    class="relative text-sm sm:text-xl"
    @mouseenter="showButton = true"
    @mouseleave="showButton = false"
  >
    <img :src="item.image" />
    <p>{{ item.title }}</p>
    <p>{{ item.brandName }}</p>
    <p>
      {{ getPrice(item.regular_price) }}
    </p>
    <button
      class="absolute right-0 bottom-0"
      v-if="shouldShowButton"
      @click="addToBasket"
    >
      <NuxtLink
        to="/basket"
        v-if="addedToBasket"
        class="rounded p-2 bg-red-500 text-white sm:p-2"
        >To basket</NuxtLink
      >
      <NuxtImg v-else width="32" height="32" src="/basket.svg" />
    </button>
  </div>
</template>
