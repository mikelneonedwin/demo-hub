function IR(){
    function T(){
        const [e, se] = useState(1);
        const gr = useRef(0);
        const ar = useRef(0);
        const al = useRef(0);
        const img = Array(2).fill(0).map(() => useRef(0));;
        const c = useRef(0);
        const tr = Array(30).fill(0).map(() => useRef(0));
        const fr = Array(30).fill(0).map(() => useRef(0));
        const mr = Array(30).fill(0).map(() => useRef(0));
        const ma = Array(30).fill(0).map(() => useRef(0));
        useEffect(() => {
            ar.current.value = ms.query("aid.name", "id.aid");
            img[0].current.onchange = function(){
                const reader = new FileReader;
                reader.onload = function(){
                    img[1].current.src = reader.result;
                    img[1].current.style.display = "block";
                }
                reader.readAsDataURL(img[0].current.files[0]);
            }
            ma.filter(a => a.current).map(a => a.current).forEach(a => a.value = ms.query("aid.name", "id.aid"));
        })
        function error(elem, txt){
          elem.style.outline = "blue solid 2px";
          elem.focus();
          elem.addEventListener("change", () => fixed());
          elem.addEventListener("keydown", () => fixed());
          c.current.innerText = txt;
          function fixed(){
              c.current.innerText = "";
              elem.style = "";
          }
          throw new Error("");
        }
        let info;
        async function validate(){
            try {
                Array.from(document.querySelectorAll("[required]")).forEach(a => {
                    if(!a.value) error(a, "You're required to fill this");
                });
                if(!ar.current.value.toLowerCase().includes(ms.query("aid.name", "id.aid").toLowerCase())) error(ar.current, "Your artist account is not included");
                if(img[1].current.naturalWidth != img[1].current.naturalHeight) error(img[1].current, "Image must be a perfect square");
                mr.filter(a => a.current).map(a => a.current).forEach(a => {
                    if(!a.files[0]) error(a, "Add audio file");
                })
                info = {aid: ar.current.value.comma(), name: al.current.value, genre: gr.current.value, img: img[0].current.files[0], e: Array(e).fill(0).map((a,b) => ({name: tr[b].current.value, url: mr[b].current.files[0], feat: fr[b].current.value, aid: ma[b].current.value.comma()}))};
                api(1); await rtdb.calid(info); api();
            }catch (error){console.error(error)}
        }
        const ent = Array(e).fill(0).map((a,b) => 
            <fieldset key={b}>
                <legend>Track {b+1}</legend>
                <label for="artist">Artist</label>
                <input ref={ma[b]} type="text" title="Seperate names with commas" placeholder="Seperate names with commas" required/>
                <label for="title">Title</label>
                <input ref={tr[b]} type="text" required/>
                <label for="featured-artists">Featured Artists:</label>
                <input ref={fr[b]} type="text" placeholder="Leave empty if none"></input>
                <label for="file">Music File:</label>
                <input ref={mr[b]} type="file" accept="audio/*" onchange="previewAudio(event)" required></input>
            </fieldset>
        );
        return [
            <form name="upload" method="post" enctype="multipart/form-data">
                <code ref={c} style={{fontSize: 'large', textTransform: 'uppercase', fontWeight: 'bold'}}></code>
                <label for="artist">Artists:</label>
                <input type="text" ref={ar} id="artist" title="Seperate names with commas" placeholder="Seperate names with commas" name="artist" required/>
                <label for="title">Album Title:</label>
                <input type="text" ref={al} id="title" name="title" required/>
                <label for="genre">Genre:</label>
                <select id="genre" ref={gr} name="genre" required>{Genres}</select>
                <label for="cover">Cover Art:</label>
                <input type="file" id="cover" ref={img[0]} name="cover" accept="image/*" required/>
                <img id="cover-preview" ref={img[1]} src="" alt="Cover Art Preview"/>
                {ent}
                <button type="button" onClick={() => se(e+1)}>Add</button>
                <button type="button" onClick={() => se(e-1)}>Remove</button>
                <button type="button" onClick={validate}>Upload</button>
            </form>,
            <div id="cover" style={{display:"none"}}>
                <div class="cover"></div>
                <div class="body">
                    <progress min="0" max="100"></progress>
                    <span></span>
                </div>
            </div>
        ]
    }
    if(my_id) {
        if(my_id.aid) return render(<T/>, display);
        else return warn('no_aid');
    } else return warn('no_uid');
}