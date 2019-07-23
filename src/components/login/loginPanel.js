//Libraries
import React        from 'react'

//Components
import Row          from '../layout/row';
import Col          from '../layout/col';
import Guest        from './guest';
import Login        from './login';

const LoginPanel = (props) => {
    return (
        <Row>
            <Col classes={["col-12", "col-md-6"]}>
                <Guest 
                    guestHandler = {props.guestHandler}
                />
            </Col>



            <Col classes={["col-12", "col-md-6"]}>
                <Login 
                    formHandler      = {props.loginFormHandler}
                    loginHandler     = {props.loginHandler} 
                    username         = {props.username}
                    password         = {props.password}
                />
            </Col>

        </Row>
)
}




export default LoginPanel
