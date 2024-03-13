import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getLocalStorage } from '../../Common/Storage';

const ManageDocumentTable = ({ handleEdit, toggleDelete, handleShare, handleFileUpload, Upload, loggedInUser }) => {
    const [myUpload, setMyUpload] = useState([]);
    const [sharedUpload, setSharedUpload] = useState([]);

    useEffect(() => {
        const myUpload = Upload.filter(x => x.userid === loggedInUser[0].id);
        const sharedUpload = Upload.filter(x => x.sharedTo === loggedInUser[0].email);
        setMyUpload(myUpload);
        setSharedUpload(sharedUpload);
    }, [handleFileUpload]);

    return (
        <>
            <div>
                <h1 className='heading'>My Uploads</h1>
            </div>
            <div>
                <Table bordered hover className='customTable'>
                    <thead>
                        <tr>
                            <th scope="col">Label</th>
                            <th scope="col">File Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myUpload.map((item) => (
                            <tr>
                                <td>{item.label}</td>
                                <td>{item.fileName}</td>
                                <td>

                                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                                        <Button variant="outline-dark" className="btn" onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button variant="outline-dark" className="btn" onClick={() => toggleDelete(item)}>Delete</Button>
                                        <Button variant="outline-dark" className="btn" onClick={() => handleShare(item)}>Share</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>

            <div>
                <h1 className='heading'>Shared Uploads</h1>
            </div>
            <div>
                <Table bordered hover className='customTable'>
                    <thead>
                        <tr>
                            <th scope="col">Label</th>
                            <th scope="col">File Name</th>
                            <th scope="col">Shared By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sharedUpload.map((item) =>
                            <tr>
                                <td>{item.label}</td>
                                <td>{item.fileName}</td>
                                <td>{item.sharedBy}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>

            <div>
                <Button color="primary" onClick={handleFileUpload}> + Add Upload</Button>
            </div>
        </>

    );
};

export default ManageDocumentTable;



