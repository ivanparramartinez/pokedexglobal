<template>
  <div class="pokemon-list-view">
    <SearchPokemon />
    <div v-if="displayedPokemon.length > 0">
      <div class="pokemon-list">
        <div class="pokemon-card" v-for="pokemon in displayedPokemon" :key="pokemon.name">
          <p class="pokemon-name">{{ pokemon.name }}</p>
          <div class="pokemon-icon" @click="toggleFavoriteAndFilter(pokemon)">
            <IconStar :is-favorite="isFavorite(pokemon)" />
          </div>
        </div>
      </div>
    </div>
    <div class="pokemon-not-found" v-else-if="!loading">
      <h1 class="title">Uh-oh!</h1>
      <p class="description">You look lost on your journey!</p>
      <CompButton text="Go back home" @click="goBack" />
    </div>
  </div>
  <ListButtons v-if="displayedPokemon.length > 0" v-model="currentFilter" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemonStore'
import SearchPokemon from '@/components/SearchPokemon.vue'
import ListButtons from '@/components/ListButtons.vue'
import CompButton from '@/components/CompButton.vue'
import IconStar from '@/components/icons/IconStar.vue'

const pokemonStore = usePokemonStore()

const { allPokemon, displayedPokemon, loading, searchQuery, favorites } = storeToRefs(pokemonStore)
const { toggleFavorite, updateDisplayedPokemon } = pokemonStore
const currentFilter = ref('all')

function toggleFavoriteAndFilter(pokemon) {
  toggleFavorite(pokemon)
  if (currentFilter.value === 'favorites') {
    if (favorites.value.length === 0) {
      currentFilter.value = 'all'
      displayedPokemon.value = allPokemon.value
    } else {
      displayedPokemon.value = favorites.value
    }
  }
}

onMounted(async () => {
  if (!allPokemon.value.length) {
    await pokemonStore.fetchAllPokemon()
  }
})

function goBack() {
  displayedPokemon.value = allPokemon.value
  searchQuery.value = ''
}

function isFavorite(pokemon) {
  return favorites.value.some((fav) => fav.name === pokemon.name)
}

watch(
  () => currentFilter.value,
  (newVal) => {
    if (newVal === 'all') {
      displayedPokemon.value = allPokemon.value
    } else if (newVal === 'favorites') {
      displayedPokemon.value = favorites.value
    }
  },
)
</script>

<style scoped>
.pokemon-list-view {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  width: 100%;
  margin: 0 auto;
}

.pokemon-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.pokemon-card {
  background-color: white;
  padding: var(--padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pokemon-name {
  font-weight: semibold;
  font-size: 1.5rem;
  text-transform: capitalize;
  color: var(--text-color);
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

.pokemon-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--gap);
  height: 100%;
  margin-top: 30px;
}

.title {
  font-weight: bold;
  text-align: center;
  font-size: 3rem;
}

.description {
  font-size: 1.5em;
  text-align: center;
}

@media (min-width: 1024px) {
  .pokemon-list-view {
    max-width: 570px;
  }
}
</style>
