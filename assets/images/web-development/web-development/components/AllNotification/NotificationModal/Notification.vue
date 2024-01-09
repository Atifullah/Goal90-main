<template>
  <div class="notification-modal">
    <a-modal
      id="notification-modal"
      v-model="notificationModel"
      width="450px"
      :footer="false"
    >
    <a-row :gutter="16">
        <a-col :lg="2"></a-col>
        <a-col :lg="20"> <p class="text-center notification-detail fw-5">{{$t('noti_fication.noti1')}}</p></a-col>
        <a-col :lg="2"><img src="/images/right-arrow-header.svg"/></a-col>
    </a-row>
    <a-row class="mt-2">
        <p class="cashback-txt fw-4 mb-0">{{$t('noti_fication.noti2')}}</p>
        <span class="date-time fw-4 mr-2">2022-11-02</span><span class="date-time fw-4">21:45:45</span>
        <p class="mt-3 cashback-txt fw-4 cashback-desc">{{$t('noti_fication.noti3')}}</p>
    </a-row>
    <a-row :gutter="16" class="mt-3">
    <a-col :lg="12"><a-button block class="cancel-outline-btn fw-5">{{$t('noti_fication.noti4')}}</a-button></a-col>
    <a-col :lg="12"><a-button class="primary-btn fw-5" block>{{$t('noti_fication.noti5')}}</a-button></a-col>

</a-row>
    </a-modal>
  </div>
</template>

<script>
export default {
props: {
    notificationModel: {
        type: Boolean,
    }
}
}
</script>

<style>

</style>
