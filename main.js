const button = document.querySelector("#search");
const button1 = document.querySelector("#search1");


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
        let name = data.features[0].place_name;
        
        // second api
        const spaceURL = `https://satellites.fly.dev/passes/${norad.value}?lat=${latitude}&lon=${longitude}3&limit=1&days=15&visible_only=true`
        // encode second api
        const encodeSpace = encodeURI(spaceURL)
        // fetch
        fetch(encodeSpace)
        
        .then((res) => res.json())
        
        .then((dataAPI) => {
            console.log("spaceURL:", dataAPI)
            const culmination = dataAPI[0].culmination.utc_datetime;
            const rise = dataAPI[0].rise.utc_datetime;
            const set = dataAPI[0].set.utc_datetime;
            console.log(culmination, rise, set)
            const container2 = document.querySelector('#results')
            function createHTML(dataAPI) {
            let html = `
                <div class="section">
                    <h1>
                        Your Satellite Info Station
                    </h1>
                    <div class="row">
                    <div id="row>Location: ${name}</div>
                    <div class="row">
                    <div id="articleBoxScore">Culmination: ${culmination}</div>
                    <div id="articleBoxAuthor">Rise: ${rise}</div>
                    <div id="articleBoxComments">Set: ${set}</div>
                    </div>
                    </div>
                </div>`
                        container2.innerHTML += html;
                    }
                    createHTML(data)
                })
        })
})

const Give = new Audio('Give.mp3');
button1.addEventListener("click", function(){
    Give.play()
})