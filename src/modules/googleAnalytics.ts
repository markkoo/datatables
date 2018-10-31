import { hasNoTrackingCookies } from './noTracking';

declare global {
    let gtag: (...args: any[]) => void
    interface Window {
        dataLayer: any[]
    }
}

export function setupGA(googleAnalyticsId: string) {
    if(hasNoTrackingCookies()) return;
    let script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.getElementsByTagName('head')[0].appendChild(script);
 
    // 因为它需要定义全局变量，所以不能再 ts 里面写. 
    let script2 = document.createElement('script') as HTMLScriptElement;
    script2.type = 'text/javascript';
    script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());    
        gtag('config', '${ googleAnalyticsId }', {
            'custom_map': {
                'dimension1': 'scrolled'
            }
        });
    `;
    document.getElementsByTagName('head')[0].appendChild(script2);

    setTimeout(()=>{
        gtag('event', 'scrolled_dimension', {
            'scrolled': 'true'
        });
    },15000);
  
    document.querySelectorAll<HTMLElement>('.googleAnalyticsTracking').forEach(elem => {
        if(elem.nodeType == 1){
            //form
            elem.addEventListener('submit',(e)=>{
                e.preventDefault();
                const formData = new FormData(elem as HTMLFormElement);
                // const trackEventName = formData.get('action') as string;
                // gtag('event', `event_${trackEventName}`, {
                //     'event_category': `event_${trackEventName}`,
                //     'event_label': `event_${trackEventName}`,
                //     'value': 1
                // });
                console.log(formData)
            });
        }
        else{
            elem.addEventListener('click', () => {            
                const trackEventName = elem.dataset['googleAnalyticsEvent'];
                // gtag('event', `event_${trackEventName}`, {
                //     'event_category': `event_${trackEventName}`,
                //     'event_label': `event_${trackEventName}`,
                //     'value': 1
                // });
            });
        }
        
    });   
}

export function setEvent(eventName:string, eventCategory?:string, eventLabel?:string ){
    if(hasNoTrackingCookies()) return;
    eventCategory = eventCategory || eventName;
    eventLabel = eventLabel || eventName;
    gtag('event', `event_${eventName}`, {
        'event_category': `event_${eventCategory}`,
        'event_label': `event_${eventLabel}`,
        'value': 1
    });
}


