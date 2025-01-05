import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpInput, SignInInput } from '@perfect047/sharepiont-common'
import LabelInput from './LabelInput'
import axios from "axios";
import { BACKEND_URL } from '../config';

const Auth = ({ type }: {type: "signup" | "signin"}) => {

    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest () {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        }
        catch(e){
            alert("Ops... something went wrong!")
        }
    }

    return(
        <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center border-2 rounded-md shadow-2xl mx-5 py-5 ">
            <div >
                <div className="px-10 text-3xl font-extrabold text-center">
                    {type == "signup" ? "Create an account" : "Login to account"}
                </div>
                <div className="text-sm font-light text-slate-500 text-center">
                    {type == "signup" ? "Already have an account?" : "Don't have an account?"} 
                    <Link className="underline pl-2" to={type =="signin" ? '/signup' : '/signin'}>
                        {type =="signin" ? 'Signup' : 'Login'}
                    </Link>
                </div>
                <div className='mt=3'>
                    {type == "signup" ? <LabelInput label="Username" placeHolder='Enter Username' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} /> : null}
                    <LabelInput label="Email" placeHolder='Enter Email' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value,
                        }))
                    }} />
                    <LabelInput type="password" label="Password" placeHolder='Enter Password' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value,
                        }))
                    }} />
                </div>
                <div className='pt-6'>
                    <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 
                    focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 
                    me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
                    dark:border-gray-700" onClick={sendRequest}>{type =="signin" ? 'Login' : 'Sign Up'}</button>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Auth;