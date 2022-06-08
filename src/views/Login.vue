<script setup>
//  컴포넌트 용량을 줄이기 위해 필요한 요소들만 import해서 사용한다.
import { ref } from 'vue'
// programmatic navigation 방식으로 router를 활용하려면 별도의 컴포넌트에서 import 필요
import router from '../router'


// 등록된 계정 정보
const accountList = ref([])

// 계정 아이디
const uid = ref('')
// 계정 비밀번호
const pwd = ref('')

// 회원 정보
const member = ref({
  memberId : '',
  memberPw : ''
})


accountList.value = JSON.parse(localStorage.getItem('accountList'))
console.log(accountList.value)


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

      member.value.memberId = tempArr[0]
      console.log('회원 ID : ' + member.value.memberId)
      member.value.memberPw = tempArr[1]
      console.log('회원 PW : ' + member.value.memberPw)

      // 회원 객체 정보를 로컬스토리지에 바인딩
      localStorage.setItem('member', JSON.stringify(member))
      localStorage.setItem('isLogOn', 'true')

      // admin 계정으로 로그인한 경우
      if (member.value.memberId == 'admin') {
        router.push('/admin')
        alert('관리자 계정 감지 : 관리자 페이지로 진입합니다.')
        return
      }

      router.push('/home')
      alert(member.value.memberId + '님 안녕하세요!')
      

    }
    else {
      alert("아이디 및 비밀번호가 유효하지 않습니다.")
    }

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

function toAdmin() {
  router.push('/admin');
}


</script>



<template>

  <br/>
  <hr/>
  <br/>

  <label>ID : <input v-model="uid" type="text"></label><br/>
  <label>PW : <input v-model="pwd" type="password"></label>

  <br/>

  <div class="buttons">
    <button @click="login">로그인</button><br/>
    <br/>
    <button @click="$router.push('/signup')">회원가입</button>

  </div>
  <br/>
  <button @click="$router.push('/')">처음으로</button>
  <br/>

  <br/>
  <hr/>
  <br/>


</template>

<style>
* {
  text-align : center;
  font-size: inherit;
  font-family : Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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
  margin : auto;
  display : block;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>