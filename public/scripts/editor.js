(function () {
  var simplemde = new SimpleMDE({ element: document.getElementById("editor") });

  // Initialize date picker dates
  var dateinput = $('[name="date"]').datepicker({
    timepicker: true,
    language: "en",
    dateFormat: "yyyy/mm/dd",
    dateTimeSeparator: " ",
    timeFormat: "hh:ii"
  });
  var datepicker = dateinput.data('datepicker');
  var date = new Date(dateinput.val());
  datepicker.selectDate(date);
})();
