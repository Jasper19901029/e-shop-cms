import { ReactNode, ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
  name: string;
  id: string;
  htmlFor: string;
  required?: true;
  type: "text" | "number" | "radio";
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  min?: number;
  className: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputFile = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <div>
      <label>圖片上傳</label>
      <input {...rest} ref={ref} />
    </div>
  );
});

export default function Input({ ...rest }: InputProps): ReactNode {
  if (rest.type === "radio") {
    return (
      <>
        <input {...rest} />
        <label htmlFor={rest.htmlFor}>{rest.label}</label>
      </>
    );
  }
  return (
    <div className="">
      <label className="mr-2 w-[100px]" htmlFor={rest.htmlFor}>
        {rest.label}:
      </label>
      <input {...rest} />
    </div>
  );
}

// export default function Input({ ...rest }: InputProps) {
//   const { htmlFor } = rest;
//   const { label } = rest;
//   return forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
//     ({ className, ...rest }, ref) => {
//       return (
//         <div className="">
//           <label className="mr-2 w-[100px]" htmlFor={htmlFor}>
//             {label}:
//           </label>
//           <input {...rest} className={className} ref={ref} />
//         </div>
//       );
//     }
//   );
// }
