import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Navigate(props: { src: string; path: string }) {
  const navigate = useNavigate();
  return (
    <img alt="" src={props.src} onClick={() => navigate(props.path)}></img>
  );
}
