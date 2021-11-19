<script setup>
import { SearchOutlined } from "@vicons/material";
const props = defineProps({
  msg: {
    type: String,
    default: "Hello World"
  }
});

</script>
<template>
  <button
    class="hover:text-black hover:bg-blue bg-black absolute py-2 px-4 rounded-xl border-2 border-blue text-blue inline-flex items-center"
  >
    <SearchOutlined class="w-5 h-5 mr-2 text-white" />
    <span>{{ msg }}</span>
  </button>
</template>
