import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ShowBlog = (props) => {
  const nav = useNavigate();
  const { blogList, setBlogList, setUpdateBlog } = props;
  const [idForNextPrev, setIdForNextPrev] = useState(0);
  const [dis, setDis] = useState(true);
  const [ndis, setndis] = useState(false);
  const loginData = JSON.parse(localStorage.getItem('userLogin'));
  const handleDelete = (event) => {
    event.preventDefault();

    const ids = blogList[idForNextPrev].id;
    console.log(ids);
    setBlogList(blogList.filter((list) => +list.id !== +ids));
    if (idForNextPrev === blogList.length - 1) {
      setIdForNextPrev(0);
    }
  };
  const handleUpdate = (event) => {
    event.preventDefault();

    const ids = blogList[idForNextPrev].id;
    console.log(ids);
    setUpdateBlog(blogList.find((data) => data.id === ids));
    nav('/AddBlog');
  };
  const nextHandler = (event) => {
    event.preventDefault();

    if (idForNextPrev < blogList.length - 1 && blogList.length - 1 > 0) {
      setIdForNextPrev(idForNextPrev + 1);
      setDis(false);
      if (idForNextPrev === blogList.length - 2) {
        setndis(true);
      }
    } else if (idForNextPrev === blogList.length - 1 || blogList.length === 1) {
      setndis(true);
    }
    console.log(idForNextPrev);
  };

  const prevHandler = (event) => {
    event.preventDefault();

    if (idForNextPrev <= blogList.length && idForNextPrev > 0) {
      setndis(false);
      setIdForNextPrev(idForNextPrev - 1);
      if (idForNextPrev === 1) {
        setDis(true);
      }
    } else if (idForNextPrev === 0) {
      console.log(`dis index : ${idForNextPrev}`);
      setDis(true);
    }
  };
  return (
    <>
      {loginData.length !== 0 && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          {blogList.length === 0 && <h3>No Data Found</h3>}
          {blogList.length > 0 && (
            <>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Show Blog</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <h2 align="center">{blogList[idForNextPrev].Title}</h2>
                  <p align="right">
                    Publish Date :{blogList[idForNextPrev].PublishDate}
                  </p>
                  <div align="center">
                    <img
                      src={blogList[idForNextPrev].Images}
                      height="200"
                      width="400"
                    ></img>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogList[idForNextPrev].Description,
                    }}
                  />
                  <h5>~{blogList[idForNextPrev].Author}</h5>
                  <div align="center">
                    <button
                      class="btn btn-outline-success me-2"
                      onClick={handleDelete}
                      type="button"
                    >
                      Delete
                    </button>
                    <button
                      class="btn btn-outline-success me-2"
                      onClick={handleUpdate}
                      type="button"
                    >
                      Update
                    </button>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={() => nav('/Home')}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={prevHandler}
                    disabled={dis}
                  >
                    Prev Blog
                  </Button>
                  <h4>Page : {idForNextPrev + 1}</h4>
                  <Button
                    variant="primary"
                    onClick={nextHandler}
                    disabled={ndis}
                  >
                    Next Blog
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default ShowBlog;
