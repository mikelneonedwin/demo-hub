function IR(){
    const data = ov_ar.map(a => a.name).sort().map(a => a.indb('aid'));
    render(
        [
            <p className="category">All Artists</p>,
            <div className="list new artists normal"><MAI data={data} level="ar"/></div>
        ], display)
}