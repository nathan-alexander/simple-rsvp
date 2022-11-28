const API_KEY = import.meta.env.VITE_MAPS_API_KEY

async function getCoordinatesFromAddress(address) {
    let addressString = `${address.street}, ${address.city}, ${address.state}`

    let response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${API_KEY}`
    )
    let data = await response.json()
    return data.results[0].geometry.location
}

async function getCoordinatesFromZIP(zip) {
    let response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&components=postal_code:${zip}`
    )
    let data = await response.json()
    return data.results[0].geometry.location
}

export { getCoordinatesFromAddress, getCoordinatesFromZIP }
