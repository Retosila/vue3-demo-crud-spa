<script setup>
import { ref, watch } from 'vue'
import router from '../router'

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

watch(accountList, (currentState, prevState) => {
    localStorage.setItem('accountList', JSON.stringify(currentState))
    console.log('로컬스토리지 최신화 완료')
    }, 
    //배열이라 deep watch사용
    { deep: true })

function signUp() {
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

        member.value.memberId = uid.value
        member.value.memberPw = pwd.value

      // 회원 객체 정보를 로컬스토리지에 바인딩
      localStorage.setItem('member', JSON.stringify(member))
      localStorage.setItem('isLogOn', 'true')

    accountList.value.push(account)
    alert(uid.value + '님, 환영합니다!')
    router.push('/home')
   
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

    <label>아이디 : <input v-model="uid" ref="idInput"></label>
    <label>비밀번호 : <input v-model="pwd" type="password"></label>
    <br/>
    <button @click="signUp">회원 가입</button>


</template>

<style>

</style>