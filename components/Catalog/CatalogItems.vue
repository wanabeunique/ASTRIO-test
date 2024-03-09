<script setup>
const props = defineProps({
  items: Array,
});
</script>

<template>
  <section class="grid grid-cols-2 gap-3 xs:gap-10 md:grid-cols-3">
    <div v-for="item in items">
      <CatalogItem :item="item"/> 
    </div>
  </section>
</template>
