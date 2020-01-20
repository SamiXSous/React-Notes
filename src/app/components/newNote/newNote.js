import React, {Component} from 'react';
import {Card, Col, Button, TextInput, Icon, Row, Textarea} from 'react-materialize';
import './newNote.scss';


class NewNote extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true
        }

        // console.log(this.props)
    }

    async componentDidMount(){
        // await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${this.props.match.params.noteId}`, 
        // {headers: {Accept: 'application/json'}})
        // .then(response => response.json())
        // .then(data => this.setState({
        //     data: data,
        //     loading: false
        // }));
    }
    
    render(){
            return (
                <Col s={12}>
                    <Card 
                    title={`Create New Note`}
                    actions={[
                        <Button
                        node="button"
                        className="red"
                        style={{
                            marginRight: '5px'
                        }}
                        waves="light">
                            Cancel
                            <Icon left>
                                cancel
                            </Icon>
                        </Button>,
                        <Button
                        className="green"
                        node="button"
                        style={{
                        marginRight: '5px'
                        }}
                        waves="light">
                            Save Note
                            <Icon left>
                                save
                            </Icon>
                        </Button>
                    ]}>
                        <Row>
                            <form action="" method="post">
                                <Col s={12}>
                                    <TextInput label="Title" />
                                </Col>
                                <Col s={12}>
                                    <Textarea
                                    label='Message Body'
                                    l={12}
                                    m={12}
                                    s={1}
                                    xl={12}
                                    />
                                </Col>
                                <Col s={12}>
                                    <TextInput label="Author" />
                                </Col>
                            </form>
                        </Row>
                    </Card>
                </Col>                               
            );   
        
    }
}

export default NewNote;