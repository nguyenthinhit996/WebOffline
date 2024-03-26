"use client";

import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DetailTaskComponent from "@/components/DetailTaks";
import { StyledStackLayOut } from "@/common/CustomizeMUI";
import JourneyComponent from "@/components/Journey";
import { formatDatetime } from "@/util/Utils";
import axiosInstance from "@/config/axiosConfig";
import { CURRENT_TASK_ID } from "@/util/Utils";
import { StepActionContext } from "@/context/StepContext";
import { STEP } from "@/common/Text";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { ModalContext } from "@/context/ModalContext";

const currentStepMap = {
  TODO: 0,
  STEP2: 1,
  STEP3: 2,
};

const DetailTask = () => {
  const { notifications } = useContext(ModalContext);
  const [task, setTask] = useState({});
  const [error, setError] = useState();
  const [isStart, setIsStart] = useState(false);
  const { setStepAction } = useContext(StepActionContext);
  const [isLoading, setIsLoading] = useState(true);
  const taskId = localStorage.getItem(CURRENT_TASK_ID);

  const handleOnClick = async () => {
    setIsStart(true);
    setStepAction(STEP.JOURNEY);
  };

  const WaitingLoading = () => {
    return (
      <Stack
        spacing={1}
        sx={{ width: "80%" }}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ width: "70%", fontSize: "10rem" }} />
        <Skeleton variant="rectangular" sx={{ width: "70%" }} height={60} />
        <Skeleton variant="rounded" sx={{ width: "70%" }} height={60} />
        <Skeleton variant="text" sx={{ width: "70%", fontSize: "5rem" }} />
        <Skeleton variant="text" sx={{ width: "70%", fontSize: "2rem" }} />
      </Stack>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data = {} } = await axiosInstance.get(`/tasks/${+taskId}`);
        if (data) {
          const formatData = {
            ...data,
            deliveryDate: formatDatetime(data.due_date),
            estimation_in_hours: data.estimation_in_hours + ":00",
          };
          setTask(formatData);
        } else setError("Not found");
      } catch (err) {
        setError(err.response?.data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [taskId]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {isLoading ? (
        <WaitingLoading />
      ) : (
        <StyledStackLayOut>
          {isStart ? (
            <JourneyComponent
              taskId={task.id}
              data={task}
              currentStep={currentStepMap[task?.status]}
            />
          ) : (
            <DetailTaskComponent
              data={task}
              error={error}
              handleOnClick={handleOnClick}
            />
          )}
        </StyledStackLayOut>
      )}
    </Box>
  );
};

export default DetailTask;
