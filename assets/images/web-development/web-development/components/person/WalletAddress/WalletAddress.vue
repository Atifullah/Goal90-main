<template>
    <div class="wallet-address">
        <a-card :bordered="false" class="address-book-card">
            <a-row class="col-alignment">
                <a-col :lg="14" :xl="16">
                    <a-row>
                        <a-col :lg="24">
                            <p class="wallet-address-heading fw-5 mb-0">{{ $t('person.Wallet_Address_person') }}</p>
                        </a-col>
                        <a-col :lg="24">
                            <span class="address-book fw-5"><img src="/images/gray-q-icon.svg" class="mr-1" />{{
                                $t('person.withdraw_ab_person') }}</span>

                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="5" :xl="4" align="end">
                    <p class="mb-0 white-list fw-5">{{ $t('person.white_list_person') }} <a-switch :checked="openaddrwhitelist"
                            @change="openwhiteListDialogue" class="ml-2" /></p>
                </a-col>
                <a-col :lg="5" :xl="4" align="end">
                    <a-button class="outline-btn fw-5" @click="addAddress = true"><a-icon type="plus" /> {{
                        $t('person.add_adr_person') }}</a-button>

                </a-col>
            </a-row>
        </a-card>
        <a-card :bordered="false" class="mt-3 wallet-address-card">
            <div class="shadow-card pt-4 px-4 pb-4">
                <a-row :gutter="16">
                    <a-col :lg="5">
                        <hex-select ref="currencyDetails" :label="$i18n.t('Waddress.selectCion')"
                            :type="$i18n.t('Waddress.selectCion')" :order="currencyDetails" :market="currencyid"
                            @searchData="searchData" @change="change" @clearCurrentState="clearCurrentState" />
                    </a-col>
                    <a-col :lg="6">
                        <a-range-picker @change="changeDate" v-model="calender" />
                    </a-col>

                    <a-col :lg="4" :xl="3" class="some-code-btn-space">
                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                            <a-button block class="outline-btn fw-5 px-2" @click="resetSelect">
                                <svg width="15" height="15" class="svg-icon mr-2 refresh-icon" >
                                        <use :xlink:href="hoverKey == 2 ? '/images/svg/sprite.svg#refresh-white-icon':'/images/svg/sprite.svg#refresh-icon-icon'"></use>
                                        </svg>
                            {{ $t('memberCenter.reset')
                                    }}</a-button>
                        </span>
                    </a-col>
                </a-row>
            </div>
            <div class="main-currency-card">

            <div class="currency-detail px-4 mb-5 pt-2">
                <a-row :gutter="16" class="px-3">
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{ $t('person.coins_person') }}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{ $t('person.Note_person') }}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{ $t('person.Network_person') }}</p>
                    </a-col>
                    <a-col :lg="8">
                        <p class="type-coin-txt fw-4">{{ $t('person.Wallet_Address_person') }}</p>
                    </a-col>
                    <a-col :lg="5" align="end">
                        <p class="type-coin-txt fw-4">{{ $t('person.Action_person') }}</p>
                    </a-col>

                </a-row>
                <a-card :bordered="false" v-for="(address, index) in addresses" :key="index" class="currency-detail-card "
                    :class="index == 0 ? 'first-card' : ''">
                    <a-row class="px-3 curency-detail-bg">
                        <a-col :lg="14">
                            <p class="mb-0 currency-txt fw-5">{{ global_get_local_time(address.createtime).format("YYYY-MM-DD HH:mm:ss") }}</p>
                        </a-col>
                        <a-col :lg="10" align="end">
                            <p class="mb-0 copy-link-txt fw-5"><span :id="`keycopy${index}`">{{ address.id }}</span>
                                <AppClipboard :target="`#keycopy${index}`" element-class="link-url1" />

                                    </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="px-3 py-4 col-alignment">
                        <a-col :lg="4">
                            <p class="col-alignment currency-txt fw-5 usdt-txt mb-0"><img class="mr-2"
                                    :src="getCurrencyIcon(address.currencyid)" height="20"
                                    width="20" />{{ address.currencyname }}</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{ address.remark }}</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0">{{ address.ctype }}</p>
                        </a-col>
                        <a-col :lg="8">
                            <p class="currency-txt fw-5 usdt-txt mb-0 pointer"><span
                                    :id="`keycopy${index}1`">{{ address.address }}</span>
                                    <AppClipboard :target="`#keycopy${index}1`" element-class="link-url1" />

                                    </p>
                        </a-col>
                        <a-col :lg="5" align="end">
                            <p class="currency-txt fw-5 usdt-txt mb-0">
                                <a-row :gutter="16">
                                    <a-col :lg="14" class="pointer">
                                        <p class="edit-txt mb-0" @click="openVerification(true, address)"><img
                                                src="/images/edit-icon.svg" class="mr-2" />{{ address.iswhitelist ? 'Close White':'Open White'}}</p>
                                    </a-col>
                                    <a-col :lg="10" class="pointer">
                                        <p class="edit-txt mb-0" @click="deletepopup(address, 'deleteAddress')"><img
                                                src="/images/del-icon.svg"
                                                class="mr-2" />{{ $t('person.delete_person') }}</p>
                                    </a-col>
                                </a-row>
                            </p>
                        </a-col>
                    </a-row>
                </a-card>
                <NoData v-if="addresses.length < 1" />
                <div class="text-right mt-3" v-if="total > 0">
                    <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                        popper-class="paging" layout="prev, pager, next" :total="total">
                    </a-pagination>
                </div>
            </div>
