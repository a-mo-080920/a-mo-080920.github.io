$(function () {
  $(document).on("click", ".btn_star",
    function () {
      $(".btn_star").addClass("active"), setTimeout(function () { $(".btn_star").removeClass("active") }, 500)
    }
  ).on("click", ".btn_nico",
    function () {
      $(".btn_nico").addClass("active"), setTimeout(function () { $(".btn_nico").removeClass("active") }, 1000)
    }

  ).on("click", ".btn_img_01",
    function () {
      $(".btn_img_01").addClass("active"), setTimeout(function () { $(".btn_img_01").removeClass("active") }, 1000)
    }
  ).on("click", ".btn_img_02",
    function () {
      $(".btn_img_02").addClass("active"), setTimeout(function () { $(".btn_img_02").removeClass("active") }, 1000)
    }
  );
});
