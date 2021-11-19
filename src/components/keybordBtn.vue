<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: "Hello World"
  }
});

</script>
<template>
  <button
    class="hover:text-black w-fit hover:bg-blue bg-black py-2 px-4 rounded-xl border-2 border-blue text-blue"
  >
    <span>{{ msg }}</span>
  </button>
</template>
