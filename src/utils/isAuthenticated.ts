export const isAuthenticated = () => {
    const user = localStorage.getItem('token')

    if (user) return true

    return false
}