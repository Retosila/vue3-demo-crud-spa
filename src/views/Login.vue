<script setup>
//  컴포넌트 용량을 줄이기 위해 필요한 요소들만 import해서 사용한다.
import { ref } from "vue";
// programmatic navigation 방식으로 router를 활용하려면 별도의 컴포넌트에서 import 필요
import router from "../router";
// props drilling 이슈 없이 전역적 상태 관리를 위해선 account 스토어 import 필요
import { useAccount } from "@/stores/account";

// account 스토어
const account = useAccount();

// 계정 아이디
const uid = ref("");
// 계정 비밀번호
const pwd = ref("");

// 로그인
function login() {
  // 입력되어있는 아이디 및 비밀번호가 유효할 시, 로그인 로직을 수행
  if (hasValidInput()) {
    // 입력된 값을 accountList 배열과 동일한 형태로 가공
    const user = `${uid.value} ${pwd.value}`;

    let tempAccountList = account.accountList;
    let accountList = [];

    for (let i = 0; i < tempAccountList.length; i++) {
      const tempSplitUser = tempAccountList[i].split(" ");
      const tempUser = `${tempSplitUser[0]} ${tempSplitUser[1]}`;
      accountList.push(tempUser);
    }

    console.log(accountList);

    // 계정 존재 여부 확인
    const i = accountList.indexOf(user);
    console.log("계정 정보 포함 여부 : " + i);

    // 스토어에 저장된 데이터 중 입력된 계정값과 동일한 것이 있을 시, 로그인 로직 실행
    if (i > -1) {
      const acnt = account.accountList[i];
      const sAcnt = acnt.split(" ");

      console.log(acnt);
      console.log(sAcnt);

      // 회원 객체 정보를 스토어에 저장
      account.member.uid = sAcnt[0];
      account.member.pwd = sAcnt[1];
      account.member.name = sAcnt[2];

      console.log("회원 ID : " + account.member.uid);
      console.log("회원 PW : " + account.member.pwd);
      console.log("회원명 : " + account.member.name);

      // 로그인 확인 변수 true로 할당
      account.isLogOn = true;

      // admin 계정으로 로그인한 경우 관리자 페이지로 이동
      if (account.member.uid === "admin") {
        router.push("/admin");
        alert("관리자 계정 감지 : 관리자 페이지로 진입합니다.");
        return;
      }

      router.push("/home");
      alert(account.member.name + "님 안녕하세요!");
      return;
    } else {
      alert("아이디 및 비밀번호가 유효하지 않습니다.");
      return;
    }
  }
}

// 유효성 검증
function hasValidInput() {
  if (uid.value.trim() && pwd.value) {
    return true;
  } else {
    alert("아이디 및 비밀번호를 입력해주십시오.");
    return false;
  }
}
</script>

<template>
  <br />
  <hr />
  <br />

  <label>ID : <input v-model="uid" type="text" /></label><br />
  <label>PW : <input v-model="pwd" type="password" /></label>

  <br />

  <div class="buttons">
    <button @click="login">로그인</button><br />
    <br />
    <button @click="$router.push('/signup')">회원가입</button>
  </div>
  <br />
  <button @click="$router.push('/')">처음으로</button>
  <br />

  <br />
  <hr />
  <br />
</template>

<style>
* {
  text-align: center;
  font-size: inherit;
  font-family: Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

input {
  margin: auto;
  display: block;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>
