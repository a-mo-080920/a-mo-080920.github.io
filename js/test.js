$(function () {
  $(document).on("click", ".btn_star",
    function () {
      $(".btn_star").addClass("active"), setTimeout(function () { $(".btn_star").removeClass("active") }, 500)
    }
    ).on("click", ".btn_nico",
    function () {
      $(".btn_nico").addClass("active"), setTimeout(function () { $(".btn_nico").removeClass("active") }, 1000)
    }
  );
});
