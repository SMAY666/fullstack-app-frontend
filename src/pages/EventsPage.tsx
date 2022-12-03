import React, {useEffect, useState} from 'react';


export default  function EventsPage() {
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        /*fetch()
            .then(({events}) => {
                setErrorMessage('');
                console.log(events);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })*/
    }, []);

    return(
        <div>
            <p>Events page</p>
            {errorMessage === '' ? null : <span className="text-red-700">{errorMessage}</span>}
        </div>
    );
}