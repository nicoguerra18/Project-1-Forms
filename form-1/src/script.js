function resetForm() {
  toastr.info("Sucessfully Cleared all Fields!");
}

function submitForm() {
  //init
  let fields = [`username`, `first`, `last`, `phone`, `fax`, `email`];
  //validate
  let hasError = false;
  fields.forEach((a) => {
    $(`#validate-${a}`).removeClass("has-error");
    if (!$(`#${a}`).val()) {
      hasError = true;
      $(`#validate-${a}`).addClass("has-error");
      toastr.error(`The ${a} field is missing!`, ``, { closeButton: true });
    }
  });

  // cost validation check to see if the cost was calculated and if it is not, notify user with a red error toaster that no cost was calculated
  let cost = document.getElementById("disabledInput2");
  if (cost === null || isNaN(parseFloat(cost.value))) {
    toastr.error("Cost not calculated");
  } else if (parseFloat(cost.value) < 0) {
    toastr.error("Cost cannot be negative");
  }
  // passes all validation errors
  else {
    toastr.success("Form Sucessfully Submitted!");
  }
}

// function to calculate the differnce in check in and check out (days) and dispaly to disabled input box
function updateDays() {
  const checkInDate = new Date(document.getElementById("checkinInput").value);
  const checkOutDate = new Date(document.getElementById("checkoutInput").value);

  if (checkInDate && checkOutDate) {
    const timeDiff = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    document.getElementById("disabledInput1").value = timeDiff;
  }
}

// function calculate and display cost of stay (cost of the booking which will be $150 * # of adults * # of days)
function updateCost() {
  const days = document.getElementById("disabledInput1").value;
  const numAdults = parseInt(document.getElementById("numOfAdults").value, 10);

  if (days && numAdults) {
    const totalCost = days * numAdults * 150; // cost per day is 150
    document.getElementById("disabledInput2").value = totalCost;
  }
}
