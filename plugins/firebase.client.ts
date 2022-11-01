import {defineNuxtPlugin} from "#imports"
import {initializeApp} from "@firebase/app";
import {getAnalytics} from "@firebase/analytics";

export const FIREBASE_CONTEXT_CONSTANT = Symbol.for('firebase')
export const FIREBASE_ANALYTICS_CONSTANT = Symbol.for('firebase_analytics')

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

    const ctx = initializeApp(firebaseConfig)
    const analytics = getAnalytics(ctx)

    return {
        provide: {
            [FIREBASE_CONTEXT_CONSTANT]: ctx,
            [FIREBASE_ANALYTICS_CONSTANT]: analytics
        }
    }
})
