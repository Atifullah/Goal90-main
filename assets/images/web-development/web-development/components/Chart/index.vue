<template>
    <div class="chart-container">
        <TVChartContainer />
    </div>
</template>

<script>
import TVChartContainer from './TVChartContainer.vue';

export default {
    components: { TVChartContainer },
    name:'TVChartContainer',
    created() {

        if (process.client) {
            window.vueContext = this
        }
 


    },
}
</script>

<style lang="scss" scoped>
.chart-container .TVChartContainer {
    margin: 0 auto;
    height: 746px;
    padding: 26px 0px;
    width: 1000px;
}
</style>