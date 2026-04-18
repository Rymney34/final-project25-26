import img from '../../../resources/img/error.gif';

const ErrorMessage = () => {
    return (
        <img style={{
            display: 'block', 
            width: "250px", 
            height: "250px",
            objectFit: 'contain',
            margin: "auto",
            padding: '150px'}}  src={img} alt="Error"/>
    )
}
export default ErrorMessage