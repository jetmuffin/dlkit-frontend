import React, {Component} from 'react';
import { Icon, Button, Avatar } from 'antd';
import styles from './Login.less';
import logo from '../../assets/8899.png';
import { connect } from 'dva';

const mapStateToProps = (state) => {
    const {clientId,clientSecret } = state.login;
    return {
        clientId: clientId,
        clientSecret: clientSecret
    }
}

@connect(mapStateToProps)
class Login extends Component{
    handleLogin = () => {
        const {dispatch} = this.props;
        dispatch({ type: "login/loginWithLDAP" });
    }
    componentWillMount() {
        this.handleLogin()
    }

    render() {
        return (
            <div className={styles.box}>
                {/* <div className={styles.unit}>
                    <img src={logo} height="128px" width="256px"/>
                    <Button type="primary" size="large" onClick={this.handleLogin}>Login with LDAP account</Button>
                </div> */}
            </div>
        );
    }
}

export default Login;