import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ cards = [] }) => {
  return (
    <>
      <ul className={s.list}>
        {cards.map((card) => (
          <li key={card.id}>
            <ImageCard
              gallerySize={card.urls.small}
              descr={card.alt_description}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;
