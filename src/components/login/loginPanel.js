//Libraries
import React        from 'react'

//Components
import Row          from '../layout/row';
import Col          from '../layout/col';
import Guest        from './guest';
import Login        from './login';
import Forgot       from './forgot';

const LoginPanel = (props) => {
    return (
        <Row>
            <Col classes={["col-12", "col-md-6"]}>
                <Guest 
                    guestHandler = {props.guestHandler}
                />
            </Col>



            <Col classes={["col-12", "col-md-6"]}>
                {props.renderForgot === true &&
                    <Forgot 
                        formHandler      = {props.loginFormHandler}
                        forgotHandler    = {props.forgotHandler} 
                        email            = {props.email}
                    />
                }

                {!props.renderForgot === true && 
                    <Login 
                        formHandler      = {props.loginFormHandler}
                        loginHandler     = {props.loginHandler} 
                        username         = {props.username}
                        password         = {props.password}
                        renderForgotHandler = {props.renderForgotHandler}
                    />
                }
            </Col>

        </Row>
)
}




export default LoginPanel
