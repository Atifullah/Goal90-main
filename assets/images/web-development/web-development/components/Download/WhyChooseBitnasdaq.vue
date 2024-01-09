<template>
    <div class="why-choose-bitnasdaq">
        <p class="text-center choose-bitnasdaq-txt text-black fw-5">Why Choose Bitnasdaq?</p>
        <a-row>
            <a-col :xs="{span: 20, offset: 2 }" :sm="{span: 16, offset: 4 }" :md="{span: 14, offset: 5 }" :lg="{span: 22, offset: 1 }" :xl="{span: 16, offset: 4 }" :xxl="{span: 14, offset: 5 }">
                <a-row>
                    <a-col :md="24" :lg="8" align="center" v-for="(list, key) in getBitnasdaqList" :key="key">
                        <a-card :bordered="false" class="list-card">
                        <img :src="list.img" height="100px"/>
                        <p class="list-title fw-5 text-black">{{ list.title }}</p>
                        <p class="list-desc text-black mb-0">{{ list.desc }}</p>
                    </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

    </div>
</template>

<script>
export default {
    data() {
        return {
            getBitnasdaqList: [
                {
                    img: '/images/best-security.svg',
                    title: 'The Best Security',
                    desc: 'Cutting edge security. Keeping you assets safe'
                },
                {
                    img: '/images/fastest-trades.svg',
                    title: 'The Fastest Trades',
                    desc: 'Our advanced matchmaking engine ensures the fastest trading experience possible'
                },
                {
                    img: '/images/lowest-fees.svg',
                    title: 'The Lowest Fees',
                    desc: 'Keep more of your money with our low transaction fees and regular discounts'
                }
            ]
        }
    }
}
</script>

<style></style>