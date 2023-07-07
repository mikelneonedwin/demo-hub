function IR(){
    function T(){
        let error = 0;try {if(!ms.get('likes')) return AJAX('/')}catch{error++}finally{if(error>0)return AJAX('/')};
        const av = Object.values(ms.get('likes', 'gid')).reduce((a,b) => a+b) / Object.values(ms.get('likes', 'sid')).length;
        const k1 = SRT(Object.entries(ms.get('likes', 'gid')).filter(a => a[1] >= av).sort((a,b) => b[1] - a[1]).map(a => a[0].gd('sid')).reduce((a,b) => {a.push(...b); return a}, []).slice(0,100), "s");
        return <CSD stxt="My Genres" itxt="Top Songs from your most listened genres" dt={[{lv: "s", r: "las", d: k1, s: "charts"}]}/>
    }
    return render(<T/>, display)
}