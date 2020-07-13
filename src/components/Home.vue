<template>
<!--  引入container布局-->
  <el-container class="home-container">
<!--    头部-->
    <el-header>
      <div>
        <img src="../assets/img/images.jpg" alt="">
        <span>个人运动平台</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
<!--    主体-->
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" :collapse="isCollapse"
                 :collapse-transition="false" unique-opened>
<!--                                                设置单一显示-->
<!--          一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
<!--              二级菜单-->
            <el-menu-item :index="item.id+''" v-for="item in item.sList" :key="item.id">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
<!--      主题内容-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
        return {
            //菜单列表
            menuList:[],
            //折叠的值
            isCollapse: false,
        }
    },
    // onload事件
    created(){
        //查询menuList
        this.getMenuList();
    },
    methods: {
        //安全退出的方法
        logout(){
            //清除session并回到登录页
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        //获取导航菜单方法
        async getMenuList() {
          const {data:res} = await this.$http.get("menus");
          console.log(res);
          //访问失败的信息
          if (res.flag != 200) return this.$message.error("获取列表失败");
          //成功后 获取数据
          this.menuList = res.menus;
        },
        //点击按钮，切换菜单的折叠与展开
        toggleCollapse(){
          this.isCollapse = !this.isCollapse;
        }
    }
  }
</script>

<style lang="less" scoped>
  /*布局器样式*/
  .home-container{
    height: 100%;
  }
  /*头样式*/
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;/*左右贴边*/
    padding-left: 0%; /*左边界*/
    padding-right: 0%;
    color: #fff;
    font-size: 20px;
    div {
      align-items: center;
      display: flex;
      span {
        margin-left: 15px;
      }
    }
  }
  /*侧边样式*/
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  /*主题样式*/
  .el-main {
    background-color: #eaedf1;
  }
  img{
    width: 64px;
    height: 55px;
  }
  .toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.3em;
    cursor: pointer;
  }
</style>
