let data = [];
const input = document.getElementById("input");
const save = document.getElementById("save");
const show = document.getElementById("show");
const list = document.getElementById("list");
const del = document.getElementById("delete");
const tab = document.getElementById("tab");
const msBrowser = window.browser || window.msBrowser;
let dataLocal = JSON.parse(localStorage.getItem("data"));
if (dataLocal) {
    data = dataLocal;
    render(data);

}

save.addEventListener("click", function() {
    data.push(input.value);
    input.value = "";
    localStorage.setItem("data", JSON.stringify(data));
    console.log(localStorage.getItem("data"));

})

function render(data) {
    let listItems = ""
    for (let i = 0; i < data.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${data[i]}'>
                    ${data[i]}
                </a>
                <img id='delete-${i}' src='P.png' alt='Delete'>
            </li>
        `;
        //Another method:
        // listItems += "<li><a target='_blank' href=' " +data_arr[i] + " '>"+ data_arr[i] +  "</a></li>"
    }
    list.innerHTML = listItems;

    // We could have also done list.innerHTML += "<li><a target='_blank' href=' " +data[i] + " '>"+ data[i] +  "</a></li>" 
    //But we didn't because it is more costly to manipulate DOM inside a loop 

    for (let i = 0; i < data.length; i++) {
        const deleteButton = document.getElementById(`delete-${i}`);
        deleteButton.addEventListener("click", function() {
            data.splice(i, 1); // remove the item from the data array
            localStorage.setItem("data", JSON.stringify(data)); // update local storage
            render(data); // re-render the list
        });
    }
}
show.addEventListener("click", function() {
    render(data)
});
del.addEventListener("click", function() {
    data = [];
    localStorage.clear();
    render(data);

})

function bar() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        console.log(currentTab.url);
        data.push(currentTab.url);
        localStorage.setItem("data", JSON.stringify(data)); // update local storage
        render(data);


    });

}
tab.addEventListener("click", function() {
    // Get the current active tab
    bar();
})