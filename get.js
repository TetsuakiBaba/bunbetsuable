async function loadHTMLFile(url, regexp, selector) {
    try {
        const response = await fetch(url);
        let html = await response.text();

        // HTMLから改行とタブを削除
        html = html.replace(/[\r\n\t]/g, '');

        // 2つ以上のスペースを1つに置き換える
        html = html.replace(/ {2,}/g, ' ');

        // 正規表現を使用して必要な部分を抽出
        const matches = html.match(new RegExp(regexp, 'g'));

        console.log(matches);
        // 抽出したHTMLを指定された要素に挿入
        if (matches) {
            const elem = document.querySelector(selector);
            matches.forEach(match => {
                elem.innerHTML += match;
            });
        }
    } catch (error) {
        console.error('Error fetching the HTML file:', error);
    }
}

function loadHTMLFileViaPHP(_url, _regexp, _id) {
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
                //console.log(_url)
                resolve(data);

            }
        }
        xmlhttp.send(null);
    }).then(function (data) {

    });
}

async function loadHTMLAsync(urls, regexp, selector, php = false) {
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

    for (const url of urls) {
        if (php) {
            await loadHTMLFileViaPHP(url, regexp, selector);
        }
        else {
            await loadHTMLFile(url, regexp, selector);
        }

    }

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
    //console.log(table);
    document.querySelector('tmp').hidden = true;
}

// ウィンドウがロードされたら、指定されたURLのHTMLファイルを読み込む
window.onload = function () {

    // Defaultではcacheから分別ページを読み込む

    // ----------------------------------------------
    // Javascriptのみでcache手元のHTMLファイルを読み込む場合
    const pageArray = [
        // ここにHTMLファイルのURLを追加
        './cache/1004822.html', // あ
        './cache/1004823.html', // か
        './cache/1004824.html', // さ
        './cache/1004825.html', // た
        './cache/1004826.html', // な
        './cache/1004827.html', // は
        './cache/1004828.html', // ま
        './cache/1004829.html', // や
        './cache/1004830.html' // ら
    ];
    const regexp = '<table>(.*?)</table>'; // ここに適切な正規表現パターンを設定
    // ----------------------------------------------


    // ----------------------------------------------
    // PHPを利用して、武蔵野市のゴミ分別ページから直接読み込む場合
    // const pageArray = [
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004822.html',  // あ
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004823.html', // か
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004824.html',  // さ
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004825.html', //  た
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004826.html', // な
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004827.html', // は
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004828.html',  // ま
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004829.html', // や
    //     'https://www.city.musashino.lg.jp/gomi_kankyo/gomi/gomishushubi_dashikata/dashikata/bumbetsu_50onjun/1004830.html' // ら
    // ]
    // const regexp = '@<table>(.*?)<\/table>@s';
    // ----------------------------------------------

    const selector = 'tmp'; // 結果を挿入する要素のセレクターを指定

    // phpを利用して、武蔵野市のゴミ分別ページから直接読み込む場合は php = true にする
    loadHTMLAsync(pageArray, regexp, selector, php = false);
};
