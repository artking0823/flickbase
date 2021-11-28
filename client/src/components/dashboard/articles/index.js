import React, { useEffect, useState } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaginateArticle,
  changeStatusArticle,
  removeArticle
} from "../../../store/actions/articleActions";
import {
  Modal,
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PaginationComponent from "./paginate";

const Articles = (props) => {
  const articles = useSelector((state) => state.articles);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [removeAlert, setRemoveAlert] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  let arts = articles.adminArticles;

  const editArtsAction = (id) => {
    props.history.push(`/dashboard/articles/edit/${id}`);
  };

  const handleClose = () => {
    setRemoveAlert(false);
  };

  const handleShow = (id = null) => {
    console.log(id);
    setToRemove(id);
    setRemoveAlert(true);
  };

  const handleDelete = () => {
    dispatch(removeArticle(toRemove));
  };

  useEffect(() => {
    handleClose();
    if (notifications && notifications.removeArticle) {
      dispatch(getPaginateArticle(arts.page));
    }
  }, [dispatch, notifications, arts]);

  useEffect(() => {
    dispatch(getPaginateArticle());
  }, [dispatch]);

  const handleStatusChange = (status, _id) => {
    let newStatus = status === "draft" ? "public" : "draft";
    dispatch(changeStatusArticle(newStatus, _id));
  };

  const goToPrevPage = (page) => {
    dispatch(getPaginateArticle(page));
  };

  const goToNextPage = (page) => {
    dispatch(getPaginateArticle(page));
  };

  return (
    <AdminLayout section="Articles">
      Articles
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="mr-2">
            <LinkContainer to="/dashboard/articles/add">
              <Button variant="secondary">Add Article</Button>
            </LinkContainer>
          </ButtonGroup>
          <form>
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
              <FormControl type="text" placeholder="Example" />
            </InputGroup>
          </form>
        </ButtonToolbar>
        <PaginationComponent
          arts={arts}
          prev={(page) => goToPrevPage(page)}
          next={(page) => goToNextPage(page)}
          handleStatusChange={(status, id) => handleStatusChange(status, id)}
          editArtsAction={(id) => editArtsAction(id)}
          handleShow={(id) => handleShow(id)}
        />
        <Modal show={removeAlert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Are you sure you want to remove this article?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{toRemove}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleDelete()}>
              Delete
            </Button>{" "}
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Articles;
