<!-- 
  <script>태그 내에 setup() 메소드를 작성하는 방법도 있으나 
  공식 문서에서는 <script setup>태그를 활용하는 것을 권장한다.
-->
<script setup>

//  컴포넌트 용량을 줄이기 위해 필요한 요소들만 import해서 사용한다.
import { ref, onMounted, watch } from 'vue'

// 반응형 데이터 선언 (Option API에서의 data() 메소드)
// 코드 통일성을 위해 reactive가 아닌 ref로 통일

// 등록된 계정 리스트. 띄어쓰기로 구분하여 uid pwd순으로 저장
const initAccountList = ['scott tiger', 'reto qwe123!@', 'admin 1234']
const accountList = ref(initAccountList)
// 계정 아이디
const uid = ref('')
// 계정 비밀번호
const pwd = ref('')
// 현재 선택된 계정 (select 엘리먼트와 양방향 데이터 바인딩)
const selected = ref('')

// DOM 직접 제어용(ref)
const idInput = ref(null)

// 로그온 여부
const isLogOn = ref(false)
// 회원 정보
const member = ref({
  memberId : '',
  memberPw : ''
})

// 관리자 계정 접속 여부
const isAdmin = ref(false)

// lifecycle hook : onMounted
// DOM이 생성된 후, localStorage에 등록된 계정정보 저장
onMounted(() => {
  // localStorage에서 기존에 바인딩되어있던 데이터 삭제 후, 계정리스트 바인딩
  localStorage.removeItem('accountList')
  localStorage.setItem('accountList', JSON.stringify(initAccountList))
  
  // 확인용
  console.log(JSON.stringify(initAccountList))
  console.log('로컬스토리지 초기화 완료')
})

// watchers 옵션
// select 엘리먼트의 option을 클릭하여 selected 변수에 변화가 발생할 경우, 
// 공백을 기준으로 split하여 배열 생성 후 할당
watch(selected, (name) => {
  [uid.value, pwd.value] = name.split(' ')
})

// 로그인
function login() {
  // 입력되어있는 아이디 및 비밀번호가 유효할 시, 로그인 로직을 수행
  if(hasValidInput()) {
    // 입력된 값을 accountList 배열과 동일한 형태로 가공
    const account = `${uid.value} ${pwd.value}`

    const i = accountList.value.indexOf(account)
    console.log(i)
    if (i > -1) {
      const temp = accountList.value[i]
      console.log(temp)
      const tempArr = temp.split(' ')
      console.log(tempArr)

      console.log('일치하는 계정 정보 확인')
      member.value.memberId = tempArr[0]
      console.log('회원 ID : ' + member.value.memberId)
      member.value.memberPw = tempArr[1]
      console.log('회원 PW : ' + member.value.memberPw)

      isLogOn.value = true
      console.log('로그온 : ' + isLogOn.value)

      alert(member.value.memberId + '님 안녕하세요!')
    }
    else {
      alert("아이디 및 비밀번호가 유효하지 않습니다.")
    }

  }
  
}


// 계정 생성
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
    alert(uid.value + '님, 가입을 환영합니다.')
    uid.value = pwd.value = ''
   
  }
}

// 계정 갱신
function update() {
  if (hasValidInput() && selected.value) {
    const i = accountList.value.indexOf(selected.value)
    accountList.value[i] = selected.value = `${uid.value} ${pwd.value}`
    uid.value = pwd.value = ''
    alert('계정 정보가 갱신되었습니다.')
  }
}

// 계정 삭제
function del() {
  if (selected.value) {
    const i = accountList.value.indexOf(selected.value)
    accountList.value.splice(i, 1)
    selected.value = uid.value = pwd.value = ''
    alert('회원 탈퇴가 완료되었습니다.')
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
    <button @click="create">회원가입</button>
    <button @click="update">정보갱신</button>
    <button @click="del">회원탈퇴</button>
    <button @click="login">로그인</button>
  </div>
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