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
        error("Must be at least four characters long");
        highlight(form.username);
        return null;
    }
    if(!isNaN(Number(form.username.value))) {
        if(form.username.value.length < 11){
            error("Invalid Phone Number");
            highlight(form.username);
            return null;
        }
    }
    if(form.pwd1.value < 6){
        error("Password should be at least six characters long");
        highlight(form.pwd1);
        return null;
    }
    const info = {key: form.username.value.toLowerCase(), pwd: form.pwd1.value};
    api(1); const resp = await rtdb.log(info); api(0);
    if(resp.error.length > 0){
        error(resp.error[0])
    } else {
        if(resp.success){
            error(`Welcome back ${resp.username}`);
            ck.set("id", resp.id);
            ms.clear();
            setTimeout(() => {
                if(location.search){
                    const url = new URL(location.href);
                    location.href = url.searchParams.get("continue");
                } else {
                    location.href = "/";
                }
            }, 1000);
        }
    }
}