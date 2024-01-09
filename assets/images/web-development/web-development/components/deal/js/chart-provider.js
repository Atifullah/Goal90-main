export default {
  history: {},
  timer: {},
  pollingtimer: {},
  subs: [],
  init() {
    this.history = {};
    this.timer = {};
    this.subs = [];
    this.timedifferencemin = 0;
  },
  formatBar: function (data, this_vue, symbolInfo) {
    const sub = this.subs.find(e => e.symbolInfo === symbolInfo.name);
    if (!sub || !sub.lastBar) {
      return false
    }
    if (!Array.isArray(data)) {
      data = [data]
    }
    data.sort((a, b) => {
      return a.t - b.t
    });
    const bars = data.map(el => {
      let _lastbar = {
        low: sub.lastBar.low > el.l ? el.l : sub.lastBar.low,
        high: sub.lastBar.high > el.h ? sub.lastBar.high : el.h,
        open: el.o == 0 ? sub.lastBar.open : el.o,
        close: el.c,
        volume: el.o == 0 ? sub.lastBar.volume + el.v : sub.lastBar.volume
      };
      var inowtime = this_vue.global_get_local_time(el.t).valueOf();
      if ((inowtime - sub.lastBar.time) >= this.timedifferencemin) {
        _lastbar = {
          low: el.l,
          high: el.h,
          open: sub.lastBar.close,
          close: el.c,
          volume: el.v
        };
      }
      _lastbar.time = (inowtime - sub.lastBar.time >= this.timedifferencemin) ? inowtime : sub.lastBar.time; //TradingView requires bar time in ms  
      return _lastbar
    });
    //是否订阅 
    bars.forEach((item) => {
      //更新最新一条k线
      sub.listener(item);
      sub.lastBar = item;
      this.history[symbolInfo.name].lastBar = item
    });
    return true
  },
  getLastBarsOther: function (this_vue, symbolInfo) {
    const _self = this;
    this_vue.$socket.invoke({
      sub: this_vue.sub,
      type: this_vue.$socket.type.quotation_kline_get
    });
    this_vue.$socket.receive(this_vue.$socket.type.quotation_kline_get, (res) => {//socket订阅1分钟线     
      if (res && res.topic == this_vue.sub) {
        _self.formatBar.call(_self, res.data, this_vue, symbolInfo);
      }
    });
    /* 订阅最新价 */
    this_vue.$pubsub.subscribe(this_vue.$pubsub.changeNewMoney, (index, res) => {
      if (res && (res.symble == this_vue.symbleinfo.descriptions.replace('/', '').toUpperCase()) && this_vue.resolutionInterval <= 3) {//socket订阅最新价 
        const data = {
          t: res.ts,
          l: res.price,
          o: 0,
          h: res.price,
          c: res.price,
          v: res.amount
        };
        _self.formatBar.call(_self, data, this_vue, symbolInfo)
      }
    });
  },
  getBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    //k线图
    let etime = to;
    if (this.history[symbolInfo.name] && this.history[symbolInfo.name].firstBar) {
      etime = this.history[symbolInfo.name].firstBar.time / 1000
    }
    console.log("history:getBars ", history,to, etime);
    const klineParam = {
      //'btime': from,
      'etime': etime,
      "type": this_vue.resolutionInterval,
      "size": 250,
      "symble": this_vue.symbleinfo.descriptions.replace('/', ''),
      "isindexprice": this_vue.isindexprice
    };
    const _self = this;
    const getKline = function () {
      return this_vue.$store.dispatch('quotation_kline_get', klineParam)
        .then(({ data }) => {
          if (data) {
            data.sort((a, b) => {
              return a.t - b.t
            });
            const bars = this_vue.bars = data.map(el => {
              return {
                time: this_vue.global_get_local_time(el.t).valueOf(), //TradingView requires bar time in ms
                low: el.l,
                high: el.h,
                open: el.o,
                close: el.c,
                volume: el.v
              }
            });
            if (bars.length > 2) {
              _self.timedifferencemin = bars[1].time - bars[0].time;
            }
            _self.history[symbolInfo.name] = {
              lastBar: bars[bars.length - 1],
              firstBar: bars[0]
            };
            return bars
          } else {
            return []
          }
          this_vue.widgetloading = false;
        })
    };
    return getKline()
  },
}
