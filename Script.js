var data = {
    items: [
        {
            name: "Air Jordan",
            recommendation: 100,
            id: 0,
            provider: "Jordan",
            price: "$125",
            thumbnail: "https://th.bing.com/th/id/OIP.YdPRYTHLB6QtlWQokbLiQgHaFS?w=236&h=180&c=7&r=0&o=5&pid=1.7"
        },
        {
            name: "iPhone 14 Pro Max",
            recommendation: 130,
            id: 1,
            provider: "Apple",
            price: "$1099.99",
            thumbnail: "https://th.bing.com/th/id/OIP.G-9VRxHhOl44omIC0WPi1AHaIw?w=162&h=192&c=7&r=0&o=5&pid=1.7"
        },
        {
            name: "Table",
            recommendation: 20,
            id: 2,
            provider: "IKEA",
            price: "$325",
            thumbnail: "https://th.bing.com/th/id/OIP.9LMo9_n3uPA5fqs1sngbCwHaHa?w=199&h=199&c=7&r=0&o=5&pid=1.7"
        },
        {
            name: "GE67 HX Gaming Laptop",
            recommendation: 200,
            id: 3,
            provider: "MSI",
            price: "3499.99",
            thumbnail: "https://www.bing.com/th?id=OP.Z%2bWWip1gTLwUcQ474C474&o=5&pid=21.1&w=128&h=128&qlt=100&dpr=1&bw=6&bc=FFFFFF&c=17"
        },
        {
            name: "Charging Cord",
            recommendation: 70,
            id: 4,
            provider: "Apple",
            price: "$19.00",
            thumbnail: "https://th.bing.com/th/id/OIP.BdQ_1wpnX8ZOGekW5qUQfQAAAA?w=197&h=196&c=7&r=0&o=5&pid=1.7"
        }
    ]
};

function sortRecomendation(array) {
    var arr = array;

    function partition(low, high) {
        var pivot = arr[high].reccomendation, i = low - 1, t;
        for(var j = low; j <= high - 1; j++) {
            if(arr[j].reccomendation < pivot) {
                i++;
                t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }
        t = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = t;
        return(i + 1);
    }

    function quickSort(low, high) {
        if(low < high) {
            var i1 = partition(low, high);
            quickSort(low, i1 - 1);
            quickSort(i1 + 1, high);
        }
    }

    quickSort(0, arr.length - 1);
    arr.reverse();

    return(arr);
}
function searchItems(input, items) {
    const searchInput = input.toLowerCase();

    const filteredItems = items.filter(item => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(searchInput) && item.recommendation > 0;
    });
  
    const sortedItems = filteredItems.sort((a, b) => {
      if (a.recommendation > b.recommendation) return -1;
      if (a.recommendation < b.recommendation) return 1;
  
      const aIndex = a.name.toLowerCase().indexOf(searchInput);
      const bIndex = b.name.toLowerCase().indexOf(searchInput);
  
      if (aIndex < bIndex) return -1;
      if (aIndex > bIndex) return 1;
  
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
  
      return 0;
    });
  
    return sortedItems;
}

var elements = {
    topbar: document.getElementById('top-bar'),
    searchbar: document.getElementById('top-bar-search-bar'),
    searchexit: document.getElementById('top-bar-search-bar-exit'),
    searchresults: document.getElementById('search-results'),
    menubutton: document.getElementById('top-bar-menu-button'),
    menu: document.getElementById('menu'),
    featuredpage: document.getElementById('featured-page')
};

function convertPrice(string) {

}

function itemThumbnailView(item) {
    var shell = document.createElement("div");
    shell.setAttribute("class", "featured-page-item");
    elements.featuredpage.appendChild(shell);

    var image = document.createElement("img");
    image.src = item.thumbnail;
    image.setAttribute("class", "featured-page-item-image");
    shell.appendChild(image);

    var name = document.createElement("div");
    name.innerHTML = item.name;
    name.setAttribute("class", "featured-page-item-name");
    shell.appendChild(name);

    var price = document.createElement("div");
    price.innerHTML = item.price;
    price.setAttribute("class", "featured-page-item-price");
    shell.appendChild(price);
}

function setDimensions() {
    elements.topbar.style.height = Math.max(window.innerHeight * 0.1, 75) + "px";
    elements.featuredpage.style.height = window.innerHeight + "px";
    elements.searchresults.style.height = "calc(" + window.innerHeight + "px - " + Math.max(window.innerHeight * 0.1, 75) + "px + 1px)";
    elements.menu.style.height = "calc(" + window.innerHeight + "px - " + Math.max(window.innerHeight * 0.1, 75) + "px + 1px)";
}
function updateFeaturedPage() {
    var t2 = sortRecomendation(data.items);
    for(var i = 0; i < Math.min(t2.length, 6); i++) {
        itemThumbnailView(t2[i]);
    }
}

window.onload = function(event) {
    setDimensions();
    updateFeaturedPage();
};
window.onresize = function(event) {
    setDimensions();
}

elements.menubutton.addEventListener("click", function(event) {
    if(elements.menu.style.display === "none") {
        elements.menubutton.style.transform = "rotateZ(270deg)";
        elements.menubutton.style.backgroundSize = "125%";
        elements.menu.style.display = "flex";
        if(elements.searchresults.style.display !== "none") {
            elements.searchresults.style.display = "none";
        }
    } else {
        elements.menu.style.display = "none";
        elements.menubutton.style.transform = "rotateZ(0deg)";
        elements.menubutton.style.backgroundSize = "100%";
    }
});
elements.searchbar.addEventListener("click", function(event) {
    elements.searchresults.style.display = "block";
    elements.searchbar.style.width = "100%";
    elements.searchbar.style.height = "100%";
    elements.searchbar.style.borderRadius = "0";
    elements.searchbar.style.border = "none";
    elements.searchexit.style.display = "block";
    elements.menubutton.style.display = "none";
    elements.menu.style.display = "none";
    elements.menubutton.style.transform = "rotateZ(0deg)";
    elements.menubutton.style.backgroundSize = "100%";
});
elements.searchexit.addEventListener("click", function(event) {
    elements.searchresults.style.display = "none";
    elements.searchbar.style.width = "calc(80% - 60px)";
    elements.searchbar.style.height = "60%";
    elements.searchbar.style.borderRadius = "40px";
    elements.searchbar.style.border = "1px solid lightgrey";
    elements.searchbar.value = "";
    elements.searchexit.style.display = "none";
    elements.menubutton.style.display = "block";
});

elements.searchbar.addEventListener("input", function(event) {
    while(elements.searchresults.firstChild) {
        elements.searchresults.removeChild(elements.searchresults.firstChild);
    }
    var t1 = [];
    var t2 = searchItems(elements.searchbar.value, data.items);
    for(var i = 0; i < Math.min(t2.length, 10); i++) {
        t1[i] = document.createElement("div");
        t1[i].innerHTML = t2[i].name;
        t1[i].setAttribute("class", "search-item");
        elements.searchresults.appendChild(t1[i]);
    }
});
