<template>
  <div class="skeleton">
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
  </div>
</template>

<style scoped>
.skeleton {
  display: grid;
  gap: 24px;
}

.skeleton__item {
  height: 24px;
  width: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-animation 1s infinite linear;
  border-radius: 8px;
}

@keyframes skeleton-animation {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
