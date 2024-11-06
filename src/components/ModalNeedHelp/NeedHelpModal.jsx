import Modal from "../Modal/Modal";
import NeedHelpForm from "./NeedHelpForm";

const NeedHelpModal = ({ closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={true}
        handleClose={handleCloseModal}
        heading={"Need help"}
        modalType={"modalHelp"}
      >
        <NeedHelpForm handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default NeedHelpModal;
