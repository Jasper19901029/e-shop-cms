"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Components } from "@/app/groupbuy/addnewgroupbuy/page";
import { GroupBuyOrder } from "@/utils/firebase/firebase";

export default function EditGroupDetail({ ...groupBuyData }) {
  const [components, setComponents] = useState<Components[]>([]);
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
  console.log("this is components", components);
  const [groupDefault, setGroupDefault] = useState<GroupBuyOrder>({
    id: groupBuyData.id,
    groupBuyName: groupBuyData.groupBuyName,
    groupBuyOwner: groupBuyData.groupBuyOwner,
    groupBuyProduct: groupBuyData.groupBuyProduct,
  });
  return (
    <div>
      {components.length &&
        components.map((component, index) => (
          <div key={index}>
            {component.questions.map((item) => (
              <div key={item.key}>
                <div></div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
