<template>
    <div>
        <div class="main-content" id="all-notification">
            <a-card :bordered="false" class="mt-3">
            <p class="mb-0 notification-title fw-5">{{$t('noti_fication.noti6')}}</p>
        </a-card>
            <div v-if="!loading" class="all-notification pt-3">
                <a-card :bordered="false">
                    <a-tabs v-model="activeTab" @change="changeTab">
                        <a-tab-pane key="0" :tab="$t('tabkeys.tab1')">
                        </a-tab-pane>
                        <a-tab-pane key="1" :tab="$t('tabkeys.tab2')">
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="$t('tabkeys.tab3')">
                        </a-tab-pane>
                        <a-tab-pane key="9" :tab="$t('tabkeys.tab4')">
                        </a-tab-pane>
                        <a-tab-pane key="4" :tab="$t('tabkeys.tab5')">
                        </a-tab-pane>
                    </a-tabs>
                </a-card>

                <a-card class="mt-3 notification-detail-card mb-5" :bordered="false">
                    <a-row v-for="(list, key) in notifications" :key="key" :gutter="16">
                        <a-col :lg="2" align="center" class="pl-3 py-4 list-desc fw-5 notification-col"><p class="mb-0 date-txt fw-5">{{
                            global_get_local_time(list.createtime, "MMM Do")
                        }}</p>
                        <p class="mb-0 date-txt fw-5">{{
                            global_get_local_time(list.createtime, "YYYY")
                        }}</p>
                        </a-col>
                        <a-col :lg="1" align="end" class="py-4"><img src="/images/notification-status.svg" /></a-col>
                        <a-col :lg="21" class="py-4">
                            <span @click="goTo(list.typeid)" class="pointer">
                                <p class="mb-2 list-heading fw-5">{{list.title}}</p>
                                <p class="list-desc fw-5 mb-0">{{ list.content }}</p>
                            </span>

                        </a-col>

                    </a-row>
                    <NoData v-if="notifications.length<1"/>
                    <div class=" px-3 pb-4 text-right" v-if="total > 0">
                        <a-pagination background @change="handChange" :page-size="page.pagesize"
                            :current="page.pageindex" popper-class="paging" layout="prev, pager, next" :total="total">
                        </a-pagination>
                    </div>
                </a-card>
            </div>
            <div v-else>
                <a-spin
                    style="height:90vh; display:flex; justify-content:center; align-items:center; background:#FDFDFD;">
                    <a-icon slot="indicator" type="loading" style="font-size: 24px; " spin />
                </a-spin>
            </div>
        </div>
    </div>
</template>

<script>
import NoData from '~/components/public/NoData';
export default {
    components:{
        NoData
    },
    data() {
        return {
            notifications: [],
            page: {
                pageindex: 1,
                pagesize: 10,
            },
            activeTab:'0',
            total: 0,
            loading: true,
            types:[
                {
                    typeid:1,
                    route:'person/wallet-history'
                },
                {
                    typeid:2,
                    route:'person/wallet-history'
                },
                {
                    typeid:4,
                    route:'/person/login-history'
                },
                {
                    typeid:9,
                    route:'/person/send-recieve-crypto/send-crypto'
                },
            ]
        }
    },
    methods: {
        changeTab(){
            this.getListNotifications();
        },
        goTo(type){
            const typeFound=this.types.filter(item=>item.typeid==type)
            if(typeFound.length>0){
                this.$router.push(typeFound[0].route)
            }

        },
        async getListNotifications(pageIndex) {
            const _self = this;
            this.total = 0;
            this.loading = true;
            this.page.pageindex = pageIndex ? pageIndex : 1;
            var postData = Object.assign(this.page);
            postData.type=this.activeTab;
            try {
                let { data } = await _self.$store.dispatch('user_msg_notice_get', postData);
                if (data) {
                    this.notifications = data.pagedata;
                    this.total = data.totalitemcount;
                } else {
                    this.total = 0;
                    this.notifications = [];
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        handChange(val) {
            this.getListNotifications(val);
        },
    },
    mounted() {
        this.getListNotifications();
    }

}
</script>

<style>

</style>
