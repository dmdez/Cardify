// jquery.cardify.js

(function ($) {

    $.cardify = function (element, options) {

        var defaults = {
            'numLines'       : 14,
            'chars'          : 70,
            'className'      : 'threebyfive',
            'pageBreak'      : 1,
            'masthead'       : '%p of %n',
            'allowedElements': {
                "ul"    : parseList,
                "#text" : parseText,
                "p"     : parseBlock,
                "div"   : parseBlock,
                "h4"    : parseHeader,
                "h3"    : parseHeader,
                "h2"    : parseHeader,
                "h1"    : parseHeader
            }
        }

        var cardify = this;
        cardify.settings = {};
        cardify.currentCard = undefined;        

        var $element = $(element),
             element = element,
            $elements = $element.contents(),
            $container = $('<div />');

        cardify.init = function () {
            cardify.lineCount = 0;
            cardify.settings = $.extend(true, defaults, options);
            cardify.cardCount = 0;

            $container.addClass(cardify.settings['className']);
            $element.after($container);
            $elements.each(parseElements);
            $container.children().each(addMasthead);
            $container
                .children(':nth-child(' + cardify.settings.pageBreak + 'n+1)')
                .addClass('page-break')
                .first().removeClass('page-break');
        };

        cardify.refresh = function (newopts) {
            cardify.settings = {};
            options = newopts;
            $container.empty().removeClass();
            cardify.init();
        };

        cardify.addLineWithBreak = function(text) {
            increaseLineCount();
            cardify.currentCard.append((text ? text : "") + '<br />');            
        };

        cardify.parseLines = function(text, pre, post) {
            var lines = wordwrap(text);
            pre = pre || '';
            post = post || '';

            if ( lines && lines != null)
                $.each(lines, function() {
                    cardify.addLineWithBreak(pre + this + post);
                });
        };

        function addMasthead(i) {
            var $masthead = $('<div class="masthead" />');        
            var mastheadTemplate = cardify.settings.masthead;

            if ( typeof mastheadTemplate == "object" ) {
                if ( mastheadTemplate[i] ) {
                    mastheadTemplate = mastheadTemplate[i];
                } else {
                    mastheadTemplate = mastheadTemplate[mastheadTemplate.length - 1];
                }
            }

            mastheadTemplate = mastheadTemplate.replace("%p", i+1);
            mastheadTemplate = mastheadTemplate.replace("%n", cardify.cardCount);

            $masthead.html(mastheadTemplate);
            $(this).append($masthead);
        }

        function increaseLineCount() {

            if (cardify.lineCount % cardify.settings.numLines == 0)
                createCard();

            cardify.lineCount++;
        }

        function parseElements(i) {
            var last = false;
            console.log(cardify.settings.allowedElements);
            var parsingFunction = cardify.settings.allowedElements[this.nodeName.toLowerCase()];

            if ( i == $elements.length-1)
                last = true;

            if ( parsingFunction )
                $.proxy(parsingFunction, this, cardify, last)();
        }

        function createCard() {
            var $card = $('<div class="cardify-card" />');
            cardify.currentCard = $card;
            $container.append($card);
            cardify.cardCount++;
        }

        function wordwrap(str, width, cut) {
            width = width || cardify.settings.chars || 75;
            cut = cut || false;

            if (!str) { return str; }

            var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

            return str.match(RegExp(regex, 'g'));
        }

        function parseList(cardify, isLastItem) {
            $(this).find('li').each(function () {
                cardify.parseLines($(this).text())
            });
            if ( !isLastItem )
                cardify.addLineWithBreak();
        }

        function parseText(cardify, isLastItem) {
            var text = $(this).text().trim();
            if ( text )
                cardify.parseLines(text);
        }

        function parseBlock(cardify, isLastItem) {
            cardify.parseLines($(this).text());
            if ( !isLastItem ) 
                cardify.addLineWithBreak();
        }

        function parseHeader(cardify, isLastItem) {
            cardify.parseLines($(this).text(), '<strong>', '</strong>');
            if ( !isLastItem ) 
                cardify.addLineWithBreak();
        }

        cardify.init();

    }

    $.fn.cardify = function (options) {

        return this.each(function () {
            if (undefined == $(this).data('cardify')) {
                var cardify = new $.cardify(this, options);
                $(this).data('cardify', cardify);
            }
        });

    }



})(jQuery);

