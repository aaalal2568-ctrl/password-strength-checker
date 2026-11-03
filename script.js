
const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("toggle-password");
const characterCount = document.getElementById("character-count");
const strengthLabel = document.getElementById("strength-label");
const strengthMeter = document.getElementById("strength-meter");
const strengthMessage = document.getElementById("strength-message");
const resetButton = document.getElementById("reset-button");
const tipsText = document.getElementById("tips-text");

const requirements = {
    length: {
        element: document.getElementById("requirement-length"),
        test: password => password.length >= 8
    },
    uppercase: {
        element: document.getElementById("requirement-uppercase"),
        test: password => /[A-Z]/.test(password)
    },
    lowercase: {
        element: document.getElementById("requirement-lowercase"),
        test: password => /[a-z]/.test(password)
    },
    number: {
        element: document.getElementById("requirement-number"),
        test: password => /[0-9]/.test(password)
    },
    symbol: {
        element: document.getElementById("requirement-symbol"),
        test: password => /[^A-Za-z0-9]/.test(password)
    }
};

function updateStrength() {
    const password = passwordInput.value;
    const segments = strengthMeter.querySelectorAll(".strength-segment");

    characterCount.textContent = `${password.length} characters`;

    let score = 0;

    Object.values(requirements).forEach(requirement => {
        const passed = requirement.test(password);
        const check = requirement.element.querySelector(".requirement-check");

        if (passed) {
            score++;
            requirement.element.classList.add("passed");
            check.textContent = "✓";
        } else {
            requirement.element.classList.remove("passed");
            check.textContent = "○";
        }
    });

    segments.forEach(segment => {
        segment.className = "strength-segment";
    });

    strengthLabel.className = "strength-label";
    strengthMessage.className = "message";

    if (password.length === 0) {
        strengthLabel.textContent = "NOT TESTED";
        strengthMessage.textContent = "Enter a password to begin the security check.";
        tipsText.textContent = "Use a long, unique password. Avoid personal information and never reuse passwords.";
        return;
    }

    let level;
    let message;
    let tip;
    let activeCount;

    if (score <= 2) {
        level = "weak";
        message = "Your password is weak. Try adding more security elements.";
        tip = "Use at least 8 characters, uppercase and lowercase letters, numbers, and symbols.";
        activeCount = 1;
    } else if (score <= 4) {
        level = "medium";
        message = "Your password is getting stronger. Add the missing requirements.";
        tip = "Add the missing requirements to improve your password security.";
        activeCount = 3;
    } else {
        level = "strong";
        message = "Excellent! Your password meets all security requirements.";
        tip = "Great job! Keep this password unique and never share it with anyone.";
        activeCount = 4;
    }

    strengthLabel.textContent = level.toUpperCase();
    strengthLabel.classList.add(level);

    strengthMessage.textContent = message;
    strengthMessage.classList.add(level);

    tipsText.textContent = tip;

    for (let i = 0; i < activeCount; i++) {
        segments[i].classList.add("active", level);
    }
}

passwordInput.addEventListener("input", updateStrength);

toggleButton.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    toggleButton.textContent = isHidden ? "إخفاء" : "إظهار";
});

resetButton.addEventListener("click", () => {
    passwordInput.value = "";
    passwordInput.type = "password";
    toggleButton.textContent = "إظهار";

    updateStrength();
    passwordInput.focus();
});

updateStrength();
