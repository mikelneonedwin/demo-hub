function IR(){
    const data = ov_g.map(a => a.name).sort().map(a => a.indb('gid'));
    render(
        [
            <p className="category">All Genres</p>,
            <div className="list new genres normal"><MAI data={data} type="obj" level="g"/></div>
        ], display
    )
}