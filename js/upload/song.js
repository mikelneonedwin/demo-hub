function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const preview = document.getElementById('cover-preview');
      preview.src = reader.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}
  
function previewAudio(event) {
    const reader = new FileReader();
    reader.onload = function() {
      const preview = document.getElementById('audio-preview');
      preview.src = reader.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}
function IR(){
  if(ms.get('id')) {
    if(ms.get('id', "aid")) {
        document.querySelectorAll("input")[1].value = ms.query("aid.name", "id.aid");
    } else warn('no_aid');
} else warn('no_uid');
}
async function validate(){
  const code = document.querySelector("code");
  const audio = document.querySelector("audio");
  const img = document.getElementById("cover-preview");
  function error(elem, txt){
    elem.style.outline = "blue solid 2px";
    elem.focus();
    elem.addEventListener("change", () => fixed());
    elem.addEventListener("keydown", () => fixed());
    code.innerText = txt;
    function fixed(){
        code.innerText = "";
        elem.style = "";
    }
    throw new Error("");
  }
  const form = document.upload;
  try {
    if(form.artist.value == "") form.artist.value = ms.query("aid.name", "id.aid");
    if(!form.artist.value.toLowerCase().includes(ms.query("aid.name", "id.aid").toLowerCase())) error(form.artist, "Your artist account is not included");
    if(form.title.value == "") error(form.title, "Type in a valid song title");
    if(form.genre.value.toLowerCase() == "select a genre" || form.genre.value.toLowerCase() == "") error(form.genre, "Add a valid genre");
    if(!form.cover.files[0]) error(form.cover, "Add cover art");
    if(img.naturalWidth != img.naturalHeight) error(img, "Image must be a perfect square");
    if(!form.file.files[0]) error(form.file, "Add audio file");
    const info = {aid: form.artist.value.comma(), name: form.title.value, genre: form.genre.value, feat: form.feat.value ? form.feat.value : undefined, img: form.cover.files[0], url: form.file.files[0], length : audio.duration}
    await rtdb.usid(info);
  } catch (err) {
    console.error(err);
  }
}