import React, {Fragment, useState, createContext, useContext, useMemo, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({name: "Guest User"});

const UserWrapper = ({ Component }) => {
    //30-40 logic
    const user = {name: "HOC User"};
    return <Component user={user} />
}

const LearnContext = (props) => {
    const [user, setUser] = useState({name: "Vijay!"})
    const [mounted, setMounted] = useState(false);
    let aRef = useRef(10);

    useEffect(() => {
        aRef.current = 20;
        setMounted(true)
    }, []);

    useEffect(() => {
        aRef.current = 30;
    }, [mounted])

    return(
        <h1>
            We are learning context <br />
            a value is {aRef.current}
            <UserWrapper Component={ChildB} />
            <ChildC name={20} age={'Suresh'} />
        </h1>
    )
}
export default LearnContext;

const ChildB = (props) => {
    return(
        <h1>User name is {props.user.name}</h1>
    )
}

const ChildC = (props) => {
    return(
        <>
            <h1>in child C name - {props.name.split("")}</h1>
            <h1>in child C age - {props.age}</h1>
        </>
    )
}

ChildC.propTypes = {
    name: PropTypes.string, 
    age: PropTypes.number,
}