import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Col, Button, TextInput, Icon, Row, Textarea } from 'react-materialize';
import axios from 'axios';

import './editNote.scss';
import Preloader from 'react-materialize/lib/Preloader';


class NewNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            createdId: null,
            title: null,
            body: null,
            author: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${this.props.match.params.noteId}`,
            { headers: { Accept: 'application/json' } })
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                loading: false
            }))
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const id = target.id;

        this.setState({
            [id]: value
        });
        if (!this.state.title) {
            this.state.title = this.state.data.title;
        }
        if (!this.state.body) {
            this.state.body = this.state.data.body;
        }
        if (!this.state.author) {
            this.state.author = this.state.data.author;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event);
        const note = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        }
        axios.put(`https://docent.cmi.hro.nl/bootb/demo/notes/${this.state.data.id}`, note, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({
                        editedId: res.data.id
                    })
                }

            });

    }

    render() {
        if (!this.state.data) {
            return (
                <Preloader
                    active
                    color="blue"
                    flashing={false}
                    size="big"
                />
            )
        }
        if (this.state.editedId) {
            return (
                <Redirect to={`/note/${this.state.editedId}`} />
            )
        }
        return (
            <Col s={12}>
                <form onSubmit={this.handleSubmit} method="post">
                    <Card
                        title={`Edit Note`}
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
                                <TextInput
                                    id="title"
                                    onChange={this.handleChange}
                                    label="Title"
                                    defaultValue={this.state.data.title}
                                    required
                                />
                            </Col>
                            <Col s={12}>
                                <Textarea id="body"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.data.body}
                                    label='message body'
                                    l={6}
                                    m={6}
                                    s={12}
                                    xl={12}
                                    required
                                />
                            </Col>
                            <Col s={12}>
                                <TextInput
                                    id="author"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.data.author}
                                    label="Author"
                                    required
                                />
                            </Col>
                        </Row>
                    </Card>
                </form>
            </Col>
        );

    }
}

export default NewNote;