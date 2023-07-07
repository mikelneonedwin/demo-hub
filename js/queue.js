function IR(){
    const x = sessionStorage.getItem("q") ? JSON.parse(sessionStorage.getItem("q")) : null;
    if(!x) return AJAX('/');   
    function T(){
        return <CSD stxt="Now Playing" dt={[{lv:"s",r:"las",d:x,s:"list"}]}/>
    }
    return render(<T/>, display)
}