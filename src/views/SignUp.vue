<script setup>
import router from "../router";
import { ref, watch } from "vue";
import { useAccount } from "@/stores/account";

// account 스토어
const account = useAccount();

// 계정 아이디
const uid = ref("");
// 계정 비밀번호
const pwd = ref("");
// 계정 이름
const name = ref("");

// 계정 리스트 정보가 변경되면, localStorage에 갱신된 정보를 바인딩
watch(
  account.accountList,
  (currentState) => {
    account.accountList = currentState;
    console.log("스토어 최신화 완료");
  },
  { deep: true }
);

// DOM 직접 제어용(ref)
const idInput = ref(null);

function signUp() {
  if (hasValidInput()) {
    const user = `${uid.value} ${pwd.value} ${name.value}`;

    // 중복된 ID의 계정일 경우 거부 처리
    for (let i = 0; i < account.accountList.length; i++) {
      const tempId = account.accountList[i].split(" ")[0];
      if (tempId == uid.value) {
        alert("이미 존재하는 아이디입니다.\r다른 아이디를 입력하십시오.");
        uid.value = "";
        idInput.value.focus();
        return;
      }
    }

    // 회원 객체 정보 스토어에 갱신
    account.member.uid = uid.value;
    account.member.pwd = pwd.value;
    account.member.name = name.value;

    account.isLogOn = true;

    account.accountList.push(user);

    alert(name.value + "님, 환영합니다!");
    router.push("/home");

    return;
  }
}

// 유효성 검증
function hasValidInput() {
  if (uid.value.trim() && pwd.value && name.value) {
    return true;
  } else {
    alert("비어있는 값은 허용되지 않습니다.");
    return false;
  }
}
</script>

<template>
  <label>아이디 : <input v-model="uid" ref="idInput" /></label>
  <label>비밀번호 : <input v-model="pwd" type="password" /></label>
  <label>이름 : <input v-model="name" type="text" /></label>
  <br />
  <button @click="signUp">회원 가입</button>
</template>

<style></style>
