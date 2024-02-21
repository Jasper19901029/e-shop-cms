"use client";
import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegTrashCan } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Components = {
  key: string;
  value: string;
};

type Question = {
  questionIndex: string;
  questionType: string;
  questionRequired: string;
  questions: string;
};

// finish
// export default function CustomizeInput({
//   type,
//   index,
// }: {
//   index: number;
//   type: string;
// }) {
//   const [required, setRequired] = useState(false);
//   const [components, setComponents] = useState<Components[]>([
//     {
//       key: uuidv4(),
//       value: "",
//     },
//     {
//       key: uuidv4(),
//       value: "",
//     },
//   ]);
//   const [questionTitle, setQuestionTitle] = useState("");
//   const [question, setQuestion] = useState({
//     questionIndex: `question${index}`,
//     questionType: `questionType${type}`,
//     questionRequired: `questionRequired${required}`,
//     questionTitle: `questionTitle${questionTitle}`,
//   });

//   useEffect(() => {
//     const questionGroup = components.map((component) => component.value);
//     setQuestion({ ...question, ...questionGroup });
//   }, [components]);

//   useEffect(() => {
//     setQuestion({
//       ...question,
//       questionRequired: `questionRequired${required.toString()}`,
//     });
//   }, [required]);
//   console.log("question", question);

//   const addNewGroupQuestion = () => {
//     const key = uuidv4();
//     setComponents([...components, { key, value: "" }]);
//   };

//   const deleteGroupQuestion = (key: string) => {
//     const filterComponents = components.filter(
//       (component) => component.key !== key
//     );
//     setComponents(filterComponents);
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log(e.target.id);
//     const { value } = e.target;
//     const key = e.target.getAttribute("data-key");
//     const filterComponents = components.map((component) => {
//       if (component.key === key) {
//         component.value = value;
//         return component;
//       }
//       return component;
//     });
//     setComponents([...filterComponents]);
//   };

//   const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
//     const { value, id } = e.target;
//     setQuestion({ ...question, [id]: `questionTitle${value}` });
//   };

//   if (type === "text") {
//     return (
//       <div className="flex m-4">
//         <Label htmlFor={`question${index}_title`}>自訂問題{index}標題</Label>
//         <Input id={`question${index}_title`} name={`question${index}_title`} />
//       </div>
//     );
//   }
//   if (type === "radio") {
//     return (
//       <div>
//         <div className="flex">
//           <Label htmlFor={`questionTitle`}>自訂問題{index}標題</Label>
//           <Input
//             id={`questionTitle`}
//             onChange={handleChangeTitle}
//             // name={`question${index}_title`}
//           />
//         </div>
//         {components.map((component, idx) => (
//           <div key={component.key} className="flex m-4">
//             <Label htmlFor={`group_question${index}`}>選項{idx + 1}</Label>
//             <Input
//               id={`group_question${index}`}
//               // name={`group_question${index}_${idx + 1}`}
//               data-key={component.key}
//               onChange={handleChange}
//             />
//             <div
//               className="cursor-pointer"
//               onClick={() => deleteGroupQuestion(component.key)}>
//               <FaRegTrashCan />
//             </div>
//           </div>
//         ))}
//         <Switch
//           id="required"
//           checked={required}
//           onCheckedChange={setRequired}
//         />
//         <Label htmlFor="required">必填</Label>
//         <input
//           value={Object.values(question)}
//           name={`question${index}`}
//           readOnly
//         />
//         <div onClick={addNewGroupQuestion}>新增選項</div>
//       </div>
//     );
//   }
// }

// ---------------------------------------------------------
export default function CustomizeInput({
  type,
  index,
}: {
  index: number;
  type: string;
}) {
  const [required, setRequired] = useState(false);
  const [components, setComponents] = useState<Components[]>([
    {
      key: uuidv4(),
      value: "",
    },
    {
      key: uuidv4(),
      value: "",
    },
  ]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [question, setQuestion] = useState({
    questionIndex: `question${index}`,
    questionType: `questionType${type}`,
    questionRequired: `questionRequired${required}`,
    questionTitle: `questionTitle${questionTitle}`,
  });

  useEffect(() => {
    const questionGroup = components.map((component) => component.value);
    setQuestion({ ...question, ...questionGroup });
  }, [components]);

  useEffect(() => {
    setQuestion({
      ...question,
      questionRequired: `questionRequired${required.toString()}`,
    });
  }, [required]);

  const addNewGroupQuestion = () => {
    const key = uuidv4();
    setComponents([...components, { key, value: "" }]);
  };

  const deleteGroupQuestion = (key: string) => {
    const filterComponents = components.filter(
      (component) => component.key !== key
    );
    setComponents(filterComponents);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id);
    const { value } = e.target;
    const key = e.target.getAttribute("data-key");
    const filterComponents = components.map((component) => {
      if (component.key === key) {
        component.value = value;
        return component;
      }
      return component;
    });
    setComponents([...filterComponents]);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setQuestion({ ...question, [id]: `questionTitle${value}` });
  };

  if (type === "text") {
    return (
      <div className="flex m-4">
        <Label htmlFor={`question${index}_title`}>自訂問題{index}標題</Label>
        <Input id={`question${index}_title`} name={`question${index}_title`} />
      </div>
    );
  }
  if (type === "radio") {
    return (
      <div>
        <div className="flex">
          <Label htmlFor={`questionTitle`}>自訂問題{index}標題</Label>
          <Input
            id={`questionTitle`}
            onChange={handleChangeTitle}
            // name={`question${index}_title`}
          />
        </div>
        {components.map((component, idx) => (
          <div key={component.key} className="flex m-4">
            <Label htmlFor={`group_question${index}`}>選項{idx + 1}</Label>
            <Input
              id={`group_question${index}`}
              // name={`group_question${index}_${idx + 1}`}
              data-key={component.key}
              onChange={handleChange}
            />
            <div
              className="cursor-pointer"
              onClick={() => deleteGroupQuestion(component.key)}>
              <FaRegTrashCan />
            </div>
          </div>
        ))}
        <Switch
          id="required"
          checked={required}
          onCheckedChange={setRequired}
        />
        <Label htmlFor="required">必填</Label>
        <input
          value={Object.values(question)}
          name={`question${index}`}
          readOnly
        />
        <div onClick={addNewGroupQuestion}>新增選項</div>
      </div>
    );
  }
}
