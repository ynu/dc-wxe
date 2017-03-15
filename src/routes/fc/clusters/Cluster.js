import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';
import Detail from './Detail';
import Hosts from './Hosts';

class Cluster extends React.Component {
  render() {
    const { dashboard, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">ManagementCluster</h1>
          <span className="page__desc">管理和测试集群</span>
        </div>
        <div className="page__bd">
          <Detail />
          <Hosts />
        </div>
        <Footer />
        <Toast show={toast.loading} icon="loading">加载中</Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  toast: state.wechat.toast,
  // ...state.lb,
});
export default connect(mapStateToProps, {
  // ...lbActions,
})(Cluster);
