<template>
    <div class="history-table mb-4">
        <a-table :columns="historyColumns" :pagination="false" :data-source="historyData" :rowKey="(record,index ) => index" :loading="loading">
            <template v-for="(item) in slotsColumns" :slot="item.scopedSlots.customRender" slot-scope="text,row" >
                <slot :name="item.scopedSlots.customRender" :row="row"></slot>
            </template>
        </a-table>
    </div>
</template>

<script>
export default {
    name:'GameOrderTable',
    props: {
        historyColumns: {
            type: Array,
            default: null,
        },
        historyData: {
            type: Array,
            default: null,
        },
        loading:{
            type:Boolean
        }
    },
    computed:{
        slotsColumns(){
            return this.historyColumns.filter(item=>item.scopedSlots)
        }
    },
}
</script>

<style>

</style>
