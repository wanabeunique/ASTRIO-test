<script setup>
const { data: items } = await useFetch("products.json");
const { data: brands } = await useFetch("brands.json");

items.value = items.value.map((item) => {
  return { ...item, brandName: getBrandNameById(item.brand) };
});

const activeBrand = ref(null);
const filteredItems = ref(JSON.parse(JSON.stringify(items.value)));

function setBrand(brand) {
  activeBrand.value = brand.id;
  filteredItems.value = items.value.filter((item) => item.brand === brand.id);
}

function removeActiveBrand() {
  activeBrand.value = null;
  filteredItems.value = items.value;
}

function getBrandNameById(id) {
  const brand = brands.value.find((brand) => brand.id == id);
  return brand.title;
}

function getActiveBrandName() {
  const brand = brands.value.find((brand) => brand.id == activeBrand.value);
  return brand.title;
}
</script>

<template>
  <div class="flex gap-3 sm:gap-10">
    <div class="mt-8 text-sm sm:text-xl">
      <button @click="removeActiveBrand()" class="p-1 w-max">All brands</button>
      <div v-for="brand in brands">
        <button @click="setBrand(brand)" class="p-1 w-max">
          {{ brand.title }}
        </button>
      </div>
    </div>
    <div class="mt-8">
      <p v-if="activeBrand === null" class="text-2xl">Catalog</p>
      <p v-else class="text-2xl">Brand: {{ getActiveBrandName() }}</p>
      <CatalogItems :items="filteredItems" />
    </div>
  </div>
</template>
