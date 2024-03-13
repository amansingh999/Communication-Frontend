import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const FileUploadPopup = ({ fileUploadOpen, closePopUp, handleAddUpload }) => {
    const [fileName, setFileName] = useState('');
    const [fileLabel, setFileLabel] = useState('');

    const handleLabelChange = (e) => {
        setFileLabel(e.target.value);
    }
    const handleFileChange = (e) => {
        setFileName(e.target.value.split('\\').pop());
    }
  return (
    <div>
      <Modal isOpen={fileUploadOpen} toggle={closePopUp}>
        <ModalHeader>Add Upload</ModalHeader>
        <ModalBody>
          <div>
            <label htmlFor='label'>File Description: </label>
            <input
              type='text'
              id='label'
              onChange={handleLabelChange}
            />
          </div>
          <div>
            <label htmlFor='file'>Choose File:</label>
            <input
              type='file'
              id='file'
              onChange={handleFileChange}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => handleAddUpload(fileLabel, fileName)}>
            Upload
          </Button>
          <Button color='secondary' onClick={closePopUp}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
