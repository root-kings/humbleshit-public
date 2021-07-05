import { register } from 'register-service-worker'
import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

const channel = new BroadcastChannel('pushSubscribe')

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  registrationOptions: { scope: '/src-pwa' },

  ready(/*registration*/) {
  },

  registered(registration) {
    console.log('Service worker has been registered.')

    channel.onmessage = (event) => {
      localStorage.setItem("pushSubscriptionId", event.data.subscription._id)
    }

    const getNotification = () => {
      const subscriptionId = localStorage.getItem("pushSubscriptionId")
      const SERVER_URL = 'http://localhost:3000/api/notifier/' + subscriptionId
      const response = fetch(SERVER_URL, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      })
      console.log("response, notifier: ", response)    
    }
    getNotification()

    // const requestNotificationPermission = async () => {
    //   const permission = await window.Notification.requestPermission()
    //   // value of permission can be 'granted', 'default', 'denied'
    //   // granted: user has accepted the request
    //   // default: user has dismissed the notification permission popup by clicking on x
    //   // denied: user has denied the request.
    //   if (permission !== 'granted') {
    //     throw new Error('Permission not granted for Notification')
    //   }
    // }
    // const permission = requestNotificationPermission()
  },

  cached(/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound(/* registration */) {
    // console.log('New content is downloading.')
  },

  updated(/* registration */) {
    // console.log('New content is available; please refresh.')

    Notify.create({
      message: 'Update is available. Please refresh.',
      color: 'white',
      textColor: 'black',
      actions: [
        {
          label: 'Update',
          color: 'black',
          handler: () => {
            location.reload()
          }
        }
      ]
    })
  },

  offline() {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error(/* err */) {
    // console.error('Error during service worker registration:', err)
  }
})
