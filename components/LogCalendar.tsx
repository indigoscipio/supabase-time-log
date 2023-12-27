"use client";
import React from "react";
import dayjs from "dayjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useLogStore } from "@/store/store";

type Props = {};

export default function LogCalendar({}: Props) {
  const logs = useLogStore((state) => state.logs);

  const getDateInMonth = (year = dayjs().year(), month = dayjs().month()) => {
    const startDate = dayjs().year(year).month(month).date(1);
    const endDate = startDate.endOf("month");

    const datesArray = [];

    for (let i = startDate.date(); i <= endDate.date(); i++) {
      datesArray.push(startDate.date(i).format("YYYY-MM-DD"));
    }

    return datesArray;
  };

  const getColor = (value) => {
    if (value == 0) {
      return "bg-gray-100";
    } else if (value < 3) {
      return "bg-green-100";
    } else if (value < 6) {
      return "bg-green-300";
    } else {
      return "bg-green-500";
    }
  };

  const dateInMonth = getDateInMonth();
  // console.log(logs);

  return (
    <div className="cursor-pointer flex gap-2 justify-center flex-wrap">
      {dateInMonth.map((date, index) => {
        const log = logs[date];

        return (
          <HoverCard key={index}>
            <HoverCardTrigger asChild>
              <div
                className={`w-8 h-8 rounded-lg border ${getColor(
                  log?.hour || 0
                )} bg-gray-100`}
              ></div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{log?.hour || 0} Total Hour</p>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
