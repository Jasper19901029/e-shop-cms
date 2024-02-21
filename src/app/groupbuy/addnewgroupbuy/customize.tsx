"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import CustomizeInput from "./customizeinput";

// finish
// export default function Customize({ index }: { index: number }) {
//   const [type, setType] = useState("text");

//   return (
//     <div className="m-4">
//       {<CustomizeInput key={uuidv4()} type={type} index={index} />}
//       <Select
//         // name={`question${index}_type`}
//         onValueChange={setType}
//         defaultValue={type}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="radio">radio</SelectItem>
//           <SelectItem value="text">text</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// ---------------------------------------------try
export default function Customize({ index }: { index: number }) {
  const [type, setType] = useState("text");

  return (
    <div className="m-4">
      {<CustomizeInput key={uuidv4()} type={type} index={index} />}
      <Select
        // name={`question${index}_type`}
        onValueChange={setType}
        defaultValue={type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="radio">radio</SelectItem>
          <SelectItem value="text">text</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
