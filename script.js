let bookLookApp = function () {
    let fetch = function (input) {
        $.ajax({
            method: "get",
            url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + input,
            success: function (data) {
                _createBook(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    };
    let _createBook = function (bookData) {
        let title, author, description, image;
        if (bookData.items) {
            title = bookData.items[0].volumeInfo.title;
            author = bookData.items[0].volumeInfo.authors[0];
            description = bookData.items[0].volumeInfo.description;
            if (bookData.items[0].volumeInfo.imageLinks) {
                image = bookData.items[0].volumeInfo.imageLinks.thumbnail;
            } else {
                image = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            };
        } else {
            title = "No Data Available";
            author = "No Data Available";
            description = "No Data Available";
        }
        const booksHandlebar = {
            title: title,
            author: author,
            description: description,
            image: image
        }
        let source = $('#book-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(booksHandlebar);
        $("#header").after(newHTML);
    }
    return {
        fetch: fetch,
    };
};
let app = bookLookApp();
$('#search').on('click', function () {
    let input = $('.form-control').val();
    app.fetch(input);
});
