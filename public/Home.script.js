
function login_validation() {



    let invalid = document.getElementById("invalid_user")
    let username = document.getElementById("username")

    if (username.value.length < 6 || username.value.includes("@") === false) {
        invalid.style.color = "red"
    }
}

