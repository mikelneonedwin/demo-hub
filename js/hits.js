function IR(){
    function T(){
        const k1 = Object.values(ms.get("sid")).map(a => {a.plays = a.streams + 2* a.downloads; return a}).sort((a,b) => b.plays - a.plays).slice(0,100);
        const k2 = Object.values(ms.get('alid')).map(a => {a.plays = a.streams + 2* a.downloads; return a}).sort((a,b) => b.plays - a.plays).slice(0,100);
        const k3 = Object.values(ms.get('aid')).map(a => {a.plays = a.streams + 2* a.downloads; return a}).sort((a,b) => b.plays - a.plays).slice(0,100);
        return <CSD stxt="Hits" itxt="Most streamed on AudHub" dt={[{txt:"Songs", d:k1, f:5, r:"las", lv:"s", s:"list"}, k2.length ? {txt:"Albums",d:k2,lv:"al",f:6,r:"las",s:"list",fm:"mai"} : undefined,{txt:"Artists",d:k3,lv:"ar",f:6,r:"las",s:"list",fm:"mai"}].filter(a => a)}/>
    }
    return render(<T/>, display)
}