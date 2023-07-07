function IR(){
    let ts = new Date().getTime();
    function T(){
        return [
            <p className="category">Auto Playlists</p>,
            <div className="list new artists normal"><AH.P/></div>,
            <p className="category">Genres</p>,
            <div className="list new genres"><AH.G/></div>,
            Object.keys(ms.get('alid')).length ? [
                <p className="category">Albums</p>,
                <div className="list new albums"><AH.AL/></div>,
            ] : undefined,
            <p className="category">Artists</p>,
            <div className="list new artists"><AH.AR/></div>
        ]
    }
    function UP(){
        let k = Object.values(ms.get('pid'));
        return <MAI level="p" data={k}/>
    }
    return render(<T/>, display);
}