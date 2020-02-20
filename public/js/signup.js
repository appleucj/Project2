$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var emailInput = $("input#email-input");
  var phoneInput = $("input#phone-input");
  var passwordInput = $("input#password-input");
  var passwordInput2 = $("input#password-input2");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      phoneNumber: phoneInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName, userData.phoneNumber);
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    phoneInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, phoneNumber) {
     $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
     })
      .then(function(data) {
        window.location.replace("/chat");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.responseJSON));
    $("#alert").fadeIn(500);
  }
});
