import React, { PropTypes } from 'react';
import { Icon, CellsTitle, Cells, CellFooter, CellBody, Cell, Badge, Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';

class Site extends React.Component {
  render() {
    const { dashboard, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">site</h1>
        </div>
        <div className="page__bd">
          <CellsTitle>集群列表(1)</CellsTitle>
          <Cells>
            <Cell href={'/fc/cluster/siteUri/clusterUri'} access>
              <CellBody>ManagementCluster</CellBody>
              <CellFooter />
            </Cell>
          </Cells>
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
})(Site);
