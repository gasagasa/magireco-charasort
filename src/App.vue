<template>
  <navbar></navbar>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  components: {
    Navbar,
  },
});
</script>

<style>
  .is-primary {
    background-color: #ff99cc !important;
  }
  ::-webkit-progress-value {
    background-color: #ff99cc !important;
  }
</style>
