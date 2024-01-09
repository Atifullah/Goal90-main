<template>
    <div class="upload-modal">
        <a-modal id="upload-modal" v-model="uploadModel" :footer="false" :title="false" @cancel="closeModal" width="593px"
            :mask-closable="false">



            <div class="px-4 pt-4" v-if="!CapturingImage">
                <!-- before capturing image  -->
                <a-row :gutter="16" v-if="openFor == 3">
                    <a-col :lg="2"></a-col>
                    <a-col :lg="20" align="center">
                        <img src="/images/face-upload-icon.svg" />
                    </a-col>
                    <a-col :lg="2">
                        <img src="/images/ud-cross.svg" class="pointer" @click="closeModal" />
                    </a-col>
                </a-row>

                <a-row :gutter="16" v-if="openFor != 3" class="mb-4">
                    <a-col :lg="22">
                        <p class="upload-heading fw-5 mb-0">{{ $t('lv4form.lvf15') }}</p>
                    </a-col>

                    <a-col :lg="2">
                        <img src="/images/ud-cross.svg" class="pointer" @click="closeModal" />
                    </a-col>
                </a-row>


                <a-row :gutter="16" v-if="openFor == 3">
                    <a-col :lg="24">
                        <p class="accurate-txt fw-5 px-5 text-center pt-4">{{ $t('lv4form.lvf16') }}</p>
                    </a-col>
                </a-row>

                <div v-if="!CapturingImage && openFor != 3">
                    <p class="accurate-txt fw-5 mb-0">{{ $t('lv4form.lvf17') }}</p>
                    <p class="grey-txt accurate-txt fw-5 mb-0"> {{ $t('lv4form.lvf18') }}</p>
                    <p class="grey-txt accurate-txt fw-5 mb-0">{{ $t('lv4form.lvf19') }}</p>
                    <a-card class="orange-bg my-4" :bordered="false">
                        <a-row :gutter="16">
                            <a-col :lg="1"><img src="/images/orange-circel-icon.svg" /></a-col>
                            <a-col :lg="23">
                                <p class="error-txt fw-4">{{ $t('lv4form.lvf20') }}</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>

                <a-row :gutter="16" class="px-4 py-4" v-if="!CapturingImage">
                    <a-col :lg="6" v-for="(list, key) in uploadImages" :key="key" align="center">
                        <img :src="openFor != 3 ? list.img1 : list.img" />
                        <p class="upload-title fw-5 mb-0 mt-2">{{ openFor != 3 ? list.desc1 : list.desc }}</p>
                    </a-col>
                </a-row>
                <!-- before capturing ended  -->
            </div>

            <div class="identity-verification px-4 pt-2 pb-3" v-if="!CapturingImage && openFor != 3">

                <p class="accurate-txt fw-5 mb-0">{{ $t('lv4form.lvf21') }}</p>
                <p class="grey-txt accurate-txt fw-5 mb-0"> {{ $t('lv4form.lvf22') }}</p>
                <p class="grey-txt accurate-txt fw-5 mb-0">{{ $t('lv4form.lvf23') }}</p>
            </div>
            <!-- taking image -->
            <div v-if="CapturingImage" class="camera-container">
                <div class="close-camera">
                    <img src="/images/ud-cross.svg" class="pointer" @click="closeModal" />
                </div>
                <vue-web-cam ref="webcam" :muted="true" :selectFirstDevice="true"></vue-web-cam>
                <div class="border-capture" v-if="!CaputuredImage"></div>
                <div class="capture" v-if="!CaputuredImage" @click="Capture">
                    <img src="/images/capture-img.svg" />
                </div>
            </div>






            <a-row :gutter="16" class="mt-3 px-4 pb-4">
                <a-col :lg="needGalleryImage ? 12 : 24" v-if="!CapturingImage">
                    <a-button class="cancel-outline-btn fw-5" block @click="TakePicture()" v-if="!CapturingImage">{{
                        $t('lv4form.lvf24') }}</a-button>
                </a-col>
                <a-col :lg="CapturingImage ? 24 : 12" v-if="!CaputuredImage && needGalleryImage">
                    <a-upload :before-upload="beforeUpload" @change="handleChange" :showUploadList="false">
                        <a-button class="primary-btn fw-5" :class="loading ? 'disabled-btn' : 'primary-btn'" :loading="loading"
                            block> <a-icon type="upload" /> {{ $t('lv4form.lvf25') }} </a-button>
                    </a-upload>
                </a-col>



                <template v-if="CaputuredImage">
                    <a-col :lg="12">
                        <a-button class="cancel-outline-btn fw-5" block @click="Retake()">{{ $t('lv4form.lvf26') }}</a-button>
                    </a-col>
                    <a-col :lg="12">
                        <a-button class="primary-btn fw-5" block @click="submitPicture"
                            :class="loading ? 'disabled-btn' : 'primary-btn'" :loading="loading"> {{ $t('lv4form.lvf27')
                            }}</a-button>
                    </a-col>
                </template>
            </a-row>


            <a-modal v-model="openCameraSetting" :footer="false" :title="false" @cancel="openCameraSetting = false"
                width="450px">
                <div>
                    <a-row :gutter="16">
                        <a-col :lg="24" align="center">
                            <img src="/images/orange-cancel.svg" height="80px" class="pt-2" />
                            <h3 class="pt-3 mb-2 text-center">{{ cameraHeading }}</h3>
                        </a-col>
                        <a-col :lg="24">
                            <div v-html="cameraSettingHtml" class="px-3 mb-4">

                            </div>

                        </a-col>

                        <a-col :lg="24">
                            <a-button class="cancel-outline-btn fw-5" block @click="openCameraSetting = false">{{
                                $t('legalTrad.Cancel') }}</a-button>
                        </a-col>

                    </a-row>

                </div>
            </a-modal>


            <!-- taking image ended -->


        </a-modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import AppLoading from "~/components/AppLoading.vue";
