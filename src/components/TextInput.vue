<script setup lang="ts">
import InputText, { type InputTextProps } from "primevue/inputtext";
import { useField } from "vee-validate";
import { toRefs } from "vue";

export interface Props extends /* @vue-ignore */ InputTextProps {
  label: string;
  name: string;
  initValue?: string;
}

const props = defineProps<Props>();

const { name, label, initValue } = toRefs(props);

const { value, errorMessage, handleBlur, handleChange } = useField(
  name,
  undefined,
  {
    initialValue: initValue || "",
  }
);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="flex flex-column gap-2">
    <label :for="name">{{ label }}</label>
    <InputText
      type="text"
      :class="{ 'p-invalid': errorMessage }"
      :id="name"
      :name="name"
      :value="value"
      @input="handleChange"
      @blur="handleBlur"
      v-bind="$attrs"
    />
    <small class="p-error">{{ errorMessage || "&nbsp;" }}</small>
  </div>
</template>
