<template>
  <div class="right-side" v-show="!chatLoading">
    <div id="chat">
      <div class="user-chat-container">
        <a-card class="chat-container mt-5" :bordered="false">
          <div class="chat-header-border">
            <ChatHeader :orderdata="orderdata" :color="color" />
          </div>
          <ChatBody :chatlist="chatlist" ref="chatbody" :loading="loading" :gethistory="gethistory" :hasNext="hasNext"
            :nickname="orderdata?.nikename" :color="color" />

          <!-- hiding bottom input if order is completed -->
          <div class="chat-footer-border" v-if="orderdata.orderstatus != 5">
            <div class="chat-footer">
              <a-card class="chat-footer-card" :bordered="false">
                <a-row :gutter="16" class="footer-row">
                  <a-col :lg="18">
                    <a-input :placeholder="$t('placeholders.plh26')" v-model="message"
                      @keydown.native="sendmessage('', $event)">
                    </a-input></a-col>
                  <a-col :lg="6" align="end">
                    <a-row :gutter="16">
                      <a-col :lg="7" align="center" class="py-2 upload-icon-col">
                        <span @mouseover="hoverKey = 3" @mouseleave="hoverKey = -1">
                          <img class="pointer" :src="hoverKey == 3 ? '/images/upload-active.svg' : '/images/upload.svg'"
                            @click="$refs.FileInput.click()" />
                        </span>
                        <!-- <img src="/web-static-images/upload.svg" class="pointer" @click="$refs.FileInput.click()"/> -->
                        <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
                        <a-modal v-model="dialog">
                          <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image"
                            :aspectRatio="4 / 3">
                          </VueCropper>
                          <template slot="footer" class="ant-card-actions">
                            <a-button class="primary-btn fw-5" key="submit" @click="saveImage()"
                              :loading="uploadloading">{{ $t('person.ph6') }}</a-button>
                            <a-button text @click="dialog = false, $refs['FileInput'].value = null">
                              {{ $t('legalTrad.Cancel') }}</a-button>
                          </template>
                        </a-modal>
                      </a-col>

                      <a-col :lg="17" align="end">
                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                          <img class="pointer send-icon"
                            :src="hoverKey == 2 ? '/images/send-chat-active.svg' : '/images/send-chat.svg'"
                            @click="sendmessage()" />
                        </span>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-card>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import ChatHeader from './ChatHeader.vue'
