import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE",
}

export interface IToDo {
  text: string;
  id: number;
  //string중에서도 이 세개 중 하나에 해당해야 함
  category: Categories;
}
//할일을 처음 등록할때 정할 수 있는 카테고리
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

//localstorage에 저장했다가 꺼내써보자.
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    //이렇게 하면 toDos에 모든 toDo(toDoState의 값들)가 할당 됨
    const toDos = get(toDoState);
    const category = get(categoryState);
    /* if (category === "TO_DO")
      return toDos.filter((toDo) => toDo.category === "TO_DO");
    if (category === "DOING")
      return toDos.filter((toDo) => toDo.category === "DOING");
    if (category === "DONE")
      return toDos.filter((toDo) => toDo.category === "DONE"); 
    
    이 코드를 한 줄로 단축시키면  */
    return toDos.filter((toDo) => toDo.category === category);
  },
});
