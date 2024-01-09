<template>
  <div class="market-table">
    <a-card class="estimated-market-table main-card" :bordered="false" >
      <p class="all-main-heading px-4 mb-2">{{ $t('person.Markets_person') }}</p>
      <a-table :columns="columns" :pagination="false" :data-source="data.slice(0, 6)" rowKey="ctid" :loading="loading">
        <div slot="name" slot-scope="text,row">
          <nuxt-link :to="`/deal/${row.symble.replace('/', '_')}`">
            <p class="mb-0 col-alignment market-usdt-btc">
              <img :src="row.logo" class="mr-2" width="21" height="21" />{{ getSymble(row.symble).from }}/{{
                getSymble(row.symble).to }}
            </p>
          </nuxt-link>
        </div>
        <div slot="price" slot-scope="text,row">
          <p class="mb-0 first-txt">{{ global_get_tofixed(row.c, global_get_decimal(row.symble).p) }}</p>
          <span class="second-txt"> ≈ {{ $store.getters.get_client_exchange_rate_name.mark }}{{ getClientExchangeRate(row)
          }}</span>
        </div>
        <div slot="changes" slot-scope="text,row">
          <span :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(row) }}%</span>
        </div>
        <div slot="action" slot-scope="text,row">
          <a-button class="trade-btn outline-btn fw-5">
            <nuxt-link :to="`/deal/${row.symble.replace('/', '_')}`">{{ $t('person.Trade_person') }}</nuxt-link>
          </a-button>
        </div>
      </a-table>
    </a-card>
  </div>
</template> 
<script>

export default {
    data() {
        return {
          loading:true,
            columns: [
                {
                    title: this.$t('person.coins_person'),
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                    width: 190,
                },
                {
                    title: this.$t('public.pub11'),
                    dataIndex: 'price',
                    scopedSlots: { customRender: 'price' },
                    width: 170,
                },
                {
                    title: this.$t('public.24chan'),
                    dataIndex: 'changes',
                    scopedSlots: { customRender: 'changes' },
                    width: 140,
                },
                {
                    title: this.$t('person.Action_person'),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    width: 80,
                    align: 'end'
                },
            ],
            data: []
        };
    },
    methods: {
        async getDailyAll() {
            const _self = this;
            _self.loading=true
            try {
                const { data } = await this.$store.dispatch('quotation_daily_getall', {
                    iscontract: 0,
                    displaylocation: 0, // 1首页带走势图，2，仅有走势图（只有市场页面） 0，不带走势图
                    pageIndex: 1,
                    pageSize: 6
                });
                if (data) {
                    this.data = data.pagedata;
                    this.$socket.invoke({
                        sub: "market.0.tickers",
                        type: _self.$socket.type.quotation_daily_getall,
                    });
                    this.$socket.receive(_self.$socket.type.quotation_daily_getall, _self.callback);
                }
_self.loading=false
              }
            catch (error) {
              _self.loading=false
                //console.log(error);
            }
        },
        callback(data) {
            let newdatas = [];
            this.data.forEach((m) => {
                var datainfos = data.data.filter((item) => {
                    return item.ctid == m.ctid;
                });
                if (datainfos.length > 0) {
                    m.c = datainfos[0].c;
                    m.h = datainfos[0].h;
                    m.l = datainfos[0].l;
                    m.o = datainfos[0].o;
                    m.v = datainfos[0].v;
                    m.t = datainfos[0].t;
                }
                newdatas.push(m);
            });
            this.data = [];
            this.data = newdatas;
        },
        getlimitprice(item) {
            return ((item.c - item.o < 0 ? "-" : "+") +
                this.global_get_limitprice(item));
        },
        getSymble(s) {
            s = this.global_get_uppercase(s);
            s = s.split("/");
            return {
                from: s[0],
                to: s[1],
            };
        },
        getClientExchangeRate(tradeData) {
            if (tradeData.symble) {
                let symble = tradeData.symble.split("/");
                if (symble.length > 1) {
                    symble = symble[1];
                }
                return this.$store.getters.get_client_exchange_rate(symble, tradeData.c);
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.getDailyAll();
        });
    },
    beforeDestroy() {
        let substr = "market.0.tickers";
        this.$socket.uninvoke({
            sub: substr,
            type: this.$socket.type.quotation_daily_getall,
        });
    },
}
</script> 