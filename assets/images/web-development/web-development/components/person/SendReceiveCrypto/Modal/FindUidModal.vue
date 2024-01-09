<template>
  <div >
    <a-modal id="detail-modal" v-model="findUid" width="450px" :footer="false" :title="false" @cancel="close">
        <a-row :gutter="16" class="mx-4">
                    <a-col :lg="24" align="end"><img src="/images/ud-cross.svg" @click="close" class="pointer"/></a-col>
                </a-row>
        <div class=" mx-4">
            
        <p class="bnq-txt text-center text-black fw-6">How to find Bitnasdaq ID</p>
        <p class="send-payment-title fw-5 text-black">At the home tab, click on the copy icon</p>
        <img src="/images/uid-ss.png" width="100%"/>
        <a-button class="primary-btn mt-3" block @click="close">Ok</a-button>
    </div>
</a-modal>
  </div>
</template>

<script>
export default {
    props: {
        findUid: {
                type: Boolean
            },
            close:{
                type: Function
            }
        },
}
</script>

<style>

</style>