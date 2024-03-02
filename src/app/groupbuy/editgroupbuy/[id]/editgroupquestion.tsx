"use client";
import React, { ChangeEvent } from "react";
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
import { Button } from "@/components/ui/button";
import { Components } from "@/app/groupbuy/addnewgroupbuy/page";

export default function EditGroupQuestion({
  component,
  index,
  handleQuestionTitle,
  handleQuestions,
  deleteQuestions,
  addNewQuestions,
  handleQuestionType,
  handleQuestionRequired,
  deleteQuestion,
}: {
  component: Components;
  index: number;
  handleQuestionTitle: (
    e: ChangeEvent<HTMLInputElement>,
    questionType: string,
    questionKey: string
  ) => void;
  handleQuestions: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteQuestions: (componentKey: string, selfKey: string) => void;
  addNewQuestions: (key: string) => void;
  handleQuestionType: (value: "text" | "radio", key: string) => void;
  handleQuestionRequired: (value: boolean, key: string) => void;
  deleteQuestion: (key: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col p-6 border-2 rounded-lg space-y-4">
        <div className="flex items-center">
          <Label htmlFor={`question${index + 1}title`} className="w-[130px]">
            {component.type === "text"
              ? `簡答題 ${index + 1}`
              : `選選題 ${index + 1}`}
          </Label>
          <Input
            required
            id={`question${index + 1}title`}
            value={component.title}
            onChange={(e) =>
              handleQuestionTitle(e, component.type, component.questions[0].key)
            }
            data-key={component.key}
          />
        </div>

        {component.questions.map((item, idx) => (
          <div key={item.key}>
            {component.type === "radio" && (
              <div className="flex flex-col">
                <div className="flex justify-between mb-2 items-center">
                  <Label htmlFor={`question${index + 1}-${idx + 1}`}>{`選項${
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
                  value={item.question}
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
    </div>
  );
}
