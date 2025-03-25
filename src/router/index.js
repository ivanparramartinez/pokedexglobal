import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import PokemonListView from '@/views/PokemonListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView,
    },
    {
      path: '/pokemon',
      name: 'pokemonList',
      component: PokemonListView,
    },
  ],
})

export default router
