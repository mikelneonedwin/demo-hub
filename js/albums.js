function IR(){
    function T(){
        const dt = ov_al.map(a => a.name).sort().map(a => a.indb('alid'));
        return [
            <p className="category">All Albums</p>,
            <div className="list new artists normal"><MAI data={dt} level="al"/></div>
        ]
    }
    return render(<T/>, display);
}