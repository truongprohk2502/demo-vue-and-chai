<script setup lang="ts">
import { formatDate } from "@/utils/date";
import Calendar, { type CalendarProps } from "primevue/calendar";
import { useField } from "vee-validate";
import { toRefs } from "vue";

export interface Props extends /* @vue-ignore */ CalendarProps {
  label: string;
  name: string;
  initValue?: string;
}

const props = defineProps<Props>();

const { name, label, initValue } = toRefs(props);

const { value, errorMessage, handleBlur, handleChange, setValue } = useField(
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
    <Calendar
      :class="{ 'p-invalid': errorMessage }"
      showIcon
      :inputId="name"
      :modelValue="value ? formatDate(value) : null"
      @input="handleChange"
      @date-select="(val: Date) => setValue(formatDate(val))"
      @blur="handleBlur($event.originalEvent)"
      v-bind="$attrs"
    />
    <small class="p-error">{{ errorMessage || "&nbsp;" }}</small>
  </div>
</template>
