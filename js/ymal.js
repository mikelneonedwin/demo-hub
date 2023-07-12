function IR(){
    function T(){
        let key1 = l_k_s.map(a => ms_s[a]);
        let key2 = key1.reduce((a,b) => {
            if(b.feat) {
                let feats = b.feat.replaceAll(" & ", ",").replaceAll(", ", ",").split(",");
                feats.forEach(c => {
                    if(!a.includes(c)) a.push(c);
                })
            }
            return a;
        }, []);
        let key3 = [];
        ov_ar.forEach(a => {
            if(key2.includes(a.name)) {
                if(!l_k_ar.includes(a.aid)) key3.push(a);
            }
        });
        if(key3.length == 0){
            let key4 = l_k_ar.map(a => ms_ar[a].name);
            ov_s.forEach(a => {
                if(a.feat) a.feat.replaceAll(" & ", ",").replaceAll(", ", ",").split(",").forEach(b => {
                    if(key4.includes(b)); key3.push(a.sid);
                })
            })
            if(key3.length == 0){
                return undefined;
            }
        }
        else {
            let key3Temp = [];
            key3.forEach(a => key3Temp.push(...a.sid));
            key3 = key3Temp;
        }
        key3 = key3.map(a => ms_s[a]);
        return <CSD stxt="Recommendations" itxt="Based on your history" dt={[
            {d: key3, lv: "s", r: "las", s:"charts"}
        ]}/>
    }
    return render(<T/>, display);
}