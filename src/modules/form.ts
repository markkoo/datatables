
// note : 不支持 input file 哦
export function localStorageForm(settings: {
    elementId: string,
    localStorageKey: string,
    redirectUrl: string
}): void {
    const { elementId, localStorageKey, redirectUrl } = settings;
    const form = document.getElementById(elementId);
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement)
        let store: any = {};
        formData.forEach((value, key) => {
            store[key] = value;
        });
        localStorage.setItem(localStorageKey, JSON.stringify(store));
        location.href = redirectUrl;
    });
}


export function ajaxForm(settings: {
    elementId: string
    beforeSend: () => void
    success: (responseText: string) => void
    error: (responseText: string) => void
    finally: () => void
    processing?: (percent: number) => void
    combineToFormData?: { [propName : string] : any }[]
}): void {
    settings.processing = settings.processing || function () { };
    settings.combineToFormData = settings.combineToFormData || [];
    const { elementId, error, success, processing, combineToFormData } = settings;
    const form = document.getElementById(elementId);
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    success(xhr.responseText);
                }
                else {
                    console.error({
                        status: xhr.status,
                        responseText: xhr.responseText
                    });
                    error(xhr.responseText);
                }
                settings.finally();
            }
        });
        xhr.onprogress = function (event) {
            processing(+Math.round(event.loaded / event.total * 100).toFixed(0));
        };
        console.log(formElement.action)
        xhr.open("POST", formElement.action, true);
        let formData = new FormData(formElement);
        if (combineToFormData.length > 0) {
            combineToFormData.forEach(obj => {
                Object.keys(obj).forEach(key => {
                    formData.append(key, obj[key]);
                });
            });
        }
        xhr.send(formData);
    });
}
