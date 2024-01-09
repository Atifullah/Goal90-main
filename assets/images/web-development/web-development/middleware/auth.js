export default function ({ app, store, route, redirect, query, res, req }) {
    const auth = store.state.hex_server_user_info.value
    if (!auth || auth == '' || auth == undefined) {
        return redirect('/login')
    }
}