<template>
  <div class="home">
    <div class="Home-banner">
      <img src="../assets/images/Banner.svg" />
      <div class="score-board">
        <a-row class="mt-2">
          <a-col :span="4">
            <div class="live ml-14 mt-btn">
              <img src="../assets/images/Ellipse.svg" class="m-1" />
              <span class="font-16 color-yellow">Live [1]</span>
            </div>
          </a-col>
          <a-col :span="16">
            <a-input-search
              placeholder="Search For Match"
              style="width: 475px; height: 29px"
              class="mt-btn search-input"
              @search="onSearch"
            />
          </a-col>
          <a-col :span="4">
            <a-dropdown class="mt-btn mr-14">
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">
                  <a-icon type="user" />Laliga
                </a-menu-item>
                <a-menu-item key="2"> <a-icon type="user" />EPL </a-menu-item>
                <a-menu-item key="3">
                  <a-icon type="user" />BundesLiga
                </a-menu-item>
              </a-menu>
              <a-button> All Matches <a-icon type="down" /> </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
        <a-row class="mt-btn ml-3">
          <a-col :span="4">
            <div class="day-calender mb-2">
              <span class="mt-2">Wednesday</span>
              <span>09 Aug</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="day-calender mb-2">
              <span class="mt-2">Wednesday</span>
              <span>09 Aug</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="day-calender mb-2">
              <span class="mt-2">Wednesday</span>
              <span>09 Aug</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="day-calender mb-2">
              <span class="mt-2">Wednesday</span>
              <span>09 Aug</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="day-calender mb-2">
              <span class="mt-2">Wednesday</span>
              <span>09 Aug</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="day-calender mb-2">
              <span class="mt-2">Wednesday</span>
              <span>09 Aug</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="mt-2rem ml-3 score-table">
          <a-col :span="2">
            <img
              src="../assets/images/world.svg"
              class="ml-3 mt-2 rounded-circle"
            />
          </a-col>
          <a-col :span="8">
            <div class="text-white mt-2">
              <span>World - FIFA Women's World Cup</span>
            </div>
          </a-col>
          <a-col :span="10">
            <div class="text-lightBlack mt-2 font-style">
              <span>[Quater Final]</span>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
<style scoped lang="scss">
@import '../assets/scss/global/home/home.scss';
</style>
