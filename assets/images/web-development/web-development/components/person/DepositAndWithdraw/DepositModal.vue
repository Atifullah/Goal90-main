<template>
    <div class="deposit-modal">
        <a-modal id="deposit-modal" v-model="depositModal" width="593px" :footer="false" :title="false" @cancel="close" >
            <a-row :gutter="16" class="col-alignment mb-4">
                <a-col :lg="12">
                    <p class="deposit-crypto-head fw-5 mb-0">{{ $t('person.pd1') }}</p>
                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" @click="close"
                        class="pointer" /></a-col>.
                        
            </a-row>
            <a-row :gutter="16" class="mt-2">
                <a-col :lg="13">
                    <p class="step-heading fw-5 mb-2">{{ $t('person.pd13') }}</p>
                    <a-select style="width: 100%" class="mb-3" v-model="currencySelected"
                        :placeholder="$t('formMenu.select')" @change="currencyOnChange">
                        <a-select-option v-for="item in currencies" :key="item.id" :value="item.currencyname">
                            <img :src="item.icon" class="mr-1" width="15" height="15" />
                            {{ item.currencyname }}</a-select-option>
                    </a-select>
                    <div v-show="mainChains.length > 0">
                        <p class="step-heading fw-5 mb-2">{{ $t('person.pd2') }}</p>
                        <a-select v-model="radio" :placeholder="$t('placeholders.plh31')" @change="getAddress(radio)"
                            style="width: 100%" class="mb-3">
                            <a-select-option v-for="(item, i) in mainChains" :key="i">
                                <a-row :gutter="16">
                                    <a-col :lg="24" :xl="24">
                                        {{ item.tokenfullname }}
                                        ( {{ item.tokentype.toUpperCase() }} )
                                    </a-col>
                                </a-row>
                            </a-select-option>

                        </a-select>
                        <p class="step-heading fw-5 mb-2">{{ $t('person.pd3') }}</p>
                        <p class="copy-link-box deposit-address-copy fw-4">
                            <a-row :gutter="16">
                                <a-col :lg="20">
                                    <p id='keycopy' class="mb-0 deposit-address-link" :title="depositAddress"><span> {{
                                        depositAddress }}</span></p>
                                </a-col>
                                <a-col :lg="4">
                                    <AppClipboard target="#keycopy" element-class="link-url1" />

                                </a-col>
                            </a-row>
                        </p>
                        <a-card class="gray-card" v-if="radio >= 0 && mainChains.length > 0">
                            <p class="important-txt fw-5">{{ $t('person.pd4') }}:</p>
                            <div class="scroll">
                                <ul class="important-list pr-2">
                                    <li>{{ `${$t('depositModal.dm4')}
                                          ${currencySelected}(${mainChains[radio].tokentype}) ${$t('depositModal.dm5')}` }}
                                    </li>
                                    <li>{{ `${$t('depositModal.dm6')} ${mainChains[radio].arrivaltime}
                                           ${$t('depositModal.dm7')} ${mainChains[radio].arrivaltime}
                                             ${$t('depositModal.dm8')}` }}</li>
                                    <li>{{ `${$t('depositModal.dm9')} ${mainChains[radio].mindeposit}
                                              ${currencySelected}(${mainChains[radio].tokentype}). ${$t('depositModal.dm10')}` }}
                                    </li>
                                </ul>
                                <span v-show="showMore">
                                    <ul class="important-list">
                                        <li>{{ $t('person.pd5') }}</li>
                                        <li>{{ $t('person.pd6') }}</li>
                                        <li>{{ `${currencySelected} ${$t('depositModal.dm11')}` }}</li>
                                    </ul>
                                </span>
                            </div>
                        </a-card>

                    </div>
                </a-col>
                <a-col :lg="11">

                    <div style="position:relative">
                        <div class="bg-image" v-if="acknowledge">
                            <ul class="acknowledge-list mb-4 mt-3">
                                <li class="fw-5" >{{ $t('depositModal.dm1') }}</li>
                                <li class="fw-5" >{{ $t('depositModal.dm2') }}</li>
                                <li class="fw-5" >{{ $t('depositModal.dm3') }} <nuxt-link to="/person/authentication">{{ $t('person.pd7')
                                }}</nuxt-link></li>
                            </ul>
                            <div class="text-center">
                                <a-button class="acknowledge-btn fw-4 px-4 mt-2" @click="acknowledge = false">{{ $t('person.pd8')
                                }}</a-button>
                            </div>
                        </div>
                        <div :class="{ 'acknowledge': acknowledge }">
                            <a-card class="mb-3 qrcode-card" :bordered="false">
                                <p class="withdraw-qrcode-txt fw-5 mb-3 pl-2">{{ $t('person.pd9') }}</p>
                                <div class="canvas" v-if="depositAddress != ''" id="canvas">
                                </div>
                                <a-row :gutter="16" class="pt-3 pl-3">
                                    <a-col :lg="24" class="pb-3">
                                        <p class="mb-2 minimum-deposit-rqcode fw-5 text-left">{{ $t('person.pd10') }}</p>
                                        <p class="mb-0 num-deposit-rqcode fw-5 text-left">{{ mainChains[radio]?.mindeposit }}
                                            {{ currencySelected }}</p>
                                    </a-col>
                                    <a-col :lg="24">
                                        <p class="mb-2 minimum-deposit-rqcode fw-5 text-left">{{ $t('person.pd11') }}</p>
                                        <p class="mb-0 num-deposit-rqcode fw-5 text-left">{{ mainChains[radio]?.arrivaltime }}
                                            {{ $t('person.pd12') }}</p>
                                    </a-col>
                                </a-row>
                            </a-card>
                        </div>
                    </div>




                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import Qrlogo from '@/static/images/qrlogo.png'
