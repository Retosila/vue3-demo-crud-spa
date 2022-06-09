<!-- 
  <script>태그 내에 setup() 메소드를 작성하는 방법도 있으나 
  공식 문서에서는 <script setup>태그를 활용하는 것을 권장한다.
-->
<script setup>
//  컴포넌트 용량을 줄이기 위해 필요한 요소들만 import해서 사용한다.
import { ref, watch } from "vue";
import { useAccount } from "@/stores/account";

const account = useAccount();

// 반응형 데이터 선언 (Option API에서의 data() 메소드)
// 코드 통일성을 위해 reactive가 아닌 ref로 통일

// 계정 아이디
const uid = ref("");
// 계정 비밀번호
const pwd = ref("");
// 계정 이름
const name = ref("");
// 현재 선택된 계정 (select 엘리먼트와 양방향 데이터 바인딩)
const selected = ref("");

// DOM 직접 제어용(ref)
const idInput = ref(null);

// watchers 옵션
// select 엘리먼트의 option을 클릭하여 selected 변수에 변화가 발생할 경우,
// 공백을 기준으로 split하여 배열 생성 후 할당
watch(selected, (user) => {
  [uid.value, pwd.value, name.value] = user.split(" ");
});

// 계정 리스트 정보가 변경되면, localStorage에 갱신된 정보를 바인딩
watch(
  account.accountList,
  (currentState) => {
    account.accountList = currentState;
    console.log("스토어 최신화 완료");
  },
  //배열이라 deep watch사용
  { deep: true }
);

// 회원 추가
function create() {
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

    account.accountList.push(user);
    alert(uid.value + " 계정이 추가되었습니다.");
    uid.value = pwd.value = name.value = "";
  }
}

// 회원정보 갱신
function update() {
  if (hasValidInput() && selected.value) {
    const i = account.accountList.indexOf(selected.value);
    account.accountList[i] =
      selected.value = `${uid.value} ${pwd.value} ${name.value}`;
    uid.value = pwd.value = name.value = "";
    alert("회원정보가 갱신되었습니다.");
  }
}

// 회원 삭제
function del() {
  if (selected.value) {
    const i = account.accountList.indexOf(selected.value);
    account.accountList.splice(i, 1);
    selected.value = uid.value = pwd.value = name.value = "";
    alert("회원 삭제가 완료되었습니다.");
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
  <select size="10" v-model="selected">
    <option v-for="a in account.accountList">{{ a }}</option>
  </select>

  <label>아이디 : <input v-model="uid" ref="idInput" /></label>
  <label>비밀번호 : <input v-model="pwd" /></label>
  <label>이름 : <input v-model="name" /></label>

  <div class="buttons">
    <button @click="create">회원 추가</button>
    <button @click="update">정보 갱신</button>
    <button @click="del">회원 삭제</button>
  </div>
  <br />
  <button @click="$router.push('/')">처음으로</button>
  <br />
  <hr />
  <br />
</template>

<style>
* {
  font-size: inherit;
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

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>
