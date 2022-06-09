import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccount = defineStore("account", () => {
  // defineStore의 first argument는 스토어의 논리적 이름으로 지정
  // defineStore를 할당하는 상수의 명칭은 use + 스토어의 논리명 (camel case 준수)

  /*******************************************************************
   *
   *                              STATE
   *
   *******************************************************************/

  // 회원 계정 리스트
  const accountList = ref(["initRequired"]);
  // 회원 객체
  const member = ref({
    uid: "",
    pwd: "",
    name: "",
  });
  // 로그인 확인
  const isLogOn = ref(false);

  /*******************************************************************
   *
   *                              ACTIONS
   *
   *******************************************************************/

  // 계정 초기화
  function initAccount() {
    accountList.value = [
      "scott tiger 스콧",
      "reto qwe123!@ 레토",
      "admin 1234 관리자",
    ];
  }

  // 계정 추가
  function addAccount(uid, pwd, name) {
    const account = `${uid} ${pwd} ${name}`;
    accountList.value.push(account);
  }

  // 회원 정보 제거
  function clearMember() {
    delete member.value;
    isLogOn.value = false;
  }

  /*******************************************************************
   *
   *                              GETTERS
   *
   *******************************************************************/

  return { accountList, member, isLogOn, initAccount, addAccount, clearMember };
});
