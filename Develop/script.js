// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to generate time blocks from 9 AM to 5 PM
  function generateTimeBlocks() {
    // Clear the container before generating new time blocks
    $(".container-fluid").empty();

    // Loop to generate time blocks
    for (let hour = 9; hour <= 17; hour++) {
      // Create a unique ID for each time block
      var timeBlockId = "hour-" + hour;

      // Create a new time block div
      var timeBlock = $("<div>")
        .attr("id", timeBlockId)
        .addClass("row time-block");

      // Create the hour column
      var hourColumn = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(dayjs().hour(hour).format("hA"));

      // Create the textarea for user input
      var descriptionTextarea = $("<textarea>")
        .addClass("col-8 col-md-10 description")
        .attr("rows", "3");

      // Create the save button
      var saveButton = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      // Append columns to the time block
      timeBlock.append(hourColumn, descriptionTextarea, saveButton);

      // Append the time block to the container
      $(".container-fluid").append(timeBlock);
    }
  }

  // Call the function to generate time blocks
  generateTimeBlocks();

  // Add a listener for click events on the save button.
  // This code uses the id in the containing time-block as a key to save the user input in local storage.
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block by comparing the id to the current hour.
  // HINTS: How can the id attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past"); // Remove present and future classes, add past class
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present"); // Remove past and future classes, add present class
    } else {
      $(this).removeClass("past present").addClass("future"); // Remove past and present classes, add future class
    }
  });

  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  // HINT: How can the id attribute of each time-block be used to do this?
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedInput);
  });

  // Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
