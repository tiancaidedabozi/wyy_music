<template>
  <div class="header">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple app">
          <div class="apptips">
            <span class="el-icon-headset"></span>
            <span>挥剑决浮云</span>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple search-box">
          <search-input></search-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple user">
          <login-register></login-register>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchInput from './topBarChild/SearchInput.vue'
import LoginRegister from './topBarChild/LoginRegister.vue'

export default {
  components: {
    SearchInput: SearchInput,
    LoginRegister: LoginRegister
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  min-width: 1015px;
  background-color: #2e2e2e;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  .app {
    min-width: 200px;
    .apptips {
      height: 100%;
      padding-left: 20px;
      span:nth-child(1) {
        font-size: 25px;
        font-weight: 700;
        color: #c62f2f;
        vertical-align: -2px;
      }
      span:nth-child(2) {
        line-height: 50px;
        color: #fff;
        font-size: 20px;
      }
    }
  }
  .search-box {
    min-width: 615px;
  }
  .user {
    min-width: 200px;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>