<template>
  <li :class="classListItem" @click.stop="handleListItemClick(props.item)">
    <button
      :class="[classListBtn, isOpen && 'active']"
      v-if="props.item.childPageKeys && props.item.childPageKeys.length > 0"
      @click.stop="handleListItemClick(props.item)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path class="filled stroke-linejoin-round" d="M4 5h8l-4 6-4-6z"></path>
      </svg>
    </button>
    <a
      :class="[classListLink, activeListItem === props.item.key ? 'active' : '']"
      href="#"
      >{{ props.item.name }}</a
    >
    <ul
      :class="classListWithChild"
      v-if="isOpen"
      :style="{ paddingLeft: `${props.item.level * 16}px` }"
    >
      <TableOfContentsItem
        v-for="(child, index) in children"
        :key="child.key"
        :item="child"
        :index="index"
        :classListWithChild="'sidebar__list-with-child'"
        :classListItem="'sidebar__list-item'"
        :activeListItem="props.activeListItem"
        :classListBtn="'sidebar__list-btn'"
        :classListLink="'sidebar__list-link'"
        :flattenedPages="props.flattenedPages"
        @update:activeListItem="emit('update:activeListItem', $event)"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Page } from "@/types/Page";

const props = defineProps({
  item: {
    type: Object as () => Page,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  classListWithChild: {
    type: String,
  },
  classListItem: {
    type: String,
  },
  activeListItem: {
    type: String,
    default: "",
  },
  classListBtn: {
    type: String,
  },
  classListLink: {
    type: String,
  },
  flattenedPages: {
    type: Array as () => Page[],
    required: true,
  },
});

const emit = defineEmits<{
  (event: "update:activeListItem", value: string): void;
}>();

const childPages = ref([] as Page[]);

const isOpen = computed(() =>
  childPages.value.some((page) => page.key === props.item.key)
);

const toggleExpanded = (item: Page) => {
  const index = childPages.value.findIndex((page) => page.key === item.key);
  if (index >= 0) {
    childPages.value.splice(index, 1);
  } else {
    childPages.value.push(item);
  }
};

const handleListItemClick = (item: Page) => {
  emit("update:activeListItem", item.key);
  if (item.childPageKeys && item.childPageKeys.length > 0) {
    toggleExpanded(item);
  }
};

const children = computed(() => {
  if (props.item.childPageKeys) {
    return props.item.childPageKeys
      .map((key) => props.flattenedPages.find((page) => page.key === key) as Page)
      .filter((page) => page !== undefined);
  } else {
    return [];
  }
});
</script>
