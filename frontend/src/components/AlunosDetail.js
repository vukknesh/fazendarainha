import React, { useState, useEffect } from "react";
import {
  Avatar,
  Table,
  Checkbox,
  Button,
  Icon,
  Switch,
  Popconfirm
} from "antd";
import "../App.css";
import { getProfileByHandle } from "../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import StyledSpinner from "../utils/StyledSpinner";
import moment from "moment";
export default function AlunosDetail(props) {
  const [carregandoExcluir, setCarregandoExcluir] = useState(false);
  const [idsSelecionados, setIdSelecionados] = useState([]);
  const [filtros, setFiltros] = useState({ ativo: [true] });
  const [carregando, setCarregando] = useState(false);
  const aluno = useSelector(state => state.profiles.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const id = props.match.params?.id;
  useEffect(() => {
    dispatch(getProfileByHandle(id));
  }, [id]);
  const handleExcluirClick = async e => {
    const { onExcluir } = props;
    const lista = aluno?.aulas?.filter(u => idsSelecionados.includes(u.id));
    const total = aluno?.aulas?.length;

    // utils.ui.notificacaoLote(lista, {
    //   icone: "delete",
    //   mensagem: `Excluir ${total} Ativos`,
    //   idProp: "id",
    //   rotuloProp: "nome",
    //   onCarregar: carregandoExcluir => setCarregandoExcluir(carregandoExcluir),
    //   onProcessar: ativo => {
    //     return onExcluir(ativo.id).then(() => {
    //       const idsSelecionados = idsSelecionados.filter(id => id !== ativo.id);
    //       setState({ idsSelecionados });
    //       return `Ativo ${ativo.nome} excluído com sucesso!`;
    //     });
    //   }
    // });
  };
  const handleSelectionChange = selectedRowKeys => {
    setIdSelecionados(selectedRowKeys);
  };

  const renderBotoes = () => {
    const total = idsSelecionados?.length;

    if (total > 0) {
      return (
        <>
          <Popconfirm
            title={
              total === 1
                ? "Confirma a exclusão do ativo selecionado?"
                : `Confirma a exclusão de ${total} ativos?`
            }
            cancelText="Não excluir"
            okText="Sim, excluir"
            onConfirm={handleExcluirClick}
          >
            <Button size="large" icon="delete" loading={carregandoExcluir}>
              {total === 1 ? "Excluir Ativo" : `Excluir ${total} Ativos`}
            </Button>
          </Popconfirm>
        </>
      );
    }
  };
  const columns = [
    {
      title: "Data",
      key: "starting_date",
      render: (text, record) => (
        <span>
          {moment(record.starting_date).format("DD/MM/YYYY HH:mm:ss")}
        </span>
      )
    },
    {
      title: "Bonus",
      key: "bonus",
      render: (text, record) => (
        <p>{record.bonus ? <Icon type={"lock"} /> : null}</p>
      )
    },

    {
      title: "Desmarcada",
      align: "center",
      dataIndex: "desmarcado",
      width: 80,
      filteredValue: filtros.desmarcado,
      filters: [
        {
          text: "Desmarcado",
          value: true
        },
        {
          text: "OK",
          value: false
        }
      ],
      onFilter: (value, record) => value === record.desmarcado,
      render: (text, record) => (
        <p>{record.desmarcado ? <Icon type={"lock"} /> : null}</p>
      )
    }
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        margin: "50px 10px"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Avatar
          shape="square"
          size={64}
          icon="user"
          style={{ marginBottom: "5px" }}
        />
        <h5 style={{ marginBottom: "5px" }}>Nome: {aluno?.first_name}</h5>
        <h5 style={{ marginBottom: "5px" }}>Email: {aluno?.email}</h5>
        <h5 style={{ marginBottom: "5px" }}>Plano: {aluno?.plano}</h5>
        <h5 style={{ marginBottom: "5px" }}>
          Aulas remarcadas: {aluno?.aulas_remarcadas}
        </h5>
        <small>
          Aluno(a) desde - {moment(aluno?.created_at).format("DD/MM/YYYY")}
        </small>
        <h1>Aulas</h1>
      </div>
      {renderBotoes()}

      <Table
        size="middle"
        rowKey="id"
        rowClassName="row-table-pilates"
        loading={{
          spinning: loading,
          indicator: <StyledSpinner />
        }}
        columns={columns}
        dataSource={aluno?.aulas}
        rowSelection={{
          selectedRowKeys: idsSelecionados,
          onChange: handleSelectionChange
        }}
      />
    </div>
  );
}
