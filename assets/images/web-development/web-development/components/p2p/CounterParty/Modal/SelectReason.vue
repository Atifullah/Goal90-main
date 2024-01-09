<template>
    <div class="report">
        <a-modal id="reason-modal" v-model="reasonModal" width="450px" :footer="false" :title="false" @cancel="close">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="12">
                    <p class="reason-heading fw-5 mb-0">{{$t('chat.chat17')}}</p>
                </a-col>
                <a-col :lg="12" align="end"><img src="/images/ud-cross.svg" @click="close" class="pointer"/></a-col>
            </a-row>
            <a-row :gutter="16" class="pt-4">
                <a-col :lg="24" align="center">
                    <img src="/images/reason-icon.svg" />
                </a-col>
                <a-col :lg="24" class="py-3">
                    <a-card class="orange-bg" :bordered="false">
                        <p class="mb-0 reason-note fw-5"><img src="/images/orange-circel-up.svg" class="mr-1"/> {{$t('chat.chat13')}}</p>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="24">
                    <a-checkbox class="mb-2" v-model="checkBoxes[0]" @click="checkBoxChange(0)">{{ reasons[0].value }}
                    </a-checkbox><br/>
                    <a-checkbox class="mb-2" v-model="checkBoxes[1]" @click="checkBoxChange(1)">{{ reasons[1].value }}</a-checkbox><br/>
                    <a-checkbox class="mb-2" v-model="checkBoxes[2]" @click="checkBoxChange(2)">{{ reasons[2].value }}</a-checkbox><br/>
                    <a-checkbox class="mb-2" v-model="checkBoxes[3]" @click="checkBoxChange(3)">{{ reasons[3].value }}</a-checkbox><br/>
                    <a-checkbox class="mb-2" v-model="checkBoxes[4]" @click="checkBoxChange(4)">{{ reasons[4].value }}</a-checkbox><br/>

                </a-col>
                <a-col :lg="24" class="pt-3" v-show="checkBoxes[4]">
                    <a-textarea v-model="reason" @change="onReasonInput" class="reason-textbox" :placeholder="$t('placeholders.plh24')" :rows="4" />
                    <p v-show="noReason" style="font-size:14px; color:red">{{$t('chat.chat15')}}</p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="pt-4">
                <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="close">{{$t('chat.chat14')}}</a-button></a-col>
                <a-col :lg="12"><a-button class="fw-5" :class="notSelected?'primary-btn':'disabled-btn'" :loading="loading" block @click="Confirm">{{$t('chat.chat16')}}</a-button></a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    props: {
        reasonModal: {
            type: Boolean
        },
        loading: {
            type: Boolean
        },
        close: {
            type: Function
        },
        block: {
            type: Function
        },
    },
    computed:{
        notSelected(){
            for(let i=0; i<5; i++){
                if(this.checkBoxes[i]==true){
                    return true;
                }
            }
            return false;
        }
    },
    data(){
        return{
            deleteData:{},
            checkBoxes:[false,false,false,false,false],
            reason:'',
            noReason:false,
            reasons:[
                {
                    id:1,
                    value:this.$t('returntxt.rtxt33')
                },
                {
                    id:2,
                    value:this.$t('returntxt.rtxt34')
                },
                {
                    id:3,
                    value:this.$t('returntxt.rtxt35')
                },
                {
                    id:4,
                    value:this.$t('returntxt.rtxt36')
                },
                {
                    id:5,
                    value:this.$t('returntxt.rtxt37')
                }
            ]
        }
    },
    methods:{
        onReasonInput(){
            if(this.reason!=''){
                this.noReason=false;
            }
            else{
                this.noReason=true;
            }
        },
        Confirm(){
            let reason='';
            if(this.checkBoxes[4]==true){
                if(this.reason==''){
                    this.noReason=true;
                    return;
                }
                reason=this.reason;
            }
            else{
                for(let i=0; i<5; i++){
                    if(this.checkBoxes[i]==true){
                        reason=this.reasons[i].value;
                    }

                }
            }
            this.block(reason);
        },
        checkBoxChange(val){
            for(let i=0; i<5; i++){
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