import { ChangeEvent, useState } from 'react';
import { SignupType } from '@geeten/medium-common';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios';
const Auth = ({type}:{type:"signup"|"signin"}) => {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const {setauthUser } = useAuthContext();
 async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    
       try {
         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ?"signup" : "signin"}`,postInputs)

         const jwt = response.data;
         localStorage.setItem("token",JSON.stringify(jwt));
         setauthUser(response.data);
         navigate("/blogs")
       } catch (error) {
        console.log(error)
          alert("error");
       }

    setPostInputs({
      name: '',
      email: '',
      password: '',
    });
  }

  return (
    <div className="p-6 max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Create an account</h2>
        <p className="text-sm text-gray-600">
        {type === 'signin' ? "Don't have an account?" : "Already have an account"}{' '}
          <Link to={type === 'signin' ? "/signup" : "/signin"}
          className="text-slate-600 underline hover:no-underline">
          {type === 'signin' ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={submitHandler}>

        {type==="signup" ? <Labelledinput
          label="Username"
          placeholder="Enter your name"
          value={postInputs.name as string}
          onchange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostInputs({ ...postInputs, name: e.target.value })
          }
        />: null}
        <Labelledinput
          label="Email"
          placeholder="m@example.com"
          value={postInputs.email}
          onchange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostInputs({ ...postInputs, email: e.target.value })
          }
        />
        <Labelledinput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={postInputs.password}
          onchange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostInputs({ ...postInputs, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-800"
        >
          {type==="signup" ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

interface Labelinput {
  placeholder: string;
  label: string;
  value: string;
  type?: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Labelledinput({ placeholder, label, type, value, onchange }: Labelinput) {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={value}
        type={type || 'text'}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-black focus:border-black"
        onChange={onchange}
      />
    </div>
  );
}

export default Auth;
