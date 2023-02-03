const textEl = document.querySelector("textarea");
const nameEl = document.querySelector(".file-name input");
const typeEl = document.querySelector(".save-as select");
const saveBtn = document.querySelector(".save-as-btn");
const fileInput = document.querySelector(".file-input");
const chooseBtn = document.querySelector(".choose");
const resetBtn = document.querySelector(".reset");

/*To choose the file and save its content in localStorage*/
chooseBtn.addEventListener("click",()=>{
    fileInput.click();
});
let file;
const loadText = ()=>{
    file = new FileReader();
    file.readAsText(fileInput.files[0]);
    file.onload=function(){
        textEl.value=file.result;
        localStorage.setItem("text",JSON.stringify(file.result));
    }
}
fileInput.addEventListener("change",loadText);
resetBtn.addEventListener("click",()=>{
    textEl.value=JSON.parse(localStorage.getItem("text"));
})

/*To change the type of the file*/
typeEl.addEventListener("change",()=>{
    const selectedOption = typeEl.options[typeEl.selectedIndex].text;
    saveBtn.innerHTML=`Save As ${selectedOption.split(" ")[0]} File`
})

/*To save the file*/
saveBtn.addEventListener("click",()=>{
    if(nameEl.value==""){
        return alert("Please enter name of the file");
    }
    var textBlob = new Blob([textEl.value], {type:typeEl.value});
    const fileURL = URL.createObjectURL(textBlob);
    const element = document.createElement("a");
    element.setAttribute("href",fileURL);
    element.setAttribute("download", nameEl.value);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
})

/*To clear the local storage*/
window.addEventListener("load",()=>{
    localStorage.clear();
})