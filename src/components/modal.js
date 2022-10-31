import { createPortal } from "react-dom";

const Modal = ({ isOpened, children, onClose }) => {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/70"></div>
      <div className="bg-black-500 fixed top-1/3 left-1/3 w-96 h-36 z-20 p-3 border border-white rounded">
        <div>
          <span
            className="absolute right-2 top-1 text-white hover:cursor-pointer"
            onClick={onClose}
          >
            X
          </span>
          <div>{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
