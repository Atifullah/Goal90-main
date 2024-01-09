<template>
    <div class="first-step">
        <a-tabs default-active-key="1">
            <a-tab-pane key="1">
                <span slot="tab">
                    <img :src="tab=='1'?'/images/email-icon-active.svg':'/images/email-icon.svg'" class="mr-1"/>
                    {{$t('person.pd14')}}
                </span>
                <a-row class="mt-2 mb-4">
                    <a-col :lg="12" :offset="6">
                        <a-input :placeholder="$t('placeholders.plh48')"/>
                        <a-button class="primary-btn fw-5 mt-4" block>{{$t('person.pm26')}}</a-button>
                    </a-col>
                </a-row>
            </a-tab-pane>
            <a-tab-pane key="2">
                <span slot="tab">
                    <img :src="tab=='2'?'/images/phone-icon-active.svg':'/images/phone-icon.svg'" class="mr-1"/>
                    {{$t('person.pd15')}} <img src="/images/round-img.svg"/>
                </span>
                <a-row class="mt-2 mb-5 pb-5">
                    <a-col :lg="12" :offset="6">
                        <vue-tel-input  mode="auto" :validCharactersOnly="true"  :dropdownOptions = "{showFlags:true, showDialCodeInList:true, showSearchBox:true,showDialCodeInSelection:true}"></vue-tel-input>
                    </a-col>
                </a-row>
            </a-tab-pane>
            <a-tab-pane key="3">
                <span slot="tab">
                    <img :src="tab=='3'?'/images/bit-id-active.svg':'/images/bit-id.svg'" class="mr-1"/>
                    {{$t('extra.extra12')}}<img src="/images/round-img.svg"/>
                </span>
                <p class="uid-txt fw-5">UID:12345643234</p>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tab: 1,
        }
    }

}
</script>

<style>

</style>
