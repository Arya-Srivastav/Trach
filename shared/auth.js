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

    const user = getSignedInUser();
    const profileName = document.getElementById("profile-name");
    const profileAvatar = document.getElementById("profile-avatar");

    if (user && typeof user.name === "string" && user.name.trim()) {
        const name = user.name.trim();

        if (profileName) {
            profileName.textContent = name;
        }

        if (profileAvatar) {
            profileAvatar.textContent = name.charAt(0).toUpperCase();
        }
    }

    if (!navigation) {
        return;
    }

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
