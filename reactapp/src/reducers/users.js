export default function(tokenUser = '', action){
    if(action.type == 'tokenClick'){
        var tokenUserCopy = action.token
        return tokenUserCopy;
     } else {
       return tokenUser;
    }
 }