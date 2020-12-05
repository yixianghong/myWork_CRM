importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js');
importScripts('/scripts/firebaseinit.js');

// install
self.addEventListener('install', event => {
    console.log('installing…');
});

// activate
self.addEventListener('activate', event => {
    console.log('now ready to handle fetches!');
});

// fetch
self.addEventListener('fetch', event => {
    console.log('now fetch!');
});

var click_action;

// 監聽notifiction點擊事件
self.addEventListener('notificationclick', function (event) {
    var url = click_action;
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        }).then(windowClients => {
            // 如果tab是開著的，就 focus 這個tab

            //for (var i = 0; i < windowClients.length; i++) {
            //    var client = windowClients[i];
            //    if (client.url === url && 'focus' in client) {
            //        return client.focus();
            //    }
            //}
            //// 如果沒有，就新增tab
            //if (clients.openWindow) {
            //    return clients.openWindow(click_action);
            //}
        })
    );
});

messaging.setBackgroundMessageHandler(function (payload) {
    let Info = payload.notification

    return ShowNotification(Info.title, Info.body, Info.icon, click_action);
});

function ShowNotification(title, body, icon, action) {
    navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: title,
            click_action: action
        });
    });
}