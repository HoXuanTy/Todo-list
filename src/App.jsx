import { useState } from 'react'
import { IoMdMoon } from "react-icons/io";
import { FiPlusCircle, FiCheck } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

import './App.css'

function App() {
  const [Data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const [checkedTasks, setCheckedTasks] = useState([]);


  // Handle Add data
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setData((prevItems) => [...prevItems, inputValue]);
      setInputValue('');
    }
  }

  //Handle edit data
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(Data[index]);
  }
  const handleSave = (index, editedTask) => {
    if (editedTask.trim() !== '') {
      const updatedData = [...Data];
      updatedData[index] = editedTask;
      setData(updatedData);
      setEditIndex(null);
    }
  };

  //Handle delete
  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
    setEditIndex(null);
  };

  //Handle check  
  const handleCheckboxClick = (index) => {
    setCheckedTasks((prevChecked) => {
      const updatedChecked = [...prevChecked];
      updatedChecked[index] = !updatedChecked[index];
      return updatedChecked;
    });
  };

  const handleCleanAll = () => {
    setData([])
  }

  return (
    <div>
      <header className="w-full h-[200px] bg-gradient-to-r from-purple-700 to-sky-400 flex justify-center">
        <div className="w-[30%] mt-5">
          <div className="flex justify-between items-center ">
            <h1 className="text-2xl text-white uppercase font-semibold ">My tasks</h1>
            <div className=" p-1 bg-gray-200 rounded-md mt-5">
              <IoMdMoon size={12} />
            </div>
          </div>
          <div className=' relative '>
            <input type="text" className="w-full mt-5 py-3 px-9 rounded-[4px] outline-none" value={inputValue} onChange={handleInputChange} name='task' placeholder='Add a new task...' />
            <div className="absolute  top-[55%] left-2  ">
              <FiPlusCircle className="text-gray-500" />
            </div>
            <div className="cursor-pointer absolute right-0 top-[50%] translate-x-[-50%] uppercase text-gray-500" onClick={handleAdd}>Add</div>
          </div>
        </div>
      </header>

      <main className="flex justify-center items-center">
        <div className="w-[30%] min-h-[35%] absolute top-[20%] flex flex-col justify-start items-center bg-white shadow-lg rounded">
          <div className="w-full flex justify-between items-start p-3">
            <div>{Data.length} tasks left</div>
            <div className="cursor-pointer" onClick={handleCleanAll}>Clear all tasks</div>
          </div>
          <div className="w-[95%] h-px bg-gray-400 px-5 mb-3"></div>
          {
            Data.length > 0 ? (
              Data.map((item, index) => (
                <div key={index} className="w-full ">
                  {console.log(index)}
                  <div className="w-full flex flex-col justify-start items-center pb-5">
                    <div className="w-full flex justify-between items-start px-3 pb-3">
                      {
                        editIndex === index ? (
                          <div className="w-full flex justify-between">
                            <div className="flex justify-center items-center">
                              <input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                                className="w-full outline-none"
                              />
                            </div>
                            <div className="flex justify-center items-center gap-2">
                              <FiCheck size={20} className="cursor-pointer text-gray-500" onClick={() => handleSave(index, editedTask)} />
                              <IoClose size={20} className="cursor-pointer text-gray-500" onClick={() => setEditIndex(null)} />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex justify-between">
                            <div className="flex justify-center items-center">
                              <input
                                type="checkbox"
                                name="check-box"
                                checked={checkedTasks[index]}
                                onChange={() => handleCheckboxClick(index)} />
                              <div className={`pl-2 ${checkedTasks[index] ? 'line-through text-gray-500' : ''}`}>{item}</div>                            </div>
                            <div className="flex justify-center items-center gap-2">
                              <CiEdit size={20} className="cursor-pointer" onClick={() => handleEdit(index)} />
                              <AiOutlineDelete size={18} className="cursor-pointer " onClick={() => handleDelete(index)} />
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className="w-[95%] h-px bg-gray-400 "></div>
                  </div>
                </div>

              ))
            ) : (
              <p className="flex-grow flex justify-center items-center text-gray-400">Empty tasks</p>
            )
          }
        </div>

      </main>
    </div>
  )
}

export default App
