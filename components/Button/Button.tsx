type btu = {
  value:string,
  color:string,
  onClickHandler : () =>void
}
const Button  = (props:btu) =>{
    return(
        <div>
            <button type="button" onClick={props.onClickHandler} className={props.color}>{props.value}</button>

        </div>
    )
}
export default Button;