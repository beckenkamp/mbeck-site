$(function () {

    var count = 0;

    var getDate = function(raw) {
        var monthNames = [
          "Janeiro", "Fevereiro", "Março",
          "Abril", "Maio", "Junho", "Julho",
          "Agosto", "Setembro", "Outubro",
          "Novembro", "Dezembro"
        ];

        var date = new Date(raw);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' de ' + monthNames[monthIndex] + ' de ' + year;
    };

    var cleanSnippet = function(string) {
        var str = string.split("Continue reading on");
        return str[0];
    };

    var oldUrlRss = 'http://mbeck.com.br/blog/feed/';
    var urlRss = 'https://blog.mbeck.com.br/feed';
    //var urlRss = 'https://medium.com/feed/@beckenkamp';
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
                           "<p>" + cleanSnippet(value.contentSnippet) + " - " + getDate(value.publishedDate) + "</p></header>";

                div.html(html);
                
                if (i%2 == 0)
                    div.addClass('6u 12u$(xsmall)');
                else
                    div.addClass('6u$ 12u$(xsmall)');

                count++;

                $("#result").append(div);
            }
        }
    });

    if (count<10) {
        $.ajax({
            type: "GET",
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(oldUrlRss),
            dataType: 'json',
            error: function (xhr) {
                var erro = xhr.responseText;
                console.log('Erro ao ler o feed: ' + erro);
            },
            success: function (xml) {
                values = xml.responseData.feed.entries;
                for(var i = 0; i < values.length; i++) {
                    var value = values[i];
                    var div = $("<article />");

                    var html = "<header><h4><a href='" + value.link + "'>" + value.title + "</a></h4>"+
                               "<p>" + getDate(value.publishedDate) + "</p></header>" +
                               "<p>" + cleanSnippet(value.contentSnippet) + "</p>";

                    div.html(html);

                    count++;
                    console.log(count);

                    if (count<=10) {
                        if (count%2 != 0)
                            div.addClass('6u 12u$(xsmall)');
                        else
                            div.addClass('6u$ 12u$(xsmall)');
                    
                        $("#result").append(div);
                    }
                }
            }
        });
    }
});