<template>
  <form @submit.prevent="emit('submit', coords)" class="bg-primary-color mt-[25px] rounded-[8px] drop-shadow-classic flex flex-col items-center justify-center py-[15px] w-2/4">
    <div>
      <input-file class="w-[415px]" @changeFile="changeFile"/>
    </div>
    <div class="mt-[20px]">
      <input-generic-with-label class="w-[300px] text-start" type="text" v-model="propsName" label="Model Name" />
    </div>
    <div class="mt-[20px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.vehicle_max_capacity" label="Vehicle Max Capacity" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.time_limit" label="Time Limit" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.iterations_limit" label="Iterations Limit" />
    </div>
    <div class="mt-[10px]">
      <input-generic-with-label class="w-[300px]" v-model="propsValue.gap" label="MIP Gap" />
    </div>
    <button-generic class="w-[300px] mt-[20px]">Optimize</button-generic>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from "@/composables/useVModel";
import InputGenericWithLabel from '@/components/inputs/input-generic-with-label.vue';
import ButtonGeneric from '@/components/buttons/button-generic.vue';
import InputFile from '@/components/inputs/input-file.vue';
import { reactive } from 'vue';

const props = withDefaults(defineProps<{modelValue: any; name: string}>(), {
})
const propsValue = useVModel(props, 'modelValue')
const propsName = useVModel(props, 'name')
const emit = defineEmits<{
  (e: 'submit', coords: object): void,
  (e: 'update:name'): void
}>()

const coords = reactive({
  xcords: [] as Array<number>,
  ycords: [] as Array<number>,
  capacity: [] as Array<number>,
})

const changeFile = (file: File) => {
  if (file.type === "text/plain") {
    file.text().then((content) => {
      const lines = content.split('\n');
      for (let i = 1; i < lines.length; i++) {
        let line = lines[i].split(' ')
        coords.xcords.push(parseFloat(line[3]))
        coords.ycords.push(parseFloat(line[4]))
        coords.capacity.push(parseInt(line[5]) + parseInt(line[6]))
      }
    })
  }
  return
}
</script>

<style scoped>

</style>
