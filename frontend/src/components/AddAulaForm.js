import React, { Component } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  TimePicker,
  Select,
  message,
  InputNumber,
  Spin
} from "antd";
import Colors from "../utils/Colors";
import axios from "axios";
import api from "../utils/config";
import moment from "moment";
import { withRouter } from "react-router-dom";
const { Option } = Select;
class AddAulaForm extends Component {
  state = {
    loading: false,
    users: null
  };

  componentDidMount() {
    axios
      .get(api + "/api/users")
      .then(res => this.setState({ users: res.data?.results }))
      .catch(err => console.log(err.response));
  }
  addAula = async aula => {
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
    await axios
      .post(api + "/api/auth/add-aulas", aula, config)
      .then(res => {
        this.setState({ loading: false });
      })
      .catch(err => {
        if (err.response?.data?.username && err.response.data?.username[0])
          message.error("Aluno com esse email já cadastrado!");
        this.setState({ loading: false });
      });
    this.setState({ loading: false });
    this.props.history.push(`/aluno/${aula.alunoId}`);
    message.success("Aulas adicionadas com sucesso!");
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const aula = {
          alunoId: values.alunoId,
          ateAno: values.ateAno,
          dias: values.dias ? values.dias : null,
          horario: values.horario
            ? moment(values.horario).format("HH:mm:ss")
            : null
        };

        this.addAula(aula);
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
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "lightgrey",
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
          <h1 style={{ top: "100px" }}>Cadastrar Aulas</h1>
          <Form.Item>
            {getFieldDecorator("alunoId", {
              rules: [{ required: true, message: "Digite nome completo!" }]
            })(
              <Select
                size="large"
                placeholder="Aluno"
                style={{ width: "100%" }}
              >
                {this.state.users?.map(user => (
                  <Option key={user.id} value={user.id}>
                    {user.first_name} - {user.username}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator(
              "dias",
              {}
            )(
              <Select
                mode="multiple"
                size="large"
                placeholder="Dias"
                defaultValue={["a10", "c12"]}
                onChange={this.handleChange}
                style={{ width: "100%" }}
              >
                <Option key={0} value={0}>
                  Segunda
                </Option>
                <Option key={1} value={1}>
                  Terça
                </Option>
                <Option key={2} value={2}>
                  Quarta
                </Option>
                <Option key={3} value={3}>
                  Quinta
                </Option>
                <Option key={4} value={4}>
                  Sexta{" "}
                </Option>
                <Option key={5} value={5}>
                  Sábado
                </Option>
                <Option key={6} value={6}>
                  Domingo
                </Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("ateAno", {
              rules: [{ required: true, message: "Digite um ano!" }]
            })(
              <InputNumber
                prefix={
                  <Icon
                    type="calendar"
                    size="large"
                    style={{ width: "60%", color: "rgba(0,0,0,.25)" }}
                  />
                }
                min={2020}
                max={2025}
                defaultValue={2020}
                // onChange={onChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(
              "horario",
              {}
            )(
              <TimePicker
                prefix={
                  <Icon
                    type="clock-circle"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                // onChange={this.onChangeTime}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={this.handleSubmit}
            >
              + Aulas
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(AddAulaForm));
