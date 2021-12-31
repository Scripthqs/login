<template>
  <div class="login_container">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form class="login_form">
      <h3>请登录</h3>
      <label for="username">账号（admin）</label>
      <input type="text" v-model="name" placeholder="account " @input="nameInput">
      <span v-if="error.name" class="err-msg">{{error.name}}</span>

      <label for="password">密码（1234Abc!）</label>
      <input type="password" v-model="pwd" placeholder="password" @input="pwdInput">
      <span v-if="error.pwd" class="err-msg">{{error.pwd}}</span>

      <button @click="login" type="button" :disabled="disabled">登录</button>
    </form>
    <div v-show="isShow" class="toast">{{message}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      pwd: '',
      error: {
        name: '',
        pwd: ''
      },
      message: '',
      isShow: false,
      disabled: false,
      timeout: null
    }
  },
  methods: {
    check (name, pwd) {
      if (!name && !pwd) {
        this.error.name = '请输入账号'
        this.error.pwd = '请输入密码'
        this.timeout = setTimeout(() => {
          this.error.name = false
          this.error.pwd = false
        }, 3000)
        return false
      }
      if (!name) {
        this.error.name = '请输入账号'
        this.timeout = setTimeout(() => {
          this.error.name = false
        }, 3000)
        return false
      }
      if (!pwd) {
        this.error.pwd = '请输入密码'
        this.timeout = setTimeout(() => {
          this.error.pwd = false
        }, 3000)
        return false
      }
      if (pwd) {
        const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
        // console.log(reg.test(pwd))
        if (!reg.test(pwd)) { this.error.pwd = '密码必须包含大写、小写、数字、特殊字符其三，并且位数不少于8位' }
        this.timeout = setTimeout(() => {
          this.error.pwd = false
        }, 3000)
        return reg.test(pwd)
      }
    },
    login () {
      // console.log(this)
      this.disabled = true

      // Re-enable after 3 seconds
      this.timeout = setTimeout(() => {
        this.disabled = false
      }, 3000)
      const { name, pwd, $router, check } = this
      // if (!this.check(name, pwd)) return
      // console.log(name)
      // console.log(pwd)
      // 对密码进行预校验
      if (check(name, pwd)) {
        // 判断密码
        if (name === 'admin' && pwd === '1234Abc!') {
          this.timeout = setTimeout(() => {
            $router.push('/home')
          }, 1000)
        } else {
          this.isShow = true
          this.message = '登录失败，账号或密码错误！'
          this.timeout = setTimeout(() => {
            this.isShow = false
            this.message = ''
          }, 3000)
          // alert('账号或密码错误')
        }
      }
    },
    nameInput () {
      if (this.name) {
        this.error.name = false
      }
    },
    pwdInput () {
      if (this.pwd) {
        this.error.pwd = false
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  }
}

</script>

<style scoped lang="less">
.login_container {
  height: 100%;
  background-color: #080710;
  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    .shape {
      height: 200px;
      width: 200px;
      position: absolute;
      border-radius: 50%;
    }
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  .login_form * {
    font-family: sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  .login_form {
    height: 520px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
    h3 {
      font-size: 32px;
      font-weight: 500;
      line-height: 42px;
      text-align: center;
    }
    label {
      display: block;
      text-align: left;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 500;
    }
    input {
      display: block;
      height: 50px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 3px;
      padding: 0 10px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 300;
    }
    ::placeholder {
      // color: #e5e5e5;
      text-transform: uppercase;
    }
    button {
      margin-top: 50px;
      width: 100%;
      background-color: #ffffff;
      color: #080710;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
    }
    .err-msg {
      color: yellow;
      position: absolute;
      left: 10%;
      right: 10%;
      text-align: left;
    }
  }
  .toast {
    position: fixed;
    // background-color: #fff;
    // border: 1px solid red;
    width: 500px;
    border-radius: 5px;
    font-size: 24px;
    color: red;
    left: 50%;
    top: 8%;
    transform: translate(-50%, -50%);
  }
}
</style>
