function warn(txt){
    let cover = document.createElement("div");
    display.appendChild(cover);
    cover.id = "cover";
    const modals = {
        no_aid: [
            "You don't have an artist account",
            <a href={`/myaccount/artist/claim/?continue=${encodeURIComponent(location.href)}`}><button>Claim Artist Account</button></a>,
            <a href={`/myaccount/artist/create/?continue=${encodeURIComponent(location.href)}`}><button>Create Artist Account</button></a>
        ],
        no_uid: [
            "You don't have an account",
            <a href="/login" className="no-ajax"><button>Login</button></a>,
            <a href="/signup" className="no-ajax"><button>Sign Up</button></a>
        ],
        aid_0: [
            "No artists accounts to claim",
            <a href={`/myaccount/artist/create/?continue=${encodeURIComponent(location.href)}`}><button>Create One</button></a>
        ],
        upload_error: [
            "AN ERROR OCCURED UPLOADING THE FILE"
        ],
        aid: [
            "You already have an artist account",
            <a onClick={() => AJAX('/')}><button>Cancel</button></a>
        ]
    }
    function R(){
        return [
            <div className="cover"></div>,
            <div className="body">
                <p onClick={() => unmount(cover)}><span className="symbol">warning</span>
                    {modals[txt]}
                </p>
            </div>
        ]
    }
    return render(<R/>, cover);
}
function IR(){
    function UR(){
        function D(){
            return [
            <thead style={{display: 'block', width: '100%'}}>
                <tr style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent : 'space-evenly', fontSize: 'larger'}}>
                    <th>Single</th><th>Album</th>
                </tr>
            </thead>,
            <tbody style={{display: 'block', width: '100%'}}>
                <tr style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent : 'space-evenly'}}>
                    <td onClick={() => AJAX('/upload/song')} className="symbol" style={{fontSize: '30vh'}}>queue_music</td>
                    <td onClick={() => AJAX('/upload/album')} className="symbol" style={{fontSize: '30vh'}}>podcasts</td>
                </tr>
            </tbody>
            ]
        }
        function M(){
            return (
                <tbody style={{display: 'block', width: '100%', textAlign: 'center', marginTop: '2%'}}>
                    <tr>
                        <th>Single</th>
                    </tr>
                    <tr>
                        <td onClick={() => AJAX('/upload/song')} className="symbol">queue_music</td>
                    </tr>
                    <tr style={{marginTop: '1%'}}>
                        <th>Album</th>
                    </tr>
                    <tr>
                        <td onClick={() => AJAX('/upload/albums')} className="symbol">podcasts</td>
                    </tr>
                    <style>{"tr{display: block;width:100%}tr>* {width: 100%; display: block; text-align: center}th{font-size:larger}td{font-size: 20vh !important}"}</style>
                </tbody>
            )
        }
        return (
            <nav style={{display: 'block', width: '100%', marginTop: '1%'}}>
                <table style={{display: 'block', width: '100%'}}>
                    <caption style={{fontWeight: 'bold', textAlign: 'center', display: 'block', width: '100%', fontSize: 'x-large', textTransform: 'uppercase', marginBottom: '1%', backgroundClip: "text", webkitBackgroundClip: "text", backgroundImage: "var(--audhub-gradient)", fontWeight: "bold", appearance: "none", webkitTextFillColor: "transparent"}}>Select your upload type</caption>
                    {wide ? <D/> : <M/>}
                    <style>{".symbol:not(navbar i.symbol){background-clip: text;-webkit-background-clip: text;background-image: var(--audhub-gradient);font-weight: bold;appearance: none;-webkit-text-fill-color: transparent;}"}</style>
                </table>
            </nav>
        )
    }
    if(ms.get('id')) {
        if(ms.get('id').aid) {
            render(<UR/>, document.querySelector("display"));
        } else warn('no_aid');
    } else warn('no_uid');
}