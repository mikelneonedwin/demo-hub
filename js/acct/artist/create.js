function IR(){
    function Create(){
        const imageRef = useRef(0);
        const imageFile = useRef(0);
        const validateRef = useRef(0);
        const artistRef = useRef(0);
        const genRef = useRef(0);
        const codeRef = useRef(0);
        useEffect(() => {
            imageFile.current.onchange = () => {
                const file = imageFile.current.files[0];
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const blob = new Blob([reader.result], { type: file.type });
                    imageRef.current.src = URL.createObjectURL(blob);
                })
                reader.readAsArrayBuffer(file);
            }
            validateRef.current.onclick = async () => {
                if(artistRef.current.value == ""){
                    error(artistRef.current, "Please type an actual stage name");
                    return false;
                }
                if(genRef.current.value == "") {
                    error(genRef.current, "Please select a genre");
                    return false;
                }
                if(imageFile.current.files.length == 0) {
                    error(imageFile.current, "Please upload an image for your profile");
                    return false;
                }
                if(imageRef.current.naturalWidth != imageRef.current.naturalHeight){
                    error(imageRef.current.parentElement, "Please select 1x1 Image \n must be a perfect square");
                    return false;
                }
                const info = {name: artistRef.current.value, genre: genRef.current.value, img: imageFile.current.files[0]};
                const resp = await rtdb.caid(info);
                if(resp.error.length > 0){
                    error(imageRef.current.parentElement, resp.error[0]);
                } else {
                    if(resp.success){
                        codeRef.current.innerText = `${info.name} is officially an Artist`;
                        const url = new URL(location);
                        await rtdb.reload();
                        if(url.searchParams.get("continue")){
                            setTimeout(() => AJAX(url.searchParams.get("continue")), 1000);
                        } else setTimeout(() => AJAX('/'), 1000);       
                    } else {
                        codeRef.current.innerText = "AN ERROR OCCURED!";
                    }
                }
            }
            function error(elem, txt){
                elem.style.outline = "blue solid 2px";
                elem.focus();
                elem.addEventListener("change", () => fixed());
                elem.addEventListener("keydown", () => fixed());
                codeRef.current.innerText = txt;
                function fixed(){
                    codeRef.current.innerText = "";
                    elem.style = "";
                }
            }
        })
        return (
            <form method="post" enctype="multipart/form-data">
                <img src="/favicon.png" ref={imageRef}/>
                <code ref={codeRef}></code>
                <label for="artist">Stage Name:</label>
                <input type="text" id="artist" ref={artistRef} placeholder="E.g Inversion & Big MAC, Sh3ddy Dickson" name="artist" required/>
                <label for="genre">Genre:</label>
                <select id="genre" ref={genRef} name="genre" required>{Genres}</select>
                <label for="cover">Profile Image:</label>
                <input type="file" id="cover" name="cover" accept="image/*" ref={imageFile} required/>
                <button type="button" ref={validateRef}>Create Artist Account</button>
              </form>
        )
    }
    if(ms.get('id')) {
        //user is signed in
        if(ms.get('id').aid) {
            //user is signed in but has a active account
            warn('aid');
        } else render(<Create/>, document.querySelector("display"));
    } else warn('no_uid');
}