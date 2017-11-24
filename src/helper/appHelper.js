export function isValidPhoneNo(phoneNo) {
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(phoneNo);
}

export function isValidEmail(email) {
    const format = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(email);
}

export function isEmpty(text) {
    return (text.toString().trim().length > 0 && text.toString().trim() != "0");
}

export function isOnlyAlphabets(text) {
    const format = /^[a-z ,.'-]+$/i;
    return format.test(text);
}

export function isAccLength(text) {
    return text.toString().trim().length === 11;
}

export function isValidMobileNo(phoneNo) {
    const phoneNumberPattern = /^[0-9]{10}$/;
    return phoneNumberPattern.test(phoneNo);
}