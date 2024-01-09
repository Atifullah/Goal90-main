<template>
    <div class="user-agreement my-4">

        <div >
            <a-card>
                <p class="mb-0 fw-7 user-heading">{{ subItem.title }}</p>
                <p class="mb-0 last-update fw-5">{{ subItem.createtime }}</p>

            </a-card>
            <a-card :bordered="false" class="mt-3">
                <div :bordered="false" class="mt-3" > <p class="user-desc fw-5 mb-4 pb-3" v-html="subItem.remark"></p></div>         
            </a-card>

        </div>



    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { webFooterArticle,privacysubtitle } from '~/plugins/constants'
export default {
    computed: {
        ...mapGetters("article", ["getSubItem", "getSubItems"]),
        subItem() {
            return this.getSubItem;

        },
        subItems() {
            return this.getSubItems;
        },

    },
    methods: {
        ...mapActions('article', ['fetchChannelInfo']),


        fetchData() {
            this.fetchChannelInfo({ channelID: webFooterArticle, subTitle: privacysubtitle })

        }
    },
    mounted() {
        //console.log("hiiiii")
        this.fetchData()

    }
}
</script>

<style></style>
