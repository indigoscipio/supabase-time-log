"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogStore } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Props = {};

export default function LogTable({}: Props) {
  const supabase = createClientComponentClient();
  const logs = useLogStore((state) => state.logs);

  return (
    <Table>
      <TableCaption>List of your latest logs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Hour</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(logs).map((key, index) => {
          const log = logs[key];
          return (
            <TableRow key={index}>
              <TableCell>{log.date.toDateString()}</TableCell>
              <TableCell>{log.hour}</TableCell>
              <TableCell>
                {log.note ? log.note : "No Note Specified..."}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
