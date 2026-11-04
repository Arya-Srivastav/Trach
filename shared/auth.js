const USER_STORAGE_KEY = "trachUser";

function getSignedInUser() {
    let savedUser;

    try {
        savedUser = localStorage.getItem(USER_STORAGE_KEY);
    } catch (error) {
        console.error("Could not access Trach login storage.", error);
        return null;
    }

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch (error) {
        console.error("Could not read the saved Trach user.", error);
        return null;
    }
}

function addLoginNavigation() {
    const navigation = document.querySelector(".nav-links");

    if (!navigation) {
        return;
    }

    const user = getSignedInUser();
    const authLink = document.createElement("a");

    if (user) {
        authLink.href = "../09-login/logout.html";
        authLink.textContent = "Logout";
        authLink.setAttribute("aria-label", `Log out ${user.name}`);
    } else {
        authLink.href = "../09-login/login.html";
        authLink.textContent = "Login";
    }

    navigation.appendChild(authLink);

    const homeLoginButton = document.getElementById("login-cta");

    if (user && homeLoginButton) {
        homeLoginButton.href = "../07-profile/profile.html";
        homeLoginButton.textContent = "View Your Profile";
    }
}

addLoginNavigation();
