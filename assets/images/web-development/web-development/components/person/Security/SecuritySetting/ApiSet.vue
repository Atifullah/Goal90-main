<template>
    <div class="">
        <a-card class="login-history-card" :bordered="false">
            <p class="mb-0 login-history fw-5 px-4 py-4"><img src="/images/arrow-left.svg" class="mr-2 pointer" @click="goback"/> API</p>
        </a-card>
        <a-card class="login-history-card mt-3" :bordered="false">
            <a-row class="pt-5">
                <a-col :xs="24" :sm="24" :md="{span:12,offset:6}" :lg="{span:10,offset:7}" :xl="{span:8,offset:8}">
    <a-form-model
      :model="api"
      ref="apiForm"
      :hide-required-mark="true"
      label-align="left"
      :rules="rules"
    >
    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-form-model-item
            has-feedback
            :label="$t('labels.lbl52')"
            prop="name"
            :colon="false"
            :wrapper-col="{
              xl: 24,
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }"
          >
            <a-input :placeholder="$t('api.nameInput')" oninput="if(value.length > 15)value = value.slice(0, 20)" v-model="api.name"/>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-form-model-item
            has-feedback
            :label="$t('labels.lbl53')"
            prop="accessKey"
            :colon="false"
            :wrapper-col="{
              xl: 24,
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }"
          >
            <a-input readOnly :value="accesskey"/>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-form-model-item
            has-feedback
            :label="$t('labels.lbl54')"
            prop="secreatKey"
            :colon="false"
            :wrapper-col="{
              xl: 24,
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }"
          >
            <a-input readOnly :value="secretkey" />
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="pb-5 pt-3">
            <a-button class="primary-btn fw-5" block @click="commitBtn">{{$t("api.creat")}}</a-button>
        </a-col>
      </a-form-model>
      </a-col>
    </a-row>
        </a-card>
        <popupstair
          v-show="popupstate"
          ref="popname"
          @closePopup="popup"
          @createapi="createapi"
        />
    </div>
</template>

<script>
import AxiosConfig from '@/plugins/axios/config';
  import {required} from 'vuelidate/lib/validators'
  import popupstair from '@/components/security/popup-only-google'

  export default {
    name: "setApi",
    components: {
      popupstair
    },
    validations: {
      api: {
        name: {
          required
        }
      }
    },
    data() {
      return {
        loading: false,
        api: {
          name: ''
        },
        rules:{
          name: [
            { required: true, message: this.$t('messages.msg38') }
          ],
        },
        accesskey: '',
        secretkey: '',
        popupstate: false,
        popname: 'apiset',
        userList: [],
        nameRepeatState: true,
      };
    },
    mounted() {
      this.getApi();
      this.accesskey = AxiosConfig.getUUID();
      this.secretkey = AxiosConfig.getUUID();
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      getApi() {
        this.$store.dispatch("user_api_getlist").then(({data}) => {
          if (data) {
            this.userList = data
          }
        })
      },
      createapi(_child) {
        const _self = this;
        _self.popupstate = !_self.popupstate;
        const _childthis = _child;
        const postDate = {
          name: _self.api.name,
          accesskey: _self.accesskey,
          secretkey: _self.secretkey,
          verifycode: _childthis.form.googleauthed,
        }
        this.$store.dispatch('user_user_api_add', postDate).then((res) => {
          if (res.data) {
            _self.$store.commit('set_message', {type: 'ok', text: res.msg});

            _self.$router.push('/person/api');
          }
        })
      },
      nameRepeat(a) {
        const _this = this;
        let result = [];
        _this.userList.forEach((item) => {
          if (item.name == a) {
            result.push(item.name);
          }
        })
        if (result.length > 0) {
          _this.$store.commit('set_message', {type: 'error', text: _this.$t('rest.nameRepeat')});
          _this.nameRepeatState = false;
        } else {
          _this.nameRepeatState = true;
        }
      },
      async commitBtn() {
        const _this = this;
        await this.$refs['apiForm'].validate((valid) => {
          if(valid){
            _this.loading = true;
            _this.nameRepeat(_this.api.name);
            if (!_this.nameRepeatState) {
              _this.loading = false;
              return;
            }
            _this.popupstate = !_this.popupstate;
            _this.$refs.popname.apipopup(_this.popname);
            _this.loading = false;
          }
        })
      },
      popup() {
        this.popupstate = !this.popupstate;
      }
    }
  };
</script>

<style>

</style>
