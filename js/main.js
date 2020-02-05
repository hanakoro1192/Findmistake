//即時関数
(function(){
    'use strict';

    var stage = document.getElementById("stage");
    var ctx; //コンテクストを用いる
    var dim = 5; //分割数を変数でもつ

    function draw(){ //panelの描写
        var x;
        var y;
        var size = Math.floor(stage.width / dim); //sizeの取得 math.floorで端数の切り捨て
        for(x = 0; x < dim; x++){　//xの範囲
            for(y = 0; y < dim; y++){　//yの範囲
                ctx.fillStyle ='rgba(255, 0, 0,' + Math.random() + ')'; //色の指定
                ctx.fillRect(
                    // 0, 50, 100...
                    size * x, //サイズの大きさ
                    size * y,
                    size,
                    size,
                )
            }
        }
    }

    if(typeof stage.getContext === 'undefined'){ //コンテクストを扱えないときの処理
        return;
    }
    ctx = stage.getContext('2d'); //取得できた場合

    draw();
})();