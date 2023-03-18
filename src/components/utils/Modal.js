import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div onClick={handleClose} className={showHideClassName}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};

export default Modal;