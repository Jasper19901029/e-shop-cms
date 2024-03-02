"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Components } from "@/app/groupbuy/addnewgroupbuy/page";
import { GroupBuyOrder, updateGroupBuy } from "@/utils/firebase/firebase";
import Editgroupdefaultfield from "./editgroupdefaultfield";
import { Button } from "@/components/ui/button";
import EditGroupQuestion from "./editgroupquestion";
import { useRouter } from "next/navigation";

export default function EditGroupDetail({ ...groupBuyData }) {
  const router = useRouter();
  const [components, setComponents] = useState<Components[]>([]);
  const [groupDefault, setGroupDefault] = useState<GroupBuyOrder>({
    // id: groupBuyData.id,
    groupBuyName: groupBuyData.groupBuyName,
    groupBuyOwner: groupBuyData.groupBuyOwner,
    groupBuyProduct: groupBuyData.groupBuyProduct,
  });
  const id = groupBuyData.id;
  useEffect(() => {
    const getQuestions = groupBuyData.questions.map((item: Components) => {
      return {
        key: uuidv4(),
        title: item.title,
        type: item.type,
        required: item.required,
        questions: item.questions.map((question) => {
          return {
            key: uuidv4(),
            question: question,
          };
        }),
      };
    });
    setComponents(getQuestions);
  }, []);

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

    const addToDatabase = await updateGroupBuy(
      groupBuyData.id,
      groupDefault,
      groupOrderQuestions
    );
    if (addToDatabase) {
      alert("新增成功");
      return router.push("/groupbuy");
    }
    alert("新增失敗");
  };

  console.log(components);
  return (
    <div className="w-full flex flex-col mt-8">
      <h2 className="mb-8 text-2xl ml-8">編輯團購表單</h2>
      <form
        className="flex flex-col w-4/5 mx-auto sm:w-3/5 sm:mx-auto border-2 rounded-lg p-8 space-y-4 mb-8"
        onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
          submitHandle(event, groupDefault, components);
        }}>
        <Editgroupdefaultfield
          handleGroupDefault={handleGroupDefault}
          groupDefault={groupDefault}
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={addNewQuestion}>
            新增問題
          </Button>
        </div>
        {components.length &&
          components.map((component, index) => (
            <EditGroupQuestion
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