export default {
    props: {
        uploadModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
        openFor: {
            type: Number,
            default: 1   //1-front,2-back,3-selfie
        },
        needGalleryImage: {
            type: Boolean,
            default: true
        }
    },
    components: {
        AppLoading
    },
    data() {
        return {
            cameraHeading: this.$t('uploadModal.um1'),
            cameraSettingHtml: '',
            openCameraSetting: false,
            uploadImages: [
                {
                    img: '/images/upload01.svg',
                    desc: this.$t('conditionaltxt.ct21'),
                    img1: '/images/upload5.svg',
                    desc1: this.$t('uploadModal.um2')
                },
                {
                    img: '/images/upload2.svg',
                    desc: this.$t('conditionaltxt.ct22'),
                    img1: '/images/upload6.svg',
                    desc1: this.$t('uploadModal.um3')
                },
                {
                    img: '/images/upload3.svg',
                    desc: this.$t('conditionaltxt.ct23'),
                    img1: '/images/upload7.svg',
                    desc1: this.$t('uploadModal.um4')
                },
                {
                    img: '/images/upload4.svg',
                    desc: this.$t('conditionaltxt.ct24'),
                    img1: '/images/upload8.svg',
                    desc1: this.$t('uploadModal.um5')
                }
            ],
            uploadedFile: null,
            CapturingImage: false,
            CaputuredImage: false,
            webcam: null,  // Reference to the webcam component
            base64image: null,  // Variable to store the captured image data
            loading: false, // Adjust the width as needed
        }
    },
    computed: {
        ...mapGetters('shufti-pro', ['sendRequestToShuftiPro']),

    },
    methods: {
        closeModal() {
             //console.log('closingmOdal');

            this.close()
            this.uploadedFile = null

            setTimeout(() => {
                this.CapturingImage = false
                this.CaputuredImage = false
                this.$refs.webcam.pause()
            }, 200)
        },

        submitPicture() {
            const object = this.uploadedFile ? this.uploadedFile : { type: 'jpeg', file: {} }
             //console.log('submitPicture Object', object);

            const ext = object.type == 'application/pdf' ? 'pdf' : 'jpeg'

            let option = {
                base64image: this.base64image,
                openFor: this.openFor,
                ext: ext,
                object: object.file
            }
            this.$emit('uploadImage', option)

            if (this.CapturingImage) {
                this.Retake()
                this.CaputuredImage = false
                this.CapturingImage = false
            }
            this.closeModal();
        },

        Retake() {
            this.$refs.webcam.resume();
            this.CaputuredImage = false
        },
        Capture() {
            this.base64image = this.$refs.webcam.capture();
            this.$refs.webcam.pause();
            this.CaputuredImage = true;
        },

        async TakePicture() {

            try {
                if (process.client) {

                    const constraints = { video: true };
                    console.log("navigator", navigator)
                    const stream = await navigator.mediaDevices.getUserMedia(constraints)
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    
                    const cameras = devices.filter(device => device.kind === 'videoinput');
                     //console.log('Cameras are available:', cameras);
                    if (cameras.length == 0) {
                        this.cameraHeading = ''
                        this.openCameraSetting = true
                        this.cameraSettingHtml = ` <p class="success-desc fw-5 text-center mb-3">${this.$t('uploadModal.um7')} </p>`
                    } else {
                        this.CapturingImage = true;
                    }

                }
            } catch (error) {
                //  console.log('navigatornavigator: error::', error.name);

                if (error.name === 'NotAllowedError') {
                    this.openCameraSetting = true
                    this.cameraHeading = this.$t('uploadModal.um1')
                    this.allowCameraAccess()
                } else if (error.name === 'NotFoundError') {
                    this.cameraHeading = ''
                    this.openCameraSetting = true
                    this.cameraSettingHtml = ` <p class="success-desc fw-5 text-center mb-3">${this.$t('uploadModal.um8')} </p>`
                }
            }
        },
        allowCameraAccess() {
            const userAgent = navigator.userAgent
            console.log(userAgent,"useragent")
            if (userAgent.indexOf('Chrome') !== -1) {
                this.cameraSettingHtml = `
                            <p class="success-desc fw-5 text-center mb-3">${this.$t('uploadModal.um9')} </p>
                            <ul>
                                <li>${this.$t('uploadModal.um10')}</li>
                                <li>${this.$t('uploadModal.um11')} <b>${this.$t('uploadModal.um12')}</b>.</li>
                                <li>${this.$t('uploadModal.um13')} <b>${this.$t('uploadModal.um38')}</b>.</li>
                                <li>${this.$t('uploadModal.um14')} <b>${this.$t('uploadModal.um15')}</b>.</li>
                                <li>${this.$t('uploadModal.um16')} <b>${this.$t('uploadModal.um17')}</b> ${this.$t('uploadModal.um18')}</li>
                                <li>${this.$t('uploadModal.um19')}</li> 
                            </ul> `
            } else if (userAgent.indexOf('Firefox') !== -1) {
                this.cameraSettingHtml = ` 
                                        <p class="success-desc fw-5 text-center mb-3">${this.$t('uploadModal.um9')} </p>
                                        <ul>
                                            <li>${this.$t('uploadModal.um20')}</li>
                                            <li>${this.$t('uploadModal.um11')} <b>${this.$t('uploadModal.um12')}</b>.</li>
                                            <li>${this.$t('uploadModal.um14')} <b>${this.$t('uploadModal.um21')}</b> ${this.$t('uploadModal.um22')}</li>
                                            <li>${this.$t('uploadModal.um23')} <b>${this.$t('uploadModal.um24')}</b> ${this.$t('uploadModal.um25')} <b>${this.$t('uploadModal.um12')}</b> ${this.$t('uploadModal.um26')} <b>${this.$t('uploadModal.um17')}</b>.</li>
                                            <li>${this.$t('uploadModal.um19')}</li> 
                                        </ul>`
            } else if (userAgent.indexOf('Edg') !== -1) {
                this.cameraSettingHtml = `
                                        <p class="success-desc fw-5 text-center mb-3">${this.$t('uploadModal.um9')} </p>
                                        <ul>
                                            <li> ${this.$t('uploadModal.um27')}</li>
                                            <li>${this.$t('uploadModal.um28')} <b>${this.$t('uploadModal.um29')}</b>.</li>
                                            <li>${this.$t('uploadModal.um14')} <b>${this.$t('uploadModal.um31')}</b>.</li>
                                            <li>${this.$t('uploadModal.um11')} <b>${this.$t('uploadModal.um12')}</b>.</li>
                                            <li>${this.$t('uploadModal.um14')} <b>${this.$t('uploadModal.um17')}</b>.</li>
                                            <li>${this.$t('uploadModal.um19')}</li>
                                        </ul>`
            } else if (userAgent.indexOf('Safari') !== -1) {
                this.cameraSettingHtml = `
                                        <p class="success-desc fw-5 text-center mb-3">${this.$t('uploadModal.um9')} </p>
                                        <ul>
                                            <li>${this.$t('uploadModal.um14')} <b>${this.$t('uploadModal.um32')}</b> ${this.$t('uploadModal.um33')}</li>
                                            <li>${this.$t('uploadModal.um34')} <b>${this.$t('uploadModal.um35')}</b> ${this.$t('uploadModal.um36')}</li>
                                            <li>${this.$t('uploadModal.um14')} <b>Camera</b> ${this.$t('uploadModal.um37')}</li>
                                            <li>${this.$t('uploadModal.um19')}</li>
                                        </ul>`
            } else {
                this.cameraSettingHtml = this.$t('uploadModal.um9')
            }
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 5;
            const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf";

            const isCorupt = file.size > 100;
            if (!isCorupt) {
                this.$store.commit("set_message", {
                    type: "error",
                    text: this.$t("authentication.picMax2")
                });
            }
            if (!isLt1M) {
                this.$store.commit("set_message", {
                    type: "error",
                    text: this.$t("authentication.picMax")
                });
            }
            if (!isJPG) {
                this.$store.commit("set_message", {
                    type: "error",
                    text: this.$t("manage.isJpg")
                });
            }

            this.uploadedFile = {
                type: file.type,
                file: file
            }

            return isLt1M && isJPG && isCorupt;
        },
        handleChange(info) {
            let _self = this;
             //console.log('info.file', info.file);
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {

                let reader = new FileReader();
                reader.readAsDataURL(info.file.originFileObj);
                reader.onload = e => {
                    _self.base64image = e.currentTarget.result
                    _self.submitPicture();
                    _self.loading = false;

                }
            }

        },
    },
}
</script>


<style scoped>
.camera-container video {

    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
}
</style>
