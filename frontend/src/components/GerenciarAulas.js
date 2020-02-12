import React, { useState, useEffect } from "react";
import { Button, Spin, Icon } from "antd";
import bonus from "../assets/bonus.png";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getEvents,
  getEventsByPagination,
  deleteEvent
} from "../actions/eventos";

import {
  ReactAgenda,
  ReactAgendaCtrl,
  guid,
  getUnique,
  getLast,
  getFirst,
  Modal
} from "react-agenda";
import AgendaEdit from "./AgendaEdit";

const GerenciarAulas = props => {
  const aulas = useSelector(state =>
    state.eventos.events?.results?.map(aula => {
      let h1 = moment(aula.starting_date)
        .add(3, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      let h2 = moment(aula.starting_date)
        .add(4, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      const a = {
        _id: aula.id,
        name: aula.user.first_name,
        startDateTime: new Date(h1),
        endDateTime: new Date(h2),
        desmarcado: aula.desmarcado,
        bonus: aula.bonus
      };
      return a;
    })
  );
  const [idsSelecionados, setIdSelecionados] = useState([]);
  const [items, setItems] = useState([]);
  const [aulasAgenda, setAulasAgenda] = useState([]);
  const [selected, setSelected] = useState([]);
  const [cellHeight, setCellHeight] = useState(30);
  const [rowsPerHour, setRowsPerHour] = useState(2);
  const [numberOfDays, setNumberOfDays] = useState(4);
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showCtrl, setShowCtrl] = useState(false);
  const [locale, setLocale] = useState("br");
  const [filtros, setFiltros] = useState({ ativo: [true] });
  const [loading, setLoading] = useState(true);
  const [carregandoExcluir, setCarregandoExcluir] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    if (aulas) {
      setItems(aulas);
      setLoading(false);
    }
  }, []);

  var colors = {
    "color-1": "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)"
  };
  var now = new Date();

  const handleItemEdit = (item, openModal) => {
    if (item && openModal === true) {
      setSelected([item]);
      return _openModal();
    }
  };
  const handleCellSelection = (item, openModal) => {
    if (selected && selected[0] === item) {
      return _openModal();
    }
    setSelected([item]);
  };

  const zoomIn = () => {
    var num = cellHeight + 15;
    setCellHeight(num);
  };
  const zoomOut = () => {
    var num = cellHeight - 15;
    setCellHeight(num);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setStartDate(startDate);
  };

  const handleRangeSelection = selected => {
    setSelected(selected);
    setShowCtrl(true);
    _openModal();
  };

  const _openModal = () => {
    setShowModal(true);
  };
  const _closeModal = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setShowModal(false);
  };

  const handleItemChange = (items, item) => {
    setItems(items);
  };

  const handleItemSize = (items, item) => {
    setItems(items);
  };

  const removeEvent = (items, item) => {
    dispatch(deleteEvent(item._id));
    setItems(items);
  };

  const addNewEvent = (items, newItems) => {
    setShowModal(false);
    setSelected([]);
    setItems(items);
    _closeModal();
  };
  const editEvent = (items, item) => {
    setShowModal(false);
    setSelected([]);
    setItems(items);
    _closeModal();
  };

  const changeView = (days, event) => {
    setNumberOfDays(days);
  };

  var AgendaItem = function(props) {
    return (
      <div
        style={{
          display: "block",
          background: "#534a37",
          color: "#f5cabe",
          padding: " 5px",
          width: "100%",
          height: "100%"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "6px"
            }}
          >
            {props.item.desmarcado && (
              <Icon
                style={{
                  color: "white",
                  fontSize: "22px",
                  marginBottom: "10px"
                }}
                type="lock"
              />
            )}
            {props.item.bonus && (
              <img
                src={bonus}
                style={{
                  width: "20px",
                  height: "20px",
                  color: "white",
                  background: "white"
                }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "6px"
            }}
          >
            <p>{props.item.name}</p>
            <span>
              {moment(props.item.startDateTime).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
          <Button
            type="primary"
            style={{ background: "red", color: "white" }}
            onClick={() => removeEvent(null, props.item)}
          >
            Excluir{" "}
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div style={{ background: "white" }}>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          padding: "10px"
        }}
      >
        <h2> Aulas</h2>
      </div>
      {carregando && (
        <div className="example">
          <Spin />
        </div>
      )}
      <div style={{ margin: "5px" }}>
        {aulas?.previous && (
          <Button
            onClick={() => {
              dispatch(getEventsByPagination(aulas.previous));
            }}
          >
            <Icon type="left" />
          </Button>
        )}
        {aulas?.next && (
          <Button
            onClick={() => {
              dispatch(getEventsByPagination(aulas.next));
            }}
          >
            <Icon type="right" />
          </Button>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Button type="primary" style={{ flex: "1" }} onClick={zoomIn}>
                {" "}
                <Icon type="plus" />
              </Button>
              <Button type="primary" style={{ flex: "1" }} onClick={zoomOut}>
                {" "}
                <Icon type="minus" />
              </Button>
              <Button type="primary" style={{ flex: "1" }} onClick={_openModal}>
                {" "}
                <Icon type="calendar" />
              </Button>
              <Button
                type="primary"
                style={{ flex: "1" }}
                onClick={changeView.bind(null, 7)}
              >
                {" "}
                {moment.duration(7, "days").humanize()}{" "}
              </Button>
              <Button
                type="primary"
                style={{ flex: "1" }}
                onClick={changeView.bind(null, 4)}
              >
                {" "}
                {moment.duration(4, "days").humanize()}{" "}
              </Button>
              <Button
                type="primary"
                style={{ flex: "1" }}
                onClick={changeView.bind(null, 3)}
              >
                {" "}
                {moment.duration(3, "days").humanize()}{" "}
              </Button>
              <Button
                type="primary"
                style={{ flex: "1" }}
                onClick={changeView.bind(null, 1)}
              >
                {" "}
                {moment.duration(1, "day").humanize()}{" "}
              </Button>
            </div>
            <ReactAgenda
              minDate={new Date(now.getFullYear(), now.getMonth() - 3)}
              maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
              startDate={startDate}
              startAtTime={6}
              endAtTime={24}
              cellHeight={cellHeight}
              locale="pt"
              items={aulas}
              numberOfDays={numberOfDays}
              headFormat={"ddd DD MMM"}
              rowsPerHour={rowsPerHour}
              itemColors={colors}
              helper={true}
              itemComponent={AgendaItem}
              view="calendar"
              autoScale={false}
              fixedHeader={true}
              onRangeSelection={handleRangeSelection.bind()}
              onChangeEvent={handleItemChange.bind(this)}
              onChangeDuration={handleItemSize.bind(this)}
              onItemEdit={handleItemEdit.bind(this)}
              onCellSelect={handleCellSelection.bind(this)}
              onItemRemove={removeEvent.bind(this)}
              onDateRangeChange={handleDateRangeChange.bind(this)}
            />
          </div>
          {showModal && (
            <Modal clickOutside={_closeModal}>
              <div className="modal-content">
                <AgendaEdit
                  items={items}
                  itemColors={colors}
                  selectedCells={selected}
                  Addnew={addNewEvent}
                  edit={editEvent}
                />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};
export default GerenciarAulas;
