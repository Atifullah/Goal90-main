<template>
    <a-pagination background :page-size="paginatedObject.pageSize" :current="paginatedObject.currentPageIndex"
        @change="change" popper-class="paging" layout="prev, pager, next" :total="paginatedObject.totalItemCount" class="pagination-right">
    </a-pagination>
</template>

<script>
export default {
    props: {
        paginatedObject: {
            type: Object,
            required: true
        },
          
    },
    emits: ['onChange'],
    methods: {
        change: function (val) {
            this.$emit('onChange', val)
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination-right{
    margin-left: 500px !important;
}


</style>
