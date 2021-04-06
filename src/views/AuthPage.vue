<template>
  <form class="auth-root" @submit.prevent="signUpChecker(onSubmit)">
    <loader v-if="loading" v-model="loading" />
    <span class="auth-title">
      <div v-if="!login">Sign Up</div>
      <div v-else>Log In</div>
    </span>
    <div class="auth-body">
      <span class="error" v-if="getError && login">
        Password mismatch. Check your password or nickname.
      </span>
      <span class="error" v-if="getError && !login">
        {{ this.getError }}
      </span>
      <span class="error" v-else-if="getError"> </span>
      <div class="auth-form-inputs">
        <label for="auth-login">Enter your login</label>
        <input
          id="auth-login"
          type="text"
          class="auth-login"
          :class="{ input_error: getError }"
          placeholder="Login"
          v-model="nickname"
          :disabled="loading"
        />
        <label for="auth-password">Enter your password</label>
        <input
          id="auth-password"
          type="password"
          class="auth-password"
          :class="{ input_error: getError }"
          placeholder="Password"
          v-model="password"
          :disabled="loading"
        />
      </div>
      <div class="auth-middle">
        <button type="submit" :disabled="loading" v-if="!login">
          Sign Up
        </button>
        <button type="submit" :disabled="loading" v-else>Log In</button>
      </div>
      <div class="auth-bottom">
        <span v-if="!login">
          If you already have account
          <span class="auth-click-here" @click="setLogin">click here.</span>
        </span>
        <span v-else>
          If you don't have account
          <span class="auth-click-here" @click="setLogin">click here.</span>
        </span>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Loader from "@/components/Loader/index";

export default {
  name: "AuthPage",
  data() {
    return {
      login: false,
      password: "",
      nickname: "",
      loading: false,
      regexpPass: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      regexNick: /[0-9a-zA-Z!@#$%^&*]{3,}/g
    };
  },
  methods: {
    ...mapActions(["setTokenAndUser", "setCustomError"]),
    setLogin() {
      this.setCustomError(null);
      this.login = !this.login;
      this.password = "";
      this.nickname = "";
    },
    setLoader() {
      this.loading = !this.loading;
    },
    onSubmit() {
      this.setLoader();
      this.setTokenAndUser({
        field: this.setField,
        nickname: this.nickname,
        password: this.password
      }).then(() => {
        this.setLoader();
        if (!this.getError) {
          this.password = "";
          this.nickname = "";
          sessionStorage.setItem("token", this.getToken);
          this.$router.push({
            name: "UserPage",
            params: { id: this.getUser.userId }
          });
        }
      });
    },
    signUpChecker(onSubmit) {
      if (this.login) onSubmit();
      else {
        if (!this.nickname.match(this.regexNick)) {
          this.setCustomError("Nickname must contain at least 3 characters");
        } else if (!this.password.match(this.regexpPass)) {
          this.setCustomError(
            "Password must contain A-Z, a-z, 0-9, !,@,#,$,%,^,&,*"
          );
        } else if (
          !this.nickname.match(this.regexNick) &&
          !this.password.match(this.regexpPass)
        ) {
          this.setCustomError("Wrong input data.");
        } else {
          onSubmit();
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getUser", "getError", "getToken"]),
    setField() {
      return this.login ? "login" : "register";
    }
  },
  components: {
    Loader
  }
};
</script>

<style lang="css" scoped>
.input_error {
  border: 1px solid rgb(255, 61, 61);
  border-radius: 2px;
}

.error {
  display: flex;
  font-size: 11px;
  color: rgb(206, 54, 54);
  margin-bottom: -3px;
}

.auth-login-error {
  color: rgb(255, 61, 61);
}

.auth-password-error {
  color: rgb(255, 61, 61);
}
.auth-body {
  width: 95%;
  display: flex;
  flex-direction: column;
}

.auth-title {
  font-size: 20px;
  transform: translate(0, -100%);
}

span {
  display: inline-block;
}

label {
  margin-top: 6px;
  align-self: flex-start;
  font-size: 13px;
  font-style: italic;
}

input {
  padding: 5px;
  font-size: 17px;
}

.auth-root {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(58, 58, 58);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  background: #fff;
}

.auth-click-here {
  cursor: pointer;
  color: rgb(219, 99, 0);
}
.aut h-click-here:hover {
  color: rgb(180, 83, 3);
}

.auth-form-inputs {
  display: flex;
  flex-direction: column;
}

.auth-middle {
  margin: 4px 0;
  display: flex;
  flex-direction: column;
}

.auth-middle button {
  justify-self: center;
  align-self: center;
  width: fit-content;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 20px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgb(219, 99, 0);
  color: rgb(219, 99, 0);
  border-radius: 4px;
}

.auth-middle button:hover {
  background: rgb(219, 99, 0);
  border: 1px solid rgb(219, 99, 0);
  color: #fff;
  border-radius: 4px;
  transition: 0.5s;
}

.auth-middle button:focus {
  outline: none;
}

.auth-middle button:disabled {
  color: #ccc;
  border-color: #ccc;
}

.auth-middle button:disabled:hover {
  background: #fff;
}

.auth-bottom {
  align-self: flex-start;
}
</style>
