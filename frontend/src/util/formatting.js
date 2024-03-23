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

export const formatDuration = decimal => {
    let hours;
    let minutes;

    hours = decimal - (decimal % 1)
    minutes = Math.round((60 * (decimal % 1)) / 5) * 5

    if(hours > 0 && minutes > 0){
        return `${hours}h ${minutes}m`
    }else if(hours > 0 && minutes === 0){
        return `${hours}${hours > 1 ? 'hrs' : 'hr'}`
    }else{
        return `${minutes}mins`
    }
}