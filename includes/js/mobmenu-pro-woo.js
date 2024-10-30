
  /*
    *
    *   Javascript PRO Functions
    *   ------------------------------------------------
    *   WP Mobile Menu Woocommerce
    *   Copyright WP Mobile Menu 2018 - http://www.wpmobilemenu.com
    *
    */

    "use strict";
    
    jQuery( document ).ready( function($) {

      $( document ).on( 'click', '.mobmenu-trigger-action', function(){

        var targetPanel = $( this ).attr( 'data-panel-target' );

        if ( 'mobmenu-filter-panel' === targetPanel ) {
          mobmenuOpenFilterPanel();
        }

      });

      $( document ).on( 'click', '.mobmenu-filter-header .mob-cancel-button', function(){
        mobmenuCloseFilterPanel();
      });

      $( document ).on( 'click', '.mobmenu-shop-filter-btn.view-results ', function(){
        mobmenuCloseFilterPanel();
        var filterList = $( '.mobmenu-filter-panel' ).attr( 'data-shop-url' );
        var filterString = '';

        $('.mobmenu-filter-panel .mm-filter-box').each(function() {

         var filterAttr = $(this).attr('id');
         if( $( '#' + filterAttr ).find('.selected').length > 0 ) {

           $( '#' + filterAttr ).find('.selected').each(function() {

             if ( 'product_cat' === filterAttr ) {
               if (filterString === "") {
                 filterString += "?product_cat=" + $(this).find('.mm-filter-option').first().attr('data-attr_value');
               } else {
                 filterString += "&product_cat=" + $(this).find('.mm-filter-option').first().attr('data-attr_value');
               }
             } else {
               if (filterString === "") {
                 filterString += "?filter_" + filterAttr + "=" + $(this).find('.mm-filter-option').first().attr('data-attr_value');
               } else {
                 filterString += "&filter_" + filterAttr + "=" + $(this).find('.mm-filter-option').first().attr('data-attr_value');
               }
             }

           });
         }
       });

       $('.mobmenu-filter-panel .mm-filter-input input').each(function() {
         var filterAttr = $(this).attr('name');
         var attrValue  = $(this).val();
         if (filterString === "") {
           filterString += "?"+ filterAttr + "=" + attrValue;
         } else {
           filterString += "&" + filterAttr + "=" + attrValue;
         }
       });

        location.href = filterList + filterString;

     });

     $( document ).on( 'click', '.mm-prod-cat', function(){
      $( this ).toggleClass( 'selected' );
     });

      // ADD TO CART NOTIFICATION.
      $('.add_to_cart_button').on('click',function() {
      
        setTimeout(function(){ 
          $('.mobmenu-cart').addClass( 'mobmenu-cart-icon-animation' );
          if ( undefined !== $( '.mob-menu-header-holder' ).attr( 'data-open-cart' ) ) {
            $('.mobmenu-cart').trigger( 'click' ); 
          } 
        }, 600);
    });

    $( document ).on( 'click', '.mobmenu-open-filter-panel', function() {
      mobmenuOpenFilterPanel();
      return false;
    });

});

function mobmenuCloseFilterPanel() {
  jQuery( '.mobmenu-filter-panel' ).toggleClass( 'show-panel' );
  jQuery( 'html' ).removeClass( 'show-mobmenu-filter-panel' );
}

function mobmenuOpenFilterPanel() {
  jQuery( '.mobmenu-filter-panel' ).toggleClass( 'show-panel' );
  jQuery( 'html' ).addClass( 'show-mobmenu-filter-panel' );
  var urlParams = new URLSearchParams(window.location.search);

  if ( '' !==  window.location.search ) {
    jQuery( '.mm-filter-box, .mm-filter-input input' ).each( function (){
      var paramVal    = '';
      var filterVarID = '';
      var varID       = jQuery( this ).attr( 'id' );

      filterVarID = varID;

      if( varID.startsWith( 'pa' ) ) {
        filterVarID = 'filter_' + varID;
      }

      if( 'mm-price-min' === varID ) {
        filterVarID = 'min_price';
      }

      if( 'mm-price-max' === varID ) {
        filterVarID = 'max_price';
      } 
      
      if ( urlParams.has( filterVarID ) ) {
        paramVal = urlParams.getAll( filterVarID );
        jQuery.each( paramVal, function( index, value ) {
          if ( 'mm-price-min' === varID || 'mm-price-max' === varID ) {
            jQuery( '#' + varID ).val( value );
          } else {
            jQuery( '#' + varID ).find( '[data-attr_value="' + value + '"]').parent().addClass('selected');
          }

        });
      }
    });
  }
}
