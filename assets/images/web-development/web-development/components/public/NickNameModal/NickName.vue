<template>
    <div class="nick-name fw-5">
        <a-modal id="nick-name" v-model="nickNameModal" :footer="false" :title="false" @cancel="close" width="450px"
            :maskClosable="false">
            <a-row :gutter="16">
                <a-col :lg="22">
                    <p class="nick-name fw-5">{{ $t('extra.extra15') }}</p>
                </a-col>
                <a-col :lg="2" class="">
                </a-col>

            </a-row>
            <a-row :gutter="16">
                <a-col align="center" :lg="24">
                    <img src="/images/nickname-icon.svg" />
                </a-col>
            </a-row>
            <a-form-model ref="nickNameForm" :model="nickNameForm" :hide-required-mark="true" label-align="left"
                :rules="rules">

                <a-row :gutter="16" class="py-4">
                    <a-col :lg="24">
                        <a-form-model-item has-feedback :label="$t('labels.lbl74')" prop="nickName" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model="nickNameForm.nickName" :placeholder="$t('placeholders.plh53')" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="24">

                        <a-button class="primary-btn fw-5" block @click="saveNick"
                            :loading="loading">{{ $t('formMenu.confirm') }}</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        nickNameModal: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
    data() {
        return {
            nickNameForm: {
                nickName: ''
            },
            loading: false,
            rules: {
                nickName: [
                    { required: true, message: this.$t('messages.msg51') },
                ],
            }
        }
    },
    methods: {
        async saveNick() {
            const _self = this;
            await this.$refs['nickNameForm'].validate((valid) => {
                if (valid) {
                    _self.loading = true;
                    _self.$store.dispatch('user_user_nickname_save', {
                        nickName: this.nickNameForm.nickName,
                    }).then(({
                        data
                    }) => {
                        _self.loading = false;
                        if (data) {
                            _self.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt26') });
                            this.global_refresh_user_info();
                            _self.close()
                        }
                    })

                }
            })

        },
    }
}
</script>

<style lang="scss">@import '@/assets/scss/components/modals/nick-name.scss';</style>
