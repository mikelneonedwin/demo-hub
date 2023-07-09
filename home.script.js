function IR(){
    if(!Object.values(ms.get("sid")).length) return location.href = '/signup/';
    function T(){
        return [
            <p className="category"><a href="/artists/">Artists <span className="symbol">arrow_forward_Ios</span></a></p>,
            <div className="list new artists"><AH.AR/></div>,
            Object.keys(ms.get('alid')).length ? [
                <p className="category"><a href="/albums/">Albums <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new albums"><AH.AL/></div>
            ] : undefined,
            <p className="category"><a href="/new/">New <span className="symbol">arrow_forward_Ios</span></a></p>,
            <div className="list new"><AH.N/></div>,
            <p className="category"><a href="/genres/">Genres <span className="symbol">arrow_forward_Ios</span></a></p>,
            <div className="list new genres"><AH.G/></div>,
            <p className="category"><a href="/playlists/">Playlists <span className="symbol">arrow_forward_Ios</span></a></p>,
            <div className="list new playlist"><AH.P/></div>,
            <p className="category"><a href="/charts/songs">Top Songs <span className="symbol">arrow_forward_Ios</span></a></p>,
            <div className="list charts">
                <LAS data={ms.get("sid")} level="s" limit={5}/>
                <div data-old-grad onClick={() => AJAX('/charts/songs')}><p className="symbol nav">navigation</p></div>
            </div>
        ]
    }
    return render(<T/>, display);
}