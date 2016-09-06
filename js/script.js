$(document).ready(function () {

            //
            // Enable selectBox control and bind events
            //

            $('#create').click(function () {
                $('SELECT').selectBox();
            });

            $('#destroy').click(function () {
                $('SELECT').selectBox('destroy');
            });

            $('#enable').click(function () {
                $('SELECT').selectBox('enable');
            });

            $('#disable').click(function () {
                $('SELECT').selectBox('disable');
            });

            $('#serialize').click(function () {
                $('#console').append('<br />-- Serialized data --<br />' +
                        $('FORM').serialize().replace(/&/g, '<br />') + '<br /><br />');
                $('#console')[0].scrollTop = $('#console')[0].scrollHeight;
            });

            $('#refresh').click(function() {
                $('SELECT OPTION').each(function() {
                    $(this).text('Refreshed ' + $(this).val());
                });
                $('SELECT').selectBox('refresh');
            });

            $('#value-1').click(function () {
                $('SELECT').selectBox('value', 1);
            });

            $('#value-2').click(function () {
                $('SELECT').selectBox('value', 2);
            });

            $('#value-2-4').click(function () {
                $('SELECT').selectBox('value', [2, 4]);
            });

            $('#options').click(function () {
                $('SELECT').selectBox('options', {
                    'Opt Group 1': {
                        '1': 'Value 1',
                        '2': 'Value 2',
                        '3': 'Value 3',
                        '4': 'Value 4',
                        '5': 'Value 5'
                    },
                    'Opt Group 2': {
                        '6': 'Value 6',
                        '7': 'Value 7',
                        '8': 'Value 8',
                        '9': 'Value 9',
                        '10': 'Value 10'
                    },
                    'Opt Group 3': {
                        '11': 'Value 11',
                        '12': 'Value 12',
                        '13': 'Value 13',
                        '14': 'Value 14',
                        '15': 'Value 15'
                    }
                });
            });

            $('#default').click(function () {
                $('SELECT').selectBox('settings', {
                    'menuTransition': 'default',
                    'menuSpeed': 0
                });
            });

            $('#fade').click(function () {
                $('SELECT').selectBox('settings', {
                    'menuTransition': 'fade',
                    'menuSpeed': 'fast'
                });
            });

            $('#slide').click(function () {
                $('SELECT').selectBox('settings', {
                    'menuTransition': 'slide',
                    'menuSpeed': 'fast'
                });
            });

            $('select')
                    .selectBox({
                        mobile: true
                    })
                    .focus(function () {
                        $('#console').append('Focus on ' + $(this).attr('name') + '<br />');
                        $('#console')[0].scrollTop = $('#console')[0].scrollHeight;
                    })
                    .blur(function () {
                        $('#console').append('Blur on ' + $(this).attr('name') + '<br />');
                        $('#console')[0].scrollTop = $('#console')[0].scrollHeight;
                    })
                    .change(function () {
                        $('#console').append('Change on ' + $(this).attr('name') + ': ' + $(this).val() + '<br />');
                        $('#console')[0].scrollTop = $('#console')[0].scrollHeight;
                    });

        });

//-------------------------------------Checkbox-------------------------------//
(function() {
 
var matched, browser;
 
// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();
 
    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];
 
    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};
 
matched = jQuery.uaMatch( navigator.userAgent );
browser = {};
 
if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}
 
// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}
 
jQuery.browser = browser;
})();//------------------------------костыль для jQuery.browser.msie

jQuery(document).ready(function(){

    jQuery(".niceCheck").each(
    /* при загрузке страницы меняем обычные на стильные checkbox */
    function() {
        changeCheckStart(jQuery(this));   
    });
});


function changeCheck(el)
/* 
    функция смены вида и значения чекбокса при клике на контейнер чекбокса (тот, который отвечает за новый вид)
    el - span контейнер для обычного чекбокса
    input - чекбокс
*/
{

    var el = el,
        input = el.find("input").eq(0);
          
    if(el.attr("class").indexOf("niceCheckDisabled")==-1)
    {   
        if(!input.attr("checked")) {
            el.addClass("niceChecked");
            input.attr("checked", true);
        } else {
            el.removeClass("niceChecked");
            input.attr("checked", false).focus();
        }
    }
    
    return true;
}

function changeVisualCheck(input)
{
/*
    меняем вид чекбокса при смене значения
*/
var wrapInput = input.parent();
    if(!input.attr("checked")) {
        wrapInput.removeClass("niceChecked");
    }
    else
    {
        wrapInput.addClass("niceChecked");
    }
}

function changeCheckStart(el)
/* 
    новый чекбокс выглядит так <span class="niceCheck"><input type="checkbox" name="[name check]" id="[id check]" [checked="checked"] /></span>
    новый чекбокс получает теже name, id и другие атрибуты что и были у обычного
*/
{

try
{
var el = el,
    checkName = el.attr("name"),
    checkId = el.attr("id"),
    checkChecked = el.attr("checked"),
    checkDisabled = el.attr("disabled"),
    checkTab = el.attr("tabindex"),
    checkValue = el.attr("value");
    if(checkChecked)
        el.after("<span class='niceCheck niceChecked'>"+
            "<input type='checkbox'"+
            "name='"+checkName+"'"+
            "id='"+checkId+"'"+
            "checked='"+checkChecked+"'"+
            "value='"+checkValue+"'"+
            "tabindex='"+checkTab+"' /></span>");
    else
        el.after("<span class='niceCheck'>"+
            "<input type='checkbox'"+
            "name='"+checkName+"'"+
            "id='"+checkId+"'"+
             "value='"+checkValue+"'"+
            "tabindex='"+checkTab+"' /></span>");
    
    /* если checkbox disabled - добавляем соотвсмтвующи класс для нужного вида и добавляем атрибут disabled для вложенного chekcbox */      
    if(checkDisabled)
    {
        el.next().addClass("niceCheckDisabled");
        el.next().find("input").eq(0).attr("disabled","disabled");
    }
    
    /* цепляем обработчики стилизированным checkbox */      
    el.next().bind("mousedown", function(e) { changeCheck(jQuery(this)) });
    el.next().find("input").eq(0).bind("change", function(e) { changeVisualCheck(jQuery(this)) });
    if(jQuery.browser.msie)
    {
        el.next().find("input").eq(0).bind("click", function(e) { changeVisualCheck(jQuery(this)) });   
    }
    el.remove();
}
catch(e)
{
    console.log("error", e);
}

    return true;
}

$(document).ready(function(){
    $('.topmenu ul li').hover(
        function() {
            $(this).addClass("active");
            $(this).find('ul').stop(true, true); // останавливаем всю текущую анимацию
            $(this).find('ul').slideDown();
        },
        function() {
            $(this).removeClass("active");        
            $(this).find('ul').slideUp('fast');
        }
    );
});