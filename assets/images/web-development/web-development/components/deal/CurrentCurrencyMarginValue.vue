<template>
    <div>
        <div v-if="assetType">
            <div class="margin-row mx-2">
                <div class="label">
                    <AppTooltip placement="bottom" class="tooltip-hover" :title="$t('contract.canuseamount1')"
                        :text="$t('contract.canuseamount1')" textClass="text mb-3 fw-5" />
                </div>
                <div v-if="contractType == 1" :lg="19">
                    <p class="margin-amt fw-5">
                        {{ amount }}{{fCurrencyName}}
                    </p>
                </div>
                <div v-else :lg="19">
                    <p class="margin-amt fw-5">
                        {{ contractAssetsInfo ?
                            global_get_tofixed(contractAssetsInfo.amount,
                                global_get_decimal(fCurrencyName).a) : 0 }}
                        {{ fCurrencyName }} /
                        {{ contractAssetsInfo ? cutZero(global_get_tofixed(contractAssetsInfo.amount_usdt, 2)) : 0 }} USDT
                    </p>
                </div>
            </div>
            <div class="margin-row mx-2">
                <div class="label">
                    <AppTooltip placement="bottom" class="tooltip-hover" :title="$t('contract.position1')"
                        :text="$t('contract.position1')" textClass="text mb-3 fw-5" />
                </div>
                <div v-if="contractType == 1" :lg="19">
                    <p class="margin-amt fw-5">
                        {{ global_get_tofixed(positionValue, global_get_decimal('usdt').p) }}USDT
                    </p>
                </div>
                <div v-else :lg="19">
                    <p class="margin-amt fw-5">
                        {{ contractAssetsInfo ?
                            global_get_tofixed(contractAssetsInfo.amount,
                                global_get_decimal(fCurrencyName).a) : 0 }}
                        {{ fCurrencyName }} /
                        {{ contractAssetsInfo ? cutZero(global_get_tofixed(contractAssetsInfo.amount_usdt, 2)) : 0 }} USDT
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="margin-row mx-2">
                <div class="label">
                    <AppTooltip placement="bottom" class="tooltip-hover" :title="$t('contract.earnestTip')"
                        :text="$t('contract.earnest')" textClass="text mb-3 fw-5" />
                </div>
                <div v-if="contractType == 1" :lg="19">
                    <p class="margin-amt fw-5">
                        {{ contractAssetsInfo ? cutZero(global_get_tofixed(contractAssetsInfo.amount_usdt, 2)) : 0 }} USDT
                    </p>
                </div>
                <div v-else :lg="19">
                    <p class="margin-amt fw-5">
                        {{ contractAssetsInfo ?
                            global_get_tofixed(contractAssetsInfo.amount,
                                global_get_decimal(fCurrencyName).a) : 0 }}
                        {{ fCurrencyName }} /
                        {{ contractAssetsInfo ? cutZero(global_get_tofixed(contractAssetsInfo.amount_usdt, 2)) : 0 }} USDT
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppTooltip from '../App/AppTooltip.vue';

export default {
    components: { AppTooltip },
    props: {
        contractAssetsInfo: {
            type: Object,
            default: Object
        },
        fCurrencyName: {
            type: String,
            default: ''
        },
        contractType: {
            type: String,
            default: ''
        },
        //买入卖出价
        amount: '',
        positionValue: '',
        assetType: ''
    },
}
</script>

<style lang="scss" scoped></style>