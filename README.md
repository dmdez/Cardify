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

### numLines=14
Number of lines per card

### chars=70
Number of characters to cut off horizontally.  Line breaks after word ends.

### className='threebyfive'
Class name to wrap the card with.  Useful when wrapping this plugin with dynamic interactions.

### pageBreak=1
How often to add a page break class to the card.  Set to '2' if a page break is needed every 2 cards... and so on.

## Demo
http://dmmendez.github.com/Cardify/demo.html