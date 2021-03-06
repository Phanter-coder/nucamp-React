import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, } from 'reactstrap';
import { Link } from 'react-router-dom';
import Button from "reactstrap/lib/Button";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';




 function RenderCampsite({campsite}) {
    return(
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
              <Card>
              <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                  <CardBody>
                      <CardText>{campsite.description}</CardText>
                  </CardBody>
              </Card>
            </FadeTransform>
        </div>
    
    );
}
function RenderComments({comments, postComment, campsiteId}) {
    if (comments){
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                  {}
                
                  {comments.map((comment) => {
                      return (
                        <Fade in key={comment.id}>
                        <div> 
                          <p className="mt-0">{comment.text} </p>
                          <p className="mb-5"> -- {comment.author} {""} 
                          {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}  </p>    
                          </div>
                          </Fade>
                      );
                  })}
                  </Stagger>
                  <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div>
        );
    }
    else{
        return <div>No comments available <CommentForm /></div>;
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false,
        };
      }
    
      toggleModal = () => {
        this.setState({
          isModalOpen: !this.state.isModalOpen,
        });
      };
    
      handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
        
      };

      render() {
        return (
            <div>
            <Button onClick={this.toggleModal} className="fa fa-pencil fa-lg" outline>
            Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(valuesObj) => this.handleSubmit(valuesObj)}>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <label htmlFor="author">Your name</label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    placeholder="Your name"
                    validators={{
                        required: (val) => val && val.length > 0,
                        minLength: (val) => val && val.length >= 2,
                        maxLength: (val) => val && val.length <= 15,
                      }}
                  />
                  <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comment</label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    className="form-control"
                    rows="6"
                  />
                </div>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
        );
    }
  }


function CampsiteInfoComponent(props) {
  if (props.isLoading) {
    return (
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
}
if (props.errMess) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        </div>
    );
}      
  
if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                        </div>
                    </div>  
                    <div className="row">
                       <RenderCampsite campsite={props.campsite}/>
                       <RenderComments 
                          comments={props.comments}
                          postComment={props.postComment}
                          campsiteId={props.campsite.id} />
                    </div>
                 </div>      
            );
            
        }
        else {
            return(
            <div> No campsite selected yet</div>
            );
        };
    }














export default CampsiteInfoComponent; 