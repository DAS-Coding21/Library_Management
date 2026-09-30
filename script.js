let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

let popularBookHeadingEl = document.getElementById("popularBookHeading");

let popularBooksContainerEl = document.getElementById("popularBooksContainer");

let noResultsFoundEl = document.getElementById("noResultsFound");

function displayEachBook(eachBook) {

    spinnerEl.classList.add("d-none");
    popularBooksContainerEl.classList.remove("d-none");
    popularBookHeadingEl.classList.remove("d-none");

    popularBooksContainerEl.classList.add("popular-books-container");

    let eachBookContainerEl = document.createElement("div");
    eachBookContainerEl.classList.add("each-book-container");

    let eachBookImgEl = document.createElement("img");
    eachBookImgEl.setAttribute("src", eachBook.imageLink);

    let eachBookAuthorEl = document.createElement("p");
    eachBookAuthorEl.textContent = eachBook.author;
    eachBookAuthorEl.classList.add("each-book-author");

    searchResultsEl.appendChild(popularBooksContainerEl);
    popularBooksContainerEl.appendChild(eachBookContainerEl);
    eachBookContainerEl.appendChild(eachBookImgEl);
    eachBookContainerEl.appendChild(eachBookAuthorEl);
}

function accessEachBook(resultItem) {
    for (let eachBook of resultItem) {
        displayEachBook(eachBook);
    }
}

function seachPopularBook() {
    if (event.key === "Enter") {

        let URL = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value;
        let OPTIONS = {
            method: "GET"
        };

        spinnerEl.classList.remove("d-none");

        fetch(URL, OPTIONS)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {

                let {
                    search_results
                } = jsonData;

                if (search_results.length === 0) {
                    spinnerEl.classList.add("d-none");
                    noResultsFoundEl.classList.remove("d-none");
                    popularBooksContainerEl.classList.add("d-none");
                    popularBookHeadingEl.classList.add("d-none");
                } else {
                    accessEachBook(search_results);
                }
            });
    }
}


searchInputEl.addEventListener("keydown", seachPopularBook);