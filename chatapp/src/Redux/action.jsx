const { GET_USER_NAME } = require("./actionType")


export const getLoggedUserName=(payload)=>{
    return {type:GET_USER_NAME,payload}
}