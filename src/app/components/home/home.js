import React, { Component } from 'react';
import { Card, Col, CardTitle, Row, Pagination, Icon, Preloader } from 'react-materialize';
import { Link } from 'react-router-dom';

import './home.scss';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            itemStart: 1,
            itemLimit: 6
        }
    }

    componentDidMount() {
        this.getnotes()
    }
    componentDidUpdate() {
        this.getnotes()
    }

    getnotes() {
        fetch(`https://docent.cmi.hro.nl/bootb/demo/notes/?start=${this.state.itemStart}&limit=${this.state.itemLimit}`, {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data,
                    loading: false
                });
            }
            );
    }

    pagination(page) {
        const limit = this.state.itemLimit;
        this.setState({ itemStart: (page - 1) * limit + 1 });
    }


    render() {
        if (this.state.data) {
            return (
                <Card>
                    <Row>
                        <Col>
                            {this.state.data.items.map(note => {
                                return (
                                    <Col m={4} key={note.id} >
                                        <Link to={`/note/${note.id}`}>
                                            <Card className="noteCard"
                                                header={
                                                    <CardTitle image="https://thumb.mp-farm.com/1569632/preview.jpg"> {note.title} </CardTitle>}>
                                                <p>{note.body}</p>
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                            })}

                        </Col>
                    </Row>
                    <Row>

                        <Pagination
                            activePage={this.state.data.pagination.currentPage}
                            onSelect={e => { this.pagination(e) }}
                            items={this.state.data.pagination.totalPages}
                            leftBtn={<Icon>chevron_left</Icon>}
                            maxButtons={this.state.data.pagination.totalPages}
                            rightBtn={<Icon>chevron_right</Icon>}
                        />

                        {/* Future Feature to select how many items per page */}
                        {/* <Select
                        label="Choose your option"
                        class="browser-default"
                        options={{
                            classes: '',
                            dropdownOptions: {
                            alignment: 'left',
                            autoTrigger: false,
                            closeOnClick: false,
                            constrainWidth: true,
                            container: null,
                            coverTrigger: false,
                         
                            }
                        }}
                        value="2"
                        >
                        <option value="1">
                            Option 1
                        </option>
                        <option value="2">
                            Option 2
                        </option>
                        <option value="3">
                            Option 3
                        </option>
                    </Select> */}

                    </Row>

                </Card>
            )

        }
        return (
            <Preloader
                active
                color="blue"
                flashing={false}
                size="big"
            />
        );
    }
}

export default Home;