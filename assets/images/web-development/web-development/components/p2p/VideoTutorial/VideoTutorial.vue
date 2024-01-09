<template>
    <div id="beginners-guide">
        <a-card :bordered="false">
            <p class="mb-0 beginner-guide-heading fw-5">{{$t('videotut.vt1')}}</p>
        </a-card>
        <a-card class="card-tabs my-3" :bordered="false" :title="$t('tableskeys.lss11')">
            <a-tabs default-active-key="2">
                <a-tab-pane key="1" :tab="$t('tabkeys.tab35')">
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('tabkeys.tab36')">

                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('tabkeys.tab37')">
                </a-tab-pane>
                <a-tab-pane key="4" :tab="$t('tabkeys.tab38')">
                </a-tab-pane>
                <a-tab-pane key="5" :tab="$t('tabkeys.tab39')">
                </a-tab-pane>
            </a-tabs>
        </a-card>
        <a-card :bordered="false" class="videos-card">
            <a-row :gutter="16" class="p-3">
                <a-col :lg="8">
                    <img src="/images/video-img.svg" width="100%" />
                </a-col>
                <a-col :lg="10">
                    <p class="english-heading fw-5 mb-1">{{$t('videotut.vt2')}}</p>
                    <p class="mb-0 english-desc">{{$t('videotut.vt3')}}
                    </p>
                    <a-button class="primary-btn fw-5 mt-3">{{$t('videotut.vt4')}}</a-button>
                </a-col>
            </a-row>
            <a-card class="card-tabs my-3" :bordered="false" :title="$t('tableskeys.lss12')">
                <a-tabs default-active-key="2" class="pl-4">
                    <a-tab-pane key="1" :tab="$t('tabkeys.tab40')">
                    </a-tab-pane>
                    <a-tab-pane key="2" :tab="$t('tabkeys.tab41')">

                    </a-tab-pane>
                    <a-tab-pane key="3" :tab="$t('tabkeys.tab42')">
                    </a-tab-pane>
                    <a-tab-pane key="4" :tab="$t('tabkeys.tab43')">
                    </a-tab-pane>
                </a-tabs>
            </a-card>
            <a-row :gutter="16" class="pb-3 px-3">
                <a-col :lg="8">
                    <img src="/images/video-img.svg" width="100%" />
                </a-col>
                <a-col :lg="10" :xxl="10">
                    <p class="english-heading fw-5 mb-1">{{$t('videotut.vt5')}}</p>
                    <p class="mb-0 english-desc">{{$t('videotut.vt6')}}
                    </p>
                    <a-button class="primary-btn fw-5 mt-3">{{$t('videotut.vt7')}}</a-button>
                </a-col>
            </a-row>
            <a-card class="card-tabs my-3" :bordered="false" :title="$t('tableskeys.lss10')">
                <a-tabs default-active-key="2" class="pl-4">
                    <a-tab-pane key="1" :tab="$t('tabkeys.tab44')">
                    </a-tab-pane>
                    <a-tab-pane key="2" :tab="$t('tabkeys.tab45')">

                    </a-tab-pane>

                </a-tabs>
            </a-card>
            <a-row :gutter="16" class="pb-3 px-3">
                <a-col :lg="8">
                    <img src="/images/video-img.svg" width="100%" />
                </a-col>
                <a-col :lg="10" :xxl="12">
                    <p class="english-heading fw-5 mb-1">{{$t('videotut.vt8')}}</p>
                    <p class="mb-0 english-desc">{{$t('videotut.vt9')}}
                    </p>
                    <a-button class="primary-btn fw-5 mt-3">{{$t('videotut.vt7')}}</a-button>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
