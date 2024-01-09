<template>
    <div class="ticket-form  ">
        <div class="ant-row">
            <div class="orange-card-btn my-4 ant-card">
                <div class="ant-card-body">
                    <div class="d-flex">
                        <div class="error-img-left">
                            <img src="/images/orange-img.svg">
                        </div>
                        <div class="error-img-left pl-3">
                            {{ $t('person.ticket_message') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-form-model :model="createTicketForm" ref="ticketForm" :hide-required-mark="true" label-align="left"
            :rules="setValidation.rules">
            <a-row :gutter="16" class="pb-5">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <a-row :gutter="16">
                        <a-col :lg="10">
                            <a-row :gutter="16">
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="22" class="pb-4">
                                    <AppFormModelItem label="Ticket Type" prop="type">
                                        <a-select class="w-100" v-model="createTicketForm.type" >
                                            <a-select-option :value="$t(option.label)" v-for="(option) in options"
                                                :key="option.value + 'dfd'">
                                                {{ $t(option.label) }}
                                            </a-select-option>
                                        </a-select>
                                    </AppFormModelItem>
                                </a-col>

                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="22" class="pb-4">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl49')" prop="coinCode"
                                        :colon="false" :wrapper-col="{
                                            xl: 24,
                                            lg: 24,
                                            md: 24,
                                            sm: 24,
                                            xs: 24,
                                        }">
                                        <a-select v-model="createTicketForm.coinCode"
                                            :placeholder="$t('placeholders.plh5')">
                                            <a-select-option v-for="item in currencies" :key="item.id"
                                                :value="item.currencyname">
                                                <img :src="item.icon" class="mr-1" width="15" height="15" />
                                                {{ item.currencyname }}</a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="22">
                                    <a-form-model-item has-feedback :label="$t('labels.lbl50')" prop="transactionHash"
                                        :colon="false">
                                        <a-input v-model="createTicketForm.transactionHash"
                                            :placeholder="$t('placeholders.plh43')" />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :lg="14">
                            <p class="submit-txt1 fw-5 mb-4">
                                {{ $t('person.pi15') }}

                            </p>
                            <div class="clearfix">
                                <a-upload action="" list-type="picture-card" :file-list="fileList" @preview="handlePreview"
                                    @change="handleChange">
                                    <div v-if="fileList.length < 8">
                                        <img src="/images/upload-icon.svg" />
                                        <div class="ant-upload-text mt-2">
                                            {{ $t('person.pi16') }}
                                        </div>
                                    </div>
                                </a-upload>
                                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                    <img alt="example" style="width: 100%" :src="previewImage" />
                                </a-modal>
                            </div>
                            <a-col :lg="24">
                                <p class="upload-txt fw-5 mt-2 mb-0">{{ $t('person.pi17') }}</p>
                            </a-col>
                        </a-col>

                    </a-row>

                </a-col>
            </a-row>

            <a-col :lg="14">
                <a-form-model-item has-feedback :label="$t('labels.lbl51')" prop="content" :colon="false">
                    <a-textarea v-model="createTicketForm.content" :placeholder="$t('placeholders.plh44')" :rows="8" />
                </a-form-model-item>
                <p class="mb-0 upload-txt fw-5">{{ $t('person.pi14') }}： 0/240</p>

            </a-col>

            <a-col :lg="24">
                <a-button class="outline-btn fw-5 px-5 my-4" @click="UploadImages" :loading="loading">{{ edit ? 'Update' :
                    $t('person.pi18') }}</a-button>
            </a-col>

        </a-form-model>
    </div>
</template>

<script>
import AppFormModelItem from '~/components/App/AppFormModelItem.vue'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default {
    name: 'CreateTicketForm',
    props: {
        row: {
            type: Object
        },
        edit: {
            type: Boolean
        },
    },
    computed: {
        typeName() {
            //console.log('this.createTicketForm.type:', this.createTicketForm.type);
            switch (this.createTicketForm.type) {

                case 1:
                    return this.$t("wallet.recharge");
                case 2:
                    return this.$t("person.Withdraw_person");
                case 3:
                    return this.$t("btntxt.bt6");
                case 4:
                    return this.$t("lv4form.lvf1");
                case 5:
                    return this.$t("btntxt.bt7");
                case 6:
                    return this.$t("stratergybot.sb16");
                case 7:
                    return this.$t("lv4form.lvf7");
            }
        }
    },
    data() {
        return {
            createTicketForm: {
                coinCode: undefined,
                transactionHash: "",
                content: "",
                type: "Deposit"
            },
            loading: false,
            currencies: [],
            tab: 1,
            previewVisible: false,
            previewImage: "",
            fileList: [],
            options: [
                { value: 1, label: "home_page.hp2" },
                { value: 2, label: "person.Withdraw_person" },
                { value: 3, label: "home_page.hp3" },
                { value: 4, label: "person.pm28" },
                { value: 5, label: "public.ph22" },
                { value: 6, label: "public.ph26" },
                { value: 7, label: "p2p.p2p" },
                { value: 8, label: "public.pub3" },
                { value: 9, label: "public.ph40" },
                { value: 10, label: "public.ph42" },
                { value: 11, label: "stratergybot.sb16" },
                { value: 12, label: "formMenu.funds_flow" },
                { value: 13, label: "tabkeys.tab34" },
                { value: 14, label: "texts.other" },
                { value: 15, label: "texts.cancel" },
            ],
            setValidation: {
                rules: {
                    content: [
                        {
                            required: true,
                            message: this.$t('errors.err21'),
                        },
                    ],
                    type: [
                        {
                            required: true,
                            message: this.$t('errors.err21'),
                        },
                    ]
                }
            }
        };
    },
    methods: {
        handleCancel() {
            this.previewVisible = false;
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
                this.createTicket(imgArray);
                return;
            }
            let count = 0;

            for (let i = 0; i < this.fileList.length; i++) {
                const file = this.fileList[i];
                let formData = new FormData();
                formData.append("file", file);
                let imgUrlBase64;
                //console.log('$THISS', file.name);
                if (file.name) {
                    let reader = new FileReader();
                    imgUrlBase64 = reader.readAsDataURL(file.originFileObj);
                    reader.onload = async function (e) {
                        try {
                            const { data } = await _this.$store.dispatch("com_image_upload", {
                                imagetype: "Payment",
                                imgbase64: (reader.result.split(","))[1],
                                filename: new Date().getTime() + file.name
                            });
                            if (data) {
                                imgArray.push(data.imgurl);
                                if (imgArray.length == _this.fileList.length) {
                                    _this.createTicket(imgArray);
                                }
                            }
                        }
                        catch (error) {
                            //console.log(error);
                        }
                    };
                }
                else {
                    imgArray.push(file.url);
                }
            }

            // if (this.edit) {
            //     this.createTicket(imgArray);
            // }
        },
        async createTicket(images) {
            let imgString = "";

            // const images = this.fileList
            images.filter((img, index) => {
                if (index < images.length - 1) {
                    imgString = imgString + img + ", ";
                }
                else {
                    imgString = imgString + img;
                }
            });
            //console.log('imgString', imgString);
             
            //console.log('imgArray:', images);
            let postData = {
                typeName: this.createTicketForm.type,
                content: this.createTicketForm.content,
                orderid: this.createTicketForm.transactionHash,
                images: imgString,
                jsonContent: JSON.stringify({
                    currencyname: this.createTicketForm.coinCode,
                    txtid: this.createTicketForm.transactionHash
                }),
            };
            if (this.row) {
                postData.status = this.row.status;
                postData.id = this.row.id;
            }
            try {
                const _self = this
                const validate = await this.$refs["ticketForm"].validate(async (valid) => {
                    //console.log("validated: valid: ", valid)
                    if (valid) {
                        _self.loading = true;
                        const data = await _self.$store.dispatch("work_order_update", postData);
                        _self.loading = false;
                        if (data.code == 200) {
                            _self.$store.commit("set_message", { type: "ok", text: _self.$t("texts.txt25") });
                            _self.$router.push("/person/my-tickets");
                        }
                    }
                });



            }
            catch (error) {
                //console.log("Error", error);
                this.loading = false;
            }
        }
    },
    mounted() {
        const _self = this;
        let fileList=Array()
        this.currencies = this.$store.state.currencyinfos;
        if (this.row) {
            this.createTicketForm.content = this.row.content;
            const jsoncontent = JSON.parse(this.row.jsoncontent);
            this.createTicketForm.transactionHash = jsoncontent.txtid;
            this.createTicketForm.coinCode = jsoncontent.currencyname;
            this.createTicketForm.type = this.row.typename
            const imageArray = this.row.images?.split(",");
            //console.log(imageArray);
            if (imageArray && imageArray[0] != "") {
                imageArray.map((item, index) => {
                    const obj = {
                        uid: index,
                        status: this.$t("extra.extra30"),
                        url: item,
                    };
                    fileList.push(obj);
                    
                });
            }
            _self.fileList=fileList 
        }
    },
    components: { AppFormModelItem }
}
</script>

<style></style>
