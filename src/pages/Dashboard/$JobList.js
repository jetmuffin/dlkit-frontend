import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,
  Table,
  Tag,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';

import styles from './JobList.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ job, loading }) => ({
  job,
  workspace: job.workspace,
  log: job.log,
  loading: loading.models.list,
}))
@Form.create()
class JobList extends PureComponent {
  state = { visible: false, done: false};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  // columns = [{
  //   title: 'name',
  //   key: 'name',
  //   dataIndex: 'name'
  // },{
  //   title: 'label',
  //   key: 'label',
  //   dataIndex: 'label'
  // },{
  //   title: 'node',
  //   key: 'node',
  //   dataIndex: 'nodeName'
  // },{
  //   title: 'log',
  //   key: 'log',
  //   render: name=><a href="javascript:void(0);" onClick={this.showLog(name)}>log</a>
  // }]

  JobColumns = [{
    title: 'name',
    dataIndex: 'name'
  },{
    title: 'startTime',
    dataIndex: 'startTime',
    render: startTime=>{
      let timeStr = startTime.replace('Z','');
      timeStr = timeStr.replace('T',' ');
      return <p>{moment(timeStr).utcOffset('-0800').format('YYYY-MM-DD HH:mm')}</p>}
  },{
    title: 'completeTime',
    dataIndex: 'completeTime',
    render: completeTime=>{
      let timeStr = completeTime.replace('Z','');
      timeStr = timeStr.replace('T',' ');
      return <p>{moment(timeStr).utcOffset('-0800').format('YYYY-MM-DD HH:mm')}</p>}
  },{
    title: 'status',
    dataIndex: 'status',
    render: status=>{
      let color
      switch(status){
        case 'SUCCEEDED': color="green";break;
        case 'FAILED': color="red";break;
        case 'PENDING': color="orange";break;
        case 'UNKNOWN': color="cyan";break;
        case 'RUNNING': color="blue";break;
        default: break;
      }
      return <Tag color={color}>{status}</Tag>
    }
  },{
    title: 'Operation',
    render: record=>(
      <div>
        <Button type="primary" onClick={this.podInfo(record)}>详情</Button>
      </div>
    )
  }]

  componentDidMount() {
    const { dispatch,location } = this.props;
    const pathToken = location.pathname.split("/");
    dispatch({
      type: 'job/fetch',
      payload: pathToken[4]
    });
  }

  podInfo = (item) => () => {
    Modal.info({
      title: 'Pods list',
      // content: <Table dataSource={item.pods} columns={this.columns}  rowKey={(item)=>item.name}/>
      content: 
      <List
        itemLayout="horizontal"
        dataSource={item.pods}
        renderItem={item => (
          <List.Item actions={[<a onClick={this.showLog(item)}>log</a>]}>
              <List.Item.Meta
                title={<a>{item.name}</a>}
                description={"this pod runs at node " + item.node + " with a label of " + item.label}
              />
          </List.Item>
        )}
      />
    })
  }

  getLog = (log) => {
    let parray = []
    log.forEach(element => {
      parray.push(<p>{element}</p>)
    });
    return parray
  }

  logInfo = (log) => {
    Modal.info({
      title: 'Log',
      content: 
      <span>
        {this.getLog(log)}
      </span>
    })
  }

  showLog = (pod) => () => {
    const {dispatch} = this.props;
    const load = {
      name: pod.name,
      callback: this.logInfo
    }
    dispatch({
      type: 'job/fetchLog',
      payload: load
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'job/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'job/submit',
      payload: { id },
    });
  };

  render() {
    const {
      job: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return (
      <PageHeaderWrapper title="All Jobs">
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
            className={styles.listCard}
            bordered={true}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Table dataSource={list} columns={this.JobColumns} rowKey={item=>item.name}/>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default JobList;
