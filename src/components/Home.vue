<template>
<!--  引入container布局-->
  <el-container class="home-container">
      <!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" :collapse="isCollapse"
                   :collapse-transition="false" unique-opened :router="true" :default-active="$route.path">
              <!--                                                设置单一显示-->
              <!--          一级菜单-->
              <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                  <template slot="title">
                      <i :class="iconsObject[item.id]"></i>
                      <span>{{item.title}}</span>
                  </template>
                  <!--              二级菜单-->
                  <el-menu-item :index="it.path+''" v-for="it in item.sList" :key="it.id">
                      <i :class="iconsObject[it.id]"></i>
                      <span>{{it.title}}</span>
                  </el-menu-item>

              </el-submenu>
          </el-menu>
      </el-aside>
<!--    主体-->
      <el-container>
          <!--    头部-->
          <el-header style="height: 50px;padding:0">
              <div @click="toggleCollapse" class="toggle-button">
                  <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                  <i class="el-icon-s-unfold" v-else></i>
              </div>
              <div class="left-menu">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">
                          <router-link v-if="item.url" :to="item.url">{{item.name}}</router-link>
                          <span v-else>
                              {{item.name}}
                          </span>
                      </el-breadcrumb-item>
                  </el-breadcrumb>
              </div>

              <div class="right-menu">
                  <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                      <div class="avatar-wrapper">
                          <img src="../assets/img/images.jpg" class="user-avatar">
                          <i class="el-icon-caret-bottom" />
                      </div>
                      <el-dropdown-menu slot="dropdown">
                          <router-link to="/user/profile">
                              <el-dropdown-item>个人中心</el-dropdown-item>
                          </router-link>
                          <el-dropdown-item @click.native="setting = true">
                              <span>布局设置</span>
                          </el-dropdown-item>
                          <el-dropdown-item divided @click.native="logout">
                              <span>退出登录</span>
                          </el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>

          </el-header>

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
            iconsObject: {
                "100" : "iconfont iconintegral",
                "101" : "iconfont icontradingvolume",
                "102" : "iconfont iconadd",
            }
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

  /*显示隐藏的按钮样式*/
  .toggle-button{
      float: left;
      font-size: 20px;
      cursor: pointer;
      line-height: 50px;
      padding: 0 15px;
      margin-left: 0;
      &:hover {
          background: rgba(0, 0, 0, .025)
      }
  }

  /*.toggle-button{*/
  /*  background-color: #4a5064;*/
  /*  font-size: 10px;*/
  /*  line-height: 24px;*/
  /*  color: #fff;*/
  /*  text-align: center;*/
  /*  letter-spacing: 0.3em;*/
  /*  cursor: pointer;*/
  /*}*/

  /* header的样式 */
  .left-menu{
    float: left;
    height: 100%;
    line-height: 50px;
    text-align: center;
    .el-breadcrumb{
      font-size: 18px;
      margin-top: 15px;
    }

  }

  .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      &:focus {
          outline: none;
      }

      .right-menu-item {
          display: inline-block;
          padding: 0 8px;
          height: 100%;
          font-size: 18px;
          color: #5a5e66;
          vertical-align: text-bottom;

          &.hover-effect {
              cursor: pointer;
              transition: background .3s;
              &:hover {
                  background: rgba(0, 0, 0, .025)
              }
          }
      }
  }

  .avatar-container {
      margin-right: 10px;
      .avatar-wrapper {
          margin-top: 5px;
          /*position: relative;*/
          .user-avatar {
              cursor: pointer;
              width: 40px;
              height: 40px;
              border-radius: 10px;
          }
          .el-icon-caret-bottom {
              cursor: pointer;
              /*position: absolute;*/
              right: -20px;
              top: 25px;
              font-size: 12px;
          }
      }
    }

    .iconfont{
        margin-right: 10px;
    }
</style>
