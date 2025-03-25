<template>
  <div class="pokemon-icon" @click.stop="toggleFavoriteAndFilter(pokemon)">
    <IconStar :is-favorite="isFavorite(pokemon)" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import IconStar from './IconStar.vue'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  toggleFavoriteAndFilter: {
    type: Function,
    required: true,
  },
  isFavorite: {
    type: Function,
    required: true,
  },
})
</script>

<style scoped>
.pokemon-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
