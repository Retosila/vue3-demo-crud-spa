<script setup>
import { onMounted } from "vue";
import { useAccount } from "@/stores/account";

// account 스토어 호출
const account = useAccount();

// DOM이 생성되면, account 스토어에 계정 리스트 초기화
onMounted(() => {
  // 계정 초기화가 안 되어있는 경우(처음 실행된 경우) 기본 계정 리스트로 초기화
  if (account.accountList[0] === "initRequired") {
    account.initAccount();
    for (var i in account.accountList) {
      console.log(account.accountList[i]);
    }
    console.log("스토어 초기화 완료");
  }

  // 초기화 이후 변경된 데이터가 있는 경우, 별도의 액션 X
  else {
    console.log("바인딩 데이터 존재");
    for (var i in account.accountList) {
      console.log(account.accountList[i]);
    }
  }
});
</script>

<template>
  <h1>Vue 3 CRUD Demo</h1>
  <div>
    <router-link to="/login" class="rl">START</router-link>
  </div>
  <h3></h3>
</template>

<style>
* {
  font-size: inherit;
}

a {
  margin: auto;
  display: block;
}

a:visited {
  text-decoration: none;
  color: black;
}

h1 {
  text-align: center;
  font-size: 3em;
  font-family: Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

.rl {
  text-align: center;
  font-size: 1.5em;
  font-family: Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}
</style>
