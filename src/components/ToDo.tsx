import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

export default function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
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
    <li>
      <span>{text}</span>
      {/* To_DO가 아니라면 TO_DO버튼 보여주기 */}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
      {category !== Categories.DELETE && (
        <button name={Categories.DELETE} onClick={onDelete}>
          DELTE
        </button>
      )}
    </li>
  );
}
