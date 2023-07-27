<template>
  <TableOfContentsNav :flattenedPages="flattenedPages" :loading="loading" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getPages } from '@/api/pages';
import { Page } from '@/types/Page';
import TableOfContentsNav from './TableOfContentsNav.vue';

const flattenedPages = ref<Page[]>([]);
const loading = ref(true);

onMounted(async () => {
  const pages = await getPages();
  flattenedPages.value = Object.values(pages);
  loading.value = false;
});
</script>
