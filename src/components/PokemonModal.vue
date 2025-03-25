<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="pokemon-image-container">
        <div class="close-icon" @click="close">
          <IconClose />
        </div>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-image" />
      </div>
      <div class="modal-pokemon-info">
        <div class="text-class">
          <p class="text-row"><strong>Name: </strong>{{ pokemon.name }}</p>
          <hr />
          <p class="text-row"><strong>Weight: </strong>{{ pokemon.weight }}</p>
          <hr />
          <p class="text-row"><strong>Height: </strong>{{ pokemon.height }}</p>
          <hr />
          <p class="text-row">
            <strong>Types: </strong>
            <span v-for="(type, index) in pokemon.types" :key="index">
              {{ capitalizeFirstLetter(type.type.name)
              }}{{ index < pokemon.types.length - 1 ? ', ' : '' }}
            </span>
          </p>
          <hr />
        </div>
        <div class="modal-footer">
          <CompButton text="Share to my friends" @click="copyToClipboard" />
          <PokemonIcon
            :pokemon="pokemon"
            :toggleFavoriteAndFilter="toggleFavoriteAndFilter"
            :isFavorite="isFavorite"
            class="pokemon-icon-modal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { capitalizeFirstLetter } from '../helpers'
import { usePokemon } from '../composables/usePokemon'
import CompButton from './CompButton.vue'
import PokemonIcon from './icons/PokemonIcon.vue'
import IconClose from './icons/IconClose.vue'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const { toggleFavoriteAndFilter, isFavorite } = usePokemon()

function close() {
  emit('close')
}

function copyToClipboard() {
  const pokemonData = `Name: ${props.pokemon.name}, Weight: ${props.pokemon.weight}, Height: ${props.pokemon.height}, Types: ${props.pokemon.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ')}`
  navigator.clipboard.writeText(pokemonData).then(() => {
    alert('Pokemon data copied to clipboard!')
  })
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
  border-radius: 8px;
  max-width: 570px;
  width: 100%;
  overflow: hidden;
  margin: 1rem;
}

.modal-pokemon-info {
  padding: 1.4rem 2rem;
}

.pokemon-image-container {
  position: relative;
  background: url('src/assets/img/pokemonbackground.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
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

.text-class {
  font-size: 1.2rem;
  text-transform: capitalize;
  color: var(--text-color);
}

.text-class strong {
  font-weight: bold;
}

.text-class hr {
  border: none;
  border-top: 1px solid #e8e8e8;
}

.text-row {
  margin: 0.5rem 0;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
