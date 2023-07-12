function IR(){
    function T(){
        return [
            <p className="category">Auto Playlists</p>,
            <div className="list new artists normal"><AH.P/></div>,
            <p className="category">Genres</p>,
            <div className="list new genres"><AH.G/></div>,
            ov_al.length ? [
                <p className="category">Albums</p>,
                <div className="list new albums"><AH.AL/></div>,
            ] : undefined,
            <p className="category">Artists</p>,
            <div className="list new artists"><AH.AR/></div>
        ]
    }
    return render(<T/>, display);
}