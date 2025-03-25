import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref([])
  const displayedPokemon = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const limit = ref(50)
  const offset = ref(0)

  const fetchAllPokemon = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${offset.value}`,
      )
      const newPokemon = data.results.filter(
        (pokemon) => !pokemonList.value.some((p) => p.url === pokemon.url),
      )
      pokemonList.value = [...pokemonList.value, ...newPokemon]
      updateDisplayedPokemon()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const allPokemon = computed(() => pokemonList.value)

  const filteredPokemon = computed(() => {
    if (!searchQuery.value) {
      return pokemonList.value
    }
    return pokemonList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const cleanSearchQuery = () => {
    searchQuery.value = searchQuery.value.trim()
  }

  const searchPokemon = async () => {
    cleanSearchQuery()
    updateDisplayedPokemon()
    if (!searchQuery.value) {
      return
    }
    if (filteredPokemon.value.length === 0) {
      loading.value = true
      error.value = null
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        const newPokemon = data.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
        displayedPokemon.value = newPokemon
      } catch (err) {
        error.value = err
        displayedPokemon.value = []
      } finally {
        loading.value = false
      }
    } else {
      displayedPokemon.value = filteredPokemon.value
    }
  }

  const debounce = (func, wait) => {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  const debouncedSearch = debounce(() => {
    searchPokemon()
  }, 300)

  watch(searchQuery, () => {
    debouncedSearch()
  })

  const updateDisplayedPokemon = () => {
    displayedPokemon.value = filteredPokemon.value
  }

  return {
    pokemonList,
    displayedPokemon,
    loading,
    error,
    fetchAllPokemon,
    allPokemon,
    searchQuery,
    filteredPokemon,
    limit,
    offset,
    updateDisplayedPokemon,
    searchPokemon,
    cleanSearchQuery,
  }
})
