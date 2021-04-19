import validator from 'validator';

export const validateSignUpForm = payload => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (
        !payload ||
        typeof payload.email !== "string" ||
        !validator.isEmail(payload.email)
    ) {
        isFormValid = false;
        errors.email = "Please provide a correct email address.";
    }

    if (
        !payload ||
        typeof payload.password !== "string" ||
        payload.password.trim().length < 8
    ) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (!payload || payload.pwconfirm !== payload.password) {
        isFormValid = false;
        errors.pwconfirm = "Password confirmation doesn't match.";
    }

    if (
        !payload ||
        typeof payload.pwconfirm !== "string" ||
        payload.pwconfirm.trim().length === 0
    ) {
        isFormValid = false;
        errors.pwconfirm = "Please provide your Password confirmation.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};

export const validateLoginForm = payload => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (
        !payload ||
        typeof payload.password !== "string" ||
        payload.password.trim().length === 0
    ) {
        isFormValid = false;
        errors.password = "Please provide your password.";
    }

    if (
        !payload ||
        typeof payload.email !== "string" ||
        payload.email.trim().length === 0
    ) {
        isFormValid = false;
        errors.email = "Please provide your email.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
};
