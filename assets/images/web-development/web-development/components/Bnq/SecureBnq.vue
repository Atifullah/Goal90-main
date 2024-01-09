<template>
    <div class="secure-bnq mt-10">
        <a-row>
            <a-col :lg="10" :offset="7" align="center">
                <p class="mb-2 text-black main-heading fw-5">{{$t('bnq.secure_bnq')}}</p>
                <p class="bnq-desc mb-0 text-black fw-4">{{$t('bnq.secure_bnq_desc')}}</p>
                    <a-button class="primary-btn buy-now-btn mb-5" @click="scrollup()">{{$t('manage.Buynow')}}</a-button>
            </a-col>
        </a-row>

    </div>
</template>

<script>
export default {
methods:{
    scrollup(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
}
</script>

<style></style>