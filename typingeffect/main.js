(function(){

    var i = 0;
    var s, h;

    var ts = document.querySelectorAll('.typingeffect');
    var ts_length = ts.length;

    /*
    split the text inside the class .typingeffect
    put each letter into a span element
    empty .typingeffect and insert the new span elements
    */

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

    /*
    to support multiple lines
    var group represents a single line
    */

    var group = 0;
    var t = ts[group].querySelectorAll('span');
    var length = t.length;

    /*
    show each letter at intervals
    */

    var showTimer = function() {
        s = setInterval(function(){
            show();
        }, 150);
    };

    /*
    start hiding each letter, once show() is finished
    once hide() is finished, var group, i are reset, and the loop continues
    */

    var hideTimer = function() {
        h = setInterval(function(){
            hide();
        }, 50);
    };

    /*
    initially, call showTimer()
    */
    
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