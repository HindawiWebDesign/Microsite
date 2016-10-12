// To add Institution domain to Hindawi.com institutions link
$('#button').click(function(e) {  
       var inputvalue = $("#input").val();
       $("#institution-articles").attr("action", "https://www.hindawi.com/institutions/"+inputvalue );
});