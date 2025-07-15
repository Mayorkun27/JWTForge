const togglePasswordVisibility = (idToBeToggled, elementClicked) => {
    const input = document.getElementById(idToBeToggled);
    const button = document.getElementById(elementClicked);

    console.log("clicked")

    if (button.classList.contains("fa-eye")) {
        button.classList = "fa fa-eye-slash p-2";
        input.setAttribute("type", "text");
    } else if (button.classList.contains("fa-eye-slash")) {
        button.classList = "fa fa-eye p-2"
        input.setAttribute("type", "password")
    }

}

const getUserData = async () => {
    await axios.get("/session", {
        withCredentials: true,
    })
}

// This script is for the registration form in the public directory
// It handles the form submission, sends the data to the server, and displays success or error
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const formButton = document.getElementById("registerButton");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        formButton.disabled = true;
        formButton.textContent = "Registering...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/v1/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                form.reset();
                Toastify({
                    text: result.message || "Registration successful!",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "green",
                    close: true
                }).showToast();
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                Toastify({
                text: result.message || result.error || "Registration failed. Please try again.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
                close: true
                }).showToast();
            }

        } catch (err) {
            console.error(err);
            Toastify({
                text: "An unexpected error occurred.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
                close: true
            }).showToast();
        } finally {
            formButton.disabled = false;
            formButton.textContent = "Register";
        }
    });
});

// This script is for the login form in the public directory
// It handles the form submission, sends the data to the server, and displays success or error
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const formButton = document.getElementById("loginButton");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        formButton.disabled = true;
        formButton.textContent = "Logging in...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                form.reset();
                Toastify({
                    text: result.message || "Login successful!",
                    duration: 4000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "green",
                    close: true
                }).showToast();
                setTimeout(() => {
                    window.location.href = "profile.html";
                }, 2000);
            } else {
                Toastify({
                text: result.message || result.error || "Failed to log in. Please try again.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
                close: true
                }).showToast();
            }

        } catch (err) {
            console.error(err);
            Toastify({
                text: "An unexpected error occurred.",
                duration: 4000,
                gravity: "top",
                position: "center",
                backgroundColor: "red",
                close: true
            }).showToast();
        } finally {
            formButton.disabled = false;
            formButton.textContent = "Login";
        }
    });
});

const logOut = async () => {
    fetch("/api/v1/user/logout", {
        method: "POST",
        credentials: "include"
    })
    .then(res => res.json())
    .then(() => {
        window.location.href = "index.html";
    })
    .catch(() => {
        window.location.href = "index.html";
    });
}