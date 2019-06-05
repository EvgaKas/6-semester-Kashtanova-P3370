function main() {
    var res = {
        Tag: null,
        Text: null,
        Count: 0
    }
    var test = document.getElementsByTagName('p')['0'].textContent;//получить строку 
    var elements = document.getElementsByTagName('p');
    for (var i = 0; i <= elements.length - 1; i++)//удаление 
    {
        elements[i].parentNode.removeChild(elements[i]); // удаляем элемент 
    }
    var teg = test.match(/:(.+?);/);//получение тега 
    if (teg == null) {
        console.log('Error');
        return;
    }
    res.Tag = teg[1].toLowerCase();
    var kolvo = test.match(/Count:(.+?);/);
    if (kolvo == null) {
        console.log('Error');
        return;
    }
    kolvo = Number(kolvo[1]);//получение кол-ва печатей 
    res.Count = kolvo;
    var text = test.match(/Text:(.+?);/); //текст 
    if (text == null) {
        console.log('Error');
        return;
    }
    res.Text = text[1];
    console.log(res);
    for (var i = 0; i < kolvo; i++)//создание 
    {
        var elem = document.createElement(teg[1]);
        elem.innerText = text[1];
        insertAfter(elem, document.getElementsByTagName('h1')[0]);
    }

}


function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

main();