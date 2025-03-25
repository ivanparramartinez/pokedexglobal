<template>
  <div class="splash-view" v-if="!loading">
    <img src="@/assets/img/pikachulogo.svg" alt="Pikachu Logo" class="img-logo" />
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="description">
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>
    <comp-button text="Get started" @click="showLoading" />
  </div>
  <div class="loading-view" v-else>
    <img src="@/assets/img/pokeball.svg" alt="Loading" class="img-loading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemonStore'
import CompButton from '@/components/CompButton.vue'

const loading = ref(false)
const router = useRouter()
const pokemonStore = usePokemonStore()

async function showLoading() {
  loading.value = true
  await pokemonStore.fetchAllPokemon()
  setTimeout(() => {
    loading.value = false
    router.push({ name: 'pokemonList' })
  }, 2000)
}
</script>

<style scoped>
.title {
  font-weight: bold;
}

.splash-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.loading-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pause-spin {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(90deg);
  }
  66% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.img-loading {
  width: 100px;
  height: 100px;
  animation:
    spin 1s linear infinite,
    pause-spin 2s linear infinite;
}

h1 {
  font-size: 1.5em;
  text-align: center;
}

.img-logo {
  width: 325px;
}

.description {
  font-size: 1.5em;
  text-align: center;
  margin-top: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  width: 100%;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2em;
  }

  .description {
    font-size: 1.5em;
    width: 50%;
  }

  .img-loading {
    width: 150px;
    height: 150px;
    animation:
      spin 1s linear infinite,
      pause-spin 2s linear infinite;
  }
}
</style>
