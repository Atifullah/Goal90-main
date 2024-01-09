

<template>
    <div class="identity">
        <a-card class="user-identity-card" :bordered="false">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="24">
                    <p class="mb-0 identity-heading fw-5"><img src="/images/arrow-left.svg" class="mr-3 pointer"
                            @click="goback" />{{ $t('person.ph10') }}</p>
                </a-col>
            </a-row>
        </a-card>
        <a-card :bordered="false" class="mt-3 form-card">
            <div class="authentication-form">
                <a-card v-if="false" class="error-card" :bordered="false">
                    <p class="mb-0 kyc-failed fw-4 col-alignment"><img src="/images/red-error.svg" class="mr-2" />{{
                        $t('person.ph11') }}: {{ auditingremark }}</p>
                </a-card>
                <a-card class="mx-2 my-2" :bordered="false">
                    <a-form-model ref="authenticationForm" :model="nation" :hide-required-mark="true" label-align="left"
                        :rules="rules">
                        <a-row :gutter="24" class="mx-5" v-if="!successSubmit">
                            <a-col :lg="24">
                                <a-row :gutter="16">
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl41')" prop="countryid"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select :open="open" v-model="nation.countryid"
                                                :placeholder="$t('placeholders.plh39')" ref="fiatSelect"
                                                v-on:select="setOpen(false)" @dropdownVisibleChange="onOpen">
                                                <a-icon slot="suffixIcon" :type="open ? 'up' : 'down'" />
                                                <div slot="dropdownRender" slot-scope="menu">
                                                    <div style="padding: 4px 8px; cursor: pointer;">
                                                        <a-input v-if="open" :placeholder="$t('placeholders.plh5')"
                                                            ref="countrySearch" class=" all-input-search"
                                                            v-on:blur="setOpen(false)" v-model="searchValue" />
                                                    </div>
                                                    <a-divider style="margin: 4px 0;" />
                                                    <v-nodes :vnodes="menu" />
                                                </div>
                                                <a-select-option v-for="(item, index) in countryOptions" :key="index"
                                                    :value="item.countryid"
                                                    v-if="filterCountryOptions(item.name.toLowerCase())">
                                                    <span><img class="mr-2 mb-1" :src="item.flag" width="20"
                                                            height="auto" />{{
                                                                item.name + ' +' +
                                                                item.areacode
                                                            }}</span>
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <!--EMAIL COLUMN-->
                                        <a-form-model-item has-feedback :label="$t('labels.lbl42')" prop="docType"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select :placeholder="$t('placeholders.plh40')"
                                                @change="documentTypeSelected">
                                                <a-select-option v-for="item in addressproofOptions" :key="item.value"
                                                    :value="item.value">{{ item.text }}</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16">
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl44')" prop="street"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input v-model="nation.street" :placeholder="$t('placeholders.plh41')" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl43')" prop="zipCode"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-input type="number" v-model="nation.zipCode"
                                                :placeholder="$t('placeholders.plh42')" />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>

                                <a-row :gutter="16" class="mt-4">
                                    <p class="document-type fw-4 pl-2">{{ $t('adsharing.as26') }}</p>
                                    <a-col :lg="9">
                                        <!-- uploadingDocument -->
                                        <div class="front-back">

                                            <div class="loading">
                                                <AppLoading height="240px" background-color="transparent"
                                                    v-if="uploadingDocument" />
                                            </div>
                                            <!-- shufti.document_image -->
                                            <div class="avatar my-3 cursor text-center" @click="OpenUploadModal(1)">
                                                <div v-if="shufti.document_image.ext == 'pdf'">
                                                    <svg  class="svg-icon file" width="17" height="17">
                                        <use xlink:href="/images/svg/sprite.svg#billing-details-icon"></use>
                                        </svg>
                                                    <div class="mt-2">
                                                        {{ shufti.document_image.name }}
                                                    </div>
                                                </div>

                                                <img v-else :src="imageUrl.front">
                                            </div>

                                            <span v-if="imageUrl.error != undefined" class="red-active">{{ imageUrl.error
                                            }}</span>
                                        </div>

                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="mt-4 pt-4">
                                    <a-col :lg="8" :offset="8"><a-button class="primary-btn fw-5 mt-2 submit-kyc"
                                            :disabled="loading || uploadingDocument" :loading=loading block
                                            @click="submitAudit">{{ $t('person.ph17') }}</a-button>
                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                        <a-row v-else :gutter="24" class="ml-5 p-5">
                            <a-col :lg="24" class="text-center">
                                <p class="identity-heading fw-5 mb-1">Lv.3</p>
                                <p class="lv-success fw-5 mb-3">{{ $t('person.ph18') }}</p>
                                <p class="info-heading fw-5 mb-0">{{ $t('person.ph19') }}</p>
                                <p class="info-heading fw-5 mb-5">{{ $t('person.ph20') }}</p>
                                <img src="/images/success-lv2.png" />
                            </a-col>
                        </a-row>
                    </a-form-model>
                </a-card>
            </div>
        </a-card>
        <UploadModal :uploadModel="uploadModel" :close="close" @uploadImage="uploadImage" :openFor="imageUrl.openFor" />
        <ShuftiResponseModal :show="shufti.showShuftiResponse" @onClose="closeShuftiResponseModal" />
    </div>
