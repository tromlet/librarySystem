const baseURL = "https://floating-woodland-64068.herokuapp.com/";
const libraryID = 154;

let createLibraryRequest = $.ajax({type:"POST",url:`${baseURL}libraries`,data:{library:{name:"My Secret Library"}}});

// Shorthand for $( document ).ready()
$(() => {
  console.log( "ready!" );
  $('button').click(function () {
    alert("jQuery alert!");
  });
});
