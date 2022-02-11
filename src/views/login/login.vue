<template>
  <a-form :model="form" :style="{ width: '600px' }">
    <a-form-item field="email" label="用户邮箱">
      <a-input
        v-model="form.email"
        placeholder="please enter your username..."
      />
      <template #help>
        <div>help message</div>
      </template>
    </a-form-item>
    <a-form-item field="password" label="密码">
      <a-input
        v-model="form.password"
        placeholder="please enter your post..."
      />
    </a-form-item>
    <a-form-item>
      <a-button @click="viteLogin">提交</a-button>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from "vue";
import { userStore } from "@/store/module";
import { ROOT_PAGE_NAME } from "@config/index";
export default defineComponent({
  setup() {
    const user = userStore();
    // @ts-ignore
    const { proxy }: any = getCurrentInstance();
    // 表单
    const form = reactive({
      email: "123456@qq.com",
      password: "123456",
    });

    /**
     * @description 登录操作
     */
    function viteLogin() {
      if (!form.email || !form.password) {
        proxy.$message.error("未填写必填项");
        return;
      }

      try {
        const data = {
          ...form,
        };

        proxy.$api["login/login"]({ data }).then((res: any) => {
          user.setUserData(res.data);

          proxy.$router.push({ name: ROOT_PAGE_NAME });
        });
      } catch (error) {
        return error;
      }
    }

    return {
      form,
      viteLogin,
    };
  },
});
</script>
