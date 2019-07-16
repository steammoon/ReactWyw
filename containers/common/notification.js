import React from 'react';
import { Icon, notification } from 'antd';

//封装通知提醒

let notify = {
    openNotification: ""
};


notify.openNotification = function (title, content) {
    notification.open({
        message: title,
        description: content,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
}


export default notify;