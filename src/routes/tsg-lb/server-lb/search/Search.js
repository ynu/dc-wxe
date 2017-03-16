import React, { PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Toast, Form, FormCell, CellHeader, CellBody, CellFooter, Button, LoadMore } from 'react-weui';
import Container from '../../../../components/Weui/Container';
import Footer from '../../../../components/Footer';
import * as lbActions from '../../../../actions/lb/server-lb';
import ResultItem from './ResultItem';

class Search extends React.Component {
  render() {
    const { toast, searchDomain, domain, searchResult } = this.props;
    return (
      <Container>
        <div className="page__bd">
          <Form>
            <FormCell>
              <CellBody><Field component="input" name="domain" className="weui-input" /></CellBody>
              <CellFooter><Button onClick={() => searchDomain(domain)}>Search</Button></CellFooter>
            </FormCell>
          </Form>
          {
            searchResult.length
            ? searchResult.map(sr => <ResultItem key={sr.policy.name} {...sr} />)
            : <LoadMore showLine />
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
  domain: formValueSelector('search')(state, 'domain'),
  ...state.lb,
});
export default connect(mapStateToProps, {
  ...lbActions,
})(reduxForm({
  form: 'search',
})(Search));
