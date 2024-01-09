<template>
    <div class="user-agreement my-4">

        <div>
            <a-card>
                <h1 class="mb-0 fw-7 user-heading">{{ subItem.title }}</h1>
                <!-- <p class="mb-0 last-update">{{ subItem.createtime }}</p> -->

            </a-card>
            <a-card :bordered="false" class="mt-3">
                <div :bordered="false" class="mt-3">
                    <div class="user-desc fw-5 mb-4 pb-3" v-html="subItem.remark"></div>
                </div>
            </a-card>

        </div>



    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { webFooterArticle } from '~/plugins/constants'
export default {
    props: {
        subtitle: {
            type: String,
            required: true,
        },
    },
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
            this.fetchChannelInfo({ channelID: webFooterArticle, subTitle: termofservicess })

        }
    },
    watch: {
        // Watch for changes in the subtitle prop and call fetchData method
        subtitle: {
            handler(newSubtitle) {
                this.fetchData(newSubtitle);
            },
            immediate: true, // Trigger the handler immediately when the component is mounted
        },
    },
    mounted() {
        // Call fetchData method with the subtitle from the URL query
        const subtitle = this.$route.query.subtitle;
        this.fetchData(subtitle);
    },
}
</script>

<style></style>
