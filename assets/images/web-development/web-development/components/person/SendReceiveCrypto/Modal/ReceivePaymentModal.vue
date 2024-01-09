<template>
    <div>
        <a-modal id="detail-modal" v-model="receivePaymentModal" width="450px" :footer="false" :title="false" @cancel="close">
            <a-row :gutter="16" class="px-4">
                <a-col :lg="2"></a-col>
                <a-col :lg="20" class="text-center">
                    <p class="payment-heading fw-5 px-5 mb-0">{{ $t('person.pm9') }}</p>
                </a-col>
                <a-col :lg="2" align="end"><img src="/images/ud-cross.svg" @click="close"
                        class="pointer" />
                </a-col>

            </a-row>
            <a-row :gutter="16" class="px-4">
                <a-col :lg="24" class="text-center">
                    <img src="/images/receive-payment.svg" />
                </a-col>
            </a-row>
            <a-row :gutter="16" class="px-4">
                <a-col :lg="24" class="pl-4">
                    <ul class="receive-info-list">
                        <li v-for="(list, key) in getPaymentList" :key="key" class="mb-3">
                            <p class="mb-0 select-method fw-5">{{ list.title }}</p>
                            <span class="select-method-desc fw-5">{{ list.subTitle }}</span>
                        </li>
                    </ul>
                </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-3 px-4">
                    <a-col :lg="12"><a-button block @click="close" class="cancel-outline-btn fw-5">{{$t('extra.extra6')}}</a-button></a-col>
                <a-col :lg="12">
                    <a-button class="primary-btn fw-5" block @click="setCookie">{{ $t('person.pm11') }}</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        receivePaymentModal: {
            type: Boolean
        },
        close: {
            type: Function
        }
    },
    data() {
        return {
            getPaymentList: [
                {
                    title: this.$t("tableskeys.lh7"),
                    subTitle: this.$t("titles.title26")
                },
                {
                    title: this.$t("tableskeys.lh8"),
                    subTitle: this.$t("titles.title27")
                },
                {
                    title: this.$t("tableskeys.lh9"),
                    subTitle: this.$t("titles.title28")
                },
                {
                    title: this.$t("tableskeys.lh10"),
                    subTitle: this.$t("titles.title29")
                }
            ]
        }
    },
    methods: {
        setCookie() {
            const d = new Date();
            d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = 'receivePaymentModal' + "=" + true + ";" + expires + ";path=/";
            this.close();
        },
    }
}
</script>

<style></style>
