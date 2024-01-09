<template>
    <div class="profile-tabs">
        <a-card :bordered="false" class="mt-3 blocked-card">
            <a-tabs v-model="activeTab" @change="changeTab">
                <a-tab-pane key="2" :tab="`Feedback (${total})`">
                    <Feedback :feedbacks="feedbacks" />
                    <div class=" px-3 pb-4 text-right" v-if="total > 0">
                        <a-pagination background @change="handleChange" :page-size="page.pagesize" :current="page.pageindex"
                            popper-class="paging" layout="prev, pager, next" :total="total">
                        </a-pagination>
                    </div>
                    <NoData v-if="feedbacks.length < 1" />
                </a-tab-pane>
                <a-tab-pane key="3" :tab="`Block Users (${blockUsers.length})`">
                    <a-row :gutter="16" class="p-4">
                        <p class="user-name fw-5 px-2">{{$t('pinfo.pin15')}}</p>
                        <a-col :lg="8" v-for=" item in blockUsers" :key="item.id">
                            <a-card class="light-pink-card">
                                <a-row class="pink-row col-alignment px-3 py-3">
                                    <a-col :lg="20">
                                        <p class="mb-0 aliston-square fw-5"> <span class="photo mr-2"
                                                :style="{ 'background-color': global_get_random_color(item.blockuserid.substring(item.blockuserid.length - 1)) }">
                                                {{ getname(item.blocknickname) }}
                                            </span> {{ item.blocknickname }}
                                        </p>
                                    </a-col>
                                    <a-col :lg="4" align="end">
                                        <img src="/images/block-user.svg" />
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="px-3 py-4 col-alignment">
                                    <a-col :lg="14">
                                        <p class="user-name fw-5 mb-0">{{ item.reason }}</p>
                                    </a-col>
                                    <a-col :lg="10" align="end">
                                        <a-button class="outline-btn fw-5" :loading=item.loading
                                            @click="unblock(item)">{{$t('pinfo.pin16')}}</a-button>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </a-col>
                    </a-row>
                    <NoData v-if="blockUsers.length < 1" />
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>

<script>
import PaymentDetail from '~/components/person/PaymentMethod/PaymentDetail';
import Feedback from '../CounterParty/Feedback.vue';
import NoData from '~/components/public/NoData';
export default {
    components: {
        Feedback,
        PaymentDetail,
        NoData
    },
    props: {
        getname: {
            type: Function
        }
    },
    data() {
        return {
            bindCollection: [],
            feedbacks: [],
            blockUsers: [],
            activeTab: '2',
            total: 0,
            page: {
                pageindex: 1,
                pagesize: 5,
            },
        }
    },
    methods: {
        changeTab(key) {
            if (key == 1) {
                this.total = 0;
            }
            else if (key == 2) {
                this.getUserFeedBacks()
            }
            else {

            }
        },
        handleChange(val) {
            if (this.activeTab == 1) {

            }
            else if (this.activeTab == 2) {
                this.getUserFeedBacks(val)
            }
            else {

            }
        },
        async paymentGetList() {
            this.$store.dispatch('user_user_payments_get').then(({ data }) => {
                if (data) {
                    this.bindCollection = data;
                }
            })
        },
        async getBlockUser() {
            this.$store.dispatch('trading_c2c_block_user_get').then(({ data }) => {
                if (data) {
                    this.blockUsers = data;
                    //console.log(data)
                }
            })
        },
        async deletePaymentMethod(id) {
            const _self = this;
            try {
                await _self.$store.dispatch('user_user_payments_delete', {
                    id: id
                });
                _self.paymentGetList();
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async getUserFeedBacks(pageIndex) {
            const _self = this;
            this.page.pageindex = pageIndex ? pageIndex : 1;
            let reqData = Object.assign(this.page);
            reqData.toUid = this.$userinfo.uid;
            reqData.advid = 0;
            try {
                let { data } = await _self.$store.dispatch('trading_c2c_evaluates_get', reqData);
                if (data) {
                    this.feedbacks = data.pagedata;
                    this.total = data.totalitemcount;
                }
                else {
                    this.total = 0;
                    this.feedbacks = [];
                }
            } catch (error) {
                //console.log('Error', error);
            }
        },
        async unblock(item) {
            const _self = this;
            item.loading = true;
            let postData = {
                blockUserID: item.blockuserid,
                blockNickName: item.blocknickname,
            }
            try {
                const data = await _self.$store.dispatch('trading_c2c_block_user_update', postData);
                if (data) {
                    _self.blockUsers = _self.blockUsers.filter(_bu => _bu.blockuserid != item.blockuserid)
                    _self.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt27') });
                }
                item.loading = false;
            } catch (error) {
                //console.log('Error', error);
                item.loading = false;
            }
        },
    },
    mounted() {
        this.getUserFeedBacks()
        this.getBlockUser();
    }
}
</script>

<style lang="scss" scoped>
.photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    width: 39px;
    height: 39px;
    line-height: 39px;
    vertical-align: middle;
    margin-right: 0px;
    color: #ffffff;
    position: relative;
    img {
        object-fit: cover;
    }
}

.photo:after {
    content: '';
    display: inline-block;
    width: 8px;
    position: absolute;
    height: 8px;
    border-radius: 50%;
    background-color: #DDDDDD;
    background-clip: content-box;
    border: 2px solid #ffffff;
    bottom: 0;
    right: 0;
}

.photo.online:after {
    background-color: #0ED12A;
}
</style>
