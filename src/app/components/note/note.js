import React, {Component} from 'react';
import {Card, Col, Button, Row, Pagination, Icon} from 'react-materialize';
import './note.scss';


class Note extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true
        }

        // console.log(this.props)
    }

    async componentDidMount(){
        await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${this.props.match.params.noteId}`, 
        {headers: {Accept: 'application/json'}})
        .then(response => response.json())
        .then(data => this.setState({
            data: data,
            loading: false
        }));
    }
    
    render(){
        
        
        if(this.state.data){
            return (
                <Col s={12}>
                    <Card 
                    title={`Title: ${this.state.data.title}`}
                    actions={[
                        <Button
                        node="button"
                        style={{
                            marginRight: '5px'
                        }}
                        waves="light">
                            Edit Note
                            <Icon left>
                                edit
                            </Icon>
                        </Button>,
                        <Button
                        className="red"
                        node="button"
                        style={{
                        marginRight: '5px'
                        }}
                        waves="light">
                            Delete Note
                            <Icon left>
                                delete
                            </Icon>
                        </Button>
                    ]}>
                        <p>Message: {this.state.data.body}</p>
                        <p>Author: {this.state.data.author}</p>
                        <p>Last Updated: {this.state.data.date}</p>
                    </Card>
                </Col>                               
            );   
        }

        return(
            <div>Loading</div>
        )
    }
}

export default Note;