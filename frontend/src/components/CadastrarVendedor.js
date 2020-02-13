import React, { Component } from "react";
import { Form, Icon, Input, Button, TimePicker, Select, message } from "antd";
import Colors from "../utils/Colors";
import axios from "axios";
import api from "../utils/config";
import moment from "moment";
import { withRouter } from "react-router-dom";
const { Option } = Select;
class CadastrarVendedor extends Component {
  state = {
    loading: false
  };
  CadastrarVendedor = async aluno => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    const body = JSON.stringify(aluno);
    await axios
      .post(api + "/api/auth/cadastrar-aluno", aluno, config)
      .then(res => {
        this.props.history.push(`/aluno/${res.data?.user?.profile_id}`);
        message.sucess("Aulas adicionadas com sucesso!");
      })
      .catch(err => {
        if (err.response?.data?.username && err.response.data?.username[0])
          message.error("Aluno com esse email já cadastrado!");
      });

    this.setState({ loading: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const aluno = {
          username: values.username,
          first_name: values.first_name,
          email: values.username,
          password: values.password,
          plano: values.plano
          // dias: values.dias ? values.dias : null,
          // horario: values.horario
          //   ? moment(values.horario).format("HH:mm:ss")
          //   : null
        };

        this.CadastrarVendedor(aluno);
      }
    });
  };
  handleChange = value => {
    console.log(`Selected: ${value}`);
  };
  onChange = value => {
    console.log(`selected ${value}`);
  };
  onChangeTime = (time, timeString) => {
    console.log(time, timeString);
  };

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: `lightgrey`,
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center"
        }}
      >
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "8px",
            background: "white",
            padding: "20px"
          }}
        >
          <h1 style={{ top: "100px" }}>Cadastrar Vendedor</h1>
          <Form.Item>
            {getFieldDecorator("first_name", {
              rules: [{ required: true, message: "Digite nome completo!" }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Nome Completo"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Digite um email!" },
                {
                  type: "email",
                  message: "Digite um email válido!"
                }
              ]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Digite uma senha!" }]
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
            {getFieldDecorator("plano", {
              rules: [{ required: true, message: "Escolha um plano" }]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Selecione um plano"
                optionFilterProp="children"
                onChange={this.onChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="4 Aulas">4 Aulas</Option>
                <Option value="8 Aulas">8 Aulas</Option>
                <Option value="12 Aulas">12 Aulas</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={this.handleSubmit}
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(CadastrarVendedor));
