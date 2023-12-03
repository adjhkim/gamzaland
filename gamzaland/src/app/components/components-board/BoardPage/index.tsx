import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  width: 90%;
  margin-top: 5%;
  text-shadow: none;
  color: #000;
  user-select: none;

  & > .active {
    font-weight: 1000;
    text-decoration: underline;
  }
`;

const Rect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faac58;
  border-radius: 4px;
  width: 10%;
  height: 100%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);

  &.hidden {
    visibility: hidden;
  }

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25) inset;
  }
`;

const PageNo = styled.div`
  font-weight: 400;
`;

export default function BoardPage(props: {
  count: number;
  page: number;
  setPage: any;
}) {
  const createPageList = function (pageCount: number, thisPage: number) {
    let result: Array<JSX.Element> = [];
    for (let i = 1; i <= pageCount; i++) {
      if (i === thisPage) {
        result.push(
          <PageNo key={'page' + i} className="active">
            {i}
          </PageNo>,
        );
      } else {
        result.push(<PageNo key={'page' + i}>{i}</PageNo>);
      }
    }
    return result;
  };

  return (
    <Box>
      <Rect
        className={props.page === 1 ? 'hidden' : ''}
        onClick={() => {
          if (props.page !== 1) {
            props.setPage((prevState: number) => prevState - 1);
          }
        }}
      >
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/before.svg`}
        ></img>
      </Rect>
      {createPageList(props.count, props.page)}
      <Rect
        className={props.page === props.count ? 'hidden' : ''}
        onClick={() => {
          if (props.page !== props.count) {
            props.setPage((prevState: number) => prevState + 1);
          }
        }}
      >
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/next.svg`}
        ></img>
      </Rect>
    </Box>
  );
}
