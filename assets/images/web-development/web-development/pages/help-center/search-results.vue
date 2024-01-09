<template>
    <div id="help-center">
        <SearchResults />
    </div>
</template>
  
<script> 
import SearchResults from '@/components/HelpCenter/SearchResults.vue'
export default {
    components: {
        SearchResults
    },
    
}
</script>
  
<style lang="scss">
@import '@/assets/scss/pages/help-center/help-center.scss';
</style>