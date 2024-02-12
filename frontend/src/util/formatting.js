export const formatPhoneNumber = (phoneNumber) => {
    return "(" + phoneNumber?.slice(0, 3) + ") " + phoneNumber?.slice(3, 6) + "-" + phoneNumber?.slice(6, 10)
}