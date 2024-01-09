<template>
  <div>
    <audio id="ringtone" preload="auto">
  <source src="/ringtone.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
  </div>
</template>
<script>
import {mapActions } from "vuex";
import * as jsCokie from 'js-cookie'
export default {
  name: 'error',
  data() {
    return {
      timer: null,
      title: 'BitNasdaq | ',
    }
  },
  watch: {
    '$store.state.message': function (message) {
      var ringtone = document.getElementById('ringtone');
      ringtone.play();
      this.show()
    }
  },
  methods: {
    ...mapActions("constants", ["fetchConstants"]),
    show() {
      let _self = this.$store.state.message;
      this.$notification[_self.type == 'ok' ? 'success' : _self.type]({
        message: _self.type.charAt(0).toUpperCase() + _self.type.slice(1),
        description: _self.text,
      });
      if (_self.text == "Login timeout!") {
        window.location.href = '/login';
      }
    },
    getRate() {
      var _self = this;
      this.$store.dispatch('quotation_getrateinfo_get')
        .then((res) => {
          _self.$store.commit('set_exchange_rate', res.data)
          var substr = "market.exchange.rate"
          _self.$socket.invoke({
            sub: substr,
            type: _self.$socket.type.exchangerate_get,
          });
          _self.$socket.receive(_self.$socket.type.exchangerate_get, _self.callback);
        });
    },
    callback(data) {
      var _self = this;
      _self.$store.commit('set_exchange_rate', data.data)
    },
    /*Get currency trading, fiat currency*/
    getFiatCurrency() {
      if (this.$store.state.bbTitleList.length > 0) {
        return
      }
      this.$store.dispatch('quotation_frenchcurrency')
        .then((res) => {
          if (res.data) {
            this.$store.commit('set_coin_bb', res.data);
          }
        })
    },
    /*获取用户登录信息*/
    getUser() {
      this.$store.dispatch('user_getuserinfo')
        .then((res) => {
          const _user = res.data ? res.data : res.hexdata
          if (_user) {
            this.$store.commit('set_server_user_info', _user)
          }
        })
    },
    /*是否维护中*/
    isMaintain() {
      //测试 1048
      console.log("calllllllllllllllllllllllllllllllllllllllllllllllllllllllled")
      this.fetchConstants({ key: "common_system_error" })
      // this.$store.dispatch('com_constants_getconstantsinfo', { key: "common_system_error" })
      //   .then((data) => {
      //     if (data) {

      //       const parseData = JSON.parse(data.data)
      //       if (parseData) {
      //         //console.log('parseData------', parseData)
      //         this.$store.commit('constants/setConstants', parseData.social_infos)
      //         this.$store.commit('constants/setStreagy', parseData.streagy)
      //         this.$store.commit('constants/setFutrue', parseData.futrue)
      //         this.$store.commit('constants/setSpot', parseData.spot)
      //         if (parseData.left_time > 0) {
      //           //   zh_cnary[1] = this.global_get_local_time(Number(zh_cnary[1])).format('YYYY-MM-DD HH:mm')
      //           //   en_usary[1] = this.global_get_local_time(Number(en_usary[1])).format('YYYY-MM-DD HH:mm')
      //           //   sessionStorage.setItem('isMaintain', JSON.stringify({
      //           //     zh_cn: zh_cnary.join(''),
      //           //     en_us: en_usary.join('')
      //           //   }))
      //           // if (location.pathname != '/isMaintain') {
      //           //   location.href = '/isMaintain'
      //           // }
      //           if (location.pathname != '/maintenance') {
      //             location.href = '/maintenance'
      //           }
      //           return
      //         }
      //       }
      //     }
      //     // sessionStorage.setItem('isMaintain', '')
      //   })
    }
  },
  mounted() {
    this.getTokenAndUserInfo()
    this.$nextTick(() => {
      this.getdecimalsinfos()
      this.getUserIP()
      /*是否维护中*/
      this.isMaintain()
      /*汇率*/
      this.getRate()
     /*法币收款方式*/
      this.fiatpaymenttypeget()
      /*订阅用户通知事件 */
      this.getEvent()
      this.getSymbolInfos()
      this.getcurrencyinfos()
    });
  },
  created() {
  },
  beforeCreate() {
  },
  beforeDestroy() {
    this.$socket.uninvoke(this.$socket.type.exchangerate_get)
    this.$socket.uninvoke(this.$socket.type.userevent)
  }
}
</script>
<style lang="less" scoped>
.notifications {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 90px;
  text-align: center;
}

.notificationscotent {
  position: absolute;
  bottom: 0px !important;
  left: 10px !important;
}

.hex-message {
  background: rgba(41, 46, 57, 1);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  opacity: 0.95;
  min-width: 160px;
  color: #ffffff;
  font-size: 14px;
  display: inline-block;
  margin: 0 auto 10px auto;
  padding: 15px 30px;
}

.hex-message-icon {
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-left: -10px;
  position: absolute;
}

.hex-message-icon.error {
  background-image: url("../../static/images/error.svg");
}

.hex-message-icon.ok {
  background-image: url("../../static/images/right.png");
}

.hex-message-content {
  position: relative;
}

.hex-message-text {
  display: inline-block;
  text-align: left;
  padding-left: 25px;
  line-height: 24px;
}
</style>

