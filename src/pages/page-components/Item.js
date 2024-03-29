import { useState } from "react";
import { formatTime } from "../../utils";
import { Form, Card, Col, Stack } from "react-bootstrap";
import { useTasks, ActionEnum } from "../../stores";
import { Bin, Change } from "../../assets/icons";

import { useNoti, NotiTypes } from "../../notification";
import "./Item.css";

export const Item = ({ task, setInputVal }) => {
  const [, dispatchTasks] = useTasks();
  const [, dispatchNoti] = useNoti();
  const [, setChecked] = useState(task.isDone);

  const header = (task) => {
    // return task.countDaysLeft;
    if (task.isDone) return "Đã xong";
    if (!task.isDone && !task.deadline) return "Chưa xong";
    if (task.countDaysLeft <= 0) return " Hết hạn";
    if (task.countDaysLeft <= 1) return "⏰ Còn chưa đầy 1 ngày";
    return `Còn hơn ${Math.floor(task.countDaysLeft)} ngày nữa`;
  };

  const clickChecker = (e) => {
    // fire noti
    if (!task.isDone)
      dispatchNoti({
        type: NotiTypes.ADD,
        payload: {
          content: <p>Đã hoàn thành {task.name} </p>,
          linkTo: "/mnemonic/done",
          time: new Date(),
        },
      });

    setTimeout(() => {
      dispatchTasks({
        type: ActionEnum.TOGGLE_TASK,
        payload: task.id,
      });
    }, 500);

    // return
  };

  return (
    <>
      <Col className="mt-3 col" lg={3} md={4} xs={12}>
        <Card
          className={`card ${task.countDaysLeft <= 0 ? "overdue" : ""} ${
            task.isDone ? "is-done" : ""
          } `}
        >
          <Card.Header className="header">
            <Stack direction="horizontal" style={{ whiteSpace: "nowrap" }}>
              <Form.Check
                className="my-auto checker"
                type={"checkbox"}
                inline
                checked={task.isDone}
                onChange={() => {
                  dispatchTasks({
                    type: ActionEnum.TOGGLE_TASK,
                    payload: task.id
                  })
                }}
                onMouseOver={(e) => {
                  e.target.style.cursor = "pointer";
                }}
              />
              <p
                className="mx-auto my-auto"
                onClick={(e) => {
                  dispatchTasks({
                    type: ActionEnum.TOGGLE_TASK,
                    payload: task.id,
                  });
                }}
              >
                {header(task)}
              </p>
              <Form.Check className="my-auto disabled-checker" disabled />
            </Stack>
          </Card.Header>

          <Card.Body className="body">
            <Card.Title className="title">{task.name}</Card.Title>

            <Card.Text>{task.note}</Card.Text>
            <Stack
              direction="horizontal"
              gap={3}
              className="mx-auto justify-content-center"
            >
              <img
                className="icon bin-button"
                src={Bin.default}
                onClick={(e) => {
                  // dispatch xóa
                  dispatchTasks({
                    type: ActionEnum.TOGGLE_DELETED,
                    payload: task.id,
                  });

                  // chạy thông báo
                  dispatchNoti({
                    type: NotiTypes.ADD,
                    payload: {
                      content: (
                        <p>
                          Đã xóa <strong>{" " + task.name}</strong>
                        </p>
                      ),
                      time: new Date(),
                      link: "/mnemonic/deleted-page",
                    },
                  });
                }}
                alt="xoas"
              />
              <img
                className="icon change-button"
                src={Change.default}
                onClick={(e) => {
                  // setInputVal là id của task cần sửa
                  setInputVal(task.id);

                  // chạy thông báo
                  dispatchNoti({
                    type: NotiTypes.ADD,
                    payload: {
                      content: (
                        <p>
                          Đang chỉnh sửa <strong> {task.name}</strong>
                        </p>
                      ),

                      time: new Date(),
                      link: "/mnemonic",
                    },
                  });
                }}
                alt="sua"
              />
            </Stack>
          </Card.Body>

          {task.deadline && (
            <Card.Footer className="text-muted footer">
              {formatTime(task.deadline)}
            </Card.Footer>
          )}
        </Card>
      </Col>
    </>
  );
};
