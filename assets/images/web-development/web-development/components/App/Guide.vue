<template>
    <div id="big-guide">
        <a-row :gutter="16">
            <a-col :lg="4" class="mt-3">
                <a-card class="guide-tabs-card">
                    <a-tabs default-active-key="1" @change="callback" class="guide-tabs">
                        <a-tab-pane key="1" :tab="$t('tabkeys.tab28')">
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="P2P">
                        </a-tab-pane>
                    </a-tabs>
                </a-card>
            </a-col>
            <a-col :lg="10" class="mt-3">
                <a-card class="guide-card">
                    <p class="express-title">{{$t('appguide.ag1')}}</p>
                    <p class="express-desc mb-3"><span class="bold-txt">{{$t('appguide.ag2')}}</span>{{$t('appguide.ag3')}}</p>
                    <p class="express-desc mb-2"><span class="bold-txt">{{$t('appguide.ag2')}}</span> {{$t('appguide.ag4')}}</p>
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="8">
                            <p class="step-txt mb-0">{{$t('appguide.ag5')}}</p>
                        </a-col>
                        <a-col :lg="16" align="end">
                            <a-button class="cancel-outline-btn fw-5 common-btn mr-1">{{$t('appguide.ag6')}}</a-button>
                            <a-button class="primary-btn common-btn">{{$t('appguide.ag7')}}</a-button>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    methods: {
        callback(key) {
        },
    },
}
</script>

<style lang="scss">
#big-guide {
    .express-title {
        font-size: 20px;
        color: #081131;
        font-weight: 700;
    }

    .guide-tabs-card {
        border-radius: 8px;

        .ant-card-body {
            padding: 15px !important;

            .guide-tabs {
                .ant-tabs-nav-wrap {
                    padding: 0 !important;
                }

                .ant-tabs-nav.ant-tabs-nav-animated {
                    margin-bottom: 0px !important;
                    background: transparent;
                }

                .ant-tabs-bar.ant-tabs-top-bar {
                    border-bottom: none !important;
                }

                .ant-tabs-nav .ant-tabs-tab {
                    background: transparent;
                    margin-left: 0 !important;
                }

                .ant-tabs-nav .ant-tabs-tab:first-child {
                    padding-left: 0 !important;

                }
            }
        }
    }

    .guide-card {
        border-radius: 8px;

        .ant-card-body {
            padding: 20px !important;

        }
    }

    .common-btn {
        height: 38px !important;
    }

    .express-desc {
        font-size: 14px;
        font-weight: 400;
        color: #081131;

        .bold-txt {
            font-size: 16px;
            font-weight: 600;
        }


    }

    .step-txt {
        font-size: 12px;
        font-weight: 500;
        color: #081131;
    }
}
</style>
