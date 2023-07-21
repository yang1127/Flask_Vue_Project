<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:25%; margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录
      </el-button>
      <el-button
        :loading="loading"
        type="primary"
        style="width:25%; margin-bottom:30px; "
        @click.native.prevent="registerDialog"
      >注册
      </el-button>

      <!-- 注册弹窗 -->
      <el-dialog
        title="注册信息"
        :visible.sync="dialogRegisterInfo"
        width="40%"
        :close-on-click-modal="false"
        @close="clearRegisterInfo"
      >
        <el-form ref="formRegisterInfo" :model="formRegisterInfo" label-width="100px" :rules="rulesRegisterInfo">
          <el-form-item label="username" prop="username">
            <el-input v-model="formRegisterInfo.username" placeholder="请输入用户信息" />
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input v-model="formRegisterInfo.password" placeholder="请输入用户密码" />
          </el-form-item>
          <el-form-item label="workcode" prop="workcode">
            <el-input v-model="formRegisterInfo.workcode" placeholder="请输入用户工号" />
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: flex-end;">
          <el-button @click="cancelRegisterInfo()">取 消</el-button>
          <el-button type="primary" @click="onSubmitRegisterInfo()">注 册</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { register } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogRegisterInfo: false,
      formRegisterInfo: {
        username: '',
        password: '',
        workcode: ''
      },
      rulesRegisterInfo: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        workcode: [{ required: true, message: '请输入工号', trigger: 'blur' }]
      }

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
            localStorage.setItem('username', this.loginForm.username)
          }).catch(
            this.loading = false
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 打开弹窗
    registerDialog() {
      this.dialogRegisterInfo = true
    },
    // 取消
    cancelRegisterInfo() {
      this.$nextTick(() => {
        this.$refs.formRegisterInfo.resetFields()
      })
      this.dialogRegisterInfo = false
    },
    // 注册
    onSubmitRegisterInfo() {
      this.$refs.formRegisterInfo.validate(async(valid) => {
        if (valid) {
          const res = await register({
            username: this.formRegisterInfo.username,
            password: this.formRegisterInfo.password,
            workcode: this.formRegisterInfo.workcode
          })

          // 判断是否注册成功
          if (res.success === true) {
            this.$message({
              message: '注册成功, 请登录～',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
          this.dialogRegisterInfo = false
        } else {
          return false
        }
      })
    },
    // 关闭弹窗
    clearRegisterInfo() {
      this.$nextTick(() => {
        this.$refs.formRegisterInfo.resetFields()
      })
      this.dialogRegisterInfo = false
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
