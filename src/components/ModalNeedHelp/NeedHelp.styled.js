import styled from "@emotion/styled";
import { Field, ErrorMessage } from "formik";

export const Input = styled(Field)`
  width: 100%;
  margin-bottom: 14px;
  padding: 14px 18px;
  border-radius: 8px;
  border: 1px solid var(--input_color);
  outline: none;
  opacity: 0.4;

  color: var(--modal_main_color);
  background-color: var(--modal_bgc);
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  letter-spacing: -0.28px;
  &:hover,
  &:focus,
  &:active {
    background-color: var(--modal_bgc);
    opacity: 1;
    box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.08);
  }
`;

export const Textarea = styled(Field)`
  width: 100%;
  height: 120px;
  margin-bottom: 24px;
  padding: 14px 18px;
  border-radius: 8px;
  border: 1px solid var(--input_color);
  outline: none;
  opacity: 0.4;

  color: var(--modal_main_color);
  background-color: var(--modal_bgc);
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  letter-spacing: -0.28px;
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    box-shadow: 0px 4px 16px 0px rgba(22, 22, 22, 0.08);
  }
`;

export const ErrorText = styled(ErrorMessage)`
  color: var(--modal_second_color);
`;

export const ErrorUntouchComment = styled.div`
  color: var(--modal_second_color);
`;

export const StyledButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: none;

  cursor: pointer;

  color: var(--text_btn);
  background: var(--normal_btn);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  font-display: block;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;

  &:hover {
    background: var(--active_btn);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
