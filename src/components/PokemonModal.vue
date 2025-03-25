<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <p><strong>Name: </strong>{{ pokemon.name }}</p>
      <p><strong>Weight: </strong>{{ pokemon.weight }}</p>
      <p><strong>Height: </strong>{{ pokemon.height }}</p>
      <p>
        <strong>Types: </strong>
        <span v-for="(type, index) in pokemon.types" :key="index">
          {{ capitalizeFirstLetter(type.type.name)
          }}{{ index < pokemon.types.length - 1 ? ', ' : '' }}
        </span>
      </p>
      <div class="modal-footer">
        <CompButton text="Share to my friends" @click="close" />
        <PokemonIcon
          :pokemon="pokemon"
          :toggleFavoriteAndFilter="toggleFavoriteAndFilter"
          :isFavorite="isFavorite"
          class="pokemon-icon-modal"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { capitalizeFirstLetter } from '../helpers'
import CompButton from './CompButton.vue'
import PokemonIcon from './icons/PokemonIcon.vue'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function toggleFavoriteAndFilter(pokemon) {
  // ...existing code...
}

function isFavorite(pokemon) {
  // ...existing code...
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  margin: 1rem;
  border-radius: 8px;
  max-width: 570px;
  width: 100%;
  text-align: center;
}

.modal-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pokemon-icon {
  background-color: var(--tertiary-color);
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pokemon-icon-modal {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--tertiary-color);
  cursor: pointer;
}
</style>
