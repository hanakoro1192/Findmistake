//即時関数
(function(){
    'use strict';

    var stage = document.getElementById("stage");
    var ctx; //コンテクストを用いる
    var count = 0; //何回正解したのかをcountでもつようにする
    // var dim = 5; //分割数を変数でもつ
    var dim;
    var size;
    var asnswer = [];
    var isPlaying = true;

    function init(){ //initの処理
        dim = Math.floor(count / 3)　+ 2; //正解数が3,6,9...と増えていく　３回正解するごとに数を増やしてあげる
        size =  Math.floor(stage.width / dim);  //sizeの取得 math.floorで端数の切り捨て
        asnswer = [
            Math.floor(Math.random() * dim),
        Math.floor(Math.random() * dim) //ここが正解の色
        ];
    }

    function draw(){ //panelの描写
        var x;
        var y;
        var　offset = 2; //パネルに余白を付けて上げる
        var baseColor; //不正解の色
        var asnswerColor; //正解の色
        var hue;　//色相をランダム
        var lightness;　//50%のときの色

        hue = Math.random() * 360;　//hueを用いてランダムにする
        baseColor = 'hsl(' + hue + ', 80%, 50%)'; //countに応じてどんどん数を増やしていきたい
        lightness = Math.max(75 - count, 53);
        asnswerColor = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

        ctx.clearRect(0, 0, stage.width, stage.height);

        for(x = 0; x < dim; x++){　//xの範囲
            for(y = 0; y < dim; y++){　//yの範囲
                if(asnswer[0] === x && asnswer[1] === y){ //正解だけ色をつけるような配列にする
                    ctx.fillStyle = asnswerColor;　//正解の色
                }else{
                    ctx.fillStyle = baseColor;　//正解ではない色
                }
                ctx.fillRect(
                    // 0, 50, 100...
                    size * x + offset, //サイズの大きさ　//offsetをヅラしている
                    size * y + offset,
                    size - offset * 2,
                    size - offset * 2,
                );
                // ctx.fillStyle = '#000'; //正解のパネルだけ色を変えてあげる　　x,yでパネルの関係を描写　文字の色を黒にする
                // ctx.textBaseline = 'top'
                // ctx.fillText(x + ',' + y, size * x, size * y);　//座標を表す
            }
        }
    }

    if(typeof stage.getContext === 'undefined'){ //コンテクストを扱えないときの処理
        return;
    }
    ctx = stage.getContext('2d'); //取得できた場合
    // console.log(asnswer);

    stage.addEventListener('click', function(e) { //パネルをクリックして正解７日どうかの確認　eはeventの頭文字
        var rect;
        var x;
        var y;
        var replay = document.getElementById('replay'); //不正解のときにhiddenクラスを外す操作を行う
        if(isPlaying === false){
            return;
        }
        // console.log(e.pageX);
        // console.log(e.pageY); //クリックしたときの差表を検索
        rect = e.target.getBoundingClientRect(); //画面のスクロール寮を考慮してしまう　座標が取れる
        // console.log(e.pageX - rect.left - window.scrollX);
        // console.log(e.pageY - rect.top - window.scrollY);
        x = e.pageX - rect.left - window.scrollX; //何番目のものなのかは割って上げることで算出可能となる
        y = e.pageY - rect.top - window.scrollY;
        // console.log(Math.floor(x / size));
        // console.log(Math.floor(y / size));
        if(asnswer[0] === Math.floor(x / size) && asnswer[1] === Math.floor(y / size) ){　//正解かどうかをチェックして上げる
            // console.log('Hit!');
            count++;
            init(); //countに応じてdimなどを再計算してあげる
            draw();
        }else{
            alert('Your score:' + count);
            isPlaying = false;
            replay.className = ''; //不正解のときにhiddenクラスを外す操作を行う
        }
    });

    init();
    draw();
})();