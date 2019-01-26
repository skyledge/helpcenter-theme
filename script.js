(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

hljs.initHighlightingOnLoad();

var HC_SETTINGS = {
  css: {
    activeClass: "is-active",
    hiddenClass: "is-hidden"
  }
};

var Utils = {
  isHomepage: function isHomepage() {
    return $("[data-home-page]").length > 0;
  }
};

$(function () {
  var $topbar = $("[data-topbar]");
  var $heroUnit = $("[data-hero-unit]");
  var $topSearchBar = $(".topbar__search-bar");
  var $topSearchBarQuery = $topSearchBar.find("#query");
  var $topSearchBarBtn = $(".topbar__btn-search");

  if (Utils.isHomepage()) {
    $topbar.addClass("topbar--large");
    $heroUnit.removeClass(HC_SETTINGS.css.hiddenClass);
    $("[data-wave-large]").removeClass(HC_SETTINGS.css.hiddenClass);
    $("[data-footer-submit-ticket]").removeClass(HC_SETTINGS.css.hiddenClass);
  } else {
    $topbar.addClass("topbar--small");
    $("[data-wave-small]").removeClass(HC_SETTINGS.css.hiddenClass);
  }

  $topbar.removeClass(HC_SETTINGS.css.hiddenClass);

  $("[data-toggle-menu]").click(function () {
    $(this).toggleClass(HC_SETTINGS.css.activeClass);
    $("[data-menu]").toggle();
  });

  // Social share popups
  $(".share a").click(function (e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // Toggle the share dropdown in communities
  $(".share-label").on("click", function (e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") === "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function () {
    $(".share-label").attr("aria-selected", "false");
  });

  // Submit search on select change
  $("#request-status-select, #request-organization-select").on("change", function () {
    search();
  });

  // Submit search on input enter
  $("#quick-search").on("keypress", function (e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".image-with-lightbox").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-with-zoom", // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $(".image-with-video-icon").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $(".accordion__item-title").on("click", function () {
    var $title = $(this);
    $title.toggleClass("accordion__item-title--active");
    $title.parents(".accordion__item").find(".accordion__item-content").slideToggle();
  });

  $(".tabs-link").click(function (e) {
    e.preventDefault();
    var $link = $(this);
    var tabIndex = $link.index();
    var $tab = $link.parents(".tabs").find(".tab").eq(tabIndex);
    $link.addClass(HC_SETTINGS.css.activeClass).siblings().removeClass(HC_SETTINGS.css.activeClass);
    $tab.removeClass(HC_SETTINGS.css.hiddenClass).siblings(".tab").addClass(HC_SETTINGS.css.hiddenClass);
  });

  $topSearchBarBtn.click(function () {
    $(this).addClass(HC_SETTINGS.css.hiddenClass);
    $topSearchBar.removeClass(HC_SETTINGS.css.hiddenClass);
    $topSearchBarQuery.focus();
  });

  $(document).mouseup(function (e) {
    if (!$topSearchBarQuery.is(e.target)) {
      $topSearchBar.addClass(HC_SETTINGS.css.hiddenClass);
      $topSearchBarBtn.removeClass(HC_SETTINGS.css.hiddenClass);
    }
  });

  // Fix animated icons
  $(".fa-spin").empty();

  $("img.custom-block__image").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src") + "?reset";

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find("svg");

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr("xmlns:a");

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, "xml");
  });
});

},{}]},{},[1]);
