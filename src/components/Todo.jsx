import React, { useEffect, useState } from "react";
import "../css/style.css";
import Logo from "./todo/list.svg.png";

const getLocalItem = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [item, sItem] = useState(getLocalItem());
  const [togglebtn, setToggleBtn] = useState(true);
  const [isEditItem, setEditItem] = useState(null);

  const setItem = () => {
    if (!inputData) {
      alert("plese fill the data");
    } else if (inputData && !togglebtn) {
      sItem(
        item.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setInputData("");
      setEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      sItem([...item, allInputData]);
      setInputData("");
    }
  };
  const editItem = (id) => {
    let netEditItem = item.find((elem) => {
      return elem.id === id;
    });
    setToggleBtn(false);
    setInputData(netEditItem.name);
    setEditItem(id);
  };
  const delItem = (inx) => {
    const upDatedItem = item.filter((val) => {
      return inx !== val.id;
    });
    sItem(upDatedItem);
  };
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className="main_div">
        <div className="child_div">
          <figure>
            <img src={Logo} alt="" />
            <figcaption>Add Your text Here...🗒️</figcaption>
          </figure>

          <div className="addItems">
            <input
              value={inputData}
              type="text"
              placeholder="✍️Add Items..."
              onChange={(event) => {
                setInputData(event.target.value);
              }}
            />
            {togglebtn ? (
              <i
                className="fa fa-plus add-btn"
                aria-hidden="true"
                title="Add Items"
                onClick={setItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn"
                aria-hidden="true"
                title="Edit Items"
                onClick={setItem}
              ></i>
            )}
          </div>
          {item.map((val) => {
            return (
              <div className="showItems" key={val.id}>
                <div className="eachIitems">
                  <h3>{val.name}</h3>
                  <i
                    className="far fa-edit add-bt1"
                    title="Edit Items"
                    onClick={() => editItem(val.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-bt"
                    title="Delete Items"
                    onClick={() => delItem(val.id)}
                  ></i>
                </div>
              </div>
            );
          })}
          <div className="last_btn">
            <button
              onClick={() => {
                sItem([]);
              }}
            >
              <span>CLEAR ALL </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
