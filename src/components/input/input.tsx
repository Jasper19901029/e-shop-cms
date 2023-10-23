import { ReactNode, ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
  name: string;
  id: string;
  htmlFor: string;
  required?: true;
  type: "text" | "number" | "radio" | "email" | "password";
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  min?: number;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ ...rest }: InputProps): ReactNode {
  if (rest.type === "radio") {
    return (
      <>
        <input {...rest} className="mx-4" />
        <label htmlFor={rest.htmlFor}>{rest.label}</label>
      </>
    );
  }
  return (
    <div className="">
      <label className="mr-4 w-[100px]" htmlFor={rest.htmlFor}>
        {rest.label}:
      </label>
      <input
        {...rest}
        className="lg:appearance-none appearance-none border-2 border-slider border-black rounded-[4px] focus:outline-none focus:border-blue-500"
      />
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
