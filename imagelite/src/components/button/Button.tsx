import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event: any) => void;
    type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<ButtonProps> = ({style, onClick, label, type} : ButtonProps) => {
    return (
        <button className={`${style} text-white px-4 py-2 rounded-lg`} onClick={onClick} type={type}>
            { label }
        </button>
    );
};