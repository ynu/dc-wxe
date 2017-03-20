import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';
import Clusters from './Clusters';
import * as fcActions from '../../../actions/fc';

class Site extends React.Component {
  componentDidMount() {
    const { siteUri, fetchClusters } = this.props;
    fetchClusters(siteUri);
  }
  render() {
    const { clusters, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">site</h1>
        </div>
        <div className="page__bd">
          <Clusters clusters={clusters} />
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
})(Site);
