function keyTyped(event) {
    let keyword = document.getElementById('search_keywords').value;
    if (keyword.length > 0) {
        var trs = document.querySelectorAll('tr');
        for (tr of trs) {
            //console.log(tr);
            let tds = tr.querySelectorAll('td');
            //console.log(tds);
            if (tds.length > 0) {
                let str = {
                    hinmoku: tds[0].innerHTML,
                    kubun: tds[1].innerHTML,
                    dashikata: tds[2].innerHTML,
                    bikou: tds[3].innerHTML
                };
                //console.log(keyword, str.hinmoku.indexOf(keyword), str);
                if (str.hinmoku.indexOf(keyword) >= 0) {
                    tr.classList = '';
                    tr.classList.add('fadein');
                }
                else {
                    tr.classList = '';
                    tr.classList.add('fadeout');
                }
            }
            // if (str.question.indexOf(keyword) > 0 || str.answer.indexOf(keyword) > 0) {
            //     line.classList.add('fadein');
            //     line.classList.remove('fadeout');
            // }
            // else {
            //     line.classList.remove('fadein');
            //     line.classList.add('fadeout');
            // }
        }
    }
    else {
        var trs = document.querySelectorAll('tr');
        for (tr of trs) {
            if (tr.querySelector('td')) {
                tr.classList.remove('fadein');
                tr.classList.remove('fadeout');
                tr.classList.add('fadein');
            }
        }
    }

    //console.log(document.querySelector('table'));

}