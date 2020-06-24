const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let hitsMiss = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый +++
  $('.game-field').removeClass('target');
  $(".game-field").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером +++
  $('.target').text(hits + 1);

  // FIXME: тут надо определять при первом клике firstHitTime(определил при клике на таргет в конце кода)



  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала +++
  $('#game-fields').addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  let totalMissClick = hits - hitsMiss - maxHits;
  $("#total-missed").text(totalMissClick);
  $("#win-message").removeClass("d-none");

  let totalPoints = hits - totalMissClick;
  $("#total-pionts").text(totalPoints);
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? +++
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).text(" ")
    round();
  } else {
    $(event.target).addClass('miss')
    hitsMiss = hitsMiss - 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss++
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке +++

  round();

  $("#button-start").click(function () {
    $("#game-fields").removeClass("d-none");
    $("#button-reload").removeClass("d-none");
    $("#button-start").addClass("d-none");
    $('.target').click(function () {
      firstHitTime = getTimestamp();
    })
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function () {
    location.reload();

  });
}

$(document).ready(init);
