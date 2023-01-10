import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useProfileContext } from 'src/providers/profile';

type Props = {
    to: string,
    children: JSX.Element,
}

const AuthGuard: FC<Props> = ({ children, to }) => {
    const { name } = useProfileContext();

    if(!name) {
        return <Navigate to={to} />;
    }
    return children;
};

export default AuthGuard;