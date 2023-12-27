"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogStore } from "@/store/store";
import { DatePicker } from "./DatePicker";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {};

export default function CreateLog({}: Props) {
  const log = useLogStore((state) => state.log);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleSubmitLog = async () => {
    try {
      isFormValidated();

      const { data, error } = await supabase
        .from("logs")
        .upsert({ ...log, date: dayjs(log.date).format("YYYY-MM-DD") })
        .select("*")
        .single();

      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }

      if (data) {
        toast({
          title: "Log created successfullly!",
          description: `${log.hour} hours logged on ${log.date}`,
        });
        setLogs(log, dayjs(log.date).format("YYYY-MM-DD"));
      }
    } catch (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const isFormValidated = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw new Error("Date/hour can't be empty!!");
    } else if (log.hour > 24) {
      throw new Error("Please enter num from 1 - 24!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Log +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Log</DialogTitle>
          <DialogDescription>
            Add new log and resume your adventures!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Date:
            </Label>
            <DatePicker />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Hour:
            </Label>
            <Input
              id="name"
              defaultValue="0"
              type="number"
              placeholder="Please specify your hour..."
              className="col-span-3"
              onChange={(e) =>
                setLog({ ...log, hour: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Note:
            </Label>
            <Input
              id="username"
              type="text"
              defaultValue=""
              placeholder="Please specify your note..."
              className="col-span-3"
              onChange={(e) => setLog({ ...log, note: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmitLog} type="submit">
            Create Log
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
