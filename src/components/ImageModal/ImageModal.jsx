const ImageModal = ({ selectedImage, onRequestClose }) => {
  return (
    <div>
      <button onClick={onRequestClose}>Close</button>
      <img
        src={selectedImage.urls.regular}
        alt={selectedImage.alt_description}
      />
    </div>
  );
};

export default ImageModal;
