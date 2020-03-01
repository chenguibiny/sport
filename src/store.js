import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        coachId:1,
        memberId:2,
        coach:{
            username:"甄子丹",
            password:"123",
            birthday:"1998-01-23",
            sex:"男",
            phone:"15218968678",
        },
        member:{
            username:"陈桂槟",
            password:"123",
            birthday:"1998-01-23",
            sex:"女",
            phone:"15218968678",
            money:20000
        }
    },
    mutations:{
        getMemberId(state,id){
            state.memberId = id;
        },
        getCoachId(state,id){
            state.coachId = id;
        },
        changeMemberMessage(state,{username,password,birthday,sex,phone,money}){
            state.member["username"] = username;
            state.member["password"] = password;
            state.member["birthday"] = birthday;
            state.member["sex"] = sex;
            state.member["phone"] = phone;
            state.member["money"] = money;
        },
        changeCoachMessage(state,{username,password,birthday,sex,phone}){
            state.member["username"] = username;
            state.member["password"] = password;
            state.member["birthday"] = birthday;
            state.member["sex"] = sex;
            state.member["phone"] = phone;
        }

    },
    getters:{

    },
    actions:{

    },
    modules:{

    }
})
