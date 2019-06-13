import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import '../../../css/train-upload.css';

const Dragger = Upload.Dragger;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};


class TrainUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="context-body">
                <div className="upload-body">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="upload" height="10em" width="10em" style={{ color: '#08c' }} />
                        </p>
                        <p className="ant-upload-text">点击上传你的培训资料</p>
                        <p className="ant-upload-hint">
                            支持TXT、Word、EXCEL、PPT、主流视频格式
                    </p>
                    </Dragger>
                </div>
            </div>
        );
    }

}

export default TrainUpload