import { ChangeEvent } from "react";
import { Components } from "./page";
import {
  addNewGroupBuy,
  GroupBuyOrder,
  Question,
} from "@/utils/firebase/firebase";
export async function handleSubmit(
  e: ChangeEvent<HTMLFormElement>,
  groupDefault: GroupBuyOrder,
  questions: Components[]
) {
  e.preventDefault();
  const groupOrderQuestions = questions.map((item) => {
    return {
      type: item.type,
      title: item.title,
      required: item.required,
      questions: item.questions.map((question) => question.question),
    };
  });

  console.log("groupDefault", groupDefault);
  console.log("groupOrderQuestions", groupOrderQuestions);

  // await addNewGroupBuy(groupDefault, groupOrderQuestions);
}

//   groupBuyName: string;
//   groupBuyOwner: string;
//   groupBuyProduct: string;
//   id: string;
//   questions: Question[]

// type: "radio" | "text";
// title: string;
// required: boolean;
// question: string | string[]
