<template>
    <div class="feedback">
        <a-row class="px-4" :gutter="16">
            <a-col :lg="24">
                <p class="hidden-feedback fw-5 py-4 mb-0">{{$t('p2p.feedback')}}</p>
            </a-col>
        </a-row>
        <div v-for="(list, key) in feedbacks"  :key="key" class="px-4 ">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="1">
                    <span class="photo" :class="{ 'online': list.online == 1 }"
                        :style="{ 'background-color': global_get_random_color(list.createduserid ? list.createduserid.substring(list.createduserid.length - 1) : 0) }">
                        {{ getname(list.nikename) }}
                    </span>
                </a-col>
                <a-col :lg="23" class="pl-3">
                    <p class="mb-1 feedback-email fw-5">{{ list.nikename }}</p>
                    <p class="mb-0 counter-date fw-5">{{  global_get_local_time(list.createtime).format('HH:mm:ss')}}<span class="ml-2"><a-tag color="green"> {{ list.paytypes.split(',')[0] }}</a-tag></span></p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="pt-3 col-alignment">
                <a-col :lg="1" align="center"><img :src="list.starleve==5?'/images/like-p2p.svg':'/images/dislike-p2p.svg'" /></a-col>
                <a-col :lg="10" class="pl-3">
                    <p class="feedback-desc fw-5 mb-0">{{ list.evaluatecontent?list.evaluatecontent:list.evaluationtag}}</p>
                    </a-col>
            </a-row>
            <a-divider class="feedback-divider"/>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        feedbacks:{
            type: Array
        }
    },
    data() {
        return {
        }
    },
    methods:{
        getname(val) {
            return val ? val.substring(0, 1) : '--'
        },
    }
}
</script>

<style lang="scss" scoped>
.photo {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 0px;
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
}</style>
