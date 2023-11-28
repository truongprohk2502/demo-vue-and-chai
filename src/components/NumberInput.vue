<script setup lang="ts">
import InputNumber, { type InputNumberProps } from "primevue/inputnumber";
import { useField } from "vee-validate";
import { toRefs, defineProps, defineOptions } from "vue";

export interface Props extends /* @vue-ignore */ InputNumberProps {
  label: string;
  name: string;
  initValue?: string;
}

const props = defineProps<Props>();

const { name, label, initValue } = toRefs(props);

const { value, errorMessage, handleBlur, setValue } = useField(
  name,
  undefined,
  {
    initialValue: initValue,
  }
);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="flex flex-column gap-2">
    <label :for="name">{{ label }}</label>
    <InputNumber
      :class="{ 'p-invalid': errorMessage }"
      :inputId="name"
      :min="0"
      :modelValue="value ? +value : null"
      @input="setValue($event.value as string)"
      @blur="handleBlur($event.originalEvent)"
      v-bind="$attrs"
    />
    <small class="p-error">{{ errorMessage || "&nbsp;" }}</small>
  </div>
</template>
