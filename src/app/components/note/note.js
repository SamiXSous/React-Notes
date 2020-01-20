import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Col, Button, Row, Pagination, Icon } from 'react-materialize';
import './note.scss';


class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            editNote: false
        }

        this.editNote = this.editNote.bind(this);
        // console.log(this.props)
    }

    async componentDidMount() {
        await fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/${this.props.match.params.noteId}`,
            { headers: { Accept: 'application/json' } })
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                loading: false
            }));
    }

    editNote(event) {
        console.log('Redirect Now')
        this.setState({
            editNote: true
        })
    }

    render() {
        if (this.state.editNote === true) {
            return (<Redirect to={`/note/${this.state.data.id}/edit`} />)
        }
        if (this.state.data) {
            return (
                <Col s={12}>
                    <Card
                        title={`Title: ${this.state.data.title}`}
                        actions={[
                            <Button
                                onClick={this.editNote}
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

        return (
            <div>Loading</div>
        )
    }
}

export default Note;