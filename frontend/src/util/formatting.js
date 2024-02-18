export const formatPhoneNumber = phoneNumber => {
    return "(" + phoneNumber?.slice(0, 3) + ") " + phoneNumber?.slice(3, 6) + "-" + phoneNumber?.slice(6, 10)
}

export const formatAddress = userAddress => {
    if(!!userAddress){
        return <>{userAddress?.streetAddress}&nbsp;{userAddress?.city},&nbsp;{userAddress?.state}&nbsp;{userAddress?.zipCode}</>
    }else{
        return <></>
    }
}