<template>
    <div class="my-p2p-ads">
        <a-card :bordered="false">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="mb-0 main-heading fw-5">{{ closed? 'Closed' : 'My' }} {{$t('adsharing.as18')}}</p>
                </a-col>
                <a-col :lg="12" align="end"><nuxt-link to="/p2p/post-new-add" ><a-button class="outline-btn fw-5"><a-icon type="plus" /> {{$t('modals.mAd12')}}</a-button></nuxt-link></a-col>
            </a-row>
        </a-card>
        <a-row :gutter="16">
            <a-col :lg="24" class="mt-3">
                <a-card :bordered="false" class="account-card">
                    <MyAds  ref="entrust" :closed="closed"/>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import MyAds from '@/components/legal/legal-entry-orders'
export default {
    components: {
        "MyAds": MyAds,
    },
    props:{
        closed:{
            type: Boolean
        }
    },
    mounted() {
        if (this.$refs['entrust']) {
            this.$refs['entrust'].resetSelect();
        }
    }
}
</script>

<style>

</style>
