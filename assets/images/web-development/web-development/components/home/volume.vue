<template>
    <div  >
        <p class="spot-heading fw-5">{{ $store.getters.get_client_exchange_rate_name.mark }} {{total}}</p>
        <p class="spot-desc fw-7">{{title}}
            <a-popover :title="false" trigger="hover" overlay-class-name="home-popover" placement="top">
                <template slot="content">
                    <p class="hours-list fw-7 mb-0 pt-3">{{$t('home.home20')}}</p>
                    <a-divider class="mt-3 mb-1 home-popover-divider"/>

                    <div v-for="(tradeData, index) in marketdata" :key="index" class="volume-list">
                    <p  class="mb-0 px-3 spot-list fw-5"
                            @click="goDeal(tradeData.symble)">
                            <span class="symble">{{ getSymble(tradeData.symble).from }} </span>
                            <span class="btc-valu">{{ global_get_tofixed( tradeData.v,
                            global_get_decimal(tradeData.symble).a) }}</span>  </p>
                             <a-divider class="my-0 home-popover-divider" v-if="index!=marketdata.length-1"/>
                 </div>
                </template>
                <img src="/images/spot-icon.svg" height="12px" class="pointer"/>
            </a-popover>
        </p>
        <span class="time-heading fw-5">{{$t('home.home21')}}</span>
    </div>
</template>

<script>
export default {
    name: "volume",
    props: {
        marketdata: [],
        title: {
            type: String,
            default: "Spot"
        },
        getClientExchangeRate: {
            type: Function
        },
        getSymble: {
            type: Function
        }
    },
    data() {
        return {
            loading: true,
            total: 0.00,
        };
    },
    mounted() {
    },
    watch: {
        'marketdata': function (val) {
            if (val.length > 0) {
                this.loading = false;
                this.calculate_total();
            }
        }
    },
    methods: {
        calculate_total() {
            let total = 0;
            for (let i = 0; i < this.marketdata.length; i++) {
                const tradeData = this.marketdata[i];
                const a = this.getClientExchangeRate(tradeData);
                const b = this.global_get_tofixed(tradeData.v, this.global_get_decimal(tradeData.symble).a);
                total = total + a * b;
                total = total + 1 * b;
            }
             this.total=this.numFormatter(total)
            // total = total / 1000000;
            // total = total.toFixed(2);
            // this.total = total;
        },
        numFormatter(num) {
            if (num > 999 && num < 1000000) {
                return (num / 1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million
            } else if (num > 1000000 && num < 10000000) {
                return (num / 1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million
            } else if (num > 10000000 && num < 1000000000) {
                return (num / 10000000).toFixed(2) + 'B'; // convert to B for number from > 1 billion
            }
            else if (num > 1000000000) {
                return (num / 1000000000).toFixed(2) + 'T'; // convert to B for number from > 1 trillion
            } else if (num < 900) {
                return num; // if value < 1000, nothing to do
            }
        }
    }
};
</script>

<style scoped lang="less">
.coin-list-trades :deep(.coin-list_content .updown.i_down) {
    color: #ae313c;
}

.allbtc li {
    font: normal normal medium 20px/30px Poppins;
    letter-spacing: 0px;
    opacity: 1;
    color: #FF8000;
    text-align: left;
    white-space: nowrap;
    padding-top: 3px;

}

.symble {
    display: inline-block;
}
.updown.i_down:after {
    background: url("../../static/images/i_down.svg") no-repeat;
    content: "";
    display: inline-block;
    width: 9px;
    height: 11px;
    background-size: cover;
    margin-left: 5px;
}

.btc-value {
    position: relative;
    text-align: left;
    left: 3px;
    bottom: 20px;
    padding: 40px;
}

.updown.i_up {
    color: rgba(3, 191, 123, 1);
}

.updown.i_up:after {
    color: rgba(3, 191, 123, 1);
    background: url("../../static/images/i_up.svg") no-repeat;
    content: "";
    display: inline-block;
    width: 9px;
    height: 11px;
    background-size: cover;
    margin-left: 5px;
}

hr {
    border: 1px solid #707070;
    opacity: 0.4;
    position: relative;
    bottom: -15px;

}

.paragrapgh-since {
    position: relative;
    bottom: -20px;
    color: #FF8000;


}

.dropdown li {
    display: block;
}

li> {
    display: block;
}

li:hover> {
    cursor: pointer;
}

ul li ul> {
    visibility: hidden;
    position: absolute;
    margin-top: 1rem;
    left: 0px;
    top: -150px;
    display: none;
    background: #ffffff 0% 0% no-repeat padding-box;
    text-align: left;
    border: 1px solid #ffffff;
    opacity: 1;
    box-shadow: 0px 10px 20px #00000017;
    z-index: 1;
    font-size: 15px;

}

ul li:hover>ul,
ul li ul:hover> {
    visibility: visible;
    opacity: 1;
    display: block;
    padding-left: 15px;
    padding-right: 30px;
    z-index: 5;
    padding: 10px;
    letter-spacing: 0px;
    width: 240px;
    height: 210px;


}

.dropdown-ft {
    overflow: hidden;

}

.future {
    position: relative;

    li> {
        display: block;
        transition-duration: 0.5s;
    }

    li:hover> {
        cursor: pointer;
    }

    ul li ul> {
        visibility: hidden;
        position: absolute;
        margin-top: 1rem;
        left: 30px;
        top: -150px;
        display: none;
        background: #ffffff 0% 0% no-repeat padding-box;

        text-align: left;
        border: 1px solid #ffffff;
        opacity: 1;
        box-shadow: 0px 10px 20px #00000017;
        z-index: 1;
        font-size: 15px;

    }

    ul li:hover>ul,
    ul li ul:hover> {
        visibility: visible;
        opacity: 1;
        display: block;
        padding-left: 15px;
        padding-right: 30px;
        z-index: 5;
        padding-top: 15px;
        letter-spacing: 0px;
        width: 220px;
        height: 210px;


    }

}



.volume {
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

@media (min-width: 1200px) and (max-width: 1919px) {}
</style>
