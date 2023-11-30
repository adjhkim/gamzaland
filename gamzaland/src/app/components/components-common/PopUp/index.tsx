import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

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

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
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
  title: string;
  content: JSX.Element;
  isOpen: boolean;
  setIsOpen: any;
}) {
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
            onClick={() => {
              props.setIsOpen(false);
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
          <ModalButton>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/delete.svg`}
            ></img>
          </ModalButton>
          <ModalButton>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/edit.svg`}
            ></img>
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
}
