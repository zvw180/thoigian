var x = true;
function myfunction(){
    if(x){
        document.getElementById('password').type = "text";
        x = false;
    }
else{
    document.getElementById('password').type = "password";
    x = true;
}};
function myta_ba()
{
    var user = document.getElementById("username").value;;
    var user1 = document.getElementById("password").value;
    // check user
    if(user == ""){
    document.getElementById("error").innerHTML = "Vui lòng nhập đầy đủ";
    }
    else{
    document.getElementById("error").innerHTML = "";
    }
    // check passs
    if(user1 == ""){
        document.getElementById("error1").innerHTML = "Vui lòng nhập đầy đủ";
        }
        else{
        document.getElementById("error1").innerHTML = "";}
        if(user && user1){
            location.replace("../60%/index2.html");
        }
             alert("Đăng Nhập Thành Công");
            setTimeout('Redirect()', 1000);
        

};

