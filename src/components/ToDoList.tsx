import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export default function ToDoList() {
  //useRecoilValue(toDoSelector)의 반환값은 배열임.배열 안에 카테고리 별 배열을 꺼내기 위해 배열을 열어야 함 따라서 const [...내용...]를 해주는 거임
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    //Input이 변할 때 setCategory 호출
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>📑TO Do List</h1>
      <hr />
      {/* Input값에만 해당 */}
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
