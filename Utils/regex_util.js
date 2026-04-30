const name_regex = /^[A-Za-z\s]{3,}$/;
const phone_regex = /^(07[01245678][0-9]{7})$/;
const price_regex = /^[0-9]+(\.[0-9]{1,2})?$/;

export const validateName = (name) => {
    return name_regex.test(name);
}

export const validatePhone = (phone) => {
    return phone_regex.test(phone);
}

export const validatePrice = (price) => {
    return price_regex.test(price);
}