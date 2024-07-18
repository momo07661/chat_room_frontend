import Table from 'react-bootstrap/Table';
import {userDto} from "../../../data/User.Type.ts";
import {UserTableRow} from "./UserTableRow.tsx";
import React from "react";

type Props = {
  searchResultDtoList: userDto[],
  receiverDto: userDto | undefined,
  setReceiverDto: React.Dispatch<React.SetStateAction<userDto | undefined>>,
  fetchChatDto: ()=>void,
}

export default function UserTable(props: Props) {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Result</th>
          <th>Username</th>
          <th style={{display: 'flex', justifyContent: 'end'}}>
            <div style={{minWidth: 100}}>
              Select
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.searchResultDtoList.map(
          (receiver, index)=>{
            return(
              <UserTableRow key={index + 'searchResult'} receiverDto={receiver} resultIndex={index + 1} setReceiverDto={props.setReceiverDto}/>
            )
          }
        )}
      </tbody>
    </Table>
  );
}