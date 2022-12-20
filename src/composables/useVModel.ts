import { computed, getCurrentInstance } from 'vue'

export const useVModel = (props: any, propName: string) => {

    const vm = getCurrentInstance()?.proxy

    return computed({
        get(): any {
            return props[propName]
        },
        set(value: any) {
            vm?.$emit(`update:${propName}`, value)
        },
    })
}
