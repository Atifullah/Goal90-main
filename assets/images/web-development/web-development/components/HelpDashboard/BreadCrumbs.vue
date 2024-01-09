<template>
    <a-breadcrumb separator=">">
        <a-breadcrumb-item>
            <nuxt-link :to="selfRoute.helpCenter">{{ $t('footer.footer_Financial_Help_Center') }}</nuxt-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <!-- <nuxt-link :to="selfRoute.helpCenter">{{$t('returntxt.rtxt32')}}</nuxt-link> -->
        </a-breadcrumb-item>

        <a-breadcrumb-item v-for="(breadCrumb, breadCrumbIndex) in breadCrumbs " v-bind:key="breadCrumbIndex">
    <nuxt-link :to="breadCrumb.redirectTo" v-if="breadCrumb.redirectTo" v-html="breadCrumb.title"></nuxt-link>
    <span v-else v-html="breadCrumb.title"></span>

        </a-breadcrumb-item>


    </a-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            breadCrumbs: [],
        };
    },

    computed: {
        ...mapGetters('article', ['getSubItems', 'getArticleChildren', 'getCurrentChannel']),
        selfRoute: function () {
            return this.$store.state.route
        },
        subItems: function () {
            return this.getSubItems ? this.getSubItems : []
        },
        channels: function () {
            return this.getArticleChildren
        },
        currentChannel: function () {
            return this.getCurrentChannel
        }
    },
    watch: {
        '$route.params': {
            handler: function () {
                this.manageBreadCrumbs()
            },
            deep: true,
            immediate: true
        },
        channels: {
            handler: function () {
                this.manageBreadCrumbs()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {

        manageBreadCrumbs() {
            const route = this.$route
            const channels = this.channels

            let breadCrumbs = []

            //console.log('route in HelpCenterBreadCrumbs', route);
            const channelId1 = route.query.channelId
            const channelId2 = route.query.subChannel

            const currentArticleSubTitle = route.query.subItemTitle

            //console.log('route in HelpCenterBreadCrumbs subChannelId', channelId1, channelId2)

            //console.log('route in HelpCenterBreadCrumbs subTitle', currentArticleSubTitle)

            let currentChannel = null
            let currentArticle = null
            let currentSubChannel = null

            let redirectTo = this.selfRoute.helpCenterChannelDetail

            const _self = this

            channels.forEach(function (channel, index) {

                const childs = channel.children



                childs.forEach(child => {
                    if (channelId1 == child.id || channelId2 == child.id) {
                        currentChannel = channel
                        currentChannel.is_channel = true
                        currentChannel.title = channel.channelname
                        currentChannel.redirectTo = null

                        breadCrumbs.push(currentChannel)

                        currentSubChannel = child
                        currentSubChannel.is_sub_channel = true
                        currentSubChannel.title = currentSubChannel.channelname
                        currentSubChannel.redirectTo = redirectTo + '/' + _self.currentChannel + '?channelId=' + child.id



                        breadCrumbs.push(currentSubChannel)

                        return
                    }
                });

            })
            //console.log('HelpCenterBreadCrumbs currentChannel', currentChannel)
            const sub_items = this.subItems

            sub_items.forEach(sub_item => {
                //console.log('channelDetail sub_item', sub_item)
                if (sub_item.subtitle == currentArticleSubTitle) {
                    currentArticle = sub_item
                    currentArticle.is_article = true
                    currentArticle.title = sub_item.title
                    currentArticle.redirectTo = null
                    breadCrumbs.push(currentArticle)
                    return
                }

            });



            //console.log('HelpCenterBreadCrumbs breadCrumbs', breadCrumbs)
            this.breadCrumbs = breadCrumbs
                this.$emit('breadcrumbs-updated', breadCrumbs);



        }
    },
    mounted() {

        this.manageBreadCrumbs()
    }
}
</script>

<style lang="scss" scoped></style>