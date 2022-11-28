import { useState, useEffect } from 'react'

function useGeolocation() {
    const [userLocation, setUserLocation] = useState({
        latitude: '',
        longitude: '',
    })
    const [allowsGeolocation, setAllowsGeolocation] = useState(false)
    const [userZIP, setUserZIP] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                setAllowsGeolocation(true)
            })
        }
    }, [allowsGeolocation])

    function setZIP(zip) {
        setUserZIP(zip)
        return userZIP
    }

    return [userLocation, allowsGeolocation, userZIP, setZIP]
}

export default useGeolocation
