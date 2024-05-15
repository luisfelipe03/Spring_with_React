import React from 'react';

interface InputTextProps {
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: string;
    lastInput?: string;
}

export const InputText: React.FC<InputTextProps> = ({style, lastInput = "", ...outrasProps} : InputTextProps) => {
    return (
        <input {...outrasProps}
               className={`${style} border px-5 py-2 rounded-lg text-gray-900`}
               value={lastInput} /> 
    )
}
