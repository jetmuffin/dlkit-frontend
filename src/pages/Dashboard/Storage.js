import React, {Component} from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Col, Card, Avatar } from 'antd';
import styles from './Workplace.less';
import logo from '../../assets/dataset.svg';
import Link from 'umi/link';


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

    getDatasetDescription = (item) => {
        const description = item.spec.description!==""?item.spec.description:"No description";
        const readonly = item.spec.readonly!==undefined?"True":"False";
        return (
            <span>
                <p>{"Size: "+item.spec.size}</p>
                <p>{"Description: "+ description}</p>
                <p>{"ReadOnly: " + readonly}</p>
            </span>
        )
    }

    render() {
        const {list} = this.props;
        console.log(list)
        return(
            <PageHeaderWrapper title="Current Datasets">
                <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            style={{ marginBottom: 24 }}
                            bordered={false}
                            bodyStyle={{ padding: 0 }}>
                            {list.map(item => (
                                <Card.Grid className={styles.projectGrid} key={item.metadata.name}>
                                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                                    <Card.Meta
                                        title={
                                        <div className={styles.cardTitle}>
                                            <Avatar size="large" src={logo} />
                                            <a href={item.status.endpoint} target="_blank" rel="noopener noreferrer">{item.metadata.name}</a>
                                        </div>
                                        }
                                        description={this.getDatasetDescription(item)}
                                    />
                                    </Card>
                                </Card.Grid>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        )
    }
}

export default Storage;