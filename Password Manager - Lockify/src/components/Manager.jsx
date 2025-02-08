import React from "react";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // for assigning unique ids
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [myform, setMyform] = useState({
    site: "",
    username: "",
    password: "",
  }); // initial empty
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("hide.png")) {
      ref.current.src = "eyes.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "hide.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if (
      myform.site.length > 3 &&
      myform.username.length > 3 &&
      myform.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...myform, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...myform, id: uuidv4() }])
      );
      console.log(...passwordArray, myform);
      setMyform({ site: "", username: "", password: "" });
      toast('Password saved successfully!');
    }
    else {
        toast('Error: password not saved');
    }
  };

  const handleChange = (e) => {
    setMyform({ ...myform, [e.target.name]: e.target.value });
  };


  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!');
  }

  const editPassword = (id) => {
    setMyform(passwordArray.filter(item=>item.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    toast('Password edited successfully!');
  }
   
  const deletePassword = (id) => {
    let c = confirm("Are you sure you wanna delete this password?")
    if(c) {
    setPasswordArray(passwordArray.filter((item)=>item.id!==id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast('Password deleted successfully!');
    }
  }
  

  return (
    <>

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <div className="md:container md:mx-auto md:px-40 md:py-16 p-2 md:p-0 min-h-[83.4vh] text-white">
        <h2 className="logo flex justify-center text-white items-center text-3xl gap-2">
          <span className="text-orange-600 font-bold">&lt;</span>
          <span className="flex justify-center items-center font-bold">
            <img width={25} src="key.png" alt="" /> Lockify{" "}
          </span>
          <span className="text-orange-600 font-bold">/&gt;</span>
        </h2>
        <p className="text-center text-orange-500 font-semibold text-xl py-3">
          Your own personal password manager
        </p>

        <div className="my-inputs mt-10 flex flex-col gap-8 justify-center items-center">
          <div className="w-full">
          <input
            value={myform.site}
            onChange={handleChange}
            className="bg-transparent border border-gray-400 text-white placeholder-gray-300 rounded-lg w-full px-4 py-2 opacity-80 focus:opacity-100 focus:ring-2 focus:ring-orange-500 focus:outline-none backdrop-blur-md"
            placeholder="Enter site name"
            type="text"
            name="site"
            id="site"
          />
          </div>
          <div className="flex md:flex-row w-full flex-col justify-center gap-6 items-center">
            <div className="w-full md:w-1/2">
            <input
              value={myform.username}
              onChange={handleChange}
              className="bg-transparent border w-full border-gray-400 text-white placeholder-gray-300 rounded-lg px-4 py-2 opacity-80 focus:opacity-100 focus:ring-2 focus:ring-orange-500 focus:outline-none backdrop-blur-md"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            </div>
            <div className="relative w-full md:w-1/2">
              <input
                value={myform.password}
                onChange={handleChange}
                ref={passwordRef}
                className="bg-transparent border w-full  border-gray-400 text-white placeholder-gray-300 rounded-lg px-4 py-2 opacity-80 focus:opacity-100 focus:ring-2 focus:ring-orange-500 focus:outline-none backdrop-blur-md"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                onClick={showPassword}
                className="absolute top-2 cursor-pointer right-3"
              >
                <img ref={ref} width={24} src="hide.png" alt="" />
              </span>
            </div>
          </div>
          <div className="submit-button text-center">
            <button
              onClick={savePassword}
              className="bg-orange-600 hover:bg-orange-500 rounded-full flex justify-center items-center px-6 py-2 gap-2 text-xl"
            >
              <img width={24} src="sign.png" alt="add" />
              Save
            </button>
          </div>
        </div>

        <div className="password-table">
          <h2 className="text-2xl font-bold">Your Passwords</h2>

          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-orange-500">
                <tr>
                  <th className="p-2">Site</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border  border-gray-500 text-center overflow-hidden text-white p-2">
                        <div className="flex justify-center items-center gap-5">
                          <div>
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.site}
                            </a>
                          </div>
                          <div>
                            <img onClick={()=>copyText(item.site)} className="cursor-pointer" width={24} src="clone.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-500 text-center overflow-hidden p-2">
                        <div className="flex justify-center items-center gap-5">
                          <div>
                              {item.username}
                          </div>
                          <div>
                            <img onClick={()=>copyText(item.username)} className="cursor-pointer" width={24} src="clone.png" alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-500 text-center overflow-hidden p-2">
                        <div className="flex justify-center items-center gap-5">
                          <div>
                              {item.password}
                          </div>
                          <div>
                            <img onClick={()=>copyText(item.password)} className="cursor-pointer" width={24} src="clone.png" alt="" />
                          </div>
                        </div>
                      </td>

                      <td className="border border-gray-500 text-center overflow-hidden p-2">
                        <div className="flex justify-center items-center gap-5">
                          <div>
                           <img onClick={()=>{editPassword(item.id)}} className="cursor-pointer" width={24} src="written-paper.png" alt="" />
                          </div>
                          <div>
                            <img onClick={()=>{deletePassword(item.id)}} className="cursor-pointer" width={24} src="delete.png" alt="" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;