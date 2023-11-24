<script setup lang="ts">
import axios from "axios";
import MyButton from "@/components/MyButton.vue";
import DataTable from "primevue/datatable";
import Paginator from "primevue/paginator";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Column from "primevue/column";
import { watch, ref } from "vue";
import { formatCurrency } from "@/utils/currency";
import type { Product } from "@/types/database";
import { useRouter } from "vue-router";
import { formatDate } from "@/utils/date";

const products = ref<Product[]>([]);
const page = ref<number>(1);
const total = ref<number>(0);

const confirm = useConfirm();
const toast = useToast();
const router = useRouter();

const fetchProducts = async (currentPage: number) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/products?_page=${currentPage}&_limit=5&_sort=updatedAt&_order=desc`
    );

    products.value = res.data;
    total.value = +res.headers["x-total-count"];
  } catch (err) {
    console.error(err);
  }
};

const handlePageChange = (data: { page: number }) => {
  page.value = data.page + 1;
};

const handleConfirmDelete = (event: MouseEvent, id: string) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: "Do you want to delete this product?",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        await fetchProducts(
          page.value === 1 || products.value.length > 1
            ? page.value
            : page.value - 1
        );
        toast.add({
          severity: "success",
          summary: "Delete Success",
          detail: "The product has been deleted.",
          life: 3000,
        });
      } catch (err) {
        console.error(err);
      }
    },
  });
};

watch(page, () => fetchProducts(page.value), { immediate: true });
</script>

<template>
  <div class="px-8 py-4">
    <div>
      <MyButton
        label="Create"
        severity="success"
        @click="router.push('/products/create')"
      />
    </div>
    <div class="pt-4">
      <DataTable
        :value="products"
        showGridlines
        stripedRows
        tableStyle="min-width: 50rem"
      >
        <Column field="name" header="Name"></Column>
        <Column field="postDate" header="Post Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.postDate) }}
          </template>
        </Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column field="price" header="Price">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
        <Column field="id" header="Action">
          <template #body="slotProps">
            <div class="flex">
              <ConfirmPopup></ConfirmPopup>
              <MyButton
                icon="pi pi-pencil"
                severity="info"
                @click="router.push(`/products/${slotProps.data.id}`)"
              />
              <MyButton
                icon="pi pi-trash"
                severity="danger"
                class="ml-2"
                @click="handleConfirmDelete($event, slotProps.data.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
      <Paginator
        :rows="5"
        :totalRecords="total"
        @page="handlePageChange"
      ></Paginator>
    </div>
  </div>
</template>
