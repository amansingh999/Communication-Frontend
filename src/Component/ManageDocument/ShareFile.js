import React from 'react';
import { Button, ButtonGroup, Dropdown, Table } from 'react-bootstrap';


export const ShareFile = ({ selectedData, toggleDelete, handelAddShare, dropDownData, sharedUserList, setIsGoBack, handleDropDownChange, dropDownValue,shareInstance }) => {


  return (
    <div>
      {/* <div style={{ width: "10%" }} onClick={() => setIsGoBack(false)}>
        <span className="left-arrow" style={{ marginLeft: "20px" }}></span>
        <span
          style={{
            fontSize: "20px",
            marginLeft: "20px",
            fontWeight: "600",
            textDecoration: "underline",
            color: "red",
            cursor: "pointer",
          }}
        >
          Go Back
        </span>
      </div> */}
      <div>
        <div>
          <h1 > Upload Sharing : {selectedData.fileName}</h1>
        </div>
        <div>
          <Table bordered hover className='customTable'>
            <thead>
              <tr>
                <th scope='col'>Shared User</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {sharedUserList.map((item) => (
                <tr>
                  <td>{item.sharedTo}</td>
                  <td>
                    <button
                      type='button'
                      class='btn btn-light'
                      onClick={() => toggleDelete(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div>
        <div>
          <h1> Add Sharing </h1>
        </div>

        <div>
          <Dropdown as={ButtonGroup}>
            <Button variant='secondary'>{dropDownValue}</Button>

            <Dropdown.Toggle
              split
              variant='secondary'
              id='dropdown-split-basic'


            />
            <Dropdown.Menu >
              {dropDownData.map((item) => (
                <Dropdown.Item
                  onClick={handleDropDownChange}
                  value={dropDownData}
                  ref={shareInstance}
                  >
                  {item.email}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Button variant='outline-dark' onClick={() => handelAddShare(dropDownValue)}>Add Share</Button>
          {/* <Button variant='outline-dark' onClick={() => handelAddShare}>Add Share</Button> */}
        </div>
      </div>
    </div>
  );
};

export default ShareFile;
