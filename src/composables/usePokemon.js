import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemonStore'

export function usePokemon() {
  const pokemonStore = usePokemonStore()
  const { allPokemon, displayedPokemon, favorites, currentFilter } = storeToRefs(pokemonStore)
  const { toggleFavorite, updateDisplayedPokemon } = pokemonStore

  function toggleFavoriteAndFilter(pokemon) {
    toggleFavorite(pokemon)
    updateDisplayedPokemon()
  }

  function updateDisplayedPokemon() {
    displayedPokemon.value =
      currentFilter.value === 'favorites' && favorites.value.length
        ? favorites.value
        : allPokemon.value
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
