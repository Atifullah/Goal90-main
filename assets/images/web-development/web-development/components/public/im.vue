<template>
  <div class="hex-im">
    <div class="im_top clearfix">
      <div class="left">
        <span class="photo"
          :style="{ 'background-color': global_get_random_color(friendid.substring(friendid.length - 1)) }">
          {{ getname(orderdata.nikename) }}
        </span>
        <div class="info">
          <p class="name">{{ orderdata.nikename }}</p>
          <p class="comment">{{ $t('legalTrad.rade') }}{{ orderdata.tradenum }}
            {{ $t('legalTrad.Highpraise') }}{{ orderdata.goodcomment }} {{ $t('legalTrad.comments') }}{{
                orderdata.badcomment
            }}
          </p>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="im_center" ref="im_center" v-bar>
      <div>
        <div :key="index" v-for="(item, index) in chatlist">
          <!--时间-->
          <template>
            <div class="time">
              {{ gettime(item.createtime) }}
            </div>
            <br>
          </template>
          <!--系统提示-->
          <template v-if="item.msgcontent.indexOf('#1#') > -1">
            <div class="tip">
              {{ item.msgcontent.replaceAll("#1#", "") }}
            </div>
            <br>
          </template>
          <!--消息-->
          <div class="message clearfix" v-else>
            <!--自己的消息-->
            <div class="other" v-if="item.fromuserid != $userinfo.uid">
              <p class="message_text">
                <img width="100" v-if="item.msgcontent.indexOf('https://') > -1" @load="resetscroll"
                  @click="showimage($event)" :src="item.msgcontent" alt="">
                <span v-else>{{ item.msgcontent }}</span>
              </p>
              <span class="photo"
                :style="{ 'background-color': global_get_random_color(friendid.substring(friendid.length - 1)) }">
                {{ getname(orderdata.nikename) }}
              </span>
            </div>
            <!--对方的消息-->
            <div class="self" v-else>
              <span class="photo"
                :style="{ 'background-color': global_get_random_color($userinfo.uid.substring($userinfo.uid.length - 1)) }">
                {{ getname($userinfo.nickname) }}
              </span>
              <p class="message_text">
                <img width="100" v-if="item.msgcontent.indexOf('https://') > -1" @load="resetscroll"
                  @click="showimage($event)" :src="item.msgcontent" alt="">
                <span v-else>{{ item.msgcontent }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="im_bottom">
      <a-input class="im_textarea" type="textarea" :autosize="true" v-model="message"
        @keydown.native="sendmessage('', $event)" :placeholder="$t('placeholders.plh52')">
      </a-input>
      <span class="push" @click="sendmessage()"></span>
      <span class="link" @click="handleuploadfile">
        <input class="link_pic" @change="changepic" ref="link-pic" type="file">
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['orderdata'],
  data() {
    return {
      message: '',
      chatlist: [],
      friendid: '',
      file: '',
      fileimagestate: false,
      fileimage: '',
      uploadfilestate: false,
      fileobj: {},
      uploadloading: false,
      linkimageloading: false
    }
  },
  watch: {
    'orderdata': function (val) {
      if (val) {
        this.friendid = val.userid == this.$userinfo.uid ? val.orderuserid : val.userid; 
        this.gethistory();
      }
    },
    '$store.state.c2cmessage': function (msgobj) { 
      this.chatlist.push(msgobj)
      this.$nextTick(() => {
        this.resetscroll()
      })
    }
  },
  created() {

  },
  mounted() {
    this.file = this.$refs['link-pic']
  },
  methods: {
    showimage(event) {
      this.fileimagestate = true
      this.linkimageloading = true
      this.fileimage = ''
      this.fileimage = event.target.src; //字符分割
    },
    confirmreceipt() {
      const _self = this
      const files = this.file.files
      if (!files) return;
      if (this.uploadloading) {
        return
      }
      this.uploadloading = true
      const fileobj = files[0];
      if (fileobj.name) {
        let reader = new FileReader();
        reader.readAsDataURL(fileobj);
        reader.onload = function (e) {
          _self.$store.dispatch("com_image_upload", {
            imagetype: 'Payment',
            imgbase64: (reader.result.split(','))[1],
            filename: fileobj.name
          }).then(({ data }) => {
            if (data) {
              _self.uploadloading = false
              var d = new Date();
              let msgobj = {
                fromuserid: _self.$userinfo.uid + "",
                touserid: _self.friendid + "",
                msgtype: 2, //消息类型 1=文本，2=图片，3=语音，4=其他文件
                completeorderid: _self.orderdata.id,
                msgcontent: data.imgurl,
                createTime: d.toUTCString()
              }
              _self.fileimagestate = false;
              _self.chatlist.push(msgobj)
              _self.$nextTick(() => {
                _self.resetscroll()
              })
              _self.svaemsgtoserver(2, data.imgurl)
            } else {
              _self.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt21') });
            }
          })
        }
      }
    },
    handleuploadfile() {
      this.file.click()
    },
    /*选择图片*/
    changepic(event) {
      const _self = this
      const files = event.target.files;
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
    resetscroll: function () {
      let ref = this.$vuebar.getState(this.$refs.im_center);
      ref.el2.scrollTop = ref.el2.scrollHeight + 10;
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
      errInfo = "Message length exceeded limit (up to " + Math.round(maxLen / 3) + " characters)";
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
    gethistory() {//获取消息
      var _self = this;
      this.$store.dispatch('trading_c2c_getimmessage', {
        touserid: this.friendid,
        completeorderid: this.orderdata.id,
        pageindex: 1,
        pagesize: 5
      }).then(({ data }) => {
        if (data.pagedata) {
          _self.chatlist = data.pagedata
          _self.$nextTick(() => {
            _self.resetscroll()
          })
        }
      });
    },
    svaemsgtoserver(msgtype, msgcontent) {//保存消息
      let _self = this;
      this.$store.dispatch('p2p_saveimmessage', {
        touserid: _self.friendid,
        msgtype: msgtype,
        completeorderid: _self.orderdata.id,
        msgcontent: msgcontent
      }).then(({ data }) => {
        //刷新
      });
    }
  }
};
</script>
<style lang="scss">

.hex-im {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(225, 224, 236, 1);
  font-size: 14px;

  .photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    min-width: 36px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 10px;
    color: #ffffff;
    img {
        object-fit: cover;
    }
  }

  .im_top {
    height: 75px;
    padding: 0 20px;
    line-height: 75px;

    .info {
      line-height: 1.5;
      display: inline-block;
      vertical-align: middle;
    }

    .name {
      font-weight: bold;
      color: #000000;
    }

    .comment {
      display: inline-block;
      font-weight: normal;
      font-size: 12px;
      color: #A5A9BE;
    }

    .phone {
      background-image: url("../../static/images/phone.svg");
      background-repeat: no-repeat;
      background-size: cover;
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      cursor: pointer;
    }

    .phone:hover {
      background-image: url("../../static/images/phone-active.svg");
    }
  }

  .im_center {
    overflow: hidden;
    flex: 600px;
    padding: 0 19px;
    background-color: #F5F7FB;
    text-align: center;

    .time {
      display: inline-block;
      height: 18px;
      line-height: 18px;
      background: rgba(251, 252, 254, 1);
      border-radius: 3px;
      font-size: 12px;
      color: #999999;
      margin: 10px 0;
      padding: 2px 5px;
    }

    .tip {
      display: inline-block;
      max-width: 240px;
      line-height: initial;
      background: #e8ecf2;
      border-radius: 3px;
      padding: 8px 22px;
      font-size: 14px;
      color: #333333;
      text-align: left;
      margin-bottom: 20px;
    }

    .message {
      .photo {
        margin: 0;
      }

      margin-bottom: 20px;
      width: 100%;

      .self {
        float: left;
        max-width: 70%;
        display: flex;
      }

      .other {
        float: right;
        max-width: 70%;
        display: flex;
      }

      .self .message_text {
        margin-left: 10px;
      }

      .self .message_text:before {
        border-width: 5px 7px 5px 0;
        border-color: transparent #ffffff transparent transparent;
        left: -6px;
      }

      .other .message_text:after {
        border-width: 5px 0 5px 7px;
        border-color: transparent transparent transparent #ffffff;
        right: -6px;
      }

      .other .message_text:after,
      .self .message_text:before {
        content: '';
        top: 15px;
        display: inline-block;
        width: 0;
        height: 0;
        position: absolute;
        border-style: solid;
      }

      .other .message_text {
        margin-right: 10px;
      }

      .message_text {
        position: relative;
        background: #ffffff;
        border-radius: 5px;
        padding: 10px 16px;
        font-size: 14px;
        color: #21283E;
        display: inline-block;
        flex: 1;
        word-break: break-all;
        text-align: left;
      }
    }
  }

  .im_bottom {
    flex: auto;
    min-height: 60px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .im_textarea {
      .el-textarea__inner {
        resize: none;
        flex: auto;
        border: 0;
        padding: 0;
        max-height: 100px;
      }
    }

    .im_textarea.el-textarea {
      width: initial;
      flex: auto;
      margin-right: 20px;
    }

    .push,
    .link {
      display: inline-block;
      background-repeat: no-repeat;
      background-size: cover;
      vertical-align: middle;
      cursor: pointer;
    }

    .push {
      width: 20px;
      height: 18px;
      background-image: url("../../static/images/push.svg");
    }

    .link {
      width: 18px;
      height: 18px;
      margin-left: 20px;
      background-image: url("../../static/images/link.svg");
    }

    .push:hover {
      background-image: url("../../static/images/push-active.svg");
    }

    .link:hover {
      background-image: url("../../static/images/link-active.svg");
    }

    .link .link_pic {
      display: none;
    }
  }

  .link_fileimage {
    width: 600px;

    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      text-align: center;

      img {
        width: auto;
        max-width: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>
