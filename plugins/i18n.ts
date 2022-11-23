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
          logout: 'Log Out'
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
          upload: 'Upload'
        },
        review: {
          design: 'Good looking design',
          speed: 'Growth Speed',
          document: 'Manual document',
          vision: 'Project Vision',
          welcome: "Let's leave a review for us"
        },
        auth: {
          login: 'Login',
          signup: 'Signup',
          name: 'Name',
          email: 'Email ID',
          pass: 'Password',
          forgot: 'Forgot password?',
          haveAccount: 'Have a account?',
          signUpNew: 'Create a new account?',
          with: 'Login With'
        },
        resume: {
          request: 'Send a Proposal',
          warning: 'We will send your information in own system to project owner',
          already: 'You are already approved by the employer',
          edit: 'You have already sent a proposal to this job. You can edit your',
          selectPosition: 'Select a Position',
          coverLetter: 'Cover Letter',
          resume: 'Resume',
          uploadYour: 'Upload your resume',
          tip: 'Tip',
          waiting: 'Waiting for approving',
          approved: 'Your request had been approved',
          rejected: 'Your request had been rejected',
          success: 'Your request had been sent',
          promise: 'We will send the results to you as soon as possible',
          owner: 'You are owner',
          controller: 'You can control the all request on studio',
          ok: 'Ok',
          collect: 'We are collecting the data from the database',
          resend: 'Re Send',
          send: 'Send'
        }
      }
    }
  })
  nuxtApp.vueApp.use(i18n)
})
