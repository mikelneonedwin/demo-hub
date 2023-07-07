function IR(){
    let wurl = new URL(location.href);
    if(wurl.searchParams.get("start")) start = wurl.searchParams.get("start");
    function T(){
        const f = useRef(0);
        useEffect(() => {
            let index = 0;
            try {f.current.style.backgroundImage = `url('${img[index]}')`}catch{};
            setInterval(() => {
                index++;
                if(!img[index]) index = 0;
                try {f.current.style.backgroundImage = `url('${img[index]}')`}catch{};    
            }, 3000)
        })
        const img = SRT(ms.get('sid')).map(a => a.img).reduce((a,b) => {if(!a.includes(b)) a.push(b); return a}, []);
        return [
            <div ref={f}>
                <p>Music Charts</p>
            </div>,
            <p className="category">Top Songs</p>,
            <div className="list charts"><LAS data={ms.get('sid')} limit="200"/></div>
        ];
    }
    return render(<T/>, display);
}