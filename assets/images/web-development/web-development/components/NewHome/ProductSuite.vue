<template>
  <div class="product-suite mt-10">
    <div class="main-content">
        <p class="mb-2 text-black trading-text fw-5 text-center">{{$t('copytrade.product_suit')}}</p>
        <p class="text-black fw-4 mb-6 text-center product-title">{{$t('copytrade.product_suit_note')}}</p>
        <a-row :gutter="24" v-if="items">
            <a-col :lg="6" v-for="(item,key) in items" :key="key">
                
                <a-card class="product-card pointer" @click="redirect(item)">
                    <img :src="item.img" class="mb-4"/>
                    <p class="fw-5 text-black product-price mb-0">{{ item.title }}</p>
                    <p class="fw-4 text-black desc-txt mb-0">{{ item.desc }}</p>
                </a-card>
         
            </a-col>
        </a-row>
    </div>
  </div>
</template>

<script>
import { btcCtid } from '~/plugins/constants'
export default {
data() {
    return {
        items: [
            {
                id:1,
                img: '/images/product-suite1.svg',
                title: this.$t('lv4form.lvf1'),
                link: '/p2p/buy-and-sell',
                desc: this.$t('bitapp.bta1')
            },
            {
                id:2,
                img: '/images/product-suite2.svg',
                title: this.$t('bitapp.spot_and_future'),
                link: `/contract-pro/btc_yx?ctid=${btcCtid}`,
                desc: this.$t('bitapp.bta2')
            },
            {
                id:3,
                img: '/images/product-suite3.svg',
                title: this.$t('demo_account'),
                link:  '',
                desc: this.$t('bitapp.bta8')
            },
            {
                id:4,
                img: '/images/product-suite4.svg',
                title: this.$t('stratergybot.sb1'),
                link: '/strategy-bot',
                desc: this.$t('bitapp.bta4')
            }
        ] 
    }
},
methods:{
    redirect(product){
        if(product.id==3){
            if (this.$userinfo) {
                var loginkey=crypto.md5String(this.$userinfo.uid+this.$userinfo.secretkey);
                const urlToRedirect="https://test.bitnasdaq.com/deal/btc_usdt?userid="+this.$userinfo.uid+"&loginkey="+loginkey+""
                window.open(urlToRedirect, '_blank');
            } else {
                this.$router.push("/login?returnurl=" + this.$route.path);
            }
        }
        else{
            this.$router.push(product.link);
        }
    }
}
}
</script>

<style>

</style>