<template>
  <transition-group name="fade" tag="div" class="absolute top-0 right-[5px] left-1/3">
    <component
        :is="flashMessage.component"
        v-for="(flashMessage, index) in flashMessages"
        :key="index"
        :message="flashMessage.message"
        :style="`top: ${index * 50}px`"
        class="z-50 overflow-hidden"
    />
  </transition-group>
</template>

<script lang="ts" setup>
import FlashMessagesService from '@/services/FlashMessageServices';

const flashMessages = FlashMessagesService.getInstance().message
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
