import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';
import Detail from './Detail';
import Hosts from './Hosts';
import * as fcActions from '../../../actions/fc';

class Cluster extends React.Component {
  componentDidMount() {
    const { siteUri, clusterUri, fetchComputerResource, fetchCluster } = this.props;
    fetchComputerResource(siteUri, clusterUri);
    fetchCluster(siteUri, clusterUri);
  }
  render() {
    const { cluster, computerResource, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">{cluster.name}</h1>
          <span className="page__desc">{cluster.description}</span>
        </div>
        <div className="page__bd">
          <Detail computerResource={computerResource} />
          {/* <Hosts />*/}
        </div>
        <Footer />
        <Toast show={toast.loading} icon="loading">加载中</Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  toast: state.wechat.toast,
  ...state.fc,
});
export default connect(mapStateToProps, {
  ...fcActions,
})(Cluster);
