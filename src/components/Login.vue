<template>
  <div class="login_container">
<!--    登陆块-->
    <div class="login_box">
<!--      表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" label-width="0" class="login_form" :rules="loginRules">
          <h3 class="title">売上管理システム</h3>
<!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont iconxiaoren"></el-input>
        </el-form-item>
<!--        密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont iconmima" type="password"></el-input>
        </el-form-item>
<!--        按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click.native.prevent="login" :loading="loading">
              <span v-if="!loading">登 録</span>
              <span v-else>登 録 中</span>
          </el-button>
          <el-button type="info" @click="resetLoginForm">クリア</el-button>
        </el-form-item>
      </el-form>
    <!--  底部  -->

    </div>
      <div class="el-login-footer">
          <span>Copyright © 2020 MyDemo All Rights Reserved.</span>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            loading: false,
            //表单数据对象
            loginForm:{
                username: 'admin',
                password: '123456'
            },
            //验证对象
            loginRules:{
              //校验用户名
              username: [
                { required: true, message: '用户名为必填项', trigger: 'blur' },//必填项验证
                { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }//长度验证
              ],
              //校验密码
              password: [
                  { required: true, message: '用户密码为必填项', trigger: 'blur' },//必填项验证
                  { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }//长度验证
              ],
            },
        }
    },
    methods: {
        //重置表单内容
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        //登录方法
        login(){
            //验证校验规则
          this.$refs.loginFormRef.validate(async valid =>{
              this.loading = true;
              //验证失败
              if (!valid) return;
              //访问后台
              const {data:res} = await this.$http.post("login",this.loginForm);
              if (res.flag == "ok"){
                  //设置延时
                  setTimeout(() => {
                      //存储user对象
                      window.sessionStorage.setItem("user",res.user)
                      //信息提示
                      this.$message.success("登録成功！");
                      //页面路由跳转
                      this.$router.push({path:"/home"});
                  }, 1000);
              }else{
                  // 错误提示
                this.$message.error("操作失败！");
                this.loading = false;
              }
          })}
    }
  }
</script>

<style lang="less" scoped>
  //根节点样式
  .login_container {
    height: 100%;
    background-image: url("../assets/img/login-background.jpg");
      background-size: cover;

  }
  .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #707070;
  }

  .login_box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .el-login-footer {
      height: 40px;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      color: #fff;
      font-family: Arial;
      font-size: 12px;
      letter-spacing: 1px;
  }
</style>