import AppClipboard from '~/components/App/AppClipboard.vue';

export default {
    props: {
        depositModal: {
            type: Boolean
        },
        selectedRow: {
            type: Object
        },
        close: {
            type: Function
        }
    },
    components: {
        AppClipboard
    },
    data() {
        return {
            currencySelected: '',
            currencies: [],
            radio: -1,
            depositAddress: '',
            mainChains: [],
            showMore: true,
            acknowledge: false,
            QRCodeStyling: null
        }
    },
    methods: {
        currencyOnChange() {
            this.getChains();
        },
        async copyToClipboard() {
            try {
                await navigator.clipboard?.writeText(this.depositAddress);
            } catch (e) {
                //console.log(e);
            }
        },
        bindQRCode(code) {
            const _self = this;
            let bb;
            bb = setInterval(() => {
                if (document.getElementById('canvas')) {
                    const qrCode = new _self.QRCodeStyling({
                        width: 200,
                        height: 200,
                        type: "canvas",
                        data: JSON.parse(code).address,
                        //image: Qrlogo,
                        dotsOptions: {
                            color: "#000",
                        },
                        backgroundOptions: {
                            color: "#fff",
                        },
                    });

                    document.getElementById("canvas").innerHTML = null;
                    qrCode.append(document.getElementById("canvas"));
                    clearInterval(bb);
                }
            }, 100);


        },
        async getChains() {
            if (!this.currencySelected == '') {
                const _self = this;
                _self.mainChains = [];
                _self.radio = -1;
                _self.depositAddress = '';
                try {
                    let { data } = await _self.$store.dispatch('get_user_deposit_and_withdrawl_configuration', {
                        token: this.currencySelected.toLowerCase(),
                    });
                    if (data) {
                        this.mainChains = data.mainchains;
                        _self.radio = this.mainChains.length - 1;
                        if (_self.radio >= 0) {
                            _self.getAddress(_self.radio)
                        }
                    }
                } catch (error) {
                    //console.log('Error', error);
                }
            }

        },
        async getAddress(i) {
            this.depositAddress = '';
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch('get_user_deposit_address', {
                    token: _self.currencySelected.toLowerCase(),
                    mainToken: _self.mainChains[i].maichina
                });
                if (data) {
                    _self.depositAddress = data;
                    const datas = {
                        address: data,
                    }
                    _self.bindQRCode(JSON.stringify(datas));
                }
            } catch (error) {
                //console.log('Error', error);
            }
        },

    },
    mounted() {
        let _self = this;
        this.currencies = this.$store.state.currencyinfos.filter(item=>item.iscandeposit===true);
        this.currencySelected = this.selectedRow.currency.currencyname;
        this.currencyOnChange();
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
        });
    }
}
</script>

<style lang="scss">
.bg-image {
    top: 0px;
    left: 0px;
    position: absolute;
    width: 100%;
    z-index: 3;
}

.acknowledge {
    opacity: 0.05;
}</style>
