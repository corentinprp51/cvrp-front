<template>
  <div>
    <h1>Model's List</h1>
    <ul v-if="models.length > 0">
      <li v-for="model in models">
        <router-link :to="{ name: 'model-view', params: { id: model.id } }">{{ model.name }} | {{ model.id }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useListModels } from '@/composables/model/useListModels';

const { models, err } = useListModels()
</script>
