import "./NotFound.css";
import notFound from "../../images/not-found.svg";

function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound__wrap">
        <img alt="" src={notFound} className="notFound__wrap__img"></img>
        <h3 className="notFound__wrap__header">Ничего не найдено</h3>
        <p className="notFound__wrap__paragraph">
          К сожалению по вашему запросу ничего не найдено.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
