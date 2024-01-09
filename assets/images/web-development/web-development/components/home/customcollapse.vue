<template>
    <a-collapse accordion>
      <a-collapse-panel v-for="item in data" :key="item.key" :header="item.header">
        <template v-slot:header>
          <div @click="handleHeaderClick(item.key)">{{ item.header }}</div>
        </template>
        <template v-if="activeHeader === item.key">
          <a-popover placement="bottom" :title="item.header" trigger="click">
            <p style="color: black;">{{ item.content }}</p>
          </a-popover>
        </template>
      </a-collapse-panel>
    </a-collapse>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeHeader: null,
      };
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    methods: {
      handleHeaderClick(headerKey) {
        this.activeHeader = this.activeHeader === headerKey ? null : headerKey;
      },
    },
  };
  </script>