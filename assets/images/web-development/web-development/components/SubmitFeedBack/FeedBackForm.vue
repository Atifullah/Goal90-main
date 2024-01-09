<template>
    <div class="feed-back-form">
        <a-card class="form-card my-4" :bordered="false">
            <p class="feedback-txt fw-5 text-center mt-5 mb-0">{{$t('feedback.fdb3')}}</p>
            <p class="social-feedback fw-7 text-center mb-4">{{$t('feedback.fdb4')}}</p>
            <div class="text-center mt-4">
                <a-button class="primary-btn fw-5 feedback-btn px-4">{{$t('feedback.fdb5')}} <img
                        src="/images/white-arrow.svg" class="ml-2" /> </a-button>
            </div>
            <a-row :gutter="16">
                <a-col :lg="12" :offset="6" class="mt-4">
                    <a-row :gutter="16" class="mt-4">
                        <p class="pl-2 suggestion-type fw-5">{{$t('feedback.fdb6')}}</p>
                        <a-col :lg="12">
                            <p class="mb-0"><a-button block class="design-btn fw-5 mb-3">{{$t('feedback.fdb7')}}</a-button>
                            </p>
                            <p class="mb-0"><a-button block class="design-btn fw-5 mb-3">{{$t('feedback.fdb8')}}</a-button>
                            </p>

                        </a-col>
                        <a-col :lg="12">
                            <p class="mb-0"><a-button block class="design-btn fw-5 mb-3">{{$t('feedback.fdb9')}}</a-button></p>
                            <p class="mb-0"><a-button block class="design-btn fw-5 mb-3">{{$t('feedback.fdb10')}}</a-button>
                            </p>
                        </a-col>
                        <a-col :lg="24">
                            <a-button block class="design-btn fw-5">{{$t('feedback.fdb11')}}</a-button>
                        </a-col>
                    </a-row>
                    <a-form-model :model="feedbackForm" :hide-required-mark="true" label-align="left">
                        <a-row class="mt-4">
                            <a-col :lg="24">
                                <a-form-model-item has-feedback :label="$t('labels.lbl84')"
                                    prop="productType" :colon="false" :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-select style="width: 100%" :placeholder="$t('placeholders.plh64')"
                                        v-model="feedbackForm.productType">
                                        <a-select-option value="jack">
                                            {{$t('person.pm14')}}
                                        </a-select-option>
                                        <a-select-option value="lucy">
                                            {{$t('person.pm15')}}
                                        </a-select-option>
                                        <a-select-option value="Yiminghe">
                                            {{$t('person.pm17')}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="24" class="mt-3">
                                <a-checkbox-group v-model="value" name="checkboxgroup" :options="plainOptions"
                                    @change="onChange" />
                            </a-col>
                            <a-col :lg="24" class="mt-3">
                                <a-form-model-item has-feedback :label="$t('labels.lbl85')" prop="productType"
                                    :colon="false" :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-input :placeholder="$t('placeholders.plh65')" />

                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="24" class="mt-2">
                                <a-form-model-item has-feedback :label="$t('labels.lbl86')" prop="productType"
                                    :colon="false" :wrapper-col="{
                                        xl: 24,
                                        lg: 24,
                                        md: 24,
                                        sm: 24,
                                        xs: 24,
                                    }">
                                    <a-textarea :rows="4" />

                                </a-form-model-item>
                            </a-col>
                            <a-col :lg="24" class="mt-3">
                                <p class="suggestion-type fw-5">{{$t('feedback.fdb12')}}</p>

                                <a-upload-dragger name="file" :multiple="true"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange">
                                    <p class="ant-upload-drag-icon mt-4 mb-3">
                                        <img src="/images/upload-img.png" />
                                    </p>
                                    <p class="ant-upload-text mb-4">
                                        {{$t('feedback.fdb13')}}
                                    </p>
                                </a-upload-dragger>
                            </a-col>
                            <a-col :lg="18" class="mt-4">
                                <p class="mb-0 submit-txt fw-4 pt-2">{{$t('feedback.fdb14')}}</p>
                            </a-col>
                            <a-col :lg="8" class="mt-4 mb-5">
                                <a-button class="submit-btn fw-5 mb-5" block>{{$t('feedback.fdb15')}}</a-button>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </a-col>

            </a-row>

        </a-card>
    </div>
</template>

<script>
const plainOptions = ['IOS', 'Android', 'Website'];

export default {
    data() {
        return {
            plainOptions,
            value: [],
            feedbackForm: {
                productType: [],
            }
        }
    },
    methods: {
        onChange(checkedValues) {
            
        },
        handleChange(info) {
            const status = info.file.status;
            
            if (status === 'done') {
                this.$message.success(`${info.file.name} ${$t('depositModal.dm20')}`);
            } else if (status === 'error') {
                this.$message.error(`${info.file.name} ${$t('depositModal.dm21')}`);
            }
        },
    },
}
</script>

<style>

</style>
