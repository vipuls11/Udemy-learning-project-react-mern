import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                })
                activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl)
                //const responseData= await response.json();
                let responseData;
                const responseText = await response.text();
                responseData = responseText ? JSON.parse(responseText) : {};
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                // console.log(responseData.message, "message")
                setIsLoading(false)

                
                    setSuccessMessage(`${responseData.message}`);
             
                return responseData
            } catch (err) {
                if (err.name === 'AbortError') {
                    return;
                }
                setError(err.message)
                setIsLoading(false)
                throw err;
            }
        }, []
    );

    const clearError = () => {
        setError(null)
    }
    const clearSuccess = () => {
        setSuccessMessage(null)
    }
    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return { isLoading, error, successMessage, sendRequest, clearError, clearSuccess };
}