<template>
    <div>
        <a-modal id="confirmation" v-model="successfulModal" :footer="false" :title="false" @cancel="cancel" width="450px">
            <a-row :gutter="16">
                <a-col :lg="3"></a-col>
                <a-col :lg="18" align="center">
                    <img src="/images/confirm-conversion.svg" />
                </a-col>
                <a-col :lg="3" align="end">
                    <img src="/images/ud-cross.svg" class="pointer" @click="cancel" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="14" :offset="5">
                    <p class="text-center mt-3 mb-2 conversion-heading text-black fw-5">Successfully Purchased</p>
                    <p class="convertion-to mb-4 text-center">You have successfully purchased {{ conversionObj.to }} BNQ for
                        {{ conversionObj.from }} USDT.</p>
                    <p class="text-center mt-1 mb-3 conversion-heading text-black fw-5">Stake BNQ and Earn APY</p>
                </a-col>
            </a-row>
            <a-card class="success-card " :bordered="false">
                <a-row class="col-alignment">
                    <a-col :lg="14">
                        <p class="mb-0 right-side-txt fw-5 col-alignment">
                            <img :src="item.currencyicon" width="21" height="21" class="mr-2" />
                            {{ item.currencyname }}
                        </p>
                    </a-col>
                    <a-col :lg="10" align="end">
                        <span class="right-side-txt fw-5 mb-0">
                            {{ item.products[activeTab].cycle }}
                            {{ $t("subscriptio.sub23") }}
                        </span>
                        <p class="duration-txt mb-0">
                            {{ $t("subscriptio.sub16") }}
                        </p>
                    </a-col>
                </a-row>
                <a-divider class="mt-3 mb-3 success-divider" />
                <a-row :gutter="16" class="mb-3">
                    <a-col :lg="14">
                        <span class="btc-heading mr-2 fw-4">{{
                            $t("subscriptio.sub17")
                        }}</span>
                    </a-col>
                    <a-col :lg="10" align="end">
                        <span class="btc-heading coin-green fw-5">{{
                            item.products[activeTab].yearlyrate * 100
                        }}%</span>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mb-3">
                    <a-col :lg="14">
                        <span class="btc-heading fw-4 mr-1">{{
                            $t("subscriptio.sub18")
                        }}</span>
                    </a-col>
                    <a-col :lg="10" align="end">
                        <span class="btc-heading fw-4 mb-0 orange-text">
                            {{ status[item.products[activeTab].status] }}
                        </span>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :lg="24">
                        <div class="all-product-tabs">
                            <a-tabs v-model="activeTab" type="editable-card" hide-add @change="tabChanged">
                                <a-tab-pane v-for="(product, i) in item.products" :key="i"
                                    :tab="product.cycle + ' ' + $t('subscriptio.sub5')" :closable="false"
                                    @click="termChange(item_index, i)">
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                    </a-col>
                </a-row>
                <a-row class="mt-2">
                    <a-col>
                        <p class="mb-0 selled-btc fw-4">
                            {{ $t("subscriptio.sub24") }}:
                            <span class="selled-desc text-black fw-5">
                                {{ item.products[activeTab].selledamount }}
                                {{ item.currencyname }}
                            </span>
                        </p>
                        <a-progress :percent="(item.products[activeTab].selledamount * 100) /
                            item.products[activeTab].expectamount
                            " />

                        <p class="mb-0 mt-1 selled-btc fw-4 text-right">
                            {{ $t("subscriptio.sub19") }}:
                            <span class="selled-desc text-black fw-5">
                                {{ item.products[activeTab].expectamount }}
                                {{ item.currencyname }}
                            </span>
                        </p>
                    </a-col>
                </a-row>
            </a-card>
            <a-row :gutter="16" class="mt-4">

                <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" block>
                    <a-button html-type="submit" block class="cancel-outline-btn fw-5" @click="cancel">
                        Cancel
                    </a-button>
                </a-col>

                <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" block>

                    <a-button html-type="submit" block class="primary-btn fw-5" @click="proceed">
                        Proceed
                    </a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        successfulModal: {
            type: Boolean
        },
        item: {
            type: Object,
            default: Object
        },
        conversionObj: {
            type: Object,
            default: Object
        },
        subscriptionBtnModel: {
            type: Function,
        },
    },
    data() {
        return {
            activeTab: 0,
            status: [
                this.$t("stratergybot.sb18"),
                this.$t("stratergybot.sb17"),
                this.$t("stratergybot.sb19"),
            ],
        }
    },
    methods: {
        tabChanged(tab) {
            console.log(tab);
        },
        cancel() {
            this.$emit('close')
        },
        proceed() {
            this.subscriptionBtnModel(1, 'BNQ', this.activeTab, 0)
            this.$emit('proceed')
        }
    },

}
</script>

<style></style>