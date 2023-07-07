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
        //generates songs from other artists, related to what user listens to, ranking is done based on score values
        //..extract artists
        let key1 = Object.keys(ms.get('likes', 'sid')).map(a => ms.get('sid', a));
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
        Object.values(ms.get('aid')).forEach(a => {
            if(key2.includes(a.name)) {
                if(!Object.keys(ms.get('likes', 'aid')).includes(a.aid)) key3.push(a);
            }
        });
        if(key3.length == 0){
            //search for songs the liked artist was featured in 
            let key4 = Object.keys(ms.get('likes', 'aid')).map(a => ms.get('aid', a).name);
            Object.values(ms.get('sid')).forEach(a => {
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
        key3 = key3.map(a => ms.get('sid', a));
        return <CSD stxt="Recommendations" itxt="Based on your history" dt={[
            {d: key3, lv: "s", r: "las", s:"charts"}
        ]}/>
    }
    return render(<T/>, display);
}