<template>
  <div id="institution-service">
    <span v-if="IsAvailable"><InstitutionService /></span>
      <span v-else ><CommingSoon /></span>
    
  </div>
</template>

<script>
import InstitutionService from '@/components/InstitutionService/InstitutionService.vue'
import CommingSoon from '@/components/FooterModule/CommingSoon.vue'
export default {
components: {
    InstitutionService,
    CommingSoon
},
    data() {
        return {
            // text: ''
            IsAvailable:false
        }
    },
}
</script>

<style lang="scss">
    @import '@/assets/scss/pages/institution-service/institution-service.scss';
</style>
