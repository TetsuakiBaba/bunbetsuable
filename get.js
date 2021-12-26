function loadHTMLFile(_url, _regexp, _id) {
    return new Promise(function (resolve, reject) {

        var url = _url;
        var regexp = _regexp;
        var _html = 'get.php?regexp=' + regexp + '&url=' + url;
        var id = _id;
        //Httpリクエスを作る
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", _html, true);
        xmlhttp.onreadystatechange = function () {
            //とれた場合Idにそって入れ替え
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                //xmlhttp.responseXML
                //console.log(data);
                var elem = document.querySelector(id);
                elem.innerHTML += data;
                //console.log(document.readyState);
                console.log(_url)
                resolve(data);

            }
        }
        xmlhttp.send(null);
    }).then(function (data) {

    });
}

async function loadHTMLAsync(_urls, _regexp, _id) {
    console.log('await start');

    let table = document.createElement('table');
    table.classList = 'table table-hover';
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let tr = document.createElement('tr');
    thead.appendChild(tr);
    let ths = [
        document.createElement('th'),
        document.createElement('th'),
        document.createElement('th'),
        document.createElement('th')
    ];
    ths[0].innerHTML = "品目";
    ths[0].scope = 'col';
    ths[1].innerHTML = "分別区分";
    ths[1].scope = 'col';
    ths[2].innerHTML = "出し方";
    ths[2].scope = 'col';
    ths[3].innerHTML = "備考";
    ths[3].scope = 'col';

    for (th of ths) {
        tr.appendChild(th);
    }


    for (url of _urls) {
        await loadHTMLFile(url, _regexp, _id);
    }
    console.log('await end');


    let tables = document.querySelector('tmp').querySelectorAll('table');

    let my_tbody = document.createElement('tbody');
    table.appendChild(my_tbody);
    for (tbl of tables) {
        let tbodies = tbl.querySelectorAll('tbody');
        for (tbody of tbodies) {
            let trs = tbody.querySelectorAll('tr');
            for (tr of trs) {
                my_tbody.appendChild(tr);
            }
            //table.appendChild(tbody);
        }
    }
    document.querySelector('contents').appendChild(table);
    console.log(table);
    document.querySelector('tmp').hidden = true;
};


window.onload = function () {
    let page_array = [
        './cache/1004822.html', // あ
        './cache/1004823.html', // か
        './cache/1004824.html', // さ
        './cache/1004825.html', // た
        './cache/1004826.html', // な
        './cache/1004827.html', // は
        './cache/1004828.html', // ま
        './cache/1004829.html', // や
        './cache/1004830.html', // ら
    ]
    loadHTMLAsync(
        page_array,
        '@<table>(.*?)<\/table>@s',
        'tmp');

    console.log(document.querySelector('tmp').querySelectorAll('table'));
    //console.log(data);


}