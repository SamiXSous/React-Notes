import React, {Component} from 'react';
import {Card, Col, CardTitle, Row, Pagination, Icon} from 'react-materialize';
import {Link} from 'react-router-dom';

import './home.scss';


class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true
        }
    }

    async componentDidMount(){
        await fetch('https://docent.cmi.hro.nl/bootb/demo/notes/?limit=6', 
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
            <Card>
                <Row>
                    <Col>
                        {this.state.data.items.map(note => {
                        return( 
                        <Col m={4}>
                            <Link to ={`/note/${note.id}`}>
                                <Card className="noteCard" 
                                header = {
                                    <CardTitle image="https://thumb.mp-farm.com/1569632/preview.jpg"> {note.title} </CardTitle>}>
                                <p>{note.body}</p>
                                </Card>
                            </Link>
                        </Col>
                        )})}
                        
                    </Col>
                </Row>
                <Pagination
                activePage={this.state.data.pagination.currentPage}
                items={this.state.data.pagination.totalPages}
                leftBtn={<Icon>chevron_left</Icon>}
                maxButtons={this.state.data.pagination.totalPages}
                rightBtn={<Icon>chevron_right</Icon>}
                />
            </Card>
            )
        
        }
        return (
          

            <Col s={4}><Card title="Test"> </Card></Col>

               
            
                
                
            // })}       
                
         
       );
    }
}

export default Home;