</template>

<script>
import AppLoading from '~/components/AppLoading.vue';
import ShuftiResponseModal from './ShuftiResponseModal.vue';
import UploadModal from './UploadModal.vue';
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    name: 'Lv3Form',
    components: {
        UploadModal,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
        ShuftiResponseModal,
        AppLoading
    },
    data() {
        return {
            imageUrl: {
                front: '/images/front-side-upload.svg',
                error: undefined,
                openFor: 1,
            },

            searchValue: '',
            open: false,
            countryOptions: [],
            nation: {
                countryid: '',
                street: '',
                zipCode: '',
                docType: null,
                countryname: '',
                idCoverImg: false
            },
            uploadModel: false,
            docimg: '',
            lang: this.$store.state.hex_lang.locale,
            successSubmit: false,
            loading: false,
            uploadingDocument: false,
            shufti: {
                document_type: null,
                showShuftiResponse: false,
                response: null,
                document_image: {
                    string: null,
                    ext: null
                }
            },
            rules: {
                countryid: [
                    { required: true, message: this.$t('messages.msg53') }
                ],
                docType: [
                    { required: true, message: this.$t('messages.msg34') },
                ],
                street: [
                    { required: true, message: this.$t('messages.msg35') },
                ],
                zipCode: [
                    { required: true, message: this.$t('messages.msg36') },
                ],
            },
        }
    },
    computed: {
        ...mapGetters('shufti-pro', ['getAddressResponse', 'sendRequestToShuftiPro']),
        addressproofOptions: function () {
            return [
                {
                    text: this.$t('texts.txt31'),
                    value: "1",
                    key: 'utility_bill',
                },
                {
                    text: this.$t('texts.txt32'),
                    value: "2",
                    key: 'bank_statement',
                },
                {
                    text: this.$t('texts.txt33'),
                    value: "3",
                    key: 'bank_letter_receipt',
                },
                {
                    text: this.$t('texts.txt34'),
                    value: "4",
                    key: 'rent_agreement',
                },
                {
                    text: this.$t('texts.txt37'),
                    value: "5",
                    key: 'permanent_residence_permit',
                }
            ];
        },
        addressResponse() {
            return this.getAddressResponse
        },
    },
    watch: {
        "$store.state.hex_lang.locale": function (val) {
            this.countryOptions.map(item => {
                if (val == "zh_cn") {
                    item.name = item.name;
                } else {
                    item.name = item.engname;
                }
            });
        },
        "nation.countryid": function (val) {
            if (val) {
                this.countryOptions.find(item => {
                    if (item.countryid == val) {
                        this.nation.countryname = item.name
                    }
                })
            }
        },
        addressResponse: {
            handler: function (val) {
                //console.log("faceResponse watching at articles");
                //console.log('WatchingAddressResponse', val)
                if (val.status == 'verification.accepted') {
                    const object = this.shufti.document_image
                    this.uploadImageToServer(object)
                }
            },
            deep: true,
            immediate: true
        },
    },
    mounted() {
        this.$store.dispatch("com_country_getlist").then(({ data }) => {
            this.countryOptions = data;
            this.countryOptions.map(item => {
                if (this.lang == 'zh_cn' || this.lang == 'zh_hk') {
                    item.name = item.name;
                } else {
                    item.name = item.engname;
                }
            });
            this.getLang()
        })
    },
    methods: {
        ...mapActions("shufti-pro", ["verifyDocument"]),
        ...mapMutations('shufti-pro', ['setFaceResponse']),
        filterCountryOptions(str) {
            const _self = this;
            if (_self.searchValue !== '') {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
            }
            return true
        },
        setOpen(bool) {
            if (this.open == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.open = bool
                    this.searchValue = '';
                }, 100);
            }
            else {
                this.open = bool;
            }
        },
        onOpen() {
            //console.log("dfd")
            this.open = true
            setTimeout(() => {
                this.$refs.countrySearch?.focus()
            }, 100);
        },

        close() {
            this.uploadModel = false
        },
        goback() {
            this.$router.go(-1);
        },
        getLang() {
            const _self = this;
            this.$store.dispatch("com_getlangbyip").then(({ data }) => {
                if (data) {
                    //console.log(data)
                    this.countryOptions.filter(item => {
                        if (item.countryid == data.countryid) {
                            _self.nation.countryid = item.countryid
                        }
                    })
                }
            });
        },
        documentTypeSelected(value) {
            const object = this.addressproofOptions.find((option) => option.value == value)
            if (object) {
                this.nation.docType = object.text
                //console.log('object::::', object)
                this.shufti.document_type = object.key
            }
        },
        OpenUploadModal(openFor) {

            if (this.sendRequestToShuftiPro) {
                this.$refs['authenticationForm'].validate((valid) => {
                    //console.log('valid', valid);
                    if (valid) {
                        this.imageUrl.openFor = openFor
                        this.uploadModel = true
                    }
                })
            } else {
                this.imageUrl.openFor = openFor
                this.uploadModel = true
            }
        },
        async uploadImage(req) {
            //console.log('reQQQ', req)
            this.shufti.document_image = {
                string: req.base64image,
                ext: req.ext,
                name: req.object.name
            }

            if (!this.sendRequestToShuftiPro) { //if shufti request is disabled
                this.uploadImageToServer(this.shufti.document_image)
                return
            }

            //send request to shufti
            let supported_types = [this.shufti.document_type]
            const object = {

                proof: this.shufti.document_image.string,
                supported_types: supported_types,
                full_address: this.nation.street,
                address_fuzzy_match: 1,
                allow_online: "0",
                check_duplicate_request: "1",
                verification_mode: "image_only", //any, image_only, video_only
                name: 'address' //custom field
            }


            const reference = `AD_${Math.random()}`
            const shuftiobject = {
                reference: reference,
                address: object,
                name: 'address'
            }

            //console.log('ShuftiProObject', object)
            this.shufti.showShuftiResponse = true
            const response = await this.verifyDocument(shuftiobject)
        },

        closeShuftiResponseModal(res) {
            //console.log('RESSS', res);
            this.shufti.showShuftiResponse = false
        },
        uploadImageToServer(object) {
            const _self = this
            _self.uploadingDocument = true
            _self.$store
                .dispatch("com_image_upload", {
                    imgbase64: object.string.split(",")[1],
                    width: "150",
                    height: "150",
                    filename: new Date().getTime() + Number(Math.random() * 1000000000) + "." + object.ext
                })
                .then(res => {
                    _self.uploadingDocument = false
                    if (res.code == 200) {
                        _self.nation.idCoverImg = res.data.imgurl
                        _self.imageUrl.front = res.data.imgurl
                    }
                })
        },

        async submitAudit() {
            const _self = this;
            let errorFlag = false

            if (!_self.nation.idCoverImg) {
                _self.imageUrl.error = this.$t('conditionaltxt.ct20')
                errorFlag = true
            }
            if (errorFlag) {
                return;
            }
            await this.$refs['authenticationForm'].validate((valid) => {
                if (valid) {
                    const postData = {
                        countryID: _self.nation.countryid,
                        countryName: _self.nation.countryname,
                        address: _self.nation.street,
                        zipCode: _self.nation.zipCode,
                        certificateType: _self.nation.docType,
                        proofImg1: _self.nation.idCoverImg,
                        proofimg2: _self.addressResponse.response ? _self.addressResponse.response : ''
                    }
                    _self.loading = true;
                    _self.$store.dispatch("user_user_addressauth", postData).then(res => {
                        if (res.data) {
                            // _self.successSubmit = true;
                            _self.$emit("getUserInfo");
                            _self.$store.commit("set_message", { type: "ok", text: res.msg });
                            this.$router.push("/person/authentication");
                        }
                        _self.loading = false;
                    });

                }
            })




        }
    }
}
</script>

<style></style>
