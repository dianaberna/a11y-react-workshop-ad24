
const Button = ({children, text, semantic, type}) => {

    return ( semantic === "native" 
        ? <input type={type} className="btn cursor-pointer" value={text || children || "Testo pulsante"}/>
        : <span role="button" className="btn">{text || children || "Testo pulsante"}</span>
    )
}

export default Button;