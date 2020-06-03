$(function () {
  'use strict';

  // 何問クイズにするのか
  const questionsNum = 10;
  // c: [0]が正解
  let quizSet;
  let jsonQuizSet;

  let currentNum = 0;
  let score = 0;
  let progress = 0;
  let isCorrect = false;
  const answersList = [];

  // 回答済みフラグ
  let isAnswered;
  // コード表記フラグ
  let isCode;
  // URLのクエリ部分
  let query = location.search;
  let theme = query.split('=');

  // フィッシャー・イェーツのシャッフル・アルゴリズム
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // 回答チェック
  function checkAnswer(li) {
    // 回答は1度のみとする
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.text() === quizSet[currentNum].c[0]) {
      li.addClass('list-group-item-success');
      score++;
      // 正解の時、フラグをtrueにする
      isCorrect = true;
    } else {
      li.addClass('list-group-item-danger');
    }
    // resultModalで表示するために正解の選択肢とフラグをセット
    answersList.push([quizSet[currentNum].c[0], isCorrect]);
    // 解説を表示
    $('#explanation').removeClass('invisible');
    $('#explanation').addClass('visible');
    // ボタンを活性化する
    $('#nextBtn').removeClass('disabled');
    // プログレスバーの表示
    progress = (currentNum + 1) / questionsNum * 100;
    $('.progress-bar').text(progress + '%').css({ width: progress + '%' })
      .prop('aria-valuenow', progress);
  }

  // クイズのセット
  function setQuiz() {
    // 回答済みフラグをリセット
    isAnswered = false;
    // 正解フラグをリセット
    isCorrect = false;
    // Replayしたときのためにプログレスバーのリセット
    $('.progress-bar').text(progress + '%').css({ width: progress + '%' })
      .prop('aria-valuenow', progress);
    // 前のクイズを削除する
    $('#question').empty();
    $('#choices').empty();
    $('#explanation').empty();
    $('#explanation').addClass('invisible');

    //  問題文をセット
    if (isCode) {
      $('#question').append('<pre><code></code></pre>');
      $('#question > pre > code').text(quizSet[currentNum].q);
    } else {
      $('#question').text(quizSet[currentNum].q);
    }

    // 選択肢をシャッフルするためにスプレッド演算子によるオブジェクトのコピー
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    shuffledChoices.forEach(choice => {
      const li = $('<button>').text(choice)
        .prop({ 'class': 'list-group-item list-group-item-action', 'type': 'button' });
      li.on('click', () => {
        checkAnswer(li);
      });
      $('#choices').append(li);
    });
    // 解説をセット
    $('#explanation').text(quizSet[currentNum].e);

    // 最終問題の場合、ボタンには'Show Score'を表示する
    if (currentNum === questionsNum - 1) {
      $('#nextBtn').text('Show Score');
    }
  }

  switch (theme[1]) {
    case 'quizHtml':
      $.getJSON('./data/htmlContent.json', function (data) {
        jsonQuizSet = data
      });
      isCode = true;
      $('#quizTopModalLabel').text('HTMLのEmmet記法クイズ');
      $('#quizCardHeader').text('HTMLのEmmet記法クイズ');
      $('.card-title').text('Q.次をEmmetの省略記号で表したものはどれでしょう？');
      break;
    case 'quizCss':
      $.getJSON('./data/cssContent.json', function (data) {
        jsonQuizSet = data;
      });
      isCode = true;
      $('#quizTopModalLabel').text('CSSのEmmet記法クイズ');
      $('#quizCardHeader').text('CSSのEmmet記法クイズ');
      $('.card-title').text('Q.次をEmmetの省略記号で表したものはどれでしょう？');
      break;
    case 'quizTanka':
      $.getJSON('./data/tankaContent.json', function (data) {
        jsonQuizSet = data;
      });
      isCode = false;
      $('#quizTopModalLabel').text('百人一首クイズ');
      $('#quizCardHeader').text('百人一首クイズ');
      $('.card-title').text('Q.次の上の句に続く下の句はどれでしょう？');
      break;
  }

  $('#quizTopModal').modal({
    backdrop: 'static',
    keyboard: false,
    focus: true,
    show: true
  });

  $('#start').on('click', () => {
    $('#quizTopModal').modal('hide');
    quizSet = shuffle(jsonQuizSet);
    setQuiz();
  });

  $('#nextBtn').on('click', () => {
    if ($('#nextBtn').hasClass('disabled')) {
      // ボタンが既に不活性の場合、returnする
      return;
    }
    $('#nextBtn').addClass('disabled');

    // 最終問題か否かで処理を分岐
    if (currentNum === questionsNum - 1) {
      // スコアをセット
      $('#resultModalLabel').text(`Score: ${score} / ${questionsNum}`);
      // スコアに対応したコメントのセット
      if (score === questionsNum) {
        $('#comment').text('おめでとう！！全問正解です！！');
      } else {
        $('#comment').text('間違った問題を確認して、再挑戦してね！');
        $('#resultImage').attr('src', './img/quiz_modal_img02.png');
      }

      // 解答リストをセット
      answersList.forEach(answer => {
        let li;
        if (answer[1]) {
          li = $('<li>').text(answer[0]);
        } else {
          // 間違えたものは赤字
          li = $('<li>').text(answer[0]).css("color", "red");
        }
        $('#answers').append(li);
      });

      // resultモーダル表示
      $('#resultModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: true,
        show: true
      });

    } else {
      // 次の問題へ
      currentNum++;
      setQuiz();
    }
  });

  $('#replay').on('click', () => {
    location.href = './quiz.html?theme=' + theme[1];
  });

  $('#top').on('click', () => {
    location.href = './index.html';
  });
});
