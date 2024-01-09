<template>
  <div class="proof-of-identity px-5 mx-5">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" :tab="$t('tabkeys.tab48')">
        <div class="id-card">
          <a-card>
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action=""
              :before-upload="beforeAvatarUploadfront"
              :customRequest="httpRequest"
            >
            <img v-if="pdfVal['front'] !== true" style="width:150px;"
                :src="langpicChange==1?idcard.front:passport.front" class="avatar"
                :class="langpicChange==1?'':'passport'">
              <img v-if="pdfVal['front'] == true" style="width:150px;" src="../../../static/images/pdf.jpg"
                class="avatar" :class="langpicChange==1?'':'passport'">
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">
                  {{$t('person.ph21')}}
                </div>
              </div>
            </a-upload>
          </a-card>
        </div>
        <div class="plus-icon"><img src="/images/plus-icon.svg" /></div>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('tabkeys.tab49')"> </a-tab-pane>
      <a-tab-pane key="3" :tab="$t('tabkeys.tab50')">  </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  props:{
    httpRequest:{
      type: Function
    },
    pdfVal:{
      type: Array
    },
    langpicChange:{
      type: Number
    },
    idcard:{
      type: Object
    }
  }
}
</script>

<style></style>
