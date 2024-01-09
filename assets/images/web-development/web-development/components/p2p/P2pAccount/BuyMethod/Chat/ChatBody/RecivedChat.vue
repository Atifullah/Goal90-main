<template>
    <div class="received-messages" v-if="item.msgcontent != ''">

        <a-row :gutter="16" class="recived-row">
            <a-col :lg="4" class="pl-3" v-if="!isSystemMessage[0]">
                <span class="photo" :class="{ 'online': item.online == 1 }" :style="{ 'background-color': `${color}` }">
                    {{ getname }}
                </span>
            </a-col>
            <a-col :lg="2" v-else></a-col>
            <a-col :lg="20" class="pl-1 recieve-right-col">
                <a-card class="received-card fw-5" :style="getStyle">
                    <img width="100" v-if="item.msgcontent.indexOf('https://') > -1" @load="resetscroll"
                        @click="imageShow(item.msgcontent)" :src="item.msgcontent" alt="">
                    <span v-else>{{ getMessage }} </span>
                    <p class="mb-0 date-txt fw-4 received-date1">{{ global_get_local_time(item.createtime).format('YYYY-MM-DD hh:mm a') }}
                    </p>
                </a-card>
            </a-col>

        </a-row>

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
        nickname: {
            type: String
        },
        color: {
            type: String
        },
        imageShow:{
            type:Function
        }
    },
    computed: {
        getname() {
            return this.nickname ? this.nickname.substring(0, 1) : '--'
        },
        getStyle() {
            if (this.item.msgcontent?.indexOf('#1#') > -1) {
                const style = {
                    backgroundColor: '#FFF7D9 !important'
                }
                return style
            }
            return {}
        },
        getMessage() {
            if (this.item.msgcontent.indexOf('#1#') > -1) {
                const array = this.item.msgcontent.split('#1#')
                return array[1];
            }
            else {
                return this.item.msgcontent
            }

        },
        isSystemMessage() {
            let arr = [false, false];
            if (this.item.msgcontent.indexOf('#1#') > -1) {
                arr[0] = true;
            }
            else {
                arr[0] = false
            }
            return arr
        }
    },

}
</script>
<style lang="scss" scoped>
.photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    width: 36px;
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 10px;
    color: #ffffff;
    position: relative;
}

.photo:after {
    content: '';
    display: inline-block;
    width: 8px;
    position: absolute;
    height: 8px;
    border-radius: 50%;
    background-color: #DDDDDD;
    background-clip: content-box;
    border: 2px solid #ffffff;
    bottom: 0;
    right: 0;
}

.photo.online:after {
    background-color: #0ED12A;
}
</style>
