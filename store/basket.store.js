export const useBasket = defineStore("basket", {
  state: () => ({
    value: [],
  }),
  actions: {
    incrementCount(id) {
      const position = this.value.findIndex((item) => item.id === id);
      if (position !== -1) {
        this.value[position].count++;
      }
    },
    decrementCount(id) {
      const position = this.value.findIndex((item) => item.id === id);
      if (position !== -1 && this.value[position].count > 1) {
        this.value[position].count--;
      }
    },
    removeItem(id) {
      const position = this.value.findIndex((item) => item.id === id);
      if (position !== -1) {
        this.value.splice(position, 1);
      }
      console.log(position)
    },
    addToBasket(id) {
      const position = this.value.findIndex((item) => item.id === id);
      if (position === -1) {
        this.value.push({ id, count: 1 });
      } else this.value[position].count++;
      console.log(this.value);
    },
  },
  persist: {
    storage: persistedState.cookies,
  },
});
