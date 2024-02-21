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
  endAt: "",
};

export default function AddNewGroupBuyPage() {
  const [components, setComponents] = useState<Components[]>([]);
  const [groupDefault, setGroupDefault] =
    useState<GroupBuyOrder>(groupDefaultField);
  const day = dayjs().format("YYYY/MM/DD");
  const day1 = dayjs().format("2024/02/22");
  console.log(dayjs(day1).diff(day, "millisecond"), "??");
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

  const handleQuestionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const dataKey = e.target.getAttribute("data-key");
    const changeValue = components.map((component) => {
      if (component.key === dataKey) {
        component.title = value;
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
        component.questions = component.questions.filter(
          (item, idx) => idx === 0
        );
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
    <div>
      <h2>AddNewGroupBuy</h2>
      <form
        onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
          handleSubmit(event, groupDefault, components);
        }}>
        <div className="flex items-center">
          <Label htmlFor="groupBuyName">團購名稱</Label>
          <Input
            id="groupBuyName"
            name="groupBuyName"
            onChange={handleGroupDefault}
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="groupBuyOwner">團購主姓名</Label>
          <Input
            id="groupBuyOwner"
            name="groupBuyOwner"
            onChange={handleGroupDefault}
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="groupBuyProduct">團購商品</Label>
          <Input
            id="groupBuyProduct"
            name="groupBuyProduct"
            onChange={handleGroupDefault}
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="endAt">表單失效日</Label>
          <Input id="endAt" name="endAt" onChange={handleGroupDefault} />
        </div>

        {components.map((component, index) => (
          <div key={component.key} className="border-2 m-4 flex flex-col">
            <div className="flex">
              <Label htmlFor={`question${index + 1}title`}>
                {component.type === "text"
                  ? `簡答題 ${index + 1}`
                  : `多選題 ${index + 1}`}
              </Label>
              <Input
                id={`question${index + 1}title`}
                onChange={handleQuestionTitle}
                data-key={component.key}
              />
            </div>

            {component.questions.map((item, idx) => (
              <div key={item.key}>
                <Label htmlFor={`question${index + 1}-${idx + 1}`}>{`question${
                  index + 1
                }-${idx + 1}`}</Label>
                <Input
                  id={`question${index + 1}-${idx + 1}`}
                  onChange={handleQuestions}
                  data-component-key={component.key}
                  data-self-key={item.key}
                  name={`question`}
                />
                {component.type === "radio" &&
                  component.questions.length > 1 && (
                    <div
                      onClick={() => deleteQuestions(component.key, item.key)}>
                      del
                    </div>
                  )}
              </div>
            ))}

            {component.type === "radio" && (
              <div onClick={() => addNewQuestions(component.key)}>add</div>
            )}
            <Select
              onValueChange={(e: "text" | "radio") =>
                handleQuestionType(e, component.key)
              }
              defaultValue={component.type}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radio">radio</SelectItem>
                <SelectItem value="text">text</SelectItem>
              </SelectContent>
            </Select>

            <Switch
              id="required"
              checked={component.required}
              onCheckedChange={(value) =>
                handleQuestionRequired(value, component.key)
              }
            />
            <Label htmlFor="required">必填</Label>
            <div
              className="cursor-pointer"
              onClick={() => deleteQuestion(component.key)}>
              <FaRegTrashCan />
            </div>
          </div>
        ))}

        <button>test</button>
      </form>
      <button onClick={addNewQuestion}>add new question</button>
    </div>
  );
}
