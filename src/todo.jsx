import { useEffect, useState } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItems = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="todo.svg" alt="todologo" />
            <figcaption>Add Your List Here </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-solid fa-edit" onClick={addItems}></i>
            ) : (
              <i className="fa fa-solid fa-plus" onClick={addItems}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

//without localStorage
// import React, { useState } from "react";

// function Todo() {
//   const [inputData, setInputData] = useState("");
//   const [items, setItems] = useState([]);

//   const addItems = () => {
//     if (!inputData) {
//       alert("plz fill the data");
//     } else {
//       const myNewInputData = {
//         id: new Date().getTime().toString(),
//         name: inputData,
//       };
//       setItems([...items, myNewInputData]);
//       setInputData("");
//     }
//   };

//   const deleteItem = (index) => {
//     const updatedItem = items.filter((curElem) => {
//       return curElem.id !== index;
//     });
//     setItems(updatedItem);
//   };

//   const removeAll = () => {
//     setItems([]);
//   };

//   return (
//     <>
//       <div className="main-div">
//         <div className="child-div">
//           <figure>
//             <img src="todo.svg" alt="todologo" />
//             <figcaption>Add Your List Here </figcaption>
//           </figure>
//           <div className="addItems">
//             <input
//               type="text"
//               placeholder="Add Item"
//               className="form-control"
//               value={inputData}
//               onChange={(e) => setInputData(e.target.value)}
//             />
//             <i className="fa fa-solid fa-plus" onClick={addItems}></i>
//           </div>
//           {/*show our items*/}
//           <div className="showItems">
//             {items.map((curElem, index) => {
//               return (
//                 <div className="eachItem" key={curElem.id}>
//                   <h3>{curElem.name}</h3>
//                   <div className="todo-btn">
//                     <i className="far fa-edit add-btn"></i>
//                     <i
//                       className="far fa-trash-alt add-btn"
//                       onClick={() => deleteItem(curElem.id)}
//                     ></i>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {/*remove all button*/}
//           <div className="showItems">
//             <button
//               className="btn effect04"
//               data-sm-link-text="Remove All"
//               onClick={removeAll}
//             >
//               <span>CHECK LIST</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Todo;
