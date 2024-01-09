<template>
    <div class="receive-crypto">

        <a-card :bordered="false" class="send-receive-card">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="mb-0 crypto-heading fw-5">{{ $t('person.pm27') }}</p>
                </a-col>
                <a-col :lg="12" align="end">
                    <nuxt-link to="/person/send-recieve-crypto/send-crypto"> <a-button class="px-4 outline-btn fw-5 mr-2">{{
                        $t('person.pm28') }}</a-button></nuxt-link>
                </a-col>
            </a-row>
        </a-card>

        <a-row :gutter="16" class="mt-3">
            <a-col :lg="14">
                <a-card :bordered="false" class="send-receive-card">
                    <a-form-model :hide-required-mark="true" label-align="left">
                        <p class="scan-send-txt fw-5 mb-0 pl-3 pt-3">{{ $t('person.pm29') }}</p>
                        <a-row :gutter="16">
                            <a-col :lg="10" :xl="8">
                                <div class="canvas" id="canvas">
                                </div>
                            </a-col>
                            <a-col :lg="14" :xl="16" class="">
                                <a-row :gutter="16">
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="15">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl62')" prop="currency"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select style="width: 100%" class="" v-model="currencySelected"
                                                @change="bindQRCode()" :placeholder="$t('formMenu.select')">
                                                <a-select-option v-for="item in currencies" :key="item.id"
                                                    :value="item.currencyname">
                                                    <img :src="item.icon" class="mr-1" width="15" height="15" />
                                                    {{ item.currencyname }}</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>

                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="15">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl63')" prop="firstName"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input v-model="amount" @change="bindQRCode()">
                                                <span slot="suffix" class="col-alignment optional-txt fw-4">
                                                    <img :src="selectedCurrencyIcon" class="mr-1" width="15" height="15" />
                                                    {{ currencySelected }}
                                                </span>
                                            </a-input>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>


                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="second-row">
                            <a-col :lg="10" :xl="8">
                                <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1" class="mr-5">

                                    <a-button class="outline-btn fw-5 save-qrcode-btn pointer ml-3 px-4 mt-1"
                                        @click="download"><img
                                            :src="hoverKey == 2 ? '/images/save-qr-active.svg' : '/images/save-qr.svg'"
                                            class="mr-2 refresh-icon" />{{ $t('person.pm32') }}</a-button>
                                </span>
                            </a-col>
                            <a-col :lg="14" :xl="16">
                                <a-row :gutter="16" class="mb-4">
                                    <a-col :lg="9" :xl="9">
                                        <p v-if="$userinfo.nickname" class="nickname-txt fw-5 mb-2">{{ $t('person.pm34') }}</p>
                                        <p class="nickname-right-txt fw-5 mb-0" v-if="$userinfo.nickname">{{
                                            $userinfo.nickname
                                        }}
                                        </p>
                                    </a-col>
                                    <a-col :lg="15" :xl="15">
                                        <p class="nickname-txt fw-5 mb-2" @click="receivePaymentModal = true">{{
                                            $t('person.pm33') }}</p>
                                        <span id="keycopy" class="nickname-right-txt fw-5 mb-0"><span>
                                                {{ $userinfo.uid }} </span></span>
                                        <AppClipboard target="#keycopy" element-class="link-url1" />

                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </a-card>
            </a-col>
            <a-col :lg="10">
                <a-card :bordered="false" class="receive-right-card text-center">
                    <p class="right-side-txt fw-5 mx-5 pl-2 text-center">{{ $t('extra.extra13') }}</p>
                    <img src="/images/receive-2.svg" />
                </a-card>
            </a-col>
        </a-row>


    </div>
</template>

<script>
import Clipboard from 'clipboard';
import Qrlogo from '@/static/images/qrlogo.png'
import AppClipboard from '~/components/App/AppClipboard.vue';



export default {
    components: {
        AppClipboard
    },
    data() {
        return {
            selectCurrencyModal: false,
            receivePaymentModal: false,
            currencySelected: 'USDT',
            amount: 0,
            hoverKey: -1,
            currencies: [],
            QRCodeStyling: null

        }
    },
    computed: {
        selectedCurrencyIcon() {
            const _self = this;
            return this.currencies.length > 0 && _self.currencySelected ? this.currencies.filter(item => item.currencyname == _self.currencySelected)[0].icon : '';
        }
    },
    methods: {
        close() {
            this.selectCurrencyModal = false;
            this.receivePaymentModal = false;
        },
        download() {
            var canvas = document.createElement("canvas");
            var title = 'Scan and Pay'
            var footer = String(`${this.$userinfo.nickname} (${this.$userinfo.uid})`)
            var amount = String(`${this.amount} ${this.currencySelected}`)
            canvas.width = 400;
            canvas.height = 430;
            const fontHeight = 24;
            const text = String(title);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = fontHeight + "px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black"; // text color
            ctx.fillText(text, 200, fontHeight + 20);
            var img = document.getElementById("canvas").childNodes[0];
            ctx.drawImage(img, 50, 50, 300, 300);
            ctx.fillText(footer, 200, 380);
            ctx.fillText(amount, 200, 420);


            var link = document.createElement('a');
            link.download = 'qr.png';
            link.href = canvas.toDataURL()
            link.click();
        },
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        clearAmount() {
            this.amount = 0;
            this.currencySelected = 'USDT';
        },
        bindQRCode() {
            let code = {
                uid: this.$userinfo.uid,
                token: this.currencySelected,
                amount: this.amount,
                name: this.$userinfo.nickname,
                avatar: this.$userinfo.avatar,


            }
            if (this.amount) {
                this.amount = code.amount;
            }
            const _self = this;
            const param = JSON.stringify(code)
            const qrCode = new _self.QRCodeStyling({
                width: 500,
                height: 500,
                margin: 0,
                type: "canvas",
                data: 'send:' + param,
                // data: "https://bitnasdaq.com/downloads",
                image: Qrlogo,
                dotsOptions: {
                    color: "#000",
                },
                qrOptions: {
                    errorCorrectionLevel: 'H',
                    mode: 'Byte'
                },
                backgroundOptions: {
                    color: "#fff",
                },
            });
            document.getElementById("canvas").innerHTML = null;
            qrCode.append(document.getElementById("canvas"));

        },
    },
    mounted() {
        let _self = this;
        this.currencies = this.$store.state.currencyinfos;
        const data = {
            uid: this.$userinfo.uid,
            token: this.currencySelected,
        }

        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
            _self.bindQRCode();
        });


        const cookie = this.getCookie('receivePaymentModal');
        if (!cookie) {
            this.receivePaymentModal = true;
        }
    }
}
</script>

<style></style>
