console.log('JsCmd 1.0.0');

var dispWidth = 120;
var dispHeight = 40;
var sWidth = 10;
var sHeight = 15;

var system = {
    getFs: () => {
        let result = [];
        let key = '';
        let i = 0;
        while (key != null) {
            key = localStorage.key(i++);
            result.push(key);
        }
        return result;
    },  
    run: run,
    print: (text, x, y) => {
        let ss = text.split('');
        for (let i = 0; i < ss.length; i++) {
            getSymbol(x + i, y).innerHTML = ss[i];
        }
    }
}

function getSymbol(x, y) {
    return document.getElementById(`s_${y}_${x}`);
}

function run(file) {
    let content = getFile(file + '.jse');
    eval(content);
}

function getFile(file) {
    return localStorage.getItem(file);
}

function initDisp() {
    let root = document.getElementById('cmd');
    for (let i = 0; i < dispHeight; i++) {
        for (let j = 0; j < dispWidth; j++) {
            let symbol = document.createElement('div');
            symbol.innerHTML = '0';
            symbol.id = `s_${i}_${j}`;
            symbol.style.top = (sHeight * i) + 'px';
            symbol.style.left = (sWidth * j) + 'px';
            symbol.style.width = sWidth + 'px';
            symbol.style.height = sHeight + 'px';
            symbol.style.position = 'absolute';
            symbol.style.backgroundColor = '#035';
            symbol.style.color = '#acf';
            root.appendChild(symbol);
        }
    }

    setTimeout(() => {
        for (let i = 0; i < dispHeight; i++) {
            for (let j = 0; j < dispWidth; j++) {
                document.getElementById(`s_${i}_${j}`).innerHTML = ' ';
            }
        }

        main();
    }, 1000);
}

function main() {
    console.log('Start main');

    initFs();

    run('system/kernel');
}

function initFs() {
    localStorage.setItem('system/kernel.jse', "console.log('run kernel'); system.print('JsCmd started', 0, 0);");
    localStorage.setItem('usr/settings.json', '{}');
    localStorage.setItem('ls.jse', "console.log(system.getFs())");
}

initDisp();