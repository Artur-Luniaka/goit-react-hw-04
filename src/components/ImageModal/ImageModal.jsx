import s from "./ImageModal.module.css";
import { CgCloseR } from "react-icons/cg";
import { BiLike } from "react-icons/bi";

const ImageModal = ({ selectedImage, onRequestClose }) => {
  return (
    <div className={s.div}>
      <button className={s.button} onClick={onRequestClose}>
        <CgCloseR className={s.icon} />
      </button>
      <img
        className={s.img}
        src={selectedImage.urls.regular}
        alt={selectedImage.alt_description}
        loading="lazy"
      />
      <span className={s.likes}>
        <BiLike />
        {selectedImage.likes}
      </span>
      <span className={s.author}>Author: {selectedImage.user.name}</span>
    </div>
  );
};

export default ImageModal;
