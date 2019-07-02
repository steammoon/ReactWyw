import React from 'react';
import { Upload, Icon, message } from 'antd';
//import http from '../../../http';

//const url = {"GET_DATA": http.grobal + 'HWFile/newfile'}

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class TrainUpload1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="upload-all-body">
                <div className="left-body">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或拖拽到此区域上传</p>
                        <p className="ant-upload-hint">
                            支持常用格式的视频、音频和office文件
                    </p>
                    </Dragger>
                </div>
                <div className="floatIcon">OR</div>
                <div className="right-body">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">关联AnyShare文件</p>
                        <p className="ant-upload-hint">
                            选择爱数文件柜的已有文档关联
                    </p>
                    </Dragger>
                </div>
                
            </div>
        )
    }

}

export default TrainUpload1