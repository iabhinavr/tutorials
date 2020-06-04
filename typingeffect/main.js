(function(){

    var i = 0;
    var s, h;

    var ts = document.querySelectorAll('.typingeffect');
    var ts_length = ts.length;

    for(let g = 0; g < ts_length; g++) {
        var string = ts[g].firstChild.textContent;
        var strlen = string.length;
    
        var letters = [];
        
        for(let k=0; k<strlen; k++) {
            var letter = string.slice(k, k+1);
            letters.push(letter);
        }
    
        ts[g].textContent = '';
        letters.forEach(function(l){
            var newSpan = document.createElement('span');
            newSpan.textContent = l;
            newSpan.classList.add('hide');
            ts[g].insertBefore(newSpan, null);
        });

        ts[g].style.display = "initial";
    }

    var group = 0;
    var t = ts[group].querySelectorAll('span');
    var length = t.length;


    var showTimer = function() {
        s = setInterval(function(){
            show();
        }, 150);
    };

    var hideTimer = function() {
        h = setInterval(function(){
            hide();
        }, 50);
    };
    
    showTimer();

    var show = function() {
        
        if(i < length ) {
            t[i].classList.remove('hide');
            i++;
        }
        else {
            i = length - 1;
            clearInterval(s);
            setTimeout(function(){
                hideTimer();
            }, 1000); 
        }
    };

    var hide = function() {

        if(i >= 0 ) {
            //console.log(i + ' h- ');
            t[i].classList.add('hide');
            i--;
        }
        else {
            i = 0;
            clearInterval(h);
            group++;
            if(group == ts_length) {
                group = 0;
            }
            t = ts[group].querySelectorAll('span');
            length = t.length;
            showTimer();
        }
    }

})();