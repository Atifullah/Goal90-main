<template>
    <div class="submit-appeal">
        <a-modal id="submit-appeal" v-model="submitAppealModel" :footer="false" :title="false" @cancel="close" width="40%">
            <a-row :gutter="16" class="col-alignment px-3">
                <a-col :lg="20">
                    <p class="heading-txt fw-5 mb-0">{{ $t('modals.subm14') }}</p>
                </a-col>
                <a-col :lg="4" align="end" class="pointer"><img src="/images/ud-cross.svg" @click="close" /></a-col>
            </a-row>
            <a-row :gutter="16" class="pt-4 mt-4">
                <a-col :lg="24">
                    <div class="scroll_div">
                        <!-- <a-steps :current="current" label-placement="vertical" class="px-3 pb-4">
                                <a-step v-for="(item,index) in steps" :key="index" :title="item.title">
                                    <span slot="icon">
                        <img :src="current>=index?'/images/dot-active.svg':'/images/dot-p2p.svg'"  class="pointer" />
                    </span>
                                    </a-step>
                            </a-steps> -->
                        <div class="steps-content mb-2 mt-2 px-3">

                            <a-card class="orange-card" :bordered="false">
                                <ol class="order-list fw-5">
                                    <li>{{ $t('modals.subm1') }}</li>
                                    <li>{{ $t('modals.subm2') }}</li>
                                    <li>{{ $t('modals.subm3') }}
                                    </li>
                                </ol>
                            </a-card>
                            <a-form-model ref="submitAppealForm" :hide-required-mark="true" label-align="left">
                                <a-row class="my-3">
                                    <a-col :lg="24">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl18')" prop="coin"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-select v-model="reason">
                                                <a-select-option :value="$t('returntxt.rtxt43')">
                                                    {{ $t('modals.subm4') }}
                                                </a-select-option>
                                                <a-select-option :value="$t('returntxt.rtxt44')">
                                                    {{ $t('modals.subm5') }}
                                                </a-select-option>
                                                <a-select-option :value="$t('returntxt.rtxt46')">
                                                    {{ $t('modals.subm6') }}
                                                </a-select-option>
                                                <a-select-option :value="$t('returntxt.rtxt45')">
                                                    {{ $t('modals.subm7') }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :lg="24" v-if="reason == this.$t('returntxt.rtxt45')">
                                        <a-form-model-item has-feedback :label="$t('labels.lbl19')" prop="coin"
                                            :colon="false" :wrapper-col="{
                                                xl: 24,
                                                lg: 24,
                                                md: 24,
                                                sm: 24,
                                                xs: 24,
                                            }">
                                            <a-textarea v-model="description" :placeholder="$t('placeholders.plh27')"
                                                :rows="4" />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>



                                <p class="proof-txt fw-5">{{ $t('modals.subm8') }}</p>
                                <p class="pr-2 pb-3">
                                    {{ $t('modals.subm9') }} <br />
                                    {{ $t('modals.subm10') }}</p>


                                <p class="proof-txt fw-5">{{ $t('modals.subm11') }}</p>

                                <div class="pr-4">

                                    <a-upload action="" list-type="picture-card" :file-list="fileList"
                                        @preview="handlePreview" @change="handleChange">
                                        <div v-if="fileList.length < 4">
                                            <a-icon type="plus" />

                                        </div>
                                    </a-upload>
                                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                        <img alt="example" style="width: 100%" :src="previewImage" />
                                    </a-modal>
                                </div>
                                <p v-show="noImage" style="font-size:14px; color:red">{{ $t('modals.subm12') }}</p>

                                <a-row class="mt-4 pt-3" :gutter="16">
                                    <a-col :lg="12">
                                        <a-button block class="cancel-outline-btn fw-5 mr-3" @click="close">{{
                                            $t('modals.subm13') }}</a-button>
                                    </a-col>
                                    <a-col :lg="12">
                                        <a-button block class="px-4 primary-btn fw-5" :loading="loading"
                                            @click="UploadImages">{{ $t('modals.subm14') }}</a-button>
                                    </a-col>
                                </a-row>
                            </a-form-model>

                        </div>

                    </div>
                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        submitAppealModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
        orderdata: {
            type: Object
        },
        prevAppeal: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            current: -1,
            previewVisible: false,
            loading: false,
            previewImage: '',
            fileList: [],
            noImage: false,
            description: '',
            reason: 'I have made the payment but the seller has not released crypto',
            steps: [
                {
                    title: this.$t("tableskeys.lss6"),
                },
                {
                    title: this.$t("tableskeys.lss7"),
                },
                {
                    title: this.$t("tableskeys.lss8"),
                },
                {
                    title: this.$t("tableskeys.lss9")
                }
            ],
        }
    },
    methods: {
        handleCancel() {
            this.previewVisible = false
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }
            this.previewImage = file.url || file.preview
            this.previewVisible = true
        },
        handleChange({ fileList }) {
            if (fileList.length > 0) {
                const status = this.beforeImageUpload(fileList);
                if (status) {
                    this.fileList = fileList;
                    this.noImage = false;
                }
            }
            else {
                this.fileList = fileList;
                this.noImage = true;
            }
        },
        beforeImageUpload(fileList) {
            const file = fileList[fileList.length - 1];
            const isLt1M = file.size / 1024 / 1024 < 5;
            const isJPG = file.type === "image/jpeg" || file.type === "image/png";
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
            return isLt1M && isJPG;
        },
        async UploadImages() {

            const _this = this;
            let imgArray = [];
            if (this.fileList.length == 0) {
                this.noImage = true;
                // this.Submit(imgArray);
                return;
            }
            this.loading = true;
            for (let i = 0; i < this.fileList.length; i++) {
                const file = this.fileList[i];
                let formData = new FormData();
                formData.append("file", file);
                let imgUrlBase64;
                if (file.name) {
                    let reader = new FileReader();
                    imgUrlBase64 = reader.readAsDataURL(file.originFileObj);
                    reader.onload = async function (e) {
                        try {
                            const { data } = await _this.$store.dispatch("com_image_upload", {
                                imagetype: 'Payment',
                                imgbase64: (reader.result.split(','))[1],
                                filename: new Date().getTime() + file.name
                            });
                            if (data) {
                                imgArray.push(data.imgurl);
                                if (imgArray.length == _this.fileList.length) {
                                    _this.Submit(imgArray);
                                }
                            }
                        } catch (error) {
                            //console.log(error)
                        }
                    }
                }
            }
        },
        async Submit(imgArray) {
            let imgString = '';
            imgArray.filter((img, index) => {
                if (index < imgArray.length - 1) {
                    imgString = imgString + img + ', ';
                }
                else {
                    imgString = imgString + img;
                }

            })
            let postData = {
                typeName: 'P2P Trading',
                content: this.reason == 'Others' ? this.description : this.reason,
                images: imgString,
                orderId: this.orderdata.id,
                jsonContent: JSON.stringify({
                    currencyname: this.orderdata.currencyname,
                    txtid: this.orderdata.id
                }),
            }
            try {
                const data = await this.$store.dispatch('work_order_update', postData)
                if (data.code == 200) {
                    // 0, order placed but not paid; 
                    // 1, transaction completed; 
                    // 2, user cancels transaction; 
                    // 3, system cancels transaction; 
                    // 4, buyer has paid and is waiting for confirmation from seller; 
                    // 5, transaction is completed and awaits evaluation; 
                    // 6, buyer has paid An appeal is required; 
                    // 7. After the appeal is completed, the system transfers currency to complete the transaction.
                    this.loading = false;

                    if (this.orderdata.orderstatus == 2 || this.orderdata.orderstatus == 3) {
                        this.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt25') })
                        this.$emit('getorderdetail')
                        this.close();
                    }
                    else {
                        this.submitAppeal()
                    }

                }
            } catch (error) {
                this.loading = false;
            }
        },
        async submitAppeal() {
            try {
                const data = await this.$store.dispatch('trading_c2c_order_appeal', {
                    orderCompleteID: this.orderdata.id,
                    complainantreason: this.reason == 'Others' ? this.description : this.reason,
                })
                this.loading = false;
                if (data.code == 200) {
                    this.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt25') });
                    this.$emit('getorderdetail')
                    this.close();
                }
            } catch (error) {
                this.loading = false;
            }

        }
    }
}
</script>

<style></style>
