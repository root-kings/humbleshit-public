/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching'

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)

console.log('Custom Service Worker...')
const channel = new BroadcastChannel('pushSubscribe')

const publicVapidKey =
  'BBgw_2cKJMpRtx6nBelRS0UEBLO0nbk-YnwWWP2HmEkp7qvGatf99IEGdH5nw3us87wIdHmSzWmGtqFgD0-yuN8'

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = Buffer.from(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async subscription => {
  const SERVER_URL = 'http://localhost:3000/api/notifier/'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ subscription: JSON.stringify(subscription) })
  })
  return response.json()
}

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  console.log('activated here...')
  try {
    const applicationServerKey = urlB64ToUint8Array(publicVapidKey)
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    let subs = JSON.stringify(subscription)
    response = await saveSubscription(subscription)
    channel.postMessage({subscription: response})
  } catch (err) {
    console.log('Error', err)
  }
})

self.addEventListener('push', function (event) {
  if (event.data) {
    showLocalNotification('humbleShit', event.data.text(), self.registration)
  } else {
    console.log('Push event but no data')
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body: "Welcome!",
    icon: "https://pics.freeicons.io/uploads/icons/png/2674342741552644384-512.png",
    actions: [
      {
        action: 'coffee-action',
        title: 'Coffee',
        icon: '/images/demos/action-1-128x128.png'
      },
    ]
  }
  swRegistration.showNotification(title, options)
}
