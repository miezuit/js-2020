// jquery
$( "button.continue" ).html( "Next Step..." )

// js
document.querySelector("button.continue").innerHTML( "Next Step..." )

// jquery
$( "#button-container button" ).on( "click", function( event ) {
    hiddenBox.show();
  });

// js
document.querySelector("#button-container button")
        .addEventListener( "click", event => hiddenBox.show())

