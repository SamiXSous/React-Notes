import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Col, Button, TextInput, Icon, Row, Textarea } from 'react-materialize';
import axios from 'axios';

import './newNote.scss';


class NewNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            createdId: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        // await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${this.props.match.params.noteId}`, 
        // {headers: {Accept: 'application/json'}})
        // .then(response => response.json())
        // .then(data => this.setState({
        //     data: data,
        //     loading: false
        // }));
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;

        console.log(id, value);

        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event);
        const note = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        }
        axios.post(`https://docent.cmi.hro.nl/bootb/demo/notes/`, note, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 201) {
                    console.log(res)
                    this.setState({
                        createdId: res.data.id
                    })
                }

            });

    }

    render() {
        if (this.state.createdId) {
            return (
                <Redirect to={`/note/${this.state.createdId}`} />
            )
        }
        return (
            <Col s={12}>
                <form onSubmit={this.handleSubmit} method="post">
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

                            <Col s={12}>
                                <TextInput id="title" onChange={this.handleChange} label="Title" required />
                            </Col>
                            <Col s={12}>
                                <Textarea id="body"
                                    onChange={this.handleChange}
                                    label='message body'
                                    l={6}
                                    m={6}
                                    s={12}
                                    xl={12}
                                    required
                                />
                            </Col>
                            <Col s={12}>
                                <TextInput onChange={this.handleChange} id="author" label="Author" required />
                            </Col>
                        </Row>
                    </Card>
                </form>
            </Col>
        );

    }
}

export default NewNote;