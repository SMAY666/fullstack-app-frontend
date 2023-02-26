import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';


type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
    state: string;
    setState: (newValue: string) => void;
}


export default function InputString({label, state, setState, onChange, ...props}: Props) {
    return (
        <>
            {label && <label htmlFor={props.id}>{label}</label>}
            <input
                value={state}
                onChange={(event) => {
                    setState(event.target.value);

                    if (onChange) {
                        onChange(event);
                    }
                }}
                {...props}
            />
        </>
    );
}
