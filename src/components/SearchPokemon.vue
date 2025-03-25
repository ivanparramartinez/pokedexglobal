<template>
  <div class="search-container">
    <IconSearch class="search-icon" />
    <input v-model="pokemonStore.searchQuery" placeholder="Search Pokémon" class="search-input" />
  </div>
</template>

<script setup>
import { usePokemonStore } from '../stores/pokemonStore'
import IconSearch from './icons/IconSearch.vue'
const pokemonStore = usePokemonStore()
</script>

<style scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.search-container:focus-within {
  box-shadow:
    0 1px 6px rgba(0, 0, 0, 0.15),
    0 1px 4px rgba(0, 0, 0, 0.12);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.search-input {
  padding: 20px 20px 20px 40px;
  border: none;
  width: 100%;
  font-size: 16px;
  background-color: transparent;
  outline: none;
}

.search-input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
</style>
