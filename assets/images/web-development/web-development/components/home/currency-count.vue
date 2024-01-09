<template>
    <div>
        <p class="spot-heading fw-5">{{symbletotal?symbletotal:0}}+</p>
        <p class="spot-desc fw-7">{{ $t('home.home11') }}</p>
        <span class="time-heading fw-5">{{ $t('home.home12') }}</span>
    </div>
</template>

<script>
export default {
    name: "currency-count",
    data() {
        return {
            symbletotal: 0
        };
    },
    watch: {
        '$store.state.symbleinfos': function (val) {
            this.symbletotal = val.length;
        },
    },
    mounted() {
        if(this.$store.state.symbleinfos){
            this.symbletotal = this.$store.state.symbleinfos.length;
        }

    },
    methods: {
    },
};
</script>

<style scoped lang="less">
.currency-count {
    position: relative;
    color: #323232;
    margin-top: 50px;

    ul {
        display: flex;
        li {
            margin-right: 100px;

            h1 {
                font-size: 50px;
                font-weight: 600;
                display: flex;

                span {
                    font-size: 30px;
                    margin-top: 40px;
                }
            }

            a {
                font-size: 20px;

                i {
                    color: #c4c4c4;
                }
            }

            p {
                color: #bdbdbd;
                text-align: left;
                font: normal normal medium 18px/30px Poppins;

            }
        }
    }
}
</style>
