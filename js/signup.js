async function validate(){
    function highlight(elem){
        elem.parentElement.style.outline = "blue solid 2px";
        elem.focus();
        elem.onkeydown = () => {
            code.innerText = "";
            elem.parentElement.style = "";
            elem.onkeydown = () => undefined;
            elem.onblur = () => undefined;
        }
    }
    let form = document.user;
    let code = document.querySelector("code");
    function error(msg){
        code.innerText = msg;
    }
    if(form.username.value.length < 4) {
        error("Username must be at least four characters long");
        highlight(form.username);
        return null;
    } else if(form.username.value.toLowerCase() != form.username.value){
        error("Username must be in lowercase");
        highlight(form.username);
        return null;
    } else if(form.username.value.includes(" ")){
        error("Username must not contain sapces");
        highlight(form.username);
        return null;
    }
    if(!isNaN(Number(form.contact.value))) {
        if(form.contact.value.length < 11){
            error("Invalid Phone Number");
            highlight(form.contact);
            return null;
        }
    } else {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!regex.test(form.contact.value)){
            error("Invalid Email");
            highlight(form.contact);
            return null;
        }
    }
    if(!form.name.value){
        error("Type in your name");
        highlight(form.name);
        return null;
    }
    if(form.pwd1.value.length < 6){
        error("Password should be at least six characters long");
        highlight(form.pwd1);
        return null;
    }
    if(form.pwd1.value != form.pwd2.value){
        error("Passwords don't match");
        highlight(form.pwd2);
        return null;
    }
    const info = {username: form.username.value.toLowerCase(), contact: form.contact.value, name: form.name.value, pwd: form.pwd1.value}
    api(1);
    const resp = await rtdb.add(info);
    api();
    if(resp.error.length > 0){
        code.innerText = resp.error[0];
        Object.values(form.children).reduce((a,b) => {a.push(...Object.values(b.children)); return a;}, []).forEach(a => {
            if(a.tagName){
                if(a.tagName.toLowerCase() == ("input")) {
                    a.onclick = () => code.innerText = "";
                }    
            }
        })  
    } else {
        if(resp.success){
            code.innerText = `Welcome to AudHub \n ${info.name}`;
            ck.set("id", resp.id);
            api(1);
            await rtdb.reload();
            api(0);
            setTimeout(() => location.href = '/', 1000);       
        } else {
            code.innerText = "AN ERROR OCCURED!";
        }
    }
}