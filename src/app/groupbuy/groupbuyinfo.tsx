"use client";
import React, { useState } from "react";
import { FormData, editIsAnswer, delGroupBuy } from "@/utils/firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function GroupBuyInfo({
  answer,
  groupBuyName,
  groupBuyOwner,
  groupBuyProduct,
  url,
  createAt,
  id,
}: FormData) {
  const router = useRouter();
  const [switchChecked, setSwitchChecked] = useState(answer);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleGroup = async (id?: string) => {
    if (id) {
      const delGroup = await delGroupBuy(id);
      if (delGroup) {
        alert("刪除成功");
        setOpen(false);
        return router.refresh();
      }
      alert("刪除失敗");
      return setOpen(false);
    }
  };

  const toggleIsAnswer = async (id?: string) => {
    const next = !switchChecked;
    setSwitchChecked(next);
    await editIsAnswer(id, next);
  };
  return (
    <div className="mx-8 flex flex-col odd:bg-gray-200 even:bg-gray-100 mb-8">
      <div className="flex justify-around items-center text-center">
        <p className="w-[100px]">{groupBuyName}</p>
        <p className="w-[80px] ">{groupBuyOwner}</p>
        <Button className="w-[80px] hover:bg-blue-300">
          <Link href={`/groupbuy/editgroupbuy/${id}`}>編輯</Link>
        </Button>
        <p className="w-[80px]">{createAt}</p>
        <Button
          className={
            switchChecked
              ? "w-[100px] bg-green-500 mt-2 hover:bg-green-300"
              : "w-[100px] bg-red-500 mt-2 hover:bg-red-300"
          }
          onClick={() => toggleIsAnswer(id)}>
          關
          <Switch checked={switchChecked} onChange={() => null} />
          開
        </Button>
        <Button
          variant="text"
          onClick={handleClickOpen}
          className="hover:bg-blue-300">
          刪除
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`確定刪除${groupBuyName}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleGroup(id)}
              className="hover:bg-blue-300">
              是
            </Button>
            <Button onClick={handleClose} className="hover:bg-blue-300">
              否
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="ml-20 ">
        <Link
          href={url}
          className="underline decoration-solid decoration-1 decoration-black underline-offset-[5px]">
          表單連結:{url}
        </Link>
      </div>
    </div>
  );
}
