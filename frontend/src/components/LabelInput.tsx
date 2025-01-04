import { ChangeEvent } from "react";

interface LabelledInput {
    type?: string;
    label: string;
    placeHolder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const LabelInput = ({ type, label, placeHolder, onChange}: LabelledInput) => {
    return (
        <div>
            <label className="font-semibold block mt-2 mb-2 text-sm text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-700 focus:border-slate-700 block w-full p-2.5 " placeholder={placeHolder} required />
        </div>
    )
}

export default LabelInput;