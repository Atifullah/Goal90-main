<template>
  <div class="downLoad">
    <div class="bg">
      <img src="../../static/images/phonebg.jpg" alt="" />
    </div>
    <div class="main">
      <h1>{{$t('home.home13')}}</h1>
      <h2>{{$t('home.home14')}}</h2>
      <ul>
        <li>
          <a>
            <img src="../../static/images/down-icon1.png" alt="" />
            <p>{{$t('home.home15')}}</p>
          </a>
        </li>
        <li>
          <a>
            <img src="../../static/images/down-icon2.png" alt="" />
            <p>{{$t('home.home16')}}</p>
          </a>
        </li>
      </ul>
      <div class="scan">
        <div class="fl">
          <img src="../../static/images/qr-code.png" alt="" />
        </div>
        <div class="fr">
          <p>{{$t('home.home17')}}</p>
          <p>{{$t('home.home18')}}</p>
          <a>{{$t('home.home19')}} >></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "volume",

  data() {
    return {};
  },

  mounted() { },

  methods: {},
};
</script>

<style scoped lang="less">
.downLoad {
  position: relative;
  min-height: 900px;
  background: #fff9f2;
  width: 1432px;
  margin-left: auto;
  margin-right: auto;

  .main {
    width: 1427px;
    position: absolute;
    left: 50%;
    top: 13%;
    margin-left: -713px;
    z-index: 9;
    padding: 10px;

    h1 {
      font-size: 46px;
    }

    h2 {
      font-size: 20px;
      color: #323232;
      font-weight: normal;
      margin-top: 2%;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      width: 600px;
      margin-top: 5%;
      margin-bottom: 2%;

      li {
        width: 180px;
        text-align: center;
        margin-bottom: 8%;

        p {
          margin-top: 10px;
        }

        img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }

        a:hover {
          color: #ffb11a;
        }
      }
    }

    .scan {
      background: #ffebc6;
      display: flex;
      align-items: center;
      padding: 20px;
      width: 52%;

      a:hover {
        color: #ffb11a;
      }

      p {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 15px;
      }

      img {
        width: 150px;
        height: 150px;
        margin-right: 20px;
      }
    }
  }

  .bg {
    width: 100%;
    min-width: 700px;

    img {
      width: 100%;
    }
  }

  .bg1 {
    position: absolute;
    width: 2%;
    height: auto;
    z-index: 0;
    bottom: 327px;
    left: -112px;
    transform: scale(-6, 34);
  }

  .bg2 {
    position: absolute;
    width: 20%;
    height: auto;
    z-index: 0;
    bottom: 0;
    right: 0;
  }
}

@media (min-width: 800px) and (max-width: 1919px) {
  .main {
    width: 1200px !important;
    margin-left: -600px !important;
  }

  .downLoad {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
