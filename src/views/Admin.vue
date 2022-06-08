<!-- 
  <script>태그 내에 setup() 메소드를 작성하는 방법도 있으나 
  공식 문서에서는 <script setup>태그를 활용하는 것을 권장한다.
-->
<script setup>

//  컴포넌트 용량을 줄이기 위해 필요한 요소들만 import해서 사용한다.
import { ref, reactive, watch } from 'vue'

// 반응형 데이터 선언 (Option API에서의 data() 메소드)
// 코드 통일성을 위해 reactive가 아닌 ref로 통일

// 등록된 계정 리스트. 띄어쓰기로 구분하여 uid pwd순으로 저장

const accountList = ref(JSON.parse(localStorage.getItem('accountList')))

console.log(accountList.value)

// 계정 아이디
const uid = ref('')
// 계정 비밀번호
const pwd = ref('')
// 현재 선택된 계정 (select 엘리먼트와 양방향 데이터 바인딩)
const selected = ref('')

// DOM 직접 제어용(ref)
const idInput = ref(null)

// 회원 정보
const member = ref({
  memberId : '',
  memberPw : ''
})

// 관리자 계정 접속 여부
const isAdmin = ref(false)

// watchers 옵션
// select 엘리먼트의 option을 클릭하여 selected 변수에 변화가 발생할 경우, 
// 공백을 기준으로 split하여 배열 생성 후 할당
watch(selected, (name) => {
  [uid.value, pwd.value] = name.split(' ')
})

// 계정 리스트 정보가 변경되면, localStorage에 갱신된 정보를 바인딩
watch(accountList, (currentState, prevState) => {
    localStorage.setItem('accountList', JSON.stringify(currentState))
    console.log('로컬스토리지 최신화 완료')
    }, 
    //배열이라 deep watch사용
    { deep: true })

// 회원 추가
function create() {
  if (hasValidInput()) {
    const account = `${uid.value} ${pwd.value}`

    // 중복된 ID의 계정일 경우 거부 처리
    for (var i = 0; i < accountList.value.length; i++) {
      const tempId = accountList.value[i].split(' ')[0]
      if (tempId == uid.value) {
        alert('이미 존재하는 아이디입니다.\r다른 아이디를 입력하십시오.')
        uid.value = ''
        idInput.value.focus()
        return
      }
    }

    accountList.value.push(account)
    alert(uid.value + ' 계정이 추가되었습니다.')
    uid.value = pwd.value = ''
   
  }
}

// 회원정보 갱신
function update() {
  if (hasValidInput() && selected.value) {
    const i = accountList.value.indexOf(selected.value)
    accountList.value[i] = selected.value = `${uid.value} ${pwd.value}`
    uid.value = pwd.value = ''
    alert('회원정보가 갱신되었습니다.')
  }
}

// 회원 삭제
function del() {
  if (selected.value) {
    const i = accountList.value.indexOf(selected.value)
    accountList.value.splice(i, 1)
    selected.value = uid.value = pwd.value = ''
    alert('회원 삭제가 완료되었습니다.')
  }
}

// 유효성 검증
function hasValidInput() {
  if (uid.value.trim() && pwd.value) {
    return true
  }
  else {
    alert('아이디 및 비밀번호를 입력해주십시오.')
    return false
  }
}
</script>

<template>

  <select size="10" v-model="selected">
    <option v-for="account in accountList">{{ account }}</option>
  </select>

  <label>아이디 : <input v-model="uid" ref="idInput"></label>
  <label>비밀번호 : <input v-model="pwd"></label>

  <div class="buttons">
    <button @click="create">회원 추가</button>
    <button @click="update">정보 갱신</button>
    <button @click="del">회원 삭제</button>
  </div>
  <br/>
  <button @click="$router.push('/')">처음으로</button>
  <br/>
  <hr/>
  <br/>


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