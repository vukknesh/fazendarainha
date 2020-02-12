import React from "react";
import { Form, Icon, Input, Button, message, Switch } from "antd";
import Colors from "../utils/Colors";
import logopreta from "../assets/logopreta.png";
import { login as loginAuth } from "../actions/auth";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    bgColor:
      "linear-gradient(to right top, #f5cabe, #caa898, #a18774, #796854, #534a37)"
  };
  handleSubmit = e => {
    const { loginAuth, history } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        loginAuth(values.username, values.password, history);
      }
    });
  };
  renderRedirect = auth => {
    if (auth.isAuthenticated) {
      return <Redirect to="/cadastrar-aluno" />;
    }
  };
  onChange = checked => {
    if (!checked) {
      this.setState({
        bgColor:
          "linear-gradient(to right top, #f5cabe, #eac8bb, #e0c7b9, #d5c5b8, #ccc2b8)"
      });
    } else {
      this.setState({
        bgColor:
          "linear-gradient(to right top, #f5cabe, #caa898, #a18774, #796854, #534a37)"
      });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, auth } = this.props;
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: this.state.bgColor,
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center"
        }}
      >
        <Switch
          defaultChecked
          style={{ position: "absolute", top: "10px", left: "10px" }}
          onChange={this.onChange}
        />
        {this.renderRedirect(auth)}
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{
            width: "400px",
            height: "400px",
            borderRadius: "8px",
            background: "white",
            padding: "30px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 0 "
            }}
          >
            <img
              src={logopreta}
              alt="alt"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                display: "block",
                width: "100%",
                background: Colors.terceira,
                color: Colors.primaria
              }}
              loading={loading}
              htmlType="submit"
              className="login-form-button"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { loginAuth })(
  Form.create()(withRouter(Login))
);
