<template>
    <div class="user-profile-sharing">
        <a-modal id="ad-sharing" v-model="profileSharing" :footer="false" :title="false" @cancel="close" width="500px">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="adsharing-title fw-5 mb-0">{{$t('adsharing.as11')}}</p>
                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" class="pointer"
                        @click="close" />
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-3">
                <a-col :lg="24">
                    <p class="sharing-desc fw-5 mb-4 pb-2">{{$t('adsharing.as12')}}</p>
                </a-col>
            </a-row>
            <a-row :gutter="16" id="downloadArea">
                <a-col :lg="15">
                    <a-row :gutter="16" class="mb-4 pb-2">
                        <a-col :lg="5">
                            <span class="photo"
                                :style="{ 'background-color': global_get_random_color($userinfo.uid ? $userinfo.uid.substring($userinfo.uid.length - 1) : 0) }">
                                {{ getname($userinfo.realname) }}
                            </span>
                        </a-col>
                        <a-col :lg="19">
                            <p class="mb-0 total-price fw-5">{{ $userinfo.realname }}</p>
                            <p class="mb-0 verified-user fw-5" v-if="$usersettings.moreconfig?.applyadv"><img
                                    src="/images/green-dot-tick.svg" class="mr-1" />{{$t('adsharing.as5')}}</p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="16">
                            <p class="usdt-txt mb-0">{{$t('adsharing.as3')}}</p>
                        </a-col>
                        <a-col :lg="8">
                            <p class="total-price fw-5 mb-0">{{ counterParty?.completionrate_thirtydays }}%</p>
                        </a-col>
                    </a-row>
                    <a-divider class="sharing-divider my-2" />
                    <a-row :gutter="16" class="mb-4 pb-2">
                        <a-col :lg="16">
                            <p class="usdt-txt mb-0">{{$t('adsharing.as3')}}</p>
                        </a-col>
                        <a-col :lg="8">
                            <p class="total-price fw-5 mb-0">{{ counterParty?.trades_thirtydays }}</p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :lg="24">
                            <p class="total-orders fw-5">{{$t('adsharing.as13')}}</p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="col-alignment mt-3">
                        <a-col :lg="21"><a-card class="link-card">

                                <a-tooltip>
                                    <template slot="title">
                                        {{ $store.state.hex_config.DomanUrl }}/p2p/counter-party?userid={{ $userinfo.uid }}
                                    </template>
                                    <p id="keycopy" class="mb-0"
                                        style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                                        {{ $store.state.hex_config.DomanUrl }}/p2p/counter-party?userid={{ $userinfo.uid }}
                                    </p>
                                </a-tooltip>

                            </a-card></a-col>
                        <a-col :lg="3">
                            <AppClipboard target="#keycopy" element-class="link-url1" />
</a-col>
                    </a-row>
                </a-col>
                <a-col :lg="9" class="pl-4">
                    <p class="total-price fw-5 pr-4">{{$t('adsharing.as14')}}</p>
                    <ul class="scan-list ml-3">
                        <li>{{$t('adsharing.as15')}}</li>
                        <li>{{$t('adsharing.as16')}}</li>
                    </ul>
                    <div id="shareCanvas02">
                        <img src="/images/bit-qrcode.svg" /> 
                    </div>
                    <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1" data-html2canvas-ignore>

                        <a-button class="outline-btn fw-5 pointer mt-2" block @click="download()" :loading="loading"><img
                                :src="hoverKey == 2 ? '/images/save-qr-active.svg' : '/images/save-qr.svg'"
                                class="mr-2" />{{$t('adsharing.as8')}}</a-button>
                    </span>

                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>
<style>
#shareCanvas02 canvas {
    max-width: 105px !important;
    max-height: 105px !important;
    width: 100%;
}

.photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    width: 39px;
    height: 39px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 0px;
    color: #ffffff;
    position: relative;
}
</style>
<script>
import AppClipboard from '~/components/App/AppClipboard.vue';

import Qrlogo from '@/static/images/qrlogo.png'
import html2canvas from 'html2canvas'
import Clipboard from 'clipboard';
export default {
    props: {
        profileSharing: {
            type: Boolean
        },
        close: {
            type: Function
        },
        counterParty: {
            type: Object
        }
    },
    components: {
        AppClipboard
    },
    data() {
        return {
            hoverKey: -1,
            QRCodeStyling: null,
            loading: false
        }
    },
    methods: {
        getname(val) {
            return val ? val.substring(0, 1) : '--'
        },
        bindQRcode() {

            const _self = this;
            const qrCode = new _self.QRCodeStyling({
                width: 500,
                height: 500,
                margin: 0,
                type: "canvas",
                data: 'merchantProfile:' + this.$userinfo.uid,
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
            let x = document.getElementById("shareCanvas02")
            x.innerHTML = null;
            qrCode.append(document.getElementById("shareCanvas02"));
        },
        download() {
            const _self = this;
            if (!_self.loading) {
                _self.loading = true
                var element = document.getElementById('downloadArea');

                // Use html2canvas to capture a screenshot of the element
                html2canvas(element, {
                    x: -20, // left padding
                    y: -20, // top padding
                    width: element.offsetWidth + 40, // set width
                    height: element.offsetHeight + 40 // set height
                }).then(function (canvas) {
                    // Convert the canvas to an image
                    var img = new Image();
                    img.src = canvas.toDataURL("image/png");

                    // Create a new anchor element with the download attribute
                    var link = document.createElement("a");
                    link.download = "screenshot.png";
                    link.href = img.src;

                    // Append the anchor element to the document and click it to download the image
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    _self.loading = false;
                });
            }
        },



    },
    mounted() {
        const _self = this;
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
            _self.bindQRcode()
        });
    }
}
</script>

<style></style>
