(function() {
var elements = {
    topbar: document.getElementById('top-bar'),
    searcharea: document.getElementById('search-area'),
    searchbar: document.getElementById('search-bar'),
    searchbutton: document.getElementById('search-button'),
    searchresults: document.getElementById("search-results"),
    sales: document.getElementsByClassName("sales")[0],
    foryou: document.getElementsByClassName("foryou")[0],
    popular: document.getElementsByClassName("popular")[0],
    location: document.getElementsByClassName("location")[0],
    language: document.getElementsByClassName("language")[0],
    signin: document.getElementsByClassName("signin")[0],
    showcasepage: document.getElementById("showcase-page")
};

function setDimensions() {
    elements.topbar.style.height = (window.innerHeight * 0.1) + "px";
    elements.showcasepage.style.height = (window.innerHeight * 1.9) + "px";
}

window.onload = function(event) {
    setDimensions();
};
window.onresize = function(event) {
    setDimensions();
};

elements.searchbar.addEventListener("click", function(event) {
    if(elements.searchresults.style.display !== "block") {
        elements.searchresults.style.display = "block";
        elements.searcharea.style.borderRadius = "4vmin 4vmin 0 0";
    } 
});
document.addEventListener("click", function(event) {
    if(elements.searchresults.style.display === "block" && elements.searchbar.matches(":hover") === false && elements.searchresults.matches(":hover") === false) {
        elements.searchresults.style.display = "none";
        elements.searcharea.style.borderRadius = "5vmin 5vmin 5vmin 5vmin";
    }
});

var items = [
    {
        name: "goPro",
        id: 0,
        media: ["img1.png", "vid1.mp3", "img2.png"],
        description: "Action Camera",
        tags: ["4k", "camera"],
        reccomendation: 100
    }, 
    {
        name: "iPhone",
        id: 0,
        media: ["img1.png", "vid1.mp3", "img2.png"],
        description: "Smart Phone",
        tags: ["4k", "Phone", "Apple"],
        reccomendation: 150
    }, 
    {
        name: "laptop",
        id: 0,
        media: ["img1.png", "vid1.mp3", "img2.png"],
        description: "Action Camera",
        tags: ["1080p", "laptop"],
        reccomendation: 130
    }, 
    {
        name: "Sweater",
        id: 0,
        media: ["img1.png", "vid1.mp3", "img2.png"],
        description: "Action Camera",
        tags: ["sweater", "clothing"],
        reccomendation: 10
    }, 
    {
        name: "keyboard",
        id: 0,
        media: ["img1.png", "vid1.mp3", "img2.png"],
        description: "Action Camera",
        tags: ["keyboard", "computer"],
        reccomendation: 40
    }, 
];

function sortItemsReccomend(items) {
    var arr = items;
    
    function partition(low, high) {
        var pivot = arr[high].reccomendation, i = low - 1, t1, t2;
        for(var j = low; j <= high - 1; j++) {
            if(arr[j].reccomendation < pivot) {
                i++;
                t1 = arr[i];
                arr[i] = arr[j];
                arr[j] = t1;
            }
        }
        t2 = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = t2;
        return(i + 1);
    }
    
    function quickSort(low, high) {
        var p;
        if(low < high) {
            p = partition(low, high);
            quickSort(low, p - 1);
            quickSort(p + 1, high);
        }
    }
    
    quickSort(0, arr.length - 1);
    
    return(arr.reverse());
}
function searchItems(items, search) {
    var pool = [];
    for(var i = 0; i < items.length; i++) {
        if(items[i].name.toUpperCase().includes(search.toUpperCase()) === true) {
            pool.push(items[i]);
        }    
    }
    pool = sortItemsReccomend(pool);
    return(pool);
}

elements.searchbar.addEventListener("input", function(event) {
    while(elements.searchresults.hasChildNodes()) {
        elements.searchresults.removeChild(elements.searchresults.firstChild);
    }
    var t1 = searchItems(items, elements.searchbar.value);
    var t2 = [];
    for(var j = 0; j < t1.length; j++) {
        t2[j] = document.createElement("button");
        t2[j].innerHTML = t1[j].name;
        t2[j].setAttribute("class", "search-result-button");
        elements.searchresults.appendChild(t2[j]);
    }
});

class table {
    constructor(items) {
        this.items = items;
        
    }
    display() {
        var box = document.createElement("div");
        box.style.height = "10%";
        box.setAttribute("class", "item-box");
        elements.showcasepage.appendChild(box);
        
        var section1 = document.createElement("div");
        section1.setAttribute("class", "item-box-section1");
        box.appendChild(section1);
        
        var section2 = document.createElement("div");
        section2.setAttribute("class", "item-box-section2");
        box.appendChild(section2);
        
        var section3 = document.createElement("div");
        section3.setAttribute("class", "item-box-section3");
        box.appendChild(section3);
        
        var leftArrow = document.createElement("button");
        leftArrow.setAttribute("class", "item-box-arrow");
        section1.appendChild(leftArrow);
        var rightArrow = document.createElement("button");
        rightArrow.setAttribute("class", "item-box-arrow");
        section3.appendChild(rightArrow);
    }
    addItem(item) {
        this.items.push(item);
    }
}

var t1 = new table(items);
t1.display();

})();