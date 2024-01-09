<template>
    <div class="identity">
        <a-card class="user-identity-card" :bordered="false">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="24">
                    <p class="mb-0 identity-heading fw-5"><img src="/images/arrow-left.svg" class="mr-3 pointer"
                            @click="goback" />{{ $t('person.ph9') }}</p>
                </a-col>
            </a-row>
        </a-card>
        <a-card :bordered="false" class="mt-3 form-card">
            <div class="authentication-form">
                <a-card v-if="auditingstate == 2" class="error-card" :bordered="false">
                    <p class="mb-0 kyc-failed fw-4 col-alignment"><img src="/images/red-error.svg" class="mr-2" />{{
                        $t('person.ph11') }}: {{ auditingremark }}</p>
                </a-card>
                <a-card class="mx-2 my-2" :bordered="false">
                    <a-form-model ref="authenticationForm" :model="nation" :hide-required-mark="true" label-align="left"
                        :rules="rules">

                        <!-- VALIDATED 1-ROW STARTED  (VISABLE IF FORM IS NOT SUBMITTED)-->
                        <a-row :gutter="24" class="mx-5" v-if="!successSubmit">
                            <a-col :lg="24">
                                <!-- Row started -->
                                <a-row :gutter="16">
                                    <!-- IDTYPE -->
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl36')" prop="idType"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select v-model="nation.idType" :placeholder="$t('placeholders.plh36')"
                                                @change="changeIdType">
                                                <a-select-option v-for="item in IDTypeOptions" :key="item.value"
                                                    :value="item.value">{{ item.text }}</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                    <!-- IDNUMBER -->
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl37')" prop="idNumber"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input v-model="nation.idNumber" type="number" @change="validateKycForm"
                                                :placeholder="$t('placeholders.plh37')" />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <!-- ROW ENDED -->



                                <!-- ROW STARTED -->
                                <a-row :gutter="16">
                                    <!-- REALNAME -->
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl38')" prop="realName"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input v-model="nation.realName" :placeholder="$t('placeholders.plh38')" />
                                        </a-form-model-item>
                                    </a-col>
                                    <!-- GENDER -->
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl39')" prop="gender"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select v-model="nation.gender">
                                                <a-select-option v-for="item in genderOptions" :key="item.value"
                                                    :value="item.value">{{ item.text }}</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <!-- ROW ENDED -->

                                <!-- ROW STARTED -->
                                <a-row :gutter="16">
                                    <!-- BIRTHDAY -->
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl40')" prop="birthDay"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-date-picker v-model="nation.birthDay" style="width:100%;"
                                                @change="birthDaySelected" />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <!-- ROW ENDED -->


                                <!-- ROW  STARTED -->
                                <a-row :gutter="16" class="mt-4">
                                    <!-- SIDE NOTE -->
                                    <a-col :lg="6">
                                        <p class="mb-3 iccard-desc fw-5">{{ $t('person.ph12') }}</p>
                                        <p class="mb-0 iccard-desc fw-5">{{ $t('person.ph13') }} </p>
                                        <p class="mb-0 iccard-desc fw-5"> {{ $t('person.ph14') }}</p>
                                    </a-col>
                                    <!-- IMAGE FRONT -->
                                    <a-col :lg="9">

                                        <div class="front-back text-center cursor" @click="OpenUploadModal(1)">
                                            <div v-if="frontBack.front.ext == 'pdf'">
                                        <svg  class="svg-icon file" width="17" height="17">
                                        <use xlink:href="/images/svg/sprite.svg#billing-details-icon"></use>
                                        </svg>
                                                <div class="mt-2">
                                                    {{ frontBack.front.name }}
                                                </div>
                                            </div>

                                            <img :src="imageUrl.front" class="avatar my-3" v-else>
                                            <span v-if="errors.front" class="red-active">{{ errors.front }}</span>
                                        </div>
                                    </a-col>
                                    <!-- IMAGE BACK (VALIDATED WITH IDTYPE -->
                                    <a-col :lg="9">
                                        <div class="front-back text-center cursor" @click="OpenUploadModal(2)"
                                            v-if="nation.idType != 2">
                                            <div v-if="frontBack.back.ext == 'pdf'">
                                        <svg  class="svg-icon file" width="17" height="17">
                                        <use xlink:href="/images/svg/sprite.svg#billing-details-icon"></use>
                                        </svg>
                                                <div class="mt-2">
                                                    {{ frontBack.back.name }}
                                                </div>
                                            </div>

                                            <img :src="imageUrl.back" class="avatar my-3" v-else>
                                            <span v-if="errors.back && nation.idType != 2" class="red-active">
                                                {{ errors.back }}
                                            </span>

                                        </div>
                                    </a-col>
                                </a-row>


                                <!-- ROW ENDED -->

                                <!-- ROW STARTED -->
                                <a-row :gutter="16" class="mt-4">
                                    <!-- SIDE NOTE -->
                                    <a-col :lg="6">
                                        <p class="mb-3 iccard-desc fw-5">{{ $t('person.ph12') }}</p>
                                        <p class="mb-0 iccard-desc fw-5">{{ $t('person.ph13') }} </p>
                                        <p class="mb-0 iccard-desc fw-5"> {{ $t('person.ph14') }}</p>
                                    </a-col>
                                    <!-- SELFIE IMAGE -->
                                    <a-col :lg="9">
                                        <!-- @click="captureFaceImage(3)" -->
                                        <div class="front-back">

                                            <img :src="imageUrl.selfie" class="avatar my-3 cursor"
                                                @click="captureFaceImage(3)">
                                            <span v-if="errors.selfie" class="red-active">{{ errors.selfie }}</span>
                                        </div>
                                    </a-col>
                                </a-row>
                                <!-- ROW ENDED -->

                                <!-- ROW STARTED -->

                                <a-row :gutter="16" class="mt-4 pt-4">
                                    <!-- SUBMIT THE FORM -->
                                    <a-col :lg="8" :offset="8">
                                        <a-button class="primary-btn fw-5 mt-2 submit-kyc" block :disabled="submitingKyc"
                                            :loading="submitingKyc" @click="submitAudit">{{
                                                $t('person.ph17') }}</a-button>
                                    </a-col>
                                </a-row>
                                <!-- ROW ENDED -->

                            </a-col>
                        </a-row>
                        <!-- VALIDATED 1-ROW ENDED -->


                        <!-- VALIDATED 2-ROW STARTED (VISABLE IF FORM IS ALREADY SUBMITTED) -->
                        <a-row v-else :gutter="24" class="ml-5 p-5">
                            <a-col :lg="24" class="text-center">
                                <p class="identity-heading fw-5 mb-1">Lv.2</p>
                                <p class="lv-success fw-5 mb-3">{{ $t('person.ph18') }}</p>
                                <p class="info-heading fw-5 mb-0">{{ $t('person.ph19') }}</p>
                                <p class="info-heading fw-5 mb-5">{{ $t('person.ph20') }}</p>
                                <img src="/images/success-lv2.png" />
                            </a-col>
                        </a-row>
                        <!-- VALIDATED 2-ROW STARTED -->
                    </a-form-model>
                </a-card>
            </div>
        </a-card>
        <UploadModal :uploadModel="uploadModel" :close="close" @uploadImage="uploadImage" :openFor="imageUrl.openFor"
            :needGalleryImage="needGalleryImage" />

        <ShuftiResponseModal :show="showShuftiResponse" @onClose="closeShuftiResponseModal" />
        <ErrorModal :show="showErrorModal" :object="errorModalObject" @onClose="showErrorModal = false"
            @onOk="showErrorModal = false" />


    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from 'moment';

import AppFormModelItem from "~/components/App/AppFormModelItem.vue";
import ProofOfIdentity from "./ProofOfIdentity"
import ShuftiResponseModal from "./ShuftiResponseModal.vue";
import UploadModal from './UploadModal.vue';
import ErrorModal from "~/components/App/ErrorModal.vue";
import AppLoading from "~/components/AppLoading.vue";
export default {
    name: 'Lv2Form',
    components: {
        ProofOfIdentity,
        UploadModal,
        ShuftiResponseModal,
        AppFormModelItem,
        ErrorModal,
        AppLoading
    },
    data() {
        return {


            selectedFile: { type: 'image', name: null },
            faceImageObject: {}, //for face image
            frontBack: {
                front: {
                    string: null,
                    ext: null
                },
                back: {
                    string: null,
                    ext: null
                },
            },
            showShuftiResponse: false,
            isShuftiRequestApproved: false,
            needGalleryImage: true,
            formNotValidated: false,
            imageUploaded: false,
            showErrorModal: false,
            errorModalObject: {
                heading: null,
                message: null,
            },
            imageUrl: {
                selfie: '/images/face-upload-img.svg',
                front: '/images/front-side-upload.svg',
                back: '/images/back-side-upload.svg',
                openFor: 1,
            },
            errors: {
                selfie: undefined,
                front: undefined,
                back: undefined,
            },
            nation: {
                idType: '1',
                idNumber: "",
                realName: "",
                gender: 1,
                birthDay: undefined,
                idCoverImg: false,
                idInfoImg: false,
                selfieImg: false,
            },
            uploadModel: false,
            auditingstate: 0,
            auditingremark: '',
            successSubmit: false,
            submitingKyc: false,
            rules: {
                idNumber: [
                    { required: true, message: this.$t('messages.msg30') },
                ],
                realName: [
                    { required: true, message: this.$t('messages.msg31') },
                ],
                gender: [
                    { required: true, message: this.$t('messages.msg32') },
                ],
                birthDay: [
                    { required: true, message: this.$t('messages.msg33') }
                ]
            },
        };
    },
    computed: {
        ...mapGetters('shufti-pro', ['getDocumentResponse', 'sendRequestToShuftiPro']),

        documentResponse() {
            return this.getDocumentResponse
        },
        IDTypeOptions: function () {
            return [
                {
                    text: this.$t("authentication.idcard"),
                    value: "1"
                },
                {
                    text: this.$t("authentication.passport"),
                    value: "2"
                },
                {
                    text: this.$t("authentication.drivinglicense"),
                    value: "3"
                }
            ];
        },
        genderOptions: function () {
            return [
                {
                    text: this.$t('texts.txt28'),
                    value: 1
                },
                {
                    text: this.$t('texts.txt29'),
                    value: 2
                },
                {
                    text: this.$t('texts.txt30'),
                    value: 0
                },
            ];
        },

    },
    watch: {


        documentResponse: {
            handler: async function (val) {
                //console.log('Watching documentResponse', val)
                if (val.status == 'verification.accepted') {


                    //console.log('uploadingDoc start');
                    this.submitingKyc = true
                    const selfie = await this.uploadImageToServer(this.faceImageObject, 'selfie')
                    if (selfie.code == 200) {
                        this.nation.selfieImg = selfie.data.imgurl
                        this.imageUrl.selfie = selfie.data.imgurl
                        const front = await this.uploadImageToServer(this.frontBack.front, 'front')
                        if (front.code == 200) {
                            this.nation.idCoverImg = front.data.imgurl
                            if (this.nation.idType != 2) { //not passport
                                const back = await this.uploadImageToServer(this.frontBack.back, 'back')
                                if (back.code == 200) {
                                    this.nation.idInfoImg = back.data.imgurl
                                    //submitkyc
                                    await this.submitFormRequest()
                                }
                            } else {//id card and driving license
                                await this.submitFormRequest()
                            }

                        }
                    }
                    this.submitingKyc = false
                }
            },
            deep: true,
            immediate: true
        },

    },
    mounted() {
        this.getUserIdAuth()
        this.nation.birthDay = moment().subtract(20, 'years')
        this.fetchShuftiRequestStatus({ key: 'kyc_config_info' })

    },

    methods: {
        ...mapActions("shufti-pro", ["verifyDocument", 'fetchShuftiRequestStatus']),
        ...mapMutations('shufti-pro', ['setDocumentResponse']),

        goback() {
            this.$router.go(-1);
        },
        async getUserIdAuth() {
            const _self = this;
            _self.$store.dispatch("user_user_idauth_get").then(({ data }) => {
                //console.log('datdatadatadatadataa', data);
                if (data) {

                    if (data.auditingstate == 0) {
                        _self.successSubmit = true;
                    } else if (data.auditingstate == 1) {

                        _self.nation.idType = data.idtype.toString(),
                            _self.nation.idNumber = data.idnumber;
                        _self.nation.realName = data.realname;
                        _self.nation.gender = data.gender;
                        _self.nation.birthDay = data.birthday;

                        _self.imageUrl.front = data.idcoverimg == null || data.idcoverimg == "" ? _self.imageUrl.front : data.idcoverimg
                        _self.imageUrl.selfie = data.selfieimg == null || data.selfieimg == "" ? _self.imageUrl.selfie : data.selfieimg

                        _self.nation.idCoverImg = data.idcoverimg == null || data.idcoverimg == "" ? _self.imageUrl.idCoverImg : data.idcoverimg

                        if (data.idtype != 2) {
                            _self.nation.idInfoImg = data.idinfoimg == null || data.idinfoimg == "" ? _self.imageUrl.idInfoImg : data.idinfoimg
                            _self.imageUrl.back = data.idinfoimg == null || data.idinfoimg == "" ? _self.imageUrl.back : data.idinfoimg
                        }

                        _self.auditingstate = data.auditingstate;
                        _self.auditingremark = data.auditingremark;

                    }
                }
                if (data == null) {
                    _self.auditingstate = null; //no kyc requested
                }
            });
        },

        OpenUploadModal(openFor) {

            if (this.nation.idType == 2) {//only passport
                this.$refs['authenticationForm'].validate(async (valid) => {
                    this.formNotValidated = !valid
                    if (!valid) {
                        return
                    }

                    this.imageUrl.openFor = openFor
                    this.uploadModel = true
                    this.needGalleryImage = true
                })
            } else {
                this.imageUrl.openFor = openFor
                this.uploadModel = true
                this.needGalleryImage = true
            }


        },
        captureFaceImage(openFor) {
            this.imageUrl.openFor = openFor
            this.uploadModel = true
            this.needGalleryImage = false
        },
        close(object = {}) {
            this.uploadModel = false

            if (object.type) {
                this.selectedFile = {
                    type: object.type == 'application/pdf' ? 'file' : 'image',
                    name: object.file.name
                }
            }


            //console.log('objectobject', object);

        },
        closeShuftiResponseModal(res) {
            //console.log('RESSS', res);
            this.showShuftiResponse = false
        },
        birthDaySelected(object) {
            this.validateKycForm()
        },
        async verifyUserCard() {


            let gender = 'M'
            if (this.nation.gender == 1) {
                gender = 'M'
            } else if (this.nation.gender == 2) {
                gender = 'F'
            } else {
                gender = 'O'
            }

            let supported_types = ['id_card']
            if (this.nation.idType == 1) {
                supported_types = ['id_card']
            } else if (this.nation.idType == 2) {
                supported_types = ['passport']
            } else if (this.nation.idType == 3) {
                supported_types = ['driving_license']
            }

            let backside_proof_required = 0

            if (this.frontBack.back.string != null) {
                backside_proof_required = 1
            }

            const dob = this.nation.birthDay ? moment(this.nation.birthDay) : null

            const docObject = {
                proof: this.frontBack.front.string,
                additional_proof: this.frontBack.back.string,
                // dob: dob ? dob.format('YYYY-MM-DD').toString() : null,
                // full_name: this.nation.realName,
                // document_number: this.nation.idNumber,
                // supported_types: supported_types,
                // fetch_enhanced_data: 0,
                // backside_proof_required: backside_proof_required,
                // verification_instructions: {
                //     allow_paper_based: 1,
                //     allow_photocopy: 0,
                //     allow_laminated: 0,
                //     allow_screenshot: 1,
                //     allow_cropped: 1,
                //     allow_scanned: 1,
                //     allow_e_document: 0
                // },
                // allow_online: "0",
                // check_duplicate_request: 1,
                // verification_mode: "any", //any, image_only, video_only 
            }

            const backgroundChecks = {
                name: {
                    full_name: this.nation.realName,
                    fuzzy_match: "1",
                },
                dob: dob ? dob.format('YYYY-MM-DD').toString() : null,
                filters: ["sanction", "fitness-probity", "warning", "pep"]
            }

            if (this.nation.idType == 1 || this.nation.idType == 2) { //id card or passport 
                // docObject.gender = gender
            }



            const faceObject = {
                proof: this.faceImageObject.string,
                // allow_online: "0",
                // check_duplicate_request: 1,
                // verification_mode: "any"
            }

            if (this.auditingstate == 2) { //when kyc was rejected
                // docObject.check_duplicate_request = 0
                // faceObject.check_duplicate_request = 0
            }


            const reference = `DC_${Math.random()}`
            const shuftiobject = {
                reference: reference,
                document: docObject,
                face: faceObject,
                name: 'document',
                background_checks: backgroundChecks
            }

            //console.log('ShuftiProObject', shuftiobject)
            this.showShuftiResponse = true
            const response = await this.verifyDocument(shuftiobject)


        },
        async uploadImage(req) {
            //console.log('uploadImage:::', req)
            //console.log(req.base64image)

            // this.uploadImageToServer()
            // return
            const openFor = req.openFor

            const _s = this;

            if (openFor == 3) { //for selfie
                this.faceImageObject = {
                    string: req.base64image,
                    ext: req.ext,
                    isSelfie: true
                }
                this.errors.selfie = undefined
                this.imageUrl.selfie = this.faceImageObject.string



            } else if (this.nation.idType == 1 || this.nation.idType == 3) { //1:id card, 3:driving license
                if (openFor == 1) {
                    this.frontBack.front = {
                        string: req.base64image,
                        ext: req.ext,
                        name: req.object.name
                    }
                    this.errors.front = undefined
                    this.imageUrl.front = req.base64image



                } else if (openFor == 2) {
                    this.frontBack.back = {
                        string: req.base64image,
                        ext: req.ext,
                        name: req.object.name
                    }
                    this.imageUrl.back = req.base64image
                    this.errors.back = undefined

                }


            } else if (this.nation.idType == 2) { //for passport
                this.frontBack.front = {
                    string: req.base64image,
                    ext: req.ext,
                    name: req.object.name
                }
                this.imageUrl.front = this.frontBack.front.string
                this.errors.front = undefined
                this.frontBack.back = {
                    string: null,
                    ext: null,
                    name: null
                }
            }

        },
        async uploadImageToServer(object, frontBackSelfie = null) {
            if (frontBackSelfie == 'back' && this.nation.idType == 2) {
                return {
                    code: 422,
                    message: 'param is back'
                }
            }
            const _self = this;
            this.isShuftiRequestApproved = false
            return await _self.$store
                .dispatch("com_image_upload", {
                    imgbase64: object.string.split(",")[1],
                    width: "150",
                    height: "150",
                    filename: new Date().getTime() + Number(Math.random() * 1000000000) + "." + object.ext
                })
                .catch(error => {
                    //console.log('error while uploading images', error)
                })

        },
        changeIdType(object) {
            //console.log('OBJect::', object)
            this.frontBack = {
                front: {
                    string: null,
                    ext: null
                },
                back: {
                    string: null,
                    ext: null
                },
            }

            this.imageUrl = {
                selfie: '/images/face-upload-img.svg',
                front: '/images/front-side-upload.svg',
                back: '/images/back-side-upload.svg',
            }
        },




        async submitAudit() {
            let errorFlag = false
            const _s = this



            await this.$refs['authenticationForm'].validate((valid) => {

                //console.log('validating lv2 form:');
                if (!_s.frontBack.front.string) {
                    //console.log('front:', this.$t('conditionaltxt.ct20'));
                    _s.errors.front = this.$t('conditionaltxt.ct20')
                    errorFlag = true
                }
                //console.log('front:');
                if (!_s.frontBack.back.string && _s.nation.idType != 2) {
                    _s.errors.back = this.$t('conditionaltxt.ct20')
                    errorFlag = true
                }
                //console.log('selfie:');
                if (!_s.faceImageObject.string) {
                    _s.errors.selfie = this.$t('conditionaltxt.ct41')
                    errorFlag = true
                }
                //console.log('errors:', _s.errors, errorFlag);
                if (errorFlag || !valid || this.submitingKyc) {
                    return
                }


                if (this.sendRequestToShuftiPro) {
                    this.verifyUserCard()
                } else {
                    //updating state of store for calling api
                    this.setDocumentResponse({
                        hasResponse: true,
                        message: null,
                        status: 'verification.accepted',
                        response: null
                    })
                }
            })
        },

        submitFormRequest() {
            const _s = this
            _s.nation.birthDay = _s.nation.birthDay ? moment(this.nation.birthDay).format('YYYY-MM-DD').toString() : null

            // _s.nation.birthDay = _s.nation.birthDay.format('YYYY-MM-DD').toString();
            const ob = this.documentResponse.response

            _s.nation.idinhandimg = JSON.stringify(ob)
            _s.successSubmit = false
            _s.submitingKyc = true
            _s.$store.dispatch("user_user_idauth", _s.nation).then(res => {

                _s.submitingKyc = false
                this.setDocumentResponse({
                    hasResponse: false,
                    message: null,
                    status: null,
                    response: null
                })
                //console.log('res', res);
                _s.showShuftiResponse = false
                if (res.data) {
                    if (res.code == 200) {
                        _s.$emit("getUserInfo");
                        _s.$store.commit("set_message", { type: "ok", text: res.msg });
                        this.$router.push("/person/authentication");
                    } else {
                        _s.$store.commit("set_message", { type: "error", text: res.msg });
                    }

                }
            })
        },

        validateKycForm() {
            this.$refs['authenticationForm'].validate((valid) => {
                this.formNotValidated = !valid
            })
        }
    }
}
</script>

<style></style>
