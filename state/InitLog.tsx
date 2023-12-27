"use client";
import { ILog, useLogStore } from "@/store/store";
import React, { useRef } from "react";

type Props = {
  logs: ILog[];
};

export default function InitLog({ logs }: Props) {
  const initRef = useRef<boolean>();

  const prepareLog = () => {
    const result: {
      [key: string]: ILog;
    } = {};

    logs.forEach((log) => {
      result[log.date as string] = { ...log, date: new Date(log.date) };
    });

    return result;
  };

  if (!initRef.current) {
    useLogStore.setState({ logs: prepareLog() });
    initRef.current = true;
  }

  return null;
}
