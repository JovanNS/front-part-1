<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import { useAuth } from "@/stores/useAuth";
import { computed } from 'vue'


const route = useRoute()

const path = computed(() => route.path)

</script>

<template>
  <header >
    <Navbar />
  </header>

  <main>
    <RouterView :key="route.fullPath" />
  </main>

  <Footer></Footer>
  
  <notifications position="bottom center" width="50%" />
</template>
