<template>
  <modal-generic v-if="modal" @close="closeModal">
      <component
          :is="modal.component"
          @close="closeModal"
          @confirm="confirmModal"
          :param="modal.params"
      />
  </modal-generic>
</template>

<script lang="ts" setup>

import ModalServices from '@/services/ModalServices';
import ModalGeneric from '@/components/Modal/modal-generic.vue';

const modal = ModalServices.getInstance().modal
const closeModal = () => {
  ModalServices.getInstance().closeModal()
}
const confirmModal = () => {
  ModalServices.getInstance().isConfirmed.value = true
  closeModal()
}
</script>
