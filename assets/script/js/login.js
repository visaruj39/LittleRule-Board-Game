document.addEventListener("DOMContentLoaded", function () {
  // Your code here
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const containerLogin = document.getElementById("containerLogin");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
});
