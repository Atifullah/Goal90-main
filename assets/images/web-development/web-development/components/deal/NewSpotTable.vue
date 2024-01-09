<template>
  <div id="spot-table">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Tab 1">
        {{$t('confirm.con19')}}
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        {{$t('confirm.con20')}}
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">
        {{$t('confirm.con21')}}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
    methods: {
    callback(key) { 
    },
  },
}
</script>

<style>

</style>
