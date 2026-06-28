const API = "http://localhost:5000";

async function saveNote(){

    const text = document.getElementById("note").value;

    await fetch(API+"/notes",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text})
    });

    document.getElementById("note").value="";

    loadNotes();
}

async function loadNotes(){

    const res = await fetch(API+"/notes");

    const notes = await res.json();

    const div=document.getElementById("notes");

    div.innerHTML="";

    notes.forEach(note=>{

        div.innerHTML += `
        <div class="note">
            ${note.text}
        </div>
        `;

    });

}

loadNotes();