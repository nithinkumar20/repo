// listen for for submit 
var save = document.getElementById('myform');

addEventListener('submit', saveBookmark);


//save bookmark
function saveBookmark(e) {
        // to collect the name and url
    var name = document.getElementById('siteName').value;
    var url = document.getElementById('urlName').value;
    
    var bookmark = {
        name: name ,
        url: url
    }
    
    /* how to use local storage
    localStorage.setItem('hi','jdcjlxncl');
    console.log(localStorage.getItem('hi'));
    localStorage.removeItem('hi');
    */
    
    //if empty submit
    
    if(!name || !url){
        alert("enter valid value");
        return false;
    }
    
    //test if bookmarks is null
    if(localStorage.getItem('bookmarks')===null){
        //init bookmarks
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //add to localstorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        //get bookmarks from LS
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add to array
        bookmarks.push(bookmark);
        //add to localstorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }   
    //refetch bookmarks
    
    fetchBookmarks();
    e.preventDefault();//to avoid the default nature if eventS
}

//delate url
function delateBookmark(url){
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    for(var i=0; i < bookmarks.length ; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    
     //add to localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); 
    
    //refetch bookmarks
    
    fetchBookmarks();
}

//fetch bookmarks and display
function fetchBookmarks(){
    //get bookmarks from LS
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarkResults = document.getElementById('bookmarkResults');
    
    //build output
    bookmarkResults.innerHTML='';
    for(var i=0; i < bookmarks.length ; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarkResults.innerHTML += '<div class="jumbotron well">'+
                                        '<h>' +name+
                                        '<span style="float : right"><a class="btn btn-info btn-sm" target="_blank" href="'+url+'" style="margin-right: 50px ">Visit</a>'+
                                        '<a onclick="delateBookmark(\''+url+'\')" class="btn btn-sm btn-danger" href="#">Delate</a>'+
                                        '</span></h>'+
                                     '</div><br/>';
    }
}