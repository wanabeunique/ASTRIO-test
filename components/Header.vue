<script setup>
import { useBasket } from "@/store/basket.store";
const basketStore = useBasket();
</script>

<template>
  <header class="pt-5 pb-5 flex justify-between border-b place-items-center">
    <NuxtLink to="/" class="h-max">
      <NuxtImg src="images/logo.png" />
    </NuxtLink>
    <NuxtLink to="basket" class="relative">
      <div
        class="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full w-5 h-5 flex place-items-center justify-center text-white"
      >
        {{ basketStore.value.length }}
      </div>
      <NuxtImg width="32" height="32" src="basket.svg" />
    </NuxtLink>
  </header>
</template>
