<script setup>
import { useBasket } from "@/store/basket.store";
import getPrice from "@/functions/getPrice";
const basketStore = useBasket();

const { pending, data: items } = await useFetch("products.json");
const basketData = ref([]);
const totalPrice = ref(0);

function getBasketData() {
  totalPrice.value = 0
  basketData.value = [];
  basketStore.value.forEach((item) => {
    const index = items.value.findIndex((el) => el.id === item.id);
    if (index !== -1) {
      basketData.value.push({ data: items.value[index], count: item.count });
      totalPrice.value += items.value[index].regular_price.value * item.count;
    }
  });
}

onMounted(() => {
  getBasketData();
});

watch(basketStore, () => {
  getBasketData();
});

function remove(id) {
  basketStore.removeItem(id);
}

function decrement(id) {
  basketStore.decrementCount(id);
}

function increment(id) {
  basketStore.incrementCount(id);
}

</script>

<template>
  <div class="flex flex-col">
    <p class="text-3xl mt-5 mb-5 font-bold">Shopping cart</p>
    <div v-if="basketData.length === 0" class="flex flex-col place-items-center">
      <p class="text-3xl">Basket is empty</p>
      <NuxtLink to="/" class="text-xl border p-4 rounded mt-5">Add items to basket</NuxtLink>
    </div>
    <div v-for="item in basketData" v-else>
      <div
        class="grid grid-cols-12 place-items-center justify-between border-b gap-2 text-sm sm:text-xl p-3"
      >
        <img :src="item.data.image" width="128" class="col-span-2" />
        <p class="md:col-span-7 col-span-4 justify-self-start">
          {{ item.data.title }}
        </p>
        <p class="md:col-span-1 col-span-2">
          {{ getPrice(item.data.regular_price, item.count) }}
        </p>
        <div class="flex place-items-center gap-2 md:col-span-1 col-span-2">
          <button @click="decrement(item.data.id)">-</button>
          <p>{{ item.count }}</p>
          <button @click="increment(item.data.id)">+</button>
        </div>
        <button @click="remove(item.data.id)" class="md:col-span-1 col-span-2">
          <img src="/remove.svg" width="32" />
        </button>
      </div>
    </div>
    <p class="mt-5 text-xl text-right">Subtotal: ${{ totalPrice.toFixed(2) }}</p>
    <NuxtLink
      to="https://github.com/wanabeunique"
      class="border p-3 text-xl mt-5 ml-auto justify-end"
      >Checkout</NuxtLink
    >
  </div>
</template>
