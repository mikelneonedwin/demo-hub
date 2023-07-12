function IR(){
    function T(){
        let error = 0;
        try {
            if(!ms.get('likes')) return undefined;
        } catch {
            error++;
        }
        finally {
            if(error > 0) return undefined;
        }
        let key1 = l_k_s.map(a => a.sd());
        let key2 = [];
        let key2Temp = [];
        ov_s.forEach(a => {
            key1.forEach(b => {
                if(a.gid == b.gid) key2Temp.push(a.sid);
                if(Array.isArray(b.aid)){
                    b.aid.forEach(c => {
                        if(a.feat) if(a.feat.includes(ms.get('aid', `${c}.name`))) key2Temp.push(a.sid);
                    })
                } else {
                    if(a.feat) if(a.feat.includes(ms_ar[b.aid].name)) key2Temp.push(a.sid);
                }
                if(b.feat) if(b.feat.includes(a.sid.sd('names'))) key2Temp.push(a.sid);
                if(a.alid && b.alid) if(a.alid == b.alid) key2Temp.push(a.sid);

                if(a.aid == b.aid) key2Temp.push(a.sid);
            })
        })
        //filter key2Temp;
        key2Temp = key2Temp.reduce((a, b) => {
            if (!a.includes(b)) {
            a.push(b);
            }
            return a;
        }, []);
        key2Temp = key2Temp.filter(a => {
            return !l_k_s.includes(a);
        })
        key2 = key2Temp.map(a => ms_s[a]).slice(0,50);
        const img = key2.map(a => a.img).reduce((a,b) => {if(!a.includes(b)) a.push(b); return a}, []);
        return <CSD dt={[
            {d: key2, r: "las", lv: "s", s:"list"}
        ]} stxt="For You" itxt="Based on your history"/> 
    }
    return render(<T/>, display);
}