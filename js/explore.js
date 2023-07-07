function IR(){
    const data = sessionStorage.getItem("e") ? JSON.parse(sessionStorage.getItem("e")) : (function(){const a = Object.values(ms.get('sid')).shuffle(); sessionStorage.setItem("e", JSON.stringify(a.map(a => a.sid))); return a})();
    const total = data.length;
    function R(){
        const [num, snum] = useState(30);
        return [
                <p class="category">My Music</p>,
                <div class="list charts">
                    <LAS data={data} limit={num} chart={false}/>
                    {num < total ? <div data-old-grad onClick={() => snum(num + 30)}><p className="symbol nav">navigation</p></div> : undefined}
                </div>
            ];
    }
    render(<R/>, display)
}