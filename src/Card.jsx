import styles from "./Card.module.css";
function Card(props){
  const apiID = props.url.split('/')[6];
  return(
    <div className={styles.card} onClick={() => props.callBack(props.id)}>
      <img alt={props.name} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + apiID +".png"}></img>
    </div>
  )
}

export default Card;