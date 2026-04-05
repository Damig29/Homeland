AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 50
});

jQuery(document).ready(function($) {
  "use strict";

  // --- Loader ---
  $(".site-loader").fadeOut(600);

  // --- Sticky Navbar ---
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 80) {
      $('#site-navbar').addClass('scrolled');
    } else {
      $('#site-navbar').removeClass('scrolled');
    }
  });

  // --- Mobile Menu ---
  var siteMenuClone = function() {
    $('.js-clone-nav').each(function() {
      $(this).clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
    });

    setTimeout(function() {
      var counter = 0;
      $('.site-mobile-menu .has-children').each(function() {
        var $this = $(this);
        $this.prepend('<span class="arrow-collapse collapsed">');
        $this.find('.arrow-collapse').attr({
          'data-toggle': 'collapse',
          'data-target': '#collapseItem' + counter,
        });
        $this.find('> ul').attr({
          'class': 'collapse',
          'id': 'collapseItem' + counter,
        });
        counter++;
      });
    }, 1000);

    $('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ($this.closest('li').find('.collapse').hasClass('show')) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();
    });

    $(window).resize(function() {
      if ($(this).width() > 768) {
        $('body').removeClass('offcanvas-menu');
      }
    });

    $('body').on('click', '.js-menu-toggle', function(e) {
      e.preventDefault();
      $('body').toggleClass('offcanvas-menu');
      $(this).toggleClass('active');
    });

    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('body').removeClass('offcanvas-menu');
      }
    });
  };
  siteMenuClone();

  // --- Stats Counter Animation ---
  var counted = false;
  $(window).on('scroll', function() {
    var statSection = $('.stat-number').first();
    if (statSection.length && !counted) {
      var oTop = statSection.offset().top - window.innerHeight;
      if ($(window).scrollTop() > oTop) {
        counted = true;
        $('.stat-number').each(function() {
          var $this = $(this);
          var target = parseInt($this.attr('data-count'));
          if (!target) return;
          $({ count: 0 }).animate({ count: target }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.ceil(this.count).toLocaleString());
            },
            complete: function() {
              $this.text(target.toLocaleString() + '+');
            }
          });
        });
      }
    }
  });

  // --- Favorite Toggle ---
  $('body').on('click', '.property-favorite', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $(this).css('transform', 'scale(1.3)');
      setTimeout(function() { $(this).css('transform', 'scale(1.1)'); }.bind(this), 200);
    }
  });

  // --- Smooth Scroll ---
  $('a[href^="#"]').not('[data-toggle]').on('click', function(e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
    }
  });

  // --- Image Popup ---
  if ($('.image-popup').length) {
    $('.image-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom',
      gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] },
      image: { verticalFit: true },
      zoom: { enabled: true, duration: 300 }
    });
  }

  // --- Owl Carousel ---
  if ($('.slide-one-item').length) {
    $('.slide-one-item').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      autoplayTimeout: 6000,
      pauseOnHover: false,
      nav: true,
      dots: false,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">']
    });
  }

  if ($('.nonloop-block-13').length) {
    $('.nonloop-block-13').owlCarousel({
      center: false,
      items: 1,
      loop: true,
      autoplay: true,
      margin: 20,
      nav: false,
      dots: true,
      navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
      responsive: {
        600: { items: 1, margin: 20 },
        1000: { items: 2, margin: 20 },
        1200: { items: 3, margin: 20 }
      }
    });
  }

  // --- Form Validation ---
  $('form').on('submit', function(e) {
    var isValid = true;
    $(this).find('[required]').each(function() {
      if (!$(this).val()) {
        isValid = false;
        $(this).css('border-color', 'var(--coral)');
      } else {
        $(this).css('border-color', '');
      }
    });
    if (!isValid) e.preventDefault();
  });

  $('form .form-control').on('focus', function() {
    $(this).css('border-color', '');
  });

});