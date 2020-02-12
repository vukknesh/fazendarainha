import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Icon } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../utils/config";
import { useDispatch } from "react-redux";
import StyledSpinner from "../utils/StyledSpinner";
const GerenciarAlunos = props => {
  const [idsSelecionados, setIdSelecionados] = useState([]);
  const [users, setUsers] = useState([]);
  const [filtros, setFiltros] = useState({ ativo: [true] });
  const [carregandoExcluir, setCarregandoExcluir] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    axios
      .get(api + "/api/users")
      .then(res => {
        setUsers(res.data?.results);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response);
      });
  }, []);

  const getNovosUsuarios = url => {
    axios
      .get(url)
      .then(res => {
        setUsers(res.data?.results);
      })
      .catch(err => console.log(err.response));
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "first_name",
      key: "first_name",
      render: (text, record) => (
        <Link to={`/aluno/${record.profile_id}`}>{text}</Link>
      )
    }
  ];

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}> Alunos</h2>

        {users?.previous && (
          <Button
            onClick={() => {
              dispatch(getNovosUsuarios(users.previous));
            }}
          >
            <Icon type="left" />
          </Button>
        )}
        {users?.next && (
          <Button
            onClick={() => {
              dispatch(getNovosUsuarios(users.next));
            }}
          >
            <Icon type="right" />
          </Button>
        )}
        <div style={{ padding: "10px" }}>
          <Table
            size="middle"
            rowKey="id"
            columns={columns}
            loading={{
              spinning: loading,
              indicator: <StyledSpinner />
            }}
            dataSource={users}
            // rowClassName={handleLinhaClassName}
          />
        </div>
      </div>
    </div>
  );
};
export default GerenciarAlunos;
