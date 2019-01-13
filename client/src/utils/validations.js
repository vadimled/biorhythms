
const validations = (key, value) => {
  if(key === "userName"){
    if(value.length < 40 && value.length > 1)
      return false;
  }
  if(key === "email"){
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return false;
    }
  }
  if(key === "password"){
    if(value.length > 3)
      return false;
  }
  if(key === "gender"){
    if(value !== "")
      return false;
  }
  if(key === "birthday"){
    const emailRex = /\d{4}-\d{1,2}-\d{1,2}/;
    if (emailRex.test(value)) {
      return false;
    }
  }
  if(key === "weight"){
    if(parseFloat(value) <= 8.0 || !value){
       return false;
    }
  }
  return  true;
};

export default validations;
