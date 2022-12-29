<template>
  <div class="mt-[30px] flex flex-col items-center">
    <main-title>CVRP - Resolve a new problem</main-title>
    <inputs-form-parameters v-model="parameters" @submit="submitForm"/>
    <div v-if="routesObject.length > 0" id="map" style="height: 500px; width: 1000px;"></div>
    <div v-if="routesObject.length > 0">
      <input type="checkbox" checked value="0" @change="editLayer">Route 1
      <input type="checkbox" checked value="1" @change="editLayer">Route 2
      <input type="checkbox" checked value="2" @change="editLayer">Route 3
    </div>
    <button-generic-reversed @click="continueOptimization()" class="w-[300px] mt-4 mb-4" v-if="routesObject.length > 0">Continue Optimization</button-generic-reversed>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import InputsFormParameters from '@/components/forms/form-create-model.vue';
import MainTitle from '@/components/titles/main-title.vue';
import { useOptimizeModel } from '@/composables/model/useOptimizeModel';
import ButtonGenericReversed from '@/components/buttons/button-generic-reversed.vue';
import { useContinueOptimization } from '@/composables/model/useContinueOptimization';
import { ModelExisting } from '@/types/ModelInfos';
import { Map } from 'leaflet';

const parameters = reactive({
  vehicle_max_capacity: 40,
  time_limit: 2,
  iterations_limit: 0,
  gap: 0.1,
})

const data = ref({})
const map = ref({} as Map)
const layersRoutes = ref([] as any)

const { optimizeModel, error, solution, id, modelParams } = useOptimizeModel()
const { optimizeExistingModel, err, sol, identifier, modelP } = useContinueOptimization()
const routesObject = ref([] as any)
const defineRoutesObject = (solution: any) => {
  for(let i = 0; i < solution.value.length; i++) {
    routesObject.value.push([])
    for(let j = 0; j < (solution.value[i] as Array<any>).length; j++) {
      routesObject.value[i].push({latLng: {lat:modelParams.value.xcords[solution.value[i][j][0]] , lng:modelParams.value.ycords[solution.value[i][j][0]]}})
      // routesObject[i].push({x:xcords[res.solution[i][j][1]] , y:ycords[res.solution[i][j][1]]})
    }
    routesObject.value[i].push({latLng: {lat: modelParams.value.xcords[0], lng: modelParams.value.ycords[0]}})
  }
}

const getStyle = (colorRoad: string) => {
  return {
    routeRibbon: {
      color: colorRoad,
      opacity: 1.0,
      showTraffic: false
    }
  };
}
const styles = [
  getStyle('#aa0000'),
  getStyle('#4e00d0'),
  getStyle('#000000')
];

const directions = L.mapquest.directions();
let layers: any = [];

const defineMap = () => {
// 3 représente le nombre de routes
  for (let i = 0; i < 3; i++) {
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
  const l = L.mapquest.directionsLayer({
    ...styles[layers.length],
    directionsResponse: response
  });
  layers.push(l);
  // 3 représente le nombre de routes
  if (layers.length === 3) {
    map.value = L.mapquest.map('map', {
      zoomControl: true,
      zoomAnimation:false,
      fadeAnimation:true,
      markerZoomAnimation:true,
      center: [modelParams.value.xcords[0], modelParams.value.ycords[0]],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    }) as Map;
    console.log('map')
    for(let i = 0; i < layers.length; i++) {
      map.value.addLayer(layers[i]);
      layersRoutes.value.push(layers[i])
    }
  }
}

const submitForm = async (coords: { xcords: Array<number>; ycords: Array<number>; capacity: Array<number>; }) => {
  data.value = coords
  await optimizeModel({ parameters, data: coords })
  defineRoutesObject(solution)
  console.log('routes final: ', routesObject.value)
  defineMap()
}

const cleanMapLayers = () => {
  map.value.eachLayer(function (layer) {
    console.log(layer)
    if(!layer.hasOwnProperty('mapType')) {
      map.value.removeLayer(layer);
    }
  });
}

const setNewRoutesToMap = () => {
  layers = []
  for (let i = 0; i < 3; i++) {
    directions.route({
      locations: routesObject.value[i]
    }, addNewLayersToMap);
  }
}

const addNewLayersToMap = (err: any, response: any) => {
  if (!response) {
    console.log('C une erreur')
    console.log(err)
    return;
  }
  // Possibiltié de customiser les layers ici en faisant un extends du direction Layer pour customiser les markers
  const l = L.mapquest.directionsLayer({
    ...styles[layers.length],
    directionsResponse: response
  });
  layers.push(l);
  for(let i = 0; i < layers.length; i++) {
    map.value.addLayer(layers[i]);
  }
}

// TODO TEST
const editLayer = (e) => {
  if (e.target.checked) {
    map.value.addLayer(layersRoutes.value[parseInt(e.target.value)])
  } else {
    map.value.eachLayer((layer) => {
      if (layer.hasOwnProperty('locations') && layer.locations === layersRoutes.value[parseInt(e.target.value)].locations){
        map.value.removeLayer(layer)
      }
    })
  }
}

const continueOptimization = async () => {
  const obj = {
    // id: id.value,
    id: id.value,
    parameters,
    data: data.value
  } as ModelExisting
  await optimizeExistingModel(obj)
  routesObject.value = []
  defineRoutesObject(sol)
  cleanMapLayers()
  setNewRoutesToMap()
}

</script>
