function IR(){
    function T(){
        let k1 = k_s.filter(a => !l_k_s.includes(a));
        let k2 = k_al.filter(a => !l_k_s.includes(a));
        let k3 = k_ar.filter(a => !l_k_s.includes(a));
        k1 = SRT(k1,"s").slice(0,100); k2 = SRT(k2,"al").slice(0,100); k3 = SRT(k3,"ar").slice(0,100);
        const r = [{txt:"Songs",d:k1,r:"las",f:5,lv:"s",s:"charts"}];
        if(k2.length > 0) r.push({txt:"Albums",d:k2,r:"las",f:6,fm:"mai",s:"charts",lv:"al"});
        if(k3.length > 0) r.push({txt:"Artists",d:k3,f:6,r:"las",fm:"mai",s:"charts",lv:"ar"});
        return <CSD stxt="Untouched" itxt="You haven't listened to these" dt={r}/>
    }
    return render(<T/>, display)
}