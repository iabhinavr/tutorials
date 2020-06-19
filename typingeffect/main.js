(function(){

    var i = 0;
    var s, h;

    var te_container = document.querySelector('.te-container');
    var ts = document.querySelectorAll('.typingeffect');
    var ts_length = ts.length;

    if(!ts_length) {
        return;
    }

    /*
    split the text inside the class .typingeffect
    put each letter into a span element
    empty .typingeffect and insert the new span elements
    */

    var ts_height = 0;

    for(let g = 0; g < ts_length; g++) {
        var string = ts[g].firstChild.textContent;
        var strlen = string.length;
    
        var letters = [];
        
        for(let k=0; k<strlen; k++) {
            var letter = string.slice(k, k+1);
            letters.push(letter);
        }

        if(ts[g].offsetHeight > ts_height) { 
            ts_height = ts[g].offsetHeight;
        }
    
        ts[g].textContent = '';
        letters.forEach(function(l){
            var newSpan = document.createElement('span');
            newSpan.textContent = l;
            newSpan.classList.add('hide');
            ts[g].insertBefore(newSpan, null);
        });

        ts[g].style.opacity = "1";
    }

    te_container.style.height = ts_height + 'px';
    var cursor = document.createElement('span');
    cursor.textContent = "|";
    cursor.classList.add('cursor-blinking');
    te_container.insertBefore(cursor, null);

    cursor = te_container.querySelector('.cursor-blinking');

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
            var gbcr = t[i].getBoundingClientRect();
            cursor.style.top = (gbcr.top - 10) + 'px';
            cursor.style.left = (gbcr.right) + 'px';
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
            var gbcr = t[i].getBoundingClientRect();
            cursor.style.top = (gbcr.top - 10) + 'px';
            cursor.style.left = (gbcr.right - gbcr.width) + 'px';
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