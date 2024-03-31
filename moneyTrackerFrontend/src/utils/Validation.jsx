export const validateEmail = (email) => {
    if(!email)return false

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).trim().toLowerCase());
}

export const validatePassword = (password)=>{
    if(!password || !password.trim())return {
        correct : true,
        message : ""
    };
  
    password = password.trim()

    if(password.length < 8)return {
        correct : false,
        message : "password should be atleast 8 characters long"
    };

    const upper = /[A-Z]/;
    const special_characters = /[^\w ]/

    if(password.search(upper)==-1)return {
        correct: false,
        message:"password should contain atleast one uppercase character"
    };

    if(password.search(special_characters)==-1)return {
        correct: false,
        message:"password should contain atleast one special character"
    };

    return {
        correct:true,
        message:""
    }
}

export const isEmptyField = (fieldValue)=> !fieldValue || !fieldValue.trim()

export function updateFieldError(name,value,error,setError){
    // error contains the previous error state
    if(isEmptyField(value?String(value):"")){
        (!error[name] || !error[name].isError) && setError(prev=>{return {...prev,[name]:{isError:true}}})
        return true
    }else{
        (!error[name] || error[name].isError) &&  setError(prev=>{return {...prev,[name]:{isError:false}}})
    }

    return false
}