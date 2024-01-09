<template>
    <div class="ads-records">
        <a-card :bordered="false" class="my-3 detail-card financial-card">
            <div class="main-currency-card">

            <div class="currency-detail px-4">
                <a-row :gutter="8" class="px-3">
                    <a-col :lg="2">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd1')}}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd2')}}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd3')}}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd4')}}</p>
                    </a-col>
                    <a-col :lg="2">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd5')}}</p>
                    </a-col>
                    <a-col :lg="3">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd6')}}</p>
                    </a-col>
                    <a-col :lg="4">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd7')}}</p>
                    </a-col>
                    <a-col :lg="2" align="end">
                        <p class="type-coin-txt fw-4">{{$t('modals.mAd8')}}</p>
                    </a-col>

                </a-row>
                <a-card :bordered="false" class="currency-detail-card">
                    <a-row class="px-3 curency-detail-bg">
                        <a-col :lg="14">
                            <p class="mb-0 currency-txt fw-5"><span> <a-checkbox>

                                    </a-checkbox></span><span class="buy-txt pl-2"> {{$t('modals.mAd9')}}</span> <a-divider type="vertical"
                                    class="mx-2" /><span> 2022-11-19 15:25:23</span> <a-divider type="vertical"
                                    class="mx-2" /><span>20427229712<img src="/images/copy-icon.svg"
                                        class="pl-2 mb-1" height="15px"/></span></p>
                        </a-col>
                        <a-col :lg="10" align="end">
                            <img src="/images/download-p2p.svg" class="mr-2"/>
                            <img src="/images/edit.svg" class="mr-2"/>
                            <img src="/images/copy1.svg" class="mr-2"/>

                            <svg width="14" height="14" class="svg-icon mr-2" >
      <use xlink:href="/images/svg/sprite.svg#red-cross-icon"></use>
    </svg>
                        </a-col>
                    </a-row>
                    <a-row :gutter="8" class="px-3 py-4 col-alignment">
                        <a-col :lg="2">
                            <p class="col-alignment currency-txt fw-5 usdt-txt mb-0">BTC/PKR</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0">100.00</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt red-active mb-0">0.00</p>
                        </a-col>
                        <a-col :lg="4">
                            <p class="currency-txt fw-5 usdt-txt mb-0 pointer">1,000.00-750,000 PKR</p>
                        </a-col>
                        <a-col :lg="2">
                            <p class="currency-txt fw-5 usdt-txt mb-0">--</p>
                        </a-col>
                        <a-col :lg="3">
                            <p class="currency-txt fw-5 usdt-txt mb-0">190.00</p>
                        </a-col>
                        <a-col :lg="4"><a-row :gutter="8">
                                <a-col :lg="12"><a-tag class="bank-transfer-tag fw-4">{{$t('modals.mAd10')}}</a-tag><a-tag class="bank-transfer-tag fw-4 easypaisa">Easypaisa-PK</a-tag></a-col>
                                <a-col :lg="12" class="pr-2 pl-0"><a-tag class="bank-transfer-tag fw-4">{{$t('modals.mAd10')}}</a-tag><a-tag class="bank-transfer-tag fw-4 easypaisa">Easypaisa-PK</a-tag></a-col>
                            </a-row></a-col>
                        <a-col :lg="2" align="end"><a-button class="publish-btn fw-5">{{$t('modals.mAd11')}}</a-button></a-col>
                    </a-row>
                </a-card>
            </div>
            </div>
        </a-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
