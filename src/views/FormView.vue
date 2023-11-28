<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import TextInput from "@/components/TextInput.vue";
import NumberInput from "@/components/NumberInput.vue";
import Button from "primevue/button";
import { computed, watchEffect } from "vue";
import DateInput from "@/components/DateInput.vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const schema = Yup.object().shape({
  name: Yup.string().required(),
  postDate: Yup.date()
    .max(new Date())
    .required()
    .default(() => new Date()),
  quantity: Yup.number().min(0).required(),
  price: Yup.number().min(0).required(),
});
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormValues extends Yup.InferType<typeof schema> {}

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(schema),
});

const isCreating = computed(() => route.params.id === "create");

watchEffect(async () => {
  if (route.params.id !== "create") {
    try {
      const res = await axios.get(
        `http://localhost:3000/products/${route.params.id}`
      );
      setValues(res.data);
    } catch (err) {
      console.error(err);
    }
  }
});

const onSubmit = handleSubmit(async (data: FormValues) => {
  try {
    const postData = { ...data, updatedAt: new Date() };
    if (isCreating.value) {
      await axios.post("http://localhost:3000/products", postData);
      toast.add({
        severity: "success",
        summary: "Created Success",
        detail: "The product has been created.",
        life: 3000,
      });
    } else {
      await axios.put(
        `http://localhost:3000/products/${route.params.id}`,
        postData
      );
      toast.add({
        severity: "success",
        summary: "Updated Success",
        detail: "The product has been updated.",
        life: 1000000,
      });
    }
    // router.push("/");
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <form @submit="onSubmit" class="px-8 py-4">
    <h1>Product Form</h1>
    <TextInput label="Name" name="name" />
    <NumberInput label="Quantity" name="quantity" />
    <NumberInput
      label="Price"
      name="price"
      mode="currency"
      currency="USD"
      locale="en-US"
      :max-fraction-digits="3"
    />
    <DateInput label="Post date" name="postDate" :max-date="new Date()" />
    <div class="mt-4">
      <Button type="submit" :label="isCreating ? 'Create' : 'Update'" />
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        class="ml-2"
        @click="router.push('/')"
      />
    </div>
  </form>
</template>
