import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const List = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const Deletebtn = styled.button`
  border: none;
  background-color: #e56852f9;
  color: ivory;
  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }
`;

const Movebtn = styled.button`
  border: none;
  background-color: #4289cbf8;
  margin-right: 5px;
  color: ivory;
  &:hover {
    cursor: pointer;
    transform: scale(0.9);
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: center;
`;
const Categorybtn = styled.button`
  background-color: #87baeaf8;
  border-radius: 5px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    background-color: #4289cbf8;
    color: ivory;
  }
`;

export default function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const [openMove, setOpenMove] = useState(false);

  const onMove = () => {
    setOpenMove((prev) => !prev);
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      //targetIndex = category를 수정하고 싶은 요소의 인덱스(클릭한 버튼의 인덱스)
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldToDos[targetIndex];
      //click한 btn의 카테고리인 name을 넣어줘야 해
      const newToDo = { text, id, category: name as any };
      // console.log(newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const deltetargetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      return [
        ...oldToDos.slice(0, deltetargetIndex),
        ...oldToDos.slice(deltetargetIndex + 1),
      ];
    });
  };

  return (
    <List>
      <Item>
        <span>{text}</span>
        <div>
          <Movebtn onClick={onMove}>MOVE</Movebtn>
          {category !== Categories.DELETE && (
            <Deletebtn name={Categories.DELETE} onClick={onDelete}>
              DELTE
            </Deletebtn>
          )}
        </div>
      </Item>
      {openMove ? (
        <Category>
          {/* To_DO가 아니라면 TO_DO버튼 보여주기 */}
          {category !== Categories.TO_DO && (
            <Categorybtn name={Categories.TO_DO} onClick={onClick}>
              TO DO
            </Categorybtn>
          )}
          {category !== Categories.DOING && (
            <Categorybtn name={Categories.DOING} onClick={onClick}>
              DOING
            </Categorybtn>
          )}
          {category !== Categories.DONE && (
            <Categorybtn name={Categories.DONE} onClick={onClick}>
              DONE
            </Categorybtn>
          )}
        </Category>
      ) : null}
    </List>
  );
}
