'use strict';
import Vue from 'vue';
import moment from 'moment-timezone'; //nisar changed from moment to moment-timezone
import Header from '@/components/public/Header';
import BlackHeader from '@/components/public/BlackHeader';
import BlackFooter from '@/components/public/BlackFooter';
import Footer from '@/components/public/Footer';
import lang from '@/components/public/lang';
import '../static/styles/base.less';
import '../static/styles/day.less';
import Vuelidate from "vuelidate";
import Crypto from './axios/crypto';
import Socket from './axios/socket';
import Pubsub from './pubsub';
import Np from './np';
import Directive from './directive';
import * as jsCookie from 'js-cookie'
import init from '~/init';
import storage from "./storage"//引入
Vue.prototype.$storage = storage;//加入vue的原型对象
Vue.use(Directive);
Vue.use(Np);
Vue.mixin({
  computed: {
 $baseUrl:function(){
 return init.api.replace(/_/g, '');
 },
    $userassets: function () {
      const assets = this.$store.state.hex_server_user_assets.value;
      const token = this.$store.state.hex_token.value;
      if (!assets || !token) {
        return {}
      }
      if (typeof info === 'string') {
        return Crypto.decrypt(assets, token);
      } else {
        return assets
      }
    },
    $usersettings: function () {
      const settings = this.$store.state.hex_server_user_settings.value;
      const token = this.$store.state.hex_token.value;
      if (!settings || !token) {
        return {}
      }
      if (typeof info === 'string') {
        return Crypto.decrypt(settings, token);
      } else {
        return settings
      }
    },
    $userinfo: function () {
      const info = this.$store.state.hex_server_user_info.value;
      const token = this.$store.state.hex_token.value;
      if (!info || !token) {
        return {}
      }
      if (typeof info === 'string') {
        return Crypto.decrypt(info, token);
      } else {
        return info
      }
    },
  },
  methods: {




    //convert key of object to lowercase
    convertObjectKeysToLower(obj) {
      var result = {};
      for (var key in obj) {
        result[key.toLowerCase()] = obj[key];
      }
      return result;
    },
    global_get_fee_contract(coin) {
      // if (coin.ordertype == 2 || coin.ordertype == 6) {
      //   return this.$np.times(this.$np.divide(coin.transactionamount, coin.tradeavgprice), coin.fee)
      // }
      return this.$np.times(coin.transactionamount, coin.fee)
    },
    global_get_fee(coin) {
      if (coin.direction == 1) {
        if (coin.ordertype == 2 || coin.ordertype == 6) {
          return this.$np.times(this.$np.divide(coin.transactionamount, coin.tradeavgprice), coin.fee)
        }
        return this.$np.times(coin.transactionamount, coin.fee)
      } else {
        return this.$np.times(coin.tradeavgprice, coin.transactionamount, coin.fee)
      }
    },
    cutZero: function (old) {
      old = old + "";
      //拷贝一份 返回去掉零的新串
      var newstr = old;
      //循环变量 小数部分长度
      var leng = old.length - old.indexOf(".") - 1
      //判断是否有效数
      if (old.indexOf(".") > -1) {
        //循环小数部分
        for (var i = leng; i > 0; i--) {
          //如果newstr末尾有0
          if (newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
            var k = newstr.lastIndexOf("0");
            //如果小数点后只有一个0 去掉小数点
            if (newstr.charAt(k - 1) == ".") {
              return newstr.substring(0, k - 1);
            } else {
              //否则 去掉一个0
              newstr = newstr.substring(0, k);
            }
          } else {
            //如果末尾没有0
            return newstr;
          }
        }
      }
      return old;
    },
    /*获取涨跌幅*/
    global_get_limitprice: function (item) {
      let limit_price = Number(Math.abs(((item.c - item.o) / item.o) * 100)).toFixed(2);
      return isNaN(limit_price) ? 0 : limit_price;
    },
    global_init_meiqia(val) {
      const meiqia = document.querySelector('body');
      if (!val) {
        meiqia.classList.add('hidemeiqia')
      } else {
        meiqia.classList.remove('hidemeiqia')
      }
    },
    global_get_replace_dot(val) {
      if (!val) {
        return 0
      }
      return val.toString().replace(/\.$/, '')
    },
    global_get_uid(val) {
      if (val) {
        return val.slice(-8)
      }
      return ''
    },
    global_get_random_color(val) {
      const colorary = ['#E35744', '#5D8CC2', '#B09472', '#8F5AAD', '#B2A040', '#A16C92', '#7692AB', '#7CACC5', '#BF82AD', '#83639C']
      return colorary[Number(val)]
    },
    global_get_count_decimals(value) {
      if (!value) {
        return 0
      }
      if (Math.floor(value) === Number(value)) return 0;
      return value.toString().split(".")[1].length || 0;
    },
    global_num_split(val) {
      const a = val.toString().split('.');
      if (a.length > 1) {
        if (a[1].length > 8) {
          a[1] = a[1].substring(0, 8);
          return this.global_get_langnum(a.join('.'))
        }
      }
      return this.global_get_langnum(val)
    },
    global_get_langnum(val) {
      val = Number(val);
      if (!val) {
        return 0
      }
      return val
    },
    global_get_uppercase(val) {
      if (val) {
        return val.toUpperCase()
      } else {
        return '--'
      }
    },
    global_string_split(val) {
      if (!val) {
        return '';
      }
      if (val.split('@').length == 1) {
        return val.substr(0, 3) + '****' + val.slice(val.length - 4)
      } else {
        let reg = /(.{3}).+(@.+)/g;
        return val.replace(reg, "$1***$2");
      }
    },
    //更新用户信息
    global_refresh_user_info() {
      return this.$store.dispatch("user_getuserinfo").then((res) => {
        if (res.data) {
          const _user = res.data ? res.data : res.hexdata;
          this.$store.commit('set_user_info', res);
          this.$store.commit('set_token', {
            'token': _user.token,
            'expire': new Date().getTime() + 2 * 3600000
          });
          return _user;
        }
      })
    },

    /*更新用户资产*/
    global_refresh_user_assets() {
      // return this.$store.dispatch('user_assets_uc_get', { assetstype: 1 })
      return this.$store.dispatch('trading_total_assets_get')
        .then((res) => {
          const _assets = res.data ? res.data : res.hexdata;
          if (_assets) {
            this.$store.commit('set_server_user_assets_uc', _assets);
            return _assets;
          }
        })
    },
    global_refresh_user_settings() {
      return this.$store.dispatch('user_user_settings_get',)
        .then((res) => {
          const _settings = res.data ? res.data : res.hexdata;
          if (_settings) {
            this.$store.commit('set_server_user_settings', _settings);
            return _settings;
          }
        })
    },
    global_refresh_user_inprocessorders_count() {
      if (this.$userinfo.uid) {
        return this.$store.dispatch('trading_c2c_order_pagedlist', {
          pagesize: 1,
          pageindex: 1,
          orderstatus: [0, 4, 6]
        })
          .then((res) => {
            const _count = res.data ? res.data : res.hexdata;
            if (_count) {
              this.$store.commit('set_inprocessorders', _count.totalitemcount);
              return _count.totalitemcount;
            }
            else {
              this.$store.commit('set_inprocessorders', 0);
              return 0;
            }
          })
      } else {
        return 0;
      }
    },
    fiatpaymenttypeget() {
      var fiattypes = [];
      var legaltypes = this.$storage.get("legaltypes")
      if (legaltypes) {
        this.$store.commit('set_legaltypes', legaltypes);
        legaltypes.forEach(element => {
          fiattypes.push({
            name: element.name,
            mark: element.symbol_native,
            icon: element.icon
          });
        });
        this.$store.commit('set_client_exchange_infos', fiattypes);
        return legaltypes;
      } else {
        this.$store.dispatch('fiatpaymenttype_get', {}).then(result => {
          this.$store.commit('set_legaltypes', result.data);
          this.$storage.set("legaltypes", result.data, 4 * 3600000);//12小时过期  1 * 3600000
          result.data.forEach(element => {
            fiattypes.push({
              name: element.name,
              mark: element.symbol_native,
              icon: element.icon
            });
          });
          this.$store.commit('set_client_exchange_infos', fiattypes);
          return result.data

        });

      }
    },
    async getTokenAndUserInfo() {
      const tokeninfo = {
        'token': '',
        'expire': new Date().getTime() - 10000000
      }
      var token_result = await this.$store.dispatch('gettoken', {});
      tokeninfo.token = token_result.data;
      tokeninfo.expire = new Date().getTime() + 2 * 3600000
      this.$store.commit('set_token', tokeninfo);
      if (this.$store.state.hex_uid.value) {
        // 用户信息
        const user_data = await this.$store.dispatch('user_getuserinfo');
        if (user_data.data) {
          this.$store.commit('set_server_user_info', user_data.data);
        }
      }
    },
    async getcurrencyinfos() {//获取币种信息
      var currencyinfos = this.$storage.get("getcurrencyinfos")
      if (currencyinfos) {
        this.$store.commit('set_currencyinfos', currencyinfos);
        this.$store.dispatch('com_currencyinfos_get', {}).then(res => {
          this.$store.commit('set_currencyinfos', res.data)
          this.$storage.set("getcurrencyinfos", res.data, 200 * 3600000)
        })
        return currencyinfos;
      } else {
        var result = await this.$store.dispatch('com_currencyinfos_get', {});
        this.$store.commit('set_currencyinfos', result.data);
        this.$storage.set("getcurrencyinfos", result.data, 200 * 3600000);//12小时过期  1 * 3600000
        return result.data;
      }
    },
    async getSymbolInfos() {//获取交易对
      var symbolinfos = this.$storage.get("getSymbolinfos")
      if (symbolinfos) {
        this.$store.commit('set_symbleinfos', symbolinfos);
        this.$store.dispatch('com_symbleinfos_get', {}).then(res => {
          this.$store.commit('set_symbleinfos', res.data);
          this.$storage.set("getSymbolinfos", res.data, 200 * 3600000);
        })
        return symbolinfos;
      } else {
        var result = await this.$store.dispatch('com_symbleinfos_get', {});
        this.$store.commit('set_symbleinfos', result.data);
        this.$storage.set("getSymbolinfos", result.data, 200 * 3600000);//12小时过期  1 * 3600000
        return result.data;
      }
    },
    // 将本地交易对数据数据设置到store
    setSymbolInfosFromLocal() {//获取交易对
      var symbolinfos = this.$storage.get("getSymbolinfos")
      if (symbolinfos) {
        this.$store.commit('set_symbleinfos', symbolinfos)
      } else {
        this.getSymbolInfos()
      }
    },
    // 将本地币种数据设置到store
    setCurrencyinfosFromLocal() {//获取交易对
      var currencyinfos = this.$storage.get("getcurrencyinfos")
      if (currencyinfos) {
        this.$store.commit('set_currencyinfos', currencyinfos)
      } else {
        this.getcurrencyinfos()
      }
    },
    // 获取现货账户 0 获取所有币种的信息， 1获取传入data的币种信息
    getAssetsInfos(data, type) {//获取币种信息
      var currencyinfos = this.$storage.get("getcurrencyinfos")
      let dataList = []
      let data1 = []
      let data2 = []
      currencyinfos.forEach(currency => {
        let flag = false
        let dataItem = {
          id: currency.id,
          canuseamount: '',
          bbfrozen: '',
          financingamount: '',
          totalamount: '',
          precision: currency.precision,
          currency: {
            id: '',
            iscandeposit: '',
            iscanwithdraw: '',
            currencyname: '',
            icon: '',
            isfinancing: ''
          }
        }
        dataItem.currency.id = currency.id
        dataItem.currency.currencyname = currency.currencyname
        dataItem.currency.icon = currency.icon
        dataItem.currency.isfinancing = currency.isfinancing
        dataItem.currency.iscandeposit = currency.iscandeposit
        dataItem.currency.iscanwithdraw = currency.iscanwithdraw
        data.forEach(item => {
          if (currency.id == item.currencyid) {
            dataItem.canuseamount = item.canuseamount
            dataItem.bbfrozen = item.bbfrozen
            dataItem.financingamount = item.financingamount
            dataItem.totalamount = item.totalamount
            dataItem.precision = item.precision ? item.precision : currency.precision
            flag = true
            data1.push(dataItem)
          }
        })
        if (!flag && type == 0) {
          dataItem.canuseamount = 0
          dataItem.bbfrozen = 0
          dataItem.financingamount = 0
          dataItem.totalamount = 0
          data2.push(dataItem)
        }
      })
      dataList = type == 1 ? data1 : data1.concat(data2)
      return dataList
    },
    // 获取杠杆账户  0 获取所有币种杠杆的信息， 1获取传入data的币种杠杆信息
    getMortgageassetsInfos(data, type) {//获取币种信息
      var symbolinfos = this.$storage.get("getSymbolinfos")
      let mortgageassetsInfos = symbolinfos.filter(function (item) {
        return item.itype == 0 && item.borrowmultiple > 1
      })
      let dataList = []
      let data1 = []
      let data2 = []
      mortgageassetsInfos.forEach(symbleinfo => {
        let flag = false
        let dataItem = symbleinfo
        dataItem.tid = symbleinfo.tcurrencyid
        dataItem.ctid = symbleinfo.id
        data.forEach(item => {
          if (symbleinfo.id == item.ctid) {
            dataItem.borrowmultiple = item.borrowmultiple
            dataItem.explosionprice = item.explosionprice
            dataItem.famount = item.famount
            dataItem.fborrowamount = item.fborrowamount
            dataItem.fcanborrowamount = item.fcanborrowamount
            dataItem.fcanuseamount = item.fcanuseamount
            dataItem.ffrozenamount = item.ffrozenamount
            dataItem.fid = item.fid
            dataItem.istatus = item.istatus
            dataItem.phone = item.phone
            dataItem.realname = item.realname
            dataItem.riskrate = item.riskrate


            dataItem.symblename = item.symblename
            dataItem.tamount = item.tamount
            dataItem.tborrowamount = item.tborrowamount
            dataItem.tcanborrowamount = item.tcanborrowamount
            dataItem.tcanuseamount = item.tcanuseamount
            dataItem.tfrozenamount = item.tfrozenamount
            dataItem.totalamount = item.totalamount
            dataItem.updatetime = item.updatetime
            dataItem.userid = item.userid
            dataItem.withdraw_amount = item.withdraw_amount
            dataItem.withdraw_amount_usdt = item.withdraw_amount_usdt

            flag = true
            data1.push(dataItem)
          }
        })
        if (!flag && type == 0) {
          dataItem.explosionprice = 0
          dataItem.famount = 0
          dataItem.fborrowamount = 0
          dataItem.fcanborrowamount = 0
          dataItem.fcanuseamount = 0
          dataItem.ffrozenamount = 0
          dataItem.fid = dataItem.fcurrencyid
          dataItem.istatus = 0
          dataItem.phone = ''
          dataItem.realname = ''
          dataItem.riskrate = 0
          dataItem.istatus = 0

          dataItem.symblename = symbleinfo.descriptions
          dataItem.tamount = 0
          dataItem.tborrowamount = 0
          dataItem.tcanborrowamount = 0
          dataItem.tcanuseamount = 0
          dataItem.tfrozenamount = 0
          dataItem.totalamount = 0
          dataItem.updatetime = dataItem.createtime
          dataItem.userid = ''
          dataItem.withdraw_amount = 0
          dataItem.withdraw_amount_usdt = 0
          data2.push(dataItem)
        }
      })
      dataList = type == 1 ? data1 : data1.concat(data2)
      return dataList
    },
    // 获取合约账户  0 获取所有币种合约的信息， 1获取传入data的币种合约信息
    getContractsInfos(data, type) {//获取币种信息
      var symbolinfos = this.$storage.get("getSymbolinfos")
      let mortgageassetsInfo = symbolinfos.filter(function (item) {
        return item.itype == 1
      })
      let dataList = []
      let data1 = []
      let data2 = []
      mortgageassetsInfo.forEach(currency => {
        let flag = false
        let dataItem = currency
        dataItem.ctid = currency.id
        dataItem.symblename = currency.fcurrencyname
        data.forEach(item => {
          if (currency.id == item.ctid) {
            dataItem.accountequity = item.accountequity
            dataItem.adjustmentrate = item.adjustmentrate
            dataItem.amount = item.amount
            dataItem.amount_usdt = item.amount_usdt
            dataItem.canuseamount = item.canuseamount
            dataItem.canuseamount_usdt = item.canuseamount_usdt
            dataItem.displayorder = item.displayorder
            dataItem.experienceamount = item.experienceamount
            dataItem.explosionprice = item.explosionprice
            dataItem.frozenamount = item.frozenamount
            dataItem.frozenamount_usdt = item.frozenamount_usdt
            dataItem.holdpositionsamount = item.holdpositionsamount


            dataItem.holdpositionsavgprice = item.holdpositionsavgprice
            dataItem.id = item.id
            dataItem.listhaveorderinfos = item.listhaveorderinfos
            dataItem.marginrate = item.marginrate
            dataItem.multiple = item.multiple
            dataItem.profitandlossamount = item.profitandlossamount
            dataItem.unrealizedprofitandlossamount = item.unrealizedprofitandlossamount
            dataItem.updatetime = item.updatetime
            dataItem.userid = item.userid
            dataItem.withdraw_amount = item.withdraw_amount
            dataItem.withdraw_amount_usdt = item.withdraw_amount_usdt

            flag = true
            data1.push(dataItem)
          }
        })
        if (!flag && type == 0) {
          dataItem.accountequity = 0
          dataItem.adjustmentrate = 0
          dataItem.amount = 0
          dataItem.amount_usdt = 0
          dataItem.canuseamount = 0
          dataItem.canuseamount_usdt = 0
          dataItem.experienceamount = 0
          dataItem.frozenamount_usdt = 0
          dataItem.holdpositionsamount = 0
          dataItem.holdpositionsavgprice = 0
          dataItem.listhaveorderinfos = []

          dataItem.marginrate = 0
          dataItem.multiple = 0
          dataItem.profitandlossamount = 0
          dataItem.unrealizedprofitandlossamount = 0
          dataItem.updatetime = dataItem.createtime
          dataItem.userid = ''
          dataItem.withdraw_amount = 0
          dataItem.withdraw_amount_usdt = 0
          data2.push(dataItem)
        }
      })
      dataList = type == 1 ? data1 : data1.concat(data2)
      return dataList
    },
    async getdecimalsinfos() {//获取币种信息
      var precision_result = this.$storage.get("getdecimalsinfos_1")
      if (precision_result) {
        this.$store.commit('set_decimals_list', precision_result);
        return precision_result;
      } else {
        precision_result = await this.$store.dispatch('com_precision_getlist', {});
        this.$store.commit('set_decimals_list', precision_result.data);
        this.$storage.set("getdecimalsinfos_1", precision_result.data, 2 * 3600000);//12小时过期  1 * 3600000
        return precision_result.data;
      }
    },
    getUserIP() {//获取交易对
      var ip = this.$storage.get("userIP")
      if (ip) {
        this.$store.commit('set_ip', ip);
        return ip;
      } else {
        fetch('https://api.ipify.org?format=json').then(x => x.json()).then(({ ip }) => {
          if (ip) {
            this.$store.commit('set_ip', ip);
            this.$storage.set("userIP", ip, 4 * 3600000);//12小时过期  1 * 3600000
            return ip
          }
        });
      }
    },
    global_get_tofixed(val, tofix) {
      if (isNaN(Number(val)) || Number(val) === 0) {
        val = 0
      } else {
        val = this.$np.strip(parseFloat(val))
      }
      let fix;
      if (typeof tofix == 'number') {
        if (Number(val) === 0)
          fix = 0;
        else
          fix = tofix
      } else {
        const newval = 1 / parseFloat(val);
        if (newval >= 500) {
          fix = 8
        } else if (newval >= 10) {
          fix = 6
        } else if (newval < 10) {
          fix = 4
        }
      }
      const valary = val.toString().split('.');
      if (valary.length > 1) {
        valary[1] = valary[1].substring(0, fix);
        val = valary.join('.')
      }
      var newval = parseFloat(this.global_get_langnum(val)).toFixed(fix);
      if (fix == 2) {
        var xsd = newval.toString().split(".");
        if (xsd.length == 1) {
          newval = newval.toString() + ".00";
        }
        if (xsd.length > 1) {
          if (xsd[1].length < 2) {
            newval = newval.toString() + "0";
          }
        }
      }
      return newval;
    },
    global_get_tofixed_entrust(val, tofix) {
      if (isNaN(Number(val)) || Number(val) === 0) {
        val = 0
      } else {
        val = this.$np.strip(parseFloat(val))
      }
      let fix;
      if (typeof tofix == 'number') {
        if (Number(val) === 0)
          fix = 0;
        else
          fix = tofix
      } else {
        const newval = 1 / parseFloat(val);
        if (newval >= 500) {
          fix = 8
        } else if (newval >= 10) {
          fix = 6
        } else if (newval < 10) {
          fix = 4
        }
      }
      const valary = val.toString().split('.');
      if (valary.length > 1) {
        valary[1] = valary[1].substring(0, fix);
        val = valary.join('.')
      }
      return parseFloat(this.global_get_langnum(val)).toFixed(fix);
    },
    global_get_decimal(name) {
      const list = this.$store.state.decimalsList,
        obj = {
          name: '',
          a: '',
          p: '',
          s: ''
        };
      if (name && list) {
        const a = list.find((item) => {
          return item.name === name.toLowerCase();
        });
        return a ? {
          name,
          a: a.amountdigits,
          p: a.pricedigits,
          s: a.sumdigits
        } : obj;
      }
      return obj;
    },
    //获取本地时间
    global_get_local_time(time, dateFormat) {
      let local;
      if (time && time.toString().length <= 10) {
        time = time * 1000;
      }

      if (dateFormat) {
        local = moment(time).format(dateFormat);
      }
      else {
        local = moment.tz(time, 'Etc/GMT').local();
      }
      return local;
    },
    global_get_utc_time(time) {
      let local;
      local = moment.utc(time, 'YYYY-MM-DD').format();
      return local

    },
    //获取订单类型
    global_get_order_type(type) {
      let ot = '';
      switch (type) {
        case 1:
          ot = this.$t('patch.LimitOrderShort');
          break;
        case 4:
          ot = this.$t('patch.LimitOrderShort');
          break;
        case 2:
          ot = this.$t('patch.MarketOrderShort');
          break;
        case 6:
          ot = this.$t('patch.MarketOrderShort');
          break;
        case 3:
          ot = this.$t('patch.LossOrder');
          break;
        case 5:
          ot = this.$t('patch.LossOrder');
          break;
        case 7://7:强制平多,8:强制平空；9，止盈订单；10，止损订单
          ot = this.$t('contract.forcedflat');
          break;
        case 8:
          ot = this.$t('contract.forcedempty');
          break;
        case 9:
          ot = this.$t('contract.takeprofitorder');
          break;
        case 10:
          ot = this.$t('contract.stoplossorder');
          break;
      }
      return ot;
    },
    //获取合约订单类型
    global_get_contract_order_type(type, trigger) {
      let ot = '';
      switch (type) {
        case 1:
          ot = this.$t('contract.openLimit');
          if (trigger > 0) {
            ot = this.$t('contract.openStop');
          }
          break;
        case 2:
          ot = this.$t('contract.openMarket');
          break;
        case 3:
          ot = this.$t('contract.openStop');
          break;
        case 4:
          ot = this.$t('contract.closeLimit');
          if (trigger > 0) {
            ot = this.$t('contract.closeStop');
          }
          break;
        case 5:
          ot = this.$t('contract.closeMarket');
          break;
        case 6:
          ot = this.$t('contract.closeStop');
          break;
        case 7://7:强制平多,8:强制平空；9，止盈订单；10，止损订单
          ot = this.$t('contract.forcedflat');
          break;
        case 8:
          ot = this.$t('contract.forcedempty');
          break;
        case 9:
          ot = this.$t('contract.takeprofitorder');
          break;
        case 10:
          ot = this.$t('contract.stoplossorder');
          break;
      }
      return ot;
    },
    //获取订单状态
    global_get_order_state(s) {
      let order = '';
      switch (s) {
        case 0:
          order = this.$t('patch.UnDeal');
          break;
        case 1:
          order = this.$t('patch.PartialDeal');
          break;
        case 2:
          order = this.$t('patch.cancelled');
          break;
        case 3:
          order = this.$t('patch.DealSuccess');
          break;
        case 4:
          order = this.$t('patch.PartialTransaction');
          break;
        case 5:
          order = this.$t('patch.SystemWithdrawal');
          break;
      }
      return order;
    },
    //获取充币状态
    global_get_charge_state(s) {
      let order = '';
      switch (s) {
        case 0:
          order = this.$t('patch.Pending');
          break;
        case 1:
          order = this.$t('patch.DealSuccess');
          break;
        case 2:
          order = this.$t('patch.DepositFailed');
          break;
      }
      return order;
    },
    //获取交易方向
    global_get_order_direction(s) {
      let order = '';
      switch (s) {
        case 1:
          order = this.$t('memberCenter.buy');
          break;
        case -1:
          order = this.$t('memberCenter.sell');
          break;
      }
      return order;
    },
    //获取合约交易方向
    // T type  S 买入卖出
    global_get_contract_order_direction(t, s) {
      let order = '';
      if (t > 3) {
        if (s == 1) {
          order = this.$t('contract.buyopencontract');
        } else if (s == -1) {
          order = this.$t('contract.sellopencontract');
        }
      } else {
        if (s == 1) {
          order = this.$t('contract.buycontract');
        } else if (s == -1) {
          order = this.$t('contract.sellcontract');
        }
      }
      return order;
    },
    //获取提币状态
    global_get_mention_state(s) {
      let order = '';
      switch (s) {
        case 0:
          order = this.$t('patch.WaitingReview');
          break;
        case 1:
          order = this.$t('patch.DealSuccess');
          break;
        case 2:
          order = this.$t('patch.WithdrawFailed');
          break;
        case 3:
          order = this.$t('patch.Processing');
          break;
        case 4:
          order = this.$t('patch.Rejected');
          break;
        case 5:
          order = this.$t('patch.cancelled');
          break;
      }
      return order
    },
    //获取杠杆借币记录的状态
    getEvent() {
      if (this.$userinfo.uid) {
        var substr = "event." + this.$userinfo.uid + ".detail"


        this.$socket.uninvoke({
          sub: substr,
          type: "event"
        });

        this.$socket.invoke({
          sub: substr,
          type: "event"
        });

        console.log('getEvent:', substr);
        this.$socket.receive("event", this.eventcallback);
      }
    },
    eventcallback(data) {
      console.log('eventcallback:', data);
      if (data.data.type == 102) {//c2c聊天消息
        var jobj = JSON.parse(data.data.msg);
        let msg = jobj.msgcontent.split('#1#')[1]
        if (msg == undefined) {
          msg = jobj.msgcontent.split('#1#')[0]
        }
        if (!(jobj.fromuserid == this.$userinfo.uid && jobj.msgcontent.indexOf("#1#") == -1)) {
          this.$store.commit('set_c2c_message', jobj);
          this.$store.commit('set_message', {
            type: 'ok',
            text: "P2P messages:" + msg
          })
        }
      } else {//合约撮合消息；杠杆现货撮合消息
        this.$pubsub.publish(this.$pubsub.getOrderList)
        this.$store.commit('set_message', {
          type: 'ok',
          text: data.data.msg
        })
      }
    },
    cloneObj(obj) {
      var newObj = {};
      if (obj instanceof Array) {
        newObj = [];
      }
      for (var key in obj) {
        var val = obj[key];
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
        newObj[key] = typeof val === 'object' ? this.cloneObj(val) : val;
      }
      return newObj;
    },
    global_get_leverage_state(s) {
      let order = '';
      switch (s) {
        case 0:
          order = this.$t('patch.WaitingReview');
          break;
        case 1:
          order = this.$t('leverage.alreadyBorrowed');
          break;
        case 2:
          order = this.$t('leverage.repaid');
          break;
      }
      return order;
    },
    formatDate(date, format = 'Y-MM-D') {
      return moment(date).format(format)
    },
    numFormatter(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
      } else if (num > 1000000 && num < 10000000) {
        return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
      } else if (num > 10000000) {
        return (num / 10000000).toFixed(2) + 'B'; // convert to B for number from > 1 billion
      } else if (num < 900) {
        return num; // if value < 1000, nothing to do
      }
      return num
    },

  },
  beforeMount() {
    this.$nextTick(() => {
      this.$v && this.$v.$reset()
    })
  },
  components: {
    'hex-header': Header,
    'hex-black-header': BlackHeader,
    'hex-footer': Footer,
    'hex-lang': lang,
    'hex-black-footer': BlackFooter
  }
});
Vue.use(Socket);
Vue.use(Pubsub);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
  console.error(err, vm, info);
  return true;
};
