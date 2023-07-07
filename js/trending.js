function IR(){
    function T(){
        const k1 = Object.values(ms.get('sid')).sort((a,b) => b.recent - a.recent).slice(0,50);
        const k2 = Object.values(ms.get('alid')).sort((a,b) => b.recent - a.recent).slice(0,10);
        const k3 = Object.values(ms.get('aid')).sort((a,b) => b.recent - a.recent).slice(0,10);
        return <CSD dt={[
            {txt: "Songs", lv:"s", s: "list", r: "las", f:"5", d: k1},
            k2.length ? {txt: "Albums", lv: "al", r: "mai", d: k2} : undefined,
            {txt: "Artists", lv: "ar", r:"mai", d: k3}
        ].filter(a => a)} stxt="Trending" itxt="Users' most played this week"/>
    }
    return render(<T/>, display);
}