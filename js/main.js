$(function () {
  'use strict';

  // ボタンを非表示にする
  $('.custom-back-to-top').addClass('invisible');

  // スクロールしてページトップから50に達したらボタンを表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('.custom-back-to-top').removeClass('invisible');
    } else {
      $('.custom-back-to-top').addClass('invisible');
    }
  });

  // ボタン押下で上に戻る
  $('.custom-back-to-top a').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 250);
    return false;
  });

  $('#htmlStart').on('click', () => {
    location.href = './quiz.html?theme=quizHtml';
  });

  $('#cssStart').on('click', () => {
    location.href = './quiz.html?theme=quizCss';
  });

  $('#tankaStart').on('click', () => {
    location.href = './quiz.html?theme=quizTanka';
  });

});
