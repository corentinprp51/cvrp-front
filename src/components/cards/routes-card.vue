<template>
  <div class="flex flex-col items-center min-h-[750px] rounded-[20px] shadow bg-white pt-[18px]">
    <div class="w-full flex flex-col items-center">
      <second-title class="w-fit text-center">Routes</second-title>
      <ul class="self-start w-full text-[16px] mt-[15px]">
        <li v-for="(route, index) in routes" :class="index % 2 ? 'bg-white' : 'bg-[#F4F4F4]'" class="flex items-center py-[14px]">
          <span class="ml-[8px] mr-[100px]">
            <input type="checkbox" :checked="index === 0" @change="emit('inputChange', $event)" class="w-[30px] h-[30px] cursor-pointer" :value="index" />
          </span>
          Route {{ index + 1 }}
        </li>
      </ul>
    </div>
    <div class="mt-[30px] w-full flex flex-col items-center">
      <second-title class="w-fit text-center">Parameters</second-title>
      <ul class="self-start w-full text-[16px] mt-[15px]">
        <li class="grid grid-cols-[60%_40%] py-[14px] px-[8px] bg-[#F4F4F4]"><span class="font-semibold">Time Limit:</span> <span class="text-[18px]">{{ parameters.time_limit }}</span></li>
        <li class="grid  grid-cols-[60%_40%] py-[14px] px-[8px]"><span class="font-semibold">GAP:</span> <span class="text-[18px]">{{ parameters.gap }}</span></li>
        <li class="grid grid-cols-[60%_40%] py-[14px] px-[8px] bg-[#F4F4F4]"><span class="font-semibold">Vehicle Max Capacity:</span> <span class="text-[18px]">{{ parameters.vehicle_max_capacity }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SecondTitle from '@/components/titles/second-title.vue';
import { InputParameters } from '@/types/Model';

const props = defineProps<{parameters: InputParameters; routes: Array<object>}>()
const emit = defineEmits<{
  (e: 'inputChange', target: Event): void,
}>()
</script>

<style scoped>

</style>
