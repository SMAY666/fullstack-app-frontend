import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {state: string, setState: any }
export default function InputString({state, setState, ...props}: Props) {
    return (
    <input
        {...props}
        value={state}
        onChange={(event) => {
            setState(event.target.value)
        }}
    />
    )
}