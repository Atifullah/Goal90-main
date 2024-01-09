<template>
    <div class="coin-profile">
        <a-modal id="coin-profile-modal" v-model="coinProfile" :footer="false" :title="false" @cancel="close" width="640px">
            <a-row :gutter="16" class="p-4 col-alignment">
                <a-col :lg="10">
                    <a-select default-value="lucy" style="width: 100%">
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
                </a-col>
                <a-col :lg="10" class="pl-4">
                    <p class="coin-price mb-0">27,556.4 <span class="sec-price">-592.5-2.09%</span></p>
                </a-col>
                <a-col :lg="4" align="end">
                    <p class="cross-txt mb-0">F10 <img src="/images/cros1-header.svg" class="pointer ml-2"
                            @click="close">
                    </p>
                </a-col>
            </a-row>
            <a-divider class="coinprofile-divider m-0" />
            <a-row :gutter="16">
                <a-col :lg="24">
                    <a-tabs default-active-key="1" :tab-position="tabPosition">
                        <a-tab-pane key="1" :tab="$t('tabkeys.tab6')">
                            Content of Tab 1
                        </a-tab-pane>
                        <a-tab-pane key="2" :tab="$t('tabkeys.tab7')">
                            Content of Tab 2
                        </a-tab-pane>
                        <a-tab-pane key="3" :tab="$t('tabkeys.tab8')">
                            Content of Tab 3
                        </a-tab-pane>
                        <a-tab-pane key="4" :tab="$t('tabkeys.tab9')">
                            Content of Tab 3
                        </a-tab-pane>
                        <a-tab-pane key="5" :tab="$t('tabkeys.tab10')">
                            Content of Tab 3
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
        close: {
            type: Function
        },
        coinProfile: {
            type: Boolean
        }
    },
    data() {
        return {
            tabPosition: 'left',
        };
    },
    methods: {
        callback(val) {
           //console.log(val);
        },
    },
};

</script>

<style lang="scss" >
#coin-profile-modal {
    .coinprofile-divider {
        background: #3E3E3E !important;
        height: 0.6px !important;
        width: 1px !important;
        top: 0em !important;
    }

    .ant-modal-content {
        background: #1E2125;
        border-radius: 12px;

        .ant-modal-body {
            padding: 0;

            .coin-price {
                font-weight: 500;
                font-size: 20px;
                color: #00C076;

                .sec-price {
                    font-weight: 500;
                    font-size: 12px;
                    color: #FF2357;
                }
            }

            .cross-txt {
                font-weight: 500;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.5);
            }

            .ant-tabs-nav-wrap {
                padding: 0 !important;

                .ant-tabs-nav.ant-tabs-nav-animated {
                    background: transparent;
                    padding-left: 0 !important;
                }

                .ant-tabs-nav.ant-tabs-nav-animated {
                    width: 180px !important;
                }

                .ant-tabs-tab {
                    background: transparent !important;
                    font-weight: 500;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0;
                    text-align: left;

                }

                .ant-tabs-tab-active.ant-tabs-tab {
                    background: #191C1F !important;
                    border-radius: 3px;
                    color: #fff !important;
                    margin: 0;
                    padding: 10px 24px !important;


                }
                .ant-tabs .ant-tabs-left-content {
                    border-left: none !important;
                }
                .ant-tabs-nav .ant-tabs-tab:first-child {
                    margin-left: 0 !important;
                    text-align: left;
                    margin-top: 10px !important;
                }
            }
            .ant-tabs-nav .ant-tabs-tab {
                    margin-right: 0 !important;
                    padding: 10px 24px !important;
                }
                .ant-tabs .ant-tabs-left-bar {
                    border-left: 0.9px solid #3E3E3E !important;
                }
                .ant-tabs .ant-tabs-left-content {
                    border: 0 !important;
                    padding: 10px 20px !important;
                }
        }
    }
}</style>
