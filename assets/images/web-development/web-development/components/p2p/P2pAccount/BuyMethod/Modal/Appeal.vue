<template>
    <div class="have-a-question">
        <a-modal id="cancel-order-question" v-model="appealModel" :footer="false" :title="false" @cancel="close" width="450px">


            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="20">
                    <p class="heading-txt fw-5 mb-0" v-if="showModel2==true">{{$t('modals.mod20')}}</p>
                    <p class="heading-txt fw-5 mb-0" v-else-if="showModel1==true">{{$t('modals.mod21')}}</p>
                    <p class="heading-txt fw-5 mb-0" v-else>{{$t('modals.mod22')}}</p>
                </a-col>
                <a-col :lg="4" align="end"><img src="/images/ud-cross.svg" @click="close" class="pointer"/></a-col>
            </a-row>

            <div v-if="showModel1==true" class="cancelled-modal2">

                <p class="appeal-txt2 fw-5 pt-3">{{$t('modals.mod23')}}</p>
                <a-card class="border-card mb-3">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="3"><img src="/images/image-upload.svg"/></a-col>
                        <a-col :lg="21"><p class="mb-0 tip-desc2 fw-5">{{$t('modals.mod24')}}</p></a-col>
                    </a-row>
                </a-card>
                <a-card class="border-card mb-3">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="3"><img src="/images/appeal1.svg"/></a-col>
                        <a-col :lg="21"><p class="mb-0 tip-desc2 fw-5">{{$t('modals.mod25')}}</p></a-col>
                    </a-row>
                    <a-row class="mt-4">
                    <a-col :lg="24" align="end">
                        <a-button class="cancel-outline-btn fw-5 mr-3" @click="close">{{$t('modals.mod26')}}</a-button><a-button class="primary-btn fw-5" @click="$emit('openSubmitAppeal')">{{$t('modals.mod27')}}</a-button>
                    </a-col>
                </a-row>
                </a-card>

            </div>
            <div class="" v-else-if="showModel2==true">
                <a-row class="pt-4 pb-3">
                    <a-col :lg="24">
                        <p class="question-desc fw-5 mb-0">{{$t('modals.mod28')}}</p>

                    </a-col>
                </a-row>
                <a-row class="py-2">
                    <a-col :lg="24">
                        <a-card class="question-txt-desc text-desc-bg tip-card">
                            <p class="question-heading fw-5 mb-2">{{$t('modals.mod29')}} 1</p>
                            <p class="question-desc fw-5 mb-0">{{$t('modals.mod30')}}</p>
                                <a-button class="outline-btn fw-5 mt-3 contact-btn" @click="goCounterParty">{{$t('modals.mod31')}}</a-button>
                        </a-card>
                    </a-col>
                </a-row>
                <a-row class="py-2">
                    <a-col :lg="24">
                        <a-card class="question-txt-desc text-desc-bg tip-card">
                            <p class="question-heading fw-5 mb-2">{{$t('modals.mod29')}} 2</p>
                            <p class="question-desc fw-5 mb-0">{{$t('modals.mod32')}}</p>
                                <a-button class="outline-btn fw-5 mt-3 contact-btn" @click="appeal">{{$t('modals.mod27')}}</a-button>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <div v-else>
                <a-row class="pt-4 pb-3">
                    <a-col :lg="24">
                        <a-card class="question-txt-desc">
                            <p class="question-heading fw-5 mb-2">{{$t('modals.mod33')}}</p>
                            <p class="fw-5 appeal-desc  mb-0">{{$t('modals.mod34')}}</p>
                        </a-card>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :lg="24">
                        <p class="mb-2 appeal-txt fw-5">{{$t('modals.mod27')}}</p>
                        <p class=" fw-5 appeal-desc ">{{$t('modals.mod35')}}</p>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :lg="24" class="pb-3 pt-4">
                        <a-checkbox class="appeal-txt fw-5" @click="openModel2">
                            {{orderdata.direction==1?$t('modals.mod36'):$t('modals.mod46')}}
                        </a-checkbox>
                    </a-col>
                    <a-col :lg="24">
                        <a-checkbox class="appeal-txt fw-5" @click="openModel2" >
                            {{$t('modals.mod37')}}
                        </a-checkbox>
                    </a-col>
                </a-row>
            </div>


        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        appealModel: {
            type: Boolean
        },
        orderdata: {
            type: Object
        },
        close: {
            type: Function
        },
    },
    data(){
        return{
            showModel1:false,
            showModel2:false
        }
    },
    methods:{
        helpCenter(){
           window.open(this.$store.state.hex_config.zendesknew,'_blank')
           this.close();
        },
        openModel2(){
            this.showModel2=true;
        },
        appeal(){
            this.showModel2=false;
            this.showModel1=true;
        },
        goCounterParty() {
        var userid = this.orderdata.userid == this.$userinfo.uid ? this.orderdata.orderuserid : this.orderdata.userid
        this.$router.push({
            path: '/p2p/counter-party', query: {
            userid: userid,
            advid: this.orderdata.orderid
            }
        })
        },
    }
}
</script>

<style></style>
