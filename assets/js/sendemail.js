$('form').submit(function(event) {
    console.log($( this ).serializeArray());
    $.post("../sendemail.php", $( this ).serializeArray());
    event.preventDefault();
});