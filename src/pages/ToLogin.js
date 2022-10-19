import * as React from "react";
import { useNavigate } from "react-router-dom"

const ToLogin = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/login', { replace: true });
    }, [navigate]);
}

export default ToLogin