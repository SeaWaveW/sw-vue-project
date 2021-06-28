export const httpList = [
    { code:'1xx', desc:'接收的请求正在处理' }, // Informational(信息性状态码)
    { code:'2xx', desc:'请求正常处理完毕' }, // Success（成功状态码）
    { code:'3xx', desc:'需要进行附加操作以完成请求' }, // Redirection（重定向状态码）
    { code:'4xx', desc:'服务器无法处理请求' }, // Client Error（客户端错误状态码）
    { code:'5xx', desc:'服务器处理请求错误' }, // Server Error（服务器错误状态码）
    { code:'200', desc:'请求已完成' },
    { code:'300', desc:'多种选择：服务器根据请求可执行多种操作' },
    { code:'301', desc:'永久移动：请求的网页已被永久移动到新位置，将自动转到新位置' },
    { code:'302', desc:'临时移动：将自动转到不同的位置，继续使用原有位置来进行以后的请求' },
    { code:'303', desc:'查看其他位置：服务器将会自动转到其他位置' },
    { code:'304', desc:'未修改：自从上次请求后，请求的网页未被修改过' },
    { code:'305', desc:'使用代理：请求者只能使用代理访问请求的网页' },
    { code:'307', desc:'临时重定向：服务器目前正从不同位置的网页响应请求，将自动转到不同的位置' },
    { code:'400', desc:'错误请求：服务器不理解请求的语法' },
    { code:'401', desc:'未授权：要求进行身份验证' },
    { code:'403', desc:'已禁止：服务器拒绝请求' },
    { code:'404', desc:'未找到：服务器找不到请求的网页' },
    { code:'405', desc:'方法禁用：禁用请求中所指定的方法' },
    { code:'406', desc:'不接受：无法使用请求的内容特性来响应请求的网页' },
    { code:'407', desc:'需要代理授权：请求应使用代理' },
    { code:'408', desc:'请求超时：服务器等候请求时超时' },
    { code:'409', desc:'冲突：服务器在完成请求时发生冲突' },
    { code:'410', desc:'已删除：请求的资源已被永久删除' },
    { code:'411', desc:'需要有效长度：服务器不接受包含无效内容长度标头字段的请求' },
    { code:'412', desc:'未满足前提条件：服务器未满足请求中设置的其中一个前提条件' },
    { code:'413', desc:'请求实体过大：服务器无法处理请求，因为请求实体过大，已超出服务器的处理能力' },
    { code:'414', desc:'请求的URI过长：请求的URI过长，服务器无法进行处理' },//（通常为网址）
    { code:'415', desc:'不支持的类型：请求的格式不受请求页面的支持' },
    { code:'416', desc:'请求范围不符合要求：请求是针对网页的无效范围进行的' },
    { code:'417', desc:'未满足期望值：服务器未满足”期望”请求标头字段的要求' },
    { code:'499', desc:'客户端断开连接：服务端处理时间过长，导致客户端关闭了连接' },
    { code:'500', desc:'服务器内部错误：服务器遇到错误，无法完成请求' },
    { code:'501', desc:'尚未实施：服务器不具备完成请求的功能' },
    { code:'502', desc:'错误网关：上游服务器收到了无效的响应' },
    { code:'503', desc:'服务不可用：目前无法使用服务器（由于超载或进行停机维护）' },
    { code:'504', desc:'网关超时:未及时从上游服务器接收请求' },
    { code:'505', desc:' HTTP版本不受支持' },
]

export const httpMap = ( data ) => {
    let mapItem = httpList.find(item => item.code === data)
    let itemValue = ''
    if(mapItem){
        itemValue = mapItem.desc
    }else{
        let newList = httpList.slice(0,5)
        let newMapItem = newList.find(item => item.code[0] === data[0])
        itemValue = newMapItem ? newMapItem.desc : '暂无法识别该类型错误'
    }
    return itemValue
}

export default {
    httpList,
    httpMap
}