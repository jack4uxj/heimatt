<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <div @click="$router.back()">
      <van-nav-bar class="page-nav-bar" title="登录" left-arrow />
    </div>
    

    
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="
      number"
        maxlength="11"
        :rules="userFromRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="
      number"
        maxlength="6"
        :rules="userFromRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="show"
            @finish="show = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="big"
            type="default"
            @click="onSend"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <p class="p">验证码：246810</p>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSmc } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      userFromRules: {
        mobile: [
          {
            required: true,
            message: "填写手机号",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      show: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user;

      // TODO: 2. 表单验证
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      // 3. 提交表单请求登录
      try {
        const res =
          (await login(this.user)) 
          this.$store.commit("setUser", res.data.data);

        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success("登录成功");
        this.$router.back()
      } catch (err) {
        console.log("登录失败", err);
        this.$toast.fail("登录失败，手机号或验证码错误");
      }

      // 4. 根据请求响应结果处理后续操作
    },
    async onSend() {
      try {
        await this.$refs.loginFrom.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      this.show = true;

      try {
        await sendSmc(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        this.show = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁，待会再试");
        } else {
          this.$toast("发送失败");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
.p {
  text-align: center;
  font-size: 16px;
}
</style>
