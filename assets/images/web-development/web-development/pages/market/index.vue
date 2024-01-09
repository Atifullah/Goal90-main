<template>
    <div id="market">
        <div :bordered="false">
            <div class="main-content">
                <market />
            </div>
        </div>
    </div>
</template>

<script>
import market from '@/components/market/market'
export default {
    components: {
        market
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/market/market.scss';
</style>
