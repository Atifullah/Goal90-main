**Nuxt.js 是什么？**
  1. Nuxt.js 是一个基于 Vue.js 的通用应用框架。
  2. 通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI 渲染。
  3. Nuxt.js 预设了利用 Vue.js 开发服务端渲染的应用所需要的各种配置。
  4. nuxt generate ，为基于 Vue.js 的应用提供生成对应的静态站点的功能。
  5. Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。

**目录结构**
  1. 资源目录 assets 用于组织未编译的静态资源如 LESS、SASS 或 JavaScript。
  2. 组件目录 components 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 asyncData 方法的特性。
  3. 布局目录 layouts 用于组织应用的布局组件。
  4. 中间件目录 middleware 目录用于存放应用的中间件。
  5. 页面目录 pages 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。
  6. 插件目录 plugins 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。
  7. 静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。
  8. Store 目录 用于组织应用的 Vuex 状态树 文件。 Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置。
  9. nuxt.config.js 文件用于组织 Nuxt.js 应用的个性化配置，以便覆盖默认配置。 init.js 为nuxt的初始化配置文件
  10. package.json 文件 package.json 文件用于描述应用的依赖关系和对外暴露的脚本接口。


### 网站页面
  1. index.vue [首页](http://localhost:9084/)
     > 组件：Bannelarticle ~@/components/home/banner-article.vue
     >> 公告小喇叭文字链接
     >>> 接口：/comapi/v1.0/com/article.search
     >>>> 错误提示：四种语言: 英文和日文下有数据展示, 韩语和繁体没有数据

     ```分隔符```

     > 组件：swiper ~@/components/home/swiper.vue
     >> 公告轮播图, 获取文章列表
     >>> 接口：/comapi/v1.0/com/article.search, 

     ```分隔符```

     > 组件：currency ~@/components/home/currency-figure.vue
     >> 获取24小时行情
     >>> 接口：/transactionapi/v1.0/quotation/daily.getall
     >>>> 错误提示：多次请求，间隔时间周期短

     ```分隔符```

     > 组件：SignInput ~@/components/home/sign-input.vue
     >> 跳转注册页面，根据填写的邮箱

     ```分隔符```

     > 组件：trade ~@/components/home/trade.vue
     >> 获取币币类型
     >>> 接口：/transactionapi/v1.0/quotation/frenchcurrency.get.bb

     ```分隔符```

     > 组件：ProductService ~@/components/home/product-service.vue
     >> 产品服务图文介绍

     ```分隔符```

     > 组件：StartTrading ~@/components/home/start-trading.vue
     >> 没有登录时，显示登录按钮，点击跳转到登录页
  
  2. login.vue [登录页](http://localhost:9084/login)
  
  - login.vue 登录页 URL：/login 功能：账号登录和扫码登录
  - register.vue 注册页
  - reset-password.vue 找回密码重置密码页
  - auth.vue
  - legal-orders.vue
  - master-deposit-fail.vue
  - master-deposit-success.vue
  - partner.vue
  - person.vue
  - rebate.vue
  


插件下的MAIN.JS还需要优化
插件下的axios目录，socket.js还需要优化



1，先安装pm2
npm install pm2 -g

根据目录做个映射
ln -s /data/soft/nodejs/bin/pm2 /usr/local/bin
ln -s /usr/local/soft/node-v14.21.3-linux-x64/bin/pm2 /usr/local/bin/pm2


2, pm2启动 
pm2 start "/usr/local/bin/npm" --name "bitnasdaq" -- start .
pm2 start "/usr/local/bin/npm" --name "bitnasdaq_test" -- start .
pm2 start "/usr/local/bin/npm" --name "ourwanllet_web" -- start .
pm2 list
pm2 stop    
pm2 restart 
pm2 delete  


删除首页的广告页面，路由，图片

常见错误：
提示权限不够
执行：chmod -R 755  /data/webinfo/web
npm@16.15.0
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
