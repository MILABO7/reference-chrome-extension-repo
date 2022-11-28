let references = []

const authorIn = document.getElementById("author-in")
const dateIn = document.getElementById("date-in")
const titleIn = document.getElementById("title-in")
const nameIn = document.getElementById("name-in")
const urlIn = document.getElementById("url-in")
const saveBtn = document.getElementById("save-btn")
const clearBtn = document.getElementById("clear-btn")
const listEl = document.getElementById("list-el")
const getUrlBtn = document.getElementById("getUrl-btn")
const referenceFromLocalStorage = JSON.parse(localStorage.getItem("references"))

if (referenceFromLocalStorage){
    references = referenceFromLocalStorage
    renderReference(references)
}

function renderReference(ref){
    let items = ""
    for (i=0; i < ref.length; i++){
        items += `
                <li>
                    ${ref[i]}
                </li>
        `  
    }
    listEl.innerHTML = items
    console.log(items)
}

getUrlBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let url = tabs[0].url
        urlIn.value = url
    });
})

saveBtn.addEventListener("click", function(){
    references.push(convertedString())
    renderReference(references)
    localStorage.setItem("references", JSON.stringify(references))
    authorIn.value = ""
    dateIn.value = ""
    titleIn.value = ""
    nameIn.value = ""
    urlIn.value = ""
})


clearBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    references = []
    renderReference(references)
})


function convertedString(){
    string = ``
    if ((authorIn.value.toLowerCase() === "none") || (authorIn.value === "")){
        string = `<em>${titleIn.value}</em>. (${dateIn.value}). ${nameIn.value}. <a href="${urlIn.value}" target="_blank">${urlIn.value}<a>`
    }
    else if((dateIn.value.toLowerCase() === "none") || (dateIn.value === "")){
        string = `${authorIn.value}. <em>${titleIn.value}</em>. ${nameIn.value}. <a href="${urlIn.value}" target="_blank">${urlIn.value}<a>`
    }
    else if((titleIn.value.toLowerCase() === "none") || (titleIn.value === "")){
        string = `${authorIn.value}. (${dateIn.value}). ${nameIn.value}. <a href="${urlIn.value}" target="_blank">${urlIn.value}<a>`
    }
    else if((nameIn.value.toLowerCase() === "none") || (nameIn.value === "")){
        string = `${authorIn.value}. (${dateIn.value}). <em>${titleIn.value}</em>. <a href="${urlIn.value} "target="_blank">${urlIn.value}<a>`
    }
    else{
        string = `${authorIn.value}. (${dateIn.value}). <em>${titleIn.value}</em>. ${nameIn.value}. <a href="${urlIn.value}" target="_blank">${urlIn.value}<a>`
    }
    return string
}