import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #4a4a46a4;
  padding: 50px;
  font-weight: 500;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Select = styled.select`
  width: 350px;
  background-color: #4a4a46a4;
  color: ivory;
  padding: 10px;
  margin: 10px 0 20px;
`;

const Box = styled.div`
  width: 350px;
  background-color: #4a4a46a4;
  padding: 10px;
`;

export default function ToDoList() {
  //useRecoilValue(toDoSelector)의 반환값은 배열임.배열 안에 카테고리 별 배열을 꺼내기 위해 배열을 열어야 함 따라서 const [...내용...]를 해주는 거임
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    //Input이 변할 때 setCategory 호출
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Title>TO DO LIST</Title>

        {/* Input값에만 해당 */}
        <Select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>TO DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </Select>
        <Box>
          <CreateToDo />
          {toDos.length ? (
            toDos.map((toDo) => <ToDo key={toDo.id} {...toDo} />)
          ) : (
            <p style={{ color: "orange" }}>
              There is NOTHING! 👻Add your first thing
            </p>
          )}
        </Box>
      </Container>
    </div>
  );
}
