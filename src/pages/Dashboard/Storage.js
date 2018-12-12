import React, {Component} from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Col, Card, Avatar, List, Tooltip, Icon, Dropdown, Menu } from 'antd';
import styles from './Workplace.less';
import logo from '../../assets/dataset.svg';
import Link from 'umi/link';
import Ellipsis from '@/components/Ellipsis';


@connect(({dataset})=>({
    list: dataset.list
}))
class Storage extends Component{
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch({
            type: "dataset/queryDatasetList"
        })
    }

    // getDatasetDescription = (item) => {
    //     const description = item.spec.description!==""?item.spec.description:"No description";
    //     const readonly = item.spec.readonly!==undefined?"True":"False";
    //     return (
    //         <span>
    //             <p>{"Size: "+item.spec.size}</p>
    //             <p>{"Description: "+ description}</p>
    //             <p>{"ReadOnly: " + readonly}</p>
    //         </span>
    //     )
    // }

    render() {
        const itemMenu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">
                  1st menu item
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">
                  2nd menu item
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="#">
                  3d menu item
                </a>
              </Menu.Item>
            </Menu>
          );

        const {list} = this.props;
        return(
            <PageHeaderWrapper title="Current Datasets">
                <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <List
                            rowKey="id"
                            style={{ marginTop: 24 }}
                            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <Card
                                        hoverable
                                        bodyStyle={{ paddingBottom: 20 }}
                                        actions={[
                                        <Tooltip title="下载">
                                            <a href={item.status.endpoint} target="_blank" rel="noopener noreferer">
                                                <Icon type="download" />
                                            </a>
                                        </Tooltip>,
                                        <Tooltip title="编辑">
                                            <Icon type="edit" />
                                        </Tooltip>,
                                        <Tooltip title="分享">
                                            <Icon type="share-alt" />
                                        </Tooltip>,
                                        <Dropdown overlay={itemMenu}>
                                            <Icon type="ellipsis" />
                                        </Dropdown>,
                                        ]}
                                    >
                                    <Card.Meta
                                        avatar={<img alt="" className={styles.cardAvatar} src={item.spec.thumbnailURL} />}
                                        title={<a>{item.metadata.name}</a>}
                                        description={
                                        <Ellipsis className={styles.item} lines={3}>
                                            {item.spec.description}
                                        </Ellipsis>
                                        }
                                    />
                                </Card>
                            </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </PageHeaderWrapper>
        )
    }
}

export default Storage;