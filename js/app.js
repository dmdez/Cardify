// app.js
// Sample dynamic app that changes cardify on-the-fly

(function($) {
    
    $.fn.serializeAnything = function() {         
        var toReturn    = {};
        var els         = $(this).find(':input').get();         
        $.each(els, function() {
            if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
                var val = $(this).val();
                toReturn[this.name] = val;
            } 

        });
 
        return toReturn;
 
    }

    var variations = {

        // Small
        '3x5s'   : { 
            'numLines' : 16, 
            'chars'    : 88, 
            'className': 'threebyfive card-small',
            'pageBreak': 2
        },
        '4x6s'   : { 
            'numLines' : 24, 
            'chars'    : 100, 
            'className': 'fourbysix card-small',
            'pageBreak': 2
        },
        'fulls': { 
            'numLines' : 60, 
            'chars'    : 120, 
            'className': 'eightbyeleven card-small',
            'pageBreak': 1
        },

        // Medium
        '3x5m'   : { 
            'numLines' : 14, 
            'chars'    : 70, 
            'className': 'threebyfive',
            'pageBreak': 2
        },
        '4x6m'   : { 
            'numLines' : 22, 
            'chars'    : 94, 
            'className': 'fourbysix',
            'pageBreak': 2
        },
        'fullm': { 
            'numLines' : 56, 
            'chars'    : 110, 
            'className': 'eightbyeleven' ,
            'pageBreak': 1
        },

        // Large
        '3x5l'   : { 
            'numLines' : 14, 
            'chars'    : 60, 
            'className': 'threebyfive card-large',
            'pageBreak': 2
        },
        '4x6l'   : { 
            'numLines' : 20, 
            'chars'    : 84, 
            'className': 'fourbysix card-large',
            'pageBreak': 2
        },
        'fulll': { 
            'numLines' : 54, 
            'chars'    : 100, 
            'className': 'eightbyeleven card-large' ,
            'pageBreak': 1
        }
    };

    var createCard = function() {
        var vals = $('.make-cards').serializeAnything();
        var options = variations[ vals.size + vals.fontsize ];
        options.masthead = '<span class="title">Recipes</span> <span class="page">%p of %n</span>';

        if ( $('.cardify-this-mutha').data('cardify') ) {
            $('.cardify-this-mutha').data('cardify').refresh( options );
        } else {
            $('.cardify-this-mutha').cardify( options );
        }                
    };

    createCard();

    $('.make-cards input').on('change', createCard);

})(jQuery);
