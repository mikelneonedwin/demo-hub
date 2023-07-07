function IR(){
    function T(){
        const f = useRef(0);
        useEffect(() => {
            let index = 0;
            try{f.current.style.backgroundImage = `url('${img[index]}')`}catch{};
            setInterval(() => {
                index++;
                if(!img[index]) index = 0;
                try{f.current.style.backgroundImage = `url('${img[index]}')`}catch{};
            }, 3000)
        })
        const img = SRT(ms.get('alid')).map(a => a.img).reduce((a,b) => {if(!a.includes(b)) a.push(b); return a}, []);
        return [
            <div ref={f}><p>Album Charts</p></div>,
            <p className="category">Top Albums</p>,
            <div className="list charts"><LAS level="al" data={ms.get('alid')} limit="200"/></div>
        ]
    }
    return render(<T/>, display);
}