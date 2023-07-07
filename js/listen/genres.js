function IR(){
    let gid;
    const url = new URL(location);
    if(!url.searchParams.get("id")) return AJAX("/");
    else gid = url.searchParams.get("id");
    if(gid.gd() == undefined) return AJAX("/");
    else {
        document.title = `${gid.gd('name')} | AudHub`;
    }
    const k1 = gid.gd('sid').map(a => a.sd());
    const k3 = gid.gd('alid').map(a => a.ed());
    const dt = [{txt:"Singles",d:k1,r:"las",f:10,lv:"s",s:"charts"},];
    if(k3.length > 0) dt.push({txt:"Albums",d:k3,r:"las",f:10,lv:"al"})
    return render(<CSD stxt={gid.gd('name')} dt={dt}/>, display);
}