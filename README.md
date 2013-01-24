Cardify
=======

Dynamically convert a block of html into printable card formats similar to recipe and business card sizes.

NOTE: Cardify does not configure font or card sizing, it only set's up the line lengths and rows.  That is why the className option exists... so the developer can change font sizing, etc.. with a print stylesheet.

## Markup
```
<div class="htmlblock">
    <p>
        Just some random html including headers, paragraphs and lists
    </p>
    ...
</div>
```

## Usage
```
$('.htmlblock').cardify({
    numLines  : 100,
    chars     : 90,
    className : 'fullpage',
    pageBreak : 1
});
```

### numLines=`14` (int)
Number of lines per card

### chars=`70` (int)
Number of characters to cut off horizontally.  Line breaks after word ends.

### className=`'threebyfive'` (string)
Class name to wrap the card with.  Useful when wrapping this plugin with dynamic interactions.

### pageBreak=`1` (int)
How often to add a page break class to the card.  Set to '2' if a page break is needed every 2 cards... and so on.

### masthead=`'%p of %n'` (string)
Add a mastead to each card.  
    %p = Page Number
    %n = Number of Total Pages

By default, the output would be '1 of 2' for example. 

### masthead=`['%p of %n', 'Continued... %p of %n']` (array)
This options is also configured to accept an array to allow masthead configuration per page.

```
$('.htmlblock').cardify({
    masthead: ['First Page! %p of %n', 'Second Page! %p of %n']
});
```
And if there are more cards than options in the array, the rest of the cards will fall back on the last configured masthead.

### allowedElements=`{ "element": function(cardify, isLastItem) { console.log('parse element'); } }` (object)
Configure additional elements to be allowed, or change how an existing element is parsed and filtered.  

```
$('.htmlblock').cardify({
    allowedElements: {
        'p': function() {}, // get rid of paragraph parsing
        'address': function(cardify, isLastItem) {
            cardify.parseLines($(this).text());
            if ( !isLastItem ) 
                cardify.addLineWithBreak();
        }
    }
});
```
## Demo
http://dmmendez.github.com/Cardify/