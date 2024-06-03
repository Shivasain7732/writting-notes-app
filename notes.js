const addnote = document.querySelector("#addbtn");
const main = document.querySelector("#main");

addnote.addEventListener(
    "click",
    function() {
        addNote();
        // alert("hii");
    }
)

const saveNotes = () =>{
    const notes = document.querySelectorAll(".note textArea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    // console.log(data);

    if(data.length === 0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
}

addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-regular fa-floppy-disk"></i>
        <i class="trase fa-solid fa-trash"></i>     
    </div>
    <textarea>${text}</textarea>
    `
    note.querySelector(".trase").addEventListener(
        "click",
        function() {
            note.remove();
            saveNotes();
        }
    )
    
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes();
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout" , 
        function(){
            saveNotes();
        }
    )

    main.appendChild(note);
    saveNotes();
    // console.log("done");
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));

        if(lsNotes === null){
            addNote();
        }else{
            lsNotes.forEach(
                (lsnote) => {
                    addNote(lsnote);
                }
            )
        }
    }
)();