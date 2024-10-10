<script setup>
import { ref } from 'vue'

let value = ref(true);

function toggle() {
	value.value = !value.value;
}
</script>

<template>
  <div class="button step-button" >
    <span v-show="value"><slot></slot></span>
  </div>
</template>
