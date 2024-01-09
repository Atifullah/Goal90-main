<template>
    <div class="input-number-container">
        <div class="input-number ipt_hover">
            <div class="before fw-5" v-if="before">{{ before }}</div>

            <div class="input-container">
                <input type="number" ref="inputRef" :min="min" :max="max" :step="step" v-model="currentValue"
                    @keydown.up.prevent="increment" @keydown.down.prevent="decrement" @mousewheel.prevent @focus="showFocus"
                    :disabled="disabled" :placeholder="placeholder" @input="updateInput" @keydown="keydown($event)"
                    @change="change($event)" @keyup="keyup($event)" />
                <!--  -->
            </div>

            <div class="after fw-5">
                <template v-if="hasArrow">
                    <!-- right:${after ? '45px' : '5px'} -->
                    <span class="increment-button" @mouseup="setincrement(false)" @mousedown="setincrement(true)"
                        @click="increment"></span>
                    <span class="decrement-button" @mouseup="setdecrement(false)" @mousedown="setdecrement(true)"
                        @click="decrement"></span>
                </template>


                <span v-if="after" class="ml-2">
                    {{ after }}
                </span>
            </div>

        </div>
    </div>
</template>
<script>
import np from 'number-precision'

export default {
    name: "AppNumber",
    props: {
        modelValue: {
            type: [Number, String],
        },
        fix: { //after decimal
            default: 4
        },
        disabled: Boolean,
        max: {
            type: Number | String,
            default: Infinity
        },
        min: {
            type: [Number, String],
            default: 0
        },
        num: {
            required: true
        },
        hasArrow: {
            type: Boolean,
            default: false
        },
        after: {
            type: String,
            default: null
        },
        before: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        }
    },
    model: {
        prop: 'modelValue',
        event: 'updateValue'
    },
    emits: ['change', 'keyup', 'keydown'],
    watch: {
        num(val) {
            this.currentValue = val
        }
    },
    computed: {
        step() {
            const numary = this.num.toString().split(".")
            const count = numary.length > 1 ? numary[1].length : 0
            const fix = parseFloat(0).toFixed(count)
            return fix.replace(/.$/, "1")
        },
        getCurrentValue: function () {
            const val = this.currentValue
            if (!Number(val)) {
                return 0
            }
            return val
        }
    },
    data() {
        return {
            currentValue: this.num,
            decrementDisabled: false,
            incrementDisabled: false,
            inputDisabled: false,
            incrementtime: '',
            decrementtime: '',
            time1: '',
            time2: ''
        }
    },
    mounted() {
        document.addEventListener('click', () => {
            clearTimeout(this.time1)
            clearTimeout(this.time2)
            clearInterval(this.incrementtime)
            clearInterval(this.decrementtime)
        })
    },
    beforeDestroy() {
        clearInterval(this.incrementtime)
        clearInterval(this.decrementtime)
    },
    methods: {
        updateInput(e) {
            let num = e.target.value
            if (num === '' || isNaN(Number(num))) {
                e.target.value = ''
                this.$emit('update:num', '')
                return
            }
            let newnumAry = num.toString().split('.')
            if (num === '0') {
                this.$emit('update:num', num)
                return
            }
            /*计算保留几位小数*/
            let fix = -1
            if (typeof this.fix == 'number') {
                fix = this.fix
            } else {
                const newnum = parseFloat(num)
                const newval = 1 / newnum
                if (newval >= 500) {
                    fix = 8
                } else if (newval >= 100) {
                    fix = 6
                } else if (newval >= 0) {
                    fix = 4
                }
            }

            /*默认保留6位*/
            if (fix < 0) {
                fix = 8
            }
            let newnumAryStr
            /*如果是小数保留小数后几位*/
            if (newnumAry.length === 2) {
                const _n = newnumAry[1].substring(0, fix)
                newnumAry[1] = _n
                newnumAryStr = newnumAry.join('.')
            } else {
                //整数
                newnumAryStr = num.substring(0, 14)
            }
            const _newnum = newnumAryStr.split('.')
            //去除0开头的整数
            if (_newnum[0].length > 1) {
                _newnum[0] = _newnum[0].replace(/^[0|\.]+/ig, '')
            }
            newnumAryStr = _newnum.join('.')
            if (parseFloat(num) >= this.max) {
                newnumAryStr = parseFloat(this.max)
            }



            const number = parseFloat(newnumAryStr)


            if (parseFloat(e.target.value) !== number) {
                e.target.value = newnumAryStr
            }



            this._updateValue(newnumAryStr)
        },
        showFocus() {
            this.$emit('number:focus')
        },
        hideFocus(e) {
            const num = e.target.value
            e.target.value = ''
            e.target.value = num.replace(/[\.]$/ig, '')
            this.updateInput(e)
            this.$emit('number:blur')
        },
        setincrement(val) {
            if (val) {
                this.time1 = setTimeout(() => {
                    this.incrementtime = setInterval(() => {
                        this.increment()
                    }, 100)
                }, 150)
            } else {
                clearTimeout(this.time1)
                clearInterval(this.incrementtime)
            }


        },
        setdecrement(val) {
            if (val) {
                this.time2 = setTimeout(() => {
                    this.decrementtime = setInterval(() => {
                        this.decrement()
                    }, 100)
                }, 150)
            } else {
                clearTimeout(this.time2)
                clearInterval(this.decrementtime)
            }
        },
        increment($event) {
            console.log('this.getCurrentValue--1', this.getCurrentValue)
            let newVal = np.plus(this.getCurrentValue * 1, 1 * this.step)
            const stepary = this.step.toString().split('.')
            newVal = this.global_get_langnum(newVal)

            if (stepary.length > 1) {
                newVal = (1 * newVal).toFixed(stepary[1].length)
            }
            this._updateValue(newVal)
            this.$emit('change', newVal >= 0 ? newVal : 0)
        },
        decrement() {
            console.log('this.getCurrentValue', this.getCurrentValue)
            let newVal = np.plus(this.getCurrentValue * 1, -1 * this.step)
            const stepary = this.step.toString().split('.')
            newVal = this.global_get_langnum(newVal)
            if (stepary.length > 1) {
                newVal = (1 * newVal).toFixed(stepary[1].length)
            }
            this._updateValue(newVal)
            this.$emit('change', newVal >= 0 ? newVal : 0)
        },
        _updateValue(newVal) {
            console.log('newVal--', newVal)
            this.currentValue = newVal >= 0 ? newVal : 0
            this.$emit('update:num', this.currentValue >= 0 ? this.currentValue : 0)
            this.$emit('updateValue', newVal >= 0 ? newVal : 0)
        },
        keyup(el) {
            const val = el.target.value
            this._updateValue(val)
            this.$emit('keyup', val)
        },
        keydown(el) {
            const val = el.target.value
            this._updateValue(val)

            this.$emit('keydown', val)

        },
        change(el) {
            const val = el.target.value
            this._updateValue(val)
            this.$emit('change', val)
        }
    }
};
</script>
<style lang='less' scoped>
@import '../../static/styles/color.less';

