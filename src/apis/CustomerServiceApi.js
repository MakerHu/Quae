import request from "../request";

export function askChatGpt(questions) {
    return request({
        url: `/customer-service/chatgpt/questions`,
        method: 'post',
        data: questions
    })
}