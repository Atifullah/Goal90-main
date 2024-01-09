<template>
    <div class="profile-card">
        <a-card class="user-info-card mb-3 user-login-time" :bordered="false">
            <a-row class="col-alignment info-ip-row">
                <a-col :lg="7" :xl="6" :xxl="6" class="pr-2">
                <div class="user-level">
                  <div class="level1">
                    <p class="level-id fw-4 col-alignment mb-0 verified-txt">
                      LV.{{ $userinfo.securitylevel }}
                      <img :src="$userinfo.countryflag" height="14" width="auto" class="ml-1" />
                    </p>
                  </div>
                  <div  class="level1">
                    <a-divider type="vertical" class="home-divider mx-2" />
                  </div>
                  <div class="level1" v-if="$userinfo.securitylevel < 2">
                    <p
                      class="level-id fw-4 mb-0 col-alignment verified-txt"
                    >

                    <svg width="15" height="15" class="svg-icon mr-2" >
      <use xlink:href="/images/svg/sprite.svg#red-cross-icon"></use>
    </svg>

                      {{$t('memberCenter.unverified')}}
                    </p>
                  </div>
                  <div v-else class="level1">
                    <p class="level-id fw-4 mb-0 athenticated-txt col-alignment verified-txt" >
      
                      <svg width="15" height="15" class="svg-icon mr-2" >
      <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
    </svg>
                      {{$t('memberCenter.verified')}}
                    </p>
                  </div>
                  </div>
                  </a-col>
                  <a-col :lg="24" :xl="18" :xxl="18" class="pt-1 user-level-col ">
                <div class="user-level pl-3">
                  <div class="level1">
                    <span class="user-detail-txt fw-4 mb-0"
              >{{ $t('home.headLogin') }} IP：<span class="last-user-ip"> {{
                checkIp($userinfo.lastloginip)
              }}</span></span
            >
            <span>
              <a-divider type="vertical" class="ip-divider mx-1" />
            </span>
            <span class="mb-0 user-detail-txt fw-4">
              {{ $t('memberCenter.lastLoginTime') }}
              <span class="last-user-ip">{{
                global_get_local_time($userinfo.lastlogintime).format(
                  'YYYY-MM-DD HH:mm:ss'
                )
              }}
            </span></span>
                  </div>
                </div>
              </a-col>
            </a-row>
        </a-card>
      <a-card :bordered="false" class="user-info-card">
        <a-row :gutter="16">
          <a-col :lg="4" :xl="4">
            <div>
    <div size="120" class="user" >

        <div class="overlay-loading" v-if="loading">
            <div>
              <p class=" edit-user-txt fw-7 text-center mb-0"><a-icon class="" type="loading" ></a-icon></p>
              <p class=" edit-user-txt fw-7">{{$t('person.ph5')}}</p>
            </div>
        </div>
        <div class="overlay" v-else>
            <p class=" edit-user-txt fw-7 mt-2" @click="$refs.FileInput.click()">{{$t('api.edit')}} <img class="" src="/images/fi-br-edit.svg"/></p>
        </div>
      <img :src="$userinfo.avatar?$userinfo.avatar:'/images/vector-img1.svg'" class="profile-img" />
      <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
    </div>
    <a-modal v-model="dialog" >
      <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image" ></VueCropper>
      <template slot="footer" class="ant-card-actions">
        <a-button class="primary-btn fw-5" key="submit" @click="saveImage(), (dialog = false)">{{$t('person.ph6')}}</a-button>
        <a-button  text @click="dialog = false,$refs['FileInput'].value=null">{{$t('person.pd18')}}</a-button>
      </template>
    </a-modal>
  </div>

        </a-col>
          <a-col :lg="20" :xl="20" class="mt-1 mt-user">

            <p v-if="!edit" id="nickName" class="user-heading fw-5 mb-0 col-alignment"  style="width:max-content;">
              {{nickName}} <img  @click="edit=true" :src="!edit?'/images/us-edit.svg':'/images/save-icon.svg'" class="ml-2 pointer" />
            </p>
            <a-input v-else id="nickName" v-model="nickName" autoFocus class="edit-input" @blur="saveNick" @change="handleNickChange" />
            <a-row :gutter="16" class="pt-3 pt-user-row">
              <a-col :lg="24" :xl="20" :xxl="17">
                <div class="user-level">
                  <div class="level1">
                    <a-tooltip>
                    <template slot="title">
                      UID:<span id="keycopy">{{ $userinfo.uid }} </span>
                    </template>
                    <span class="user-id fw-5">{{trimUid}}</span>
                    <AppClipboard target="#keycopy" element-class="link-url1"  />
                      </a-tooltip>
                  </div>
                  <div v-if="$userinfo.email" class="level1">
                    <a-divider type="vertical" class="home-divider1" />
                  </div>
                  <div class="level1">
                    <p v-if="$userinfo.email" class="user-id fw-5 mb-0">
                      {{ global_string_split($userinfo.email) }}
                    </p>

                  </div>
                  <div v-if="$userinfo.phone" class="level1">
                    <a-divider type="vertical" class="home-divider1" />
                  </div>
                  <div class="level1">
                    <p v-if="$userinfo.phone" class="user-id fw-5 mb-0">
                      +{{$userinfo.countrycode}}{{ global_string_split($userinfo.phone) }}
                    </p>
                  </div>
                  <div class="level1 ml-2" v-if="!$userinfo.isphoneauthed">
                    <nuxt-link to="/person/security"><a-tag class="bind-phone-tag fw-5 pointer"><img src="/images/bind-phone.svg"/> {{$t('person.ph7')}}</a-tag></nuxt-link>
                  </div>
                  <div class="level1 ml-2" v-if="!$userinfo.isemailauthed">
                    <nuxt-link to="/person/security"><a-tag class="bind-phone-tag fw-5 pointer"><img src="/images/bind-phone.svg"/> {{$t('person.ph8')}} </a-tag></nuxt-link>
                  </div>

                </div>
              </a-col>
            </a-row>
            <a-row :gutter="16" class="pt-3 pt-user-row">

              <a-col :lg="24">
            <p class="user-btc-txt fw-4 mb-0">
              {{ $t('memberCenter.limit') }}:
              {{
                parseFloat(
                  global_get_tofixed(
                    $userinfo.withdrawlimtperday,
                    global_get_decimal('btc').a
                  )
                )
              }}
              BTC
                  <nuxt-link to="/person/authentication">
              <span class="detail-txt increase pointer">
               {{
                    $t('memberCenter.promoteLimit')
                  }}
              </span>
            </nuxt-link>
            </p>
          </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </template>

  <script>
  import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import AppClipboard from '~/components/App/AppClipboard.vue';
  function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
  export default {
    components:{
      VueCropper,
      AppClipboard
    },
    data() {
      return {
        loading: false,
        nickName:'',
        inputWidth:100,
        edit:false,
        nickChange:false,
        imageUrl:'https://alluser.s3.ap-southeast-1.amazonaws.com/up…/2023/01/04/d44270d002cbd9da6fc74e54d234d066.0266',
        reg: {
          ip: new RegExp(
            '^((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))'
          ),
        },

        mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',
      }
    },
    computed:{
    trimUid(){
      return   'UID:'+ (this.$userinfo.uid.length <= 10 ? this.$userinfo.uid : this.$userinfo.uid.substring(0, 10) + "..")

      return   'UID:'+ (this.$userinfo.uid.length <= 11 ? this.$userinfo.uid : this.$userinfo.uid.replace(/.{2}$/, ".."))
    }
  },
    methods: {
      checkIp(val) {
        return this.reg.ip.test(val) ? val : '--'
      },
      handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    editNick(e){
      this.edit=true;
      document.getElementById('nickName').focus();
    },
    handleNickChange(){
      this.nickChange=true;
    },
    saveNick(){
      const _self = this;
      if(this.$userinfo.nickname==this.nickName){
        _self.edit=false;
        return;
      }
      if(_self.edit && _self.nickChange){
        _self.$store.dispatch('user_user_nickname_save', {
          nickName: this.nickName,
        }).then(({
          data
        }) => {
          if (data) {
            _self.$store.commit('set_message', {type: 'ok', text: this.$t('texts.txt26')});
            _self.edit=false;
            _self.nickChange=false;
            this.global_refresh_user_info();

          }
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error(this.$t('conditionaltxt.ct16'));
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.$t('conditionaltxt.ct17'));
      }
      return isJpgOrPng && isLt2M;
    },
    getInputWidth(){
      this.$nextTick(() => {
        let width=0;
        const letters=this.nickName;
        for (let letter of letters) {
          let span = document.createElement('span');
          span.append(document.createTextNode(letter));
          span.style.display = "inline-block";
          document.body.append(span);
          width = width+ span.offsetWidth;
          span.remove();
        }
        width=width+30;
        document.getElementById('nickName').style.width=width+ 'px';
      })
    },
    saveImage() {
      const _this=this;
      // this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas({
        width: 110, // Set the desired width for resizing
        height: 110, // Set the desired height for resizing
      }).toBlob((blob) => {
        let formData = new FormData()
        formData.append("profile_photo", blob,'name.jpeg');
            let imgUrlBase64;
            if (true) {
            let reader = new FileReader();
            imgUrlBase64 = reader.readAsDataURL(blob);
            reader.onload = function (e) {
              _this.loading=true;
                _this.$store.dispatch("com_image_upload", {
                    imageType: 0,
                    imgbase64: (reader.result.split(','))[1],
                    width: '120',
                    height: '120',
                    filename: new Date().getTime() + Number(Math.random() * 1000000000)
                    }).then(({data}) => {
                    if (data) {
                        _this.updateUserAvatar(data.imgurl)
                    }
                    })
                }
            }
      })
    },
    async updateUserAvatar(url){
      const _self=this;
      try{
        let {data} = await _self.$store.dispatch('user_user_avatar_set', {
            avatar:url,
        });
        _self.loading=false;
        this.global_refresh_user_info();
      }catch(error){
          //console.log('Error',error);
      }
    },
    updateNick(){
      setTimeout(() => {
        if(this.$userinfo.nickname){
          this.nickName=this.$userinfo.nickname;
        }
        else{
          this.nickName=this.$t('conditionaltxt.ct19')
        }
      }, 2000);
    },
    onFileSelect(e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        this.dialog = true
        const reader = new FileReader()
        reader.onload = (event) => {
          this.selectedFile = event.target.result
          this.$refs.cropper.replace(this.selectedFile)
        }
        reader.readAsDataURL(file)
      } else {
        alert(this.$t('conditionaltxt.ct18'))
      }
    },

  },
  mounted(){
    if(this.$userinfo.nickname){
      this.nickName=this.$userinfo.nickname;
    }
    else{
      this.nickName=this.$t('conditionaltxt.ct19')
    }
  }
  }
  </script>

  <style lang="scss" scoped>

  </style>
