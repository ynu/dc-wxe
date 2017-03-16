import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../../components/Weui/Container';
import Footer from '../../../../components/Footer';
import EnsureSignupWxe from '../../../../components/WeChat/EnsureSignupWxe';
import ServerFarm from './ServerFarm';
import * as lbActions from '../../../../actions/lb/server-lb';

class ServerFarms extends React.Component {
  componentDidMount() {
    this.props.fetchServerFarms();
  }
  render() {
    const { serverFarms, toast } = this.props;
    return (
      <Container>
        <EnsureSignupWxe />
        <div className="page__hd" >
          <h1 className="page__title">实服务组({serverFarms.length})</h1>
        </div>
        <div className="page__bd">
          {
            serverFarms && serverFarms.map(sf => (
              <ServerFarm key={sf.name} {...sf} />
            ))
          }
        </div>
        <Footer />
        <Toast show={toast.loading} icon="loading">加载中</Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  toast: state.wechat.toast,
  ...state.lb,
});
export default connect(mapStateToProps, {
  ...lbActions,
})(ServerFarms);
