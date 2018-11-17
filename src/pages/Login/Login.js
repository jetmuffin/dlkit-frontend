import React, {Component} from 'react';
import { Icon, Button } from 'antd';
import styles from './Login.less'
import { connect } from 'dva';

const mapStateToProps = (state) => {
    const {clientId,clientSecret } = state.login;
    return {
        clientId: clientId,
        clientSecret: clientSecret
    }
}

const mapDispatchToProps = (dispatch) => {
    const loginWithGithub = (clientId) => {
        dispatch({ type: "login/loginWithGithub",payload: clientId});
    }
    return {
        loginWithGithub
    }
}

@connect(mapStateToProps,mapDispatchToProps)
class Login extends Component{
    state = {}

    handleLogin = () => {
        const { loginWithGithub,clientId } = this.props;
        loginWithGithub(clientId);
    }

    render() {
        return (
            <div className={styles.box}>
                <div className={styles.unit}>
                    <Icon type="github" theme="outlined" style={{fontSize: '128px'}}/>
                    <Button type="primary" size="large" onClick={this.handleLogin}>Login with github account</Button>
                </div>
            </div>
        );
    }
}

export default Login;