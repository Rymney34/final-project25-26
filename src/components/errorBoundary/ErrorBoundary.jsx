import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState ({
            error:true
        })
    }

    render () {
        if(this.state.error) {
            return (
                <div style={{
                    paddingTop: '170px', textAlign: 'center', color:"white"}}>
                    <h2 >Something went wrong... or Page doesnt exist</h2>
                    <Link style={
                        {'display': 'block', 
                        'textAlign': 'center',
                        'fontWeight': 'bold', 
                        'fontSize': '24px', 
                        'paddingTop': '50px'}} 
                        to="/home">
                            Back to main page
                    </Link>
                </div>
            )
        }
        return this.props.children;
    }

}

export default ErrorBoundary