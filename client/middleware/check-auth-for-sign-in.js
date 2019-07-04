export default function({ store, req, redirect }) {
  if (process.server && !req) return

  if (store.getters['users/isAuthenticated']) {
    return redirect('/')
  }
}
