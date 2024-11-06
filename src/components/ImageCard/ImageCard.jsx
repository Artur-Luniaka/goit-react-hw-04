import s from "./ImageCard.module.css";

const ImageCard = ({ gallerySize, descr }) => {
  return (
    <div>
      <img src={gallerySize} alt={descr} />
    </div>
  );
};

export default ImageCard;
