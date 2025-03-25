import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemonStore'

export function usePokemon() {
  const pokemonStore = usePokemonStore()
  const { allPokemon, displayedPokemon, favorites, currentFilter } = storeToRefs(pokemonStore)

  function toggleFavoriteAndFilter(pokemon) {
    pokemonStore.toggleFavorite(pokemon)
    if (currentFilter.value === 'favorites') {
      if (favorites.value.length === 0) {
        currentFilter.value = 'all'
        displayedPokemon.value = allPokemon.value
      } else {
        displayedPokemon.value = favorites.value
      }
    }
  }

  function isFavorite(pokemon) {
    return favorites.value.some((fav) => fav.name === pokemon.name)
  }

  return {
    toggleFavoriteAndFilter,
    isFavorite,
    currentFilter,
  }
}
