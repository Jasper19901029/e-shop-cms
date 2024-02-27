"use client";
import React, { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { GroupBuyOrder, addNewGroupBuy } from "@/utils/firebase/firebase";
import GroupDefaultField from "./groupdefaultfield";
import GroupQuestion from "./groupquestion";
import { useRouter } from "next/navigation";

export type Components = {
  key: string;
  type: "text" | "radio";
  required: boolean;
  title: string;
  questions: Questions[];
};

export type Questions = {
  [key: string]: string;
};

const groupDefaultField: GroupBuyOrder = {
  groupBuyName: "",
  groupBuyOwner: "",
  groupBuyProduct: "",
};

export default function AddNewGroupBuyPage() {
  const router = useRouter();
  const [components, setComponents] = useState<Components[]>([]);
  const [groupDefault, setGroupDefault] =
    useState<GroupBuyOrder>(groupDefaultField);

  const handleGroupDefault = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGroupDefault({ ...groupDefault, [name]: value });
  };
  const addNewQuestion = () => {
    const key = uuidv4();
    const questionKey = uuidv4();
    setComponents([
      ...components,
      {
        key,
        type: "text",
        title: "",
        required: false,
        questions: [{ key: questionKey }],
      },
    ]);
  };
  const deleteQuestion = (key: string) => {
    const filterComponents = components.filter(
      (component) => component.key !== key
    );
    setComponents(filterComponents);
  };

  const handleQuestionTitle = (
    e: ChangeEvent<HTMLInputElement>,
    questionType: string,
    questionKey: string
  ) => {
    const { value } = e.target;
    const dataKey = e.target.getAttribute("data-key");

    const changeValue = components.map((component) => {
      if (component.key === dataKey) {
        component.title = value;
        if (
          questionType === "text" &&
          component.questions[0].key === questionKey
        ) {
          component.questions[0].question = value;
        }
        return component;
      }
      return component;
    });
    setComponents(changeValue);
  };

  const handleQuestionType = (value: "text" | "radio", key: string) => {
    const changeValue = components.map((component) => {
      if (component.key === key) {
        component.type = value;
        component.questions = component.questions.filter((item, idx) => {
          if (value === "text") {
            item.question = "";
            return idx === 0;
          }
          return idx === 0;
        });
        return component;
      }

      return component;
    });
    setComponents(changeValue);
  };

  const handleQuestionRequired = (value: boolean, key: string) => {
    const changeValue = components.map((component) => {
      if (component.key === key) {
        component.required = value;
        return component;
      }
      return component;
    });
    setComponents(changeValue);
  };

  const handleQuestions = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const componentKey = e.target.getAttribute("data-component-key");
    const selfKey = e.target.getAttribute("data-self-key");
    const changeValue = components.map((component) => {
      if (component.key === componentKey) {
        component.questions.map((question) => {
          if (question.key === selfKey) {
            question[name] = value;
            return question;
          }
          return question;
        });
        return component;
      }
      return component;
    });
    setComponents(changeValue);
  };

  const deleteQuestions = (componentKey: string, selfKey: string) => {
    const filterComponents = components.map((component) => {
      if (component.key === componentKey) {
        component.questions = component.questions.filter((question) => {
          if (question.key !== selfKey) return question;
        });
        return component;
      }
      return component;
    });
    setComponents(filterComponents);
  };

  const addNewQuestions = (key: string) => {
    const newKey = uuidv4();
    const filterComponents = components.map((component) => {
      if (component.key === key) {
        component.questions.push({ key: newKey });
      }
      return component;
    });
    setComponents(filterComponents);
  };

  const submitHandle = async (
    e: ChangeEvent<HTMLFormElement>,
    groupDefault: GroupBuyOrder,
    questions: Components[]
  ) => {
    e.preventDefault();
    const groupOrderQuestions = questions.map((item) => {
      return {
        type: item.type,
        title: item.title,
        required: item.required,
        questions: item.questions.map((question) => question.question),
      };
    });
    if (!groupOrderQuestions.length) {
      return alert("要有問題再新增表單");
    }

    const addToDatabase = await addNewGroupBuy(
      groupDefault,
      groupOrderQuestions
    );
    if (addToDatabase) {
      alert("新增成功");
      return router.push("/groupbuy");
    }
    alert("新增失敗");
  };

  return (
    <div className="w-full flex flex-col mt-8">
      <h2 className="mb-8 text-2xl ml-8">新增團購表單</h2>
      <form
        className="flex flex-col w-4/5 mx-auto sm:w-3/5 sm:mx-auto border-2 rounded-lg p-8 space-y-4 mb-8"
        onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
          submitHandle(event, groupDefault, components);
        }}>
        <GroupDefaultField handleGroupDefault={handleGroupDefault} />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={addNewQuestion}>
            新增問題
          </Button>
        </div>
        {components.map((component, index) => (
          <GroupQuestion
            key={component.key}
            component={component}
            index={index}
            handleQuestionTitle={handleQuestionTitle}
            handleQuestions={handleQuestions}
            deleteQuestions={deleteQuestions}
            addNewQuestions={addNewQuestions}
            handleQuestionType={handleQuestionType}
            handleQuestionRequired={handleQuestionRequired}
            deleteQuestion={deleteQuestion}
          />
        ))}
        <div className="flex justify-center">
          <Button type="submit" variant="ghost" className="w-fit">
            送出
          </Button>
        </div>
      </form>
    </div>
  );
}
