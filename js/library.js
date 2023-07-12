function IR(){
    function T(){
        const x = l_ms_s;
        const k = Object.entries(x).sort((a,b) => b[1] - a[1]).map(a => a[0].sd()).slice(0,50);
        return <CSD itxt="Your most played songs on this device" dt={[
            {lv: "s", d: k, s: "list", r: "las"}
        ]} stxt="Library"/>
    }
    return render(<T/>, display);
}