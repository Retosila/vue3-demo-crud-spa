<script setup>
import router from '../router'
import { ref, watch } from 'vue'

// 등록된 계정 정보
const accountList = ref([])

// 계정 아이디
const uid = ref('')
// 계정 비밀번호
const pwd = ref('')

accountList.value = JSON.parse(localStorage.getItem('accountList'))
console.log(accountList.value)

const member = JSON.parse(localStorage.getItem('member'))
var memberId = ''
var memberPw = ''

if (member != null) {
    memberId = member._value.memberId
    memberPw = member._value.memberPw
}

// 계정 리스트 정보가 변경되면, localStorage에 갱신된 정보를 바인딩
watch(accountList, (currentState, prevState) => {
    localStorage.setItem('accountList', JSON.stringify(currentState))
    console.log('로컬스토리지 최신화 완료')
    }, 
    //배열이라 deep watch사용
    { deep: true })

function logOut() {
    alert('로그아웃되었습니다.')
    localStorage.removeItem('member')
    localStorage.setItem('isLogOn', 'false')
    router.push('/login')
}

function signOut() {
    const account = `${memberId} ${memberPw}`
    var cmd = confirm('회원 탈퇴하시겠습니까?')

    if (cmd == true) {
        const i = accountList.value.indexOf(account)
        accountList.value.splice(i, 1)
        localStorage.removeItem('member')
        localStorage.setItem('isLogOn', 'false')
        router.push('/login')
        alert('회원 탈퇴가 완료되었습니다.')
        return
    }
}

</script>


<template>
<h1> 홈 화면 </h1>
<h3>{{ memberId }}님, 안녕하세요!</h3>

<button @click="$router.push('/')">처음으로</button><br/>
<br/>
<button @click="logOut">로그아웃</button><br/>
<br/>
<button @click="signOut">회원탈퇴</button><br/>

</template>

<style>

</style>