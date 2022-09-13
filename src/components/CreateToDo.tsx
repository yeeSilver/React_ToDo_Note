import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
interface IForm {
  toDo: string;
}

const Form = styled.form`
  background: transparent;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: whitesmoke;
  border: solid 1.5px whitesmoke;
  &::placeholder {
    color: whitesmoke;
  }
  width: 230px;
`;
const Addbtn = styled.button`
  border: none;
  background-color: #ffe209;
  color: #403d3d;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
//toDo 리스트 수정
export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValue)}>
      <Input
        {...register("toDo", {
          required: "Warning: This is empty",
        })}
        placeholder="Write a to-do"
      />
      <Addbtn>ADD</Addbtn>
    </Form>
  );
}
