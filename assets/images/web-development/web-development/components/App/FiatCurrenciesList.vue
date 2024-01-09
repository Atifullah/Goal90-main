<template>
    <a-select tyle="width: 100%" class="graph-dropdown" :open="open" v-model="currency" @change="setExchange"
        v-on:select="setOpen(false)" @dropdownVisibleChange="onOpen" ref="fiatSelect">
        <a-icon v-if="open" slot="suffixIcon" type="up" />
        <a-icon v-else slot="suffixIcon" type="down" v-on:click="setOpen(true)" />

        <div slot="dropdownRender" slot-scope="menu">
            <div style="padding: 4px 8px; cursor: pointer;">
                <a-input v-if="open" :placeholder="$t('placeholders.plh5')" ref="fiatSearch" class="all-input-search" v-on:blur="setOpen(false)"
                    v-model="searchValue" />
            </div>
            <a-divider style="margin: 4px 0;" />
            <v-nodes :vnodes="menu" />
        </div>
        <a-select-option v-for="(fiat, fiatIndex) in exchange" :key="fiatIndex" :label="fiat.name" :value="fiat.name"
            v-if="filterOptions(fiat.name.toLowerCase())">
            <span style="display: flex; align-items: center">
                <img :src="fiat.icon" style="height: auto;width: 15px;margin-right: 10px;" />
                {{ fiat.name }}
            </span>
        </a-select-option>
    </a-select>

</template>

<script>
import * as jsCokie from "js-cookie";
export default {
    components: {
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        },
    },
    data() {
        return {
            search: '',
            currency: 'USD',
            searchValue: '',
            open: false,
        }
    },
    watch: {
        '$store.state.hex_client_exchange': function () {
            this.getExchange()
        }
    },

    computed: {
        exchange: function () {
            const _self = this;
            const exchangedata = this.$store.state.hex_client_exchange;
            if (_self.search != '') {
                const filtered = exchangedata.infos.filter(function (item) {
                    const str = item.name.toLowerCase();
                    return str.indexOf(_self.search.toLowerCase()) !== -1;
                });
                return filtered
            }
            return exchangedata.infos;
        },

    },
    methods: {
        setExchange(e) {
            this.$store.commit("set_client_exchange", e);
            jsCokie.set(this.$store.state.hex_client_exchange.type, e);
        },

        getExchange() {
            const exchangedata = this.$store.state.hex_client_exchange
            this.currency = exchangedata.active.toUpperCase()
        },
        filterOptions(str) {
            const _self = this
            if (_self.searchValue !== '') {
                return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
            }
            return true
        },
        setOpen(bool) {
            if (this.open == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.open = bool
                    this.searchValue = '';
                }, 100);
            }
            else {
                this.open = bool;
            }
        },
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.fiatSearch?.focus()
                }, 100);
            }
        },

    },
    mounted() {
        this.getExchange()
    }

}
</script>

<style></style>
