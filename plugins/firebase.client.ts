import {defineNuxtPlugin, useApp} from "#imports"
import {initializeApp} from "@firebase/app";
import {getAnalytics} from "@firebase/analytics";
import {getAuth} from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {

    const firebaseConfig = {
        apiKey: "AIzaSyClwxnAjVYD5hgtIb6fPv2q7WpBKxBIBPE",
        authDomain: "it-square-faf8b.firebaseapp.com",
        databaseURL: "https://it-square-faf8b-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "it-square-faf8b",
        storageBucket: "it-square-faf8b.appspot.com",
        messagingSenderId: "804038723348",
        appId: "1:804038723348:web:2e305c536f783dd623e401",
        measurementId: "G-4G3BL27GFH"
    }

    const app = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app)
    const auth = getAuth(app)
    const kokiApp = useApp()

    nuxtApp.hooks.hook('app:mounted', () => {
        // Listen to Supabase auth changes
        auth.onIdTokenChanged(async (user) => {
            if (user) {
                kokiApp.token = await user.getIdToken()
                if(kokiApp.token) {
                    try {
                        await $fetch('/api/auth', {
                            method: 'POST',
                            body: {
                                token: kokiApp.token
                            }
                        })
                        await kokiApp.getUser()
                    } catch (e) {
                        //
                        kokiApp.token = ''
                    }
                }
            } else {
                kokiApp.token = ''
            }
        })
    })

    return {
        provide: {
            firebase: app,
            analytics
        }
    }
})
