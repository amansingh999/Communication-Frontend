import React, { useEffect, useRef, useState } from 'react';
import { EditDocumentPopup } from '../../Popup/EditDocumentPopup';
import ManageDocumentTable from './ManageDocumentTable';
import { DeletePopup } from '../../Popup/DeletePopup';
import { getLocalStorage, setLocalStorage } from '../../Common/Storage';
import { FileUploadPopup } from '../../Popup/FileUploadPopup';
import ShareFile from './ShareFile';
import { SharePopup } from '../../Popup/SharePopup';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser, setUpload } from '../../Redux/Slice';


const ManageDocument = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const Upload = useSelector((state) => state.user.Upload);


  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [addShareOpen, setAddShareOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // const [Upload, setUpload] = useState([]);
  // const [loggedInUser, setLoggedInUser] = useState({});
  const [dropDownValue, setDropDownValue] = useState('');
  const [dropDownData, setDropDownData] = useState([]);
  const [sharedUserList, setSharedUserList] = useState([]);
  const [isGoBack, setIsGoBack] = useState(false);

  let shareInstance = useRef(null);



  const handleDropDownChange = (e) => {
    setDropDownValue(e.target.text);
  }

  const handleChange = (e) => {
    const obj = { ...selectedData };
    obj.label = e.target.value;
    setSelectedData(obj);
  }

  useEffect(() => {
    const shareduser = Upload.filter(
      (x) => x.fileName === selectedData.fileName
    );

    // const storedUpload = getLocalStorage('Upload')
    //   ? JSON.parse(getLocalStorage('Upload'))
    //   : [];
    // const loggedInUser = getLocalStorage('loggedInUser')
    //   ? JSON.parse(getLocalStorage('loggedInUser'))
    //   : [];
    // const storedUsers = getLocalStorage('userData')
    //   ? JSON.parse(getLocalStorage('userData'))
    //   : [];
    // const shared_files = getLocalStorage('sharedFiles')
    //   ? JSON.parse(getLocalStorage('sharedFiles'))
    //   : [];;
    const data = userData.filter((item) =>
      item.id !== loggedInUser[0].id
    );

    setSharedUserList(shareduser);
    dispatch(setUpload(Upload));
    dispatch(setLoggedInUser(loggedInUser));
    // setUpload(storedUpload);
    // setLoggedInUser(loggedInUser);
    setDropDownData(data);
    // setShared_files(shared_files);
  }, []);



  const toggleDelete = (item) => {
    setDeleteOpen(true);
    setSelectedData(item);
  };

  const handleEditSave = (newFileName) => {
    const updatedUpload = Upload.map((item) => {
      if (item.id == selectedData?.id) {
        // item.label = newFileName;
        return { ...item, label: newFileName };
      }
      return item;
    });
    // setLocalStorage('Upload', updatedUpload);
    dispatch(setUpload(updatedUpload));
    setEditOpen(false);
  };
 

  const handleEdit = (item) => {
    console.log(item);
    setEditOpen(true);
    setSelectedData(item);
  };

  const closePopUp = () => {
    setDeleteOpen(false);
    setEditOpen(false);
    setFileUploadOpen(false);
  };

  const handleShare = (item) => {
    setShareOpen(true);
    setSelectedData(item);
  };

  const handleDelete = () => {
    const updatedUsers = Upload.filter((user) => user.id !== selectedData.id);
    // setUpload(updatedUsers);
    // setLocalStorage('Upload', updatedUsers);
    dispatch(setUpload(updatedUsers));
    setDeleteOpen(false);
  };

  const handleFileUpload = () => {
    setFileUploadOpen(true);
  };

  const handleAddUpload = (fileLabel, fileName) => {
    const finalData = {
      id: Upload.length + 1,
      userid: loggedInUser[0].id,
      label: fileLabel,
      fileName: fileName,
      sharedBy: loggedInUser[0].email,
      sharedTo: '',
    };
    // Upload.push(finalData);
    const updatedUserData = [...userData, finalData];
    dispatch(setUpload(updatedUserData));
    // setLocalStorage('Upload', Upload);
    // const updatedUsers = Upload.map(user => {
    //     if (user.email == loggedInUser[0]?.email) {
    //         const data = {
    //             id: user.documents[0].myUploads.length + 1,
    //             userid: loggedInUser[0].id,
    //             label: fileLabel,
    //             fileName: fileName,
    //         }
    //         user.documents[0].myUploads.push(data);
    //     }
    //     return user;
    // });
    // setLocalStorage('userData', updatedUsers);
    // setUpload(updatedUsers)
    setFileUploadOpen(false);
  };

  const handelAddShare = (item) => {
    setAddShareOpen(true);
    setDropDownValue(item);
    setIsGoBack(true);
  };

  const handleAddShareConfirm = () => {
    // const finalData = { ...selectedData, sharedTo: dropDownValue, id: Upload.length + 1 }
    // Upload.push(finalData);
    const updatedUpload = Upload.map((item) => {
      if (item.id == selectedData?.id) {
        // item.sharedTo = dropDownValue;
        return { ...item, sharedTo: dropDownValue };
      }
      return item;
    });
    // setLocalStorage('Upload', updatedUpload);
    dispatch(setUpload(updatedUpload));
    setAddShareOpen(false);
  }

  return (
    <>
      {!shareOpen && <ManageDocumentTable
        handleEdit={handleEdit}
        toggleDelete={toggleDelete}
        handleShare={handleShare}
        handleFileUpload={handleFileUpload}
        Upload={Upload}
        loggedInUser={loggedInUser}
      />}

      <EditDocumentPopup
        editOpen={editOpen}
        closePopUp={closePopUp}
        handleEditSave={handleEditSave}
        selectedData={selectedData}
        handleChange={handleChange}
      />

      <DeletePopup
        closePopUp={closePopUp}
        open={deleteOpen}
        handleDelete={handleDelete}
      />

      <SharePopup
        closePopUp={closePopUp}
        open={addShareOpen}
        handleAddShareConfirm={handleAddShareConfirm}
      />

      <FileUploadPopup
        fileUploadOpen={fileUploadOpen}
        closePopUp={closePopUp}
        handleAddUpload={handleAddUpload}
      />

      {shareOpen && !isGoBack && (
        <ShareFile
          Upload={Upload}
          selectedData={selectedData}
          toggleDelete={toggleDelete}
          handelAddShare={handelAddShare}
          dropDownData={dropDownData}
          sharedUserList={sharedUserList}
          setIsGoBack={setIsGoBack}
          handleDropDownChange={handleDropDownChange}
          dropDownValue={dropDownValue}
          shareInstance={shareInstance}
        />
      )}
    </>
  );
};

export default ManageDocument;
