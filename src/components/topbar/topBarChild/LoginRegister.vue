<template>
  <div class="login-register">
    <div class="login-register-button" @click="showOrHidden">
      <el-avatar :src="user.avatarUrl"></el-avatar>
      <div class="username-box">
        <a class="username" href="javascript:" v-text="user.nickname"></a>
        <span class="el-icon-caret-bottom user-icon"></span>
      </div>
    </div>

    <!-- 登录框 -->
    <div :class="{login:true,'show-hidden':loginBoxFlag}">
      <a href="javascript:" class="close" @click="showOrHidden"></a>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/network/loginRegister.js";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("账号不符合规则"));
      }
      callback();
    };
    // var reg = /^[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return {
      loginBoxFlag: "true",
      user: {
        userId: "",
        nickname: "未登录",
        avatarUrl: "../../..//assets/images/user.svg",
        loginTips: "",
      },
      ruleForm: {
        pass: "",
        phone: "",
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            validator: checkPhone, // 自定义验证
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm: function (value) {
      login(value.phone, value.pass).then(
        (res) => {
          console.log(res);
          if (res.status === 200 && res.statusText === "OK") {
            if (res.data.message === "密码错误" && code === 502) {
              //账号或者密码错误
              this.user.loginTips = "密码或账号错误";
            } else {
              this.user.userId = res.data.profile.userId;
              this.user.nickname = res.data.profile.nickname;
              this.user.avatarUrl = res.data.profile.avatarUrl;
              this.loginBoxFlag = true;
            }
          }
        },
        (error) => {
          console.log(error.msg);
        }
      );
    },

    //关闭/展示登陆框
    showOrHidden: function () {
      if (this.loginBoxFlag) {
        this.loginBoxFlag = false;
      } else {
        this.loginBoxFlag = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-register {
  height: 50px;
  line-height: 50px;
  .login-register-button {
    height: 50px;
    position: relative;
    .username-box:hover {
      color: #fff;
    }
    .username-box {
      position: absolute;
      cursor: pointer;
      color: #909399;
      bottom: 0;
      left: 40px;
      .username {
        font-size: 12px;
        color: inherit;
        line-height: 50px;
        display: inline-block;
      }
      .username:hover {
        text-decoration: none;
      }
      .user-icon {
        color: inherit;
        font-size: 16px;
        vertical-align: -2px;
      }
    }
    .el-avatar {
      border-radius: 50%;
      height: 30px;
      width: 30px;
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .show-hidden {
    display: none;
  }
  .login {
    background-color: #fafafa;
    box-shadow: 0 0 6px 3px rgb(243, 237, 237);
    width: 300px;
    height: 430px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .close {
      display: block;
      width: 20px;
      height: 20px;
      float: right;
      background: url("../../../assets/images/close.png") no-repeat center/cover;
    }
    /deep/.el-form-item__content {
      width: 170px;
    }
    /deep/.el-form-item {
      margin-left: -20px;
    }
    /deep/.el-form {
      margin-top: 116px;
    }
  }
}
</style>