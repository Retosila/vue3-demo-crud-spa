<script setup>
import router from "../router";
import { watch } from "vue";
import { useAccount } from "@/stores/account";

// account 스토어
const account = useAccount();

// 계정 리스트 정보가 변경되면, localStorage에 갱신된 정보를 바인딩
watch(
  account.accountList,
  (currentState) => {
    account.accountList = currentState;
    console.log("스토어 최신화 완료");
  },
  { deep: true }
);

function logOut() {
  account.clearMember();
  router.push("/login");

  alert("로그아웃되었습니다.");

  return;
}

function signOut() {
  const user = `${account.member.uid} ${account.member.pwd} ${account.member.name}`;
  let cmd = confirm("회원 탈퇴하시겠습니까?");

  if (cmd == true) {
    const i = account.accountList.indexOf(user);
    account.accountList.splice(i, 1);

    // delete account.member
    // account.isLogOn = false
    router.push("/login");

    alert("회원 탈퇴가 완료되었습니다.");
    return;
  }
}
</script>

<template>
  <h1>홈 화면</h1>
  <h3>{{ account.member.name }}님, 안녕하세요!</h3>

  <button @click="$router.push('/')">처음으로</button><br />
  <br />
  <button @click="logOut">로그아웃</button><br />
  <br />
  <button @click="signOut">회원탈퇴</button><br />
</template>

<style></style>
