(function(){

    var te_container = document.querySelector('.te-container');
    var text_list = document.querySelectorAll('.typingeffect');
    var tl_length = text_list.length;

    if(!tl_length) {
        return;
    }

    var j = 0;

    var sliceText = function() {
        for ( j=0;j<tl_length;j++) {
            text = text_list[j];
            var string = text.textContent;
        
            var strlen = string.length;
            var letters = [];
            
            for (let k=0; k<strlen; k++) {
                var letter = string.slice(k, k+1);
                letters.push(letter);
            }
            text.textContent = '';
    
            letters.forEach(function(l, index) {
                var newSpan = document.createElement('span');
                newSpan.textContent = l;
                if(index >= 3)
                    newSpan.classList.add('hide');
                text.insertBefore(newSpan, null);
            });
            text.style.opacity = 1;
        }
    };

    sliceText();

    j = 0;
    text = text_list[j];

    var t = text.querySelectorAll('span'); 
    var tlength = t.length;
    var s,h;
    var i = 3;
    var cursor;

    var addCursor = function() {
        cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.classList.add('cursor-blinking');
        te_container.insertBefore(cursor, null);
    };

    addCursor();

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
        if(i < tlength) {
            t[i].classList.remove('hide');
            var gbcr = t[i].getBoundingClientRect();
            cursor.style.top = gbcr.top + 'px';
            cursor.style.left = gbcr.right + 'px';
            i++;
        }
        else {
            i = tlength - 1;
            clearInterval(s);
            setTimeout(function(){
                hideTimer();
            }, 2000);
        }
    };

    var hide = function() {
        if(i >= 3) {
            t[i].classList.add('hide');
            var gbcr = t[i].getBoundingClientRect();
            cursor.style.top = gbcr.top + 'px';
            cursor.style.left = (gbcr.right - gbcr.width) + 'px';
            i--;
        }
        else {
            i = 3;
            clearInterval(h);
            j++;
            if(j == tl_length) {
                j = 0;
            }
            text = text_list[j];
            t = text.querySelectorAll('span');
            tlength = t.length;
            showTimer();
        }
    };

})();