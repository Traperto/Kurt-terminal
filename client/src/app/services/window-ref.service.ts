import { Injectable } from '@angular/core';

function _window(): any {
    return window;
}

@Injectable({
    providedIn: 'root',
})
export class WindowRef {
    get nativeWindow(): any {
        return _window();
    }

    public dispatchEvent(eventName: string) {
        if (this.isIE()) {
            const event = _window().document.createEvent('UIEvents');
            event.initUIEvent(eventName, true, false, window, 0);
            _window().dispatchEvent(event);
        } else {
            _window().dispatchEvent(new Event(eventName));
        }
    }

    public isIE() {
        return (
            navigator.appName === 'Microsoft Internet Explorer' ||
            new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) != null
        );
    }

    public isEdge() {
        return !this.isIE() && !!this.nativeWindow.StyleMedia;
    }
}