</div>
        </a-card>
        <AddAddressModal :addAddressModal="addAddress" :close="close" :getListAddresses="getListAddresses" />
        <popupstair v-show="deleteState" @closePopup="deletePopupState" @deleteAddress="deleteAddress" title="Are You Sure?"
            subTitle="You Want to Delete the Payment Method" ref="popname" />
        <VerificationMethod v-if="verificationModel" :verificationModel="verificationModel" :close="close"
            @confirmPaymentMethod="confirmPaymentMethod" :loading="loading" />
        <openWhiteListModel v-if="whiteListDialogue" :close="closewhiteListDialogue" :open="open"
            :confirm="() => openVerification(false, {})" />
    </div>
</template>

<script>
import AppClipboard from '~/components/App/AppClipboard.vue';

import select from '@/components/security/deal_select'
import popupstair from '@/components/security/popup-only-google'
import VerificationMethod from "@/components/person/PaymentMethod/PaymentModal/VerificationMethod";
import openWhiteListModel from "./openWhiteListModel.vue"
import AddAddressModal from './AddAddressModal'
import NoData from '~/components/public/NoData';
import crypto from "@/plugins/axios/crypto";
import Clipboard from 'clipboard';
export default {
    components: {
        AddAddressModal,
        popupstair,
        "hex-select": select,
        NoData,
        VerificationMethod,
        openWhiteListModel,
        AppClipboard
    },
    data() {
        return {
            hoverKey: -1,
            loading: false,
            walletAddresscolumns: [
                {
                    title: this.$t("tableskeys.tk14"),
                    dataIndex: 'asset',
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.lh11"),
                    dataIndex: 'netWork',
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.lh12"),
                    dataIndex: 'note',
                    width: 100,
                },
                {
                    title: this.$t("tableskeys.lh13"),
                    dataIndex: 'walletAddress',
                    width: 150,
                },
                {
                    title: this.$t("tableskeys.lh14"),
                    dataIndex: 'change',
                    scopedSlots: { customRender: 'change' },
                    width: 100,
                    align: 'end'
                },

            ],
            addAddress: false,
            verificationModel: false,
            currencyDetails: [],
            currencyid: this.$t('formMenu.select'),
            addresses: [],
            calender: [],
            searchParam: {},
            page: {
                pageindex: 1,
                pagesize: 10,
            },
            edit: false,
            open: false,
            whiteListDialogue: false,
            openaddrwhitelist: false,
            address: {

            },
            deleteId: {},
            deleteState: false,
            found: false,
            total: '',
        }
    },
    methods: {
        confirmPaymentMethod(verifycode) {
            if (this.edit) {
                this.editWhiteList(verifycode)
            }
            else {
                this.openWhiteList(verifycode)
            }
        },
        handChange(val) {
            this.getListAddresses(val);
        },
        getCurrencyIcon(id) {
            return this.$store.state.currencyinfos.filter(item => item.id == id)[0].icon;
        },
        deletePopupState() {
            this.deleteState = !this.deleteState;
        },
        deletepopup(vid, m) {
            this.deleteId = vid;
            this.deleteState = !this.deleteState;
            this.$refs.popname.ShowPopup(vid, m);
        },
        deleteAddress(id) {
            this.$store.dispatch("user_withdraw_address_delete",
                { id: id }
            ).then((res) => {
                if (res.data) {
                    this.deleteState = !this.deleteState;
                    this.addresses = this.addresses.filter((item) => item.id != id);
                    this.$store.commit('set_message',
                        { type: 'ok', text: res.msg });
                }
            })
        },
        searchData(val) {//用于存子组件传过来数据
            this.searchParam[val.type] = val.id;
            this.search();
        },
        change(val) {
            const _self = this;
            switch (val) {
                case 'currencyDetails':
                    _self.$refs.currencyDetails.changeBack();
                    break;
            }
        },
        search() {
            this.getListAddresses(1);
        },
        changeDate(date, dateString) {
            this.searchParam['startTime'] = dateString[0];
            this.searchParam['endTime'] = dateString[1];
            this.search();
        },
        resetSelect() {
            this.$refs.currencyDetails.clearStatus();
            this.calender = []
            this.searchParam = {};
            this.search();
        },
        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        closewhiteListDialogue() {
            this.whiteListDialogue = false;
        },
        openwhiteListDialogue() {
            this.open = !this.openaddrwhitelist;
            this.whiteListDialogue = true;
        },
        openVerification(val, address) {
            this.whiteListDialogue = false;
            this.edit = val;
            this.address = address;
            this.verificationModel = true;
        },
        close() {
            this.addAddress = false;
            this.verificationModel = false;
            this.openaddrwhitelist = this.$usersettings.openaddrwhitelist;;
        },
        getallcoininfos() {
            this.$store.state.currencyinfos.forEach(item => {
                this.currencyDetails.push({
                    id: item.id,
                    value: item.currencyname,
                    type: 'currencyid',
                    icon: item.icon
                });
            });
        },
        async getListAddresses(pageIndex) {
            var postData = Object.assign(this.searchParam, this.page,);
            pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
            this.loading = true;
            try {
                let { data } = await this.$store.dispatch('user_withdraw_address_search', postData);
                if (data) {
                    this.addresses = data.pagedata;
                    this.total = data.totalitemcount;
                    this.total ? this.found = false : this.found = true;
                }
                else {
                    this.total = 0;
                    this.addresses = [];
                }
                this.loading = false;
            } catch (error) {
                //console.log('Error', error);
                this.loading = false;
            }
        },
        async openWhiteList(verifycode) { 
            this.loading = true;
            let postData = {};
            postData.isOpen = !this.$usersettings.openaddrwhitelist;
            if (verifycode.googleVerifyCode != undefined) {
                postData.googleVerifyCode = verifycode.googleVerifyCode
            }
            else {
                postData.payPassword = crypto.md5String(verifycode.payPassword);
            }
            try {
                let { data } = await this.$store.dispatch('user_withdraw_address_whitelist', postData);
                if (data) {
                    this.global_refresh_user_settings();
                    this.verificationModel = false;
                    this.openaddrwhitelist = !this.openaddrwhitelist;
                }
                else {
                    this.openaddrwhitelist = this.$usersettings.openaddrwhitelist;
                }
                this.loading = false;
            } catch (error) {
                //console.log('Error', error);
                this.openaddrwhitelist = this.$usersettings.openaddrwhitelist;
                this.loading = false;
            }

        },
        async editWhiteList(verifycode) {
            //console.log("Nisar")
            this.loading = true;
            let postData = {};
            postData.withdrawAddressID = this.address.id;
            postData.isOpen = !this.address.iswhitelist;
            if (verifycode.googleVerifyCode) {
                postData.googleVerifyCode = verifycode.googleVerifyCode
            }
            else {
                postData.payPassword = crypto.md5String(verifycode.payPassword);
            }
            try {
                let { data } = await this.$store.dispatch('user_withdraw_address_whitelist_edit', postData);
                if (data) {
                    this.getListAddresses(1);
                    this.close();
                }
                this.loading = false;
            } catch (error) {
                //console.log('Error', error);
                this.loading = false;
            }

        },
        async userSettings() {
            if (Object.keys(this.$usersettings).length == 0) {
                try {
                    const settings = await this.global_refresh_user_settings();
                    this.openaddrwhitelist = settings.openaddrwhitelist;
                } catch (e) {
                    //console.log(e)
                }

            }
            else {
                this.openaddrwhitelist = this.$usersettings.openaddrwhitelist;
            }
        }
    },
    mounted() {
        this.userSettings();
        this.getallcoininfos();
        this.resetSelect();
        this.getListAddresses(1);

    },
}
</script>

<style></style>
