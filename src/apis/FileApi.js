import request from "../request";

export function getFile(tid) {
    return request({
        url: `/file/files/${tid}`,
        method: 'get',
    })
}

export function getFileList(current, size) {
    return request({
        url: `/files`,
        method: 'get',
        data: {
            current: current,
            size: size
        }
    })
}

export function downloadFile(fileExternalLink) {
    return request({
        url: `/files/${fileExternalLink}`,
        method: 'get'
    })
}

// file为FormData对象
// var formFile = FormData()
// formFile.append("file": file_object)
// uploadFile(formFile)
export function uploadFile(file) {
    return request({
        url: `/files/upload`,
        method: 'post',
        header: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}

export function updateFile(params) {
    return request({
        url: `/file/files/update`,
        method: 'post',
        data: params,
    })
}

export function deleteFile(fid) {
    return request({
        url: `/files/delete`,
        method: 'delete',
        data: {
            fid: fid
        }
    })
}