import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignUpInput, SignInInput } from '@perfect047/sharepiont-common'
import LabelInput from './LabelInput'

const Auth = ({ type }: {type: "signup" | "signin"}) => {

    const [postInputs, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })

    return(
        <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div >
                <div className="px-10 text-3xl font-extrabold text-center">
                    Create an account
                </div>
                <div className="text-sm font-light text-slate-500 text-center">
                    Already have an account? <Link className="underline pl-2" to={'/signin'}>Login</Link>
                </div>
                <div className='mt=3'>
                    <LabelInput label="Username" placeHolder='Enter Username' onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} />
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
                    <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Auth;