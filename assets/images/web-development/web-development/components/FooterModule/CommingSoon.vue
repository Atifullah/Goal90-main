<template>
    <div id="commingsoon">
    <div class="comming-soon-page">
        <div class="main-content">
            <a-row class="col-alignment1">
                <a-col :lg="12">
                    <p class="heading mb-0 ">Coming Soon...</p>
                    <p class="desc">We are on the verge of an exciting launch! Stay tuned for our upcoming release.</p>
                    <SocialLinks customClass="justify-start" />
                </a-col>
                <a-col :lg="6">
                    <img src="/images/comin-soon-icon.png" alt="">
                </a-col>
            </a-row>
        </div>
    </div>
    </div>
</template>
<script>
import SocialLinks from "../App/SocialLinks.vue";
export default {
    components: {
        SocialLinks,
    },
    data() {
        return {
            // text: ''
        }
    },

}
</script>
<style lang='scss' >
#commingsoon{
    .comming-soon-page {
    background: url('/images/coming-soon-bg.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: grid;
    align-items: center;

    img {
        width: 100%;
    }
}

.col-alignment1 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.heading {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.9rem;
    color: #081131;
}

.desc {
    color: #081131;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.8125rem;
}

.justify-start {
    justify-content: flex-start !important;
}
}
</style>
