import request from "../request";

// export function getUsersList(params) {
//     return request({
//         url: '/users',
//         method: 'get',
//         data: params,
//     })
// }

export function getUsersList(params) {
    return request({
        url: `/authority/users`,
        method: 'get',
        data: params
    })
}

export function getUserById(id) {
    return request({
        url: `/authority/users/${id}`,
        method: 'get',
    })
}

export function login(user) {
    return request({
        url: `/authority/users/logIn`,
        method: 'post',
        data: user
    })
}

export function register(user) {
    return request({
        url: `/authority/users/register`,
        method: 'post',
        data: user
    })
}

export function updateUname(id, newName) {
    return request({
        url: `/authority/users/${id}/uname`,
        method: 'put',
        params: {uname: newName}
    })
}

export function updateEmail(id, newEmail) {
    return request({
        url: `/authority/users/${id}/email`,
        method: 'put',
        params: {email: newEmail}
    })
}

export function updatePassword(id, oldPassword, newPassword) {
    return request({
        url: `/authority/users/${id}/password`,
        method: 'put',
        params: {old_password: oldPassword, new_password: newPassword}
    })
}

export function updatePasswordAdmin(id, password) {
    return request({
        url: `/authority/users/${id}/admin_password`,
        method: 'put',
        params: {password: password}
    })
}