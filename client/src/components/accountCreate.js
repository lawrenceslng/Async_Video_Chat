//function for checking account creation info

const PWMatch = (PW, RePW) => {
    if(PW !== RePW)
    {
        console.log("Password do not match");
        return false;
    }
    else
    {
        console.log("Password matches");
        return true;
    }
}


export default PWMatch;