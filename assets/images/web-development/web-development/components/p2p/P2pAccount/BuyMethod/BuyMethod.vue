<template>
  <div class="buy-payment-method" id="buy-method" v-if="!loading">
    <a-card :bordered="false" class="account-card">
      <div class="shadow-card p-4">
        <a-row :gutter="16">
          <a-col :lg="14" :xl="14" class="pr-0">
            <p v-if="BuyorSell" class="mb-0 buy-speed-star fw-5"><span
                :class="orderdata.direction == -1 ? 'red-active' : 'success-active'">{{ BuyorSell }} </span>{{ title }}<span
                class="pointer" @click="goCounterParty(orderdata)"><u>{{ nikename }}</u></span></p>
            <p v-else class="mb-0 buy-speed-star fw-5" :class="title == 'Order Cancelled' ? 'red-active' : 'success-active'">{{ title
            }}<span class="pointer" @click="goCounterParty(orderdata)"><u>{{ nikename }}</u></span></p>
            <p class="system-confirmation fw-5 mb-0">{{ subtitle }}<span v-if="showCounter"><span class="counter fw-5 ml-3 mr-1">{{
              overtime.split(' ')[0] }} </span>:<span class="counter fw-5 mr-1">{{ overtime.split(' ')[1] }}</span>:<span
                  class="counter">{{ overtime.split(' ')[2] }}</span></span></p>

          </a-col>
          <a-col :lg="10" :xl="10" align="end" class="pl-0">
            <p class="mb-0 buy-speed-star fw-5 copy-link-txt">{{ $t('modals.subm15') }} <span id="keycopy">{{ orderdata.id
            }}</span>
               <AppClipboard target="#keycopy" element-class="link-url1" />

                </p>
            <p class="mb-0 system-confirmation fw-5">{{ $t('modals.subm16') }} <span class="text-black"> {{ global_get_local_time(orderdata.createtime).format('HH:mm:ss')}}</span> </p>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card :bordered="false" class="account-card mt-3">
      <a-row :gutter="16" class="px-4 pb-5">
        <a-col :lg="14" :xl="16">
          <LeftSideSteps ref="leftSideSteps" :orderdata="orderdata" :getorderdetail="getorderdetail" />
        </a-col>
        <a-col :lg="10" :xl="8">
          <Chat :orderdata="orderdata"  :getorderdetail="getorderdetail"/>
        </a-col>
      </a-row>
      <a-row class="px-4 pb-5">
        <a-col :lg="24">
          <!-- <Faqs /> -->
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>

import LeftSideSteps from './LeftSideSteps.vue'
import Chat from './Chat/Chat.vue'
import Faqs from '@/components/public/Faqs.vue'
import moment from 'moment'
import AppClipboard from '~/components/App/AppClipboard.vue';

