<template>
  <div id="p2p-table" class="pb-5">
    <a-table :expandIconColumnIndex="4"
            :expandIconAsCell="false" :columns="buySellColumns" :data-source="buySellData" :pagination="false" :rowKey="(record,index ) => index" :loading="loading" :defaultExpandedRowKeys="[]" >
        <template v-for="(item) in slotsColumns" :slot="item.scopedSlots.customRender" slot-scope="text,row" >
            <slot :name="item.scopedSlots.customRender" :row="row"></slot>
        </template>
        <template v-for="(item) in slotsHeaders"  :slot="item.slots.title">
            <slot :name="item.slots.title"></slot>
        </template>
        <template slot="expandIcon" slot-scope="row">
            <slot name="expandIcon" :row="row"></slot>
        </template>
        <template slot="expandedRowRender" slot-scope="row">
            <slot name="expandedRowRender" :row="row"></slot>
        </template>

        </a-table>

  </div>
</template>

<script>
export default {
    props:{
        buySellColumns: {
            type: Array,
            default: null,
        },
        buySellData: {
            type: Array,
            default: null,
        },
        loading:{
            type:Boolean
        }
    },
    computed:{
        slotsColumns(){
            return this.buySellColumns.filter(item=>item.scopedSlots)
        },
        slotsHeaders(){
            return this.buySellColumns.filter(item=>item.slots)
        }
    },
    data(){
        return{
            expandedRows:[]
        }
    },
    methods:{
        collapseAllRows(){ 
            this.expandedRows=[];
        },
        RowExpanded(expanded, record){ 

        }
    }

}
</script>

<style lang="scss">
@import '@/assets/scss/components/p2p-modules/p2p-table.scss';
</style>
