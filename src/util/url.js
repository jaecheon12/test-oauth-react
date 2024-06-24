
export function parseQueryParameters(url) {
    console.log("parseQueryParameters url", url)
    const params = {};
    const queryString = url.split('?')[1];
    const queryParts = queryString.split('&');

    queryParts.forEach(part => {
        const [key, value] = part.split('=');
        params[key] = decodeURIComponent(value);
    });

    
    console.log("parseQueryParameters params", params)

    return params;
}