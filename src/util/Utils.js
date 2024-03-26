import { STATUS_STASK } from "@/common/Text";

const mapStatusSelectOption = () => {
  const selectOptions = [{ value: "ALL", label: "All Status" }];
  for (const key in STATUS_STASK) {
    selectOptions.push({ value: key, label: STATUS_STASK[key] });
  }

  return selectOptions;
};

const mapWarehouseSelectOption = (warehouseOptions = []) => {
  const result = [{ value: "ALL", label: "All Warehouse" }];

  const seenWarehouses = new Set(); // Track seen warehouses

  warehouseOptions.forEach(({ warehouse }) => {
    if (!seenWarehouses.has(warehouse) && warehouse) {
      seenWarehouses.add(warehouse);
      result.push({ value: warehouse, label: warehouse });
    }
  });

  return result;
};

const STATUS_MAP = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const mapStatusApiResult = (tasks = []) => {
  return tasks.map((task) => {
    task.status = STATUS_MAP[task?.status] || STATUS_MAP.IN_PROGRESS;
    task.due_date = formatDatetime(task.due_date);
    task.estimation_in_hours = task.estimation_in_hours + ":00";
    return task;
  });

  // .filter(
  //   (task) => task.cur_assignee_id === null || task.cur_assignee_id === userId
  // )
};

const tasksMockupData = [
  {
    id: 1,
    name: "Can Opener",
    location: "Drawer - 7",
    dueDate: "2024-03-16",
    deliveryDate: "2024-03-25",
    status: STATUS_STASK.COMPLETED,
  },
  {
    id: 2,
    name: "Spatula",
    location: "Shelf - 5",
    dueDate: "2024-03-12",
    deliveryDate: "2024-03-25",
    status: STATUS_STASK.COMPLETED,
  },
  {
    id: 3,
    name: "Cutting Board",
    location: "Drawer - 5",
    dueDate: "2024-03-19",
    deliveryDate: "2024-03-22",
    status: STATUS_STASK.IN_PROGRESS,
  },
  {
    id: 4,
    name: "Colander",
    location: "Drawer - 5",
    dueDate: "2024-03-16",
    deliveryDate: "2024-03-23",
    status: STATUS_STASK.TODO,
  },
  {
    id: 5,
    name: "Pan",
    location: "Shelf - 1",
    dueDate: "2024-03-09",
    deliveryDate: "2024-03-25",
    status: STATUS_STASK.TODO,
  },
  {
    id: 6,
    name: "Colander",
    location: "Drawer - 6",
    dueDate: "2024-03-07",
    deliveryDate: "2024-03-22",
    status: STATUS_STASK.IN_PROGRESS,
  },
  {
    id: 7,
    name: "Cutting Board",
    location: "Drawer - 4",
    dueDate: "2024-03-06",
    deliveryDate: "2024-03-24",
    status: STATUS_STASK.TODO,
  },
  {
    id: 8,
    name: "Pan",
    location: "Shelf - 2",
    dueDate: "2024-03-09",
    deliveryDate: "2024-03-22",
    status: STATUS_STASK.TODO,
  },
  {
    id: 9,
    name: "Pan",
    location: "Drawer - 1",
    dueDate: "2024-03-16",
    deliveryDate: "2024-03-26",
    status: STATUS_STASK.COMPLETED,
  },
  {
    id: 10,
    name: "Colander",
    location: "Shelf - 6",
    dueDate: "2024-03-07",
    deliveryDate: "2024-03-25",
    status: STATUS_STASK.COMPLETED,
  },
];

const taskDetailMockData = {
  id: "111",
  status: STATUS_STASK.COMPLETED,
  description: "Move the box from HCM to HN city",
  nameProduct: "Refrigerator",
  deliveryDate: "12-12-2024",
  deliveryTime: "5",
  addressCustomer:
    "Chi nhánh 6 (Lab 6): Tòa nhà TMA, Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12",
  numberPhoneCustomer: "(028) 3997 8000",
  noticed:
    "Enter your preferred truck driving location to personalize recommendations for the best driving .",
};

const STEP_STATUS_MAP = {
  0: "STEP2",
  1: "STEP3",
  2: "COMPLETED",
};

const mapTaskStatus = (status) => {
  return STATUS_MAP?.[status] || STATUS_STASK.IN_PROGRESS;
};

const formatDatetime = (datetime) => {
  return new Date(datetime).toISOString().split("T")[0];
};

const getUserId = () => {
  const userId = localStorage.getItem("userId");
  return userId;
};

const TASK_LOCAL_KEY = "task";
const CURRENT_TASK_ID = "currentTaskId";
const TASKS_ID_VISITED = "tasksIdVisited";

function minVersionCheck(versionString, majorVersion, minorVersion) {
  const [osMajorVersion, osMinorVersion] = versionString.split(".");
  if (
    Number(osMajorVersion) < majorVersion ||
    (Number(osMajorVersion) === majorVersion &&
      Number(osMinorVersion) < minorVersion)
  ) {
    return false;
  } else {
    return true;
  }
}

const IOS_WARNING_MSG = `This web demo requires iOS 16.5 or later for pushing notifications.
Please run a software update or continue wihout notification.`;

const OFFLINE_MSG = `You are offline, please connect to the internet to view this task.`;

export {
  mapStatusSelectOption,
  mapWarehouseSelectOption,
  tasksMockupData,
  taskDetailMockData,
  mapStatusApiResult,
  STEP_STATUS_MAP,
  mapTaskStatus,
  formatDatetime,
  getUserId,
  TASK_LOCAL_KEY,
  minVersionCheck,
  CURRENT_TASK_ID,
  TASKS_ID_VISITED,
  IOS_WARNING_MSG,
  OFFLINE_MSG,
};
