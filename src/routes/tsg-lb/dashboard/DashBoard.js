import React, { PropTypes } from 'react';
import { Toast, CellsTitle, Cells, LoadMore } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';
import EnsureSignupWxe from '../../../components/WeChat/EnsureSignupWxe';
import Device from './Device';
import ServerLb from './ServerLb';
import * as lbActions from '../../../actions/lb/dashboard';

class DashBoard extends React.Component {
  componentDidMount() {
    this.props.fetchDashboard();
  }
  render() {
    const { dashboard, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">图书馆负载均衡</h1>
        </div>
        <div className="page__bd">
          <Device device={dashboard} />
          <ServerLb serverLb={dashboard} />
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
})(DashBoard);
