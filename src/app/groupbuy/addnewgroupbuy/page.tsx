"use client";
import React, { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { handleSubmit } from "./formaction";
import { GroupBuyOrder } from "@/utils/firebase/firebase";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="w-full flex flex-col mt-8">
      <h2 className="mb-8 text-2xl ml-8">新增團購表單</h2>
      <form
        className="flex flex-col w-4/5 mx-auto sm:w-3/5 sm:mx-auto border-2 rounded-lg p-8 space-y-4 mb-8"
        onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
          handleSubmit(event, groupDefault, components);
        }}>
        <div className="flex items-center">
          <Label className="w-[120px] mr-2" htmlFor="groupBuyName">
            團購名稱
          </Label>
          <Input
            className=""
            required
            id="groupBuyName"
            name="groupBuyName"
            onChange={handleGroupDefault}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-[120px] mr-2" htmlFor="groupBuyOwner">
            團購主姓名
          </Label>
          <Input
            className=""
            required
            id="groupBuyOwner"
            name="groupBuyOwner"
            onChange={handleGroupDefault}
          />
        </div>
        <div className="flex items-center">
          <Label className="w-[120px] mr-2" htmlFor="groupBuyProduct">
            團購商品
          </Label>
          <Input
            className=""
            required
            id="groupBuyProduct"
            name="groupBuyProduct"
            onChange={handleGroupDefault}
          />
        </div>
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
          <div
            key={component.key}
            className="flex flex-col p-6 border-2 rounded-lg space-y-4">
            <div className="flex items-center">
              <Label
                htmlFor={`question${index + 1}title`}
                className="w-[130px]">
                {component.type === "text"
                  ? `簡答題 ${index + 1}`
                  : `選選題 ${index + 1}`}
              </Label>
              <Input
                required
                id={`question${index + 1}title`}
                onChange={(e) =>
                  handleQuestionTitle(
                    e,
                    component.type,
                    component.questions[0].key
                  )
                }
                data-key={component.key}
              />
            </div>

            {component.questions.map((item, idx) => (
              <div key={item.key}>
                {component.type === "radio" && (
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-2 items-center">
                      <Label
                        htmlFor={`question${index + 1}-${idx + 1}`}>{`選項${
                        idx + 1
                      }`}</Label>
                      {component.type === "radio" &&
                        component.questions.length > 1 && (
                          <Button
                            type="button"
                            className="w-fit bg-white border-0"
                            variant="ghost"
                            onClick={() =>
                              deleteQuestions(component.key, item.key)
                            }>
                            <FaRegTrashCan />
                          </Button>
                        )}
                    </div>

                    <Input
                      required
                      id={`question${index + 1}-${idx + 1}`}
                      onChange={handleQuestions}
                      data-component-key={component.key}
                      data-self-key={item.key}
                      name={`question`}
                    />
                  </div>
                )}
              </div>
            ))}

            {component.type === "radio" && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => addNewQuestions(component.key)}>
                新增選項
              </Button>
            )}
            <div className="flex items-center space-x-2 sm:justify-between">
              <Select
                onValueChange={(e: "text" | "radio") =>
                  handleQuestionType(e, component.key)
                }
                defaultValue={component.type}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio">選擇題</SelectItem>
                  <SelectItem value="text">簡答題</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between space-x-2 sm:space-x-4">
                <Switch
                  id="required"
                  checked={component.required}
                  onCheckedChange={(value) =>
                    handleQuestionRequired(value, component.key)
                  }
                />
                <Label className="w-[30px] " htmlFor="required">
                  必填
                </Label>
              </div>
            </div>
            <Button
              type="button"
              className="w-fit bg-white border-0"
              variant="ghost"
              onClick={() => deleteQuestion(component.key)}>
              <FaRegTrashCan />
            </Button>
          </div>
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
