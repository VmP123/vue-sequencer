<script setup>
import { ref } from 'vue'

let value = ref(true);

function toggle() {
	value.value = !value.value;
}
</script>

<template>
  <div @click="toggle" class="button" >
    <span v-show="value">X2</span>
  </div>
</template>

<style scoped>

</style>
