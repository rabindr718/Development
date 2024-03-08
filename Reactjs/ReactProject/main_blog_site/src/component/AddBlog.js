import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Select from 'react-select';
import validator from 'validator';
const AddBlog = (props) => {
  const { blogList, setBlogList, updateBlog, setUpdateBlog } = props;
  const nav = useNavigate();
  const editor = useRef(null);
  const [description, setDescription] = useState('');
  const [file, setfile] = useState('');
  const [title, setTitle] = useState('');
  const [selectedOptions, setSelectedOptions] = useState();
  const [erMsg, setErMsg] = useState('');

  const loginData = JSON.parse(localStorage.getItem('userLogin'));
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const optionList = [
    {
      value: 'Java',
      label: 'Java',
    },
    {
      value: 'Version8',
      label: 'Version8',
    },
    {
      value: 'ReactJs',
      label: 'ReactJs',
    },
    {
      value: 'HTML',
      label: 'HTML',
    },
  ];
  const updateNewData = (
    ids,
    title,
    discription,
    file,
    author,
    publishDate,
    tags
  ) => {
    setBlogList(
      blogList.map((d) =>
        +d.id === +ids
          ? {
              id: ids,
              Title: title,
              Description: discription,
              Images: file,
              Author: author,
              PublishDate: publishDate,
              Tags: tags,
            }
          : d
      )
    );
    setUpdateBlog('');
  };
  const handleSelect = (data) => {
    setSelectedOptions(data);
  };
  const fileHandler = (e) => {
    console.log(e.target.files);
    setfile(URL.createObjectURL(e.target.files[0]));
  };
  const publishHandler = (e) => {
    e.preventDefault();
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      file === '' ||
      selectedOptions.length === 0
    ) {
      setErMsg('*All field is mendetory');
    } else if (!validator.isAlpha(title)) {
      setErMsg('*Title is not valid');
    } else {
      if (!updateBlog) {
        setBlogList([
          ...blogList,
          {
            id: blogList.length,
            Title: title,
            Description: description,
            Images: file,
            Author: loginData[0].FullName,
            PublishDate: date,
            Tags: selectedOptions,
          },
        ]);
        alert('Blog is Publish');
      } else {
        updateNewData(
          +updateBlog.id,
          title,
          description,
          file,
          loginData[0].FullName,
          date,
          selectedOptions
        );
        alert('Blog Updated');
        nav('/ShowBlog');
      }
      setTitle('');
      setDescription('');
      setSelectedOptions('');
      setErMsg('');
      console.log(blogList);
    }
  };
  const closeHandler = (e) => {
    e.preventDefault();
    if (updateBlog) {
      setUpdateBlog('');
    }
    nav('/Home');
  };
  useEffect(() => {
    if (updateBlog) {
      setTitle(updateBlog.Title);
      setDescription(updateBlog.Description);
      setfile(updateBlog.Images);
      setSelectedOptions(updateBlog.Tags);
    } else {
      setTitle('');
      setDescription('');
      setSelectedOptions('');
    }
  }, [setTitle, setDescription, setSelectedOptions, setfile, updateBlog]);
  return (
    <>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Add Blog</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Description</Form.Label>
                <JoditEditor
                  ref={editor}
                  value={description}
                  onChange={(content) => {
                    setDescription(content);
                  }}
                />
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={fileHandler} />
                </Form.Group>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Select
                  aria-label="Default select example"
                  options={optionList}
                  placeholder="Select color"
                  value={selectedOptions}
                  onChange={handleSelect}
                  // isSearchable={true}
                  isMulti
                ></Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={loginData[0].FullName}
                  disabled={true}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label style={{ color: 'red' }}>{erMsg}</Form.Label>
              </Form.Group>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeHandler}>
              Close
            </Button>
            <Button variant="primary" onClick={publishHandler}>
              {updateBlog ? 'Update' : 'Publish'}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </>
  );
};
export default AddBlog;
