import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const EditDocumentPopup = ({ editOpen, closePopUp, handleEditSave, selectedData, handleChange }) => {


    return (
        <div>

            <Modal isOpen={editOpen} toggle={closePopUp} >
                <ModalHeader >Edit</ModalHeader>
                <ModalBody>
                    <div className="form-group mt-3">
                        <label>File Description</label>
                        <input
                            type="text"
                            // placeholder="Label"
                            name="file"
                            className="form-control mt-1"
                            value={selectedData.label}
                            onChange={handleChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        onClick={() => handleEditSave(selectedData.label)}
                    >Save </Button>
                    <Button color="danger" onClick={closePopUp}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}





