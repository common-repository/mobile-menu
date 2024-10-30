
  /*
    *
    *   Javascript PRO Functions
    *   ------------------------------------------------
    *   WP Mobile Menu 
    *   Copyright WP Mobile Menu 2018 - http://www.wpmobilemenu.com
    *
    *
    *
    */

    "use strict";
    var previousTerm = '';

    jQuery( document ).ready( function($) {

      

      $( document ).on( 'click, mouseover', '.mobmenu-language-wrapper .mm-active-flag' , function ( e ) {
        e.preventDefault();
        $( '.mobmenu-language-wrapper li' ).show();
      });
    
      $( document ).on( 'mouseleave', '.mobmenu-language-wrapper' , function ( e ) {
        e.preventDefault();
        $( '.mobmenu-language-wrapper li:not(.mm-active-flag)' ).hide();
      });

      $( document ).on( 'click', '.mobmenu-language-selector li.mm-current-language' , function ( e ) {
        e.preventDefault();
        $( '.mobmenu-language-selector' ).toggleClass( 'language-selector-opened' );
      });

      $( document ).on( 'click', '.sliding-back-menu' , function ( e ) {
        jQuery(this).parent().removeClass( 'show-sub-menu' );
        jQuery('.show-sub').removeClass( 'show-sub' );
        e.stopPropagation();
      });

      $( ".mobmenu-search" ).click(function() {

        if ( $( 'html').hasClass( 'show-mob-menu-search' ) ) {
          $( '.mob-menu-search-form' ).fadeOut();
          $( '.mobmenu-search-holder' ).slideUp( 800 );
          $( '.mobmenu-ajax-search-results' ).slideUp( 800 );
          $( '.mobmenu-search .mob-search-cancel-button' ).hide();
          $( '.mobmenu-search .mob-search-button' ).show();
          $( 'html' ).removeClass( 'show-mob-menu-search' );
        } else {
        
            $( '.mob-menu-search-form' ).fadeIn( 800 ); 
            $( '.mobmenu-search-holder' ).slideDown();
            $( '.mobmenu-search .mob-search-cancel-button' ).show();
            $( '.mobmenu-search .mob-search-button' ).hide();
            $( '.mob-menu-search-field' ).focus();
            $( 'html').addClass( 'show-mob-menu-search' );

        }
      });

      function delaySearch(fn, ms) {
        let timer = 0
        return function(...args) {
          clearTimeout(timer)
          timer = setTimeout(fn.bind(this, ...args), ms || 0)
        }
      }
  
      $( '.header-ajax-search .mob-menu-search-field' ).on( 'keyup', delaySearch(function( e ){
      

        var searchTerm = $( this ).val();
        e.preventDefault();

        if ( searchTerm == previousTerm ) return;
          previousTerm = searchTerm;

          if ( searchTerm && searchTerm.length > 2 ) {
              var types = '';

              if ( $( '#post_type' ).length ) {
                types = $( '#post_type' ).val();
              }
              
            $.ajax({
              url : frontend.ajaxurl, 
              data : {
                  action : 'mobile_menu_search__premium_only',
                  terms : searchTerm,
                  post_types: types,
              },
              type : 'POST',
              success : function( response ) {
                $( '.mobmenu-ajax-search-results').html( response ).show();
              },
              error : function(error){
                console.log(error);
              }
            })
          }
          else {
            $( '.mobmenu-ajax-search-results' ).html( '' ).hide();
          }
      }, parseInt( frontend.search_delay ) ) );

      $( document ).on( 'click', '.mobmenu-tabs-header li' , function ( e ) {

        e.preventDefault();
        $( '.active-tab' ).removeClass( 'active-tab' );
        $( this ).addClass( 'active-tab' );
        $( '.mobmenu-tabs-container .mobmenu-tab' ).hide();
        $('.' + $( this ).attr('data-tab-id')).show();
      });

    });

    //Function that will hide/show the header/footer when scrolling down.
    jQuery( function($){

      // Autohide Header.
      if ( $( 'body' ).hasClass( 'mob-menu-autohide-header' ) ) {
        var lastScrollTop = 0, delta = 5, scrollAmount = 0;
        $( window ).scroll( function( event ){
          var st = $(this).scrollTop();
          var htmlTop = $('html').scrollTop();

          if ( htmlTop < jQuery('.mob-menu-header-holder').height() ) {
            $( '.mob-menu-header-holder' ).removeClass( 'hide-mm-element' );
            return;
          }

          if ( $(window).height() +  htmlTop + 80 > $(document).height() ) {
            $( '.mobmenu-footer-menu-holder' ).removeClass( 'hide-mm-element' ); 
            return;
          }

          if ( Math.abs(lastScrollTop - st) <= delta )
              return;
              
            if ( st > lastScrollTop ) {
              //Scroll Down. 
              $( '.mob-menu-header-holder' ).addClass( 'hide-mm-element' );
              scrollAmount = 0;
              if ( $( 'body' ).hasClass( 'mob-menu-autohide-footer' ) ) {
                $( '.mobmenu-footer-menu-holder' ).removeClass( 'hide-mm-element' ); 
              }

          } else {
              //Scroll Up.
              if ( scrollAmount > 40 ) {
                $( '.mob-menu-header-holder' ).removeClass( 'hide-mm-element' ); 
              }
              scrollAmount += (lastScrollTop -  st);
              if ( $( 'body' ).hasClass( 'mob-menu-autohide-footer' ) ) {
                $( '.mobmenu-footer-menu-holder' ).addClass( 'hide-mm-element' ); 
              }
              }

          lastScrollTop = st;

        });
      }

      // Autohide Footer.
      if ( $( 'body' ).hasClass( 'mob-menu-autohide-footer' ) ) { 
        var lastScrollTop = 0, delta = 5, scrollAmount = 0;;
        $( window ).scroll( function( event ){
          var st = $(this).scrollTop();

          if ( Math.abs(lastScrollTop - st) <= delta )
              return;

            if ( st > lastScrollTop ) {
              //Scroll Down. 
              $( '.mobmenu-footer-menu-holder' ).addClass( 'hide-mm-element' );
              scrollAmount = 0;

          } else {
              //Scroll Up.
              if ( scrollAmount > 40 ) {
                $( '.mobmenu-footer-menu-holder' ).removeClass( 'hide-mm-element' ); 
              }
              scrollAmount += (lastScrollTop -  st);
              }

          lastScrollTop = st;

        });
      }
  });
