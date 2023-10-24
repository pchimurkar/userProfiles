/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { PropTypes } from "prop-types";

const ModalPop = ({
  isShow,
  closeHandler,
  saveHandler,
  modalTitle = "Reconfirm it",
  modalBody = "Are you sure",
  btnActionVariant = "Save",
  btnActionLabel = "primary",
}) => {
  return (
    <>
      <Modal show={isShow} onHide={closeHandler}>
        <div className="text-dark">
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant={btnActionVariant} onClick={saveHandler}>
              {btnActionLabel}
            </Button>
            <Button variant="secondary" onClick={closeHandler}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

ModalPop.propType = {
  isShow: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
  modalBody: PropTypes.string,
  btnActionVariant: PropTypes.string,
  btnActionLabel: PropTypes.string,
};

export default ModalPop;
