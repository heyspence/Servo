export const restoreCSRF = async () => {
    const res = await fetch('/api/session')
    const token = res.headers.get('X-CSRF-Token')
    if(token){
        sessionStorage.setItem('X-CSRF-Token', token)
    }else{
        sessionStorage.removeItem('X-CSRF-Token')
    }
}


const csrfFetch = async (url, options = {}) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = 
            options.headers['Content-Type'] || 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem("X-CSRF-Token");
    }

    const res = await fetch(url, options);
    // if(!res.ok) throw res;
    return res;
}

export default csrfFetch;