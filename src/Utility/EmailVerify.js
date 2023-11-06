export const emailVerify = (email) => {
    let regX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;
    if(email.match(regX)) return true;
    return false;
}