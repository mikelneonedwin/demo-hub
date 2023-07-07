function IR(){
    function T(){
        const k1 = Object.values(ms.get('sid')).sort((a,b) => b.age - a.age).filter(a => !a.alid).slice(0,30);
        const k2 = Object.values(ms.get('alid')).sort((a,b) => b.age - a.age).slice(0,30);
        return <CSD stxt="New Release" dt={[
            {txt: "Singles", d: k1, lv: "s", r: "las", f: 5},
            k2.length ? {txt: "Albums", d: k2, lv: "ar", n: true, f: 6, r: "mai"} : undefined
        ].filter(a => a)}/>
    }
    return render(<T/>, display)
}