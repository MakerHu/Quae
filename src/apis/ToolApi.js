import request from "../request";

export function getToolsPage(pageParams) {
    return request({
        url: `/tool/tools`,
        method: 'get',
        data: pageParams
    })
}

export function getOneTool(toolId) {
    return request({
        url: `/tool/tools/${toolId}`,
        method: 'get'
    })
}

export function saveTool(toolMsg) {
    return request({
        url: `/tool/tools`,
        method: 'post',
        data: toolMsg
    })
}

export function updateTool(toolMsg) {
    return request({
        url: `/tool/tools/${toolMsg.id}`,
        method: 'put',
        data: toolMsg
    })
}

export function getToolIntro(toolId) {
    return request({
        url: `/tool/tools/tool-intro/${toolId}`,
        method: 'get'
    })
}

export function updateToolStatus(toolId, status) {
    return request({
        url: `/tool/tools/update-status/${toolId}`,
        method: 'put',
        params: { status: status}
    })
}