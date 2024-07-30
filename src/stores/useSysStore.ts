import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  const recordPopUpAd = ref<boolean>(true)
  const recordNotice = ref<boolean>(true)

  function updateRecordPopUpAd() {
    recordPopUpAd.value = !recordPopUpAd.value
  }

  function updateRecordNotice() {
    recordNotice.value = !recordNotice.value
  }
  return { recordNotice, recordPopUpAd, updateRecordPopUpAd, updateRecordNotice }
})
