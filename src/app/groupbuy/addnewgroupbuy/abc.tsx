import React, { useState } from "react";

// 定义 TextProps 类型
type TextProps = {
  title: string;
  require: "Y" | "N";
};

// 定义 RadioProps 类型
type RadioProps = {
  title: string;
  require: "Y" | "N";
  chooseOptions: string[];
};

// 定义 Question 类型，表示问题的通用类型
type Question = TextProps | RadioProps;

// 定义 FormGenerator 组件
const FormGenerator: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  // 添加简答题
  const addTextQuestion = () => {
    const newTextQuestion: TextProps = {
      title: "",
      require: "Y",
    };
    setQuestions([...questions, newTextQuestion]);
  };

  // 添加单选题
  const addRadioQuestion = () => {
    const newRadioQuestion: RadioProps = {
      title: "",
      require: "Y",
      chooseOptions: [],
    };
    setQuestions([...questions, newRadioQuestion]);
  };

  // 处理问题标题的变化
  const handleQuestionTitleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].title = event.target.value;
    setQuestions(newQuestions);
  };

  // 处理单选题选项的变化
  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].chooseOptions[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  // 渲染问题输入框
  const renderQuestionInput = (question: Question, index: number) => {
    return (
      <div key={index}>
        <label>{`Question ${index + 1}: `}</label>
        <input
          type="text"
          value={question.title}
          onChange={(e) => handleQuestionTitleChange(index, e)}
        />
        {question.chooseOptions &&
          question.chooseOptions.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e)}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <button onClick={addTextQuestion}>Add Text Question</button>
      <button onClick={addRadioQuestion}>Add Radio Question</button>
      <hr />
      {questions.map((question, index) => renderQuestionInput(question, index))}
    </div>
  );
};

export default FormGenerator;
