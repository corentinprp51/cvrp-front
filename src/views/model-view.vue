<template>
  <div v-if="model" class="mt-[30px] flex flex-col items-center">
    <div>
      <main-title>{{ model.name }}</main-title>
    </div>
    <div class="grid grid-cols-[20%_80%] gap-[40px] w-[94%] mt-[20px]">
      <routes-card :routes="routesObject" :parameters="model.parameters" @inputChange="editLayer"/>
      <div>
        <div v-if="isLoadingMap" class="h-[750px] w-full">
          <loader />
        </div>
        <div v-if="routesObject.length > 0" id="map" class="h-[750px]"></div>
      </div>
    </div>
  </div>
  <div v-else-if="isPreloading">
    <loader />
  </div>
</template>

<script lang="ts" setup>

import { useViewModel } from '@/composables/model/useViewModel';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Layer, Map } from 'leaflet';
import MainTitle from '@/components/titles/main-title.vue';
import RoutesCard from '@/components/cards/routes-card.vue';
import { mapStyles } from '@/utils/mapStyle';
import Loader from '@/components/icons/loader.vue';

const route: RouteLocationNormalizedLoaded = useRoute()
const modelId: number = parseInt(route.params.id as string)
const { model, fetchModel, isPreloading } = useViewModel(modelId)
const isLoadingMap = ref(true)

const routesObject = ref([] as any)
const map = ref({} as Map)
const layersRoutes = ref([] as any)

const defineRoutesObject = (solution: any) => {
  if (model.value) {
    for(let i = 0; i < solution.length; i++) {
      routesObject.value.push([])
      for(let j = 0; j < (solution[i] as Array<any>).length; j++) {
        routesObject.value[i].push({latLng: {lat:model.value.data_parameters.xcords[solution[i][j][0]] , lng:model.value.data_parameters.ycords[solution[i][j][0]]}})
      }
      routesObject.value[i].push({latLng: {lat: model.value.data_parameters.xcords[0], lng: model.value.data_parameters.ycords[0]}})
    }
  }
}

onMounted(async () => {
  await fetchModel(modelId)
  if (model.value) {
    defineRoutesObject(model.value.solution)
    defineMap()
  }
})
// @ts-ignore
const directions = L.mapquest.directions();
let layers: any = [];

const defineMap = () => {
// 3 représente le nombre de routes
  for (let i = 0; i < routesObject.value.length; i++) {
    directions.route({
      locations: routesObject.value[i]
    }, createMap);
  }
}

const createMap = (err: any, response: any) => {
  if (!response) {
    console.log(err)
    return;
  }
  // Possibiltié de customiser les layers ici en faisant un extends du direction Layer pour customiser les markers
  // @ts-ignore
  const l = L.mapquest.directionsLayer({
    ...mapStyles[layers.length],
    directionsResponse: response
  });
  layers.push(l);
  // 3 représente le nombre de routes
  if (layers.length === routesObject.value.length) {
    // @ts-ignore
    map.value = L.mapquest.map('map', {
      zoomControl: true,
      zoomAnimation:false,
      fadeAnimation:true,
      markerZoomAnimation:true,
      center: [model.value?.data_parameters.xcords[0], model.value?.data_parameters.ycords[0]],
      // @ts-ignore
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    }) as Map;
    map.value.addLayer(layers[0]);
    for(let i = 0; i < layers.length; i++) {
      layersRoutes.value.push(layers[i])
    }
    isLoadingMap.value = false
  }
}

const cleanMapLayers = () => {
  map.value.eachLayer(function (layer) {
    if(!layer.hasOwnProperty('mapType')) {
      map.value.removeLayer(layer);
    }
  });
}

const editLayer = (e: any) => {
  if (e.target.checked) {
    map.value.addLayer(layersRoutes.value[parseInt(e.target.value)])
  } else {
    map.value.eachLayer((layer: Layer) => {
      if (layer.hasOwnProperty('locations') && (layer as Layer & { locations: any}).locations === layersRoutes.value[parseInt(e.target.value)].locations){
        map.value.removeLayer(layer)
      }
    })
  }
}
</script>
