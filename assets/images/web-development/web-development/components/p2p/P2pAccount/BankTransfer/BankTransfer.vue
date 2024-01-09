<template>
  <div class="bank-transfer">
    <a-row :gutter="16" class="px-4 py-5">
            <!-- <a-col :lg="13">
                <Faqs :channelid="77" :subtitle="'p2p_banktransfer_faqs'"/>
            </a-col> -->
            <a-col :lg="11" class="pl-5">
                <ExpressForm />
            </a-col>
        </a-row>
  </div>
</template>

<script>
import Faqs from '@/components/public/Faqs.vue'
import ExpressForm from '~/components/p2p/P2pAccount/Express/BuyExpressForm.vue'
export default {
    components: {
        Faqs,
        ExpressForm
    }
}
</script>

<style>

</style>
