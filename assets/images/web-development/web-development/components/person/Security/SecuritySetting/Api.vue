<template>
    <div class="login-history fw-5">
        <a-card class="login-history-card" :bordered="false">
            <a-row :gutter="16" class="px-4 py-4 col-alignment">
                <a-col :lg="12">
                    <p class="mb-0 login-history fw-5">API</p>
                </a-col>
                <a-col :lg="12" align="end"><nuxt-link to="/person/api/api-set"> <a-button class="outline-btn fw-5"><a-icon type="plus" /> {{$t('adsharing.as27')}}</a-button></nuxt-link></a-col>
            </a-row>
        </a-card>
        <a-card class="login-history-card mt-3" :bordered="false">
            <p class="history-list fw-5 px-4 pt-4">{{$t('person.API_person')}}</p>
            <a-table :columns="ApiColums" :data-source="userList" :scroll-y="240" :scroll-x="50"
                class="pb-2" :pagination="false" :rowKey="(record,index ) => index" :loading="loading">
                <div slot="secretKey" slot-scope="text,row">
                    <span class="deposit-table-txt fw-5 pointer" @click='cheKey(row,"checkedKey")'>{{$t('wallet.lookOver')}} {{$t('btntxt.bt9')}}</span>
                </div>
                <div slot="action" slot-scope="text,row">
                    <span class="mr-4 deposit-table-txt fw-5 pointer" @click='cheKey(row,"editIp")'>{{$t('api.modifyWhiteList')}}</span>
                    <span  class="deposit-table-txt fw-5 pointer" @click='cheKey(row,"deleteApi")'>{{$t('api.delete')}}</span>
                </div>
            </a-table>
            <div class=" mb-3 px-3 text-right" v-if="total > 0">
                <a-pagination background @change="handChange" :page-size="page.pagesize"
                :current="page.pageindex"
                popper-class="paging"
                layout="prev, pager, next" :total="total">
                </a-pagination>
            </div>
        </a-card>
        <popupstair
        v-show="popupstate"
        @closePopup="popup"
        @deleteapi="deleteapi"
        ref="popname"/>
        <onlygoogle
        v-show="onlygooglestate"
        @closePopup="googlepopup"
        ref="apiid"
        @createapi="checkedKey"/>
    </div>
</template>

<script>
import popupstair from '@/components/security/popup-stair'
import onlygoogle from '@/components/security/popup-only-google'
export default {
    components: {
      popupstair,
      onlygoogle,
    },
    data() {
        return {
            ApiColums: [
                {
                    title: this.$t("tableskeys.tt12"),
                    dataIndex: 'name',
                    width: 100,

                },
                {
                    title:this.$t("tableskeys.tt13"),
                    dataIndex: 'accesskey',
                    width: 230,

                },
                {
                    title: this.$t("tableskeys.tt14"),
                    dataIndex: 'secretKey',
                    scopedSlots: { customRender: 'secretKey' },
                    width: 120,

                },
                {
                    title: this.$t("tableskeys.tt6"),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    width: 120,
                    align: 'end',

                }
            ],
            onlygooglestate: false,
            popupstate: false,
            deletepop: 0,
            loading: true,
            total: 0,
            found: false,
            userList:[],
            page: {
                pageindex: 1,
                pagesize: 20,
            },
            dialogVisible: false,
            moreState: true,
        }
    },
    methods:{
        getApi(val) {
            this.loading=true
            !val ? this.page.pageindex = 1 : this.page.pageindex = val;
            this.$store.dispatch("user_api_getlist", this.page).then(({data}) => {
            if (data) {
                this.total = data.length;
                this.userList = data;
            } else {
                this.total = 0;
                this.found = true;
                this.userList = [];
            }
            this.loading = false;
            })
        },
        handChange(val) {
            this.getApi(val);
        },
        checkedKey(m) {
            this.onlygooglestate = !this.onlygooglestate;
            this.popupstate = !this.popupstate;
            this.$refs.popname.apipopup(m.pops);
        },
        googlepopup() {
            this.onlygooglestate = !this.onlygooglestate;
        },
        popup() {
            this.popupstate = !this.popupstate;
        },
        cheKey(val, m) {
            val.pops = m;
            const _this = this;
            if (!_this.$userinfo.isgoogleauthed) {
            _this.$store.commit('set_message', {type: 'error', text: _this.$t('authentication.openGoogle')});
            } else {
            _this.onlygooglestate = !this.onlygooglestate;
            _this.$refs.apiid.apipopup(val);
            }
        },
        deleteapi(val) {
            this.userList = this.userList.filter((item) => {
            return item.id != val
            });
            this.total = this.userList.length;
            this.total ? this.found = false : this.found = true;
        },
    },
    mounted() {
      this.getApi();
    },
}
</script>

<style>

</style>
