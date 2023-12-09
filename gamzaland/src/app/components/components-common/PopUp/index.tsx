import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.5%;
  padding: 2.5% 5%;
  background-color: #faac58;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  color: #fff;
  user-select: none;
`;

const ModalButton = styled.div<{ show?: string }>`
  display: ${props => props.show || 'flex'};
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 85%;
  padding: 5%;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.5%;
  padding: 2.5% 5%;
  background-color: #faac58;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  color: #fff;
  user-select: none;
`;

export function PopUp(props: {
  isUseFunc?: any;
  title: string;
  content: JSX.Element;
  isOpen: boolean;
  setIsOpen: any;
  setIsEdit?: any;
  isAdd?: boolean;
  addBoard?: { category: string; title: string; content: string };
  editBoard?: { category: string; title: string; content: string; no: number };
  addSchedule?: { content: string; startDate: string; endDate: string };
}) {
  const [wrtId, setWrtId] = useState(0);
  const [wrtName, setWrtName] = useState('');

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios
        .get('http://localhost:4000/Protected', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setWrtId(response.data.user.no);
          setWrtName(response.data.user.nickname);
        })
        .catch(error => {
          console.error('Error fetching protected data:', error.message);
        });
    }
  }, []);

  async function addBoard(
    category: string,
    title: string,
    content: string,
    wrtId: number,
    wrtName: string,
  ) {
    try {
      const res = await axios.get(`http://localhost:4000/AddBoard`, {
        params: {
          category: category,
          title: title,
          content: content,
          wrtId: wrtId,
          wrtName: wrtName,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function editBoard(
    category: string,
    title: string,
    content: string,
    no: number,
  ) {
    try {
      const res = await axios.get(`http://localhost:4000/EditBoard`, {
        params: {
          category: category,
          title: title,
          content: content,
          wrtId: wrtId,
          wrtName: wrtName,
          no: no,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteBoard(no: number) {
    try {
      const res = await axios.get(`http://localhost:4000/DeleteBoard`, {
        params: {
          no: no,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function addSchedule(
    category: string,
    content: string,
    wrtId: number,
    wrtName: string,
    startDate: string,
    endDate: string,
  ) {
    try {
      const res = await axios.get(`http://localhost:4000/AddSchedule`, {
        params: {
          category: category,
          content: content,
          wrtId: wrtId,
          wrtName: wrtName,
          startDate: startDate,
          endDate: endDate,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const [showDelete, setShowDelete] = useState('');
  const [showEdit, setShowEdit] = useState('');
  const [showSave, setShowSave] = useState('');

  useEffect(() => {
    if (props.isAdd) {
      setShowDelete('none');
      setShowEdit('none');
      setShowSave('flex');
    } else {
      setShowDelete('flex');
      setShowEdit('flex');
      setShowSave('none');
    }
  }, [props.isAdd]);

  return (
    <>
      <Modal
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.75)' },
          content: {
            padding: 0,
            border: 0,
            borderRadius: 6,
            top: '5vh',
            bottom: '25vh',
            left: '5vw',
            right: '5vw',
          },
        }}
        appElement={document.getElementById('root')}
        isOpen={props.isOpen}
      >
        <ModalHeader>
          {props.title}
          <ModalButton
            show="flex"
            onClick={() => {
              props.setIsOpen(false);
              props.setIsEdit && props.setIsEdit(false);
              props.setIsEdit && setShowEdit('flex');
              props.setIsEdit && setShowSave('none');
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/exit.svg`}
            ></img>
          </ModalButton>
        </ModalHeader>
        <ModalContent>{props.content}</ModalContent>
        <ModalFooter>
          <ModalButton
            show={showEdit}
            onClick={() => {
              props.setIsEdit(true);
              setShowEdit('none');
              setShowSave('flex');
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/edit.svg`}
            ></img>
          </ModalButton>
          <ModalButton
            show={showSave}
            onClick={() => {
              props.setIsOpen(false);
              props.isUseFunc && props.isUseFunc(true);
              props.addBoard &&
                addBoard(
                  props.addBoard.category,
                  props.addBoard.title,
                  props.addBoard.content,
                  wrtId,
                  wrtName,
                );
              props.editBoard &&
                editBoard(
                  props.editBoard.category,
                  props.editBoard.title,
                  props.editBoard.content,
                  props.editBoard.no,
                );
              props.addSchedule &&
                addSchedule(
                  '일반',
                  props.addSchedule.content,
                  wrtId,
                  wrtName,
                  props.addSchedule.startDate,
                  props.addSchedule.endDate,
                );
              props.setIsEdit && props.setIsEdit(false);
              props.setIsEdit && setShowEdit('flex');
              props.setIsEdit && setShowSave('none');
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/save.svg`}
            ></img>
          </ModalButton>
          <ModalButton
            show={showDelete}
            onClick={() => {
              props.setIsOpen(false);
              props.isUseFunc && props.isUseFunc(true);
              props.editBoard && deleteBoard(props.editBoard.no);
              props.setIsEdit && props.setIsEdit(false);
              props.setIsEdit && setShowEdit('flex');
              props.setIsEdit && setShowSave('none');
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/delete.svg`}
            ></img>
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