export default {
  components: {
    LeftSideSteps,
    Chat,
    Faqs,
    AppClipboard
  },
 
  computed: {
    title() {
      if (this.orderdata?.orderstatus == 2 || this.orderdata?.orderstatus == 3) {
        return this.$t('returntxt.rtxt25')
      }
      else if (this.orderdata?.orderstatus == 1 || this.orderdata?.orderstatus == 5) {
        return this.$t('returntxt.rtxt26')
      }
      if (this.orderdata?.direction) {
        if (this.orderdata?.direction == -1) {
          return `${this.orderdata.currencyname} to `
        }
        else if (this.orderdata?.direction == 1) {
          return `${this.orderdata.currencyname} from `
        }
      }
    },
    BuyorSell() {
      if (this.orderdata?.orderstatus == 0 || this.orderdata?.orderstatus == 4 || this.orderdata?.orderstatus == 6) {
        if (this.orderdata?.direction) {
          if (this.orderdata?.direction == -1) {
            return this.$t('returntxt.rtxt12')
          }
          else if (this.orderdata?.direction == 1) {
            return this.$t('returntxt.rtxt13')
          }
        }
      }
      else {
        return false;
      }

    },
    nikename() {
      if (this.orderdata?.orderstatus == 2 || this.orderdata?.orderstatus == 3 || this.orderdata?.orderstatus == 1 || this.orderdata?.orderstatus == 5) {
        return ''
      }
      else {
        return this.orderdata.nikename
      }
    },
    subtitle() {
      if (this.orderdata?.orderstatus == 2) {
        if (this.orderdata.direction == -1) {
          return this.$t('returntxt.rtxt24')
        }
        else {
          return this.$t('returntxt.rtxt23')
        }
      }
      else if (this.orderdata?.orderstatus == 3) {
        return this.$t('returntxt.rtxt22')
      }
      else if (this.orderdata?.orderstatus == 1) {
        return this.$t('returntxt.rtxt21')
      }
      else if (this.orderdata?.orderstatus == 6) {
        return this.$t('returntxt.rtxt20')
      }
      else if (this.orderdata?.orderstatus == 5) {
        return this.$t('returntxt.rtxt19')
      }
      else if (this.orderdata?.orderstatus == 4) {
        if (this.orderdata.direction == -1) {
          return this.$t('returntxt.rtxt14')
        }
        else {
          return this.$t('returntxt.rtxt15')
        }
      }
      else if (this.orderdata?.orderstatus == 0) {
        if (this.orderdata.direction == -1) {
          return this.$t('returntxt.rtxt16')
        }
        else {
          return this.$t('returntxt.rtxt17')
        }
      }
      return this.$t('returntxt.rtxt18')
    },
    showCounter() {
      if (this.orderdata?.orderstatus == 0) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      loading: true,
      usercancelstate: false,
      userappealstate: false,
      userevaluatestate: false,
      userappealloading: false,
      usercancelloading: false,
      visibleDetailRows: [],
      orderdata: {
        payconfiglist: []
      },
      orderevaluate: [],
      activepay: {},
      getordermodel: {
        orderid: ''
      },
      timer: null,
      overtime: '-- -- --'
    }
  },
  methods: {
    callback(key) {
      //console.log(key);
    },
    goCounterParty(item) {
      this.$router.push({
        path: '/p2p/counter-party', query: {
          userid: item.orderuserid==this.$userinfo.uid?item.userid:item.orderuserid ,
          advid: item.orderid
        }
      })
    },
    getunitprice() {
      return this.global_get_tofixed(this.orderdata.amount * this.orderdata.price, 2)
    },
    isVisibleDetailRow(rowid) {
      return this.visibleDetailRows.indexOf(rowid) >= 0
    },
    showDetailRow(id) {
      if (!this.isVisibleDetailRow(id)) {
        this.visibleDetailRows = []
        this.visibleDetailRows.push(id)
      } else {
        this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(id), 1);
      }
    },
    getorderdetail() {
      var _self = this
      _self.loading=true;
      return this.$store.dispatch('trading_c2c_order_pagedlist', { orderid: this.$route.params.id })
        .then(({ data }) => {
          if (data && data.pagedata.length > 0) {
            _self.orderdata = data.pagedata[0]
            _self.loading = false;
            if (_self.orderdata.orderstatus == 0) {
              _self.setovertime()
            }

            return true
          } else {
            _self.loading = false;
            _self.$store.commit('set_message', { type: 'error', text: _self.$t('c2c.OrderExist') })
            return false
          }
        })
    },
    /*用户评价*/
    userevaluate(parame) {
      if (this.orderdata.orderstatus == 1) {
        return
      }
      if (this.userevaluatestate) {
        return
      }
      this.userevaluatestate = true
      this.$store.dispatch('trading_c2c_order_evaluate', {
        ordercompleteid: this.orderdata.id,
        starleve: parame
      }).then((res) => {
        if (res.code == '200') {
          this.getorderdetail().then((data) => {
            if (data) {
              this.orderevaluate.push({ id: this.orderdata.id, starleve: parame })
              window.localStorage.setItem("orderevaluate", JSON.stringify(this.orderevaluate))
              this.userevaluatestate = false
              this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Comment') })
              setTimeout(() => {
                this.$router.push('/person/legal-currency')
              }, 1000);
            }
          })
        } else {
          this.userevaluatestate = false
        }
      })
    },
    /*用户订单申诉*/
    changeappealstate() {
      this.userappealstate = !this.userappealstate
    },
    /*取消订单*/
    changeusercancel() {
      this.usercancelstate = !this.usercancelstate
    },
    /*用户取消订单*/
    usercancel() {
      if (this.usercancelloading) {
        return
      }
      this.usercancelloading = true
      this.$store.dispatch('trading_c2c_order_cancel', { ordercompleteid: this.orderdata.id })
        .then((res) => {
          if (res.code == '200') {
            this.getorderdetail().then((data) => {
              if (data) {
                this.usercancelstate = false
                this.usercancelloading = false
                this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Successfully') })
              }
            })
          } else {
            this.usercancelloading = false
          }
        })
    },
    /*订单申诉*/
    userappeal() {
      if (this.userappealloading) {
        return
      }
      this.userappealloading = true
      this.$store.dispatch('trading_c2c_order_appeal', { ordercompleteid: this.orderdata.id })
        .then((res) => {
          if (res.code == '200') {
            this.getorderdetail().then((data) => {
              if (data) {
                this.userappealstate = false
                this.userappealloading = false
                this.$store.commit('set_message', { type: 'ok', text: this.$t('c2c.Submitted') })
              }
            })
          } else {
            this.userappealloading = false
          }
        })
    },
    setovertime() {
      const _self = this
      this.$store.dispatch('com_test', {}).then((res) => {
       let from=new Date(moment.tz(res.data.utcnow,'Etc/GMT').local());
       const to = new Date(moment.tz(_self.orderdata.overtime,'Etc/GMT').local())
        if (_self.timer) {
          clearInterval(_self.timer)
          _self.timer = null
        }
        _self.timer = setInterval(() => {
          from=new Date(from.getTime()+((new Date()).getTime()-from.getTime()))
          const intervaltime = moment.duration(to - from)
          if (intervaltime._milliseconds < 0) {
            clearInterval(_self.timer)
            _self.timer = null
            _self.overtime = '-- -- --'
            setTimeout(() => {
              _self.getorderdetail()
              _self.global_refresh_user_inprocessorders_count();
            }, 3000)
          } else {
            from
            // let val = `${intervaltime._data.hours}${_self.$t('legalTrad.hour')}${intervaltime._data.minutes}${_self.$t('legalTrad.minute')}${intervaltime._data.seconds}${_self.$t('legalTrad.second')}`
            let val = `${intervaltime._data.hours} ${intervaltime._data.minutes} ${intervaltime._data.seconds}`
            _self.overtime = val
          }
        }, 1000)
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next('orders-history')
    } else {
      next((vm) => {
        if (!vm.$userinfo.uid) {
          vm.$router.push('/login?returnurl=' + this.$route.path)
        }
      })
    }
  },
  mounted() {
    if (window.localStorage.getItem('orderevaluate') == null) {
      window.localStorage.setItem('orderevaluate', JSON.stringify([]))
    }
    this.orderevaluate = JSON.parse(window.localStorage.getItem('orderevaluate'))
    this.getorderdetail();
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style></style>
