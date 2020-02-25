//AJAX con Jquery
/* $('#btn-like').click(function (e){
    e.preventDefault();
    let imgId = $(this).data('id');

    $.post(`/images/${imgId}/like`)
        .done(data =>  {
            console.log(data);
            $('.likes-count').text(data.likes)
        });
}); */
const btnLike = document.getElementById('btn-like') || '';

$('#post-tweet').hide();
$('#btn-toggle-tweet').click(e => {
    e.preventDefault();
    $('#post-tweet').slideToggle();
});

function like(id){

    let tweetId  = id;
  
    let req = new XMLHttpRequest();

    req.open('POST', `/tweet/${tweetId}/like`, true)
    
    req.addEventListener('load', function () {
        
        if (req.status >= 200 && req.status < 400) {
            
            let likes = document.getElementById(id);
            console.log(likes);
            res = JSON.parse(req.responseText);
            likes.innerHTML = res.likes;
        }
    });
    
    req.send();
    
};