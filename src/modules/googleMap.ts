import * as mapIcon from "../assets/images/contactDropPoint.png";

declare global {
    interface Window {
        initMap: () => void
    }
    let google : any
}

export function setupGoogleMap(settings: {
    apiKey: string
    locations : {
        position: {
            lat: number,
            lng: number
        },
        url: string
    }[],
    center : {
        lat: number,
        lng: number
    },
    styles : any[]
}) {
    let script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';  
    script.async = true;
    script.defer = true;  
    script.src = `https://maps.googleapis.com/maps/api/js?key=${settings.apiKey}&callback=initMap`;
    document.getElementsByTagName('body')[0].appendChild(script);
    
    window.initMap = ()=> {
        let map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 8,
            center: settings.center,
            scrollwheel: false,
            styles: settings.styles
        });

        for(let location of settings.locations){
            let marker = new google.maps.Marker({
                position: location.position,
                map: map,
                icon: mapIcon,
                url: location.url
            });

            marker.addListener('click', function () {
                window.open(this.url, '_blank');
            });
        }
    }
}