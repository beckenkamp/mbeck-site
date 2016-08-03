$('form').submit(function(event) {
    $('#loading-message').show();
    $.post("../sendemail.php", $( this ).serializeArray())
        .then(function(success){
            $(this).trigger("reset");
            $('#success-message').show();
            $('#loading-message').hide();
        }, 
        function(error){
            $('#error-message').show();
            $('#loading-message').hide();
        });
    event.preventDefault();
});