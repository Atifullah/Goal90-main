<template>
    <div class="sign-up" v-if="!$userinfo.uid">
        <p class="title" :style="displayError">
            <span class="normal-tip_error right" v-if="!$v.keyword.required">{{$t("home.accountEmpty")}}</span>
            <span class="normal-tip_error right" v-if="!$v.keyword.email">{{$t("home.accountNotEmail")}}</span>
        </p>
        <input type="text" :placeholder="$t('home.signUpPlaceholderText')" v-focus v-model.trim="keyword">
        <nuxt-link event="" @click.native="signIn" :to="{name:'register', params:{k:keyword}}">
            <button id="asdf" class="register">{{$t('home.signUpText')}}</button>
        </nuxt-link>
    </div>
</template>

<script>
    import {required, email} from 'vuelidate/lib/validators';

    export default {
        name: "start-trading",

        validations: {
            keyword: {
                required,
                email
            }
        },

        data () {
            return {
                lang: this.$store.state.hex_lang.locale,
                keyword: '',
                displayError: {
                    display: 'none',
                }
            }
        },

        mounted () {

        },

        methods: {
            signIn () {
                if (!this.$v.keyword.$invalid) {
                    let k = this.$v.keyword.$model;
                    this.$router.push({
                        name: 'register',
                        params: {k}
                    });
                }else{
                    this.$router.push({
                        name: 'register'
                    });
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .sign-up {
        position: relative;
        z-index: 5;
        width: 734px;
        height: 80px;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border: 2px solid #70707099;;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        display: flex;
        align-items: center;
        input {
            border-radius: 5px;
            width: 240px;
            height: 65px;
            flex: 1;
            font-size: 18px;
            padding-left: 20px;
            text-align: left;

        }
         ::placeholder{
         font: normal normal medium 20px/32px Poppins ;
         letter-spacing: 0px ;
         color: #6F6F6F;
        opacity: 1;
         }
        .register {
            width: 260px;
            height: 80px;
            color: #fff;
            font-size: 24px;
            display: inline-block;
            cursor: pointer;
            background: #FF8000;
            border-radius: 5px;
            margin-right: -2px;
            &:hover {
                background: #fd9c3b;
            }
        }

        .title {
            position: absolute;
            top: -25px;

            .normal-tip_error{
                font-size: 12px;
                color: #CD4559 !important;
            }
        }
    }
    @media (min-width: 1200px) and (max-width: 1919px) {
        .sign-up{
            width: 634px;

        }
        .sign-up input{
            width: 130px;
        }
    }
</style>
