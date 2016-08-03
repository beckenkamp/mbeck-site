$(function () {

    var getCategory = function(category) {
        if (category == 'Tecnologia' || category == 'Informática') {
            return 'Desenvolvimento Web';
        } else if (category == 'Papo Light' || category == 'Empreendedorismo') {
            return 'Crônicas';
        } else if (category == 'Quadrinhos' || category == 'Ilustração') {
            return 'Arte';
        }
    };

    var urlRss = 'http://mbeck.com.br/blog/feed/';
    $.ajax({
        type: "GET",
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(urlRss),
        dataType: 'json',
        error: function (xhr) {
            var erro = xhr.responseText;
            alert('Erro ao ler o feed: ' + erro);
        },
        success: function (xml) {
            $("#result").html('');
            
            values = xml.responseData.feed.entries;
            for(var i = 0; i < values.length; i++) {
                var value = values[i];
                var div = $("<article />");

                var html = "<header><h4><a href='" + value.link + "'>" + value.title + "</a></h4>"+
                           "<p>" + getCategory(value.categories[0]) + "</p></header>" +
                           "<p>" + value.contentSnippet + "</p>";

                div.html(html);
                
                if (i%2 == 0)
                    div.addClass('6u 12u$(xsmall)');
                else
                    div.addClass('6u$ 12u$(xsmall)');

                $("#result").append(div);
            }    
        }
    });
});