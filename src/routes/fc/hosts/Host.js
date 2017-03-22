import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';
import Detail from './Detail';
import Vms from './Vms';
import * as fcActions from '../../../actions/fc';

class Host extends React.Component {
  componentDidMount() {
    const { siteUri, hostUri, fetchHost, fetchVms } = this.props;
    fetchHost(siteUri, hostUri);
    fetchVms(siteUri, hostUri);
  }
  render() {
    const { host, vms, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">{host.name}</h1>
          <span className="page__desc">{host.description}</span>
        </div>
        <div className="page__bd">
          { host && <Detail {...host} />}
          <Vms vms={vms} />
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
})(Host);
