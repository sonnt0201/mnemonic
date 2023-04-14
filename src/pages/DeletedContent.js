import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Row, Card, Form, Stack, Collapse } from "react-bootstrap";

import { useTasks } from "../stores/Contexts";
import { ActionEnum } from "../stores";
import Restore from "../assets/restore.svg";
import Remove from "../assets/permanent-remove.svg"
import { useState } from "react";

export const DeletedContent = ({ tasks, setInputVal }) => {
  const [, dispatchTasks] = useTasks();
  const [isOpen, setIsOpen] = useState("false");
  const [buttonNote, setButtonNote] = useState("")
  
  const formatTime = (time) => {
    if (!time) return "Không có hạn";
    const dateTime = new Date(time);
    const formattedDateTime = `
    ${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} 
    ${dateTime.getHours()}:${dateTime.getMinutes()} 
    `;
    return formattedDateTime;
  };

  return (
    <Container>
      {" "}
      <Row>
        {tasks.map((task) => (
          <>
            <Col lg="3" className="mt-3">
              <Card className="">
                <Card.Header>
                  
                  {formatTime(task.deadline)}
                </Card.Header>

                <Card.Body>
                  <Card.Title>{task.name}</Card.Title>

                  <Card.Text>{task.note}</Card.Text>

                  <Stack direction="horizontal" gap={3} className="mx-auto justify-content-center">
                    <img
                      className="bin-button"
                      src={Restore}
                      style={{ width: "12%", margin: "0" }}
                      onClick={(e) => {
                        dispatchTasks({
                          type: ActionEnum.TOGGLE_DELETED,
                          payload: task.id,
                        });
                      }}
                      onMouseOver={(e) => {
                        e.target.style.cursor = "pointer";
                        setButtonNote("Khôi phục")
                        setIsOpen(true);
                        
                      }}
                      onMouseOut={ e => {
                        setIsOpen(false);
                      }
                        
                      }
                      alt="xoas"
                    />
                    <img
                      className="remove-button"
                      src={Remove}
                      style={{ width: "12%", margin: "0" }}
                      onClick={(e) => {
                        dispatchTasks({
                          type: ActionEnum.REMOVE_TASK,
                          payload: task.id,
                        });
                      }}
                      onMouseOver={(e) => {
                        e.target.style.cursor = "pointer";
                        setButtonNote("Loại bỏ")
                        setIsOpen(true);
                        
                      }}

                      onMouseOut={ e => {
                        setIsOpen(false);
                      }
                        
                      }
                      alt="xoas"
                    />
                    
                  </Stack>
                  <Collapse in = {isOpen} dimension="height">
                     <h6 id="button-note" style={{ marginTop: "0.5rem" }}>{buttonNote}</h6>
                  </Collapse>
                 
                </Card.Body>

                
              </Card>
            </Col>
          </>
        ))}{" "}
      </Row>
    </Container>
  );
};
