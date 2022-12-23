import React from 'react';


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    state: string;
    setState: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
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
    )
}
