import { AuthContext } from "@app/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const withAuth = Component => {
    const Auth = (props) => {
        const { authState, isUserAuthenticated } = useContext(AuthContext);
        const router = useRouter();
    
        const { loading } = authState;

        if(loading) {
            return (
                <p>Loading...</p>
            )
        }
        
        if(!isUserAuthenticated()) {
            router.push('/');
        }
        
        return (
            <Component {...props} />
        );
    };
  
    return Auth;
};
  
export default withAuth;