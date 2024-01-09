<template>
    <div class="chat-body py-3 px-3">
        <a-modal v-model="imageModalOptions.imageModal"     :footer="null">
      <img :src="imageModalOptions.imageSrc" alt="Modal Image" style="width: 100%" />
    </a-modal>


        <a-card class="chat-white-bg" :bordered="false">

            <div class="text-img text-center">
            </div>
            <div id="scrollDiv" class="scroll_div" @scroll="onScroll">
                <a-row v-if="loading" class="text-center py-3"><a-icon type="sync" spin /></a-row>
                <a-row  v-for="(item, index) in chatlist" :key="index">
                    <a-col :span="24">
                        <SystemChat v-if="item.msgcontent.indexOf('#1#') > -1" :item="item" />
                        <RecivedChat v-else-if="item.fromuserid != $userinfo.uid" :item="item" :resetscroll="resetscroll" :nickname="nickname" :color="color" :imageShow="imageModalShow"/>
                        <SendChat v-else :item="item" :resetscroll="resetscroll" :imageShow="imageModalShow"/>
                    </a-col>
                </a-row>
            </div>
        </a-card>
    </div>
</template>

<script>
import SendChat from './SendChat.vue'
import RecivedChat from './RecivedChat.vue'
import SystemChat from './SystemChat.vue'
export default {
    components: {
        SendChat,
        RecivedChat,
        SystemChat
    },
    props:{
        chatlist:{
            type:Array
        },
        loading:{
            type: Boolean
        },
        gethistory:{
            type: Function
        },
        hasNext:{
            type: Boolean
        },
        nickname:{
            type: String
        },
        color:{
            type: String
        }
    },
    data() {
        return {
            getMessage: [
                {
                    sendMessage: 'ok thats great',
                    date: '11 May 22, 04:44 pm',
                    recivedMessage: 'ok thats great ',
                },
                {
                    sendMessage: 'ok thats great',
                    date: '11 May 22, 04:44 pm',
                    recivedMessage: 'ok thats great',
                },
                {
                    sendMessage: 'ok thats great',
                    date: '11 May 22, 04:44 pm',
                    recivedMessage: 'ok thats great',
                },
                {
                    sendMessage: 'ok thats great',
                    date: '11 May 22, 04:44 pm',
                    recivedMessage: 'ok thats great',
                },
                {
                    sendMessage: 'ok thats great',
                    date: '11 May 22, 04:44 pm',
                    recivedMessage: 'ok thats great',
                },
                {
                    sendMessage: 'ok thats great',
                    date: '11 May 22, 04:44 pm',
                    recivedMessage: 'ok thats great',
                },
            ],
            position:0,
            imageModalOptions:{
            imageModal:false,
            imageSrc:'',
            }
        }
    },
    methods:{

        imageModalShow(val){
this.imageModalOptions.imageSrc=val;
this.imageModalOptions.imageModal=true;
        },


        resetscroll(update) {
        if(update){
            var objDiv = document.getElementById("scrollDiv");
            objDiv.scrollTop =objDiv.offsetHeight;
            return
        }
        var objDiv = document.getElementById("scrollDiv");
        objDiv.scrollTop =objDiv.scrollHeight;
      },
      onScroll(e){
        //
        const { scrollTop, offsetHeight, scrollHeight } = e.target
        if ((scrollTop + offsetHeight) >= scrollHeight) {
           this.position=scrollTop;
        }
        if (scrollTop == 0) {
            if(this.hasNext){
                this.gethistory(1);
            }

        }
      }
    },
}
</script>

<style>

</style>
