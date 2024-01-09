<template>
    <div class="error-page">
        <div class="error-bg">
            <a-row class="pl-5">
                <a-col :lg="14" :offset="5">
                    <p class="error-heading mb-2 pt-4 mt-4">{{$t('error.err1')}}</p>
                    <p class="mb-2 page-not-found">{{$t('error.err2')}}</p>
                    <p class="error-desc pt-1">{{$t('error.err3')}}</p>
                        <a-button class="primary-btn fw-5 mt-5 px-4" @click="$router.go(-1)">
                           <img src="/images/back-error-icon.svg" class="mr-2"/>{{$t('error.err4')}}
                        </a-button>
                </a-col>
            </a-row>
        </div>
    </div>


</template>
<script>
export default {
    name: 'error',
    data() {
        return {
            // text: ''
        }
    },
    created() {
        if (process.client) {
            if (sessionStorage.getItem('isMaintain')) {
                if (this.$store.state.hex_lang.locale === 'zh_cn') {
                    this.text = JSON.parse(sessionStorage.getItem('isMaintain')).zh_cn
                } else {
                    this.text = JSON.parse(sessionStorage.getItem('isMaintain')).en_us
                }
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.error-bg {
    background: url('/images/error-bg.png');
    padding: 213px 0 312px 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.error-heading {
    font-weight: 700;
    font-size: 40px;
    line-height: 47px;
    color: #344054;
}

.page-not-found {
    font-weight: 500;
    font-size: 30px;
    line-height: 38px;
    color: #344054;
}

.error-desc {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    color: #4B4B4B;
    max-width: 313px;
    width: 100%;
}
</style>
