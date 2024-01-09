<template>
    <div class="" v-if="!isSystemMessage">
        <div class="send-messages mb-3">
            <a-row :gutter="16" class="send-row">
                <a-col :lg="24" align="end" class="">
                    <a-card class="send-card">
                        <img width="100" v-if="item.msgcontent.indexOf('https://') > -1" @load="resetscroll" @click="imageShow(item.msgcontent)" :src="item.msgcontent" alt="">
                        <span v-else>{{ getMessage }}</span>
                        <p class="mb-0 date-txt fw-4 send-chat-date"> {{ global_get_local_time(item.createtime).format('YYYY-MM-DD hh:mm a') }} </p>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => { },
        },
        resetscroll: {
            type: Function
        },
        imageShow:{
            type:Function
        }
    },
    computed:{

        getMessage(){
            if(this.item.msgcontent.indexOf('#1#') > -1){
                const array= this.item.msgcontent.split('#1#')
                return array[1];
            }
            else{
                return this.item.msgcontent
            }

        },
        isSystemMessage(){
            if(this.item.msgcontent.indexOf('#1#') > -1){
                 return true;
            }
            else{
                return false
            }

        }
    },
}
</script>
