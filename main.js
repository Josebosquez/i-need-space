const button = document.querySelector("#search");

button.addEventListener("click", function () {
    const address = document.querySelector('#address')
    const apiKey = document.querySelector("#api-key")
    const norad = document.querySelector('#norad')

    let URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${apiKey.value}`;
    const encodeURL = encodeURI(URL)
    fetch(encodeURL)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let longitude = data.features[0].center[0];
            let latitude = data.features[0].center[1];



            // second api
            const spaceURL = `https://satellites.fly.dev/passes/${norad.value}?lat=${latitude}&lon=${longitude}3&limit=1&days=15&visible_only=true`
            // encode second api
            const encodeSpace = encodeURI(spaceURL)
            // fetch
            fetch(encodeSpace)

                .then((res) => res.json())

                .then((data) => {
                    console.log("spaceURL:", data)
                    const culmination = data[0].culmination.utc_datetime
                    const rise = data[0].rise.utc_datetime
                    const set = data[0].set.utc_datetime
                    console.log(culmination, rise, set)
                })
        })
})