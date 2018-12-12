import React, {Component} from 'react';
import { Table, Button, Modal, Form, Select, InputNumber, Row, Col, Input, Divider, Card, Tag, Popover, Checkbox } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import { withRouter } from 'dva/router';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './JobList.less';
import CheckboxGroup from '_antd@3.11.0@antd/lib/checkbox/Group';

class SizeUnit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            max: 10,
            min: 0,
            number: 0,
            unit: "Gi"
        };
    }

    numberChange = (number) => {
        const { max,min } = this.state;
        this.setState({
            ...this.state,
            number: number>max?max:number,
            number: number<min?min:number,
        });
        this.triggerChange();
    }

    unitChange = (unit) => {
        let maxNumber = 10;
        switch(unit){
            case "Gi": maxNumber = 10;break;
            case "Mi": maxNumber = 10000;break;
            case "Ki": maxNumber = 10000000;break;
            default: maxNumber = 10;
        }
        this.setState({
            ...this.state,
            max: maxNumber,
            unit: unit,
        })
        this.triggerChange();
    }

    triggerChange = () => {
        const { onChange } = this.props;
        const size = this.state.number+this.state.unit;
        if(onChange){
            onChange(size);
        }
    }

    render() {
        const { Option } = Select;
        const { max, min } = this.state;
        return (
            <Col>
              <Col span={10}>
                <InputNumber max={max} min={min} onChange={this.numberChange} defaultValue={0}/>
              </Col>
              <Col span={5}>
                <Select onChange={this.unitChange} defaultValue={"Gi"}>
                  <Option value="Gi">Gi</Option>
                  <Option value="Mi">Mi</Option>
                  <Option value="Ki">Ki</Option>
                </Select>
              </Col>
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    const workspaceList = state.workspace.list;
    return {
        workspaceList,
    }
}

const mapDispatchToProps = (dispatch) => {
    const queryWorkspaceList = () => {
        dispatch({
            type: "workspace/queryWorkspaceList",
        })
    }
    const createNewWorkspace = (params) => {
        dispatch({
            type: "workspace/createNewWorkspace",
            payload: params
        })
    }
    const deleteWorkspace = (params) => {
        dispatch({
            type: "workspace/deleteWorkspace",
            payload: params
        })
    }
    const putWorkspace = (params) => {
        dispatch({
            type: "workspace/putWorkspace",
            payload: params
        })
    }
    const setWorkspace = (params) => {
        dispatch({
            type: "job/setWorkspace",
            payload: params
        })
    }
    return {
        queryWorkspaceList,
        createNewWorkspace,
        deleteWorkspace,
        putWorkspace,
        setWorkspace
    }
}

class BasicWorkspace extends Component{
    state = {
        visible: false,
    }

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    showNewWorkspaceModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleNotebook = (record) => {
        if(record.status.phase==="Running"){
          const path = record.status.endpoints.notebook+'?token='+record.spec.token;
          return <a href={path} target="_blank" rel="noopener noreferrer">notebook</a>
        }
        else{
          return <a href="javascript:void(0);">notebook</a>
        }
    }

    handleDelete = (record) => () => {
        console.log(record);
        // debugger
        const { metadata } = record;
        const { deleteWorkspace } = this.props;
        deleteWorkspace(metadata.name);
    }

    handleJobs = (record) => () => {
        const { metadata } = record;
        const { setWorkspace } = this.props;
        setWorkspace(metadata.name);
    }

    handleOK = (e) => {
        const { form,createNewWorkspace } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
              const params = {
                  metadata: { name:values.name },
                  spec: {
                      size:values.size,
                      jobSpec: { trainer: values.frame },
                      dataSets: values.datasets
                    },
              }
              createNewWorkspace(params);
            //   console.log('Received values of form: ', params);
            }
        });
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        })
    }

    getJobspecContent = (jobSpec) => {
        // debugger
        return (
        <div>
            <p>{"command: " + jobSpec.command}</p>
            <p>{"ps: " + jobSpec.ps}</p>
            <p>{"trainer: " + jobSpec.trainer}</p>
            <p>{"worker: " + jobSpec.worker}</p>
        </div>
    )}

    componentDidMount() {
        const { queryWorkspaceList } = this.props;
        queryWorkspaceList();
    }

    render() {
        const Info = ({ title, value, bordered }) => (
            <div className={styles.headerInfo}>
              <span>{title}</span>
              <p>{value}</p>
              {bordered && <em />}
            </div>
          );
        const { Column } = Table;
        const { workspaceList,form,setWorkspace } = this.props;
        // debugger
        const { visible } = this.state;
        const { getFieldDecorator } = form;
        const tokenPattern = new RegExp("([a-z]|[A-Z]|[0-9]){0,8}");
        return(
            <div>
                <PageHeaderWrapper title="Current Workspace">
                <div className={styles.standardList}>
                    <Card bordered={true}>
                        <Row>
                            <Col sm={8} xs={24}>
                                <Info title="我的待办(未启用)" value="8个任务" bordered />
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周任务平均处理时间(未启用)" value="32分钟" bordered />
                            </Col>
                            <Col sm={8} xs={24}>
                                <Info title="本周完成任务数(未启用)" value="24个任务" />
                            </Col>
                        </Row>
                    </Card>

                    <Card 
                        bordered={true} 
                        className={styles.listCard}           
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                    >
                        <Table dataSource={workspaceList} rowKey={(record)=>record.metadata.name}>
                            <Column title="Name"  dataIndex="metadata.name"  key="name"/>
                            <Column title="Owner"  dataIndex="spec.owner"  key="owner"/>
                            <Column title="Size"  dataIndex="spec.size"  key="size"/>
                            <Column title="Description"  dataIndex="spec.description"  key="description"/>
                            <Column title="CreationTimestamp"  dataIndex="metadata"  key="creationTimestamp" render={metadata=>{
                                let timeStr = metadata.creationTimestamp.replace('Z','');
                                timeStr = timeStr.replace('T',' ');
                                return <p>{moment(timeStr).utcOffset('-0800').format('YYYY-MM-DD HH:mm')}</p>}}/>
                            <Column title="Status"  dataIndex="status"  key="status" render={status=>status.phase==="Running"?<Tag color='blue'>{status.phase}</Tag>:<Tag color='red'>{status.phase}</Tag>}/>
                            <Column title="Notebook" render={this.handleNotebook} key="notebook"/>
                            <Column title="Jobspec" dataIndex="spec" render={spec=><Popover content={this.getJobspecContent(spec.jobSpec)} title="jobSpec"><a href="javascript:void(0);">show</a></Popover>}/>
                            <Column title="Operation"  render={(record)=>(
                                <span>
                                <Link to={"/dashboard/workspace/jobspace/"+record.metadata.name} onClick={this.handleJobs(record)}>jobs</Link>
                                <Divider type="vertical"/>
                                <a href="javascript:void(0);" onClick={this.handleDelete(record)}>delete</a>
                                </span>
                            )}  key="operation"/>
                        </Table>
                        <Button type="primary" onClick={this.showNewWorkspaceModal}>New</Button>
                    </Card>
                    </div>
                </PageHeaderWrapper>
                <Modal
                  title="New Workspace"
                  visible={ visible }
                  onOk={ this.handleOK }
                  onCancel={ this.handleCancel }
                  okText="Confirm"
                  cancelText="Cancel"
                >
                <Form>
                  <Form.Item label="Name" {...this.formLayout}>
                    {getFieldDecorator('name',{
                        rules: [{
                            required: true,
                            message: "Please input workspace name",
                        }],
                    })(<Input placeholder="Input your workspace name"/>)}
                  </Form.Item>
                  <Form.Item label="Storage Size" {...this.formLayout}>
                    {getFieldDecorator('size',{
                        rules: [{
                            required: true,
                            message: "Please input workspace size",
                        }],
                    })(<SizeUnit/>)}
                  </Form.Item>
                  <Form.Item label="Traniner" {...this.formLayout}>
                    {getFieldDecorator('frame',{
                        rules: [{
                            required: true,
                            message: "Please select your framework",
                        }],
                    })(
                    <Select placeholder="Select your trainer">
                      <Select.Option value="tensorflow">tensorflow</Select.Option>
                      <Select.Option value="pytorch">pytorch</Select.Option>
                      <Select.Option value="mxnet">mxnet</Select.Option>
                      <Select.Option value="standalone">standalone</Select.Option>
                    </Select>
                    )}
                  </Form.Item>
                  <Form.Item label="Datasets" {...this.formLayout}>
                    {getFieldDecorator('datasets',{
                        rules: [{
                            required: false,
                            message: "Please select your datasets",
                        }],
                    })(
                        <CheckboxGroup options={['mnist']}/>
                    )}
                  </Form.Item>
                  {/* <Form.Item>
                    {getFieldDecorator('token',{
                        rules: [{
                            required: true,
                            message: "Please input your token"
                        },{
                            pattern: '[a-zA-Z0-9]{1,8}',
                            message: "wrong pattern"
                        }],
                    })(<Input placeholder="Token"/>)}
                  </Form.Item> */}
                  {/* <Form.Item>
                    {getFieldDecorator('command',{
                        rules: [{
                            required: true,
                            message: "Please input command",
                        }],
                    })(<Input placeholder="Command"/>)}
                  </Form.Item> */}
                </Form>
                </Modal>

            </div>
        )
    }
}

const Workspace = Form.create()(BasicWorkspace);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Workspace));