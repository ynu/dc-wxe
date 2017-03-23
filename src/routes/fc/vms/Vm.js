import React, { PropTypes } from 'react';
import { Toast } from 'react-weui';
import { connect } from 'react-redux';
import Container from '../../../components/Weui/Container';
import Footer from '../../../components/Footer';
import Detail from './Detail';
import * as fcActions from '../../../actions/fc';

class Vm extends React.Component {
  componentDidMount() {
    const { siteUri, vmUri, fetchVm } = this.props;
    fetchVm(siteUri, vmUri);
  }
  render() {
    const { vm, toast } = this.props;
    return (
      <Container>
        <div className="page__hd" >
          <h1 className="page__title">{vm.name}</h1>
          <span className="page__desc">{vm.description}</span>
        </div>
        <div className="page__bd">
          { vm.vmConfig && <Detail {...vm} />}
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
})(Vm);
