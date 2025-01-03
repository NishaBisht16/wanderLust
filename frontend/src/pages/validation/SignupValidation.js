export default function validation(user){
    let errors={}

    const username_pattern = /^[A-Za-z]+([ '-][A-Za-z]+)*$/; 
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


     if(user.username==''){
        errors.username="Username required"
     }
     else if(!username_pattern.test(user.username))
     {
        errors.username="Invalid Username"
     }
     if(user.email=='')
     {
        errors.email="Email required"
     }
     else if(!email_pattern.test(user.email))
     {
        errors.email="Invalid Email"
     }

     if(user.password=='')
     {
        errors.password="Password required"
     }
     else if(!password_pattern.test(user.password))
     {
        errors.password="Password have must be 8 characters"
     }

     return errors;
}