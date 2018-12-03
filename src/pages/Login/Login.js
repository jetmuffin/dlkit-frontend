import React, {Component} from 'react';
import { Icon, Button, Avatar } from 'antd';
import styles from './Login.less';
import logo from '../../assets/8899.png';
import { connect } from 'dva';

@connect()
class Login extends Component{
    handleLogin = () => {
        const {dispatch} = this.props;
        dispatch({ type: "login/loginWithLDAP" });
    }

    render() {
        return (
            <div className={styles.box}>
                <div className={styles.unit}>
                    {/* <Icon logo={logo} theme="outlined" style={{fontSize: '128px'}}/> */}
                    <img src={logo} height="128px" width="256px"/>
                    <Button type="primary" size="large" onClick={this.handleLogin}>Login with LDAP account</Button>
                </div>
            </div>
        );
    }
}

export default Login;