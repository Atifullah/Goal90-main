<template>
    <div class="have-a-question">
        <a-modal id="cancel-order-question" v-model="cancelOrderModel" :footer="false" :title="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="20">
                    <p class="heading-txt fw-5 mb-0">{{$t('modals.mod38')}}</p>
                </a-col>
                <a-col :lg="4" align="end" class="pointer"><img src="/images/ud-cross.svg" @click="close"/></a-col>
            </a-row>
            <a-row class="pt-4 pb-3">
                <a-col :lg="24">
                    <a-card class="question-txt-desc tip-card">
                        <a-col :lg="1">
                            <img src="/images/orange-cancel.svg" class="mb-1" />
                        </a-col>
                        <a-col :lg="23" class="">
                            <p class="question-heading fw-5">{{$t('modals.mod39')}}:</p>
                            <p class="question-desc fw-5 mb-2">{{$t('modals.mod40')}}</p>
                            <p class="question-desc fw-5 mb-2">{{$t('modals.mod41')}}</p>
                            <p class="question-desc fw-5 mb-2">{{$t('modals.mod42')}}</p>

                        </a-col>
                    </a-card>
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="24">
                    <p class="mb-2 appeal-txt">{{$t('modals.mod43')}}</p>
                    <p class="fw-5 appeal-desc">{{$t('modals.mod44')}}</p>
                </a-col>
            </a-row>
            <a-row>
                <a-radio-group v-model="selected" > 
                <a-col :lg="24" class="pb-3 pt-4">
                    <a-radio class="fw-5 appeal-desc" value="0">{{ reasons[0].value }}</a-radio>
                </a-col>
                <a-col :lg="24">
                    <a-row :gutter="16">
                        <a-col :lg="1">
                            <a-radio value="1">
                            </a-radio>
                        </a-col>
                        <a-col :lg="23">
                            <p class="fw-5 appeal-desc pl-2">{{ reasons[1].value }}</p>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="24">
                    <a-radio  class="fw-5 appeal-desc" value="2">{{ reasons[2].value }}</a-radio>
                 
                </a-col>
            </a-radio-group>
                <a-col :lg="24" class="mt-4 mb-3" v-if="this.selected==2">
                    <a-textarea placeholder="Enter Detail" :rows="1" style="min-height: 93px !important;" v-model="customReason"/>
                </a-col>

           
            </a-row>
            <a-row class="py-3" >
                <a-col :lg="24" align="end">
                    <a-button class="cancel-outline-btn px-4 mr-2" @click="close">{{$t('modals.mod26')}}</a-button>
                    <a-button class="primary-btn fw-5 px-4" @click="Confirm" :loading="loading" :class="buttonCheck?'primary-btn':'disabled-btn'">{{$t('modals.mod45')}}</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        cancelOrderModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
        confirmCancel:{
            type: Function
        },
        loading:{
            type: Boolean
        }
    },
    computed:{
buttonCheck(){
    if(this.selected!=''){
        return true ;
    }
    else return false;
}
    },
    data(){
        return{
            selected:'',
            reasons:[
                {
                    id:1,
                    value:this.$t('returntxt.rtxt41')
                },
                {
                    id:2,
                    value:this.$t('returntxt.rtxt42')
                },
                {
                    id:3,
                    value:this.$t('returntxt.rtxt37')
                }
            ],
            customReason:''
        }
    },
    methods:{
        ShowPopup(deletedata) {
            this.deleteData = deletedata;
        },
        Confirm(){
            let reason='';
            for(let i=0; i<3; i++){
                if(this.selected>=0){
                    reason=this.reasons[this.selected].value;
                }

            }
            if(this.selected==2){
                reason=this.customReason
            }
            this.confirmCancel(reason)
        },
        checkBoxChange(val){
            for(let i=0; i<3; i++){
                if(i==val){
                    this.checkBoxes[i]=true;
                }
                else{
                    this.checkBoxes[i]=false;
                }
            }
        }
    }
}
</script>

<style></style>
