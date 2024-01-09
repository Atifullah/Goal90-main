<template>
  <div class="confirmation-bet">
    <a-modal id="send-play-modal" wrapClassName="confirmation-bet-modal" v-model="confirmBetModel" :footer="false" :title="false" @cancel="close" width="400px">
        <a-row :gutter="16" class="">
                <a-col :lg="24" align="end">
                    <img src="/images/close-btn.svg" @click="close" class="pointer" />
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mx-4">
                <a-col :lg="24" align="center">
                    <img src="/images/confirm-icon.svg" class="mt-3 mb-4"/>
                    <p class="mb-0 user-email fw-5">Tip: Your bet funds will not be cancelled, are you sure to place your bet?</p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-5 mb-2 mx-2">
                <a-col :lg="12">
                    <a-button block class="transfer-btn common-btn" @click="close">Cancel</a-button>
                </a-col>
                <a-col :lg="12">
                    <a-button block class=" common-btn" @click="confirm">Confirm</a-button>
                </a-col>
            </a-row>
    </a-modal>
  </div>
</template>

<script>
export default {
    props: {
        confirmBetModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
        confirm:{
            type:Function,
        }
    },
}
</script>

<style>

</style>
