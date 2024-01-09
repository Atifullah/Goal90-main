<template>
    <div class="vip-modal">
        <a-modal id="vip-modal" v-model="vipModel" :footer="false" :title="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment mb-4">
                <a-col :lg="24" align="end"><img src="/images/ud-cross.svg" @click="close" class="pointer"/></a-col>
            </a-row>
            <a-row :gutter="16" class="px-3">
                <a-col :lg="24">
                    <p class="steps-heading fw-5 text-center my-4">{{$t('trade.tp16')}}</p>
                    <div class="text-center pt-2">
                        <img src="/images/email-img.svg" />
                    </div>
                    <p class="mb-0 steps-detail fw-4">{{$t('trade.tp17')}}</p>
                    <p class="mb-0 steps-detail fw-4">{{ $t('bscard.bsc48') }}</p>
                    <p class="mb-0 steps-detail fw-4">
                        {{$t('trade.tp18')}}</p>
                        <a-button class="primary-btn fw-5 mt-4 mb-2" :loading="loading" block @click="Apply">{{$t('trade.tp19')}}</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        vipModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
    data(){
        return{
            loading:false
        }
    },
    methods:{
        async Apply() {
            this.loading=true;
            const content={
                uid:this.$userinfo.uid,
                email:this.$userinfo.email,
                remark:''
            }
            try {
                const data  = await this.$store.dispatch('com_comment_create',{
                    content:JSON.stringify(content)
                })
                if (data) { 
                    this.$store.commit('set_message', {type: 'ok', text: this.$t('texts.txt38')});
                    this.close();
                }
                this.loading=false;
            } catch (error) {
                //console.log('Error', error)
                this.loading=false;
            }
        }
    }
}
</script>

<style>

</style>
