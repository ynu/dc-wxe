import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../../components/Weui/Container';
import Footer from '../../../../components/Footer';
import VirtualServer from './VirtualServer';
import * as lbActions from '../../../../actions/lb/server-lb';

class VirtualServers extends React.Component {
  componentDidMount() {
    this.props.fetchVirtualServers();
    this.props.fetchServerFarms();
    this.props.fetchRealServers();
  }
  render() {
    const { virtualServers, toast, serverFarms, realServers } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">虚服务({virtualServers.length})</h1>
        </div>
        <div className="page__bd">
          {
            virtualServers && serverFarms && realServers && virtualServers.map((vs) => {
              const sf = serverFarms.find(f => f.name === vs.primaryServerFarm);
              const rss = realServers.filter(rs => rs.serverFarm === vs.primaryServerFarm);
              return <VirtualServer key={vs.name} {...vs} serverFarm={sf} realServers={rss} />;
            })
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
})(VirtualServers);
