import { ComponentPublicInstance, markRaw, ref, Ref, watch } from 'vue';

export default class ModalServices {
    private static instance: ModalServices
    modal: Ref<{component: ComponentPublicInstance; params: number} | null> = ref(null)
    isConfirmed: Ref<Boolean> = ref(false)

    public static getInstance(): ModalServices {
        if (!ModalServices.instance) {
            ModalServices.instance = new ModalServices()
        }
        return ModalServices.instance
    }

    public async openDeleteModal(modalComponent: any, modalParam: number): Promise<any> {
        this.isConfirmed.value = false
        const component = markRaw(modalComponent) as any
        this.modal.value = { component, params: modalParam }
        return new Promise(((resolve) => {
            watch(this.modal, (currentValue) => {
                if(currentValue === null){
                    resolve(this.isConfirmed.value)
                }
            })
        }))
    }

    public closeModal(): void {
        this.modal.value = null
    }
}
