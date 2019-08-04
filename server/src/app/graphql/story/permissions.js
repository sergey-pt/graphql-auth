import {
  isAuthenticated
} from '~/src/app/auth/rules'

const storiesPermissions = {
  Mutation: {
    createStory: isAuthenticated,
    updateStory: isAuthenticated,
    deleteStory: isAuthenticated
  }
}

export {
  storiesPermissions
}