.input-number-container {
    background-color: #1E252B !important;
    height: 38px;
    line-height: 38px;
    position: relative;
    font-size: 14px;
    border: none;
    display: flex;
    border-radius: 6px;
}

.ant-select.ant-select-enabled {
    height: 38px !important;
    line-height: 38px !important;
}

.ant-select-selection__rendered {
    line-height: 38px !important;
    height: 38px !important;
}

.input-container {
    flex-grow: 1;
    /* this line to make the input field expand */
    position: relative;
}

input {
    background: #1E252B;
    color: inherit;
    border: none;
    width: 100%;
    box-sizing: border-box;
    /* this line to include padding in width */
}

.before,
.after {
    white-space: nowrap;
    font-size: 12px;
    /*  this line to prevent text wrapping */
}

:focus-visible {
    outline: none;
}

.input-number {
    position: relative;

}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}


input[type="number"] {
    -moz-appearance: textfield;
    border: 0;
    outline: none;
    border-color: transparent;
}

.decrement-button,
.increment-button {
    position: absolute;
    z-index: 1;
    left: -10px;
    cursor: pointer;
    display: inline-block;
    height: 50%;
    text-align: center;
    width: 20px;
}

.increment-button {
    top: 0;
}

.decrement-button {
    bottom: 0;
}

.increment-button:hover:after {
    border-color: transparent transparent @cl_fff transparent;
}

.decrement-button:hover:after {
    border-color: @cl_fff transparent transparent transparent;
}

.increment-button:after,
.decrement-button:after {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
}

.increment-button:after {
    content: '';
    position: relative;
    top: -8px;
    border-width: 0px 5px 5px 5px;
    border-color: transparent transparent #5E6573 transparent;
}

.decrement-button:after {
    content: '';
    border-width: 5px 5px 0 5px;
    border-color: #5E6573 transparent transparent transparent;
    top: -13px;
    position: relative;
}

/*杠杆申请贷款特殊设置*/
.loan-number-control {

    .decrement-button,
    .increment-button {
        right: -20px;
    }
}

.before {
    margin-right: 10px;
    cursor: context-menu;

}

.ipt_hover {
    // padding-left: 75px;
    padding-left: 15px;
    padding-right: 45px;
    background-color: #1E252B;
    height: 38px;
    line-height: 38px;
    border-radius: 6px;
    left: 0;
    display: flex;
    width: 100% !important;
    color: @cl_E6E8EC;

    .after {
        right: 0;
    }

    .after {
        padding: 0 10px;
        position: absolute;
        line-height: 38px;
        height: 38px;
        color: @cl_E6E8EC;
        font-size: 12px;
        cursor: context-menu;
        flex-shrink: 0;
        /* this line to prevent the after text from shrinking*/
    }

}

.day {

    .ipt_hover,
    input {
        background-color: @--input-background;
    }

    .input-number-container {
        height: 42px;
    }

    .ipt_hover .after {
        color: @--normal-text !important;
    }
}
</style>

