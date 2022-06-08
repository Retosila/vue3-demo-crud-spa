<script setup>

import { onMounted } from 'vue'

// 가입되어있는 회원 정보
const accountList = ['scott tiger', 'reto qwe123!@', 'admin 1234']

// DOM이 생성되면, 로컬스토리지에 있던 기존 데이터를 제거하고 새로운 계정 정보 바인딩
// 임시 조치로, Pinia 및 EventBus를 활용해 다시 구현할 것
onMounted(() => {

    if (localStorage.getItem('accountList') == null) {
        localStorage.setItem('accountList', JSON.stringify(accountList))
        console.log(JSON.stringify(accountList))
        console.log('로컬스토리지 초기화 완료')
    }

    else {
        console.log('바인딩 데이터 존재')
        console.log(JSON.parse(localStorage.getItem('accountList')))
        
    }
  
})

</script>

<template>

<h1>Vue 3 CRUD Demo</h1>
<div>
<router-link to="/login" class="rl">START</router-link>
</div>

</template>

<style>

* {
    font-size: inherit;
}

a {
    margin : auto;
    display : block;
}

a:visited {
    text-decoration: none;
    color : black;
}

h1 {
    text-align : center;
    font-size : 3em;
    font-family : Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.rl {
    text-align : center;
    font-size : 1.5em;
    font-family : Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

</style>