import ChatBody from './ChatBody/ChatBody.vue'
import ChatFooter from './ChatFooter.vue'
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    ChatHeader,
    ChatBody,
    ChatFooter,
    VueCropper
  },
  props: {
    orderdata: {
      type: Object,
      default: () => { },
    },
    getorderdetail: {
      type: Function,
    }
  },
  computed: {
    color() {
      return this.global_get_random_color(this.orderdata.userid ? this.orderdata.userid.substring(this.orderdata.userid.length - 1) : 0)
    }
  },
  data() {
    return {
      hoverKey: -1,
      message: '',
      chatlist: [],
      chatLoading: true,
      friendid: '',
      file: '',
      fileimagestate: false,
      fileimage: '',
      loading: false,
      hasNext: false,
      uploadfilestate: false,
      fileobj: {},
      uploadloading: false,
      linkimageloading: false,
      page: {
        pageindex: 1,
        pagesize: 10
      },
      selectedFile: '',
      dialog: false,
    }
  },
  watch: {
    'orderdata': function (val) {
      if (val) {
        this.friendid = val.userid == this.$userinfo.uid ? val.orderuserid : val.userid;
        this.gethistory();
      }
    },
    '$store.state.c2c_message': function (msgobj) {
      // console.log('msgobj', msgobj)
      if (msgobj.completeorderid == this.orderdata.id) {
        this.chatlist.push(msgobj)
        if (msgobj.msgcontent.indexOf('#1#') > -1) {
          this.getorderdetail()
        }
        this.$nextTick(() => {
          this.resetscroll()
        })
      }

    }
  },
  created() {

  },
  mounted() {
    this.file = this.$refs['link-pic']
    this.gethistory();
  },
  methods: {
    showimage(event) {
      this.fileimagestate = true
      this.linkimageloading = true
      this.fileimage = ''
      this.fileimage = event.target.src; //字符分割
    },
    onFileSelect(e) {
      const file = e.target.files[0]

      if (!this.cheakpic(file, 5000)) {
        return false
      } 
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
        alert(this.$t('returntxt.rtxt38'))
      }
    },
    saveImage() {
      const _this = this;
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        let formData = new FormData()
        formData.append("profile_photo", blob, 'name.jpeg');
        let imgUrlBase64;
        if (true) {
          let reader = new FileReader();
          imgUrlBase64 = reader.readAsDataURL(blob);
          reader.onload = function (e) {
            _this.uploadloading = true;
            _this.$store.dispatch("com_image_upload", {
              imageType: 'payment',
              imgbase64: (reader.result.split(','))[1],
              filename: new Date().getTime() + Number(Math.random() * 1000000000)
            }).then(({ data }) => {
              if (data) {

                var d = new Date();
                let msgobj = {
                  fromuserid: _this.$userinfo.uid + "",
                  touserid: _this.friendid + "",
                  msgtype: 2, //消息类型 1=文本，2=图片，3=语音，4=其他文件
                  completeorderid: _this.orderdata.id,
                  msgcontent: data.imgurl,
                  createTime: d.toUTCString()
                }
                _this.fileimagestate = false;
                _this.chatlist.push(msgobj)
                _this.$nextTick(() => {
                  _this.resetscroll()
                })
                _this.uploadloading = false;
                _this.dialog = false;
                _this.svaemsgtoserver(2, data.imgurl)
              } else {
                _this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt21') });
              }
            })
          }
        }
      })
    },

    handleuploadfile() {
      this.file.click()
    },
    /*选择图片*/
    changepic(event) {
      const _self = this
      const files = event.files;
      if (!files) return;
      this.uploadfilestate = true
      const file = files[0];
      const fileSize = file.size;
      //先检查图片类型和大小
      if (!this.cheakpic(file, fileSize)) {
        return;
      }
      //预览图片
      const reader = new FileReader();
      reader.onload = (function (file) {
        return function (e) {
          _self.fileobj = {
            img: this.result,
            name: file.name,
            size: fileSize
          }
        };
      })(file);
      //预览图片
      reader.readAsDataURL(file);
      this.confirmreceipt()
    },
    /*检查图片类型*/
    cheakpic(obj, fileSize) {
      const picExts = 'jpg|jpeg|png|bmp|gif|webp';
      const photoExt = obj.type.substr(obj.type.lastIndexOf("/") + 1).toLowerCase(); //获得文件后缀名
      const pos = picExts.indexOf(photoExt);
      if (pos < 0) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt22') });
        return false;
      }
      fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
      if (fileSize > 30 * 1024) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt23') });
        return false;
      }
      return true;
    },
    getname(val) {
      return val ? val.substring(0, 1) : '--'
    },
    gettime(time) {
      return this.global_get_local_time(time).format('HH:mm:ss')
    },
    resetscroll: function (update) {
      this.$refs.chatbody.resetscroll(update)
    },
    /*发送消息*/
    sendmessage(obj, event) {
      if (event) {
        if (event.keyCode == 13) {
          if (!event.shiftKey) {
            event.preventDefault()
            this._sendmessage(obj)
          }
        }
      } else {
        this._sendmessage(obj)
      }
    },
    _sendmessage() {
      if (!this.message.trim()) {
        this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt24') });
        return
      }
      const msgLen = this.message.trim().length;
      let maxLen, errInfo;
      maxLen = 1000;
      errInfo = this.$t('returntxt.rtxt39') + Math.round(maxLen / 3) + this.$t('returntxt.rtxt40');
      if (msgLen > maxLen) {
        this.$store.commit('set_message', { type: 'error', text: errInfo });
        return
      }
      var d = new Date();
      var msgobj = this.cloneObj({
        fromuserid: this.$userinfo.uid + "",
        touserid: this.friendid + "",
        msgtype: 1, //消息类型 1=文本，2=图片，3=语音，4=其他文件
        completeorderid: this.orderdata.id,
        msgcontent: this.message.trim(),
        createTime: d.toUTCString()
      });
      this.chatlist.push(msgobj)
      this.$nextTick(() => {
        this.resetscroll()
      })
      this.svaemsgtoserver(1, this.message.trim())
      this.message = ''
    },
    /*获取历史记录*/
    gethistory(pageIndex) {//获取消息
      var _self = this;
      _self.loading = true;
      pageIndex ? this.page.pageindex = this.page.pageindex + pageIndex : this.page.pageindex = 1;
      this.$store.dispatch('trading_c2c_getimmessage', {
        touserid: _self.orderdata.userid == _self.$userinfo.uid ? _self.orderdata.orderuserid : _self.orderdata.userid,
        completeorderid: this.orderdata.id,
        pageindex: this.page.pageindex,
        pagesize: this.page.pagesize
      }).then(({ data }) => {
        if (data.pagedata) {
          if (pageIndex) {
            _self.chatlist = data.pagedata.concat(_self.chatlist)
            _self.hasNext = data.hasnextpage
            _self.$nextTick(() => {
              _self.resetscroll(true)
            })
          }
          else {
            _self.chatlist = data.pagedata
            _self.hasNext = data.hasnextpage
            this.chatLoading = false;
            _self.$nextTick(() => {
              _self.resetscroll()
            })
          }
        }
        _self.loading = false;
      });
    },
    svaemsgtoserver(msgtype, msgcontent) {//保存消息
      let _self = this;
      this.$store.dispatch('p2p_saveimmessage', {
        touserid: _self.orderdata.userid == _self.$userinfo.uid ? _self.orderdata.orderuserid : _self.orderdata.userid,
        msgtype: msgtype,
        completeorderid: _self.orderdata.id,
        msgcontent: msgcontent
      }).then(({ data }) => {
        //刷新
      });
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/p2p/chat.scss';
</style>
