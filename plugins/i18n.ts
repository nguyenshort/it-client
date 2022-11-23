import { createI18n } from 'vue-i18n'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {
        menu: {
          home: 'Home',
          technology: 'Technology',
          category: 'Category',
          studio: 'Studio',
          search: 'Search...',
          job: 'Find Job',
          blog: 'Blog',
          logout: 'LogOut'
        },
        home: {
          onBroad: 'On Broad',
          onBroadSub: 'Projects that allow registration to participate.',
          running: 'Running Project',
          done: 'Done Project',
          showCase: 'Show Case'
        },
        general: {
          waiting: 'Waiting',
          full: 'Full',
          des: 'Description',
          teams: 'Teams',
          join: 'Join',
          wait: 'Wait',
          seeMore: 'See More',
          comment: 'Comment',
          issues: 'Issues',
          start: 'Start',
          end: 'End',
          review: 'Review',
          views: 'Views',
          enclose: 'Enclose',
          progress: 'Progress',
          weAreHiring: 'Welcome to join us',
          discovering: 'We are discovering this project',
          joinNow: 'Join Now',
          members: 'Members',
          otherProjects: 'Other Projects',
        },
        review: {
          design: 'Good looking design',
          speed: 'Growth Speed',
          document: 'Manual document',
          vision: 'Project Vision',
          welcome: "Let's leave a review for us"
        }
      }
    }
  })
  nuxtApp.vueApp.use(i18n)
})
