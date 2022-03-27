import { GET_USER_NAME } from "../actionType"

const init={
    name:'',
    text:''
}

export const loginReducer=(store=init,{type,payload})=>{
    switch (type){
        case GET_USER_NAME:
            return {...store,name:payload}
            default: return {...store}
    }
}


