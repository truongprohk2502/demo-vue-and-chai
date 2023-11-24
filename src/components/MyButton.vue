<script setup lang="ts">
import { defineProps } from "vue";
import Button, { type ButtonProps } from "primevue/button";

export interface Props extends /* @vue-ignore */ ButtonProps {}

defineProps<Props>();
</script>

<template>
  <Button />
</template>
