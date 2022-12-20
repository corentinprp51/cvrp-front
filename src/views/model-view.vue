<template>
  <div>
    <h1>Model Infos</h1>
    {{ model }}
  </div>
</template>

<script lang="ts" setup>

import { useViewModel } from '@/composables/model/useViewModel';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

const route: RouteLocationNormalizedLoaded = useRoute()
const modelId: number = parseInt(route.params.id as string)
const model = useViewModel(modelId)
</script>
