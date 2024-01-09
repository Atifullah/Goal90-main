<template>
    <div class="help-center">
        <a-modal id="send-play-modal" wrapClassName="help-center-modal" v-model="helpCenterModel" :footer="false"
            :title="false" @cancel="close" width="45%">
            <a-row :gutter="16" class="my-2 px-2">
                <a-col :lg="4"></a-col>
                <a-col :lg="16" align="center">
                    <div class="room-card px-2 text-center">
                        <img src="/images/help-card.svg" width="260px" />
                        <p class="game-rom-txt fw-4 room-info-txt mb-0">{{$t('game_rules.gr1')}}</p>
                    </div>
                </a-col>
                <a-col :lg="4" align="end">
                    <img src="/images/close-btn.svg" @click="close" class="pointer" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="24">
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" :tab="$t('game_rules.tab1')">
                            <a-row>
                                <a-col :lg="24">
                                    <div class="help-center-box pl-4">
                                        <div class="help-scroll">
                                            <div class="pr-5">
                                                <p class="mb-4 help-heading">{{$t('game_rules.gr2')}}</p>
                                                <p class="mb-3 help-desc fw-4 add-space">
                                                     {{$t('game_rules.gr4')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">1. {{$t('game_rules.gr05')}}</span> {{$t('game_rules.gr5')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">2. {{$t('game_rules.gr06')}}</span> {{$t('game_rules.gr6')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">3. {{$t('game_rules.gr07')}}</span> {{$t('game_rules.gr7')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">4. {{$t('game_rules.gr08')}}</span> {{$t('game_rules.gr8')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">5. {{$t('game_rules.gr09')}}</span> {{$t('game_rules.gr9')}}
                                                </p>
                                               <!--  <p class="mb-0 help-desc fw-4">
                                                    <span class="acitve-list">6.</span> {{$t('game_rules.gr10')}}
                                                </p> -->
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">6. {{$t('game_rules.gr011')}}</span> {{$t('game_rules.gr11')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">7. {{$t('game_rules.gr012')}}</span>  {{$t('game_rules.gr12')}}
                                                </p>
                                                <p class="mb-3 help-desc fw-4">
                                                    <span class="acitve-list">8.</span>  {{$t('game_rules.gr13')}}
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                </a-col>
                            </a-row>
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="$t('game_rules.tab2')">
                            <div class="help-center-box pl-4">
                                <div class="help-scroll">
                                    <div class="pr-2">
                                        <p class="mb-4 help-heading">{{$t('game_rules.gr14')}}</p>
                                        <p class="mb-3 help-desc fw-4">1. {{$t('game_rules.gr15')}}
                                        </p>
                                        <p class="mb-3 help-desc fw-4"><span class="red-bull fw-6">2. {{$t('game_rules.gr16')}}:</span> {{$t('game_rules.gr17')}}</p>
                                        <p class="mb-3 help-desc fw-4"><span class="orange-bull fw-6">3. {{$t('game_rules.gr18')}}:</span> {{$t('game_rules.gr19')}}</p>
                                        <p class="mb-3 help-desc fw-4"><span class="silver-bull fw-6">4. {{$t('game_rules.gr20')}}:</span> {{$t('game_rules.gr21')}}</p>
                                        <p class="mb-4 help-desc fw-4"><span class="gold-bull fw-6">5. {{$t('game_rules.gr22')}}:</span> {{$t('game_rules.gr23')}}</p>
                                        <p class="mb-3 help-heading">{{$t('game_rules.gr24')}}</p>
                                        <p class="mb-3 help-desc fw-4">{{$t('game_rules.gr25')}}: <span class="gold-bull fw-6">{{$t('game_rules.gr22')}}</span> > <span class="silver-bull fw-6">{{$t('game_rules.gr20')}}</span> >
                                            <span class="orange-bull fw-6">{{$t('game_rules.gr18')}}</span> > <span
                                                class="red-bull fw-6">{{$t('game_rules.gr16')}}</span>
                                        </p>
                                        <p class="mb-4 help-desc fw-4">{{$t('game_rules.gr26')}} <br> {{$t('game_rules.gr262')}} </p>
                                    </div>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="3" :tab="$t('game_rules.tab3')">
                            <div class="help-center-box">
                                <a-card :bordered="false" class="multiple-card gold-card mt-5">
                                    <a-row>
                                        <a-col :lg="12">
                                            <p class="mb-0 left-txt">{{$t('game_rules.gr22')}}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 left-txt">5{{$t('game_rules.gr35')}}</p>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-card :bordered="false" class="multiple-card">
                                    <a-row>
                                        <a-col :lg="12">
                                            <p class="mb-0 left-txt silver-txt">{{$t('game_rules.gr20')}}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 left-txt silver-txt">4{{$t('game_rules.gr35')}}</p>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-card :bordered="false" class="multiple-card gold-card">
                                    <a-row>
                                        <a-col :lg="12">
                                            <p class="mb-0 orange-txt">{{$t('game_rules.gr181')}} (9)</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 orange-txt">3{{$t('game_rules.gr35')}}</p>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-card :bordered="false" class="multiple-card">
                                    <a-row>
                                        <a-col :lg="12">
                                            <p class="mb-0 orange-txt text-white">{{$t('game_rules.gr181')}} (8)</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 orange-txt text-white">2{{$t('game_rules.gr35')}}</p>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <a-card :bordered="false" class="multiple-card gold-card">
                                    <a-row>
                                        <a-col :lg="12">
                                            <p class="mb-0 orange-txt">{{$t('game_rules.gr28')}}</p>
                                        </a-col>
                                        <a-col :lg="12" align="end">
                                            <p class="mb-0 orange-txt">1{{$t('game_rules.gr35')}}</p>
                                        </a-col>
                                    </a-row>
                                </a-card>
                                <p class="help-desc fw-4 mb-3 tip-tab-txt px-4 pt-4">{{$t('game_rules.gr29')}}:<img
                                        src="/images/gray-info.svg" class="pl-1" /></p>
                                <p class="help-desc fw-4 mb-3 tip-tab-txt px-4">{{$t('game_rules.gr30')}}</p>
                                <p class="help-desc fw-4 mb-3 tip-tab-txt px-4"> {{$t('game_rules.gr301')}}</p>

                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="4" :tab="$t('game_rules.tab4')">
                            <div class="help-center-box pl-4">
                                <div class="help-scroll">
                                    <div class="pr-5">
                                       <!--  <p class="mb-0 help-heading">{{$t('game_rules.gr31')}}</p> -->
                                        <p class="mb-3 help-desc fw-4"><!-- {{$t('game_rules.gr31')}}: <br /> -->
                                            {{$t('game_rules.gr33')}} </p>
                                               <p class="mb-3 help-desc fw-4">{{$t('game_rules.gr331')}} </p>
                                               <p class="mb-3 help-desc fw-4"> {{$t('game_rules.gr332')}} </p>
                                              <p class="mb-3 help-desc fw-4"> {{$t('game_rules.gr333')}} </p>
                    
                                    </div>
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        helpCenterModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
}
</script>

<style></style>
