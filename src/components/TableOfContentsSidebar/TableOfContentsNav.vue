<template>
  <div class="sidebar">
    <div v-if="loading">
      <SkeletonLoader />
    </div>
    <nav v-else class="sidebar__nav">
      <ul class="sidebar__list">
        <TableOfContentsItem
          v-for="(item, index) in topLevelPages"
          :key="item.key"
          :item="item"
          :index="index"
          :classListWithChild="'sidebar__list-with-child'"
          :classListItem="'sidebar__list-item'"
          :activeListItem="activeListItem"
          :classListBtn="'sidebar__list-btn'"
          :classListLink="'sidebar__list-link'"
          :flattenedPages="flattenedPages"
          @update:activeListItem="setActiveListItem"
        />
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import SkeletonLoader from '@/components/SkeletonLoader.vue';
import TableOfContentsItem from '@/components/TableOfContentsSidebar/TableOfContentsItem.vue';
import { Page } from '@/types/Page';

const props = defineProps({
  flattenedPages: {
    type: Array as () => Page[],
    required: true,
  },
  loading: {
    type: Boolean,
  },
});

const activeListItem = ref('');
const topLevelPages = computed(() => {
  return props.flattenedPages.filter((page) => page.level === 0);
});


const setActiveListItem = (key: string) => {
  activeListItem.value = key;
};
</script>

<style lang="scss">
.sidebar {
  max-width: 300px;
  overflow-y: auto;
  height: 100vh;
  padding: 40px 24px;
  background-color: rgba(243, 246, 252, 0.6);
  box-shadow: 0px 2px 24px 0px rgba(127, 137, 154, 0.1);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #c8d2fe;
  }

  &::-webkit-scrollbar-thumb {
    background: #5564d3;
    border-radius: 8px;
  }

  &__list-item {
    position: relative;
    padding-left: 24px;
    margin: 12px 0;
    font-size: 14px;
    font-weight: 500;
  }

  &__list-link {
    font: inherit;
    &.active {
      font-weight: 600;
      color: #252e8e;
    }
    &:hover {
      color: #252e8e;
    }
  }
  .sidebar__list-btn {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    flex-shrink: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s ease;
    transform: rotate(-90deg);
    &.active {
      transform: rotate(0);
    }
  }
}
</style>
